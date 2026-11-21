import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { publishedServices } from "@/data/services";
import { portfolio } from "@/data/portfolio";
import { articles } from "@/data/insights";

/** Indexable routes only (legal drafts are noindex). Coming-soon has no page, so it is not listed. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  });
  return [
    entry("/", 1),
    entry("/services", 0.9),
    ...publishedServices.map((s) => entry(`/services/${s.slug}`, 0.8)),
    entry("/work", 0.8),
    ...portfolio.map((p) => entry(`/work/${p.slug}`, 0.6)),
    entry("/insights", 0.8),
    ...articles.map((a) => entry(`/insights/${a.slug}`, 0.6)),
    entry("/about", 0.7),
    entry("/contact", 0.9),
  ];
}
