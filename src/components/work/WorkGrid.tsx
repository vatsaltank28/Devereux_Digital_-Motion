"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { activeCategories, portfolio, type PortfolioCategory } from "@/data/portfolio";
import { track } from "@/lib/analytics";
import { ProjectCard } from "./ProjectCard";

type Filter = PortfolioCategory | "all";

const tabs: { id: Filter; label: string; count: number }[] = [
  { id: "all", label: "All Projects", count: portfolio.length },
  ...activeCategories.map((c) => ({ id: c.id, label: c.label, count: portfolio.filter((p) => p.category === c.id).length })),
];
const isFilter = (v: string | null): v is Filter => !!v && tabs.some((t) => t.id === v);

/** Pure grid + filter tabs. */
export function WorkGridView({ filter, onSelect }: { filter: Filter; onSelect?: (f: Filter) => void }) {
  const list = useMemo(() => (filter === "all" ? portfolio : portfolio.filter((p) => p.category === filter)), [filter]);
  return (
    <>
      <div role="toolbar" aria-label="Filter projects by category" className="work-filters">
        {tabs.map((t) => (
          <button key={t.id} type="button" aria-pressed={filter === t.id} onClick={() => onSelect?.(t.id)} className="work-filter">
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

/**
 * Filterable portfolio grid. The active filter lives in the URL (`/work?category=ecommerce`), so the
 * Work menu in the header can deep link to a category and the choice survives refresh and sharing.
 */
export function WorkGrid() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const raw = params.get("category");
  const filter: Filter = isFilter(raw) ? raw : "all";
  return (
    <WorkGridView
      filter={filter}
      onSelect={(f) => {
        track("portfolio_filter", { category: f });
        router.replace(f === "all" ? pathname : `${pathname}?category=${f}`, { scroll: false });
      }}
    />
  );
}
