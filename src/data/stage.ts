import type { ArtVariant } from "./types";

/**
 * Copy + imagery for the cinematic scroll stage (home hero and /reference-motion-lab).
 * Brand content only — no text from the reference. Everything is editable placeholder-grade copy:
 * no invented clients, metrics or claims.
 */
export interface StageGalleryItem {
  title: string;
  label: string;
  art: ArtVariant;
  href: string;
}

export interface StageContent {
  heroCard: { title: string; body: string; primary: { label: string; href: string }; secondary: { label: string; href: string } };
  marquee: string[];
  sideCards: { left: { tag: string; title: string; art: ArtVariant }; right: { tag: string; title: string; body: string } };
  starCard: { tag: string; title: string };
  particleCopy: string[];
  morph: { ring: { title: string; body: string }; stats: { value: string; label: string }[] };
  cornerLabel: string;
  gallery: StageGalleryItem[];
  final: { headline: [string, string]; body: string; cta: { label: string; href: string } };
}

export const homeStage: StageContent = {
  heroCard: {
    title: "Digital experiences that move businesses forward.",
    body: "A full-service digital agency. We design, build and promote websites, stores, campaigns, content and smart business tools.",
    primary: { label: "Explore Our Services", href: "#services" },
    secondary: { label: "Let’s Talk", href: "/contact" },
  },
  marquee: ["Strategy without guesswork", "Design that performs", "Built for every screen", "Launch and beyond"],
  sideCards: {
    left: { tag: "Web", title: "Websites built to earn trust", art: "web" },
    right: { tag: "Growth", title: "Campaigns with structure", body: "Marketing, advertising and content, planned around your goals." },
  },
  starCard: { tag: "Devereux", title: "Everything your business needs, in one place." },
  particleCopy: [
    "Devereux Digitals brings design, development, marketing, content and business tooling together, so your digital presence is built as one thing rather than many.",
    "Seven services that work alone or together. Chosen to fit the job, delivered in stages you can follow.",
  ],
  cornerLabel: "Seven services",
  morph: {
    ring: {
      title: "Strategy, design and growth in one orbit.",
      body: "Every service connects, so your brand, site and campaigns move in the same direction.",
    },
    stats: [
      { value: "450+", label: "Videos edited" },
      { value: "300M+", label: "Views generated" },
      { value: "7", label: "Services under one roof" },
    ],
  },
  gallery: [
    { title: "Web Design", label: "Websites & landing pages", art: "web", href: "/services/web-design-development" },
    { title: "E-commerce", label: "Stores that sell", art: "ecommerce", href: "/services/ecommerce-solutions" },
    { title: "Branding", label: "Identity systems", art: "branding", href: "/services/branding-creative-design" },
    { title: "Paid Advertising", label: "Structured campaigns", art: "ads", href: "/services/paid-advertising" },
    { title: "Video & Content", label: "Stories in motion", art: "video", href: "/services/video-content" },
    { title: "AI & Business", label: "Practical automation", art: "ai", href: "/services/ai-business-solutions" },
    { title: "Digital Marketing", label: "Plans you can measure", art: "marketing", href: "/services/digital-marketing" },
  ],
  final: {
    headline: ["Build something", "that grows."],
    body: "Tell us what you’re working on. We’ll reply to talk through the scope and whether we’re the right fit.",
    cta: { label: "Start a Project", href: "/contact" },
  },
};
