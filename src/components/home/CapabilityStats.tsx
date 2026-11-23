import Link from "next/link";
import { publishedServices } from "@/data/services";
import { included } from "@/data/included";
import { getReviews } from "@/data/reviews";

/** Figures are computed from the site's own content. Server rendered with no client JavaScript. */
const serviceCount = publishedServices.length;
const deliverableCount = Object.values(included).reduce((n, l) => n + l.length, 0);
const reviewCount = publishedServices.reduce((n, s) => n + getReviews(s.slug).length, 0);

const STATS = [
  { value: String(serviceCount), label: "Services under one roof", sub: "Design, build and grow", href: "/services" },
  { value: String(deliverableCount), label: "Specialist deliverables", sub: "From SEO setup to AI chatbots", href: "/services" },
  { value: "5.0", label: "Average client rating", sub: "Across every service", href: "/#reviews" },
  { value: String(reviewCount), label: "Client reviews", sub: "Several with original chat proof", href: "/services/web-design-development#reviews" },
];

export function CapabilityStats() {
  return (
    <section aria-labelledby="results-title" className="proof-band">
      <div className="wrap-wide">
        <div className="proof-head">
          <h2 id="results-title" className="t-h2">The work speaks. The results matter.</h2>
          <p>One team across strategy, design, technology and growth, with feedback from the clients we work with.</p>
        </div>
        <dl className="proof-grid">
          {STATS.map((s) => (
            <div key={s.label} className="proof-item">
              <dt>
                <Link href={s.href}>{s.label}</Link>
                <span>{s.sub}</span>
              </dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
