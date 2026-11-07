# Devereux Digitals — Motion Website

Premium dark-editorial agency site for **Devereux Digitals**, built around a pinned, scroll-scrubbed cinematic 3D hero.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · GSAP · Motion · Anime.js · React Three Fiber.

```bash
git clone https://github.com/vatsaltank28/Devereux_Digital_-Motion.git
cd Devereux_Digital_-Motion
npm install && npm run dev
```

| Doc | Purpose |
|---|---|
| `PRD.md` | Product requirements |
| `DESIGN.md` | Visual + motion system |
| `MOTION-LAB.md` | Cinematic hero study & timeline map |
| `QA-REPORT.md` | Requirement status |
| `CONTENT-CHECKLIST.md` | Content the client still needs to supply |

Source of truth: `PRD.md` (product), `DESIGN.md` (visual + motion), `MASTERPROMPT.md` (build brief). Status of every requirement: see `QA-REPORT.md`. What the client still has to supply: see `CONTENT-CHECKLIST.md`.

## Quick start

```bash
npm install
cp .env.example .env.local     # fill in what you have; every value is optional for local dev
npm run dev                    # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` / `npm start` | Production build / serve |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint (Next core-web-vitals + TypeScript rules) |
| `npm run check` | typecheck + lint + build |
| `npm run check:links` | Crawls the running site: every internal link, every `#anchor`, 404 behaviour (`BASE_URL=http://localhost:3000`) |

Requires Node ≥ 20.9 (developed on Node 24).

QA aid: append `?scene=force` to the home URL to keep the 3D hero running even if the frame-rate guard would hand over to the static fallback (useful on software-rendered VMs).

## Architecture

```
src/
  app/                    routes (App Router): /, /services, /services/[slug], /work, /work/[slug],
                          /about, /contact, /privacy, /terms, /api/enquiry, sitemap, robots, OG image
  components/
    layout/               SiteHeader, NavigationOverlay (focus-trapped dialog), SiteFooter
    home/                 Hero, HeroScene, SignalCoreScene (R3F), ServicesGrid, WhyChooseUs,
                          FeaturedWork, ProcessSection, FinalCTA
    services/             ServicePageTemplate + ServiceHero, ProblemList, DeliverablesGrid, ProcessSteps,
                          ServiceProjects, BenefitsBlock, Testimonials, PricingBlock, FAQAccordion, ServiceCTA
    portfolio/            ProjectCard, ProjectGrid (filters), CaseStudyLayout
    forms/                ProjectEnquiryForm
    motion/               MotionProvider, Reveal, SplitHeading
    reactbits/            Magnet, SpotlightCard (adapted from React Bits, credited in file headers)
    visuals/              LogoMark, SignalFallback, SignalLines, ProjectArt, ServiceGlyph
    ui/                   Button, Icons, SectionLabel, PageHero, Breadcrumbs, JsonLd
  data/                   CMS-ready typed content: services, projects, testimonials, faqs, home copy
  lib/                    site config, SEO helpers, analytics hook, GSAP setup, capability detection,
                          enquiry schema (shared) + enquiry-server (server-only)
  styles/                 tokens.css (design tokens) + globals.css (layers: base / components)
scripts/check-links.mjs   link + anchor crawler
```

**Content is separate from presentation.** Add a service, project, FAQ or testimonial by editing `src/data/*`; pages, sitemap, nav, footer and cards update automatically. The types mirror PRD §13, so the data modules can later be swapped for a headless CMS without touching components.

### Why Next.js (not Vite)
Per-route metadata/canonical/OG, `sitemap.ts`/`robots.ts`, static generation of all service and case-study pages, and a server-side route handler for the enquiry form (secrets stay off the client) all come built in.

### Animation ownership (one owner per element/property)
| Tool | Owns |
|---|---|
| **GSAP** + ScrollTrigger + SplitText | Masked line reveals on headings (`SplitHeading`), project-image mask/scale reveals, process rail + step highlight |
| **Motion for React** | Menu overlay, FAQ accordion, filter pill (layout), form-error enter/exit, route fade (`template.tsx`), in-view `Reveal` |
| **Anime.js v4** | SVG stroke drawing only: logo mark, fallback sculpture, closing-CTA arcs |
| **React Three Fiber** | Everything inside the hero canvas |
| **React Bits (adapted)** | `Magnet` (CTA pull, fine pointers only), `SpotlightCard` (service cards) |
| **CSS** | Hover/focus transitions, hero copy entrance (`hero-rise`), button feedback |

