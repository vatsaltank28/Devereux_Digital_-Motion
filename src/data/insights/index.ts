import { insightCategories, type Article, type Block, type InsightCategory } from "./types";
import { webArticles } from "./web";
import { ecommerceArticles } from "./ecommerce";
import { automationArticles } from "./automation";
import { softwareArticles } from "./software";
import { strategy } from "./strategy";

export * from "./types";

/** All 21 articles in content plan order. */
const withStrategy = (a: Article): Article => {
  const s = strategy[a.slug];
  return s ? { ...a, title: s.headline, excerpt: s.excerpt, forWho: s.forWho, cta: s.cta } : a;
};

export const articles: Article[] = [...webArticles, ...ecommerceArticles, ...automationArticles, ...softwareArticles].map(withStrategy);

const blockText = (b: Block): string => {
  switch (b.t) {
    case "p": case "h3": case "quote": return b.text;
    case "ul": case "ol": return b.items.join(" ");
    case "callout": return `${b.title} ${b.text}`;
    case "steps": return b.items.map((i) => `${i.title} ${i.text}`).join(" ");
    case "flow": return `${b.caption} ${b.items.join(" ")}`;
    case "compare": return `${b.caption} ${b.head.join(" ")} ${b.rows.flat().join(" ")}`;
  }
};

export const wordCount = (a: Article) =>
  [...a.intro, ...a.takeaways, ...a.sections.flatMap((s) => [s.title, ...s.blocks.map(blockText)]), ...a.faqs.flatMap((f) => [f.q, f.a]), ...a.conclusion]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;

/** Reading time at ~230 words per minute. */
export const readMinutes = (a: Article) => Math.max(3, Math.round(wordCount(a) / 230));
export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const articleCover = (a: Article) => `/insights/${a.slug}.jpg`;
export const categoryOf = (id: InsightCategory) => insightCategories.find((c) => c.id === id)!;
export const relatedArticles = (a: Article) =>
  [...a.related.map(getArticle).filter((x): x is Article => !!x), ...articles.filter((x) => x.category === a.category && x.slug !== a.slug)]
    .filter((x, i, arr) => arr.findIndex((y) => y.slug === x.slug) === i)
    .filter((x) => x.slug !== a.slug)
    .slice(0, 3);
