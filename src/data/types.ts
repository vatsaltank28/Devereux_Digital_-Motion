/**
 * Typed content model — mirrors PRD §13 so it can be swapped for a headless CMS
 * (Sanity, Contentful, Payload …) without touching presentation components.
 */

export type ServiceStatus = "published" | "coming-soon" | "draft";
export type PricingMode = "hidden" | "from-price" | "packages" | "quote";

/** Which generated artwork family a service/project uses (see components/visuals/ProjectArt). */
export type ArtVariant = "web" | "ecommerce" | "branding" | "video" | "ads" | "ai" | "marketing";

export interface TitledText {
  title: string;
  description: string;
}

/** Approved pricing only. Leave `packages` empty until the client supplies real values. */
export interface PricingPackage {
  name: string;
  /** e.g. "From 1,200" — must include currency + basis once approved */
  price: string;
  billing: string;
  summary: string;
  includes: string[];
  excludes?: string[];
}

export interface Service {
  slug: string;
  number: string;
  title: string;
  /** Short label for compact UI (nav, footer, breadcrumbs) */
  shortTitle: string;
  shortDescription: string;
  heroHeadline: string;
  heroDescription: string;
  intro: string;
  /** Closing CTA headline. Defaults to "Ready to start your {shortTitle} project?" */
  ctaHeading?: string;
  art: ArtVariant;
  problems: TitledText[];
  deliverables: TitledText[];
  processSteps: TitledText[];
  benefits: TitledText[];
  pricingMode: PricingMode;
  /** Shown when pricingMode === "quote": what shapes the proposal for this service */
  pricingFactors: string[];
  packages: PricingPackage[];
  seoTitle: string;
  seoDescription: string;
  status: ServiceStatus;
  sortOrder: number;
}

export interface Project {
  slug: string;
  title: string;
  /** Concept projects are internal studies, NOT commissioned client work. Always labelled in the UI. */
  isConcept: boolean;
  /** Only set when the client has approved naming (PRD §11) */
  clientName?: string;
  industry: string;
  serviceTags: string[];
  summary: string;
  challenge: string;
  approach: string;
  deliverables: string[];
  /** Verified, approved results only. Empty for concept projects. */
  results: string[];
  art: ArtVariant;
  heroImage?: string;
  gallery?: string[];
  featured: boolean;
  published: boolean;
  seoTitle: string;
  seoDescription: string;
}

export interface Testimonial {
  quote: string;
  personName: string;
  role: string;
  company: string;
  avatar?: string;
  /** Must be true — publishing requires written client permission. */
  approvedForPublication: boolean;
  serviceSlugs?: string[];
  sortOrder: number;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  /** Undefined = general FAQ */
  serviceSlug?: string;
  sortOrder: number;
}
