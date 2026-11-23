import { HomeHero } from "@/components/home/HomeHero";
import { ClientMarquee } from "@/components/home/ClientMarquee";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { CaseStudySpotlight } from "@/components/home/CaseStudySpotlight";
import { CapabilityStats } from "@/components/home/CapabilityStats";
import { WhyDevereux } from "@/components/home/WhyDevereux";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { FeaturedReview } from "@/components/home/FeaturedReview";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { howWeWork } from "@/data/home";

/** Conversion path: promise, trust, services, work, proof, reasons, process, reviews, answers, action. */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ClientMarquee />
      <ServicesGrid />
      <FeaturedWork />
      <CaseStudySpotlight />
      <CapabilityStats />
      <WhyDevereux />
      <ProcessSteps steps={howWeWork.steps} label="How we work" title="From first conversation to launch." />
      <FeaturedReview />
      <HomeFAQ />
      <FinalCTA
        heading="Have an idea worth building?"
        description="Let’s turn your vision into something real."
        primaryLabel="Start your project"
        secondary={{ label: "Explore our services", href: "/services" }}
        location="home-final-cta"
      />
    </>
  );
}
