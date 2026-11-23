import Image from "next/image";
import Link from "next/link";
import { categoryLabel, coverImage, portfolio } from "@/data/portfolio";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";

/**
 * "The kind of work we do": two rows of live websites drifting in opposite directions, each opening
 * its case study (React Bits-style infinite gallery, CSS-driven, pauses on hover, static for reduced motion).
 */
const items = portfolio
  .filter((p) => p.caseStudy)
  .map((p) => {
    const img = coverImage(p.media[0]);
    return { src: img.src, width: img.width, height: img.height, alt: `${p.title} website`, slug: p.slug, service: categoryLabel(p.category), title: p.title };
  });
const rows = [items, [...items].reverse()];

export function WorkMarquee() {
  return (
    <section aria-labelledby="work-marquee-title" className="section-tight overflow-hidden border-t border-line">
      <div className="wrap-wide mb-8 grid gap-4 md:mb-12 md:gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <SectionLabel>Our work</SectionLabel>
          <SplitHeading id="work-marquee-title" className="t-h2 mt-5 max-w-[18ch]">
            Websites, stores, brands, campaigns and AI tools, built for real businesses.
          </SplitHeading>
        </div>
        <p className="t-body lg:col-span-4 lg:col-start-9">
          A look at live websites, online stores and AI products we’ve worked on. Tap any project to open its case study.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {rows.map((row, r) => (
          <div key={r} className="wm-row">
            <div className={`wm-track ${r ? "wm-track--rev" : ""}`}>
              {[0, 1].map((dup) =>
                row.map((it) => (
                  <Link
                    key={`${dup}-${it.src}`}
                    href={`/work/${it.slug}`}
                    className="wm-item"
                    tabIndex={dup ? -1 : undefined}
                    aria-hidden={dup ? true : undefined}
                  >
                    <Image src={it.src} alt={dup ? "" : it.alt} width={it.width} height={it.height} sizes="360px" className="wm-img" />
                    <span className="wm-cap">
                      <span className="wm-tag">{it.service}</span>
                      <span className="wm-desc">{it.title}</span>
                      <span className="wm-view">View case study <span aria-hidden="true">→</span></span>
                    </span>
                  </Link>
                )),
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
