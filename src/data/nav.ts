import { activeCategories, portfolio, type PortfolioCategory } from "./portfolio";

/** Service groups shared by the desktop mega menu and the mobile menu. */
export const serviceGroups: { title: string; slugs: string[] }[] = [
  { title: "Win customers online", slugs: ["web-design-development", "ecommerce-solutions", "ai-business-solutions"] },
  { title: "Get more leads", slugs: ["digital-marketing", "paid-advertising"] },
  { title: "Grow your brand", slugs: ["branding-creative-design", "video-content"] },
];

const workBlurb: Record<PortfolioCategory, string> = {
  web: "Websites and redesigns built to convert.",
  ecommerce: "Online stores that sell on every screen.",
  ai: "AI products, agents and automation.",
  branding: "Identities, packaging and creative.",
  marketing: "Campaigns, ads and growth reporting.",
  video: "Video and content production.",
};

/** Work menu entries: one per portfolio filter (never individual projects). */
/** Service glyph shown beside each work category ("all" uses a grid mark). */
const workGlyph: Record<PortfolioCategory, string> = {
  web: "web-design-development",
  ecommerce: "ecommerce-solutions",
  ai: "ai-business-solutions",
  branding: "branding-creative-design",
  marketing: "digital-marketing",
  video: "video-content",
};

export const workLinks: { id: PortfolioCategory | "all"; label: string; desc: string; count: number; href: string; glyph: string | null }[] = [
  { id: "all", label: "All projects", desc: "Every case study and work sample.", count: portfolio.length, href: "/work", glyph: null },
  ...activeCategories.map((c) => ({
    id: c.id,
    label: c.label,
    desc: workBlurb[c.id],
    count: portfolio.filter((p) => p.category === c.id).length,
    href: `/work?category=${c.id}`,
    glyph: workGlyph[c.id],
  })),
];
