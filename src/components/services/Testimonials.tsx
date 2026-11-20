import type { Testimonial } from "@/data/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";

/**
 * Client reviews (PRD S07). Renders NOTHING unless approved testimonials are passed in.
 * no placeholder quotes, no star ratings, no invented identities. Static (no auto playing carousel).
 */
export function Testimonials({ items, heading = "Client reviews" }: { items: Testimonial[]; heading?: string }) {
  const approved = items.filter((t) => t.approvedForPublication);
  if (approved.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-title" className="section-tight border-t border-line">
      <div className="wrap-wide">
        <SectionLabel>Testimonials</SectionLabel>
        <SplitHeading id="testimonials-title" className="t-h2 mt-5">
          {heading}
        </SplitHeading>
        <ul className="mt-12 grid gap-10 lg:grid-cols-2">
          {approved.map((t) => (
            <li key={`${t.personName}-${t.company}`}>
              <figure className="border-t border-line-strong pt-6">
                <blockquote className="font-display text-[clamp(1.35rem,1.1rem+1vw,2rem)] leading-snug tracking-[-0.02em]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm text-muted">
                  <span className="font-semibold text-ink">{t.personName}</span>, {t.role}, {t.company}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
