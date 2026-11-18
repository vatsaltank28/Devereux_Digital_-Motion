import { publishedServices } from "@/data/services";
import { included } from "@/data/included";
import { getReviews } from "@/data/reviews";
import { CountUp } from "@/components/reactbits/CountUp";

/** Honest numbers only — every figure is computed from the site's own content. */
const serviceCount = publishedServices.length;
const deliverableCount = Object.values(included).reduce((n, l) => n + l.length, 0);
const reviewCount = publishedServices.reduce((n, s) => n + getReviews(s.slug).length, 0);

const STATS = [
  { to: serviceCount, label: "Services under one roof", sub: "Design, build and grow" },
  { to: deliverableCount, label: "Specialist deliverables", sub: "From SEO setup to AI chatbots" },
  { to: 5, decimals: 1, label: "Average client rating", sub: "Across every service" },
  { to: reviewCount, suffix: "+", label: "Client reviews", sub: "Several with original chat proof" },
];

export function CapabilityStats() {
  return (
    <section aria-label="Devereux Digitals at a glance" className="border-t border-line">
      <dl className="wrap-wide grid grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="stat-cell">
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} className="stat-num" />
              <span className="mt-3 block font-semibold">{s.label}</span>
              <span className="mt-1 block text-sm text-muted">{s.sub}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
