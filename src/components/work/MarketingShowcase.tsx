import Image from "next/image";
import Link from "next/link";
import { coverImage, demoProjects } from "@/data/portfolio";
import { showCampaignMetrics } from "@/data/marketingCaseStudies";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** Marketing client projects on the Digital & Sales Marketing page. Figures appear only once confirmed. */
export function MarketingShowcase() {
  return (
    <section id="marketing-campaigns" aria-labelledby="marketing-showcase-title" className="section-tight scroll-mt-[var(--header-h)] border-t border-line">
      <div className="wrap-wide">
        <SectionLabel>Marketing & growth</SectionLabel>
        <h2 id="marketing-showcase-title" className="t-h2 mt-4 max-w-[18ch]">Marketing that moves beyond visibility.</h2>
        <p className="t-body mt-4 max-w-[42rem]">
          Different challenges require different strategies. Explore how targeted marketing, creative execution and performance-focused campaigns help products, businesses, software and communities reach their objectives.
        </p>
        <ul className="mk-showcase mt-6">
          {demoProjects.map((p) => {
            const cs = p.demo!;
            const img = coverImage(p.media[0]);
            return (
              <li key={p.slug}>
                <Link href={`/work/${p.slug}`} className="mk-card">
                  <span className="mk-card-img">
                    <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(max-width: 1099px) 46vw, 23vw" className="h-full w-full object-cover" />
                  </span>
                  {showCampaignMetrics(cs) && (
                    <>
                      <span className="mk-card-value">{cs.tiles[0].value}</span>
                      <span className="mk-card-label">{cs.tiles[0].label}</span>
                    </>
                  )}
                  <span className="mk-card-name">{p.title}</span>
                  <span className="mk-card-cat">{cs.categoryName}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
