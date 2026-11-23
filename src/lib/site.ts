/**
 * Global site configuration.
 *
 * Anything the client has not yet approved is read from environment variables and is
 * `null` when absent, components omit empty values instead of inventing contact details.
 * See `.env.example` and the README content checklist.
 */

const clean = (value: string | undefined): string | null => {
  const v = value?.trim();
  return v ? v : null;
};

export const site = {
  name: "Devereux Digitals",
  /** Confirm legal entity name + brand capitalisation with the client (PRD §18). */
  legalName: "Devereux Digitals" as string | null,
  tagline: "A Digital Solutions Agency for Businesses, Brands & Creators.",
  description:
    "Devereux Digitals delivers web design, digital marketing, AI automation, branding and video production for businesses, brands, entrepreneurs and creators.",
  /** Production domain for canonicals, sitemap, robots, social and structured data. Deliberately not host-derived. */
  url: "https://devereuxdigitals.com",
  locale: "en",
  contact: {
    email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL) ?? "contact@devereuxdigitals.com",
    phone: clean(process.env.NEXT_PUBLIC_CONTACT_PHONE) ?? "+1 716 363 9707",
    whatsapp: clean(process.env.NEXT_PUBLIC_WHATSAPP_URL) ?? "https://wa.me/16827938815",
    discord: clean(process.env.NEXT_PUBLIC_DISCORD_URL) ?? "https://discord.com/users/1323213896240205845",
    /** Only publish a postal address once the client approves one. */
    address: "347 5th Ave, Suite 1402, New York, NY 10016, USA" as string | null,
  },
  social: [
    { label: "Facebook", href: clean(process.env.NEXT_PUBLIC_FACEBOOK_URL) ?? "https://www.facebook.com/share/1M8XFMZTkR/?mibextid=wwXIfr" },
    { label: "TikTok", href: clean(process.env.NEXT_PUBLIC_TIKTOK_URL) ?? "https://www.tiktok.com/@devereux_digital_hub" },
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

/** Primary navigation (client reference: Home, Services, About Us, Contact, Work added per PRD §6). */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Insights & Guides", href: "/insights" },
  { label: "About Us", href: "/about" },
  { label: "Talk to us", href: "/contact" },
];

export const legalNav: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export const ctaLabels = {
  startProject: "Start Your Project",
  discuss: "Let’s Discuss Your Project",
  talk: "Let’s Talk",
  explore: "Explore Our Services",
} as const;
