import { NextResponse } from "next/server";
import { enquirySchema, flattenErrors } from "@/lib/enquiry-schema";
import { deliverEnquiry, rateLimited, turnstileEnabled, verifyTurnstile } from "@/lib/enquiry-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 20_000;
/** Humans can't complete this form faster; bots usually POST instantly. */
const MIN_FILL_MS = 2000;

const json = (body: Record<string, unknown>, status: number) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || undefined;

  if (rateLimited(ip ?? "unknown")) {
    return json({ ok: false, code: "rate_limited", message: "Too many enquiries from this connection. Please try again in a few minutes." }, 429);
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return json({ ok: false, code: "too_large", message: "That message is too large." }, 413);

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, code: "bad_request", message: "We couldn’t read that submission. Please try again." }, 400);
  }

  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success) {
    return json({ ok: false, code: "validation", message: "Please check the highlighted fields.", fieldErrors: flattenErrors(parsed.error) }, 422);
  }
  const data = parsed.data;

  // Honeypot filled → bot. Respond like success so it learns nothing, but deliver nothing.
  const raw = payload as { nickname?: unknown };
  if (typeof raw.nickname === "string" && raw.nickname.length > 0) return json({ ok: true, delivered: false }, 200);

  if (typeof data.startedAt !== "number" || Date.now() - data.startedAt < MIN_FILL_MS) {
    return json({ ok: false, code: "too_fast", message: "That was very quick. Please review your message and send it again." }, 400);
  }

  if (turnstileEnabled()) {
    const token = (payload as { turnstileToken?: string }).turnstileToken;
    if (!(await verifyTurnstile(token, ip))) {
      return json({ ok: false, code: "spam_check", message: "The spam check didn’t pass. Please reload the page and try again." }, 400);
    }
  }

  const result = await deliverEnquiry(data);

  if (result.kind === "delivered") return json({ ok: true, delivered: true }, 200);

  if (result.kind === "failed") {
    console.error(`[enquiry] delivery via ${result.provider} failed`);
    return json({ ok: false, code: "delivery_failed", message: "We couldn’t send your enquiry just now. Your message is still in the form, so please try again shortly." }, 502);
  }

  // No provider configured. Never pretend this succeeded.
  if (process.env.NODE_ENV !== "production") {
    console.info("[enquiry] DEV ONLY, no delivery provider configured; enquiry was NOT sent:", {
      service: data.service,
      messageLength: data.message.length,
    });
    return json({ ok: true, delivered: false, mode: "dev-not-delivered" }, 202);
  }
  console.error("[enquiry] no delivery provider configured (set RESEND_* or ENQUIRY_WEBHOOK_URL)");
  return json(
    { ok: false, code: "not_configured", message: "The enquiry form isn’t connected yet, so your message was not sent. Please try again later." },
    503,
  );
}
