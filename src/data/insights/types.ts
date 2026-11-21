/**
 * INSIGHTS & GUIDES: article model (client content plan, "Insight and guide For devereux Digitals.pdf").
 *
 * Writing rules from the plan: 900 to 1,200 words, practical and original, no invented statistics,
 * customer results or achievements. Every article carries its SEO fields, 3 to 4 FAQs, a conclusion
 * and a natural CTA to the matching service.
 */

export type InsightCategory = "web" | "ecommerce" | "automation" | "software";

export const insightCategories: { id: InsightCategory; label: string; short: string; service: string; blurb: string }[] = [
  { id: "web", label: "Website Design & Development", short: "Websites", service: "web-design-development", blurb: "For when the site is live but the enquiries are not." },
  { id: "ecommerce", label: "Ecommerce Development", short: "Ecommerce", service: "ecommerce-solutions", blurb: "From the first product view to the second order." },
  { id: "automation", label: "AI Automation & Business Systems", short: "AI & Automation", service: "ai-business-solutions", blurb: "Where automation earns its place, and where it doesn't." },
  { id: "software", label: "Web Applications & Custom Software", short: "Custom Software", service: "ai-business-solutions", blurb: "When spreadsheets and off the shelf tools run out." },
];

/** Body blocks. `flow` and `compare` render as in-article diagrams. */
export type Block =
  | { t: "p"; text: string }
  | { t: "h3"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "callout"; title: string; text: string; tone?: "tip" | "warn" }
  | { t: "steps"; items: { title: string; text: string }[] }
  | { t: "flow"; caption: string; items: string[] }
  | { t: "compare"; caption: string; head: [string, string]; rows: [string, string, string][] }
  | { t: "quote"; text: string };

export interface Article {
  slug: string;
  category: InsightCategory;
  title: string;
  seoTitle: string;
  description: string;
  primaryKeyword: string;
  keywords: string[];
  /** Short card summary. */
  excerpt: string;
  /** Specific reader and problem (from strategy.ts). */
  forWho?: string;
  /** Topic-specific closing call to action (from strategy.ts). */
  cta?: { title: string; text: string; label: string };
  intro: string[];
  takeaways: string[];
  sections: { id: string; title: string; blocks: Block[] }[];
  tools?: string[];
  faqs: { q: string; a: string }[];
  conclusion: string[];
  /** Cover art concept + AI prompt (plan §4); the site uses the generated cover in /public/insights. */
  coverConcept: string;
  coverPrompt: string;
  /** Related article slugs for internal linking (plan §5). */
  related: string[];
}
