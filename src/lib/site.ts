/**
 * Global site configuration.
 *
 * Anything the client has not yet approved is read from environment variables and is
 * `null` when absent — components omit empty values instead of inventing contact details.
 * See `.env.example` and the README content checklist.
 */

const clean = (value: string | undefined): string | null => {
  const v = value?.trim();
  return v ? v : null;
};

export const site = {
  name: "Devereux Digitals",
  /** Confirm legal entity name + brand capitalisation with the client (PRD §18). */
  legalName: null as string | null,
  tagline: "Full-service digital agency",
  description:
    "Devereux Digitals is a full-service digital agency covering web design and development, digital marketing, paid advertising, e-commerce, video and content, AI and business solutions, and branding.",
  url: (clean(process.env.NEXT_PUBLIC_SITE_URL) ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "en",
  contact: {
    email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? "devereuxedits.01@gmail.com",
    phone: clean(process.env.NEXT_PUBLIC_CONTACT_PHONE) ?? "+1 682 793 8815",
    whatsapp: "https://wa.me/16827938815",
    discord: "https://discord.com/users/1323213896240205845",
    availability: "Online 24/7 · typical reply within 10 minutes",
    founder: "Lorenzo Devereux",
    location: "Buffalo, New York",
    /** Only publish a postal address once the client approves one. */
    address: null as string | null,
  },
  social: [
    { label: "WhatsApp", href: "https://wa.me/16827938815" },
    { label: "Discord", href: "https://discord.com/users/1323213896240205845" },
    { label: "TikTok", href: "https://www.tiktok.com/@devereux_digital_hub" },
    { label: "Facebook", href: "https://www.facebook.com/share/1M8XFMZTkR/?mibextid=wwXIfr" },
    { label: "LinkedIn", href: clean(process.env.NEXT_PUBLIC_LINKEDIN_URL) },
    { label: "Instagram", href: clean(process.env.NEXT_PUBLIC_INSTAGRAM_URL) },
    { label: "X", href: clean(process.env.NEXT_PUBLIC_X_URL) },
    { label: "Behance", href: clean(process.env.NEXT_PUBLIC_BEHANCE_URL) },
  ].filter((s): s is { label: string; href: string } => Boolean(s.href)),
} as const;

export interface NavItem {
  label: string;
  href: string;
}

/** Primary navigation (client reference: Home, Services, About Us, Contact — Work added per PRD §6). */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export const ctaLabels = {
  startProject: "Start a Project",
  discuss: "Let’s Discuss Your Project",
  talk: "Let’s Talk",
  explore: "Explore Our Services",
} as const;
