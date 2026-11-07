import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { SectionLabel } from "./SectionLabel";

interface PageHeroProps {
  label?: string;
  title: string;
  description?: string;
  trail?: Crumb[];
  children?: ReactNode;
}

/** Hero for inner pages (services index, work, about, contact, legal). Same intro grammar as the home hero. */
export function PageHero({ label, title, description, trail, children }: PageHeroProps) {
  return (
    <header className="relative isolate overflow-hidden pb-14 pt-[calc(var(--header-h)+2.5rem)] sm:pb-20 sm:pt-[calc(var(--header-h)+4rem)] lg:pb-24">
      <div className="hero-atmosphere absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
      <div className="wrap-wide">
        {trail && (
          <div className="mb-8">
            <Breadcrumbs trail={trail} />
          </div>
        )}
        {label && <SectionLabel>{label}</SectionLabel>}
        <SplitHeading as="h1" trigger="load" delay={0.05} className="t-h1 mt-6 max-w-[16ch]">
          {title}
        </SplitHeading>
        {description && (
          <p className="hero-rise t-lead mt-7" style={{ animationDelay: "0.4s" }}>
            {description}
          </p>
        )}
        {children && (
          <div className="hero-rise mt-9" style={{ animationDelay: "0.55s" }}>
            {children}
          </div>
        )}
      </div>
    </header>
  );
}
