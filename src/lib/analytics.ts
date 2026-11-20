/**
 * Privacy-conscious analytics hook (PRD §3.2).
 *
 * No provider is bundled, the client must approve one first. Events are pushed to
 * `window.dataLayer` (compatible with GTM/GA4/Plausible-via-GTM) and dispatched as a
 * DOM `CustomEvent` so any approved provider can subscribe later.
 *
 * Rules: never pass form field VALUES; slugs, locations and field NAMES only.
 */
export type AnalyticsEvent =
  | "service_card_click"
  | "cta_click"
  | "contact_form_submit"
  | "contact_form_error"
  | "case_study_open"
  | "portfolio_filter"
  | "project_click"
  | "live_project_click"
  | "pricing_interaction"
  | "contact_form_start"
  | "email_click"
  | "phone_click"
  | "whatsapp_click";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(event: AnalyticsEvent, props: Props = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer?.push({ event, ...props });
  window.dispatchEvent(new CustomEvent("devereux:track", { detail: { event, ...props } }));
}
