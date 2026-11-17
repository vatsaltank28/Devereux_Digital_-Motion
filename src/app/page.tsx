import { ScrollStage } from "@/components/motion-lab/ScrollStage";
import { homeStage } from "@/data/stage";
import { OrbitIntro } from "@/components/home/OrbitIntro";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { FinalCTA } from "@/components/home/FinalCTA";

/**
 * Short landing page: the cinematic scroll stage, a route into every service, and the closing CTA.
 * Everything else lives on its own page in the nav — track record and work on /work,
 * why us, process and testimonials on /about.
 */
export default function HomePage() {
  return (
    <>
      <ScrollStage content={homeStage} />
      <OrbitIntro />
      <ServicesGrid />
      <FinalCTA />
    </>
  );
}
