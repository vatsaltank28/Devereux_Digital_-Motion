import Image from "next/image";
import Link from "next/link";
import { getProject } from "@/data/portfolio";
import { SectionLabel } from "@/components/ui/SectionLabel";

/** One real case study told briefly, linking to the full write-up. */
export function CaseStudySpotlight() {
  const p = getProject("reloop");
  const cs = p?.caseStudy;
  const shot = cs?.shots[0];
  if (!p || !cs || !shot) return null;
  return (
    <section aria-labelledby="spotlight-title" className="section-tight border-t border-line">
      <div className="wrap-wide grid items-center gap-7 lg:grid-cols-12 lg:gap-12">
        <Link href={`/work/${p.slug}`} className="spot-media group lg:col-span-7">
          <Image src={`/work/case-studies/${p.slug}/${shot.file}`} alt={`Read the ${p.title} case study. ${shot.alt}`} width={shot.w} height={shot.h} sizes="(max-width: 1024px) 92vw, 56vw" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]" />
        </Link>
        <div className="lg:col-span-5">
          <SectionLabel>Case study</SectionLabel>
          <h2 id="spotlight-title" className="t-h2 mt-4">{p.title}: {cs.edge.title.toLowerCase()}.</h2>
          <p className="t-body mt-4">{cs.client}</p>
          <ul className="mt-5 space-y-2">
            {cs.results.slice(0, 3).map((r) => <li key={r} className="cs-ring-item">{r}</li>)}
          </ul>
          <Link href={`/work/${p.slug}`} className="btn btn-secondary mt-6 max-sm:w-full">Read the case study</Link>
        </div>
      </div>
    </section>
  );
}
