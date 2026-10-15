import { createHash, createHmac, randomBytes, randomUUID } from "node:crypto";

import { NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseAdmin } from "../../lib/supabase-admin";
import { sendConfirmationEmail } from "../../lib/resend";

const subscriptionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(60)
    .transform((value) => value.normalize("NFKC"))
    .refine((value) => !/[\u0000-\u001f\u007f]/u.test(value)),
  email: z.email().trim().toLowerCase().max(120),
  petType: z.enum(["dog", "cat", "both", "other"]),
  discoverySource: z.enum([
    "instagram",
    "tiktok",
    "facebook",
    "google",
    "recommendation",
    "event",
    "other",
  ]),
  signalsFound: z.number().int().min(0).max(5),
  rewardUnlocked: z.boolean(),
  marketingConsent: z.literal(true),
  website: z.string().max(0),
  turnstileToken: z.string().min(1).max(2_048),
});

function jsonError(error: string, status: number, retryAfter?: number) {
  const response = NextResponse.json({ ok: false, error }, { status });
  response.headers.set("Cache-Control", "no-store");
  if (retryAfter) response.headers.set("Retry-After", String(retryAfter));
  return response;
}

function getClientIp(request: Request) {
  const vercelForwarded = request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    vercelForwarded ??
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    forwarded ??
    "unknown"
  ).slice(0, 64);
}

function hashIdentifier(kind: "ip" | "email", value: string, secret: string) {
  return createHmac("sha256", secret).update(`${kind}:${value}`).digest("hex");
}

function hasAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  const allowedOrigins = new Set([new URL(request.url).origin]);
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  if (configuredOrigin) {
    try {
      allowedOrigins.add(new URL(configuredOrigin).origin);
    } catch {
      return false;
    }
  }

  return allowedOrigins.has(origin);
}

async function verifyTurnstile(token: string, remoteIp: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return false;

  const body = new FormData();
  body.set("secret", secret);
  body.set("response", token);
  body.set("remoteip", remoteIp);
  body.set("idempotency_key", randomUUID());

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
    cache: "no-store",
    signal: AbortSignal.timeout(5_000),
  });
  if (!response.ok) return false;

  const result = (await response.json()) as { success?: boolean; action?: string };
  return result.success === true && result.action === "subscribe";
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return jsonError("Tipo de solicitud no permitido", 415);
  if (!hasAllowedOrigin(request)) return jsonError("Origen no permitido", 403);

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > 8_000) return jsonError("Solicitud demasiado grande", 413);

  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > 8_000)
      return jsonError("Solicitud demasiado grande", 413);

    const parsed = subscriptionSchema.safeParse(JSON.parse(rawBody));
    if (!parsed.success) return jsonError("Revisa los datos e inténtalo nuevamente", 400);

    const input = parsed.data;
    const supabase = createSupabaseAdmin();
    const rateLimitSecret = process.env.RATE_LIMIT_SECRET;
    if (
      !supabase ||
      !rateLimitSecret ||
      !process.env.TURNSTILE_SECRET_KEY ||
      !process.env.RESEND_API_KEY ||
      !process.env.RESEND_FROM_EMAIL
    ) {
      console.error("Subscription security configuration is incomplete");
      return jsonError("El registro aún no está disponible", 503);
    }

    const clientIp = getClientIp(request);
    const identifiers = [
      { value: hashIdentifier("ip", clientIp, rateLimitSecret), limit: 10 },
      { value: hashIdentifier("email", input.email, rateLimitSecret), limit: 3 },
    ];

    for (const identifier of identifiers) {
      const { data: allowed, error } = await supabase.rpc("check_subscription_rate_limit", {
        identifier: identifier.value,
        max_requests: identifier.limit,
        window_seconds: 3_600,
      });
      if (error) {
        console.error("Subscription rate limit failed", error.code);
        return jsonError("El registro aún no está configurado por completo", 503);
      }
      if (!allowed) return jsonError("Demasiados intentos. Inténtalo más tarde", 429, 3_600);
    }

    if (!(await verifyTurnstile(input.turnstileToken, clientIp)))
      return jsonError("No pudimos verificar que seas una persona", 400);

    const token = randomBytes(32).toString("base64url");
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 30 * 60 * 1_000);
    const { data: shouldSend, error } = await supabase.rpc("register_pending_subscriber", {
      p_email: input.email,
      p_name: input.name,
      p_pet_type: input.petType,
      p_discovery_source: input.discoverySource,
      p_marketing_consent: input.marketingConsent,
      p_consented_at: now.toISOString(),
      p_consent_version: "launch-2026-v1",
      p_token_hash: tokenHash,
      p_token_expires_at: expiresAt.toISOString(),
    });

    if (error) {
      console.error("Pending subscriber registration failed", error.code);
      return jsonError("El registro aún no está configurado por completo", 503);
    }

    // Respondemos igual para correos ya confirmados y evitamos revelar sus registros.
    if (!shouldSend) return NextResponse.json({ ok: true, confirmationRequired: true });

    const confirmationUrl = new URL("/api/subscribe/confirm", request.url);
    confirmationUrl.searchParams.set("token", token);

    if (!(await sendConfirmationEmail(input.email, confirmationUrl.toString()))) {
      return jsonError("No pudimos enviar el correo de confirmación", 502);
    }

    return NextResponse.json({ ok: true, confirmationRequired: true });
  } catch (error) {
    if (error instanceof SyntaxError) return jsonError("Solicitud inválida", 400);
    console.error("Subscription request failed", error instanceof Error ? error.name : "unknown");
    return jsonError("No pudimos completar el registro", 502);
  }
}
