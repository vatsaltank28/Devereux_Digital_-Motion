import { HomeHero } from "@/components/home/HomeHero";
import { FeaturedReview } from "@/components/home/FeaturedReview";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WorkMarquee } from "@/components/home/WorkMarquee";
import { CapabilityStats } from "@/components/home/CapabilityStats";
import { FinalCTA } from "@/components/home/FinalCTA";

/**
 * Landing page (client revision): no scroll animation — it opens straight on the
 * Design · Build · Grow hero, then the headline client review, every service, and the closing CTA.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <CapabilityStats />
      <WorkMarquee />
      <FeaturedReview />
      <ServicesGrid />
      <FinalCTA />
    </>
  );
}
