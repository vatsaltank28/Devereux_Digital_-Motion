"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { getService } from "@/data/services";
import { serviceGroups, workLinks } from "@/data/nav";
import { NavItem } from "./NavItem";
import { cn } from "@/lib/cn";

type MenuId = "services" | "work";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={cn("transition-transform duration-200", open && "rotate-180")}>
      <path d="M5 7.5l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface DropdownProps {
  id: MenuId;
  label: string;
  open: boolean;
  active: boolean;
  onOpen: () => void;
  onToggle: () => void;
  onLeave: () => void;
  onDismiss: () => void;
  children: ReactNode;
}

/**
 * One top level nav item with a hover/click panel. Mouse opens on hover; touch and keyboard use click.
 * The panel's contents are only rendered after the first interaction (then kept for instant reopening),
 * so every page ships a light header instead of hydrating two hidden menus on load.
 */
function Dropdown({ id, label, open, active, onOpen, onToggle, onLeave, onDismiss, children }: DropdownProps) {
  const [seen, setSeen] = useState(false);
  return (
    <li
      onPointerEnter={(e) => {
        setSeen(true);
        if (e.pointerType === "mouse") onOpen();
      }}
      onFocus={() => setSeen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && onLeave()}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) onDismiss();
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={`mega-${id}`}
        onClick={(e) => {
          setSeen(true);
          // Mouse users already opened it on hover: a click must not toggle it shut again.
          // Touch and keyboard (Enter/Space, pointerType "") keep normal toggle behaviour.
          const pt = (e.nativeEvent as PointerEvent).pointerType;
          if (pt === "mouse") onOpen();
          else onToggle();
        }} className={cn("dnav-link", (open || active) && "is-active")}>
        {label}
        <Chevron open={open} />
      </button>
      <div id={`mega-${id}`} className={cn("mega", open && "is-open")} inert={!open}>
        {(seen || open) && children}
      </div>
    </li>
  );
}

/**
 * Always visible desktop navigation (lg and up) with Services and Work dropdowns.
 * Closes on Escape, outside click, focus leaving, or navigation (state is tied to the path it opened on).
 */
export function DesktopNav() {
  const pathname = usePathname();
  const [state, setState] = useState<{ id: MenuId; on: string } | null>(null);
  const openId = state && state.on === pathname ? state.id : null;
  const navRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setState(null);
        navRef.current?.querySelector<HTMLButtonElement>(`[aria-controls="mega-${openId}"]`)?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setState(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [openId]);

  const close = () => setState(null);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const handlers = (id: MenuId) => ({
    open: openId === id,
    onOpen: () => {
      clearTimeout(timer.current);
      setState({ id, on: pathname });
    },
    onToggle: () => setState(openId === id ? null : { id, on: pathname }),
    onLeave: () => {
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setState((s) => (s?.id === id ? null : s)), 140);
    },
    onDismiss: () => setState((s) => (s?.id === id ? null : s)),
  });

  return (
    <nav ref={navRef} aria-label="Primary" className="dnav">
      <ul className="dnav-list">
        <Dropdown id="services" label="Services" active={isActive("/services")} {...handlers("services")}>
          <div className="mega-inner">
            <div className="mega-cols">
              {serviceGroups.map((g) => (
                <div key={g.title}>
                  <p className="mega-group">{g.title}</p>
                  <ul className="mt-3 space-y-1">
                    {g.slugs.map((slug) => {
                      const s = getService(slug);
                      if (!s) return null;
                      return (
                        <li key={slug}>
                          <NavItem href={`/services/${slug}`} onClick={close} title={s.title} desc={s.bestFor ?? s.shortDescription} glyph={slug} />
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mega-cta">
              <p className="mega-cta-k"><span aria-hidden="true" className="mega-dot" /> Free, no obligation</p>
              <p className="mega-cta-t">Not sure where to start?</p>
              <p className="mega-cta-d">Tell us about your business and we will suggest the services that will move the needle first.</p>
              <Link href="/contact" onClick={close} className="mega-cta-btn">Get a free consultation <span aria-hidden="true">→</span></Link>
            </div>
            <div className="mega-foot">
              <Link href="/services" onClick={close} className="mega-foot-link">Explore everything we do <span aria-hidden="true">→</span></Link>
              <Link href="/work" onClick={close} className="mega-foot-link text-accent-bright">See real client results <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </Dropdown>

        <Dropdown id="work" label="Work" active={isActive("/work")} {...handlers("work")}>
          <div className="mega-inner">
            <div>
              <p className="mega-group">Browse our work</p>
              <ul className="mega-work mt-3">
                {workLinks.map((w) => (
                  <li key={w.id}>
                    <NavItem href={w.href} onClick={close} title={w.label} desc={w.desc} glyph={w.glyph} count={w.count} />
                  </li>
                ))}
              </ul>
            </div>
            <div className="mega-cta">
              <p className="mega-cta-k"><span aria-hidden="true" className="mega-dot" /> Case studies</p>
              <p className="mega-cta-t">Real projects, real results</p>
              <p className="mega-cta-d">Walkthrough videos, the stack we used and what changed for each client.</p>
              <Link href="/work" onClick={close} className="mega-cta-btn">View all case studies <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </Dropdown>

        {[
          { label: "Insights & Guides", href: "/insights" },
          { label: "About Us", href: "/about" },
          { label: "Meet the team", href: "/team" },
          { label: "Talk to us", href: "/contact" },
        ].map((l) => (
          <li key={l.href}>
            <Link href={l.href} aria-current={isActive(l.href) ? "page" : undefined} className={cn("dnav-link", isActive(l.href) && "is-active")}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
