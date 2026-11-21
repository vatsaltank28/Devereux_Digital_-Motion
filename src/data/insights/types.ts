/**
 * INSIGHTS & GUIDES: article model (client content plan, "Insight and guide For devereux Digitals.pdf").
 *
 * Writing rules from the plan: 900 to 1,200 words, practical and original, no invented statistics,
 * customer results or achievements. Every article carries its SEO fields, 3 to 4 FAQs, a conclusion
 * and a natural CTA to the matching service.
 */

export type InsightCategory = "web" | "ecommerce" | "automation" | "software";

export const insightCategories: { id: InsightCategory; label: string; short: string; service: string; blurb: string }[] = [
  { id: "web", label: "Website Design & Development", short: "Websites", service: "web-design-development", blurb: "Turn your website into your best salesperson." },
  { id: "ecommerce", label: "E-commerce Development", short: "E-commerce", service: "ecommerce-solutions", blurb: "Stores that convert, fulfil and bring buyers back." },
  { id: "automation", label: "AI Automation & Business Systems", short: "AI & Automation", service: "ai-business-solutions", blurb: "Systems that follow up, qualify and run themselves." },
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
