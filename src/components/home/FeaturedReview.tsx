import Image from "next/image";
import { featuredReview } from "@/data/reviews";
import { featuredReviewImage } from "@/data/media";
import { homeStage } from "@/data/stage";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/motion/Reveal";
import { Stars } from "@/components/services/ReviewWall";

/**
 * The client's headline review (photo "1"): a large pull-quote with the original message beside it.
 * The screenshot sits in a glowing frame; clicking it opens the full photo.
 */
export function FeaturedReview() {
  return (
    <section aria-labelledby="featured-review-title" className="section relative isolate overflow-hidden border-t border-line">
      <div aria-hidden="true" className="featured-review-glow" />
      <div className="wrap-wide">
        <Reveal>
          <p className="t-caption uppercase tracking-[0.2em]">{homeStage.about.title}</p>
        </Reveal>

        <div className="mt-10 grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal className="flex items-center gap-3">
              <Stars size={20} />
              <span className="text-sm text-muted">5.0 · Verified client review</span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 id="featured-review-title" className="sr-only">
                What clients say about working with us
              </h2>
              <span aria-hidden="true" className="featured-quote-mark">“</span>
              <blockquote className="featured-quote">
                {featuredReview.quote}
              </blockquote>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-[38rem] text-lg leading-relaxed text-muted">“{featuredReview.followUp}”</p>
              <p className="mt-8 flex items-center gap-3 text-sm">
                <span aria-hidden="true" className="h-px w-10 bg-[var(--color-accent)]" />
                <span className="font-semibold text-ink">{featuredReview.name}</span>
                <span className="text-muted">· {featuredReview.role}</span>
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-5">
            <Lightbox
              image={featuredReviewImage}
              label="View the original client message full size"
              caption="Original client message (names blurred for privacy)"
              className="featured-shot group block w-full"
            >
              <span aria-hidden="true" className="featured-shot-ring" />
              <Image
                src={featuredReviewImage.src}
                alt={featuredReviewImage.alt}
                width={featuredReviewImage.width}
                height={featuredReviewImage.height}
                sizes="(max-width: 1024px) 92vw, 40vw"
                className="relative block h-auto w-full rounded-[14px]"
              />
              <span className="featured-shot-badge">
                View original message <span aria-hidden="true">↗</span>
              </span>
            </Lightbox>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
