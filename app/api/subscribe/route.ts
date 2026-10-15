import { createHmac, randomUUID } from "node:crypto";

import { NextResponse } from "next/server";
import { z } from "zod";

import { createSupabaseAdmin } from "../../lib/supabase-admin";

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

type Subscription = z.infer<typeof subscriptionSchema>;

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

async function syncWithResend(input: Subscription) {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audienceId) return false;

  const response = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email: input.email, first_name: input.name, unsubscribed: false }),
    signal: AbortSignal.timeout(5_000),
  });

  if (!response.ok && response.status !== 409) {
    console.error("Resend contact sync failed", response.status);
    return false;
  }
  return true;
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
    if (!supabase || !rateLimitSecret || !process.env.TURNSTILE_SECRET_KEY) {
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

    const now = new Date().toISOString();
    const { error } = await supabase.from("subscribers").insert({
      email: input.email,
      name: input.name,
      pet_type: input.petType,
      discovery_source: input.discoverySource,
      // El progreso enviado por el navegador no acredita premios reales.
      signals_found: 0,
      reward_unlocked: false,
      marketing_consent: input.marketingConsent,
      consented_at: now,
      consent_version: "launch-2026-v1",
      updated_at: now,
    });

    if (error?.code === "23505") return NextResponse.json({ ok: true, emailSynced: true });
    if (error) {
      console.error("Supabase subscriber insert failed", error.code);
      return jsonError("No pudimos completar el registro", 502);
    }

    const emailSynced = await syncWithResend(input);
    return NextResponse.json({ ok: true, emailSynced });
  } catch (error) {
    if (error instanceof SyntaxError) return jsonError("Solicitud inválida", 400);
    console.error("Subscription request failed", error instanceof Error ? error.name : "unknown");
    return jsonError("No pudimos completar el registro", 502);
  }
}
