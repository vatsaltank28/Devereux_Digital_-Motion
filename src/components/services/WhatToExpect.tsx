import { cn } from "@/lib/cn";

/** Delivery commitments (client revision). Clear expectations, no guaranteed results or unlimited revisions. */
export const expectations = [
  "Clear project scope before work begins",
  "Agreed timelines and milestones",
  "Updates throughout development",
  "Defined revision rounds",
  "Testing before delivery",
  "Handover and agreed post launch support",
] as const;

export function ExpectList({ className }: { className?: string }) {
  return (
    <ul className={cn("expect-list", className)}>
      {expectations.map((e) => (
        <li key={e} className="expect-item">
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true" className="expect-tick">
            <path d="M3 8.5l3 3 7-7" />
          </svg>
          <span>{e}</span>
        </li>
      ))}
    </ul>
  );
}

/** Compact strip used on service pages, sits right after the process steps. */
export function WhatToExpect() {
  return (
    <section aria-labelledby="expect-title" className="border-t border-line py-8 md:py-12">
      <div className="wrap-wide grid gap-5 lg:grid-cols-12 lg:items-start lg:gap-10">
        <div className="lg:col-span-3">
          <h2 id="expect-title" className="t-h4">What to expect</h2>
          <p className="mt-1.5 text-sm text-muted">Clear delivery commitments on every project.</p>
        </div>
        <ExpectList className="lg:col-span-9" />
      </div>
    </section>
  );
}
