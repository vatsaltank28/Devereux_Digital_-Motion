import { Reveal } from "@/components/motion/Reveal";
import { ServiceSection } from "./ServiceSection";

/** What's included, the client's sub-services for this service, listed right after the overview. */
export function IncludedList({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ServiceSection id="included" label="Scope" title="What’s included">
      <ol className="included-list grid sm:grid-cols-2">
        {items.map((item, i) => (
          <li key={item}>
            <Reveal delay={(i % 2) * 0.05} className="included-item group">
              <span className="included-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="included-title">{item}</span>
              <span aria-hidden="true" className="included-tick">
                <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8.5l3 3 7-7" />
                </svg>
              </span>
            </Reveal>
          </li>
        ))}
      </ol>
    </ServiceSection>
  );
}
