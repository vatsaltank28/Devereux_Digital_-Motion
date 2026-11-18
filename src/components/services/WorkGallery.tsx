import Image from "next/image";
import type { MediaImage } from "@/data/media";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";

/** Work & results from the client's service folder. Masonry columns; every image opens full size. */
export function WorkGallery({ images, serviceTitle }: { images: MediaImage[]; serviceTitle: string }) {
  if (images.length === 0) return null;
  return (
    <section id="work" aria-labelledby="work-title" className="section-tight border-t border-line">
      <div className="wrap-wide">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Work & results</SectionLabel>
            <SplitHeading id="work-title" className="t-h2 mt-5">
              Real work, real numbers.
            </SplitHeading>
          </div>
          <p className="t-caption">Tap any image to view it full size.</p>
        </div>
        <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4">
          {images.map((img, i) => (
            <li key={img.src} className="break-inside-avoid">
              <Reveal delay={(i % 3) * 0.06}>
                <Lightbox image={img} label={`View full size: ${img.alt}`} caption={`${serviceTitle}: ${img.alt}`} className="work-tile group block w-full text-left">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
                    className="h-auto w-full transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.03]"
                  />
                  <span className="work-tile-cap">
                    <span>{img.alt}</span>
                    <span aria-hidden="true">↗</span>
                  </span>
                </Lightbox>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
