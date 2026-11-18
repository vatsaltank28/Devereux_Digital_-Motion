import Link from "next/link";
import { homeStage } from "@/data/stage";
import { ArrowRight } from "@/components/ui/Icons";
import { HeroShowcase } from "./HeroShowcase";
import { RotatingText } from "@/components/reactbits/RotatingText";

/**
 * Landing hero (replaces the cinematic scroll stage, per client feedback).
 * Black & white with cobalt + hot-pink accents. One idea: your business at the centre,
 * Design · Build · Grow on the left; a stack of real client work on the right (anime.js).
 */
const COBALT = "#2f6bff";
const PINK = "#ff2e88";
const WHITE = "#f4f5f8";

const PILLARS = [
  {
    name: "Design",
    color: COBALT,
    line: "How you look and feel.",
    services: [
      { title: "Branding & Creative Design", href: "/services/branding-creative-design" },
      { title: "Web Design", href: "/services/web-design-development" },
    ],
  },
  {
    name: "Build",
    color: WHITE,
    line: "What your customers use.",
    services: [
      { title: "Websites & Development", href: "/services/web-design-development" },
      { title: "E-commerce Solutions", href: "/services/ecommerce-solutions" },
      { title: "AI & Business Solutions", href: "/services/ai-business-solutions" },
    ],
  },
  {
    name: "Grow",
    color: PINK,
    line: "How people find you.",
    services: [
      { title: "Digital & Sales Marketing", href: "/services/digital-marketing" },
      { title: "Paid Advertising", href: "/services/paid-advertising" },
      { title: "Video & Content", href: "/services/video-content" },
    ],
  },
] as const;

export function HomeHero() {
  const { hero, services } = homeStage;
  return (
    <section aria-labelledby="hero-title" className="home-hero relative isolate overflow-hidden">
      <div aria-hidden="true" className="home-hero-grid" />
      <div aria-hidden="true" className="home-hero-glow" />

      <div className="wrap-wide grid items-start gap-12 pb-16 pt-[calc(var(--header-h)+3rem)] lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-[calc(var(--header-h)+4.5rem)]">
        <div className="lg:col-span-6">
          <p className="hero-rise home-eyebrow">
            <span aria-hidden="true" className="home-eyebrow-dot" /> Full-service digital agency
          </p>
          <h1 id="hero-title" className="hero-rise mt-6 font-display text-[clamp(2.4rem,1.4rem+3vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.045em]" style={{ animationDelay: "0.08s" }}>
            Digital experiences that move businesses <span className="home-accent-text">forward.</span>
          </h1>
          <p className="hero-rise mt-7 flex flex-wrap items-baseline gap-x-2 font-display text-[clamp(1.25rem,1rem+1vw,1.75rem)] font-medium" style={{ animationDelay: "0.14s" }}>
            <span className="text-muted">We build</span>
            <RotatingText
              className="home-rotator"
              words={["high-converting websites", "Shopify stores", "Meta & Google ad campaigns", "brand identities", "AI automations", "scroll-stopping content"]}
            />
          </p>
          <p className="hero-rise t-lead mt-5 max-w-[34rem]" style={{ animationDelay: "0.2s" }}>
            {hero.body}
          </p>

          <ul className="hero-rise mt-10 divide-y divide-line border-y border-line" style={{ animationDelay: "0.28s" }}>
            {PILLARS.map((p) => (
              <li key={p.name} className="grid gap-3 py-5 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
                <div>
                  <p className="flex items-center gap-2.5 font-display text-xl font-semibold">
                    <span aria-hidden="true" className="size-2.5 rounded-full" style={{ background: p.color, boxShadow: `0 0 12px ${p.color}` }} />
                    {p.name}
                  </p>
                  <p className="mt-1 text-sm text-muted">{p.line}</p>
                </div>
                <ul className="flex flex-wrap content-start gap-2">
                  {p.services.map((s) => (
                    <li key={s.title}>
                      <Link href={s.href} className="home-chip">
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="hero-rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ animationDelay: "0.38s" }}>
            <Link href={hero.primary.href} className="btn btn-primary">
              <span>{hero.primary.label}</span>
              <ArrowRight />
            </Link>
            <Link href={hero.secondary.href} className="btn btn-secondary">
              {hero.secondary.label}
            </Link>
          </div>
        </div>

        <div className="flex justify-center lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:col-span-6 lg:self-start lg:pt-10">
          <HeroShowcase />
        </div>
      </div>

      {/* Seven services. One team. — a slow ticker of every service */}
      <nav className="home-ticker border-t border-line" aria-label={services.title}>
        <div className="home-ticker-track">
          {[0, 1].map((dup) => (
            <ul key={dup} className="home-ticker-row" aria-hidden={dup === 1 || undefined}>
              {services.items.map((s) => (
                <li key={s.title}>
                  {dup === 0 ? <Link href={s.href}>{s.title}</Link> : <span>{s.title}</span>}
                  <span aria-hidden="true" className="home-ticker-sep">✦</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </nav>
    </section>
  );
}
