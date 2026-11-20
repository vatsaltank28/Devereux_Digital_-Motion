import { HomeHero } from "@/components/home/HomeHero";
import { FeaturedReview } from "@/components/home/FeaturedReview";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { howWeWork } from "@/data/home";
import { CapabilityStats } from "@/components/home/CapabilityStats";
import { FinalCTA } from "@/components/home/FinalCTA";
import { WhyDevereux } from "@/components/home/WhyDevereux";

/**
 * Landing page (client revision): no scroll animation, it opens straight on the
 * Design · Build · Grow hero, then the headline client review, every service, and the closing CTA.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <CapabilityStats />
      <FeaturedWork />
      <FeaturedReview />
      <ServicesGrid />
      <ProcessSteps steps={howWeWork.steps} label="How we work" title="From idea to execution." />
      <WhyDevereux />
      <FinalCTA />
    </>
  );
}
