import type { TitledText } from "./types";

/**
 * Homepage copy. Everything here is editable placeholder-grade copy based on the PRD/brief.
 * no invented years, client counts, awards or results (PRD §8 H03).
 */
export const hero = {
  headlineLines: ["Digital experiences", "that move ideas", "forward."],
  description:
    "Devereux Digitals is a full service digital agency. We design, build and promote websites, stores, campaigns, content and smart business tools for companies that want to be taken seriously online.",
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
        "Defined stages, shared checkpoints and plain language updates keep everyone aligned.",
    },
  ] satisfies TitledText[],
} as const;

export const howWeWork = {
  title: "How we work",
  intro:
    "Every service follows the same backbone, adapted to the job. Details change; the discipline doesn’t.",
  steps: [
    { title: "Discovery", description: "We understand your business, requirements, goals and challenges." },
    { title: "Planning", description: "We recommend the right solution and prepare the project scope." },
    { title: "Design & Development", description: "The project is created according to the agreed scope." },
    { title: "Review & Refinement", description: "Testing, feedback and the agreed revisions." },
    { title: "Delivery & Support", description: "Handover, launch and any agreed ongoing maintenance." },
  ] satisfies TitledText[],
} as const;

export const finalCta = {
  headline: "Let’s turn your next idea into something valuable.",
  description:
    "Whether you’re building something new, improving an existing system or looking to grow your business, let’s discuss what you need.",
} as const;

