import { services } from "@/data/services";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceCard } from "./ServiceCard";

/** Responsive grid: 1 col phones → 2 col tablets → 4 col wide desktop (PRD H02). */
export function ServiceCardGrid() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {services.map((service, i) => (
        <li key={service.slug} className="flex">
          <Reveal className="flex w-full" delay={(i % 4) * 0.06}>
            <ServiceCard service={service} className="w-full" />
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
