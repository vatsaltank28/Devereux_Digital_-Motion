"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type RefObject } from "react";
import { primaryNav, site, ctaLabels } from "@/lib/site";
import { getService } from "@/data/services";
import { serviceGroups, workLinks } from "@/data/nav";
import { LogoMark } from "@/components/visuals/LogoMark";
import { NavItem } from "./NavItem";
import { LinkButton } from "@/components/ui/Button";
import { AppIcons } from "@/components/ui/ContactLinks";
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
  // Which accordion is expanded (one at a time keeps the menu short on phones).
  const [expanded, setExpanded] = useState<"Services" | "Work" | null>(null);

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

  const serviceContent = (
    <div className="menu-groups">
      {serviceGroups.map((g) => (
        <div key={g.title}>
          <p className="mega-group">{g.title}</p>
          <ul className="mt-1.5">
            {g.slugs.map((slug) => {
              const sv = getService(slug);
              if (!sv) return null;
              return (
                <li key={slug}>
                  <NavItem href={`/services/${slug}`} onClick={onClose} title={sv.title} desc={sv.bestFor ?? sv.shortDescription} glyph={slug} />
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <Link href="/services" onClick={onClose} className="menu-all">Explore everything we do <ArrowRight /></Link>
    </div>
  );

  const workContent = (
    <div className="menu-groups">
      <ul>
        {workLinks.map((w) => (
          <li key={w.id}>
            <NavItem href={w.href} onClick={onClose} title={w.label} desc={w.desc} glyph={w.glyph} count={w.count} />
          </li>
        ))}
      </ul>
    </div>
  );

  const panels: Record<string, React.ReactNode> = { Services: serviceContent, Work: workContent };

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
                  className="grid size-11 place-items-center rounded-xl border border-line-strong transition-colors hover:border-[var(--color-text)]"
                >
                  <CloseIcon size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="wrap-wide flex-1 pb-8 pt-2">
            <nav aria-label="Primary">
              <ul>
                {primaryNav.map((link, i) => {
                  const panel = panels[link.label];
                  const isOpen = expanded === link.label;
                  const id = `menu-panel-${link.label.toLowerCase()}`;
                  return (
                    <li key={link.href} className="menu-item border-b border-line" style={{ "--i": i } as React.CSSProperties}>
                      {panel ? (
                        <>
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls={id}
                            onClick={() => setExpanded(isOpen ? null : (link.label as "Services" | "Work"))}
                            className="menu-row w-full"
                          >
                            <span>{link.label}</span>
                            <ChevronDown className={cn("text-subtle transition-transform duration-200", isOpen && "rotate-180")} />
                          </button>
                          <div id={id} className={cn("faq-panel", isOpen && "is-open")} inert={!isOpen}>
                            <div className="overflow-hidden">
                              <div className="pb-5">{panel}</div>
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
          </div>

          <div className="menu-foot wrap-wide flex shrink-0 flex-col gap-5 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
            <LinkButton href="/contact" arrow onClick={onClose} location="menu" className="w-full sm:w-auto">
              {ctaLabels.discuss}
            </LinkButton>
            <AppIcons className="justify-center sm:justify-end" />
          </div>
        </div>
      )
  );
}
