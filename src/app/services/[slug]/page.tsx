import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publishedServices, getService } from "@/data/services";
import { buildMetadata } from "@/lib/seo";
import { ServicePageTemplate } from "@/components/services/ServicePageTemplate";

type Params = { slug: string };

// Only published services are generated; "coming-soon" (and any unknown slug) returns the 404 page.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return publishedServices.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  return <ServicePageTemplate service={service} />;
}
