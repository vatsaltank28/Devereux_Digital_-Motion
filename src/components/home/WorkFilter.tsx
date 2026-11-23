"use client";

import { useState, type ReactNode } from "react";

/** Filters server-rendered cards with a data attribute, so project data stays out of the client bundle. */
export function WorkFilter({ filters, children }: { filters: { id: string; label: string; count: number }[]; children: ReactNode }) {
  const [active, setActive] = useState("all");
  const current = filters.find((f) => f.id === active);
  return (
    <div className="sw" data-filter={active}>
      <div role="group" aria-label="Filter selected work" className="work-filters">
        {filters.map((f) => (
          <button key={f.id} type="button" aria-pressed={active === f.id} onClick={() => setActive(f.id)} className="work-filter">
            {f.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">{`Showing ${current?.count ?? 0} projects`}</p>
      {children}
    </div>
  );
}
