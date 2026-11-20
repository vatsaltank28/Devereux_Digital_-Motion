import type { Project } from "./types";

/**
 * PORTFOLIO, CONCEPT PROJECTS ONLY.
 *
 * Devereux Digitals has not yet supplied approved client work (PRD §11, §21 Q4). Until it does,
 * these are clearly labelled in house concept studies that show the *kind* of brief each service
 * handles. They are NOT commissioned client projects, name no real clients and claim no results.
 *
 * To publish real work: add entries with `isConcept: false`, `clientName` (if permitted),
 * `results` (verified wording only) and `heroImage`/`gallery`. Set `published: true`.
 */
export const projects: Project[] = [
  {
    slug: "concept-clinic-website",
    title: "Independent clinic website",
    isConcept: true,
    industry: "Healthcare (concept)",
    serviceTags: ["web-design-development", "branding-creative-design"],
    summary: "A calm, accessible website for a small practice, centred on booking and clear service information.",
    challenge:
      "Small clinics often have sites that bury opening hours, services and the booking route behind dense pages, especially on a phone.",
    approach:
      "A page structure organized around three questions: what do you treat, where are you, how do I book. Large tap targets, plain language and an accessible colour palette throughout.",
    deliverables: ["Site structure and wireframes", "Responsive visual design", "Accessible component library", "Booking call to action patterns"],
    results: [],
    art: "web",
    featured: true,
    published: true,
    seoTitle: "Concept: Independent clinic website",
    seoDescription: "An in house concept study for a clinic website focused on clarity, accessibility and booking.",
  },
  {
    slug: "concept-coffee-store",
    title: "Specialty coffee store",
    isConcept: true,
    industry: "Retail (concept)",
    serviceTags: ["ecommerce-solutions", "web-design-development"],
    summary: "A product led online store with clear catalogue structure and a short path to checkout.",
    challenge:
      "Small batch products need room to tell their story, but shoppers still want to compare, choose a size and buy quickly.",
    approach:
      "Editorial product pages with a fixed purchase panel, subscription ready variant selection and a single page checkout flow.",
    deliverables: ["Catalogue and navigation model", "Product and collection templates", "Checkout flow design", "Integration plan for payments and shipping"],
    results: [],
    art: "ecommerce",
    featured: true,
    published: true,
    seoTitle: "Concept: Specialty coffee store",
    seoDescription: "An in house concept study for an ecommerce store with editorial product pages and a short checkout.",
  },
  {
    slug: "concept-ceramics-identity",
    title: "Identity for a ceramics studio",
    isConcept: true,
    industry: "Craft & design (concept)",
    serviceTags: ["branding-creative-design"],
    summary: "A restrained visual identity system built from a single geometric construction.",
    challenge: "A craft studio needs a mark that works stamped into clay as well as on a screen or a shipping label.",
    approach:
      "A mark constructed from overlapping circles, a two tone palette and a type pairing chosen for legibility at small sizes, documented in a compact guideline.",
    deliverables: ["Logo and construction grid", "Colour and type system", "Packaging and stationery templates", "Brand guidelines"],
    results: [],
    art: "branding",
    featured: true,
    published: true,
    seoTitle: "Concept: Identity for a ceramics studio",
    seoDescription: "An in house concept study of a geometric brand identity system for a craft studio.",
  },
  {
    slug: "concept-skincare-film",
    title: "Product film for a skincare line",
    isConcept: true,
    industry: "Beauty (concept)",
    serviceTags: ["video-content"],
    summary: "A short product film and a set of vertical cut downs planned from one shoot.",
    challenge: "One shoot has to feed a website hero, a long form film and several short form social placements.",
    approach: "A shot list built around multi format framing, with the master film edited first and cut downs derived from the same sequences.",
    deliverables: ["Concept and script", "Shot list and framing plan", "Master edit", "Vertical and square cut downs"],
    results: [],
    art: "video",
    featured: true,
    published: true,
    seoTitle: "Concept: Product film for a skincare line",
    seoDescription: "An in house concept study for a product film planned for multiple formats from a single shoot.",
  },
  {
    slug: "concept-lead-gen-campaign",
    title: "Lead generation campaign structure",
    isConcept: true,
    industry: "Home services (concept)",
    serviceTags: ["paid-advertising", "digital-marketing"],
    summary: "A campaign architecture that separates intent, so budget decisions stay clear.",
    challenge: "Local service businesses often run one catch all campaign, making it impossible to see which searches produce real enquiries.",
    approach: "Campaigns split by service and intent, matched landing pages, and conversion tracking defined before any spend.",
    deliverables: ["Account structure", "Tracking specification", "Ad copy matrix", "Reporting template"],
    results: [],
    art: "ads",
    featured: false,
    published: true,
    seoTitle: "Concept: Lead generation campaign structure",
    seoDescription: "An in house concept study of paid advertising structure built around intent and clear reporting.",
  },
  {
    slug: "concept-enquiry-triage",
    title: "Enquiry triage workflow",
    isConcept: true,
    industry: "Professional services (concept)",
    serviceTags: ["ai-business-solutions"],
    summary: "A prototype workflow that sorts incoming enquiries and drafts a first response for human review.",
    challenge: "Small teams lose time reading, categorizing and forwarding every enquiry by hand.",
    approach: "A mapped intake process, a classification step with a human approval gate, and integration with the team’s existing inbox and task tool.",
    deliverables: ["Workflow map", "Working prototype", "Integration plan", "Team handover notes"],
    results: [],
    art: "ai",
    featured: false,
    published: true,
    seoTitle: "Concept: Enquiry triage workflow",
    seoDescription: "An in house concept study of an AI assisted enquiry triage workflow with human review.",
  },
  {
    slug: "concept-content-system",
    title: "Content system for a consultancy",
    isConcept: true,
    industry: "B2B services (concept)",
    serviceTags: ["digital-marketing", "video-content"],
    summary: "A repeatable monthly content rhythm built around a few strong ideas.",
    challenge: "Expert led businesses have plenty to say but no routine for turning it into consistent public content.",
    approach: "Quarterly themes, a monthly calendar, reusable templates and a short reporting loop tied to enquiries.",
    deliverables: ["Content strategy", "Editorial calendar", "Template set", "Monthly report format"],
    results: [],
    art: "marketing",
    featured: false,
    published: true,
    seoTitle: "Concept: Content system for a consultancy",
    seoDescription: "An in house concept study of a content system for a professional services firm.",
  },
];

export const publishedProjects = projects.filter((p) => p.published);
export const featuredProjects = publishedProjects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return publishedProjects.find((p) => p.slug === slug);
}

export function getProjectsForService(serviceSlug: string): Project[] {
  return publishedProjects.filter((p) => p.serviceTags.includes(serviceSlug));
}

export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const current = getProject(slug);
  if (!current) return [];
  const scored = publishedProjects
    .filter((p) => p.slug !== slug)
    .map((p) => ({ p, score: p.serviceTags.filter((t) => current.serviceTags.includes(t)).length }))
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.p);
}
