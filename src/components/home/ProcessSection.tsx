"use client";

import { useRef } from "react";
import { howWeWork } from "@/data/home";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";

/**
 * 04 — How we work. GSAP ScrollTrigger owns the rail progress (scrubbed scaleY) and the step highlight.
 * No pinning and no scroll hijack: the left column is plain CSS `sticky` on large screens only.
 * Reduced motion: everything is shown fully lit, statically.
 */
export function ProcessSection() {
  const list = useRef<HTMLOListElement>(null);
  const progress = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const steps = gsap.utils.toArray<HTMLElement>("[data-step]", list.current);
        gsap.fromTo(
          progress.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: list.current, start: "top 62%", end: "bottom 62%", scrub: true },
          },
        );
        steps.forEach((step) =>
          ScrollTrigger.create({
            trigger: step,
            start: "top 64%",
            onEnter: () => step.classList.add("is-active"),
            onLeaveBack: () => step.classList.remove("is-active"),
          }),
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(progress.current, { scaleY: 1 });
      });
    },
    { scope: list },
  );

  return (
    <section aria-labelledby="process-title" className="section border-t border-line">
      <div className="wrap-wide grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <SectionLabel index="04">Process</SectionLabel>
            <SplitHeading id="process-title" className="t-h2 mt-6">
              {howWeWork.title}
            </SplitHeading>
            <p className="t-body mt-6 max-w-[26rem]">{howWeWork.intro}</p>
          </div>
        </div>

        <ol ref={list} className="relative lg:col-span-6 lg:col-start-7">
          <div aria-hidden="true" className="absolute bottom-3 left-[0.95rem] top-3 w-px bg-line" />
          <div
            ref={progress}
            aria-hidden="true"
            className="absolute bottom-3 left-[0.95rem] top-3 w-px origin-top bg-accent"
            style={{ transform: "scaleY(0)" }}
          />
          {howWeWork.steps.map((step, i) => (
            <li key={step.title} data-step className="process-step relative pb-12 pl-14 last:pb-0 md:pb-16">
              <span className="process-dot absolute left-0 top-0 grid size-[1.95rem] place-items-center rounded-full border border-line-strong bg-bg font-display text-xs font-semibold tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="t-h3">{step.title}</h3>
              <p className="t-body mt-3 max-w-[34rem]">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
