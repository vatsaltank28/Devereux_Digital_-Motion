"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Adds `is-in` once the stats strip scrolls into view (drives the staggered CSS entrance),
 * and feeds the pointer position to each cell for the hover spotlight.
 */
export function StatsReveal({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        el.classList.add("is-in");
        io.disconnect();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    const onMove = (e: PointerEvent) => {
      const cell = (e.target as HTMLElement).closest<HTMLElement>(".stat-cell");
      if (!cell) return;
      const r = cell.getBoundingClientRect();
      cell.style.setProperty("--mx", `${e.clientX - r.left}px`);
      cell.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("pointermove", onMove);
    return () => {
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <dl ref={ref} className={className}>
      {children}
    </dl>
  );
}
