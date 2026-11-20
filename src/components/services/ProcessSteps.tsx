import type { TitledText } from "@/data/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";

/** S04, Our process. A genuine sequence, so numbered. Horizontal rail on desktop, vertical on mobile. */
export function ProcessSteps({ steps, label = "How it works", title = "Our process" }: { steps: TitledText[]; label?: string; title?: string }) {
  return (
    <section id="process" aria-labelledby="process-steps-title" className="section-tight border-t border-line">
      <div className="wrap-wide">
        <SectionLabel>{label}</SectionLabel>
        <SplitHeading id="process-steps-title" className="t-h2 mt-5">
          {title}
        </SplitHeading>

        <ol className="mt-8 grid gap-0 md:mt-12 lg:mt-16 lg:grid-cols-5 lg:gap-6">
          {steps.map((s, i) => (
            <li key={s.title} className="relative border-l border-line pb-6 pl-7 last:pb-0 md:pb-10 md:pl-8 lg:border-l-0 lg:border-t lg:pb-0 lg:pl-0 lg:pt-8">
              {/* Badge sits outside <Reveal>: the reveal's transform would otherwise become its positioning parent */}
              <span className="absolute -left-[0.95rem] top-0 z-[1] grid size-[1.9rem] place-items-center rounded-full border border-line-strong bg-bg font-display text-xs font-semibold tabular-nums lg:-top-[0.95rem] lg:left-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <Reveal delay={i * 0.06}>
                <h3 className="t-h4">{s.title}</h3>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-muted md:mt-3">{s.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
