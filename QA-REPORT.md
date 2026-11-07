# QA report

Environment: Windows 11, Node 24.18, npm 11.16, Next.js 16.4.5 (Turbopack), Chromium via DevTools. Tests ran against the **production build** (`next build && next start`) unless noted.

## Automated gates
| Gate | Result |
|---|---|
| `tsc --noEmit` (strict + `noUncheckedIndexedAccess`) | ✅ 0 errors |
| `eslint .` (Next core-web-vitals + TS) | ✅ 0 problems |
| `next build` | ✅ 27 routes generated (7 service pages, 7 case studies statically generated) |
| `npm run check:links` | ✅ 21 pages, 551 links, 0 broken links / dead anchors / placeholder hrefs; unknown route → 404 |
| Lighthouse (desktop, navigation) | ✅ Accessibility 100 · Best Practices 100 · SEO 100 · Agentic 100 |
| Lighthouse (mobile) | Accessibility 96 on first run — flagged dimmed process-step text (real contrast failure, **fixed**) and the decorative footer wordmark (**fixed**); re-audited at 100 |

## Addendum — cinematic scroll stage (supersedes the home-page figures below)
The homepage hero was replaced by the cinematic stage after the first QA pass; the numbers below this section describe
the earlier Signal Core hero. Current verified state (details in `MOTION-LAB.md`):
* typecheck ✓ · lint ✓ · build ✓ (28 routes, incl. `/reference-motion-lab`) · link crawl 562 links / 0 broken
* Overflow: 10 routes × 6 widths (60 combos) clean, including the lab and new hero
* Lighthouse (home, mobile): Accessibility 100 · Best Practices 100 · SEO 100 · Agentic 100
* Home, 390×844, CPU 4×, Fast 4G: **LCP 1.47 s, CLS 0.00**
* Scroll-scrub frame time on software WebGL: ≈ 7.5–13.6 ms average per phase (p95 ≈ 28 ms in DOM-heavy phases)
* Reversibility, refresh-robustness, reduced-motion, mobile and focus-management checks: see `MOTION-LAB.md` §5
* Enquiry form/API regression: unchanged (422 / 400 / honeypot / 503 not-configured paths re-tested)
* Bugs found & fixed in this pass: hero visual unmeasured/mistimed vs benchmark (8 iterations), GSAP percent-transform
  corruption after ScrollTrigger refresh (closing headline stuck hidden on phones), static hero invisible header, mobile
  hero clipped, chrome star covering mobile copy.
* Not verified: real GPUs/phones/Safari/Firefox, and the original's easing/pinning/reverse behaviour (not observable —
  the supplied URL is a catalogue page; the benchmark was the template's promo recording).

## Core Web Vitals (lab, home page, production build) — previous hero
| Profile | LCP | CLS |
|---|---|---|
| Desktop, unthrottled | 1.52 s | 0.00 |
| Mobile 390×844, CPU 4× slowdown, Fast 4G | 1.28 s | 0.00 |

Targets (LCP ≤ 2.5 s, CLS ≤ 0.1) met in lab conditions. **INP and real-user field data were not measured** — measure after launch with real traffic (PRD §15). LCP is bounded by the hero headline's masked-line reveal (text appears once hydration + fonts are ready; a CSS fail-safe un-hides it after 2.4 s regardless).
Initial JS ≈ 318 KB gzip; the 3D stack (three/R3F/drei, ~1 MB raw) is **not** in the initial load — verified.

## Responsive
Measured with same-origin iframes at **360×800, 390×844, 768×1024, 1024×768, 1440×900, 1920×1080** on **17 routes** (102 combinations):
* `documentElement.scrollWidth ≤ clientWidth` ✅ everywhere
* No text/button/input extends beyond the viewport ✅ everywhere (this second check caught a real bug — see below)
Visually inspected: home at 1440 and 390 (+ full page), service page at 1440 (full page), menu at 1440 and 360, contact form at 1440. **Tablet (768/1024) and 1920 were verified by measurement only, not by eye.**

## Bugs found and fixed during QA
1. Hero visual invisible — wrapper had `relative` + `absolute` classes fighting; fixed.
2. Header CTA visible on phones and pushing Menu off-screen at 360 px — my unlayered `.btn` CSS beat Tailwind's `hidden`. Moved all custom classes into `@layer base/components` (also fixes `max-w-*` overrides on `t-*` classes).
3. Atom-like fallback sculpture (resembled the React logo) — redrawn as a trefoil that matches the 3D object.
4. 3D scene too large/crowding the headline — camera pulled back, object offset right on wide canvases.
5. Process-step dimming broke AA contrast — dim marker/heading only.
6. Form failure copy told users to "email us" when no address may be published — reworded.
7. Success panel focus raced React's commit — moved to an effect.

## Functionality
| Area | Verified |
|---|---|
| Navigation overlay | Opens via button; focus moves to Close; background `inert`; scroll locked; **Escape closes and focus returns to Menu**; Tab/Shift+Tab stay inside; services list expanded on desktop (2-col) and mobile (inline, collapsible); targets ≥ 44 px (logo link raised to 44 px after the check) |
| Skip link | First Tab stop, becomes visible |
| Service routes | All 7 render; `/services/coming-soon` → 404 by design; every card links to its page |
| Client-side routing | Clicked through 7 routes with no runtime errors |
| FAQ accordion | `aria-expanded`/`aria-controls`; opens/closes; one-at-a-time; answers remain in DOM (inert + aria-hidden when collapsed) |
| Work filter | Chips are `aria-pressed` buttons; filtering Video → 2 projects; count announced via `role=status` |
| Enquiry form (client) | Empty submit → 4 inline errors with icon + text, error summary, focus to first invalid field; service preselected from `?service=` |
| Enquiry API (server) | Bad payload → 422 with field errors; malformed JSON → 400; submitted too fast → 400; honeypot → silent 200 with no delivery; rate limit → 429 |
| Form — no provider (production) | **503 and an honest “not sent” message; input retained** |
| Form — no provider (dev) | 202 → “Form works — nothing was sent” panel |
| Reduced motion | `prefers-reduced-motion: reduce` emulated: no canvas, static SVG, headline visible immediately, no pre-hidden text |
| Console | No errors on any route; one library warning (see limitations) |

## Not tested (be explicit)
* **Real email/webhook delivery** — no provider credentials exist. The Resend and webhook adapters are written but **never executed against a live service**. Turnstile likewise.
* **Real mobile hardware / iOS Safari / Android Chrome / Firefox / Safari** — only Chromium emulation. The 3D scene was verified on software-rendered WebGL only; GPU frame-rate on phones is unmeasured (the frame-rate guard and static fallback exist to protect this).
* Screen-reader walkthrough (NVDA/VoiceOver) — structure and ARIA verified via the accessibility tree and Lighthouse only.
* GSAP scroll effects were checked for errors and final states, not frame-by-frame smoothness. Scrub/ScrollTrigger on touch devices is unverified.
* INP, CrUX/field data, bundle budgets over time.
* Open Graph image rendering in social previews (route builds; not viewed in a scraper).

## Known limitations
* `THREE.Clock … deprecated` console warning comes from React Three Fiber's internals; harmless, resolves when R3F updates.
* Contact page renders dynamically (reads `?service=`); no fully static export.
* In-memory rate limiter resets per instance (see README).
* Imagery is generated vector art; all portfolio items are labelled concept studies pending approved client work.
* Design hooks flagged nothing, but no external design review has happened — art direction needs client sign-off.
