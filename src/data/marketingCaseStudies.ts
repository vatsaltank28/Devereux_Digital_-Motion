/**
 * MARKETING CLIENT PROJECTS.
 *
 * Results supplied and confirmed by the clients (24 Nov 2026). Figures display when `resultsConfirmed` is
 * true. For a new project, add its real `tiles`, `moreMetrics`, `budget` and `impact` before enabling it.
 * CAMPAIGN_METRICS_PREVIEW=1 shows unconfirmed figures for local review only.
 */

export interface Metric {
  value: string;
  label: string;
}

export interface MarketingCaseStudy {
  headline: string;
  industry: string;
  categoryName: string;
  campaignType: string;
  duration: string;
  market: string;
  budgetLabel: string;
  budget: string;
  overview: string;
  challenge: string;
  strategy: string;
  actions: string[];
  /** Six headline tiles. The first is the primary result. */
  tiles: [Metric, Metric, Metric, Metric, Metric, Metric];
  /** Remaining metrics, collapsed by default to keep the page short. */
  moreMetrics: Metric[];
  impact: string;
  /** Qualitative result shown until the client's figures are confirmed. */
  outcome: string;
  resultsConfirmed: boolean;
  cta: { title: string; body: string };
  service: string;
}

export const marketingCaseStudies = {
  nexora: {
    headline: "Turning software awareness into a growing user base.",
    industry: "Software & Technology",
    categoryName: "SaaS & Software Marketing",
    campaignType: "User Acquisition & Product Awareness",
    duration: "8 weeks",
    market: "United States, United Kingdom and Canada",
    budgetLabel: "Advertising budget",
    budget: "$5,000",
    overview:
      "Nexora is a productivity software platform designed to help freelancers, entrepreneurs and small teams manage projects, organize tasks and improve their workflows. The company wanted to expand its international visibility, attract relevant users and convert interested visitors into paying subscribers.",
    challenge:
      "Nexora struggled with limited product awareness, inconsistent website traffic and difficulty converting visitors into registered users. It needed a structured acquisition campaign that could attract people genuinely interested in productivity software rather than simply generate impressions.",
    strategy:
      "A targeted user acquisition strategy combined Google Search advertising and Meta campaigns. Google Search focused on people actively looking for productivity solutions, while Meta introduced Nexora to new potential audiences. Landing page messaging and the registration journey were also improved to reduce friction.",
    actions: [
      "Conducted audience and competitor research",
      "Developed product positioning and advertising messaging",
      "Set up and managed Google Ads campaigns",
      "Developed Meta advertising campaigns",
      "Created promotional graphics and product demonstration videos",
      "Optimized landing page messaging and registration flow",
      "Implemented conversion tracking",
      "Monitored and optimized campaign performance",
    ],
    tiles: [
      { value: "675", label: "New registrations" },
      { value: "180,000", label: "Impressions" },
      { value: "5,400", label: "Ad clicks" },
      { value: "338", label: "Activated users" },
      { value: "51", label: "New paying customers" },
      { value: "$7.41", label: "Cost per registration" },
    ],
    moreMetrics: [
      { value: "4,860", label: "Website sessions" },
      { value: "3.00%", label: "Click-through rate" },
      { value: "13.89%", label: "Registration conversion rate" },
      { value: "50.07%", label: "Activation rate" },
      { value: "$0.93", label: "Average cost per click" },
      { value: "$98.04", label: "Cost per paying customer" },
    ],
    impact:
      "The campaign generated 675 registrations and brought in 51 new paying customers. It established a measurable acquisition funnel connecting advertising exposure with software registrations, user activation and paid subscriptions.",
    cta: {
      title: "Building a software product that needs more users?",
      body: "Let’s develop a marketing campaign that puts your product in front of the right audience.",
    },
    service: "digital-marketing",
    outcome: "A structured acquisition funnel connecting advertising with registrations, user activation and paid subscriptions.",
    resultsConfirmed: true,
  },
  aurelle: {
    headline: "Turning product visibility into measurable ecommerce sales.",
    industry: "Beauty & Personal Care",
    categoryName: "Ecommerce & Product Marketing",
    campaignType: "Product Promotion & Sales Acquisition",
    duration: "6 weeks",
    market: "United States",
    budgetLabel: "Advertising budget",
    budget: "$3,000",
    overview:
      "AURELLE is a premium skincare brand selling beauty and skincare products through its ecommerce store. The brand wanted to increase product visibility, attract new customers and generate more consistent online purchases through paid marketing.",
    challenge:
      "The brand had difficulty reaching new customers beyond its existing audience. Its promotions generated product interest, but the advertising strategy and shopping experience needed improvement to turn that interest into completed purchases.",
    strategy:
      "A conversion-focused ecommerce campaign centered on product presentation, audience targeting and retargeting. Instagram and Facebook advertising introduced the products to relevant consumers and reconnected with people who had shown interest, while product information and the purchasing journey were made clearer.",
    actions: [
      "Researched the skincare market and customer segments",
      "Developed product positioning and promotional messaging",
      "Created product-focused graphics and video advertisements",
      "Set up and managed Meta Ads campaigns",
      "Developed prospecting and retargeting audiences",
      "Improved product page messaging",
      "Implemented purchase conversion tracking",
      "Monitored advertising performance and optimized campaigns",
    ],
    tiles: [
      { value: "$18,000", label: "Attributed revenue" },
      { value: "6.0x", label: "Return on ad spend" },
      { value: "300", label: "Orders generated" },
      { value: "240,000", label: "Impressions" },
      { value: "5.56%", label: "Purchase conversion rate" },
      { value: "$10", label: "Cost per purchase" },
    ],
    moreMetrics: [
      { value: "150,000", label: "Reach" },
      { value: "6,000", label: "Ad clicks" },
      { value: "5,400", label: "Website sessions" },
      { value: "$60", label: "Average order value" },
      { value: "2.50%", label: "Click-through rate" },
      { value: "$0.50", label: "Average cost per click" },
    ],
    impact:
      "The campaign generated 300 orders and $18,000 in attributed revenue from $3,000 in advertising expenditure, a 6.0x ROAS. Every $1 spent on advertising generated $6 in attributed sales revenue. This does not represent net profit.",
    cta: {
      title: "Have a product ready for the market?",
      body: "Let’s create a campaign that turns product interest into measurable sales.",
    },
    service: "paid-advertising",
    outcome: "A clearer path from product discovery to purchase, supported by structured prospecting, retargeting and purchase tracking.",
    resultsConfirmed: true,
  },
  "vortex-hub": {
    headline: "Turning community visibility into new, active members.",
    industry: "Gaming & Online Communities",
    categoryName: "Community & Platform Marketing",
    campaignType: "Discord Community Acquisition",
    duration: "6 weeks",
    market: "Global English-speaking audiences",
    budgetLabel: "Campaign budget",
    budget: "$1,000",
    overview:
      "VORTEX HUB is a gaming and technology Discord community offering discussions, gaming activities, events and networking opportunities. The community wanted to expand its international presence, attract relevant members and build a more active server.",
    challenge:
      "The community struggled to reach audiences outside its existing network. It needed greater visibility, a consistent member acquisition strategy and a better way to turn new joins into active participants.",
    strategy:
      "A community-focused promotion strategy combined short-form content, creator exposure and relevant community placements. Rather than simply promoting a Discord invitation, the campaign highlighted the activities, benefits and experience available to members, with onboarding planned to encourage participation after joining.",
    actions: [
      "Conducted gaming and community audience research",
      "Developed community positioning and promotional messaging",
      "Created Discord promotional graphics",
      "Produced short-form promotional video concepts",
      "Organized TikTok and YouTube promotional distribution",
      "Identified relevant creator and community placements",
      "Improved the server onboarding journey",
      "Tracked member acquisition, activation and retention",
    ],
    tiles: [
      { value: "1,000", label: "New members acquired" },
      { value: "180,000", label: "Campaign impressions" },
      { value: "6,000", label: "Promotion link clicks" },
      { value: "650", label: "Activated members" },
      { value: "65%", label: "Member activation rate" },
      { value: "35%", label: "30-day cohort retention" },
    ],
    moreMetrics: [
      { value: "5,000", label: "Landing page visits" },
      { value: "350", label: "Members retained at day 30" },
      { value: "3.33%", label: "Click-through rate" },
      { value: "20%", label: "Visit-to-join conversion" },
      { value: "$1.00", label: "Cost per new member" },
      { value: "$1.54", label: "Cost per activated member" },
    ],
    impact:
      "The campaign acquired 1,000 new members and established a more measurable community growth process. By tracking activation and retention alongside membership, it focused on attracting people who would actually participate.",
    cta: {
      title: "Building a Discord server or online community?",
      body: "Let’s get your community in front of people who actually want to be part of it.",
    },
    service: "digital-marketing",
    outcome: "A more measurable community growth process, with onboarding, activation and retention tracked alongside new members.",
    resultsConfirmed: true,
  },
  "stratford-consulting": {
    headline: "Turning targeted business traffic into qualified client opportunities.",
    industry: "Professional Services & Consulting",
    categoryName: "Business & Brand Marketing",
    campaignType: "B2B Lead Generation",
    duration: "10 weeks",
    market: "United States",
    budgetLabel: "Advertising budget",
    budget: "$2,500",
    overview:
      "STRATFORD CONSULTING is a business consultancy offering operational strategy and growth advisory services to small and medium-sized businesses. The company wanted to attract decision-makers, generate relevant enquiries and convert qualified prospects into paying clients.",
    challenge:
      "The consultancy had a professional service offering but struggled with consistent online visibility and client acquisition. Its website was not generating enough qualified enquiries, and it needed a more structured way to reach businesses actively searching for consulting services.",
    strategy:
      "A high-intent B2B lead generation campaign centered on Google Search advertising, relevant commercial search terms, clearer service messaging and an optimized enquiry journey. Instead of attracting broad audiences, it prioritized people actively looking for professional consulting services.",
    actions: [
      "Conducted competitor and audience research",
      "Developed B2B marketing positioning",
      "Created and managed Google Search campaigns",
      "Optimized service landing pages",
      "Developed conversion-focused advertising copy",
      "Improved the enquiry process",
      "Implemented conversion and lead tracking",
      "Monitored lead quality and optimized keywords",
    ],
    tiles: [
      { value: "100", label: "Business enquiries" },
      { value: "40", label: "Qualified leads" },
      { value: "16", label: "Consultations booked" },
      { value: "4", label: "New clients acquired" },
      { value: "100,000", label: "Impressions" },
      { value: "$25", label: "Cost per enquiry" },
    ],
    moreMetrics: [
      { value: "2,500", label: "Ad clicks" },
      { value: "2,250", label: "Website sessions" },
      { value: "2.50%", label: "Click-through rate" },
      { value: "4.44%", label: "Enquiry conversion rate" },
      { value: "40%", label: "Lead qualification rate" },
      { value: "$1.00", label: "Average cost per click" },
      { value: "$62.50", label: "Cost per qualified lead" },
      { value: "$625", label: "Cost per acquired client" },
    ],
    impact:
      "The campaign generated 100 enquiries, identified 40 qualified business opportunities, booked 16 consultations and acquired four new clients. It established a structured process connecting advertising activity with meaningful commercial opportunities.",
    cta: {
      title: "Need more qualified enquiries and customers?",
      body: "Let’s develop a marketing strategy built around your business goals.",
    },
    service: "paid-advertising",
    outcome: "A structured lead generation process connecting high-intent search with clearer messaging and a better enquiry journey.",
    resultsConfirmed: true,
  },
} satisfies Record<string, MarketingCaseStudy>;

export const showCampaignMetrics = (cs: MarketingCaseStudy) => cs.resultsConfirmed || process.env.CAMPAIGN_METRICS_PREVIEW === "1";
