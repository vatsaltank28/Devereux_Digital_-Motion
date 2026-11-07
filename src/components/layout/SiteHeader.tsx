"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { site, ctaLabels } from "@/lib/site";
import { cn } from "@/lib/cn";
import { LogoMark } from "@/components/visuals/LogoMark";
import { LinkButton } from "@/components/ui/Button";
import { NavigationOverlay } from "./NavigationOverlay";

/**
 * Fixed header: transparent over the hero, opaque + blurred after scroll (DESIGN.md §4.1).
 * The menu "belongs" to the path it was opened on, so any navigation (links, browser back/forward)
 * closes it without an effect-driven state update.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const open = openedOn === pathname;

  const close = useCallback(() => setOpenedOn(null), []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "border-line bg-bg/80 backdrop-blur-xl supports-[not(backdrop-filter:blur(1px))]:bg-bg"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="wrap-wide flex h-[var(--header-h)] items-center justify-between">
          <Link href="/" className="flex min-h-11 items-center gap-3 rounded-full" aria-label={`${site.name} — home`}>
            <LogoMark />
            <span className="font-display text-[1.15rem] font-semibold tracking-tight">{site.name}</span>
          </Link>

          <div className="flex items-center gap-3">
            <LinkButton href="/contact" variant="secondary" size="sm" className="hidden md:inline-flex" location="header">
              {ctaLabels.startProject}
            </LinkButton>
            <button
              ref={triggerRef}
              type="button"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpenedOn(pathname)}
              className="flex min-h-11 min-w-11 items-center justify-center gap-3 rounded-full border border-line-strong px-4 text-sm font-semibold transition-colors hover:border-white/55"
            >
              <span>Menu</span>
              <span aria-hidden="true" className="flex flex-col gap-[5px]">
                <span className="block h-px w-5 bg-current" />
                <span className="block h-px w-3.5 self-end bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>
      <NavigationOverlay open={open} onClose={close} triggerRef={triggerRef} />
    </>
  );
}
