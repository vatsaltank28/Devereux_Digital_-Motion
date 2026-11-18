"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";

/**
 * Rotating word (after React Bits "RotatingText"), driven by anime.js:
 * letters of the current word flip out, the next word's letters flip in with a stagger.
 * Reduced motion: the first word stays put.
 */
export function RotatingText({ words, interval = 2400, className }: { words: string[]; interval?: number; className?: string }) {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      const letters = ref.current?.querySelectorAll(".rt-char");
      if (!letters?.length) return;
      animate(letters, {
        translateY: ["0%", "-110%"],
        opacity: [1, 0],
        duration: 320,
        ease: "inQuad",
        delay: stagger(18),
        onComplete: () => setI((n) => (n + 1) % words.length),
      });
    }, interval);
    return () => window.clearInterval(id);
  }, [interval, words.length]);

  useEffect(() => {
    const letters = ref.current?.querySelectorAll(".rt-char");
    if (!letters?.length || i === 0) return;
    animate(letters, {
      translateY: ["110%", "0%"],
      opacity: [0, 1],
      duration: 520,
      ease: "outExpo",
      delay: stagger(22),
    });
  }, [i]);

  const word = words[i]!;
  return (
    <span className={className}>
      <span className="sr-only">{words.join(", ")}</span>
      <span ref={ref} aria-hidden="true" className="rt-word">
        {Array.from(word).map((ch, k) => (
          <span key={`${i}-${k}`} className="rt-char">
            {ch === " " ? " " : ch}
          </span>
        ))}
      </span>
    </span>
  );
}
