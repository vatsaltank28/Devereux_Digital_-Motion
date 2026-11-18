import Image from "next/image";
import Link from "next/link";
import { serviceWork } from "@/data/media";
import { services } from "@/data/services";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";

/**
 * "The kind of work we do": two rows of real portfolio pieces drifting in opposite directions
 * (React Bits-style infinite gallery, CSS-driven, pauses on hover, static for reduced motion).
 */
const items = Object.entries(serviceWork).flatMap(([slug, imgs]) =>
  imgs.slice(0, 3).map((img) => ({ ...img, slug, service: services.find((s) => s.slug === slug)?.shortTitle ?? "" })),
);
const rows = [items.filter((_, i) => i % 2 === 0), items.filter((_, i) => i % 2 === 1)];

export function WorkMarquee() {
  return (
    <section aria-labelledby="work-marquee-title" className="section-tight overflow-hidden border-t border-line">
      <div className="wrap-wide mb-12 grid gap-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <SectionLabel>Our work</SectionLabel>
          <SplitHeading id="work-marquee-title" className="t-h2 mt-5 max-w-[18ch]">
            Websites, stores, brands, campaigns and AI tools — built for real businesses.
          </SplitHeading>
        </div>
        <p className="t-body lg:col-span-4 lg:col-start-9">
          A look at recent projects across every service: store redesigns, ad dashboards, brand identities, CRM automations
          and search growth. Tap any piece to see the full service.
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
                    href={`/services/${it.slug}`}
                    className="wm-item"
                    tabIndex={dup ? -1 : undefined}
                    aria-hidden={dup ? true : undefined}
                  >
                    <Image src={it.src} alt={dup ? "" : it.alt} width={it.width} height={it.height} sizes="360px" className="wm-img" />
                    <span className="wm-tag">{it.service}</span>
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
