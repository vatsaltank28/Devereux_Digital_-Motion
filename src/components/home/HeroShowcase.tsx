import Image from "next/image";
import Link from "next/link";

/**
 * Hero visual: a stack of live client websites in browser frames, each opening its case study,
 * with result chips around it. Server rendered; motion is CSS only and off for reduced motion.
 */
const CARDS = [
  { slug: "apparelnbags", name: "ApparelnBags", label: "Ecommerce", cls: "hs-card--a", priority: true },
  { slug: "reloop", name: "Reloop", label: "Web Design", cls: "hs-card--b", priority: false },
  { slug: "seamless-ai", name: "Seamless.AI", label: "AI & Automation", cls: "hs-card--c", priority: false },
];

const CHIPS = [
  { text: "Orders doubled this month", tone: "pink", cls: "hs-chip--1", href: "/#reviews" },
  { text: "5.0 ★ client rating", tone: "white", cls: "hs-chip--2", href: "/#reviews" },
  { text: "$20K deal closed from ads", tone: "cobalt", cls: "hs-chip--3", href: "/#reviews" },
];

export function HeroShowcase() {
  return (
    <div className="hs-root" aria-label="Recent client work" role="group">
      <div aria-hidden="true" className="hs-aurora" />
      <div className="hs-stack">
        {CARDS.map((c) => (
          <figure key={c.slug} className={`hs-card ${c.cls}`}>
            <Link href={`/work/${c.slug}`} className="block">
              <div className="hs-bar">
                <i aria-hidden="true" />
                <i aria-hidden="true" />
                <i aria-hidden="true" />
                <span>{c.label}</span>
              </div>
              <Image src={`/work/case-studies/${c.slug}/still-1.jpg`} alt={`${c.name} case study`} width={1920} height={1200} sizes="(max-width: 1024px) 62vw, 30vw" priority={c.priority} className="hs-img" />
            </Link>
          </figure>
        ))}
        {CHIPS.map((c) => (
          <Link key={c.text} href={c.href} className={`hs-chip hs-chip-link hs-chip--${c.tone} ${c.cls}`}>
            <span aria-hidden="true" className="hs-chip-dot" />
            {c.text}
          </Link>
        ))}
      </div>
    </div>
  );
}
