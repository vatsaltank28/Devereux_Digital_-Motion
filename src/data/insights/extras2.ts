/** A fourth FAQ for articles that shipped with three (plan: 3 to 4 FAQs per article). */
export const extraFaq: Record<string, { q: string; a: string }> = {
  "anatomy-of-high-converting-business-website": { q: "Should my homepage include a video?", a: "A short video can help when it shows your work, team or process in a way photos cannot. Keep it optional to play, captioned, and make sure it does not slow the page or push your key message below the first screen." },
  "website-redesign-vs-rebuild": { q: "How long does a website rebuild usually take?", a: "It depends on the number of pages, integrations and how much content needs rewriting. Small business rebuilds often take several weeks, while larger sites with custom features take longer. Content preparation is frequently the longest part." },
  "build-professional-website-paying-customers": { q: "Do I need ongoing support after the website launches?", a: "Most businesses benefit from it. Platforms, plugins and security need updating, and the best results come from regular improvements based on how visitors actually use the site." },
  "website-needs-more-than-good-design": { q: "Does website speed really affect search rankings?", a: "Google uses page experience signals, including loading performance, as part of how it evaluates pages. More importantly, slow pages lose visitors before they ever see your offer." },
  "online-store-visitors-but-no-sales": { q: "Should I run more ads if my store is not selling?", a: "Not until the store converts the traffic it already has. Fix product pages and checkout first, otherwise additional ad spend simply sends more visitors to the same leaks." },
  "anatomy-of-high-converting-ecommerce-store": { q: "Do I need a search bar if I only sell a few products?", a: "For small catalogues, clear navigation and collections are usually enough. Search becomes important as the number of products grows or when customers look for specific items, sizes or compatibility." },
  "online-store-automated-orders-payments-inventory": { q: "Is automation worth it for a small store?", a: "Basic automation, such as payment capture, confirmation emails, shipping labels and stock syncing, is worthwhile from the start because most platforms include it. More advanced workflows make sense as order volume grows." },
  "automated-ecommerce-operations-after-order": { q: "Will automating post purchase steps make my brand feel impersonal?", a: "Not if messages are well written and useful. Customers generally value timely, accurate updates. Keep a real person easy to reach for questions and problems." },
  "ecommerce-retention-repeat-customers": { q: "How many emails should a retention flow include?", a: "Only as many as remain useful. A welcome series might be three to five emails, while post purchase and replenishment flows may be one or two each. Watch unsubscribe rates and engagement to guide frequency." },
  "automated-sales-pipeline-lead-follow-up": { q: "Can we automate follow ups for leads that arrive by phone?", a: "Yes. Staff can log calls in the CRM with a quick form or mobile app, and from there the same automated acknowledgements, tasks and reminders apply as for online enquiries." },
  "ai-receptionist-enquiries-bookings": { q: "How long does it take to set up an AI receptionist?", a: "A focused chat assistant for FAQs and bookings can often be set up in a few weeks, including preparing the knowledge base and testing. Voice assistants and complex integrations take longer." },
  "hidden-cost-manual-business-operations": { q: "Which process should we automate first?", a: "Start with a high volume, rule based task that frustrates the team and touches customers, such as lead capture and follow up, invoicing or appointment reminders. Quick, visible wins build momentum." },
  "ai-agents-vs-traditional-automation": { q: "Do AI agents need ongoing maintenance?", a: "Yes. Prompts, knowledge sources, tool permissions and guardrails should be reviewed as your business changes, and model updates from providers should be tested before relying on them in production." },
  "connect-website-crm-whatsapp-email": { q: "How long does it take to connect these systems?", a: "Connecting a website and email to a CRM can be quick using native integrations. Adding WhatsApp, booking, accounting and custom logic takes longer, so most businesses connect systems in stages." },
  "off-the-shelf-software-vs-custom-application": { q: "Can custom software integrate with the tools we already use?", a: "Usually yes. Most modern business tools provide APIs, so custom applications can read from and write to them, keeping existing systems in place where they work well." },
  "spreadsheet-to-web-application": { q: "How long does it take to turn a spreadsheet into a web app?", a: "Simple internal tools can be built in weeks, especially with low code platforms. More complex applications with many users, permissions and integrations take longer and are best delivered in stages." },
  "customer-portal-business-operations": { q: "Should the portal work on mobile?", a: "Yes. Many customers will check status, approve items or download documents from their phone, so key tasks should be easy on small screens." },
  "building-saas-product-idea-to-platform": { q: "Do I need a technical co founder to build a SaaS?", a: "Not necessarily. Many founders work with an experienced development partner for the first versions. What matters is having someone who understands both the technology and the product decisions." },
  "custom-vs-ready-made-software": { q: "How do I choose a development partner for custom software?", a: "Look for relevant experience, clear communication, written agreements on code ownership, documentation and support, and a willingness to start with a focused first version." },
};

