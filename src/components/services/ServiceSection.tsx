import type { ReactNode } from "react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { cn } from "@/lib/cn";

interface ServiceSectionProps {
  id?: string;
  label: string;
  title: string;
  children: ReactNode;
  className?: string;
}

/** Shared two column frame for service-page sections: sticky heading left, content right (stacked on mobile). */
export function ServiceSection({ id, label, title, children, className }: ServiceSectionProps) {
  const titleId = `${id ?? label.toLowerCase().replace(/\W+/g, "-")}-title`;
  return (
    <section id={id} aria-labelledby={titleId} className={cn("section-tight border-t border-line", className)}>
      <div className="wrap-wide grid gap-6 md:gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <SectionLabel>{label}</SectionLabel>
            <SplitHeading id={titleId} className="t-h2 mt-5 max-w-[12ch]">
              {title}
            </SplitHeading>
          </div>
        </div>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}
