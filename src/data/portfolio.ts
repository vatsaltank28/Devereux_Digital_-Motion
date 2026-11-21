import { serviceWork, type MediaImage } from "./media";
import { caseStudies, type CaseStudy } from "./caseStudies";

/**
 * PORTFOLIO, built only from work supplied in the client's Services folder (public/work).
 *
 * Rules (master prompt §4, §5, §31):
 *  - Never invent projects, clients, live URLs, technologies or results.
 *  - Optional fields (challenge, solution, deliverables, tech, results, liveUrl, video) render ONLY
 *    when filled. Leave them empty until the owner supplies verified details.
 *  - `kind: "collection"` groups related screenshots whose individual project details are not yet
 *    documented, and is labelled as such on the site so it is never presented as a single case study.
 *
 * To add a project: append an entry, put media in /public/work/<category>/, and (optionally) a video
 * file plus poster. Videos are only shown when a real file exists.
 */

export type PortfolioCategory = "web" | "ecommerce" | "ai" | "branding" | "marketing" | "video";

export const portfolioCategories: { id: PortfolioCategory; label: string; service: string }[] = [
  { id: "web", label: "Web Design", service: "web-design-development" },
  { id: "ecommerce", label: "Ecommerce", service: "ecommerce-solutions" },
  { id: "ai", label: "AI Automation", service: "ai-business-solutions" },
  { id: "branding", label: "Branding", service: "branding-creative-design" },
  { id: "marketing", label: "Marketing & Advertising", service: "digital-marketing" },
  { id: "video", label: "Video & Content", service: "video-content" },
];

export type PortfolioMedia =
  | ({ type: "image" } & MediaImage)
  | { type: "video"; src: string; poster: MediaImage; alt: string };

export interface PortfolioProject {
  slug: string;
  title: string;
  category: PortfolioCategory;
  /** "project" = one identifiable piece of work; "collection" = grouped samples / results. */
  kind: "project" | "collection";
  /** One factual sentence describing what the work shows. */
  summary: string;
  overview?: string;
  challenge?: string;
  solution?: string;
  deliverables?: string[];
  tech?: string[];
  /** Verified outcomes only. */
  results?: string[];
  liveUrl?: string;
  media: PortfolioMedia[];
  featured?: boolean;
  /** Full case study write up (see caseStudies.ts). */
  caseStudy?: CaseStudy;
}

const img = (service: string, n: number, alt?: string): PortfolioMedia => {
  const m = serviceWork[service]?.[n - 1];
  if (!m) throw new Error(`Missing media ${service} #${n}`);
  return { type: "image", ...m, ...(alt ? { alt } : {}) };
};

