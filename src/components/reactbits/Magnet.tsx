"use client";

/**
 * Magnet — adapted from React Bits (https://www.reactbits.dev/ · github.com/DavidHDev/react-bits, MIT + Commons Clause).
 *
 * Changes from upstream (kept intentionally small):
 *  - Condensed to a single self-contained spring loop per instance (no cross-instance registry).
 *  - Only engages for fine pointers that can hover, and never under prefers-reduced-motion (DESIGN.md §6.3, §7.3).
 *  - Owns the `transform` of its inner wrapper only; nothing else in the app animates that node.
 */
import { useEffect, useRef, type HTMLAttributes, type ReactNode } from "react";

interface MagnetProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /** Distance (px) outside the element at which the pull begins. */
  padding?: number;
  /** Higher = weaker pull. */
  magnetStrength?: number;
  /** Maximum travel in px. */
  maxOffset?: number;
  disabled?: boolean;
  wrapperClassName?: string;
  innerClassName?: string;
}

const STIFFNESS = 170;
const DAMPING = 18;

export default function Magnet({
  children,
  padding = 80,
  magnetStrength = 3,
  maxOffset = 14,
  disabled = false,
  wrapperClassName,
  innerClassName,
  ...rest
}: MagnetProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner || disabled) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const pos = { x: 0, y: 0 };
    const vel = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let raf = 0;
    let last = 0;

    const frame = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
      last = now;
      let resting = true;
      for (const k of ["x", "y"] as const) {
        const force = STIFFNESS * (target[k] - pos[k]) - DAMPING * vel[k];
        vel[k] += force * dt;
        pos[k] += vel[k] * dt;
        if (Math.abs(target[k] - pos[k]) > 0.05 || Math.abs(vel[k]) > 0.05) resting = false;
      }
      if (resting) {
        pos.x = target.x;
        pos.y = target.y;
        vel.x = vel.y = 0;
      }
      inner.style.transform = `translate3d(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px, 0)`;
      if (resting) {
        raf = 0;
        last = 0;
      } else raf = requestAnimationFrame(frame);
    };
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const r = wrapper.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const outside = Math.hypot(Math.max(0, Math.abs(dx) - r.width / 2), Math.max(0, Math.abs(dy) - r.height / 2));
      if (outside <= padding) {
        let x = dx / magnetStrength;
        let y = dy / magnetStrength;
        const len = Math.hypot(x, y);
        if (len > maxOffset) {
          x *= maxOffset / len;
          y *= maxOffset / len;
        }
        target.x = x;
        target.y = y;
        wake();
      } else if (target.x !== 0 || target.y !== 0) {
        target.x = target.y = 0;
        wake();
      }
    };
    const reset = () => {
      target.x = target.y = 0;
      wake();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", reset);
      if (raf) cancelAnimationFrame(raf);
      inner.style.transform = "";
    };
  }, [padding, magnetStrength, maxOffset, disabled]);

  return (
    <div ref={wrapperRef} className={wrapperClassName} style={{ display: "inline-block" }} {...rest}>
      <div ref={innerRef} className={innerClassName} style={{ willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}
