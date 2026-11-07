import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { publishedServices } from "@/data/services";
import { publishedProjects } from "@/data/projects";

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
    ...publishedProjects.map((p) => entry(`/work/${p.slug}`, 0.6)),
    entry("/about", 0.7),
    entry("/contact", 0.9),
  ];
}
