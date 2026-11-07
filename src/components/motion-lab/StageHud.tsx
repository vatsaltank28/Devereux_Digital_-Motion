"use client";

import { useEffect, useRef, type RefObject } from "react";
import { phaseName } from "./timeline";
import type { Progress } from "./StageScene";

/**
 * Debug HUD for /reference-motion-lab: live scroll progress + phase name, and a slider that scrolls the page
 * to an exact progress value (used for side-by-side captures). Writes to the DOM directly — no React renders.
 */
export function StageHud({ rootRef, prog }: { rootRef: RefObject<HTMLElement | null>; prog: { current: Progress } }) {
  const valueRef = useRef<HTMLSpanElement>(null);
  const phaseRef = useRef<HTMLSpanElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = prog.current.v;
      if (valueRef.current) valueRef.current.textContent = p.toFixed(3);
      if (phaseRef.current) phaseRef.current.textContent = phaseName(p);
      if (sliderRef.current && document.activeElement !== sliderRef.current) sliderRef.current.value = String(p);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [prog]);

  const seek = (p: number) => {
    const el = rootRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top + p * (el.offsetHeight - window.innerHeight));
  };

  return (
    <div className="fixed bottom-3 left-3 z-[90] w-[min(92vw,360px)] rounded-xl border border-white/20 bg-black/80 p-3 font-mono text-[11px] text-white backdrop-blur">
      <div className="flex justify-between">
        <span>
          progress <span ref={valueRef}>0.000</span>
        </span>
        <span ref={phaseRef} className="text-right text-violet-300" />
      </div>
      <input
        ref={sliderRef}
        type="range"
        min={0}
        max={1}
        step={0.001}
        defaultValue={0}
        aria-label="Scroll progress"
        onChange={(e) => seek(Number(e.target.value))}
        className="mt-2 w-full"
      />
    </div>
  );
}
