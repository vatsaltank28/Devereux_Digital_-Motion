import Link from "next/link";
import type { StageContent } from "@/data/stage";
import { ArrowRight } from "@/components/ui/Icons";
import { GalleryPanel, HeroCard } from "./StageParts";
import { STAR_PATH, StarMark } from "./StarMark";

/**
 * Non-animated equivalent of the cinematic stage: same story, same content, stacked normally.
 * Shown for prefers-reduced-motion, when WebGL is unavailable, and with JavaScript disabled.
 * No pinning, no parallax, no auto-rotation — nothing moves.
 */
export function StaticStage({ content }: { content: StageContent }) {
  return (
    <div>
      <section aria-label="Introduction" className="bg-bg px-[var(--gutter)] pb-10 pt-[calc(var(--header-h)+1.5rem)]">
        <div className="mx-auto min-h-[min(78svh,640px)] max-w-[1240px]">
          <HeroCard content={content.heroCard} />
        </div>
      </section>

      <section className="relative overflow-hidden bg-black px-[var(--gutter)] py-24">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 md:grid-cols-[auto_1fr]">
          <StarMark size={140} className="text-white" />
          <div className="max-w-xl space-y-5 text-[1.05rem] leading-relaxed text-white/80">
            {content.particleCopy.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section aria-label="Services" className="bg-black px-[var(--gutter)] pb-24">
        <ul className="mx-auto grid max-w-[1240px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {content.gallery.map((item) => (
            <li key={item.title} className="aspect-[4/5]">
              <GalleryPanel item={item} />
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-white p-3 sm:p-5">
        <div className="st-violet relative overflow-hidden rounded-[28px] px-[calc(var(--gutter)+8px)] py-20 sm:py-28">
          <div className="st-glow absolute inset-0" aria-hidden="true" />
          <svg viewBox="0 0 100 100" className="pointer-events-none absolute -bottom-[10%] -right-[18%] w-[70%] max-w-[760px] md:right-[-6%]" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="static-chrome" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#f4f5ff" />
                <stop offset="0.45" stopColor="#9aa0bd" />
                <stop offset="1" stopColor="#14152a" />
              </linearGradient>
            </defs>
            <path d={STAR_PATH} fill="url(#static-chrome)" />
          </svg>
          <div className="relative max-w-[34rem]">
            <h2 className="font-display text-[clamp(2.6rem,1.4rem+5vw,6rem)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">
              {content.final.headline[0]} <span className="text-white/55">{content.final.headline[1]}</span>
            </h2>
            <p className="mt-6 text-[1.1rem] leading-relaxed text-white/80">{content.final.body}</p>
            <Link href={content.final.cta.href} className="btn mt-8 bg-white text-[#0b0220] hover:bg-white/90">
              <span>{content.final.cta.label}</span>
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
