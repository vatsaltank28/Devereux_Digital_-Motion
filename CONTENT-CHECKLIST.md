# Client content & decisions still required

Everything below is currently a **clearly marked placeholder or draft**. Nothing was invented as fact.

## Decisions (PRD §21)
- [ ] Positioning: local agency, remote-first studio, or both?
- [ ] Exact service capabilities and exclusions — services 02–07 are **draft copy** (service 01 uses the client's reference content).
- [ ] “Coming Soon” behaviour: teaser, waitlist or non-clickable card? (Currently non-interactive, no route.)
- [ ] Motion preference: this build is a balanced, restrained-but-expressive system. Confirm or ask for more/less.
- [ ] Domain, hosting, CMS (data modules are CMS-ready), analytics provider and consent approach.
- [ ] Form destination (email provider or CRM/webhook) — **launch dependency**; form reports “not sent” until set.

## Brand
- [ ] Final logo/wordmark and capitalisation (“Devereux Digitals” vs “DEVEREUX DIGITALS”). Header mark is a placeholder (`components/visuals/LogoMark.tsx`).
- [ ] Legal entity name (footer + privacy), favicon/OG artwork (generated placeholders in `app/icon.svg`, `app/opengraph-image.tsx`).
- [ ] Licensed Space Grotesk/Satoshi files if self-hosting is preferred (currently Space Grotesk + Inter via `next/font`, self-hosted at build).

## Content to review/replace
- [ ] Homepage copy: headline, description, “Why Devereux” differentiators, process (`src/data/home.ts`) — approach statements only.
- [ ] Service pages 02–07: problems, deliverables, process, benefits, pricing factors (`src/data/services.ts`).
- [ ] **FAQs** (`src/data/faqs.ts`): deliberately non-committal drafts. Replace with real policies — timelines, revisions, payments, support, ownership, scope changes (PRD S09).
- [ ] About page principles (`src/app/about/page.tsx`).
- [ ] Privacy Policy and Terms: drafts with bracketed placeholders; legal review required. Both are `noindex` until approved.

## Proof (nothing fabricated)
- [ ] **Real projects** with publication permission, imagery, and verifiable results → replace the 7 labelled concept projects (`src/data/projects.ts`).
- [ ] **Testimonials** with written permission → `src/data/testimonials.ts` (section appears automatically).
- [ ] Client logos, awards, metrics — none are shown; add only if approved and verifiable.
- [ ] **Pricing**: approved packages (currency, tax, scope, billing basis, exclusions) or confirm quote-only (current default).

## Contact details to publish (all optional env vars; blank = hidden)
- [ ] Email, phone, social links, postal address (if any) — `NEXT_PUBLIC_CONTACT_*`, `NEXT_PUBLIC_*_URL`.
- [ ] Booking/consultation link only if a real booking process exists (none shown today).
