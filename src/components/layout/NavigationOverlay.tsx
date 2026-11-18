"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";
import { AnimatePresence, m, useReducedMotion, type Variants } from "motion/react";
import { primaryNav, site, ctaLabels } from "@/lib/site";
import { publishedServices as services } from "@/data/services";
import { LogoMark } from "@/components/visuals/LogoMark";
import { LinkButton } from "@/components/ui/Button";
import { ArrowRight, CloseIcon, PlusIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

interface NavigationOverlayProps {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function NavigationOverlay({ open, onClose, triggerRef }: NavigationOverlayProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [servicesOpen, setServicesOpen] = useState(true);
  const reduce = useReducedMotion();

  // Focus management, scroll lock, inert background, Escape + Tab trap.
  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const content = document.getElementById("site-content");
    const root = document.documentElement;

    root.style.overflow = "hidden";
    content?.setAttribute("inert", "");
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = "";
      content?.removeAttribute("inert");
      trigger?.focus({ preventScroll: true });
    };
  }, [open, onClose, triggerRef]);

  const panel: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.18 } }, exit: { opacity: 0, transition: { duration: 0.12 } } }
    : {
        hidden: { clipPath: "inset(0 0 100% 0)" },
        show: { clipPath: "inset(0 0 0% 0)", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
        exit: { clipPath: "inset(0 0 100% 0)", transition: { duration: 0.32, ease: [0.76, 0, 0.24, 1] } },
      };

  const list: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.055, delayChildren: reduce ? 0 : 0.22 } },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  const serviceLinks = (
    <ul className="divide-y divide-line border-y border-line">
      <li>
        <Link
          href="/services"
          onClick={onClose}
          className="arrow-host group flex min-h-14 items-center justify-between gap-4 py-3 text-muted transition-colors hover:text-ink"
        >
          <span className="text-[0.95rem]">All services</span>
          <ArrowRight className="text-subtle group-hover:text-accent-bright" />
        </Link>
      </li>
      {services.map((s) =>
        s.status === "published" ? (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              onClick={onClose}
              className="arrow-host group flex min-h-14 items-center justify-between gap-4 py-3 transition-colors hover:text-accent-bright"
            >
              <span className="flex items-baseline gap-4">
                <span className="w-6 font-display text-sm tabular-nums text-subtle">{s.number}</span>
                <span className="font-display text-[1.2rem] tracking-tight">{s.title}</span>
              </span>
              <ArrowRight className="text-subtle group-hover:text-accent-bright" />
            </Link>
          </li>
        ) : (
          <li key={s.slug}>
            <div className="flex min-h-14 items-center justify-between gap-4 py-3 text-subtle" aria-disabled="true">
              <span className="flex items-baseline gap-4">
                <span className="w-6 font-display text-sm tabular-nums">{s.number}</span>
                <span className="font-display text-[1.2rem] tracking-tight">{s.title}</span>
              </span>
              <span className="pill pill-outline shrink-0 whitespace-nowrap">Soon</span>
            </div>
          </li>
        ),
      )}
    </ul>
  );

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={dialogRef}
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-bg"
          variants={panel}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {/* Overlay top bar, mirrors the header so the logo and close control never move */}
          <div className="wrap-wide flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <Link href="/" onClick={onClose} className="flex min-h-11 items-center gap-3" aria-label={`${site.name} home`}>
              <LogoMark animateOnMount={false} />
              <span className="font-display text-[1.15rem] font-semibold tracking-tight">{site.name}</span>
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="flex min-h-11 items-center gap-2 rounded-full border border-line-strong px-4 text-sm font-semibold transition-colors hover:border-white/55"
            >
              <span>Close</span>
              <CloseIcon size={18} />
            </button>
          </div>

          <div className="wrap-wide grid flex-1 gap-10 pb-10 pt-6 lg:grid-cols-12 lg:gap-16 lg:pt-12">
            {/* Primary links */}
            <m.nav aria-label="Primary" className="lg:col-span-6" variants={list} initial="hidden" animate="show">
              <ul>
                {primaryNav.map((link) => {
                  const isServices = link.label === "Services";
                  return (
                    <m.li key={link.href} variants={item} className="border-b border-line-faint">
                      <div className="flex items-center justify-between gap-4">
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="block py-3 font-display text-[clamp(2.1rem,1.4rem+3.2vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.035em] transition-colors hover:text-accent-bright"
                        >
                          {link.label}
                        </Link>
                        {isServices && (
                          <button
                            type="button"
                            aria-expanded={servicesOpen}
                            aria-controls="menu-services-inline menu-services-aside"
                            aria-label={servicesOpen ? "Collapse services list" : "Expand services list"}
                            onClick={() => setServicesOpen((v) => !v)}
                            className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong transition-colors hover:border-white/55 lg:hidden"
                          >
                            <PlusIcon className={cn("transition-transform duration-200", servicesOpen && "rotate-45")} />
                          </button>
                        )}
                      </div>
                      {isServices && servicesOpen && (
                        <div id="menu-services-inline" className="pb-5 lg:hidden">
                          {serviceLinks}
                        </div>
                      )}
                    </m.li>
                  );
                })}
              </ul>
            </m.nav>

            {/* Desktop: services shown alongside, as in the client reference */}
            <m.div
              id="menu-services-aside"
              className="hidden lg:col-span-5 lg:col-start-8 lg:block"
              variants={item}
              initial="hidden"
              animate="show"
              transition={{ delay: reduce ? 0 : 0.3 }}
            >
              <p className="mb-4 text-sm font-medium text-subtle">Services</p>
              {serviceLinks}
            </m.div>
          </div>

          <div className="wrap-wide safe-bottom flex flex-col gap-6 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <LinkButton href="/contact" arrow onClick={onClose} location="menu" className="w-full sm:w-auto">
              {ctaLabels.discuss}
            </LinkButton>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              {site.contact.email && (
                <a className="link-quiet" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
              )}
              {site.social.map((s) => (
                <a key={s.label} className="link-quiet" href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
