import { insightCategories, type Article, type Block, type InsightCategory } from "./types";
import { webArticles } from "./web";
import { ecommerceArticles } from "./ecommerce";
import { automationArticles } from "./automation";
import { softwareArticles } from "./software";
import { extras } from "./extras";
import { extras2, extraFaq } from "./extras2";

export * from "./types";

/** Append the worked example, common mistakes and checklist sections (see extras.ts). */
const withExtras = (a: Article): Article => {
  const x = extras[a.slug];
  const y = extras2[a.slug];
  if (!x) return a;
  const f = extraFaq[a.slug];
  return {
    ...a,
    faqs: f && a.faqs.length < 4 ? [...a.faqs, f] : a.faqs,
    sections: [
      ...a.sections,
      { id: "example", title: x.example.title, blocks: x.example.paras.map((text) => ({ t: "p" as const, text })) },
      { id: "mistakes", title: "Common mistakes to avoid", blocks: [{ t: "ul" as const, items: x.mistakes }] },
      ...(y ? [{ id: "measure", title: "How to measure success", blocks: y.measure.map((text) => ({ t: "p" as const, text })) }] : []),
      { id: "checklist", title: "Your action checklist", blocks: [{ t: "ol" as const, items: x.checklist }] },
      ...(y ? [{ id: "questions", title: "Questions to ask before you start", blocks: [{ t: "ul" as const, items: y.questions }] }] : []),
    ],
  };
};

/** All 21 articles in content plan order. */
export const articles: Article[] = [...webArticles, ...ecommerceArticles, ...automationArticles, ...softwareArticles].map(withExtras);

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
