import type { Service } from "./types";

/**
 * Service catalogue (PRD §9 to 10).
 *
 * Content status:
 *  - 01 Web Design & Development: problems, deliverables and process come from the client reference screenshots.
 *  - 02 to 07: DRAFT copy written for review. Capabilities must be confirmed by the client before launch (PRD §21 Q2).
 *  - 08 Coming Soon: intentionally non-routable until the client confirms intended behaviour (PRD §21 Q3).
 *
 * No prices, client names, metrics or timelines are stated here.
 */
export const services: Service[] = [
  {
    slug: "web-design-development",
    number: "01",
    title: "Web Design & Development",
    shortTitle: "Web Design",
    shortDescription:
      "Fast, responsive websites that look credible and make it easy for visitors to get in touch.",
    heroHeadline: "Websites built to earn trust and start conversations.",
    heroDescription:
      "We design and develop responsive websites for businesses that need a professional online presence, from a focused landing page to a full multi-page build.",
    intro:
      "A website is often the first place a potential customer decides whether to trust you. We design for clarity first: what you do, who it is for and what to do next. Then we build it to load quickly and work properly on every screen size.",
    ctaHeading: "Ready to build your website?",
    art: "web",
    problems: [
      {
        title: "Outdated websites that do not convert",
        description:
          "Visitors arrive, can’t find what they need, and leave. A clearer structure and message gives them a reason to act.",
      },
      {
        title: "Poor mobile experiences",
        description:
          "Many visitors browse on phones. Layouts, tap targets and type are designed for small screens from the start, not squeezed down later.",
      },
      {
        title: "Slow-loading pages",
        description:
          "Heavy images and bloated code cost you visitors. We treat speed as part of the design brief.",
      },
      {
        title: "No professional online presence",
        description:
          "If your business is hard to find or looks unfinished online, trust suffers before the conversation even starts.",
      },
    ],
    deliverables: [
      { title: "Business website development", description: "Multi-page sites that explain your services and make contact simple." },
      { title: "E-commerce websites", description: "Online stores built around how your customers browse and buy." },
      { title: "Landing pages", description: "Single-purpose pages for a campaign, launch or specific offer." },
      { title: "Website redesign", description: "A fresh structure, design and codebase for a site that has outgrown itself." },
      { title: "Mobile-responsive design", description: "Layouts composed for phone, tablet and desktop, each intentionally." },
      { title: "Website optimization", description: "Performance, accessibility and on-page improvements for an existing site." },
    ],
    processSteps: [
      { title: "Discovery & requirements", description: "We learn your goals, audience and constraints, and agree what the site needs to do." },
      { title: "Planning & design", description: "Site structure, wireframes and visual design, reviewed with you before build." },
      { title: "Development", description: "Clean, maintainable code with the approved design brought to life across devices." },
      { title: "Testing & optimization", description: "Cross-device checks, speed and accessibility review, and fixes before launch." },
      { title: "Launch & handover", description: "Go-live support, plus the access and documentation you need to run the site." },
    ],
    benefits: [
      { title: "Clear first impression", description: "Structured messaging and navigation so visitors understand your offer quickly." },
      { title: "Built to perform", description: "Speed, responsive layouts and accessibility are checked as part of testing, not added afterwards." },
      { title: "Ready to grow", description: "Component-based builds and handover documentation make later changes straightforward." },
    ],
    pricingMode: "quote",
    pricingFactors: [
      "Number and type of pages or templates",
      "Custom design and interaction requirements",
      "Content, photography and copywriting needs",
      "Integrations such as booking, CRM or payments",
      "Ongoing support after launch",
    ],
    packages: [],
    seoTitle: "Web Design & Development",
    seoDescription:
      "Responsive business websites, landing pages, redesigns and e-commerce builds from Devereux Digitals, designed for clarity and built for speed.",
    status: "published",
    sortOrder: 1,
  },
  {
    slug: "digital-marketing",
    number: "02",
    title: "Digital & Sales Marketing",
    shortTitle: "Digital & Sales",
    shortDescription:
      "Strategy, content and channel management that connect your marketing to your business goals.",
    heroHeadline: "A marketing plan you can follow and measure.",
    heroDescription:
      "We build the strategy, plan the content and manage the channels, then report in plain language on what is and isn’t working.",
    intro:
      "Marketing works best when every post, page and campaign has a reason to exist. We start by agreeing what your business needs from marketing, choose the channels that fit, and keep the reporting tied to those goals rather than to vanity numbers.",
    art: "marketing",
    problems: [
      { title: "Activity without a strategy", description: "Posting and promoting without a clear goal makes it hard to know what is working." },
      { title: "Content with no plan behind it", description: "Ideas arrive in bursts, then stall. A content calendar keeps output steady and on-message." },
      { title: "Visibility without the right audience", description: "Being seen is not the same as being found by people who might hire you." },
      { title: "Reports that don’t answer the real question", description: "Dashboards full of metrics that never link back to enquiries or business goals." },
    ],
    deliverables: [
      { title: "Marketing strategy", description: "Goals, audiences, positioning and channel priorities in one working document." },
      { title: "Content planning", description: "Themes, formats and a calendar that keeps your message consistent." },
      { title: "Channel management", description: "Day-to-day publishing and community management on the channels we agree." },
      { title: "Search visibility groundwork", description: "On-page and technical foundations so the right people can find you." },
      { title: "Campaign planning", description: "Launch and seasonal campaigns planned with clear objectives and checkpoints." },
      { title: "Performance reporting", description: "Regular summaries in plain language, tied to your stated goals." },
    ],
    processSteps: [
      { title: "Audit & goals", description: "Review what exists today and agree what marketing needs to achieve." },
      { title: "Strategy & channel plan", description: "Choose audiences, messages and channels, and set how success is judged." },
      { title: "Content & campaign production", description: "Create the content and assets the plan calls for, with your review." },
      { title: "Publishing & management", description: "Schedule, publish and respond across the agreed channels." },
      { title: "Reporting & refinement", description: "Review results together and adjust the plan for the next period." },
    ],
    benefits: [
      { title: "Purpose behind every piece", description: "Each activity maps back to a goal set during the audit." },
      { title: "Consistent presence", description: "A content plan keeps your brand visible without last-minute scrambling." },
      { title: "Reporting you can read", description: "Summaries explain what happened and what we recommend next." },
    ],
    pricingMode: "quote",
    pricingFactors: [
      "Channels and posting frequency",
      "Volume and format of content",
      "Strategy depth and reporting cadence",
      "Whether campaigns are included",
    ],
    packages: [],
    seoTitle: "Digital & Sales Marketing",
    seoDescription:
      "Digital marketing strategy, content planning, channel management and reporting from Devereux Digitals, built around your business goals.",
    status: "published",
    sortOrder: 2,
  },
  {
    slug: "paid-advertising",
    number: "03",
    title: "Paid Advertising",
    shortTitle: "Paid Advertising",
    shortDescription:
      "Structured campaigns, tested creative and clear reporting so every part of your budget has a job.",
    heroHeadline: "Paid campaigns with structure behind every budget decision.",
    heroDescription:
      "We set up, test and optimize paid campaigns, then report on spend and results without the jargon.",
    intro:
      "Paid advertising rewards discipline: clear objectives, clean tracking and steady testing. We build campaigns around the outcome you actually want, keep you in control of budget, and share what we learn as the campaigns run.",
    art: "ads",
    problems: [
      { title: "Spend without a clear structure", description: "Campaigns grow messy and it becomes hard to see where the budget is going." },
      { title: "Clicks that don’t turn into enquiries", description: "Traffic that doesn’t match your offer wastes budget. Targeting and landing pages need to agree." },
      { title: "Creative that goes stale", description: "Ads lose impact over time and need a steady rhythm of fresh variations to test." },
      { title: "Tracking gaps", description: "If conversions aren’t measured properly, optimization is guesswork." },
    ],
    deliverables: [
      { title: "Campaign structure & setup", description: "Accounts, campaigns and audiences organized so performance is easy to read." },
      { title: "Audience & keyword research", description: "Who to reach and what they search for, based on your offer." },
      { title: "Ad creative & copy", description: "Messages and visuals adapted to each placement and format." },
      { title: "Conversion tracking", description: "Measurement set up before launch so results can be trusted." },
      { title: "Testing & optimization", description: "Structured tests of audiences, creative and bids, with changes documented." },
      { title: "Spend & performance reporting", description: "Regular reporting on budget, results and recommended next steps." },
    ],
    processSteps: [
      { title: "Goals & budget", description: "Agree the outcome you want, the budget available and how results will be judged." },
      { title: "Account & tracking setup", description: "Configure accounts, audiences and conversion measurement." },
      { title: "Creative & launch", description: "Produce ad creative with your approval, then launch with a clear test plan." },
      { title: "Test & optimize", description: "Review early results, pause what isn’t working and scale what is." },
      { title: "Report & plan next", description: "Share results and agree the next period’s priorities." },
    ],
    benefits: [
      { title: "Budget stays visible", description: "Campaign structure and reporting show where spend goes." },
      { title: "Decisions backed by tests", description: "Changes are based on what the campaigns show, with notes on why." },
      { title: "Message and page agree", description: "Ads and landing pages are planned together so the click makes sense." },
    ],
    pricingMode: "quote",
    pricingFactors: [
      "Platforms and number of campaigns",
      "Creative production volume",
      "Reporting frequency",
      "Whether landing pages are needed",
    ],
    packages: [],
    seoTitle: "Paid Advertising",
    seoDescription:
      "Paid advertising campaign setup, creative testing, optimization and reporting from Devereux Digitals, structured around your goals and budget.",
    status: "published",
    sortOrder: 3,
  },
  {
    slug: "ecommerce-solutions",
    number: "04",
    title: "E-commerce Solutions",
    shortTitle: "E-commerce",
    shortDescription:
      "Online stores designed around how customers browse, choose and check out.",
    heroHeadline: "Online stores that make buying feel straightforward.",
    heroDescription:
      "From catalogue structure to checkout, we design and build stores that present products clearly and fit the way you run your business.",
    intro:
      "Selling online is a chain of small decisions: finding the product, trusting the page, completing checkout. We look at each link in that chain, build the store around it, and connect it to the tools you already use to run orders.",
    art: "ecommerce",
    problems: [
      { title: "Products that are hard to find", description: "Catalogue structure, filtering and search that don’t match how customers think." },
      { title: "Friction at checkout", description: "Extra steps, unclear costs or confusing forms push buyers away at the last moment." },
      { title: "Stores that don’t fit operations", description: "Stock, shipping and payment tools that don’t connect create daily manual work." },
      { title: "Product pages that don’t sell", description: "Thin descriptions and weak imagery leave shoppers with unanswered questions." },
    ],
    deliverables: [
      { title: "Store setup & design", description: "A branded storefront configured on the platform that suits your catalogue." },
      { title: "Product page design", description: "Layouts that present imagery, details and options clearly." },
      { title: "Catalogue structure", description: "Categories, collections and navigation organized around customer intent." },
      { title: "Integrations", description: "Connect payments, shipping, inventory and other tools you use." },
      { title: "Conversion improvements", description: "Checkout and product-page refinements for an existing store." },
      { title: "Launch support", description: "Testing orders end to end and guiding your team through day-one operations." },
    ],
    processSteps: [
      { title: "Requirements & catalogue review", description: "Understand your products, customers and the tools your team uses." },
      { title: "UX & store design", description: "Plan the shopping journey and design key templates for review." },
      { title: "Build & integrate", description: "Build the store and connect payments, shipping and other systems." },
      { title: "Test checkout & operations", description: "Run test orders, check emails and confirm the back-office flow works." },
      { title: "Launch & improve", description: "Go live, then review how customers use the store and refine it." },
    ],
    benefits: [
      { title: "Easier browsing", description: "Structure and filtering built around how your customers look for products." },
      { title: "Smoother checkout", description: "Fewer steps and clearer information at the point of purchase." },
      { title: "Fits how you work", description: "Integrations planned up front so daily operations don’t become manual." },
    ],
    pricingMode: "quote",
    pricingFactors: [
      "Number of products and variants",
      "Platform choice and custom features",
      "Integrations with payments, shipping or stock systems",
      "Data migration from an existing store",
    ],
    packages: [],
    seoTitle: "E-commerce Solutions",
    seoDescription:
      "E-commerce store design and build from Devereux Digitals: catalogue structure, product pages, checkout experience and integrations.",
    status: "published",
    sortOrder: 4,
  },
  {
    slug: "video-content",
    number: "05",
    title: "Video & Content",
    shortTitle: "Video & Content",
    shortDescription:
      "Video, short-form clips and creative assets that tell your story consistently across channels.",
    heroHeadline: "Video and content that tell your story consistently.",
    heroDescription:
      "We plan, produce and edit video and creative content that fits your brand and the platforms where your audience spends time.",
    intro:
      "Good content starts with a clear idea of who it is for and where it will be seen. We shape the concept, plan the production, and deliver edits in the formats each channel needs, so one shoot works harder.",
    art: "video",
    problems: [
      { title: "A brand story told inconsistently", description: "Different tones and visuals across channels make a business harder to remember." },
      { title: "No time to produce content", description: "Content slips down the priority list when day-to-day work takes over." },
      { title: "One format forced onto every platform", description: "A video that suits your website rarely works unchanged in a short-form feed." },
      { title: "Production quality that undercuts the brand", description: "Poor audio, lighting or editing can weaken an otherwise strong message." },
    ],
    deliverables: [
      { title: "Video production", description: "Concept, planning and filming for brand, product or explainer videos." },
      { title: "Editing & post-production", description: "Cutting, colour, sound and graphics to a consistent finish." },
      { title: "Short-form social video", description: "Vertical and square cut-downs designed for feeds." },
      { title: "Content planning & scripting", description: "Ideas, scripts and shot lists agreed before cameras roll." },
      { title: "Creative assets", description: "Thumbnails, titles and supporting graphics for each piece." },
      { title: "Multi-format delivery", description: "Exports sized for the channels you publish on." },
    ],
    processSteps: [
      { title: "Brief & concept", description: "Agree the audience, goal and creative direction." },
      { title: "Script & planning", description: "Write scripts, plan locations and organize what is needed for the shoot." },
      { title: "Production", description: "Film or assemble the material, with you reviewing as we go." },
      { title: "Edit & review", description: "Cut together the first version, gather feedback and refine." },
      { title: "Deliver & adapt", description: "Export final files and versions for each channel." },
    ],
    benefits: [
      { title: "A consistent look", description: "Shared style and templates keep content recognizably yours." },
      { title: "More from each shoot", description: "Planning for multiple formats up front produces more usable content." },
      { title: "Clear review points", description: "Defined feedback stages prevent endless revision loops." },
    ],
    pricingMode: "quote",
    pricingFactors: [
      "Length and number of videos",
      "Shoot days, locations and crew",
      "Motion graphics and post-production needs",
      "Number of delivery formats",
    ],
    packages: [],
    seoTitle: "Video & Content",
    seoDescription:
      "Video production, editing, short-form content and creative assets from Devereux Digitals, planned for your brand and your channels.",
    status: "published",
    sortOrder: 5,
  },
  {
    slug: "ai-business-solutions",
    number: "06",
    title: "AI & Business Solutions",
    shortTitle: "AI & Business",
    shortDescription:
      "Practical automation and tooling that removes repetitive work from the way your team operates.",
    heroHeadline: "Practical automation for the work that slows your team down.",
    heroDescription:
      "We look at how work really flows through your business, then build small, useful tools and automations where they genuinely help.",
    intro:
      "Not every problem needs AI, and the useful applications are usually specific. We start by mapping a real workflow, identify where automation or an AI-assisted step would save effort, and prototype it before anything is rolled out to your team.",
    art: "ai",
    problems: [
      { title: "Repetitive manual work", description: "Copying data between tools, sorting enquiries or preparing routine documents eats into the day." },
      { title: "Tools that don’t talk to each other", description: "Information lives in separate systems and gets re-entered by hand." },
      { title: "Unclear where AI actually helps", description: "It is hard to separate genuine opportunities from hype without looking at a real process." },
      { title: "Prototypes that never reach daily use", description: "Experiments stall when they aren’t connected to how the team works." },
    ],
    deliverables: [
      { title: "Process discovery", description: "Mapping a workflow to identify where effort is spent and what could change." },
      { title: "Workflow automation", description: "Automations that handle repetitive steps between your existing tools." },
      { title: "Tool integrations", description: "Connect the systems you already use so data moves without retyping." },
      { title: "Working prototypes", description: "Small, testable tools you can try with your own data before committing." },
      { title: "Handover & documentation", description: "Clear notes so your team understands what was built and how to use it." },
      { title: "Ongoing support", description: "Adjustments as your process changes." },
    ],
    processSteps: [
      { title: "Discover the workflow", description: "Observe how the work is done today and where time is lost." },
      { title: "Define scope", description: "Choose one clear problem and agree what success looks like." },
      { title: "Prototype", description: "Build a working version quickly so it can be tested for real." },
      { title: "Integrate & test", description: "Connect it to your tools and check it behaves with realistic cases." },
      { title: "Hand over", description: "Train your team and document how it works and its limits." },
    ],
    benefits: [
      { title: "Grounded in a real process", description: "Every solution starts from how your team actually works." },
      { title: "Honest about limits", description: "We explain what a tool can and can’t reliably do before you depend on it." },
      { title: "Small steps first", description: "A focused prototype shows value before wider rollout." },
    ],
    pricingMode: "quote",
    pricingFactors: [
      "Number of workflows and systems involved",
      "Complexity of integrations",
      "Data sensitivity and security requirements",
      "Ongoing support needs",
    ],
    packages: [],
    seoTitle: "AI & Business Solutions",
    seoDescription:
      "Process discovery, workflow automation, integrations and prototypes from Devereux Digitals. Practical AI and business tooling for real workflows.",
    status: "published",
    sortOrder: 6,
  },
  {
    slug: "branding-creative-design",
    number: "07",
    title: "Branding & Creative Design",
    shortTitle: "Branding",
    shortDescription:
      "Identity systems, guidelines and campaign creative that make your business recognizable.",
    heroHeadline: "Identity and creative that make your business recognizable.",
    heroDescription:
      "We define how your brand looks, sounds and behaves, then give you the guidelines and assets to use it consistently.",
    intro:
      "A brand is more than a logo. It is the combined impression of your name, visuals, voice and the way you show up everywhere. We work from positioning outwards, so the identity we design has a clear reason for every choice.",
    art: "branding",
    problems: [
      { title: "A brand that looks different everywhere", description: "Mismatched logos, colours and tone make a business feel less established." },
      { title: "Unclear positioning", description: "If it is hard to say what makes you different, it is hard for customers to remember you." },
      { title: "An identity you’ve outgrown", description: "The look that suited your start no longer reflects where the business is going." },
      { title: "Materials with no system behind them", description: "Every new document or campaign starts from scratch, wasting time and weakening consistency." },
    ],
    deliverables: [
      { title: "Brand strategy & positioning", description: "Who you are for, what you stand for and how you describe it." },
      { title: "Logo & visual identity", description: "Logo, colour, typography and supporting graphic language." },
      { title: "Brand guidelines", description: "A practical document showing how to apply the identity correctly." },
      { title: "Campaign creative", description: "Concepts and artwork for launches and promotions." },
      { title: "Collateral & templates", description: "Stationery, presentations and social templates your team can reuse." },
      { title: "Digital brand assets", description: "Files prepared for web, social and print use." },
    ],
    processSteps: [
      { title: "Discovery & positioning", description: "Workshop your audience, competitors and ambitions to define the brand’s role." },
      { title: "Concept exploration", description: "Present distinct creative directions for discussion." },
      { title: "Identity development", description: "Refine the chosen direction into a complete visual identity." },
      { title: "Guidelines & systems", description: "Document rules, assets and templates so the brand can be applied consistently." },
      { title: "Rollout", description: "Support the first applications across your channels." },
    ],
    benefits: [
      { title: "Reasoned design", description: "Each visual decision traces back to the positioning." },
      { title: "Easier to apply", description: "Guidelines and templates make consistency a habit, not an effort." },
      { title: "Ready for every channel", description: "Assets prepared for the places your brand will actually appear." },
    ],
    pricingMode: "quote",
    pricingFactors: [
      "Scope of the identity (logo only to full system)",
      "Depth of strategy work",
      "Number of applications and templates",
      "Rollout support needed",
    ],
    packages: [],
    seoTitle: "Branding & Creative Design",
    seoDescription:
      "Brand strategy, visual identity, guidelines and campaign creative from Devereux Digitals, built to make your business recognizable.",
    status: "published",
    sortOrder: 7,
  },
  {
    slug: "coming-soon",
    number: "08",
    title: "Coming Soon",
    shortTitle: "Coming Soon",
    shortDescription: "A new service is on the way. Details will be added once it is ready to offer.",
    heroHeadline: "Coming soon.",
    heroDescription: "",
    intro: "",
    art: "web",
    problems: [],
    deliverables: [],
    processSteps: [],
    benefits: [],
    pricingMode: "hidden",
    pricingFactors: [],
    packages: [],
    seoTitle: "Coming Soon",
    seoDescription: "A new Devereux Digitals service is coming soon.",
    status: "coming-soon",
    sortOrder: 8,
  },
];

export const publishedServices = services.filter((s) => s.status === "published");
export const comingSoonServices = services.filter((s) => s.status === "coming-soon");

export function getService(slug: string): Service | undefined {
  return publishedServices.find((s) => s.slug === slug);
}

export function getAdjacentServices(slug: string): { prev: Service; next: Service } {
  const i = publishedServices.findIndex((s) => s.slug === slug);
  const prev = publishedServices[(i - 1 + publishedServices.length) % publishedServices.length]!;
  const next = publishedServices[(i + 1) % publishedServices.length]!;
  return { prev, next };
}
