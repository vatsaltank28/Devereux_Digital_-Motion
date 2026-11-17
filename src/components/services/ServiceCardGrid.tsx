import Link from "next/link";
import { publishedServices } from "@/data/services";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRight } from "@/components/ui/Icons";
import { ServiceCard } from "./ServiceCard";

/**
 * Responsive grid: 1 col phones → 2 col tablets → 4 col wide desktop (PRD H02).
 * Only live services are listed; the eighth cell is a direct route to a conversation for visitors who
 * are not sure which service fits.
 */
export function ServiceCardGrid() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {publishedServices.map((service, i) => (
        <li key={service.slug} className="flex">
          <Reveal className="flex w-full" delay={(i % 4) * 0.06}>
            <ServiceCard service={service} className="w-full" />
          </Reveal>
        </li>
      ))}
      <li className="flex">
        <Reveal className="flex w-full" delay={0.18}>
          <Link
            href="/contact"
            className="group flex min-h-[17rem] w-full flex-col justify-between rounded-[var(--radius-card)] bg-accent p-6 text-[var(--color-on-accent)] transition-colors hover:bg-accent-bright md:p-7"
          >
            <span className="grid size-10 place-items-center self-end rounded-full border border-current/30 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
              <ArrowUpRight size={16} />
            </span>
            <span>
              <span className="t-h4 block">Not sure where to start?</span>
              <span className="mt-3 block text-[0.95rem] leading-relaxed opacity-80">
                Tell us the goal. We’ll recommend the right mix of services and a sensible first step.
              </span>
            </span>
          </Link>
        </Reveal>
      </li>
    </ul>
  );
}
