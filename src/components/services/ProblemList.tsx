import type { TitledText } from "@/data/types";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceSection } from "./ServiceSection";

/** S02, Problems we solve. */
export function ProblemList({ items }: { items: TitledText[] }) {
  return (
    <ServiceSection id="problems" label="The challenge" title="Problems we solve">
      <ul>
        {items.map((p, i) => (
          <li key={p.title} className="border-t border-line py-7 first:border-t-0 first:pt-0">
            <Reveal delay={i * 0.05}>
              <h3 className="t-h3 max-w-[22ch]">{p.title}</h3>
              <p className="t-body mt-3">{p.description}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </ServiceSection>
  );
}
