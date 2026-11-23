import { SectionLabel } from "@/components/ui/SectionLabel";
import { publishedServices } from "@/data/services";
import { projectsForService } from "@/data/portfolio";
import { ServiceExplorer } from "./ServiceExplorer";

/** Only the fields the explorer needs reach the client bundle. */
const items = publishedServices.map((s) => ({
  slug: s.slug,
  title: s.title,
  description: s.shortDescription,
  bestFor: s.bestFor,
  deliverables: s.deliverables.slice(0, 4).map((d) => d.title),
  examples: projectsForService(s.slug).slice(0, 2).map((p) => ({ slug: p.slug, title: p.title })),
}));

export function ServicesGrid() {
  return (
    <section id="services" aria-labelledby="services-title" className="section scroll-mt-[var(--header-h)] border-t border-line">
      <div className="wrap-wide">
        <div className="mb-7 max-w-[46rem] md:mb-10">
          <SectionLabel>Services</SectionLabel>
          <h2 id="services-title" className="t-h2 mt-4">Everything your business needs to show up online.</h2>
          <p className="t-body mt-4">Seven services that work on their own or together. Choose one to see what you get and who it’s for.</p>
        </div>
        <ServiceExplorer services={items} />
      </div>
    </section>
  );
}
