"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { serviceWork } from "@/data/media";

/**
 * Hero visual: a stack of real client work in browser frames, with result chips floating around it.
 * anime.js handles the staggered entrance and a slow idle float; the pointer tilts the stack (parallax).
 * Everything is static for reduced motion.
 */
const CARDS = [
  { img: serviceWork["ecommerce-solutions"]![0]!, label: "Ecommerce", cls: "hs-card--a" },
  { img: serviceWork["branding-creative-design"]![0]!, label: "Branding", cls: "hs-card--b" },
  { img: serviceWork["ai-business-solutions"]![0]!, label: "AI & Automation", cls: "hs-card--c" },
];

const CHIPS = [
  { text: "Orders doubled this month", tone: "pink", cls: "hs-chip--1" },
  { text: "5.0 ★ client rating", tone: "white", cls: "hs-chip--2" },
  { text: "$20K deal closed from ads", tone: "cobalt", cls: "hs-chip--3" },
];

export function HeroShowcase() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cards = el.querySelectorAll<HTMLElement>(".hs-card");
    const chips = el.querySelectorAll<HTMLElement>(".hs-chip");

    animate(cards, { opacity: [0, 1], translateY: [60, 0], scale: [0.92, 1], duration: 1200, ease: "outExpo", delay: stagger(140, { start: 250 }) });
    animate(chips, { opacity: [0, 1], translateX: [-24, 0], duration: 900, ease: "outBack(1.6)", delay: stagger(180, { start: 900 }) });
    const floats = [...chips].map((c, i) =>
      animate(c, { translateY: [0, i % 2 ? 10 : -10], duration: 2600 + i * 400, ease: "inOutSine", loop: true, alternate: true, delay: 1800 }),
    );

    const stack = el.querySelector<HTMLElement>(".hs-stack")!;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      animate(stack, { rotateY: x * 10, rotateX: -y * 8, duration: 800, ease: "outQuad" });
    };
    const onLeave = () => animate(stack, { rotateY: 0, rotateX: 0, duration: 900, ease: "outElastic(1, .6)" });
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      floats.forEach((f) => f.pause());
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={root} className="hs-root" aria-label="Recent client work" role="group">
      <div aria-hidden="true" className="hs-aurora" />
      <div className="hs-stack">
        {CARDS.map((c) => (
          <figure key={c.label} className={`hs-card ${c.cls}`}>
            <div className="hs-bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>{c.label}</span>
            </div>
            <Image src={c.img.src} alt={c.img.alt} width={c.img.width} height={c.img.height} sizes="(max-width: 1024px) 70vw, 30vw" priority className="hs-img" />
          </figure>
        ))}
        {CHIPS.map((c) => (
          <p key={c.text} className={`hs-chip hs-chip--${c.tone} ${c.cls}`}>
            <span aria-hidden="true" className="hs-chip-dot" />
            {c.text}
          </p>
        ))}
      </div>
    </div>
  );
}
