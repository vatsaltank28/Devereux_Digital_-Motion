"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";

/** Count-up number (after React Bits "CountUp"), animated with anime.js once it scrolls into view. */
export function CountUp({ to, decimals = 0, suffix = "", className }: { to: number; decimals?: number; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const obj = { v: 0 };
    el.textContent = (0).toFixed(decimals) + suffix;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e?.isIntersecting) return;
        io.disconnect();
        animate(obj, {
          v: to,
          duration: 1800,
          ease: "outExpo",
          onUpdate: () => {
            el.textContent = obj.v.toFixed(decimals) + suffix;
          },
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, decimals, suffix]);

  return (
    <span ref={ref} className={className}>
      {to.toFixed(decimals) + suffix}
    </span>
  );
}
