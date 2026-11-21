import Image from "next/image";
import Link from "next/link";
import { articleCover, categoryOf, readMinutes, type Article } from "@/data/insights";
import { cn } from "@/lib/cn";

/** Blog card (reference: Acceltor "More from the blog"): cover, mono meta line, title, excerpt, Read article. */
export function InsightCard({ article, className, priority, headingLevel = 3 }: { article: Article; className?: string; priority?: boolean; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const cat = categoryOf(article.category);
  return (
    <article className={cn("insight-card group", className)}>
      <div className="insight-card-media">
        <Image
          src={articleCover(article)}
          alt=""
          width={1600}
          height={900}
          priority={priority}
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
          className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="insight-meta">
          <span>{cat.short}</span>
          <span aria-hidden="true">·</span>
          <span>{readMinutes(article)} min read</span>
        </p>
        <H className="mt-2 font-display text-lg font-semibold leading-snug tracking-[-0.01em]">
          <Link href={`/insights/${article.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {article.title}
          </Link>
        </H>
        <p className="mt-2 line-clamp-3 text-[0.9rem] leading-relaxed text-muted">{article.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-accent-bright" aria-hidden="true">
          Read article <span className="transition-transform group-hover:translate-x-0.5">→</span>
        </span>
      </div>
    </article>
  );
}
