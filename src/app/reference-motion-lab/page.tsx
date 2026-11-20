import type { Metadata } from "next";
import { ScrollStage } from "@/components/motion-lab/ScrollStage";
import "./stage.css";
import { homeStage } from "@/data/stage";

export const metadata: Metadata = {
  title: "Reference motion lab",
  robots: { index: false, follow: false },
};

/**
 * Experimental route (not in nav or sitemap): the cinematic scroll stage in isolation, with an unsmoothed scrub and a
 * progress HUD so each phase can be captured at an exact progress value and compared with the benchmark frames.
 */
export default function ReferenceMotionLab() {
  return <ScrollStage content={homeStage} debug />;
}
