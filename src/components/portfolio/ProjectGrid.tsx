"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import type { Project } from "@/data/types";
import { publishedServices } from "@/data/services";
import { cn } from "@/lib/cn";
import { ProjectCard } from "./ProjectCard";

/**
 * Portfolio index grid with service filters (PRD §11 — only meaningful because several services have work).
 * Filter chips are real buttons with aria-pressed; the result count is announced via aria-live.
 * Motion owns the chip underline (shared layout) and card enter/exit; GSAP owns each card's artwork reveal.
 */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string>("all");

  const filters = useMemo(
    () =>
      publishedServices
        .map((s) => ({ slug: s.slug, label: s.shortTitle, count: projects.filter((p) => p.serviceTags.includes(s.slug)).length }))
        .filter((f) => f.count > 0),
    [projects],
  );

  const visible = active === "all" ? projects : projects.filter((p) => p.serviceTags.includes(active));

  if (projects.length === 0) {
    return (
      <div className="card p-10 text-center">
        <h2 className="t-h3">No projects published yet</h2>
        <p className="t-body mx-auto mt-3">Work will appear here once projects are approved for publication.</p>
      </div>
    );
  }

  return (
    <div>
      <div role="group" aria-label="Filter work by service" className="-mx-1 flex flex-wrap gap-2">
        {[{ slug: "all", label: "All work", count: projects.length }, ...filters].map((f) => {
          const on = active === f.slug;
          return (
            <button
              key={f.slug}
              type="button"
              aria-pressed={on}
              onClick={() => setActive(f.slug)}
              className={cn(
                "relative mx-1 min-h-11 rounded-full border px-5 text-sm font-semibold transition-colors",
                on ? "border-transparent text-[var(--color-on-accent)]" : "border-line-strong text-muted hover:border-white/55 hover:text-ink",
              )}
            >
              {on && (
                <m.span
                  layoutId="work-filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              <span className="relative">
                {f.label} <span className="opacity-70">({f.count})</span>
              </span>
            </button>
          );
        })}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      <ul className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((p) => (
            <m.li
              key={p.slug}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={p} />
            </m.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}
