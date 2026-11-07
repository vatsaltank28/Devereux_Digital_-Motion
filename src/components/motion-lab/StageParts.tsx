import Link from "next/link";
import type { StageContent, StageGalleryItem } from "@/data/stage";
import { ProjectArt } from "@/components/visuals/ProjectArt";
import { ArrowRight } from "@/components/ui/Icons";

/** Presentational pieces shared by the pinned cinematic stage and its static (reduced-motion / no-WebGL) twin. */

export function HeroCard({ content }: { content: StageContent["heroCard"] }) {
  return (
    <div className="st-violet relative grid h-full w-full overflow-hidden rounded-[28px] md:grid-cols-[1.15fr_0.85fr]">
      <div className="relative z-10 flex flex-col justify-between gap-8 p-6 sm:p-9 md:p-12">
        <h1 className="font-display text-[clamp(2rem,1.1rem+3.3vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
          {content.title}
        </h1>
        <div>
          <p className="max-w-[30rem] text-[clamp(0.98rem,0.92rem+0.25vw,1.15rem)] leading-relaxed text-white/80">{content.body}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={content.primary.href} className="btn bg-white text-[#0b0220] hover:bg-white/90">
              <span>{content.primary.label}</span>
              <ArrowRight />
            </Link>
            <Link href={content.secondary.href} className="btn border-white/40 text-white hover:border-white hover:bg-white/10">
              <span>{content.secondary.label}</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="relative hidden md:block" aria-hidden="true">
        <div className="absolute inset-y-6 right-6 left-0 overflow-hidden rounded-[22px] border border-white/15 bg-black/40">
          <ProjectArt variant="branding" className="h-full w-full" />
        </div>
      </div>
    </div>
  );
}

export function SideCardLeft({ content }: { content: StageContent["sideCards"]["left"] }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[24px] border border-white/10 bg-[#07070b]">
      <ProjectArt variant={content.art} className="absolute inset-0 h-full w-full opacity-90" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-5 pt-16">
        <span className="pill pill-outline mb-3 !border-white/30 !text-white/80">{content.tag}</span>
        <p className="font-display text-[1.35rem] font-semibold leading-tight tracking-tight text-white">{content.title}</p>
      </div>
    </div>
  );
}

export function SideCardRight({ content }: { content: StageContent["sideCards"]["right"] }) {
  return (
    <div className="st-violet-deep relative h-full w-full overflow-hidden rounded-[24px] border border-white/10 p-5">
      <span className="pill pill-outline !border-white/30 !text-white/80">{content.tag}</span>
      <div className="absolute inset-x-5 bottom-5">
        <p className="font-display text-[1.45rem] font-semibold leading-tight tracking-tight text-white">{content.title}</p>
        <p className="mt-2 text-sm leading-relaxed text-white/70">{content.body}</p>
      </div>
    </div>
  );
}

/** The ✦ itself is NOT drawn here: it is the mask hole in the white stage that later grows to fill the screen. */
export function StarCard({ content }: { content: StageContent["starCard"] }) {
  return (
    <div className="st-violet relative h-full w-full overflow-hidden rounded-[24px]">
      <span className="pill absolute left-5 top-5 !bg-white/15 !text-white">{content.tag}</span>
      <p className="absolute inset-x-6 bottom-6 font-display text-[clamp(1.35rem,1rem+1.2vw,2rem)] font-semibold leading-[1.08] tracking-tight text-white">
        {content.title}
      </p>
    </div>
  );
}

export function GalleryPanel({ item }: { item: StageGalleryItem }) {
  return (
    <Link href={item.href} className="group relative block h-full w-full overflow-hidden rounded-[18px] border border-white/10 bg-[#07070b]">
      <ProjectArt variant={item.art} className="h-full w-full transition-transform duration-700 group-hover:scale-105" />
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-4 pb-4 pt-12">
        <span className="block font-display text-lg font-semibold tracking-tight text-white">{item.title}</span>
        <span className="block text-xs text-white/65">{item.label}</span>
      </span>
    </Link>
  );
}
