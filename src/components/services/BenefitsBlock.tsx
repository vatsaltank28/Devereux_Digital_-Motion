import type { TitledText } from "@/data/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";

/** S06 — Benefits / why choose us. Each benefit ties to a method or deliverable, no empty superlatives. */
export function BenefitsBlock({ items }: { items: TitledText[] }) {
  return (
    <section id="benefits" aria-labelledby="benefits-title" className="section-tight border-t border-line">
      <div className="wrap-wide">
        <SectionLabel>Why choose us</SectionLabel>
        <SplitHeading id="benefits-title" className="t-h2 mt-5 max-w-[16ch]">
          What you can expect
        </SplitHeading>
        <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {items.map((b, i) => (
            <li key={b.title} className="border-t border-line-strong pt-6">
              <Reveal delay={i * 0.06}>
                <h3 className="t-h3">{b.title}</h3>
                <p className="t-body mt-3">{b.description}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
