import Link from "next/link";
import { ContactIcons } from "@/components/ui/ContactLinks";
import { site, primaryNav, legalNav } from "@/lib/site";
import { publishedServices } from "@/data/services";
import { LogoMark } from "@/components/visuals/LogoMark";
import { CurrentYear } from "./CurrentYear";

/** Complete footer (PRD §7.3). Contact details and socials render only when approved + configured. */
export function SiteFooter() {

  return (
    <footer className="relative overflow-hidden border-t border-line bg-bg">
      <div className="wrap-wide pb-6 pt-10 md:pb-8 md:pt-24">
        <div className="grid gap-8 md:grid-cols-12 md:gap-14">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3" aria-label={`${site.name} home`}>
              <LogoMark animateOnMount={false} size={34} />
              <span className="font-display text-xl font-semibold tracking-tight">{site.name}</span>
            </Link>
            <p className="mt-4 max-w-sm text-[1.0625rem] md:mt-6 leading-relaxed text-muted">
              A full service digital agency for web, marketing, advertising, commerce, content, AI and brand.
            </p>
            <ContactIcons className="mt-5 md:mt-8" />
          </div>

          <nav aria-label="Footer" className="grid grid-cols-[0.7fr_1.3fr] gap-6 md:col-span-7 md:gap-10 md:grid-cols-[1fr_1.6fr]">
            <div>
              <h2 className="mb-3 text-sm font-medium text-subtle md:mb-5">Navigate</h2>
              <ul className="space-y-2 md:space-y-3">
                {primaryNav.map((link) => (
                  <li key={link.href}>
                    <Link className="link-quiet text-[1.0625rem]" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-3 text-sm font-medium text-subtle md:mb-5">Services</h2>
              <ul className="space-y-2 md:space-y-3">
                {publishedServices.map((s) => (
                  <li key={s.slug}>
                    <Link className="link-quiet text-[1.0625rem]" href={`/services/${s.slug}`}>
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 md:mt-16 md:gap-4 border-t border-line pt-6 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {site.legalName ?? site.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link className="link-quiet" href={l.href}>
                  {l.label}
                </Link>
              </li>
            ))}
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