/** Second supplementary layer per article: how to measure success + questions to ask before starting. */
export interface Extra2 {
  measure: string[];
  questions: string[];
}

export const extras2: Record<string, Extra2> = {
  "anatomy-of-high-converting-business-website": {
    measure: ["Track the percentage of visitors who reach your contact or booking step, and the percentage who complete it. Watch scroll depth on the homepage to see whether visitors reach your proof, process and pricing sections or leave before them.", "Session recordings from tools such as Microsoft Clarity often reveal where people hesitate: clicks on elements that are not links, long pauses on pricing, or repeated visits to the FAQ before enquiring."],
    questions: ["What are the three questions customers ask most on a first call?", "Which proof do we have that we can actually show?", "Can we publish a starting price or typical range?", "What happens in the first 24 hours after someone enquires?"],
  },
  "website-redesign-vs-rebuild": {
    measure: ["Before starting either project, record your baseline: organic traffic to key pages, enquiries per month, page speed scores and the time it takes your team to publish a change. Compare the same numbers a month and three months after launch.", "For a rebuild, also monitor Search Console for crawl errors and missing pages in the weeks after launch, and fix any missing redirects quickly."],
    questions: ["Is our problem what visitors see, or what the site is built on?", "Which pages bring in most of our traffic and enquiries today?", "What do we need the site to do in two years that it cannot do now?", "Who will maintain the site after launch?"],
  },
  "build-professional-website-paying-customers": {
    measure: ["Measure the goals you set in step one: enquiries, bookings or sales per month, and the conversion rate from visit to enquiry. Add secondary signals such as calls from the site, WhatsApp clicks and time to first reply.", "Review results monthly for the first quarter. Early data shows which pages persuade and which need stronger copy, proof or calls to action."],
    questions: ["What is the single most important action a visitor should take?", "Who will write and approve the content?", "Which tools must the site connect to, such as booking or CRM?", "How will we know in three months that the site is working?"],
  },
  "website-needs-more-than-good-design": {
    measure: ["Look beyond visual feedback. Track page speed on mobile, organic search impressions and clicks in Search Console, enquiry conversion rate, and the average time between an enquiry arriving and the first reply.", "If design is strong but these numbers are weak, the problem sits in one of the invisible layers, and that is where to invest next."],
    questions: ["Does the site load quickly on a phone using mobile data?", "Can people find us when they search for what we do?", "Where do enquiries go, and who replies to them?", "When did we last update our proof, pricing and FAQs?"],
  },
  "online-store-visitors-but-no-sales": {
    measure: ["Watch each step of the funnel separately: product page to add to cart, cart to checkout, and checkout to purchase. Improvements to product pages show up in add to cart rate, while checkout changes show up in checkout completion.", "Segment by device and traffic source. Mobile visitors from social ads often behave very differently from desktop visitors arriving through search, and may need different fixes."],
    questions: ["At which step do most shoppers leave?", "Do our ads land on the most relevant product or collection?", "Are delivery costs and times visible before checkout?", "Which payment options do our customers expect?"],
  },
  "anatomy-of-high-converting-ecommerce-store": {
    measure: ["Use site search data to learn what shoppers look for and cannot find. Track collection page click through, product page add to cart rate and checkout completion, and compare them before and after each change.", "Heatmaps on product pages show whether shoppers see delivery information, reviews and size guides, or scroll past them."],
    questions: ["How do our customers describe what they are looking for?", "What do shoppers need to know before they will add to cart?", "Is our product photography consistent and informative?", "How many steps does our checkout take on a phone?"],
  },
  "online-store-automated-orders-payments-inventory": {
    measure: ["Measure the time spent each week on order admin, stock updates and bookkeeping before and after automation. Track oversell incidents, shipping errors and the time from payment to dispatch.", "These operational numbers show the return on automation more clearly than revenue alone, because they translate directly into hours saved and fewer unhappy customers."],
    questions: ["Where is our stock count kept today, and how many places?", "Which order tasks are still done by hand?", "Which apps and tools do we already pay for?", "What happens when an order fails or is refunded?"],
  },
  "automated-ecommerce-operations-after-order": {
    measure: ["Track support tickets per hundred orders, the share of tickets about delivery status, average time to process a return, and review collection rate.", "A falling number of delivery status questions and faster returns are clear signs that the post purchase operation is working."],
    questions: ["What are the most common reasons customers contact us after ordering?", "Who handles returns today, and how long do they take?", "Do customers receive updates without asking for them?", "When do we ask for reviews, and how?"],
  },
  "ecommerce-retention-repeat-customers": {
    measure: ["Track repeat purchase rate, average time between first and second order, revenue from automated flows and customer lifetime value by acquisition channel.", "Compare cohorts: customers who received your new flows versus those who joined before. This shows whether retention is genuinely improving."],
    questions: ["How often does a typical customer need to reorder?", "What do repeat customers have in common?", "Are we relying on discounts to drive return visits?", "Which products naturally lead to a second purchase?"],
  },
  "automated-sales-pipeline-lead-follow-up": {
    measure: ["Track response time to new leads, conversion rate at each pipeline stage, win rate by lead source and the number of leads with no activity for more than a few days.", "Response time is often the fastest metric to improve and one of the most closely linked to winning business."],
    questions: ["Where do our leads come from today?", "Who is responsible for each new lead?", "How quickly do we usually reply?", "Why did we lose the last ten deals we did not win?"],
  },
  "whatsapp-enquiry-to-paying-customer": {
    measure: ["Track conversations started, the percentage that reach a booking or quote, conversion to paid, and response time. Tag conversations by campaign so you can see which ads produce paying customers.", "Monitor the quality signals in your WhatsApp account to make sure customers are not blocking or reporting your messages."],
    questions: ["How many WhatsApp enquiries do we receive each week?", "How many people need to reply from the same number?", "What information do we need before booking or quoting?", "Do customers opt in to receive follow up messages?"],
  },
  "ai-receptionist-enquiries-bookings": {
    measure: ["Track the share of enquiries handled without human help, bookings made by the assistant, handover rate, customer satisfaction and the accuracy of answers based on transcript reviews.", "Also measure missed calls or unanswered messages before and after launch. This is often where the clearest value appears."],
    questions: ["When do we currently miss enquiries?", "Which questions could be answered from our existing information?", "What must always go to a person?", "Which calendar or booking system should it connect to?"],
  },
  "hidden-cost-manual-business-operations": {
    measure: ["Compare hours spent on the automated task before and after, error rates, and how quickly work moves from one step to the next. Ask the team whether the change made their week easier.", "Add up hours saved across automations each quarter. It gives a clear picture of capacity created without hiring."],
    questions: ["Which tasks do we repeat every day or week?", "Where do errors or delays happen most often?", "Which tools hold the data these tasks use?", "Who will look after the automations once they are built?"],
  },
  "ai-agents-vs-traditional-automation": {
    measure: ["For rule based automations, measure reliability and time saved. For AI agents, also measure accuracy, the share of outputs approved without edits, escalation rate and cost per task.", "Review a sample of AI outputs every week at first, then less often as confidence grows."],
    questions: ["Is the input structured data or free text?", "What would happen if the system made a mistake?", "Which actions need human approval?", "How will we review and improve the system?"],
  },
  "connect-website-crm-whatsapp-email": {
    measure: ["Track the share of customer interactions logged in the CRM, duplicate records, time spent searching for information and lead response times.", "When every channel feeds the hub, you can also measure what was previously invisible, such as which source produces the most valuable customers."],
    questions: ["Where does customer information live today?", "Which system should be the single source of truth?", "Which tools already have native integrations?", "How do we match contacts across systems?"],
  },
  "off-the-shelf-software-vs-custom-application": {
    measure: ["Track time spent on workarounds, the number of spreadsheets used alongside your software, error rates in the affected process and total software subscription cost.", "After a custom tool launches, measure the same numbers again. The difference is the clearest evidence of whether building was the right call."],
    questions: ["Which workarounds do we rely on every week?", "What would it cost to keep working this way for three more years?", "Is this process a competitive advantage?", "Who will own and support the custom software?"],
  },
  "spreadsheet-to-web-application": {
    measure: ["Track time spent maintaining the spreadsheet, data errors, report preparation time and the number of people who need access.", "After the switch, measure how quickly records are updated, how often errors occur and how long reports take. Most teams also notice far fewer conversations about which version is correct."],
    questions: ["Who uses the spreadsheet, and for what?", "Which columns hold sensitive data?", "Which reports are created from it?", "What automation would save the most time?"],
  },
  "customer-portal-business-operations": {
    measure: ["Track portal logins, the share of customers who use it, support emails per customer, time spent on routine requests and the speed of approvals or payments made through the portal.", "Customer feedback after the pilot will also show which features to improve before a wider rollout."],
    questions: ["What do customers ask us most often?", "Which systems hold the information they need?", "Who at each client should have access?", "How will we encourage customers to use it?"],
  },
  "building-saas-product-idea-to-platform": {
    measure: ["Track sign ups, activation (users reaching the first moment of value), weekly active usage, trial to paid conversion, churn and monthly recurring revenue.", "Early on, qualitative feedback matters as much as numbers. Talk to every beta user."],
    questions: ["Who exactly is the customer, and what do they use today?", "Would they pay for this, and how much?", "What is the smallest version that solves the core problem?", "How will we support customers once they rely on it?"],
  },
  "custom-vs-ready-made-software": {
    measure: ["Compare total cost of ownership over time, hours spent on workarounds, how well each option supports your growth, and the impact on customer experience.", "Revisit the decision periodically. A ready made product that fitted well at ten users may not at fifty, and the reverse can also be true."],
    questions: ["Is this process standard or a source of advantage?", "Does a product fit most of our needs without workarounds?", "What will it cost over five years?", "Who will maintain it, and do we own it?"],
  },
};