export const portfolio: PortfolioProject[] = [
  {
    slug: "reloop",
    title: "Reloop",
    category: "web",
    kind: "project",
    summary: "Website for an AI Chief Marketing Officer that plans, creates and schedules a brand’s marketing.",
    liveUrl: caseStudies["reloop"]!.liveUrl,
    caseStudy: caseStudies["reloop"],
    media: [{ type: "image", src: `/work/case-studies/reloop/still-1.jpg`, alt: "Reloop website", width: 1920, height: 1200 }],
    featured: true,
  },
  {
    slug: "apparelnbags",
    title: "ApparelnBags",
    category: "ecommerce",
    kind: "project",
    summary: "Fast Next.js storefront for a 15,000+ product promotional and wholesale apparel catalogue.",
    liveUrl: caseStudies["apparelnbags"]!.liveUrl,
    caseStudy: caseStudies["apparelnbags"],
    media: [{ type: "image", src: `/work/case-studies/apparelnbags/still-1.jpg`, alt: "ApparelnBags website", width: 1920, height: 1200 }],
    featured: true,
  },
  {
    slug: "anhem",
    title: "Anhem",
    category: "ecommerce",
    kind: "project",
    summary: "Conversion focused Shopify store for premium, PFA free Apple Watch bands.",
    liveUrl: caseStudies["anhem"]!.liveUrl,
    caseStudy: caseStudies["anhem"],
    media: [{ type: "image", src: `/work/case-studies/anhem/still-1.jpg`, alt: "Anhem website", width: 1920, height: 1200 }],
    featured: true,
  },
  {
    slug: "zinff",
    title: "Zinff Optical",
    category: "ecommerce",
    kind: "project",
    summary: "Price led eyewear store selling prescription glasses online from $9.",
    liveUrl: caseStudies["zinff"]!.liveUrl,
    caseStudy: caseStudies["zinff"],
    media: [{ type: "image", src: `/work/case-studies/zinff/still-1.jpg`, alt: "Zinff Optical website", width: 1920, height: 1200 }],
    featured: true,
  },
  {
    slug: "seamless-ai",
    title: "Seamless.AI",
    category: "ai",
    kind: "project",
    summary: "Webflow site for an AI lead generation platform with sales agents and verified data.",
    liveUrl: caseStudies["seamless-ai"]!.liveUrl,
    caseStudy: caseStudies["seamless-ai"],
    media: [{ type: "image", src: `/work/case-studies/seamless-ai/still-1.jpg`, alt: "Seamless.AI website", width: 1920, height: 1200 }],
    featured: true,
  },
  {
    slug: "fin-ai",
    title: "Fin",
    category: "ai",
    kind: "project",
    summary: "Product site for an AI customer service agent with a 76% average resolution rate.",
    liveUrl: caseStudies["fin-ai"]!.liveUrl,
    caseStudy: caseStudies["fin-ai"],
    media: [{ type: "image", src: `/work/case-studies/fin-ai/still-1.jpg`, alt: "Fin website", width: 1920, height: 1200 }],
    featured: true,
  },
  {
    slug: "systemaops",
    title: "SystemaOps",
    category: "ai",
    kind: "project",
    summary: "Website for an AI automation and Odoo ERP agency, built problem first.",
    liveUrl: caseStudies["systemaops"]!.liveUrl,
    caseStudy: caseStudies["systemaops"],
    media: [{ type: "image", src: `/work/case-studies/systemaops/still-1.jpg`, alt: "SystemaOps website", width: 1920, height: 1200 }],
    featured: true,
  },
  {
    slug: "hosportal-website-redesign",
    title: "HosPortal website redesign",
    category: "web",
    kind: "project",
    summary: "A before and after redesign of the HosPortal healthcare rostering website, with a clearer hero, product visuals and feature layout.",
    media: [img("web-design-development", 2)],
  },
  {
    slug: "recruitment-website-redesign",
    title: "Recruitment website redesign",
    category: "web",
    kind: "project",
    summary: "A before and after redesign of a recruitment website, moving from a dense careers page to a modern, sectioned landing experience.",
    media: [img("web-design-development", 1)],
  },
  {
    slug: "search-and-speed-results",
    title: "Search visibility and site speed",
    category: "web",
    kind: "collection",
    summary: "Search Console, organic traffic and site speed reports from website work.",
    media: [img("web-design-development", 4), img("web-design-development", 3), img("web-design-development", 5)],
  },
  {
    slug: "aven-row-fashion-store",
    title: "Aven Row fashion store",
    category: "ecommerce",
    kind: "project",
    summary: "Product page design for a fashion store, shown on desktop and mobile, with size selection, reviews and a clear add to bag flow.",
    media: [img("ecommerce-solutions", 3, "Aven Row product page on desktop"), img("ecommerce-solutions", 1, "Aven Row product pages on mobile")],
  },
  {
    slug: "caspara-product-page-redesign",
    title: "Caspara product page redesign",
    category: "ecommerce",
    kind: "project",
    summary: "A before and after mobile product page redesign, adding gallery thumbnails, reviews, colour and size selection and a stronger add to bag button.",
    media: [img("ecommerce-solutions", 2)],
  },
  {
    slug: "store-analytics-and-conversion",
    title: "Store analytics and conversion testing",
    category: "ecommerce",
    kind: "collection",
    summary: "Store analytics dashboards and conversion metrics from ecommerce work.",
    media: [img("ecommerce-solutions", 4), img("ecommerce-solutions", 6), img("ecommerce-solutions", 7)],
  },
  {
    slug: "telegram-crm-follow-up-bot",
    title: "Telegram CRM follow up bot",
    category: "ai",
    kind: "project",
    summary: "A Telegram bot that posts scheduled follow up reminders for CRM leads, with lead details, priority and status in each message.",
    media: [img("ai-business-solutions", 3)],
  },
  {
    slug: "custom-crm-dashboard",
    title: "Custom CRM dashboard",
    category: "ai",
    kind: "project",
    summary: "A customer record dashboard for a construction business, bringing estimates, change orders, invoices and documents into one view.",
    media: [img("ai-business-solutions", 4)],
  },
  {
    slug: "blockrouter-landing-page",
    title: "BlockRouter landing page",
    category: "ai",
    kind: "project",
    summary: "A product landing page for BlockRouter, a programmable payments product for AI inference, with an architecture diagram and key figures.",
    media: [img("ai-business-solutions", 1)],
  },
  {
    slug: "paperclip-agent-platform",
    title: "Paperclip agent orchestration",
    category: "ai",
    kind: "project",
    summary: "Repository and product presentation for Paperclip, an orchestration platform for teams of AI agents.",
    media: [img("ai-business-solutions", 2)],
  },
  {
    slug: "law-firm-brand-identity",
    title: "Law firm brand identity",
    category: "branding",
    kind: "project",
    summary: "A bilingual Arabic brand identity for a law firm, applied across business cards, stationery, signage and social posts.",
    media: [img("branding-creative-design", 1)],
    featured: true,
  },
  {
    slug: "ally-fitness-brand-identity",
    title: "Ally fitness brand identity",
    category: "branding",
    kind: "project",
    summary: "A fitness brand identity in black and green, applied to apparel, bags, a smartwatch face, signage and digital screens.",
    media: [img("branding-creative-design", 2)],
  },
  {
    slug: "lafra-food-packaging",
    title: "Lafra food packaging",
    category: "branding",
    kind: "project",
    summary: "Illustrated packaging for a food brand, including bags, boxes, cups and wraps built around a city illustration.",
    media: [img("branding-creative-design", 3)],
  },
  {
    slug: "brand-campaign-creatives",
    title: "Brand campaign creatives",
    category: "branding",
    kind: "collection",
    summary: "Campaign and social creatives applied across billboards, posters, merchandise and app screens.",
    media: [img("branding-creative-design", 4)],
  },
  {
    slug: "lead-generation-campaigns",
    title: "Lead generation campaigns",
    category: "marketing",
    kind: "collection",
    summary: "Ads Manager views from lead generation campaigns, showing results across campaigns and ad sets.",
    media: [img("paid-advertising", 1), img("paid-advertising", 2), img("paid-advertising", 4)],
  },
  {
    slug: "sales-and-revenue-growth",
    title: "Sales and revenue reporting",
    category: "marketing",
    kind: "collection",
    summary: "Revenue, sales, conversion rate and audience growth reporting from marketing and paid campaigns.",
    media: [img("digital-marketing", 1), img("digital-marketing", 2), img("paid-advertising", 5), img("paid-advertising", 6)],
  },
  {
    slug: "social-page-growth",
    title: "Social page growth and reporting",
    category: "marketing",
    kind: "collection",
    summary: "Page insights, weekly performance trends and campaign budget tracking from social media management.",
    media: [img("digital-marketing", 4), img("digital-marketing", 5), img("digital-marketing", 6)],
  },
];

