import { ScrollStage } from "@/components/motion-lab/ScrollStage";
import { homeStage } from "@/data/stage";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { ProcessSection } from "@/components/home/ProcessSection";
import { Testimonials } from "@/components/services/Testimonials";
import { FinalCTA } from "@/components/home/FinalCTA";
import { approvedTestimonials } from "@/data/testimonials";

/**
 * Homepage sequence per DESIGN.md §5.1. The hero is the cinematic scroll stage (see components/motion-lab);
 * everything after it is unchanged. Testimonials render only when approved entries exist.
 */
export default function HomePage() {
  return (
    <>
      <ScrollStage content={homeStage} />
      <ServicesGrid />
      <WhyChooseUs />
      <FeaturedWork />
      <ProcessSection />
      <Testimonials items={approvedTestimonials} heading="What clients say" />
      <FinalCTA />
    </>
  );
}
