import type { TitledText } from "./types";

/**
 * Homepage copy. Everything here is editable placeholder-grade copy based on the PRD/brief —
 * no invented years, client counts, awards or results (PRD §8 H03).
 */
export const hero = {
  headlineLines: ["Digital experiences", "that move businesses", "forward."],
  description:
    "Devereux Digitals is a full-service digital agency. We design, build and promote websites, stores, campaigns, content and smart business tools for companies that want to be taken seriously online.",
} as const;

export const whyUs = {
  statement: "We put the work first, then make it hard to ignore.",
  intro:
    "Good digital work is rarely about one clever idea. It is a series of clear decisions, made in the right order, by people who care how the result performs.",
  differentiators: [
    {
      title: "Strategy before surface",
      description:
        "We start with what the work needs to do for your business, then design and build towards it.",
    },
    {
      title: "Craft in the details",
      description:
        "Typography, spacing, motion and copy are treated as part of the product, not a finishing coat.",
    },
    {
      title: "Performance is part of the brief",
      description:
        "Speed, accessibility and responsive behavior are checked throughout, not added at the end.",
    },
    {
      title: "Clear collaboration",
      description:
        "Defined stages, shared checkpoints and plain-language updates keep everyone aligned.",
    },
  ] satisfies TitledText[],
} as const;

export const howWeWork = {
  title: "How we work",
  intro:
    "Every service follows the same backbone, adapted to the job. Details change; the discipline doesn’t.",
  steps: [
    {
      title: "Discover",
      description: "We listen first: your goals, audience, constraints and what success should look like.",
    },
    {
      title: "Plan & design",
      description: "Structure, direction and concepts are shaped and reviewed with you before production starts.",
    },
    {
      title: "Build or produce",
      description: "Websites are developed, campaigns are set up, content is made — in stages you can follow.",
    },
    {
      title: "Test & refine",
      description: "We check the work against the brief on real devices and real data, then fix what needs fixing.",
    },
    {
      title: "Launch & support",
      description: "Go live with a proper handover, reporting and a clear view of what comes next.",
    },
  ] satisfies TitledText[],
} as const;

export const finalCta = {
  headline: "Let’s build something that grows.",
  description:
    "Tell us what you’re working on. We’ll reply to talk through the scope and whether we’re the right fit.",
} as const;