/** Thumbnail for any media item (videos use their poster). */
export const coverImage = (m: PortfolioMedia | undefined): MediaImage => {
  if (!m) return { src: "/work/web-design-development/hosportal-redesign.jpg", alt: "", width: 1280, height: 854 };
  return m.type === "video" ? m.poster : m;
};

export const getProject = (slug: string) => portfolio.find((p) => p.slug === slug);
export const featuredProjects = portfolio.filter((p) => p.featured);
export const categoryLabel = (id: PortfolioCategory) => portfolioCategories.find((c) => c.id === id)?.label ?? id;
/** Only categories that actually contain work are offered as filters (master prompt §4). */
export const activeCategories = portfolioCategories.filter((c) => portfolio.some((p) => p.category === c.id));
export const projectsForService = (service: string) => {
  const cat = portfolioCategories.find((c) => c.service === service)?.id ?? (service === "paid-advertising" ? "marketing" : undefined);
  return cat ? portfolio.filter((p) => p.category === cat) : [];
};
export const relatedProjects = (p: PortfolioProject, n = 3) =>
  [...portfolio.filter((x) => x.slug !== p.slug && x.category === p.category), ...portfolio.filter((x) => x.category !== p.category && x.featured)]
    .filter((x) => x.slug !== p.slug)
    .slice(0, n);
