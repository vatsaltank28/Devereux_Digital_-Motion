import Link from "next/link";
import { ServiceGlyph } from "@/components/visuals/ServiceGlyph";

function GridMark() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.6" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.6" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.6" />
    </svg>
  );
}

/**
 * One rich menu entry (desktop dropdowns + mobile menu): icon tile, title with a sliding arrow,
 * one line description and an optional project count badge.
 */
export function NavItem({ href, title, desc, glyph, count, onClick, className = "nav-item" }: { href: string; title: string; desc: string; glyph: string | null; count?: number; onClick?: () => void; className?: string }) {
  return (
    <Link href={href} onClick={onClick} className={className}>
      <span className="nav-item-icon" aria-hidden="true">
        {glyph ? <ServiceGlyph slug={glyph} size={26} /> : <GridMark />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="nav-item-title">
          {title}
          <span aria-hidden="true" className="nav-item-arrow">→</span>
        </span>
        <span className="nav-item-desc">{desc}</span>
      </span>
      {count !== undefined && (
        <span className="nav-item-count">
          {count}
          <span className="nav-item-count-k">{count === 1 ? " project" : " projects"}</span>
        </span>
      )}
    </Link>
  );
}
