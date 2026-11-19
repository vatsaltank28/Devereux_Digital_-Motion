"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

interface SplitHeadingProps {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  /** "load" renders immediately (hero, usually the LCP element); "scroll" reveals when the heading enters the viewport. */
  trigger?: "load" | "scroll";
  /** Seconds (scroll reveals only) */
  delay?: number;
  id?: string;
}

/**
 * Heading reveal without an animation library: a CSS rise + fade driven by one IntersectionObserver.
 *  - "load" headings are never hidden, so they paint with the first frame (fast LCP).
 *  - "scroll" headings are pre-hidden only while JS runs and motion is allowed (see `.heading-reveal`
 *    in globals.css), with a CSS fail-safe so text can never stay invisible.
 */
export function SplitHeading({ as: Tag = "h2", className, style, children, trigger = "scroll", delay = 0, id }: SplitHeadingProps) {
  const ref = useRef<HTMLElement>(null);
  const animate = trigger === "scroll";

  useEffect(() => {
    const el = ref.current;
    if (!el || !animate) return;
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [animate]);

  return (
    <Tag
      ref={ref}
      id={id}
      className={animate ? `heading-reveal ${className ?? ""}` : className}
      style={animate && delay ? { ...style, transitionDelay: `${delay}s` } : style}
    >
      {children}
    </Tag>
  );
}
