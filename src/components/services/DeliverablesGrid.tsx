import type { TitledText } from "@/data/types";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceSection } from "./ServiceSection";

/** S03, What we deliver. Service-specific deliverables, never recycled between services. */
export function DeliverablesGrid({ items }: { items: TitledText[] }) {
  return (
    <ServiceSection id="deliverables" label="Scope" title="What we deliver">
      <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2">
        {items.map((d, i) => (
          <li key={d.title} className="bg-surface">
            <Reveal delay={(i % 2) * 0.05} className="h-full p-6 md:p-8">
              <span aria-hidden="true" className="mb-5 block size-2 bg-accent" />
              <h3 className="t-h4">{d.title}</h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">{d.description}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </ServiceSection>
  );
}
