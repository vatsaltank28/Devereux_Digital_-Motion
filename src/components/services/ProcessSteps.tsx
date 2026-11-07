import type { TitledText } from "@/data/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";

/** S04 — Our process. A genuine sequence, so numbered. Horizontal rail on desktop, vertical on mobile. */
export function ProcessSteps({ steps }: { steps: TitledText[] }) {
  return (
    <section id="process" aria-labelledby="process-steps-title" className="section-tight border-t border-line">
      <div className="wrap-wide">
        <SectionLabel>How it works</SectionLabel>
        <SplitHeading id="process-steps-title" className="t-h2 mt-5">
          Our process
        </SplitHeading>

        <ol className="mt-12 grid gap-0 lg:mt-16 lg:grid-cols-5 lg:gap-6">
          {steps.map((s, i) => (
            <li key={s.title} className="relative border-l border-line pb-10 pl-8 last:pb-0 lg:border-l-0 lg:border-t lg:pb-0 lg:pl-0 lg:pt-8">
              <Reveal delay={i * 0.06}>
                <span className="absolute -left-[0.95rem] top-0 grid size-[1.9rem] place-items-center rounded-full border border-line-strong bg-bg font-display text-xs font-semibold tabular-nums lg:-top-[0.95rem] lg:left-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h4">{s.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{s.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
