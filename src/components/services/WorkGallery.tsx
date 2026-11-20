import Image from "next/image";
import Link from "next/link";
import type { MediaImage } from "@/data/media";
import type { PortfolioProject } from "@/data/portfolio";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";

/** Work & results from the client's service folder. Masonry columns; every image opens full size. */
export function WorkGallery({ images, serviceTitle, projects = [] }: { images: MediaImage[]; serviceTitle: string; projects?: PortfolioProject[] }) {
  if (images.length === 0) return null;
  return (
    <section id="work" aria-labelledby="work-title" className="section-tight border-t border-line">
      <div className="wrap-wide">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 md:mb-10 md:gap-6">
          <div>
            <SectionLabel>Selected work & results</SectionLabel>
            <SplitHeading id="work-title" className="t-h2 mt-5">
              Selected work.
            </SplitHeading>
          </div>
          <p className="t-caption">Tap any image to view it full size.</p>
        </div>
        <ul className="columns-2 gap-3 sm:gap-4 lg:columns-3 [&>li]:mb-3 sm:[&>li]:mb-4">
          {images.map((img, i) => (
            <li key={img.src} className="break-inside-avoid">
              <Reveal delay={(i % 3) * 0.06}>
                <Lightbox image={img} label={`View full size: ${img.alt}`} caption={`${serviceTitle}: ${img.alt}`} className="work-tile group block w-full text-left">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(max-width: 1024px) 50vw, 30vw"
                    quality={90}
                    className="h-auto w-full transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
                  />
                  <span className="work-tile-cap max-sm:hidden">
                    <span>{img.alt}</span>
                    <span aria-hidden="true">↗</span>
                  </span>
                </Lightbox>
              </Reveal>
            </li>
          ))}
        </ul>
        {projects.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-5">
            <span className="text-sm font-semibold text-subtle">Project details:</span>
            {projects.map((p) => (
              <Link key={p.slug} href={`/work/${p.slug}`} className="home-chip">
                {p.title}
              </Link>
            ))}
            <Link href="/work" className="link-arrow inline-flex min-h-11 items-center text-sm sm:ml-auto">
              All work
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
