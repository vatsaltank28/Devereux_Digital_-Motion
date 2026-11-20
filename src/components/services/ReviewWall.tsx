import type { Review } from "@/data/reviews";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { cn } from "@/lib/cn";

export function Stars({ size = 18 }: { size?: number }) {
  return (
    <span className="flex gap-1" role="img" aria-label="Rated 5 out of 5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" width={size} height={size} aria-hidden="true" className="review-star">
          <path fill="currentColor" d="M10 1.5l2.6 5.3 5.9.9-4.25 4.1 1 5.85L10 14.9l-5.25 2.75 1-5.85L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </span>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** One review in the client's prescribed card format: title + 5.0 badge, stars, quote, client, See Chat. */
export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className={cn("review-card", review.chat && "review-card--proof")}>
      <div className="flex items-start justify-between gap-4">
        <p className="font-display text-lg font-semibold">Client Testimonial</p>
        <span className="review-score">
          5.0
          <svg viewBox="0 0 20 20" width="13" height="13" aria-hidden="true">
            <path fill="currentColor" d="M10 1.5l2.6 5.3 5.9.9-4.25 4.1 1 5.85L10 14.9l-5.25 2.75 1-5.85L1.5 7.7l5.9-.9z" />
          </svg>
        </span>
      </div>
      <div className="mt-3">
        <Stars />
      </div>
      <blockquote className="mt-5 flex-1 text-[1.06rem] leading-relaxed text-ink">“{review.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-4 border-t border-line pt-5">
        <span aria-hidden="true" className="review-avatar">
          {review.name === "Verified client" ? (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
            </svg>
          ) : (
            initials(review.name)
          )}
        </span>
        <span className="min-w-0">
          <span className="block font-semibold">{review.name}</span>
          <span className="block text-sm text-muted">
            {review.role} · {review.service}
          </span>
        </span>
      </figcaption>
      <div className="mt-4 flex min-h-6 items-center justify-between text-sm">
        <span className="text-subtle">{review.chat ? "Verified with chat" : "Client review"}</span>
        {review.chat && (
          <Lightbox image={review.chat} label={`See the original chat from ${review.name}`} caption="Original client chat" className="review-chat-link">
            See Chat <span aria-hidden="true">→</span>
          </Lightbox>
        )}
      </div>
    </figure>
  );
}

/** Reviews at the end of each service page: chat-proof reviews lead, written reviews follow. */
export function ReviewWall({ reviews, serviceTitle }: { reviews: Review[]; serviceTitle: string }) {
  if (reviews.length === 0) return null;
  const proof = reviews.filter((r) => r.chat);
  const ordered = [...proof, ...reviews.filter((r) => !r.chat)];
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="section-tight relative isolate overflow-hidden border-t border-line">
      <div aria-hidden="true" className="review-wall-glow" />
      <div className="wrap-wide">
        <div className="mb-7 grid gap-4 md:mb-12 md:gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionLabel>Reviews</SectionLabel>
            <SplitHeading id="reviews-title" className="t-h2 mt-5 max-w-[18ch]">
              {`What our ${serviceTitle} clients say.`}
            </SplitHeading>
          </div>
          <div className="flex items-center gap-4 lg:col-span-5 lg:justify-end">
            <span className="font-display text-4xl font-semibold tracking-tight md:text-5xl">5.0</span>
            <span>
              <Stars />
              <span className="mt-1 block text-sm text-muted">
                {reviews.length} client reviews{proof.length > 0 && ` · ${proof.length} with chat proof`}
              </span>
            </span>
          </div>
        </div>
        <ul className={cn("review-rail flex gap-4 pt-3 md:grid md:gap-5 md:grid-cols-2", ordered.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-2")}>
          {ordered.map((r, i) => (
            <li key={r.name + i} className="flex max-md:w-[86%] max-md:shrink-0 max-md:snap-start">
              <Reveal delay={(i % 3) * 0.07} className="flex w-full">
                <ReviewCard review={r} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
