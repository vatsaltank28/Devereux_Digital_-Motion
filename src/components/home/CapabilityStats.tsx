import Link from "next/link";
import { publishedServices } from "@/data/services";
import { included } from "@/data/included";
import { getReviews } from "@/data/reviews";
import { CountUp } from "@/components/reactbits/CountUp";
import { StatsReveal } from "./StatsReveal";

/** Honest numbers only: every figure is computed from the site's own content. */
const serviceCount = publishedServices.length;
const deliverableCount = Object.values(included).reduce((n, l) => n + l.length, 0);
const reviewCount = publishedServices.reduce((n, s) => n + getReviews(s.slug).length, 0);

const ICONS = {
  grid: <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />,
  layers: <path d="M12 3 2 8l10 5 10-5-10-5ZM2 16l10 5 10-5M2 12l10 5 10-5" />,
  star: <path d="M12 2.8l2.85 5.8 6.35.92-4.6 4.48 1.08 6.32L12 17.3l-5.68 3.02 1.08-6.32L2.8 9.52l6.35-.92z" />,
  chat: <path d="M21 12a8 8 0 0 1-11.6 7.14L4 20.5l1.36-4.9A8 8 0 1 1 21 12Z" />,
};

const STATS = [
  { to: serviceCount, label: "Services under one roof", sub: "Design, build and grow", icon: ICONS.grid, href: "/#services", cta: "View services" },
  { to: deliverableCount, label: "Specialist deliverables", sub: "From SEO setup to AI chatbots", icon: ICONS.layers, href: "/services", cta: "See what's included" },
  { to: 5, decimals: 1, label: "Average client rating", sub: "Across every service", icon: ICONS.star, href: "/#client-review", cta: "Read the review" },
  { to: reviewCount, suffix: "+", label: "Client reviews", sub: "Several with original chat proof", icon: ICONS.chat, href: "/services/web-design-development#reviews", cta: "See client feedback" },
];

export function CapabilityStats() {
  return (
    <section aria-label="Devereux Digitals at a glance" className="stats-band relative isolate overflow-hidden border-t border-line">
      <div aria-hidden="true" className="stats-band-glow" />
      <StatsReveal className="wrap-wide stats-grid grid grid-cols-2 lg:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.label} className="stat-cell" style={{ "--i": i } as React.CSSProperties}>
            <span aria-hidden="true" className="stat-line" />
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <Link href={s.href} className="stat-link" aria-label={`${s.label}: ${s.cta}`}>
              <span aria-hidden="true" className="stat-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
                  {s.icon}
                </svg>
              </span>
              <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} className="stat-num mt-6" />
              <span className="mt-3 block font-semibold">{s.label}</span>
              <span className="mt-1 block text-sm text-muted">{s.sub}</span>
              <span aria-hidden="true" className="stat-cta">{s.cta} →</span>
              </Link>
            </dd>
          </div>
        ))}
      </StatsReveal>
    </section>
  );
}
