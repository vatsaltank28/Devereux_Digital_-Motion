import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { publishedProjects, getProject } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";
import { CaseStudyLayout } from "@/components/portfolio/CaseStudyLayout";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return publishedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.seoTitle,
    description: project.seoDescription,
    path: `/work/${project.slug}`,
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <CaseStudyLayout project={project} />;
}
