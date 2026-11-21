import type { tools } from "./tools";

/**
 * CASE STUDIES: full write ups shown on /work/[slug].
 *
 * Facts rule: everything here is taken from the live website itself (copy, published figures,
 * and the stack detected from its served scripts and response headers on 21 Nov 2026).
 * Figures marked `source` are the brand's own published numbers, not agency claimed results.
 * Timelines, scope boundaries and private KPIs are deliberately omitted until the client confirms them.
 */

export type ToolKey = keyof typeof tools;

export interface CaseStudy {
  /** Small uppercase badge on cards and the hero (WEBSITE, ECOMMERCE, AI AUTOMATION). */
  badge: string;
  /** Mono tag line on the card, e.g. "NEXT.JS · REACT · RAILWAY". */
  tags: string[];
  liveUrl: string;
  /** Domain shown in the browser frame. */
  domain: string;
  facts: { label: string; value: string }[];
  client: string;
  challenges: string[];
  /** The single thing that sets this product apart, paired with the image that shows it. */
  edge: { title: string; body: string; image: number };
  delivered: string[];
  stack: ToolKey[];
  resultTitle: string;
  results: string[];
  /** Published figures shown as stat tiles. */
  stats: { value: string; label: string }[];
  statsSource: string;
  /** Asset folder under /public/work/case-studies/<slug>/ */
  shots: { file: string; alt: string; w: number; h: number }[];
  mobileShot: { file: string; alt: string; w: number; h: number };
  video: { file: string; poster: string; label: string };
}

const D = { w: 1920, h: 1200 };
const M = { w: 780, h: 1688 };
const shots = (alts: string[]) => alts.map((alt, i) => ({ file: `still-${i + 1}.jpg`, alt, ...D }));
const media = (slug: string, label: string) => ({ file: `/work/case-studies/${slug}/walkthrough.mp4`, poster: `/work/case-studies/${slug}/poster.jpg`, label });

