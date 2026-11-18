import { featuredReview } from "@/data/reviews";
import { featuredReviewImage } from "@/data/media";
import { homeStage } from "@/data/stage";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/motion/Reveal";
import { Stars } from "@/components/services/ReviewWall";

/**
 * The client's headline review: a compact pull-quote. The original message opens from a
 * "See Chat" link, the same pattern as the review cards on every service page.
 */
export function FeaturedReview() {
  return (
    <section aria-labelledby="featured-review-title" className="section relative isolate overflow-hidden border-t border-line">
      <div aria-hidden="true" className="featured-review-glow" />
      <div className="wrap-wide">
        <Reveal>
          <p className="t-caption uppercase tracking-[0.2em]">{homeStage.about.title}</p>
        </Reveal>

        <div className="mt-10 max-w-[56rem]">
          <Reveal className="flex flex-wrap items-center gap-3">
            <Stars size={20} />
            <span className="text-sm text-muted">5.0 · Verified client review</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="featured-review-title" className="sr-only">
              What clients say about working with us
            </h2>
            <blockquote className="featured-quote mt-6">{featuredReview.quote}</blockquote>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-[38rem] text-lg leading-relaxed text-muted">“{featuredReview.followUp}”</p>
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5 text-sm">
              <p className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-10 bg-[var(--color-accent)]" />
                <span className="font-semibold text-ink">{featuredReview.name}</span>
                <span className="text-muted">· {featuredReview.role}</span>
              </p>
              <Lightbox
                image={featuredReviewImage}
                label={`See the original chat from ${featuredReview.name}`}
                caption="Original client chat (names blurred for privacy)"
                className="review-chat-link"
              >
                See Chat <span aria-hidden="true">→</span>
              </Lightbox>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
