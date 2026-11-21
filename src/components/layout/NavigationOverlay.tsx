"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";
import { primaryNav, site, ctaLabels } from "@/lib/site";
import { publishedServices as services } from "@/data/services";
import { LogoMark } from "@/components/visuals/LogoMark";
import { LinkButton } from "@/components/ui/Button";
import { ArrowRight, CloseIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M5 7.5l5 5 5-5" />
    </svg>
  );
}

interface NavigationOverlayProps {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function NavigationOverlay({ open, onClose, triggerRef }: NavigationOverlayProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [servicesOpen, setServicesOpen] = useState(false);

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
    open && (
        <div
          ref={dialogRef}
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="menu-panel fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-bg"
        >
          {/* Overlay top bar: logo, primary CTA and a square close control */}
          <div className="border-b border-line">
            <div className="wrap-wide flex h-[var(--header-h)] shrink-0 items-center justify-between gap-3">
              <Link href="/" onClick={onClose} className="flex min-h-11 items-center gap-3" aria-label={`${site.name} home`}>
                <LogoMark animateOnMount={false} />
                <span className="hidden font-display text-[1.15rem] font-semibold tracking-tight min-[400px]:inline">{site.name}</span>
              </Link>
              <div className="flex items-center gap-2.5">
                <LinkButton href="/contact" onClick={onClose} location="menu-top" size="sm">
                  {ctaLabels.startProject}
                </LinkButton>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="grid size-11 place-items-center rounded-xl border border-line-strong transition-colors hover:border-white/55"
                >
                  <CloseIcon size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="wrap-wide grid flex-1 gap-10 pb-8 pt-2 lg:grid-cols-12 lg:gap-16 lg:pt-12">
            {/* Primary links */}
            <nav aria-label="Primary" className="lg:col-span-6">
              <ul>
                {primaryNav.map((link, i) => {
                  const isServices = link.label === "Services";
                  return (
                    <li key={link.href} className="menu-item border-b border-line" style={{ "--i": i } as React.CSSProperties}>
                      {isServices ? (
                        <>
                          <button
                            type="button"
                            aria-expanded={servicesOpen}
                            aria-controls="menu-services-inline"
                            onClick={() => setServicesOpen((v) => !v)}
                            className="menu-row menu-mobile-only w-full"
                          >
                            <span>{link.label}</span>
                            <ChevronDown className={cn("text-subtle transition-transform duration-200", servicesOpen && "rotate-180")} />
                          </button>
                          <Link href={link.href} onClick={onClose} className="menu-row menu-row-desktop">
                            {link.label}
                          </Link>
                          <div
                            id="menu-services-inline"
                            className={cn("faq-panel menu-mobile-only", servicesOpen && "is-open")}
                            inert={!servicesOpen}
                          >
                            <div className="overflow-hidden">
                              <div className="pb-4">{serviceLinks}</div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <Link href={link.href} onClick={onClose} className="menu-row">
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Desktop: services shown alongside, as in the client reference */}
            <div
              id="menu-services-aside"
              className="menu-item hidden lg:col-span-5 lg:col-start-8 lg:block"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              <p className="mb-4 text-sm font-medium text-subtle">Services</p>
              {serviceLinks}
            </div>
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
        </div>
      )
  );
}