export const caseStudies: Record<string, CaseStudy> = {
  reloop: {
    badge: "Website",
    tags: ["Next.js", "React", "Railway"],
    liveUrl: "https://reloop.so/",
    domain: "reloop.so",
    facts: [
      { label: "Service", value: "Website design & development" },
      { label: "Industry", value: "AI marketing SaaS" },
      { label: "Platform", value: "Next.js on Railway" },
      { label: "Audience", value: "Founders & small teams" },
    ],
    client:
      "Reloop is an AI Chief Marketing Officer. A business pastes its website link and Reloop studies the brand and its competitors, builds a marketing plan, then helps create, edit and schedule the content to follow it.",
    challenges: [
      "Explain a product that does four jobs (plan, create, distribute, improve) without overwhelming a first time visitor.",
      "Make an AI product feel concrete by showing real outputs, not abstract promises.",
      "Get visitors to try it in one step: a website link in, a plan out.",
      "Keep a rich, animated page fast and readable on phones.",
    ],
    edge: {
      title: "One loop instead of five tools",
      body: "Most marketing tools cover a single step. Reloop’s page is built around one connected workflow, Plan & Spy, Create, Distribute and Improve, so visitors see the whole loop, with a live style score, brand kit and competitor radar, before they sign up.",
      image: 4,
    },
    delivered: [
      "Conversion focused landing page with a URL first hero",
      "Scroll driven four step workflow section with product previews",
      "Brand intelligence, content calendar and improvement mockups",
      "Pricing, affiliates, resources and community navigation",
      "Responsive layouts tuned for mobile",
      "Analytics and chat support wired in",
    ],
    stack: ["nextjs", "react", "railway", "gtm", "crisp"],
    resultTitle: "What changed for Reloop.",
    results: [
      "A single input hero that turns a visitor’s website link into a first step",
      "The full product story told in one scroll, from plan to results",
      "A free start (400 credits, no card) placed at every decision point",
      "A modern, fast stack that is easy to extend as features ship",
    ],
    stats: [
      { value: "2,834+", label: "professionals using Reloop" },
      { value: "400", label: "free credits to start" },
      { value: "4", label: "step workflow in one product" },
    ],
    statsSource: "Figures as published on reloop.so",
    shots: shots(["Reloop hero: Your Marketing on Autopilot", "Your marketing, in one loop", "Plan & Spy: competitor radar and brand assets", "Distribute: the content calendar across channels"]),
    mobileShot: { file: "mobile.jpg", alt: "Reloop on a phone", ...M },
    video: media("reloop", "Walkthrough of the Reloop website"),
  },

  apparelnbags: {
    badge: "Ecommerce",
    tags: ["Next.js", "ASP.NET", "Cloudflare"],
    liveUrl: "https://www.apparelnbags.com/",
    domain: "apparelnbags.com",
    facts: [
      { label: "Service", value: "Ecommerce development" },
      { label: "Industry", value: "Promotional & wholesale apparel" },
      { label: "Platform", value: "Next.js + ASP.NET" },
      { label: "Model", value: "B2B and B2C store" },
    ],
    client:
      "ApparelnBags.com is a US business marketing company selling wholesale clothing, workwear uniforms, team apparel and logo printed promotional products, helping small to mid sized businesses build loyal customers and motivated teams.",
    challenges: [
      "A catalogue of 15,000+ promotional products and 250+ brands that has to stay easy to browse.",
      "Serve both bulk business buyers and individual shoppers from the same storefront.",
      "Keep category pages and search fast despite the size of the range.",
      "Surface trust, reviews and offers without cluttering the shopping flow.",
    ],
    edge: {
      title: "Built for a huge catalogue",
      body: "Where most promo stores bury products behind quote forms, ApparelnBags puts the whole range one tap away: a category mega menu, style and brand search, and shop by need tiles for uniforms, team wear, sustainable clothing and giveaways.",
      image: 2,
    },
    delivered: [
      "Next.js storefront in front of the existing ASP.NET commerce backend",
      "Category mega menu and search by style or brand",
      "Promotional hero carousel with coupon messaging",
      "Shop by need collections for uniforms, team wear and giveaways",
      "Reviews from ResellerRatings, Trustpilot and Facebook",
      "Cloudflare delivery and live chat support",
    ],
    stack: ["nextjs", "react", "dotnet", "cloudflare", "gtm", "tawkto"],
    resultTitle: "What changed for ApparelnBags.",
    results: [
      "A modern, fast front end without replacing the proven backend",
      "Clear routes into every major category from the first screen",
      "Offers and coupon codes visible where buying decisions happen",
      "Social proof placed next to the products it supports",
    ],
    stats: [
      { value: "15,000+", label: "promotional products" },
      { value: "250+", label: "brands in stock" },
      { value: "1", label: "storefront for B2B & B2C" },
    ],
    statsSource: "Figures as published on apparelnbags.com",
    shots: shots(["ApparelnBags home with promotional hero", "Promotional products, bags and wholesale clothing", "Customer reviews from trusted platforms", "Shop promotional apparel"]),
    mobileShot: { file: "mobile.jpg", alt: "ApparelnBags on a phone", ...M },
    video: media("apparelnbags", "Walkthrough of the ApparelnBags store"),
  },

  anhem: {
    badge: "Ecommerce",
    tags: ["Shopify", "Klaviyo", "CRO"],
    liveUrl: "https://www.anhem.tech/",
    domain: "anhem.tech",
    facts: [
      { label: "Service", value: "Shopify store & CRO" },
      { label: "Industry", value: "Apple Watch accessories" },
      { label: "Platform", value: "Shopify + Klaviyo" },
      { label: "Model", value: "Direct to consumer" },
    ],
    client:
      "Anhem makes Apple Watch bands, straps and AirTag accessories that are built to last: non toxic, PFA free and hypoallergenic, with a lifetime warranty and fast US shipping.",
    challenges: [
      "Stand out in a crowded category full of cheap, disposable bands.",
      "Make quality claims (PFA free, lifetime warranty) believable in seconds.",
      "Help shoppers pick a band by lifestyle, not by scrolling hundreds of SKUs.",
      "Lift average order value with a clear multi buy offer.",
    ],
    edge: {
      title: "Anhem vs Others, side by side",
      body: "Instead of generic “premium quality” copy, the store shows a direct comparison table against other brands: lifetime warranty, PFAS free, ships in 24 hours, free link resizing and eco conscious materials, ticked or crossed.",
      image: 4,
    },
    delivered: [
      "Shopify theme with a bold, offer led hero",
      "Shop by lifestyle collections: sport, luxury, comfortable, everyday",
      "Best seller grid with ratings, review counts and sale pricing",
      "Anhem vs Others comparison block",
      "Buy 2, get 1 free offer applied automatically at cart",
      "Klaviyo email capture and sign up incentives",
    ],
    stack: ["shopify", "klaviyo", "gtm"],
    resultTitle: "What changed for Anhem.",
    results: [
      "Quality claims proven on the page, not just stated",
      "A shorter path from landing to the right band",
      "Bundle offer with no code needed, so nothing blocks checkout",
      "Reviews and ratings visible on every product card",
    ],
    stats: [
      { value: "4.65/5", label: "average customer rating" },
      { value: "566", label: "reviews on the Flex Nylon Strap" },
      { value: "24 hrs", label: "dispatch, Mon to Fri" },
    ],
    statsSource: "Figures as published on anhem.tech",
    shots: shots(["Anhem home with the Buy 2, Get 1 Free offer", "Shop by lifestyle collections", "Best sellers with ratings and sale prices", "Anhem vs Others comparison"]),
    mobileShot: { file: "mobile.jpg", alt: "Anhem on a phone", ...M },
    video: media("anhem", "Walkthrough of the Anhem store"),
  },

  zinff: {
    badge: "Ecommerce",
    tags: ["OXID eShop", "jQuery", "Swiper"],
    liveUrl: "https://www.zinff.com/",
    domain: "zinff.com",
    facts: [
      { label: "Service", value: "Ecommerce store & growth" },
      { label: "Industry", value: "Prescription eyewear" },
      { label: "Platform", value: "OXID eShop" },
      { label: "Model", value: "Direct to consumer" },
    ],
    client:
      "Zinff Optical sells affordable prescription eyeglasses and sunglasses online, from $9, with lens options such as blue light blocking, photochromic and progressive lenses.",
    challenges: [
      "Sell a product that normally needs an optician visit, entirely online.",
      "Make very low prices feel trustworthy rather than cheap.",
      "Keep flash sales, coupons and new arrivals visible without slowing the page.",
      "Track paid traffic across Meta, TikTok and Pinterest accurately.",
    ],
    edge: {
      title: "Affordable glasses, everything in one step",
      body: "Zinff leads with price and reassurance together: a live flash sale countdown sits next to FSA/HSA acceptance, a 12 month warranty, 30 day exchange and free shipping, so a $9 frame feels like a safe buy.",
      image: 2,
    },
    delivered: [
      "Storefront with seasonal hero campaigns",
      "Flash sale section with live countdown and discount badges",
      "Shop by need: women’s, men’s, blue light, progressive, sunglasses",
      "Trust bar: FSA/HSA, warranty, exchange and free shipping",
      "Marketing pixels for Meta, TikTok and Pinterest via Tag Manager",
      "Live chat and multi currency, multi language support",
    ],
    stack: ["oxid", "jquery", "swiper", "gtm", "metapixel", "tiktokpixel", "pinterest", "livechat"],
    resultTitle: "What changed for Zinff.",
    results: [
      "Price led merchandising paired with clear guarantees",
      "Promotions that update without a redesign",
      "Full funnel tracking across every paid channel",
      "Shoppers routed to the right frame type from the home page",
    ],
    stats: [
      { value: "$9", label: "glasses starting price" },
      { value: "30 days", label: "exchange window" },
      { value: "12 mo", label: "warranty on frames" },
    ],
    statsSource: "Figures as published on zinff.com",
    shots: shots(["Zinff home with seasonal campaign", "Coupons and flash sale with live countdown", "Photochromic lenses, before and after", "Best sellers with sale pricing"]),
    mobileShot: { file: "mobile.jpg", alt: "Zinff on a phone", ...M },
    video: media("zinff", "Walkthrough of the Zinff store"),
  },

  "seamless-ai": {
    badge: "AI Automation",
    tags: ["Webflow", "Segment", "AI agents"],
    liveUrl: "https://seamless.ai/",
    domain: "seamless.ai",
    facts: [
      { label: "Service", value: "AI product website" },
      { label: "Industry", value: "B2B sales intelligence" },
      { label: "Platform", value: "Webflow" },
      { label: "Audience", value: "Sales & revenue teams" },
    ],
    client:
      "Seamless.AI is an AI lead generation and revenue platform. It finds verified B2B contacts, direct dials and emails, then automates outreach and books meetings with AI sales agents.",
    challenges: [
      "Present four products (Data Engine, Engagement Hub, AI Agents, Automation Network) as one platform.",
      "Prove data accuracy, the first objection every buyer raises.",
      "Turn a large audience into sign ups with almost no friction.",
      "Speak to every revenue role, from SDRs to RevOps.",
    ],
    edge: {
      title: "Accuracy backed by a guarantee",
      body: "Every data provider claims accuracy. Seamless backs it with 100% credit back protection: if an email is invalid, the credit is refunded automatically. The site makes that promise a full section, not a footnote.",
      image: 4,
    },
    delivered: [
      "Webflow marketing site with a sign up first hero",
      "Google and Microsoft one click sign up",
      "Interactive platform tabs for the four product areas",
      "Real time AI engine diagram with live data counters",
      "Credit back protection, security and integrations sections",
      "Segment analytics and Intercom support",
    ],
    stack: ["webflow", "gtm", "segment", "intercom"],
    resultTitle: "What changed for Seamless.AI.",
    results: [
      "One page that explains the whole platform, product by product",
      "The accuracy objection answered with a guarantee",
      "Sign up available from the very first screen",
      "Marketing can ship new pages in Webflow without developers",
    ],
    stats: [
      { value: "1.5M+", label: "sales leaders using Seamless" },
      { value: "4.4/5", label: "on G2 from 5,400+ reviews" },
      { value: "1.4B+", label: "verified business emails" },
    ],
    statsSource: "Figures as published on seamless.ai",
    shots: shots(["Seamless.AI hero: The World’s Best Go-To-Market Data", "Products across the Seamless platform", "Engagement Hub for multi channel outreach", "100% credit back protection"]),
    mobileShot: { file: "mobile.jpg", alt: "Seamless.AI on a phone", ...M },
    video: media("seamless-ai", "Walkthrough of the Seamless.AI website"),
  },

  "fin-ai": {
    badge: "AI Automation",
    tags: ["Next.js", "Sanity", "Vercel"],
    liveUrl: "https://fin.ai/",
    domain: "fin.ai",
    facts: [
      { label: "Service", value: "AI agent product website" },
      { label: "Industry", value: "AI customer service" },
      { label: "Platform", value: "Next.js + Sanity CMS" },
      { label: "Audience", value: "Support leaders" },
    ],
    client:
      "Fin is an AI customer service agent that resolves customer conversations across chat, email, voice, social and Slack. It trains on a company’s help center and content and connects to the tools a support team already uses.",
    challenges: [
      "Show what an AI agent actually does in a real conversation.",
      "Explain setup, configuration and optimisation simply.",
      "Back performance claims with a clear, single metric.",
      "Reassure enterprise buyers on trust, safety and integrations.",
    ],
    edge: {
      title: "Proof in the first screen",
      body: "Rather than a generic hero, Fin opens on a real support exchange: a customer moves house, uploads a bill and the agent updates the address end to end. The headline metric, a 76% average resolution rate, sits right beside it.",
      image: 1,
    },
    delivered: [
      "Next.js site with a live conversation hero",
      "Three step setup story: train, configure, optimise",
      "Resolution rate and Operator agent sections",
      "Omnichannel and voice section",
      "Integrations grid covering helpdesks and tools",
      "Sanity CMS so marketing can publish independently",
    ],
    stack: ["nextjs", "react", "vercel", "sanity", "hubspot", "gtm"],
    resultTitle: "What changed for Fin.",
    results: [
      "The product demonstrated before a visitor reads a paragraph",
      "A single headline metric repeated where it matters",
      "Trial and demo paths on every major section",
      "Content managed in a headless CMS and deployed on the edge",
    ],
    stats: [
      { value: "76%", label: "average resolution rate" },
      { value: "12,000+", label: "businesses using Fin" },
      { value: "14 days", label: "free trial, no card" },
    ],
    statsSource: "Figures as published on fin.ai",
    shots: shots(["Fin hero with a live support conversation", "Fin’s proprietary AI models", "Operator: the operations agent", "Works on every channel, including Voice"]),
    mobileShot: { file: "mobile.jpg", alt: "Fin on a phone", ...M },
    video: media("fin-ai", "Walkthrough of the Fin website"),
  },

  systemaops: {
    badge: "AI Automation",
    tags: ["React", "Vite", "n8n & Odoo"],
    liveUrl: "https://www.systemaops.com/",
    domain: "systemaops.com",
    facts: [
      { label: "Service", value: "Website & brand for an AI agency" },
      { label: "Industry", value: "AI automation & Odoo ERP" },
      { label: "Platform", value: "React + Vite" },
      { label: "Audience", value: "Operations leaders" },
    ],
    client:
      "SystemaOps builds production ready automation systems, internal tools and workflow integrations: AI automation, Odoo ERP implementation, n8n development, AIOps monitoring and system integrations.",
    challenges: [
      "Make technical services (ERP, n8n, AIOps) easy for non technical buyers.",
      "Show the pain of manual operations before pitching the fix.",
      "Present six services without a wall of text.",
      "Give a clear, low risk next step: a free consultation.",
    ],
    edge: {
      title: "Problem first, then the system",
      body: "The site leads with what breaks as teams grow, manual processes, disconnected systems and slow operations, then maps each pain to a service and a four step path from idea to impact, with an average three week deployment.",
      image: 2,
    },
    delivered: [
      "React and Vite single page site with animated system diagram",
      "Pain point section with filterable bottlenecks",
      "Six service cards with dedicated detail pages",
      "Four step delivery process",
      "Light and dark themes with a language switcher",
      "Consent first cookie banner and consultation booking",
    ],
    stack: ["react", "vite", "nginx"],
    resultTitle: "What changed for SystemaOps.",
    results: [
      "Complex services explained in plain, outcome led language",
      "A visitor sees their own problem before any sales pitch",
      "Every section points to one action: book a free consultation",
      "A fast, lightweight build with no heavy CMS",
    ],
    stats: [
      { value: "3 wks", label: "average deployment" },
      { value: "6+", label: "automation services" },
      { value: "24/7", label: "support readiness" },
    ],
    statsSource: "Figures as published on systemaops.com",
    shots: shots(["SystemaOps hero: Automate Operations", "Why growing teams break manual systems", "Services built for real impact", "From messy operations to automated scale"]),
    mobileShot: { file: "mobile.jpg", alt: "SystemaOps on a phone", ...M },
    video: media("systemaops", "Walkthrough of the SystemaOps website"),
  },
};
