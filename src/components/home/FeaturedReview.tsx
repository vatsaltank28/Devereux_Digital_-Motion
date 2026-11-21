import { featuredReview } from "@/data/reviews";
import { featuredReviewImage } from "@/data/media";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/motion/Reveal";
import { Stars } from "@/components/services/ReviewWall";

/**
 * The client's headline review, in the client approved testimonial card layout:
 * title + score, stars, quote, client line. The original chat opens from a compact "See Chat"
 * pill inside the card, with a green pulse so it reads as tappable even at a small size.
 */
export function FeaturedReview() {
  return (
    <section id="reviews" aria-labelledby="featured-review-title" className="featured-review relative isolate overflow-hidden border-t border-line">
      <div aria-hidden="true" className="featured-review-glow" />
      <div className="wrap-wide flex flex-col items-center">
        <h2 id="featured-review-title" className="sr-only">
          What clients say about working with us
        </h2>
        <Reveal className="w-full max-w-[44rem]">
          <figure className="ft-card">
            <div className="flex items-center justify-between gap-4">
              <p className="font-display text-xl font-semibold sm:text-2xl">Client testimonial</p>
              <span className="review-score">
                5.0
                <svg viewBox="0 0 20 20" width="13" height="13" aria-hidden="true">
                  <path fill="currentColor" d="M10 1.5l2.6 5.3 5.9.9-4.25 4.1 1 5.85L10 14.9l-5.25 2.75 1-5.85L1.5 7.7l5.9-.9z" />
                </svg>
              </span>
            </div>
            <div className="mt-3">
              <Stars size={22} />
            </div>
            <blockquote className="ft-quote mt-5">“{featuredReview.quote}”</blockquote>
            <figcaption className="ft-foot">
              <span className="flex min-w-0 items-center gap-3">
                <span aria-hidden="true" className="review-avatar">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block font-display font-semibold">{featuredReview.name}</span>
                  <span className="block text-sm text-muted">{featuredReview.role} · Ongoing partnership</span>
                </span>
              </span>
              <Lightbox
                image={featuredReviewImage}
                label={`See Chat from ${featuredReview.name}`}
                caption="Original client chat (names blurred for privacy)"
                className="chat-pill"
              >
                <span aria-hidden="true" className="chat-pill-dot" />
                See Chat <span aria-hidden="true">→</span>
              </Lightbox>
            </figcaption>
            <p className="ft-note">Unedited screenshot of the client’s message, names blurred for privacy.</p>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