No Lenis (native scroll is kept for accessibility/back-forward behaviour), no post-processing, no second scroll engine.

### Homepage hero: cinematic scroll stage (current)
The homepage hero is now the pinned, scroll-scrubbed **cinematic stage** (`components/motion-lab`, copy in
`data/stage.ts`): a master GSAP timeline drives the DOM layers and a custom-shader R3F scene (particle sphere, camera
fly-through, chrome star) from one progress value, so it is fully reversible. Reduced motion, no-WebGL and no-JS get a
static twin. Experiment in isolation at **`/reference-motion-lab`** (progress HUD + unsmoothed scrub). Full study,
timeline map, match report and honest limits: **`MOTION-LAB.md`**.

### The Signal Core (previous 3D hero — retained, no longer on the homepage)
`components/home/Hero.tsx`, `HeroScene.tsx` and `SignalCoreScene.tsx` are unchanged and unused by the homepage. Delete them
if the cinematic stage is final, or swap `app/page.tsx` back to `<Hero />` to restore it.

#### Signal Core details
Dark-chrome torus knot + blue rim light + three orbits carrying **eight nodes (one per service)** + a pulsing signal core. Procedural light-formers (no HDRI download). Lazy-loaded behind `next/dynamic`, booted at browser idle, paused when offscreen, quality tiers via `lib/capabilities.ts`:

* `off` → static SVG sculpture: no WebGL, `prefers-reduced-motion`, data-saver, ≤2 cores/≤2 GB
* `low` → phones/tablets: DPR 1, fewer segments/particles, no pointer parallax
* `high` → desktop: DPR ≤1.75, full density, damped pointer parallax

A frame-rate monitor drops DPR first, then hands over to the SVG; WebGL context loss and render errors do the same. The canvas is `aria-hidden` and `pointer-events: none`.

## Enquiry form — integration

`POST /api/enquiry` validates with the same Zod schema as the browser (client validation is never trusted alone), applies a honeypot, a minimum-fill-time check and a per-IP rate limit, optionally verifies Cloudflare Turnstile, then delivers via **one** configured provider:

| Option | Variables |
|---|---|
| Resend email | `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL`, `ENQUIRY_TO_EMAIL` |
| Any webhook (Zapier/Make/n8n/CRM) | `ENQUIRY_WEBHOOK_URL`, optional `ENQUIRY_WEBHOOK_SECRET` |
| Turnstile (optional) | `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` |

Behaviour is deliberately honest: **with no provider configured, production returns 503 and the form says the message was not sent** (input is kept); development returns 202 and shows “Form works — nothing was sent”. It never fakes success. Form values are never sent to analytics.

Rate limiting is in-memory per instance. On serverless/multi-instance hosting add a WAF rule or a shared store (Upstash/KV).

## Environment variables
See `.env.example` (names only, no secrets). `NEXT_PUBLIC_SITE_URL` drives canonicals, sitemap and OG. Contact email/phone/social variables are optional: **anything left blank is simply not rendered** (no invented details).

## Deployment
Any Node host works (`npm run build && npm start`); Vercel is zero-config.

1. Set `NEXT_PUBLIC_SITE_URL` and the enquiry provider variables in the host's environment settings.
2. Build + start, then run `BASE_URL=https://your-domain npm run check:links`.
3. Submit `https://your-domain/sitemap.xml` to Search Console.
4. Privacy/Terms are `noindex` drafts — replace with approved copy, then remove `noindex` in `src/app/privacy|terms/page.tsx`.

The contact page reads `?service=` (dynamic render) and the API route is dynamic, so static-only export is not supported.

## Analytics
`lib/analytics.ts` emits `service_card_click`, `cta_click`, `contact_form_submit`, `contact_form_error`, `case_study_open` to `window.dataLayer` and a `devereux:track` DOM event. No provider is bundled until the client approves one (PRD §3.2); payloads never contain form values.

## Honesty rules baked into the code
* No testimonials: `Testimonials` renders nothing until approved entries exist in `data/testimonials.ts`.
* No prices: `PricingBlock` shows “request a tailored proposal” unless approved `packages[]` are added.
* Portfolio entries are **labelled concept projects** with no results claimed; real work replaces them via `data/projects.ts` (`isConcept: false`, `heroImage`, verified `results`).
* “Coming Soon” renders as a non-interactive card and has **no route** (404 by design) until the client confirms its behaviour.
