import "server-only";
import type { EnquiryData } from "./enquiry-schema";
import { serviceOptions } from "./enquiry-schema";

/* ───────────────────────────── Rate limiting (best effort) ─────────────────────────────
 * In-memory, per server instance. It blunts casual abuse; for production on serverless/multi-instance
 * hosting add an edge/WAF rule or a shared store (Upstash, Vercel KV). Documented in README.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimited(key: string, now = Date.now()): boolean {
  const entry = hits.get(key);
  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    // opportunistic cleanup
    if (hits.size > 5000) for (const [k, v] of hits) if (v.resetAt < now) hits.delete(k);
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

/* ───────────────────────────── Turnstile (optional) ───────────────────────────── */
export function turnstileEnabled(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyTurnstile(token: string | undefined, ip: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }),
      signal: AbortSignal.timeout(8000),
    });
    const json = (await res.json()) as { success?: boolean };
    return json.success === true;
  } catch {
    return false;
  }
}

/* ───────────────────────────── Delivery adapter ───────────────────────────── */
export type DeliveryResult =
  | { kind: "delivered"; provider: "resend" | "webhook" }
  | { kind: "not-configured" }
  | { kind: "failed"; provider: "resend" | "webhook" };

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

function serviceLabel(value: string): string {
  return serviceOptions.find((o) => o.value === value)?.label ?? value;
}

function toPlainText(d: EnquiryData): string {
  return [
    `New project enquiry`,
    ``,
    `Name: ${oneLine(d.name)}`,
    `Email: ${oneLine(d.email)}`,
    `Service: ${serviceLabel(d.service)}`,
    `Phone: ${oneLine(d.phone) || "Not provided"}`,
    `Preferred contact: ${oneLine(d.contactPref) || "Email"}`,
    `Company: ${oneLine(d.company) || "Not provided"}`,
    `Website / social: ${oneLine(d.website) || "Not provided"}`,
    ``,
    `Service detail: ${oneLine(d.serviceDetail) || "Not provided"}`,
    `Package: ${oneLine(d.pkg) || "Not selected"}`,
    `Add ons: ${d.addOns.map(oneLine).join(", ") || "None"}`,
    `Budget: ${oneLine(d.budget) || "Not provided"}`,
    `Timeline: ${oneLine(d.timeline) || "Not provided"}`,
    ``,
    `Project summary:`,
    d.message,
  ].join("\n");
}

/**
 * Sends the validated enquiry to whichever provider is configured (see .env.example):
 *   1. Resend (RESEND_API_KEY + ENQUIRY_FROM_EMAIL + ENQUIRY_TO_EMAIL)
 *   2. Generic webhook (ENQUIRY_WEBHOOK_URL [+ ENQUIRY_WEBHOOK_SECRET]), Zapier, Make, n8n, CRM inbound URL
 * Secrets stay on the server; nothing here is exposed to the client bundle ("server-only").
 */
export async function deliverEnquiry(data: EnquiryData): Promise<DeliveryResult> {
  const { RESEND_API_KEY, ENQUIRY_FROM_EMAIL, ENQUIRY_TO_EMAIL, ENQUIRY_WEBHOOK_URL, ENQUIRY_WEBHOOK_SECRET } = process.env;

  if (RESEND_API_KEY && ENQUIRY_FROM_EMAIL && ENQUIRY_TO_EMAIL) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: ENQUIRY_FROM_EMAIL,
          to: ENQUIRY_TO_EMAIL.split(",").map((s) => s.trim()).filter(Boolean),
          reply_to: data.email,
          subject: `New enquiry: ${serviceLabel(data.service)}, ${oneLine(data.name)}`.slice(0, 200),
          text: toPlainText(data),
        }),
        signal: AbortSignal.timeout(10000),
      });
      return res.ok ? { kind: "delivered", provider: "resend" } : { kind: "failed", provider: "resend" };
    } catch {
      return { kind: "failed", provider: "resend" };
    }
  }

  if (ENQUIRY_WEBHOOK_URL) {
    try {
      const res = await fetch(ENQUIRY_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(ENQUIRY_WEBHOOK_SECRET ? { "X-Webhook-Secret": ENQUIRY_WEBHOOK_SECRET } : {}),
        },
        body: JSON.stringify({
          type: "project_enquiry",
          receivedAt: new Date().toISOString(),
          name: data.name,
          email: data.email,
          service: data.service,
          company: data.company,
          message: data.message,
        }),
        signal: AbortSignal.timeout(10000),
      });
      return res.ok ? { kind: "delivered", provider: "webhook" } : { kind: "failed", provider: "webhook" };
    } catch {
      return { kind: "failed", provider: "webhook" };
    }
  }

  return { kind: "not-configured" };
}
