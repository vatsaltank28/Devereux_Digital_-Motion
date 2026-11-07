import { cn } from "@/lib/cn";

interface SectionLabelProps {
  /** Two-digit index, only where the section really belongs to a sequence (e.g. "01"). */
  index?: string;
  children: string;
  className?: string;
}

/** Compact blue-dark pill — "01 / SERVICES" (DESIGN.md §4.5). */
export function SectionLabel({ index, children, className }: SectionLabelProps) {
  return (
    <span className={cn("pill", className)}>
      {index ? `${index} / ${children}` : children}
    </span>
  );
}
