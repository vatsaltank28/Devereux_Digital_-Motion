/**
 * Editorial layer for the resource hub. Each guide is written to be the destination of one social post,
 * so it names one audience, one problem and one relevant next step.
 *
 * `headline` is the on-page title. The longer keyword-led `seoTitle` on the article stays in metadata,
 * and slugs never change, so links already shared on social keep working.
 */
export interface ArticleStrategy {
  headline: string;
  /** The specific reader and problem, shown on the hub and at the top of the guide. */
  forWho: string;
  excerpt: string;
  cta: { title: string; text: string; label: string };
}

export const strategy: Record<string, ArticleStrategy> = {
  "website-not-generating-leads": {
    headline: "Your website gets traffic. Why no enquiries?",
    forWho: "Business owners whose site is live but quiet",
    excerpt: "Seven fixable reasons visitors leave without getting in touch, and where to start.",
    cta: { title: "Want a second pair of eyes on your site?", text: "Send us the link and tell us what it should be bringing in.", label: "Discuss your website" },
  },
  "anatomy-of-high-converting-business-website": {
    headline: "What belongs on a business homepage, and in what order",
    forWho: "Anyone planning or rewriting a homepage",
    excerpt: "A section by section structure that follows the questions a visitor actually asks.",
    cta: { title: "Planning a clearer homepage?", text: "Tell us who it is for and what you need it to do.", label: "Discuss your website" },
  },
  "website-redesign-vs-rebuild": {
    headline: "Redesign or rebuild? How to tell before you spend",
    forWho: "Owners of an ageing or underperforming website",
    excerpt: "The signs that separate a site needing a refresh from one needing new foundations.",
    cta: { title: "Not sure which one you need?", text: "Share your current site and we can talk through the options.", label: "Talk through your site" },
  },
  "build-professional-website-paying-customers": {
    headline: "Building a business website, from goals to launch",
    forWho: "Businesses commissioning a first or new website",
    excerpt: "The full sequence, so you know what should happen at each stage and what to ask for.",
    cta: { title: "Planning a new website?", text: "Tell us where the project stands and what it needs to achieve.", label: "Start a conversation" },
  },
  "website-needs-more-than-good-design": {
    headline: "A beautiful website can still be a failing one",
    forWho: "Businesses with a good looking site and few results",
    excerpt: "Speed, search visibility and follow up: what design alone cannot do for you.",
    cta: { title: "Does your site look better than it performs?", text: "Tell us what it is missing and we can look at it together.", label: "Discuss your website" },
  },
  "online-store-visitors-but-no-sales": {
    headline: "Your store has visitors. Why aren't they buying?",
    forWho: "Store owners with traffic but weak sales",
    excerpt: "Where online stores usually leak sales, and how to find the leak in yours.",
    cta: { title: "Trying to find where your store leaks?", text: "Send us the store and tell us what you are seeing.", label: "Discuss your store" },
  },
  "anatomy-of-high-converting-ecommerce-store": {
    headline: "What every page of an online store needs to do",
    forWho: "Brands launching or restructuring a store",
    excerpt: "From homepage to thank you page, the job of each step in the buying journey.",
    cta: { title: "Building or restructuring a store?", text: "Tell us what you sell and how you sell it today.", label: "Discuss your store" },
  },
  "online-store-automated-orders-payments-inventory": {
    headline: "Stop copying orders between systems",
    forWho: "Stores handling orders and stock by hand",
    excerpt: "How to connect payments, inventory and fulfilment so an order moves on its own.",
    cta: { title: "Still moving orders by hand?", text: "Walk us through your process and we can map what to connect.", label: "Map your order flow" },
  },
  "automated-ecommerce-operations-after-order": {
    headline: "What should happen after someone clicks buy",
    forWho: "Growing stores stretched by post purchase admin",
    excerpt: "Confirmations, fulfilment, returns and support, automated without losing the human touch.",
    cta: { title: "Is post purchase admin slowing you down?", text: "Tell us where the time goes after an order comes in.", label: "Discuss your operations" },
  },
  "ecommerce-retention-repeat-customers": {
    headline: "Turning first time buyers into repeat customers",
    forWho: "Stores relying too heavily on new customers",
    excerpt: "Retention systems that bring customers back without constant discounting.",
    cta: { title: "Want more second orders?", text: "Tell us about your store and how customers buy today.", label: "Discuss retention" },
  },
  "automated-sales-pipeline-lead-follow-up": {
    headline: "The leads you lose between enquiry and follow up",
    forWho: "Teams juggling enquiries across several channels",
    excerpt: "How to build a simple pipeline so every enquiry gets a prompt reply and a clear owner.",
    cta: { title: "Are enquiries slipping through?", text: "Show us how leads reach you now and we can map a simpler route.", label: "Map your follow up" },
  },
  "whatsapp-enquiry-to-paying-customer": {
    headline: "From WhatsApp message to paying customer",
    forWho: "Businesses whose customers enquire on WhatsApp",
    excerpt: "Turn informal chats into a reliable path from first message to paid order.",
    cta: { title: "Selling through WhatsApp?", text: "Tell us how those conversations run today.", label: "Discuss your WhatsApp flow" },
  },
  "ai-receptionist-enquiries-bookings": {
    headline: "What an AI receptionist should and shouldn't do",
    forWho: "Service businesses that miss calls and messages",
    excerpt: "How they work, where they need a human, and how to set one up responsibly.",
    cta: { title: "Considering an AI receptionist?", text: "Tell us how enquiries and bookings work in your business.", label: "Explore the idea with us" },
  },
  "hidden-cost-manual-business-operations": {
    headline: "What to automate before you hire",
    forWho: "Busy teams thinking about adding headcount",
    excerpt: "How to spot the manual work draining your team, and what to tackle first.",
    cta: { title: "Looking to simplify your workflow?", text: "Tell us which tasks keep eating the week.", label: "Discuss your workflow" },
  },
  "ai-agents-vs-traditional-automation": {
    headline: "AI agents or simple automation? A plain comparison",
    forWho: "Decision makers cutting through the AI noise",
    excerpt: "How the two differ, and how to tell which one your process actually calls for.",
    cta: { title: "Unsure what your process needs?", text: "Describe it to us and we can work out the simplest fit.", label: "Talk it through" },
  },
  "connect-website-crm-whatsapp-email": {
    headline: "Make your website, CRM, WhatsApp and email work as one",
    forWho: "Businesses with customer data in too many places",
    excerpt: "How to connect your tools so each customer has one record and one journey.",
    cta: { title: "Are your tools working separately?", text: "List what you use and we can look at how it could connect.", label: "Discuss your systems" },
  },
  "off-the-shelf-software-vs-custom-application": {
    headline: "When off the shelf software stops fitting",
    forWho: "Businesses working around the limits of their tools",
    excerpt: "The signs it may be time to consider something built around how you work.",
    cta: { title: "Outgrowing your current tools?", text: "Tell us where they fall short.", label: "Discuss your options" },
  },
  "spreadsheet-to-web-application": {
    headline: "When your spreadsheet should become software",
    forWho: "Teams running key operations from a spreadsheet",
    excerpt: "How to move a critical spreadsheet into a web app without disrupting the work.",
    cta: { title: "Is a spreadsheet running your business?", text: "Tell us what it does and who depends on it.", label: "Discuss your spreadsheet" },
  },
  "customer-portal-business-operations": {
    headline: "Planning a customer portal people will actually use",
    forWho: "Service businesses fielding constant status requests",
    excerpt: "What to include, what to leave out, and how to reduce the \"just checking in\" emails.",
    cta: { title: "Thinking about a customer portal?", text: "Tell us what your clients ask you for most.", label: "Discuss your portal" },
  },
  "building-saas-product-idea-to-platform": {
    headline: "From SaaS idea to first paying customer",
    forWho: "Founders with a software idea to validate",
    excerpt: "A sequence of small, sensible bets, from first idea to a working product.",
    cta: { title: "Have a product idea?", text: "Tell us what it does and who it is for.", label: "Talk through your idea" },
  },
  "custom-vs-ready-made-software": {
    headline: "Build or buy? A framework for deciding",
    forWho: "Decision makers weighing a software investment",
    excerpt: "Cost, speed, flexibility and risk compared, with a simple way to choose.",
    cta: { title: "Weighing build against buy?", text: "Share what you need and we can help you think it through.", label: "Talk it through" },
  },
};
