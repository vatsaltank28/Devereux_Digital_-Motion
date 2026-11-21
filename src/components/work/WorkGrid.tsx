"use client";

import { useMemo, useState } from "react";
import { activeCategories, portfolio, type PortfolioCategory } from "@/data/portfolio";
import { track } from "@/lib/analytics";
import { ProjectCard } from "./ProjectCard";

/** Filterable portfolio grid. Only categories that contain work are offered (no empty filters). */
export function WorkGrid({ initial = "all" }: { initial?: PortfolioCategory | "all" }) {
  const [filter, setFilter] = useState<PortfolioCategory | "all">(initial);
  const list = useMemo(() => (filter === "all" ? portfolio : portfolio.filter((p) => p.category === filter)), [filter]);
  const tabs: { id: PortfolioCategory | "all"; label: string; count: number }[] = [
    { id: "all", label: "All Projects", count: portfolio.length },
    ...activeCategories.map((c) => ({ id: c.id, label: c.label, count: portfolio.filter((p) => p.category === c.id).length })),
  ];

  return (
    <>
      <div role="toolbar" aria-label="Filter projects by category" className="work-filters">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={filter === t.id}
            onClick={() => {
              setFilter(t.id);
              track("portfolio_filter", { category: t.id });
            }}
            className="work-filter"
          >
            {t.label} <span className="work-filter-count">{t.count}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        {`Showing ${list.length} ${list.length === 1 ? "project" : "projects"}`}
      </p>
      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {list.map((p, i) => (
          <li key={p.slug} className="work-grid-item flex" style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}>
            <ProjectCard project={p} className="w-full" priority={i < 3} headingLevel={2} />
          </li>
        ))}
      </ul>
    </>
  );
}
