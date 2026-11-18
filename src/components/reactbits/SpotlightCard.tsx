"use client";

/**
 * SpotlightCard, adapted from React Bits (https://www.reactbits.dev/ · github.com/DavidHDev/react-bits, MIT + Commons Clause).
 *
 * Changes from upstream:
 *  - Simplified to a pointer-following radial light plus a lit border (the two effects used on the services grid).
 *  - Visual tokens come from the project design system; shape/padding are controlled by the caller via className.
 *  - Keyboard parity: focus-within lights the card (DESIGN.md §4.3, "focus state at least as clear as hover").
 *  - Light is driven by CSS variables updated in one rAF; skipped for touch and reduced-motion.
 *  - Owns only the --mx/--my/--glow variables; no other library writes to this element's style.
 */
import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Light colour as an "r, g, b" triple. */
  spotlightRgb?: string;
  size?: number;
}

export default function SpotlightCard({
  children,
  className,
  spotlightRgb = "57, 139, 255",
  size = 340,
  style,
  ...rest
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let nx = 0;
    let ny = 0;
    const paint = () => {
      raf = 0;
      el.style.setProperty("--mx", `${nx}px`);
      el.style.setProperty("--my", `${ny}px`);
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      nx = e.clientX - r.left;
      ny = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const on = () => el.style.setProperty("--glow", "1");
    const off = () => el.style.setProperty("--glow", "0");

    if (fine && !reduce) {
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerenter", on);
      el.addEventListener("pointerleave", off);
    }
    // Focus parity for keyboard users
    const onFocusIn = (e: FocusEvent) => {
      if (!(e.target instanceof Element) || !e.target.matches(":focus-visible")) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${r.width * 0.5}px`);
      el.style.setProperty("--my", `${r.height * 0.35}px`);
      on();
    };
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", off);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", on);
      el.removeEventListener("pointerleave", off);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", off);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("spotlight-card", className)}
      style={{ "--mx": "50%", "--my": "0%", "--glow": "0", "--rgb": spotlightRgb, "--size": `${size}px`, ...style } as React.CSSProperties}
      {...rest}
    >
      {children}
    </div>
  );
}
