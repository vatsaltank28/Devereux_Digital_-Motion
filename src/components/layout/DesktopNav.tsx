"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getService } from "@/data/services";
import { ServiceGlyph } from "@/components/visuals/ServiceGlyph";
import { cn } from "@/lib/cn";

const groups: { title: string; slugs: string[] }[] = [
  { title: "Win customers online", slugs: ["web-design-development", "ecommerce-solutions", "ai-business-solutions"] },
  { title: "Get more leads", slugs: ["digital-marketing", "paid-advertising"] },
  { title: "Grow your brand", slugs: ["branding-creative-design", "video-content"] },
];

const links = [
  { label: "Work", href: "/work" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * Always visible desktop navigation (lg and up) with a Services mega menu.
 * Opens on hover or click, closes on Escape, outside click, focus leaving, or navigation.
 */
export function DesktopNav() {
  const pathname = usePathname();
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const wrap = useRef<HTMLLIElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenOn(null);
        btn.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpenOn(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const enter = () => {
    clearTimeout(timer.current);
    setOpenOn(pathname);
  };
  const leave = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpenOn(null), 140);
  };
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav aria-label="Primary" className="dnav">
      <ul className="dnav-list">
        <li ref={wrap} onPointerEnter={(e) => e.pointerType === "mouse" && enter()} onPointerLeave={(e) => e.pointerType === "mouse" && leave()}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenOn(null); }}>
          <button
            ref={btn}
            type="button"
            aria-expanded={open}
            aria-controls="mega-services"
            onClick={() => setOpenOn(open ? null : pathname)}
            className={cn("dnav-link", (open || isActive("/services")) && "is-active")}
          >
            Services
            <svg viewBox="0 0 20 20" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={cn("transition-transform duration-200", open && "rotate-180")}>
              <path d="M5 7.5l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div id="mega-services" className={cn("mega", open && "is-open")} inert={!open}>
            <div className="mega-inner">
              <div className="mega-cols">
                {groups.map((g) => (
                  <div key={g.title}>
                    <p className="mega-group">{g.title}</p>
                    <ul className="mt-3 space-y-1">
                      {g.slugs.map((slug) => {
                        const s = getService(slug);
                        if (!s) return null;
                        return (
                          <li key={slug}>
                            <Link href={`/services/${slug}`} onClick={() => setOpenOn(null)} className="mega-item">
                              <ServiceGlyph slug={slug} size={30} className="mega-icon" />
                              <span>
                                <span className="mega-item-title">{s.title}</span>
                                <span className="mega-item-desc">{s.bestFor}</span>
                              </span>
                            </Link>
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
                <Link href="/contact" onClick={() => setOpenOn(null)} className="mega-cta-btn">Get a free consultation <span aria-hidden="true">→</span></Link>
              </div>
              <div className="mega-foot">
                <Link href="/services" onClick={() => setOpenOn(null)} className="mega-foot-link">Explore everything we do <span aria-hidden="true">→</span></Link>
                <Link href="/work" onClick={() => setOpenOn(null)} className="mega-foot-link text-accent-bright">See real client results <span aria-hidden="true">→</span></Link>
              </div>
            </div>
          </div>
        </li>
        {links.map((l) => (
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
