import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { ProjectEnquiryForm } from "@/components/forms/ProjectEnquiryForm";

export const metadata: Metadata = buildMetadata({
  title: "Start a Project",
  description: "Tell Devereux Digitals about your project. Send an enquiry and we’ll reply to talk through the scope.",
  path: "/contact",
});

const helpful = [
  "What you want the work to achieve for your business",
  "Who it is for, and anything that has or hasn’t worked before",
  "Any deadlines or events it needs to meet",
  "Links to your current site, accounts or examples you admire",
];

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ service?: string | string[] }> }) {
  const params = await searchParams;
  const service = Array.isArray(params.service) ? params.service[0] : params.service;

  return (
    <div className="relative isolate overflow-hidden pb-[var(--section-y)] pt-[calc(var(--header-h)+2.5rem)] sm:pt-[calc(var(--header-h)+4rem)]">
      <div className="hero-atmosphere absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="wrap-wide grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="mb-8">
            <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Contact" }]} />
          </div>
          <SectionLabel>Contact</SectionLabel>
          <SplitHeading as="h1" trigger="load" delay={0.05} className="t-h1 mt-6 max-w-[10ch]">
            Start a project.
          </SplitHeading>
          <p className="hero-rise t-lead mt-7" style={{ animationDelay: "0.4s" }}>
            Tell us what you’re working on. We’ll read your enquiry and reply to talk through the scope and whether we’re the right fit.
          </p>

          <div className="hero-rise mt-12" style={{ animationDelay: "0.5s" }}>
            <h2 className="t-h4">What helps us reply usefully</h2>
            <ul className="mt-5 divide-y divide-line border-y border-line">
              {helpful.map((h) => (
                <li key={h} className="flex gap-4 py-3.5 text-[0.98rem] text-muted">
                  <span aria-hidden="true" className="mt-[0.6rem] size-1.5 shrink-0 bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {(site.contact.email || site.contact.phone) && (
            <div className="hero-rise mt-10 space-y-2" style={{ animationDelay: "0.6s" }}>
              <h2 className="t-h4">Prefer to write directly?</h2>
              {site.contact.email && (
                <p>
                  <a className="link-quiet text-[1.0625rem]" href={`mailto:${site.contact.email}`}>
                    {site.contact.email}
                  </a>
                </p>
              )}
              {site.contact.phone && (
                <p>
                  <a className="link-quiet text-[1.0625rem]" href={`tel:${site.contact.phone.replace(/\s+/g, "")}`}>
                    {site.contact.phone}
                  </a>
                </p>
              )}
            </div>
          )}
        </div>

        <div className="lg:col-span-7">
          <ProjectEnquiryForm defaultService={service} />
        </div>
      </div>
    </div>
  );
}
