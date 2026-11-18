/**
 * Copy for the hero scroll stage (home page and /reference-motion-lab).
 * Brand content only, no figures, clients or claims until the client supplies them.
 */
export interface StageService {
  title: string;
  href: string;
}

export interface StageContent {
  hero: {
    title: string;
    body: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
  services: { title: string; items: StageService[] };
  about: { title: string; body: string };
}

export const homeStage: StageContent = {
  hero: {
    title: "Digital experiences that move businesses forward.",
    body: "A full-service digital agency. We design, build and promote websites, stores, campaigns, content and smart business tools.",
    primary: { label: "Explore Our Services", href: "#services" },
    secondary: { label: "Let’s Talk", href: "/contact" },
  },
  services: {
    title: "Seven services. One team.",
    items: [
      { title: "Web Design & Development", href: "/services/web-design-development" },
      { title: "Digital & Sales Marketing", href: "/services/digital-marketing" },
      { title: "Paid Advertising", href: "/services/paid-advertising" },
      { title: "E-commerce Solutions", href: "/services/ecommerce-solutions" },
      { title: "Video & Content", href: "/services/video-content" },
      { title: "AI & Business Solutions", href: "/services/ai-business-solutions" },
      { title: "Branding & Creative Design", href: "/services/branding-creative-design" },
    ],
  },
  about: {
    title: "Built as one thing, not many.",
    body: "Devereux Digitals brings design, development, marketing, content and business tooling together, so your digital presence works as a whole, planned around your goals and delivered in stages you can follow.",
  },
};
