interface ServiceGlyphProps {
  slug: string;
  size?: number;
  className?: string;
}

/** Small line glyphs, one per service, drawn on a shared 48-unit grid with a single blue accent. */
export function ServiceGlyph({ slug, size = 44, className }: ServiceGlyphProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
    className,
  };
  const accent = "var(--color-accent-bright)";

  switch (slug) {
    case "web-design-development":
      return (
        <svg {...common}>
          <rect x="5" y="9" width="38" height="30" rx="4" />
          <path d="M5 17h38" />
          <path d="M12 26h12M12 31h8" />
          <rect x="29" y="23" width="9" height="10" rx="2" stroke={accent} />
        </svg>
      );
    case "digital-marketing":
      return (
        <svg {...common}>
          <path d="M6 38h36" />
          <path d="M10 32l9-9 7 6 12-14" />
          <circle cx="38" cy="15" r="3" stroke={accent} />
        </svg>
      );
    case "paid-advertising":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="17" />
          <circle cx="24" cy="24" r="9" />
          <circle cx="24" cy="24" r="2.5" stroke={accent} fill={accent} />
        </svg>
      );
    case "ecommerce-solutions":
      return (
        <svg {...common}>
          <path d="M9 15h30l-2.5 23H11.5z" />
          <path d="M17 15v-3a7 7 0 0 1 14 0v3" stroke={accent} />
        </svg>
      );
    case "video-content":
      return (
        <svg {...common}>
          <rect x="5" y="10" width="38" height="28" rx="4" />
          <path d="M20 18l11 6-11 6z" stroke={accent} />
        </svg>
      );
    case "ai-business-solutions":
      return (
        <svg {...common}>
          <circle cx="9" cy="12" r="3.5" />
          <circle cx="9" cy="36" r="3.5" />
          <circle cx="39" cy="24" r="3.5" />
          <circle cx="24" cy="24" r="5" stroke={accent} />
          <path d="M12 13l8 8M12 35l8-8M29 24h7" />
        </svg>
      );
    case "branding-creative-design":
      return (
        <svg {...common}>
          <circle cx="18" cy="24" r="12" />
          <circle cx="30" cy="24" r="12" stroke={accent} />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="17" strokeDasharray="3 4" />
          <path d="M24 14v10l6 4" />
        </svg>
      );
  }
}
