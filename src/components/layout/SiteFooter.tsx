import Link from "next/link";
import { ContactIcons } from "@/components/ui/ContactLinks";
import { site, legalNav } from "@/lib/site";
import { publishedServices } from "@/data/services";
import { serviceGroups, workLinks } from "@/data/nav";
import { LogoMark } from "@/components/visuals/LogoMark";
import { CurrentYear } from "./CurrentYear";
import { CookieSettingsLink } from "./CookieSettingsLink";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Meet the team", href: "/team" },
  { label: "Insights & Guides", href: "/insights" },
  { label: "Talk to us", href: "/contact" },
];

type Service = (typeof publishedServices)[number];

/** Published services grouped the same way as the mega menu and mobile menu. */
const groups = serviceGroups
  .map((g) => ({
    title: g.title,
    items: g.slugs
      .map((slug) => publishedServices.find((s) => s.slug === slug))
      .filter((s): s is Service => Boolean(s)),
  }))
  .filter((g) => g.items.length > 0);

/** Complete footer (PRD §7.3). Contact details and socials render only when approved + configured. */
export function SiteFooter() {
  const email = site.contact.email;

  return (
    <footer className="site-footer relative overflow-hidden border-t border-line bg-bg">
      <div className="wrap-wide pb-6 pt-10 md:pb-8 md:pt-20">
        <div className="sf-top">
          <div className="sf-brand">
            <Link href="/" className="inline-flex min-h-11 items-center gap-3" aria-label={`${site.name} home`}>
              <LogoMark animateOnMount={false} size={34} />
              <span className="font-display text-xl font-semibold tracking-tight">{site.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-[1.0625rem] leading-relaxed text-muted">
              A Digital Solutions Agency for Businesses, Brands &amp; Creators.
            </p>
            {email ? (
              <a className="sf-email link-quiet" href={`mailto:${email}`}>
                {email}
              </a>
            ) : null}
            <ContactIcons className="mt-5" />
          </div>

          <nav aria-label="Footer" className="sf-nav">
            <section className="sf-col sf-services" aria-labelledby="sf-h-services">
              <h2 id="sf-h-services" className="sf-heading">
                <Link href="/services" className="sf-heading-link">
                  Services
                </Link>
              </h2>
              <div className="sf-groups">
                {groups.map((g) => (
                  <div key={g.title}>
                    <h3 className="sf-subheading">{g.title}</h3>
                    <ul className="sf-list">
                      {g.items.map((s) => (
                        <li key={s.slug}>
                          <Link className="sf-link link-quiet" href={`/services/${s.slug}`}>
                            {s.shortTitle ?? s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section className="sf-col" aria-labelledby="sf-h-work">
              <h2 id="sf-h-work" className="sf-heading">
                Work
              </h2>
              <ul className="sf-list">
                {workLinks.map((w) => (
                  <li key={w.id}>
                    <Link className="sf-link link-quiet" href={w.href}>
                      {w.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            <section className="sf-col" aria-labelledby="sf-h-company">
              <h2 id="sf-h-company" className="sf-heading">
                Company
              </h2>
              <ul className="sf-list">
                {companyLinks.map((l) => (
                  <li key={l.href}>
                    <Link className="sf-link link-quiet" href={l.href}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </nav>
        </div>

        <div className="sf-bottom">
          <p>
            © <CurrentYear /> {site.legalName ?? site.name}. All rights reserved.
          </p>
          <ul className="sf-legal" aria-label="Legal">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link className="link-quiet" href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsLink />
            </li>
          </ul>
        </div>
      </div>

      {/* Typographic sign-off, decorative */}
      <div
        aria-hidden="true"
        data-text={site.name}
        className="footer-wordmark pointer-events-none select-none whitespace-nowrap px-[var(--gutter)] pb-4 text-center font-display font-semibold leading-[0.8] tracking-[-0.05em] text-white/[0.045]"
        style={{ fontSize: "clamp(3rem, 12.2vw, 13rem)" }}
      />
    </footer>
  );
}
