import { editsSite } from "@/data/included";

/** The Devereux Edits card. `compact` fits the service hero column. */
export function EditsCard({ compact = false }: { compact?: boolean }) {
  return (
    <a href={editsSite.url} target="_blank" rel="noopener" className={`edits-promo group${compact ? " edits-promo--compact" : ""}`}>
      <span aria-hidden="true" className="edits-promo-glow" />
      <span aria-hidden="true" className="edits-promo-reel">
        {Array.from({ length: 14 }, (_, i) => (
          <span key={i} />
        ))}
      </span>
      <span className={`relative flex flex-col gap-8 ${compact ? "" : "lg:flex-row lg:items-end lg:justify-between"}`}>
        <span className="max-w-[40rem]">
          <span className="edits-promo-tag">
            <span className="edits-rec" aria-hidden="true" /> Our editing agency
          </span>
          <span id="edits-title" className={`mt-6 block font-display ${compact ? "text-[clamp(2rem,1.4rem+2vw,3rem)]" : "text-[clamp(2.4rem,1.4rem+4vw,5rem)]"} font-semibold leading-[0.98] tracking-[-0.04em]`}>
            Meet {editsSite.name}.
          </span>
          <span className="mt-5 block text-lg text-white/75">
            Every edit, reel and YouTube video is crafted by our dedicated editing studio. See the showreel,
            packages and latest work on their website.
          </span>
        </span>
        <span className="edits-promo-cta">
          Visit devereuxedits.com
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </span>
      </span>
    </a>
  );
}

