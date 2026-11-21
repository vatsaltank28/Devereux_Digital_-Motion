import Image from "next/image";
import Link from "next/link";
import type { PortfolioProject } from "@/data/portfolio";
import type { CaseStudy } from "@/data/caseStudies";
import { tools } from "@/data/tools";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Lightbox } from "@/components/ui/Lightbox";
import { LinkButton } from "@/components/ui/Button";
import { ToolMark } from "@/components/services/ToolLogos";
import { LazyVideo } from "./LazyVideo";

function Label({ children }: { children: React.ReactNode }) {
  return <p className="cs-label">{children}</p>;
}

function Check() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

function External({ href, children, className }: { href: string; children: React.ReactNode; className: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children} <span aria-hidden="true">↗</span>
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

type Shot = { file: string; alt: string; w: number; h: number };

function ShotButton({ dir, s, className, sizes, imgClass, caption }: { dir: string; s: Shot; className: string; sizes: string; imgClass: string; caption?: boolean }) {
  const src = `${dir}/${s.file}`;
  return (
    <Lightbox image={{ src, alt: s.alt, width: s.w, height: s.h }} label={`View full size: ${s.alt}`} caption={s.alt} className={className}>
      <Image src={src} alt={s.alt} width={s.w} height={s.h} sizes={sizes} className={imgClass} />
      {caption && <span className="cs-shot-cap">{s.alt}</span>}
    </Lightbox>
  );
}

/** Full case study layout (reference: Acceltor case studies). Compact on phones: short sections, swipeable gallery. */
export function CaseStudyView({ p, cs, prev, next }: { p: PortfolioProject; cs: CaseStudy; prev?: PortfolioProject; next?: PortfolioProject }) {
  const dir = cs.video.file.replace(/\/[^/]+$/, "");
  const edgeShot = cs.shots[cs.edge.image - 1] ?? cs.shots[0]!;

  return (
    <article className="cs">
      <header className="pt-[calc(var(--header-h)+1.25rem)] sm:pt-[calc(var(--header-h)+2.5rem)]">
        <div className="wrap-wide">
          <Breadcrumbs trail={[{ name: "Home", href: "/" }, { name: "Work", href: "/work" }, { name: p.title }]} />
          <div className="mt-5 grid gap-6 lg:mt-7 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-7">
              <span className="cs-badge">{cs.badge}</span>
              <h1 className="t-h1 mt-3">{p.title}</h1>
              <p className="t-body mt-3 max-w-[46ch]">{p.summary}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <External href={cs.liveUrl} className="btn btn-primary max-sm:flex-1">Visit live website</External>
                <LinkButton href="/contact" variant="secondary" location={`case-study-hero:${p.slug}`} className="max-sm:flex-1">
                  Start a similar project
                </LinkButton>
              </div>
            </div>
            <dl className="cs-facts lg:col-span-5">
              {cs.facts.map((f) => (
                <div key={f.label} className="cs-fact">
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </header>

      <section aria-label="Website walkthrough video" className="pt-7 md:pt-12">
        <div className="wrap-wide">
          <div className="cs-browser">
            <div className="cs-browser-bar">
              <span className="cs-dots" aria-hidden="true"><span /><span /><span /></span>
              <External href={cs.liveUrl} className="cs-url">{cs.domain}</External>
            </div>
            <LazyVideo src={cs.video.file} poster={cs.video.poster} label={cs.video.label} />
          </div>
        </div>
      </section>

      <section aria-label="Client and challenge" className="cs-section">
        <div className="wrap-wide grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Label>The client</Label>
            <p className="cs-client">{cs.client}</p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Label>The challenge</Label>
            <ul className="mt-4 space-y-3">
              {cs.challenges.map((c) => (
                <li key={c} className="cs-ring-item">{c}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="edge-title" className="cs-section pt-0">
        <div className="wrap-wide">
          <div className="cs-edge">
            <div className="cs-edge-copy">
              <Label>What sets it apart</Label>
              <h2 id="edge-title" className="t-h3 mt-3">{cs.edge.title}</h2>
              <p className="t-body mt-3">{cs.edge.body}</p>
            </div>
            <ShotButton dir={dir} s={edgeShot} className="cs-edge-media group" sizes="(max-width: 1024px) 92vw, 55vw" imgClass="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]" />
          </div>
        </div>
      </section>

      <section aria-labelledby="gallery-title" className="cs-section pt-0">
        <div className="wrap-wide">
          <div className="flex items-end justify-between gap-4">
            <div>
              <Label>Inside the website</Label>
              <h2 id="gallery-title" className="t-h3 mt-3">Key screens.</h2>
            </div>
            <p className="t-caption max-sm:hidden">Click any screen to view it full size.</p>
            <p className="t-caption sm:hidden">Swipe →</p>
          </div>
          <ul className="cs-gallery mt-5">
            {cs.shots.map((s) => (
              <li key={s.file}>
                <ShotButton dir={dir} s={s} caption className="cs-shot group" sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 26vw" imgClass="aspect-[16/10] h-auto w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" />
              </li>
            ))}
            {cs.mobileShot && <li className="cs-gallery-phone">
              <ShotButton dir={dir} s={cs.mobileShot} className="cs-phone" sizes="(max-width: 640px) 40vw, 14vw" imgClass="h-full w-full object-cover object-top" />
            </li>}
          </ul>
        </div>
      </section>

      <section aria-labelledby="delivered-title" className="cs-section border-t border-line">
        <div className="wrap-wide grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Label>What we delivered</Label>
            <h2 id="delivered-title" className="t-h2 mt-3">Everything we built for {p.title}.</h2>
            <ul className="cs-delivered mt-6">
              {cs.delivered.map((d) => (
                <li key={d}><span className="cs-check"><Check /></span>{d}</li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Label>Built with</Label>
            <ul className="cs-stack mt-4">
              {cs.stack.map((k) => {
                const t = tools[k] as (typeof tools)[typeof k] | undefined;
                if (!t) return null;
                return (
                  <li key={k} className="cs-stack-item">
                    <ToolMark tool={t} size={20} />
                    <span>{t.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="result-title" className="cs-section pt-0">
        <div className="wrap-wide">
          <div className="cs-result">
            <div className="lg:col-span-5">
              <Label>The result</Label>
              <h2 id="result-title" className="t-h2 mt-3">{cs.resultTitle}</h2>
              {cs.stats.length > 0 && <dl className="cs-stats mt-6">
                {cs.stats.map((s) => (
                  <div key={s.label} className="flex flex-col-reverse">
                    <dt className="cs-stat-label">{s.label}</dt>
                    <dd className="cs-stat-num">{s.value}</dd>
                  </div>
                ))}
              </dl>}
              {cs.statsSource && <p className="t-caption mt-3">{cs.statsSource}.</p>}
            </div>
            <ul className="space-y-3 lg:col-span-6 lg:col-start-7 lg:self-center">
              {cs.results.map((r) => (
                <li key={r} className="cs-result-item"><span className="cs-check"><Check /></span>{r}</li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <External href={cs.liveUrl} className="btn btn-secondary max-sm:w-full">Explore {cs.domain}</External>
            <Link href="/work" className="link-arrow inline-flex min-h-11 items-center sm:ml-3">All case studies</Link>
          </div>
        </div>
      </section>

      {(prev || next) && (
        <nav aria-label="More case studies" className="cs-section pt-0">
          <div className="wrap-wide grid grid-cols-2 gap-3 sm:gap-4">
            {prev ? (
              <Link href={`/work/${prev.slug}`} className="cs-pn">
                <span className="cs-pn-k">Previous</span>
                <span className="cs-pn-t">← {prev.title}</span>
              </Link>
            ) : <span />}
            {next && (
              <Link href={`/work/${next.slug}`} className="cs-pn items-end text-right">
                <span className="cs-pn-k">Next</span>
                <span className="cs-pn-t">{next.title} →</span>
              </Link>
            )}
          </div>
        </nav>
      )}
    </article>
  );
}
