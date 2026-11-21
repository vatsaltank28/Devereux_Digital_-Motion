import type { Metadata } from "next";
import Image from "next/image";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { FinalCTA } from "@/components/home/FinalCTA";
import { team } from "@/data/team";

export const metadata: Metadata = buildMetadata({
  title: "Meet the Team",
  description:
    "Meet the people behind Devereux Digitals: Lorenzo Devereux, Founder & CEO, and Vatsal Tank, Head Developer & Designer.",
  path: "/team",
});

export default function TeamPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Meet the Team", path: "/team" }])} />
      <PageHero
        label="Meet the team"
        title="The people behind Devereux Digitals."
        description="A small, focused team bringing strategy, design and development together under one roof."
        trail={[{ name: "Home", href: "/" }, { name: "Meet the Team" }]}
      />

      <section aria-label="Team members" className="section-tight border-t border-line">
        <div className="wrap-wide">
          <ul className="team-grid">
            {team.map((m) => (
              <li key={m.name}>
                <div className="team-card">
                  <div className="team-photo">
                    {m.photo ? (
                      <Image
                        src={m.photo.src}
                        alt={`Portrait of ${m.name}`}
                        width={m.photo.width}
                        height={m.photo.height}
                        sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 92vw"
                        className="team-img"
                      />
                    ) : (
                      <span className="team-mono" aria-hidden="true">
                        {m.monogram}
                      </span>
                    )}
                  </div>
                  <div className="team-body">
                    <h2 className="team-name">{m.name}</h2>
                    <p className="team-role">{m.role}</p>
                    <p className="team-summary">{m.summary}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
