import type { Metadata } from "next";
import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";
import { publishedServices } from "@/data/services";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="relative isolate overflow-hidden pb-[var(--section-y)] pt-[calc(var(--header-h)+4rem)]">
      <div className="hero-atmosphere absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
      <div className="wrap-wide">
        <p className="pill">404</p>
        <h1 className="t-h1 mt-6 max-w-[14ch]">That page doesn’t exist.</h1>
        <p className="t-lead mt-7">It may have moved, or the link may be wrong. Try one of these instead.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <LinkButton href="/" arrow location="404">
            Back to home
          </LinkButton>
          <LinkButton href="/contact" variant="secondary" location="404">
            Start a Project
          </LinkButton>
        </div>
        <ul className="mt-14 grid gap-x-8 gap-y-3 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {publishedServices.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="link-quiet text-[1.0625rem]">
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
