import { createHash } from "node:crypto";

import { NextResponse } from "next/server";

import { createSupabaseAdmin } from "../../../lib/supabase-admin";
import { syncConfirmedContact } from "../../../lib/resend";

const TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/u;

function resultRedirect(request: Request, status: "confirmed" | "invalid" | "unavailable") {
  const url = new URL("/confirmacion", request.url);
  url.searchParams.set("status", status);
  const response = NextResponse.redirect(url, 303);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";
  if (!TOKEN_PATTERN.test(token)) return resultRedirect(request, "invalid");

  const supabase = createSupabaseAdmin();
  if (!supabase) return resultRedirect(request, "unavailable");

  const tokenHash = createHash("sha256").update(token).digest("hex");
  const { data, error } = await supabase.rpc("confirm_subscriber", {
    p_token_hash: tokenHash,
  });

  if (error) {
    console.error("Subscriber confirmation failed", error.code);
    return resultRedirect(request, "unavailable");
  }

  const subscriber = Array.isArray(data) ? data[0] : null;
  if (!subscriber) return resultRedirect(request, "invalid");

  await syncConfirmedContact(subscriber.confirmed_email, subscriber.confirmed_name);
  return resultRedirect(request, "confirmed");
}
