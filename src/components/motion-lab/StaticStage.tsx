import Link from "next/link";
import type { StageContent } from "@/data/stage";
import { ArrowRight } from "@/components/ui/Icons";

/**
 * Non-animated equivalent of the hero stage: same copy, stacked normally. Shown for prefers-reduced-motion and
 * with JavaScript disabled. Nothing moves.
 */
export function StaticStage({ content }: { content: StageContent }) {
  return (
    <section aria-label="Introduction" className="relative overflow-hidden bg-black px-[var(--gutter)] pb-20 pt-[calc(var(--header-h)+5rem)] text-white">
      <div aria-hidden="true" className="st-glow-static absolute inset-0" />
      <div className="relative mx-auto max-w-[1180px]">
        <h1 className="max-w-[18ch] font-display text-[clamp(2.2rem,1.3rem+3.6vw,4.2rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
          {content.hero.title}
        </h1>
        <p className="mt-6 max-w-[34rem] text-[1.08rem] leading-relaxed text-white/80">{content.hero.body}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={content.hero.primary.href} className="btn bg-white text-black hover:bg-white/90">
            <span>{content.hero.primary.label}</span>
            <ArrowRight />
          </Link>
          <Link href={content.hero.secondary.href} className="btn border border-white/30 text-white hover:border-white/70">
            <span>{content.hero.secondary.label}</span>
          </Link>
        </div>

        <ul className="mt-16 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {content.services.items.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="flex items-center justify-between gap-4 rounded-xl border border-white/15 px-4 py-3 text-[0.95rem] font-medium hover:border-white/50">
                {s.title}
                <ArrowRight />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
