import { NextResponse } from "next/server";
const allowed = new Set(["page_view", "form_submit", "discovery"]);
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!allowed.has(body?.event)) return NextResponse.json({ ok: false }, { status: 400 });
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
