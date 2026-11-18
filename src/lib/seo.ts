import type { Metadata } from "next";
import { site } from "./site";

interface MetaInput {
  title: string;
  description: string;
  /** Route path beginning with "/" */
  path: string;
  noindex?: boolean;
  /** Absolute or root-relative OG image. Defaults to the generated route-level OG image. */
  image?: string;
}

/**
 * Builds consistent per-route metadata: unique title/description, canonical, Open Graph, Twitter.
 * The root layout supplies the "%s, Devereux Digitals" title template.
 */
export function buildMetadata({ title, description, path, noindex, image }: MetaInput): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      url,
      locale: "en_US",
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: image ? [image] : undefined,
    },
  };
}

/** Structured data helpers, only describe facts we actually hold (no invented address/ratings). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    description: site.description,
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}),
  };
}

export function breadcrumbJsonLd(trail: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
