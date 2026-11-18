"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

interface SplitHeadingProps {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  /** "load" plays immediately (hero); "scroll" plays when the heading enters the viewport. */
  trigger?: "load" | "scroll";
  /** Seconds */
  delay?: number;
  id?: string;
}

/**
 * GSAP owns this element's line reveal (SplitText → masked yPercent, 500 to 800 ms).
 *
 *  - Real HTML text stays in the DOM (SplitText `aria: auto` keeps a clean accessible name).
 *  - Pre-hidden only while JS boots and only when motion is allowed (see `[data-split-pending]` in globals.css),
 *    with a CSS fail-safe so the heading can never stay invisible.
 *  - Re-splits on resize / font load (`autoSplit`) and reverts on unmount.
 */
export function SplitHeading({
  as: Tag = "h2",
  className,
  style,
  children,
  trigger = "scroll",
  delay = 0,
  id,
}: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          aria: "auto",
          onSplit(self) {
            // Give masked lines room for descenders so glyphs are never clipped.
            gsap.set(self.masks, { paddingBottom: "0.14em", marginBottom: "-0.14em" });
            el.removeAttribute("data-split-pending");
            gsap.set(el, { visibility: "visible" });
            return gsap.from(self.lines, {
              yPercent: 112,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.09,
              delay,
              ...(trigger === "scroll"
                ? { scrollTrigger: { trigger: el, start: "top 88%", once: true } }
                : {}),
            });
          },
        });
        return () => {
          split.revert();
          el.removeAttribute("data-split-pending");
          gsap.set(el, { clearProps: "visibility" });
        };
      });

      // Reduced motion (or no matchMedia support): show the heading as plain text.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        el.removeAttribute("data-split-pending");
      });
    },
    { scope: ref, dependencies: [trigger, delay] },
  );

  return (
    <Tag ref={ref} id={id} className={className} style={style} data-split-pending="">
      {children}
    </Tag>
  );
}
