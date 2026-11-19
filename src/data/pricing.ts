/**
 * Service pricing, from the client document "Devereux Digitals Pricing.pdf"
 * (Changes, Services and Reviews). All prices are USD starting estimates.
 */

export interface MonthlyPackage {
  name: "Starter" | "Growth" | "Professional";
  price: number;
  features: string[];
}

export interface ServicePricing {
  starting: { price: number; label: string; description: string };
  scopeNote: string;
  monthly: MonthlyPackage[];
  custom: string[];
  addOns: string[];
  /** Third-party / ad-spend costs kept separate (requirement 10) */
  separateCosts?: string;
}

export const pricing: Record<string, ServicePricing> = {
  "web-design-development": {
    starting: {
      price: 199,
      label: "Landing Page",
      description: "A professionally designed, responsive single-page website with essential sections and contact functionality.",
    },
    scopeNote: "Final pricing depends on the number of pages, custom functionality, integrations and design complexity.",
    monthly: [
      { name: "Starter", price: 29, features: ["Website maintenance", "Security and software updates", "Monthly technical checks", "Basic support"] },
      { name: "Growth", price: 59, features: ["Everything in Starter", "Minor content and image updates", "Performance monitoring", "Priority support"] },
      { name: "Professional", price: 99, features: ["Everything in Growth", "Regular website improvements", "Additional content and section updates", "Dedicated technical support"] },
    ],
    custom: [
      "Need a multi-page business website, advanced platform, booking system or custom web application?",
      "Tell us what you're building and we'll prepare a solution around your requirements.",
    ],
    addOns: ["Extra pages", "SEO setup", "Copywriting", "Booking integration", "Live chat", "Speed optimization"],
  },
  "digital-marketing": {
    starting: {
      price: 99,
      label: "Marketing Strategy",
      description: "An initial marketing assessment and a tailored strategy with actionable recommendations.",
    },
    scopeNote: "Final pricing depends on platforms, campaign requirements, content volume and business goals.",
    monthly: [
      { name: "Starter", price: 99, features: ["8 content posts", "Management of 1 platform", "Basic content planning", "Monthly performance summary"] },
      { name: "Growth", price: 199, features: ["12-16 content pieces", "Management of up to 2 platforms", "Content strategy and scheduling", "Audience engagement", "Performance reporting"] },
      { name: "Professional", price: 349, features: ["Up to 20 content pieces", "Management of up to 3 platforms", "Advanced content strategy", "Community management", "Performance analysis and reporting"] },
    ],
    custom: [
      "Looking for a complete marketing strategy, lead generation system or multi-platform growth campaign?",
      "We'll develop a tailored marketing solution around your business objectives.",
    ],
    addOns: ["Additional platforms", "Promotional videos", "Email marketing", "Extra content", "Lead generation campaigns"],
  },
  "paid-advertising": {
    starting: {
      price: 149,
      label: "Campaign Setup",
      description: "Initial campaign configuration, audience targeting and advertising setup for one platform.",
    },
    scopeNote: "Final pricing depends on advertising platforms, campaign complexity and management requirements.",
    monthly: [
      { name: "Starter", price: 149, features: ["Management of 1 advertising platform", "Campaign monitoring", "Basic audience targeting", "Monthly performance report"] },
      { name: "Growth", price: 249, features: ["Management of up to 2 platforms", "Campaign optimization", "Audience testing", "Performance analysis", "Monthly reporting"] },
      { name: "Professional", price: 399, features: ["Management of up to 3 platforms", "Multiple campaign management", "Advanced audience testing", "Ongoing optimization", "Conversion tracking support", "Detailed reporting"] },
    ],
    custom: [
      "Need a larger advertising strategy, multiple campaigns or a complete paid acquisition system?",
      "We'll create a campaign management solution suited to your goals.",
    ],
    addOns: ["Ad creatives", "Landing pages", "Retargeting setup", "Conversion tracking", "A/B testing"],
    separateCosts: "Advertising spend is separate from management fees.",
  },
  "ecommerce-solutions": {
    starting: {
      price: 249,
      label: "Basic Online Store",
      description: "A professionally designed store with essential shopping functionality and initial product setup.",
    },
    scopeNote: "Final pricing depends on product quantity, integrations, payment systems and customization.",
    monthly: [
      { name: "Starter", price: 49, features: ["Basic store maintenance", "Technical checks", "Minor product updates", "Basic support"] },
      { name: "Growth", price: 99, features: ["Everything in Starter", "Product and collection updates", "Store performance monitoring", "Minor design improvements", "Priority support"] },
      { name: "Professional", price: 199, features: ["Everything in Growth", "Ongoing store improvements", "Regular product management", "Conversion optimization recommendations", "Monthly performance report"] },
    ],
    custom: [
      "Need a large online store, marketplace, subscription platform or custom e-commerce system?",
      "We'll build a solution around your products, operations and business goals.",
    ],
    addOns: ["Additional product uploads", "Payment integration", "Shipping integration", "Email automation", "Inventory management"],
  },
  "video-content": {
    starting: {
      price: 15,
      label: "Short-Form Video",
      description: "Professional editing for one short-form video using client-provided footage.",
    },
    scopeNote: "Final pricing depends on video duration, editing complexity, motion graphics and storytelling requirements.",
    monthly: [
      { name: "Starter", price: 99, features: ["4 short-form videos", "Basic cuts and transitions", "Captions and subtitles", "Background music and sound effects"] },
      { name: "Growth", price: 199, features: ["8 short-form videos", "Advanced editing", "Motion graphics", "Captions and sound design", "Priority delivery"] },
      { name: "Professional", price: 399, features: ["12 short-form videos", "Advanced storytelling", "Premium motion graphics", "Enhanced sound design", "Priority support"] },
    ],
    custom: [
      "Need long-form YouTube editing, documentaries, promotional videos or complete content production?",
      "We'll create a package around your content requirements.",
    ],
    addOns: ["YouTube thumbnails", "Subtitles", "Advanced motion graphics", "Color grading", "Additional videos", "Custom intros and outros"],
  },
  "ai-business-solutions": {
    starting: {
      price: 149,
      label: "Basic Workflow Automation",
      description: "One simple business workflow automation based on supported tools and integrations.",
    },
    scopeNote: "Final pricing depends on workflow complexity, integrations, AI requirements and system architecture.",
    monthly: [
      { name: "Starter", price: 49, features: ["Basic automation monitoring", "Routine system checks", "Basic troubleshooting", "Technical support"] },
      { name: "Growth", price: 99, features: ["Everything in Starter", "Workflow optimization", "Minor automation adjustments", "Regular performance checks", "Priority support"] },
      { name: "Professional", price: 199, features: ["Everything in Growth", "Advanced workflow monitoring", "Ongoing AI system optimization", "Additional workflow improvements", "Dedicated technical support"] },
    ],
    custom: [
      "Need AI agents, intelligent assistants, advanced business automation or custom AI-powered systems?",
      "We'll design a solution around your business processes and requirements.",
    ],
    addOns: ["CRM integration", "AI chatbot customization", "Lead automation", "Email automation", "API integrations", "AI voice assistants"],
    separateCosts: "Third-party subscriptions, API usage and hosting costs are separate.",
  },
  "branding-creative-design": {
    starting: {
      price: 49,
      label: "Logo Design",
      description: "A professionally designed logo concept with agreed deliverables.",
    },
    scopeNote: "Final pricing depends on design complexity, variations, brand requirements and additional deliverables.",
    monthly: [
      { name: "Starter", price: 99, features: ["8 graphic designs", "Social media creative assets", "Consistent brand styling", "Basic revisions"] },
      { name: "Growth", price: 199, features: ["16 graphic designs", "Promotional and marketing graphics", "Social media creative assets", "Brand consistency", "Priority revisions"] },
      { name: "Professional", price: 349, features: ["25 graphic designs", "Advanced promotional creatives", "Campaign design assets", "Marketing and social media graphics", "Priority delivery"] },
    ],
    custom: [
      "Need a complete brand identity, creative direction, large-scale campaign or specialized design project?",
      "We'll develop a creative solution around your brand vision.",
    ],
    addOns: ["Logo variations", "Brand guidelines", "Business cards", "Social media banners", "Flyers", "Additional graphic designs"],
  },
};

export function getPricing(slug: string): ServicePricing | undefined {
  return pricing[slug];
}
