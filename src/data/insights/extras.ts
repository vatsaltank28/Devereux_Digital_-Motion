/**
 * Supplementary sections per article: an illustrative business example (clearly hypothetical, never a
 * real client or result), common mistakes and an action checklist. Merged into each article before
 * the FAQs by index.ts, bringing every article into the plan's 900 to 1,200 word range.
 */
export interface Extra {
  example: { title: string; paras: string[] };
  mistakes: string[];
  checklist: string[];
}

export const extras: Record<string, Extra> = {
  "website-not-generating-leads": {
    example: { title: "Example: a local accountancy firm", paras: [
      "Imagine a small accountancy practice whose homepage opens with \"Your trusted financial partner\" over a stock photo of a handshake. Visitors who arrive from a search for \"accountant for contractors\" cannot tell whether the firm specialises in contractors at all, and the only call to action is a generic contact page.",
      "A sensible fix would be a headline such as \"Accounting for IT contractors, fixed monthly fee, no surprises\", a short list of what is included, two genuine client reviews and a \"Book a 15 minute call\" button repeated through the page. Nothing about the firm has changed, but the visitor now knows within seconds that they are in the right place.",
    ] },
    mistakes: ["Changing the design before fixing the message.", "Judging the site on traffic instead of enquiries.", "Adding more pages instead of improving the important ones."],
    checklist: ["Rewrite the homepage headline in plain language.", "Choose one primary call to action per page.", "Add real reviews and examples of work near the top.", "Cut form fields to the minimum.", "Test the site on your own phone.", "Set up conversion tracking."],
  },
  "anatomy-of-high-converting-business-website": {
    example: { title: "Example: restructuring a builder’s homepage", paras: [
      "Picture a residential builder whose homepage starts with a long company history, lists twelve services in one paragraph and hides the contact form at the bottom of a separate page. A homeowner planning an extension has to work hard to find out whether this builder does extensions, what a project might involve and how to start.",
      "Rebuilt around the visitor journey, the page would open with \"Extensions and loft conversions in Leeds, designed and built by one team\", followed by a review score, three project photos with short captions, a five step process from survey to handover, a typical price range, FAQs about planning permission and a simple \"Arrange a free survey\" form. The same information, in the order the homeowner needs it.",
      "The company history is not deleted. It moves to the About page, where people who want it will look for it.",
    ] },
    mistakes: ["Opening with company history instead of customer outcomes.", "Burying proof on a separate testimonials page.", "Ending sections without a next step.", "Hiding pricing completely when customers expect a range."],
    checklist: ["Map the questions your customers ask in order.", "Give every section a single job.", "Place proof next to the claims it supports.", "Add a starting price or range if you can.", "Make the contact step short and reassuring."],
  },
  "website-redesign-vs-rebuild": {
    example: { title: "Example: two businesses, two different answers", paras: [
      "Consider a dental practice whose site is built on a well maintained platform, loads quickly and is easy to edit, but still shows photos from a decade ago and lists treatments the practice no longer offers. This is a redesign: new photography, updated copy, a clearer booking path. The platform stays.",
      "Now consider a training company whose site runs on an old theme with abandoned plugins, takes several seconds to load, breaks when anything is updated and cannot connect to its booking system. However good a new design looks, it would sit on the same fragile foundation. This is a rebuild, with a careful migration plan to keep the course pages that already rank in search.",
    ] },
    mistakes: ["Choosing a rebuild because it feels more decisive, without auditing first.", "Changing every URL without redirects.", "Deleting content that already ranks and converts.", "Underestimating the time needed to rewrite content."],
    checklist: ["Run a speed and Search Console audit.", "Ask your team how hard editing is today.", "List the features you will need in the next two years.", "Export a list of your top performing pages.", "Plan redirects before anything goes live."],
  },
  "build-professional-website-paying-customers": {
    example: { title: "Example: a physiotherapy clinic’s first proper website", paras: [
      "Imagine a physiotherapy clinic that has relied on referrals and a basic one page site. Its goal is simple: more booked first appointments from people searching locally. That goal shapes everything that follows.",
      "The sitemap becomes a homepage, one page per condition treated (back pain, sports injuries, post surgery rehab), a team page, pricing, and booking. Copy is written first, answering questions patients actually ask: how many sessions they might need, whether they need a GP referral, what to wear. The design uses real photos of the clinic and team. The site connects to the clinic’s existing booking software so patients can pick a slot without phoning.",
      "After launch, the clinic watches which condition pages lead to bookings and expands the ones that perform best.",
    ] },
    mistakes: ["Starting with colours and logos before goals and content.", "Choosing a platform nobody on the team can update.", "Skipping real device testing.", "Launching without analytics or conversion tracking."],
    checklist: ["Write down one or two measurable goals.", "Draft a simple sitemap.", "Write core page copy before design.", "Pick a platform your team can manage.", "Test forms, speed and mobile before launch.", "Schedule a monthly review after launch."],
  },
  "website-needs-more-than-good-design": {
    example: { title: "Example: the beautiful site that quietly lost leads", paras: [
      "Imagine an interior design studio with a stunning portfolio site: full screen photography, elegant typography, smooth animations. Visitors love it. Yet enquiries are low, and the few that arrive come through a form that emails a shared inbox nobody checks daily.",
      "Look beneath the surface and the problems appear. The images are so large that pages load slowly on phones. Project pages have no text, so search engines have nothing to rank. There is no indication of budget ranges or process, so visitors are unsure whether to enquire. And the enquiries that do arrive wait days for a reply.",
      "Keeping the design but compressing images, adding short project descriptions, a clear process and price guidance, and connecting the form to a CRM with instant acknowledgements would address each layer without losing what makes the site beautiful.",
    ] },
    mistakes: ["Treating the launch as the end of the project.", "Ignoring speed because the site looks fine on office Wi-Fi.", "Sending enquiries to an unmonitored inbox.", "Relying on images alone with no searchable text."],
    checklist: ["Check speed on a phone using mobile data.", "Make sure every key page has meaningful text.", "Connect your forms to a CRM or tracked inbox.", "Set an internal response time target.", "Review the site quarterly."],
  },
  "online-store-visitors-but-no-sales": {
    example: { title: "Example: a skincare brand with busy product pages and quiet checkouts", paras: [
      "Imagine a small skincare brand running Instagram ads. Analytics shows plenty of product page views and a reasonable number of add to carts, but a large share of shoppers leave at the shipping step. Looking closer, delivery costs only appear at checkout, there is no guest checkout, and the only payment option is a card form.",
      "Stating delivery costs and the free shipping threshold on every product page, enabling guest checkout and adding express wallets would address the exact point where shoppers leave. Adding ingredient lists, \"how to use\" guidance and photo reviews on product pages would then help more visitors reach the cart with confidence.",
    ] },
    mistakes: ["Redesigning the homepage when the leak is at checkout.", "Sending all ad traffic to the homepage.", "Hiding delivery costs until the last step.", "Installing apps without checking their effect on speed."],
    checklist: ["Review your funnel and find the biggest drop.", "Show delivery and returns info on product pages.", "Enable guest checkout and express wallets.", "Add genuine reviews with photos.", "Set up an abandoned cart flow.", "Audit apps and scripts for speed."],
  },
  "anatomy-of-high-converting-ecommerce-store": {
    example: { title: "Example: a homeware store organised the way customers shop", paras: [
      "Imagine a homeware store whose navigation mirrors its supplier catalogue: \"Range A\", \"Range B\", \"Clearance\". Shoppers looking for a gift or something for a specific room have to open every category to find it.",
      "Reorganised around customer intent, the menu becomes \"Living room\", \"Kitchen & dining\", \"Bedroom\", \"Gifts under £50\" and \"New in\". Collection pages gain filters for colour, material and price. Product pages show the item styled in a room, exact dimensions with a size comparison, care instructions and delivery times beside the add to cart button. The checkout offers express wallets and shows the total including delivery before the final step.",
      "Each change is small. Together they turn browsing into a guided path to purchase.",
    ] },
    mistakes: ["Organising navigation around internal categories.", "Using inconsistent product photography across a collection.", "Hiding dimensions, sizing or compatibility in long descriptions.", "Adding upsells that interrupt checkout."],
    checklist: ["Restructure navigation around customer needs.", "Add useful filters to large collections.", "Standardise product photography.", "Place delivery and returns info beside the buy button.", "Offer guest checkout and wallets.", "Improve the order confirmation email."],
  },
  "online-store-automated-orders-payments-inventory": {
    example: { title: "Example: a coffee roaster selling online and wholesale", paras: [
      "Imagine a small coffee roaster selling bags online, through a marketplace and to local cafés. Today, someone updates stock in a spreadsheet each evening, copies café orders from emails into the system and writes shipping labels by hand. Overselling happens every few weeks.",
      "An automated setup would keep stock in the store platform as the single source of truth, synced to the marketplace. Wholesale customers would order through a dedicated price list or portal rather than email. Paid orders would create shipping labels automatically, send tracking emails and sync to the accounting software. A low stock alert would notify the roaster when a coffee needs roasting again.",
      "The roaster’s time moves from data entry to roasting and customer relationships.",
    ] },
    mistakes: ["Running separate stock counts for each sales channel.", "Automating before the basic setup is correct.", "Choosing apps that do not integrate with each other.", "Forgetting to test refunds and cancellations."],
    checklist: ["Choose one platform as the stock source of truth.", "Enable express payments and automatic capture.", "Connect a shipping app for labels and tracking.", "Sync orders to accounting.", "Set low stock alerts.", "Test the full flow, including refunds."],
  },
  "automated-ecommerce-operations-after-order": {
    example: { title: "Example: a fashion store drowning in \"where is my order?\" messages", paras: [
      "Imagine a growing fashion store where a large part of the support inbox is customers asking about delivery, plus manual returns handled by email. Each return means several back and forth messages, a manually created label and a spreadsheet update.",
      "Adding a branded tracking page with proactive shipping and delivery notifications would answer most delivery questions before they are asked. A self serve returns portal would let customers choose an exchange or refund and print a label, with standard returns approved automatically by policy. A review request timed after delivery and a styling email a couple of weeks later would turn the post purchase period into a sales opportunity.",
    ] },
    mistakes: ["Sending tracking only through the courier’s generic emails.", "Making returns deliberately difficult.", "Asking for reviews before the product has arrived.", "Automating without alerts for exceptions."],
    checklist: ["Map every step after the order.", "Send proactive shipping and delivery updates.", "Add an order status page.", "Set up a self serve returns process.", "Time review requests after delivery.", "Create alerts for delays and failures."],
  },
  "ecommerce-retention-repeat-customers": {
    example: { title: "Example: a pet food brand building repeat orders", paras: [
      "Imagine an online pet food brand. Most customers buy once from an ad and are never heard from again, even though their pet needs food every month.",
      "A retention system would start with a welcome flow that explains the brand’s ingredients and feeding guides. After the first order, a post purchase email would share transition tips for switching food. Based on bag size, a replenishment reminder would arrive shortly before the food is likely to run out, offering a subscription with easy pause and skip. Customers who lapse would receive a win back email featuring a new recipe rather than a deep discount.",
      "Each message is useful in its own right, which is why customers keep opening them.",
    ] },
    mistakes: ["Sending the same promotion to every customer.", "Training customers to wait for discounts.", "Ignoring the first delivery experience.", "Measuring opens instead of repeat purchases."],
    checklist: ["Set up welcome and post purchase flows.", "Add replenishment reminders for consumables.", "Segment by purchase behaviour.", "Consider subscriptions or loyalty perks.", "Create a win back flow.", "Track repeat purchase rate monthly."],
  },
  "automated-sales-pipeline-lead-follow-up": {
    example: { title: "Example: a home improvement company with leads in five places", paras: [
      "Imagine a home improvement company receiving enquiries through its website, Facebook lead ads, phone calls, emails and WhatsApp. Each salesperson keeps their own notes, quotes are chased when someone remembers, and nobody knows which advertising actually produces jobs.",
      "An automated pipeline would route every enquiry into one CRM with its source recorded. Each new lead would receive an instant reply with a link to book a survey, and the right salesperson would be assigned automatically by postcode. When a quote is sent, follow up tasks would appear after a few days and again a week later. Leads that are not ready would move into a seasonal nurture sequence.",
      "Within a few months, the company would be able to see which channels produce signed jobs, not just enquiries.",
    ] },
    mistakes: ["Choosing a CRM the team will not use.", "Automating messages that should be personal conversations.", "Defining vague pipeline stages.", "Never recording why deals are lost."],
    checklist: ["List every source of leads.", "Connect them to one CRM.", "Send an instant acknowledgement.", "Define clear pipeline stages.", "Automate tasks and quote follow ups.", "Review source and stage reports monthly."],
  },
  "whatsapp-enquiry-to-paying-customer": {
    example: { title: "Example: a beauty clinic booking treatments through WhatsApp", paras: [
      "Imagine a beauty clinic that receives most enquiries on WhatsApp after customers see its Instagram posts. Replies depend on whoever has the clinic phone, prices are typed out each time and bookings are made back and forth over several messages.",
      "With the WhatsApp Business Platform, a click to WhatsApp ad would open a chat that replies instantly with a treatment menu. Customers would choose a treatment, see a price range and answer a couple of questions. A booking link synced to the clinic calendar would let them pick a slot, and a deposit link would secure it. Reminders would go out the day before using approved templates. Every chat would be logged against the customer in the CRM so staff see their history.",
    ] },
    mistakes: ["Running a growing team from one phone.", "Sending promotional messages without opt in.", "Building chatbots with no route to a person.", "Not tracking which ads start conversations that convert."],
    checklist: ["Decide between the Business app and the Platform.", "Add click to chat entry points.", "Create an instant reply and qualifying questions.", "Connect booking, payments and CRM.", "Prepare approved templates for follow ups.", "Set up a shared team inbox."],
  },
  "ai-receptionist-enquiries-bookings": {
    example: { title: "Example: a plumbing business that misses calls on the job", paras: [
      "Imagine a plumbing business whose engineers cannot answer the phone while working. Many callers hang up and try the next plumber. Evening and weekend calls go to voicemail.",
      "An AI receptionist could answer every call and website chat, identify whether the issue is an emergency, collect the address and a description, and either book a standard visit into the calendar or immediately alert the on call engineer for urgent jobs. It would answer common questions about call out charges and coverage areas using the business’s own price guide, and say so honestly when a question needs a person.",
      "The owner reviews call summaries each morning instead of returning a long list of voicemails.",
    ] },
    mistakes: ["Letting the AI answer without your own knowledge base.", "Hiding the fact that customers are talking to an AI.", "No escalation path for urgent or sensitive cases.", "Launching without reviewing real conversations."],
    checklist: ["Choose the first channel: chat, WhatsApp or phone.", "Write a knowledge base from your real FAQs.", "Define qualification and booking rules.", "Design the human handover.", "Check privacy and data handling.", "Review transcripts weekly."],
  },
  "hidden-cost-manual-business-operations": {
    example: { title: "Example: an events company considering a new admin hire", paras: [
      "Imagine an events company ready to hire another coordinator because the team feels stretched. A two week time audit shows much of their week goes on copying client details from enquiry emails into a spreadsheet, creating quotes by hand, sending the same supplier confirmation emails and chasing unpaid deposits.",
      "Automating enquiry capture into a CRM, generating quotes from templates, sending supplier confirmations when a booking is confirmed and chasing deposits automatically would remove a substantial share of that work. The company might still hire later, but the new person would spend their time on clients and events rather than data entry.",
    ] },
    mistakes: ["Automating a broken process without simplifying it first.", "Trying to automate everything at once.", "Not measuring time before and after.", "Leaving no one responsible for maintaining automations."],
    checklist: ["Run a two week time audit.", "Rank tasks by hours per month.", "Pick one repetitive, rule based process.", "Map, simplify, then automate it.", "Measure the time saved.", "Assign an owner for each automation."],
  },
  "ai-agents-vs-traditional-automation": {
    example: { title: "Example: handling a support inbox", paras: [
      "Imagine a software company with a busy support inbox. Some steps are completely predictable: every email should be logged, the customer’s account plan looked up, and an acknowledgement sent. Traditional automation handles these perfectly and cheaply.",
      "Other steps need understanding: is this a billing question, a bug report or a feature request? How urgent is it? What does the customer actually need? An AI agent can read the email, classify it, pull relevant help articles, and draft a reply. A person reviews and sends replies for sensitive cases, while simple, well understood questions can be answered automatically within agreed limits.",
      "The result combines the reliability of rules with the flexibility of AI, and the team focuses on the cases that truly need them.",
    ] },
    mistakes: ["Using AI for tasks a simple rule handles better.", "Giving AI agents broad access to systems without limits.", "Skipping human approval for consequential actions.", "Not logging AI decisions for review."],
    checklist: ["List the steps in the process.", "Mark each as predictable or judgement based.", "Automate predictable steps with rules.", "Use AI for understanding and drafting.", "Add approvals and logging.", "Test with real examples first."],
  },
  "connect-website-crm-whatsapp-email": {
    example: { title: "Example: a property management company with scattered customer data", paras: [
      "Imagine a property management company where landlord enquiries arrive through the website, tenant questions through WhatsApp, and contracts and invoices live in email and accounting software. Staff spend time searching for information and sometimes reply without knowing the full history.",
      "Making the CRM the hub would change that. Website forms would create landlord leads automatically. WhatsApp conversations would be linked to landlord and tenant records. Team inboxes would log emails against contacts. Signed agreements would create recurring invoices in the accounting system, and payments would update the record. Anyone answering a message would see the complete history in one place.",
    ] },
    mistakes: ["Connecting tools before agreeing which system is the source of truth.", "Creating duplicate contacts across systems.", "Building complex custom integrations where native ones exist.", "Not documenting what connects to what."],
    checklist: ["List every tool that holds customer data.", "Choose your CRM hub.", "Agree how contacts are matched.", "Use native integrations first.", "Fill gaps with integration platforms.", "Document every connection."],
  },
  "off-the-shelf-software-vs-custom-application": {
    example: { title: "Example: a cleaning company outgrowing its job app", paras: [
      "Imagine a commercial cleaning company using a popular job management app plus three spreadsheets: one for recurring contract schedules, one for staff availability and one for supplies per site. Managers copy information between them every week, and mistakes lead to missed cleans.",
      "Rather than replacing everything, the company could build a focused custom scheduling tool that reads contracts and availability, generates the weekly rota and pushes jobs into the existing app through its API. The job app keeps doing what it does well, and the spreadsheets disappear.",
      "If the tool proves its value, later versions could add supplies tracking and a client portal.",
    ] },
    mistakes: ["Building custom software before trying configuration and integrations.", "Replacing systems that work well.", "Specifying every possible feature up front.", "Not agreeing code and data ownership."],
    checklist: ["List workarounds and spreadsheets used alongside your tools.", "Estimate the time they cost each month.", "Check configuration and integration options.", "Identify where your process is unique.", "Define a focused first version.", "Agree ownership, hosting and support."],
  },
  "spreadsheet-to-web-application": {
    example: { title: "Example: a recruitment agency’s candidate tracker", paras: [
      "Imagine a recruitment agency tracking candidates, roles and placements in one large shared spreadsheet. Consultants overwrite each other’s updates, sensitive candidate data is visible to everyone, and weekly reports take hours to compile.",
      "As a web application, candidates, roles and placements become linked records. Each consultant sees their own pipeline, managers see everything, and sensitive fields are restricted. Status changes trigger emails to candidates and alerts to consultants. A dashboard replaces the weekly report, and data can still be exported for deeper analysis.",
      "The agency keeps the workflow it refined over years, now with structure, security and automation.",
    ] },
    mistakes: ["Rebuilding the spreadsheet layout instead of the workflow.", "Importing messy data without cleaning it.", "Switching over without a parallel run.", "Forgetting the reporting people rely on."],
    checklist: ["Document tabs, columns and formulas.", "Identify users and permissions.", "Model the data as linked records.", "Design screens around tasks.", "Clean and import data.", "Run in parallel before switching."],
  },
  "customer-portal-business-operations": {
    example: { title: "Example: a print and signage company", paras: [
      "Imagine a print and signage company whose account managers spend much of their day answering status questions, resending artwork proofs and forwarding invoices.",
      "A customer portal would let clients log in to see each order’s status, approve artwork proofs with comments, download invoices and reorder previous jobs in a few clicks. The portal would read order status from the production system and invoices from the accounting software, so nothing is entered twice. Account managers would spend their time on new business and complex projects instead of routine updates.",
    ] },
    mistakes: ["Building features customers did not ask for.", "Keeping portal data separate from core systems.", "Making login harder than sending an email.", "Launching to everyone without a pilot."],
    checklist: ["List your top customer requests.", "Define users, roles and permissions.", "Connect to CRM, accounting and operations data.", "Design for mobile.", "Pilot with a few friendly clients.", "Guide customers to the portal when they email."],
  },
  "building-saas-product-idea-to-platform": {
    example: { title: "Example: from internal tool to SaaS", paras: [
      "Imagine a dental practice group that built an internal tool to manage patient recall reminders across several clinics. Other practices start asking whether they can use it.",
      "Before building more, the group would speak to a range of independent practices to understand how they handle recalls today and whether they would pay a monthly fee. If demand is clear, an MVP would focus only on recall scheduling and reminders, with secure multi practice accounts, staff roles and subscription billing. A private beta with a handful of practices would reveal where onboarding is confusing and which features matter most.",
      "Only after practices rely on it daily would the team invest in integrations, analytics and wider marketing.",
    ] },
    mistakes: ["Building for months before speaking to customers.", "Including too many features in the MVP.", "Treating multi tenancy and security as later problems.", "Delaying charging for too long."],
    checklist: ["Interview potential customers.", "Test willingness to pay.", "Define one core problem for the MVP.", "Plan authentication, tenancy and billing.", "Launch a private beta.", "Measure activation and iterate."],
  },
  "custom-vs-ready-made-software": {
    example: { title: "Example: a logistics company weighing its options", paras: [
      "Imagine a regional logistics company choosing a system to manage deliveries. Accounting, HR and email are standard, so they buy proven ready made products for those. Route planning, driver allocation and proof of delivery, however, are central to how they compete on reliability.",
      "Comparing five year costs, a ready made delivery platform would require per driver subscriptions rising with fleet size, plus workarounds for their specific customer requirements. A custom platform would cost more upfront but fit their process exactly, integrate with their accounting system and give customers a branded tracking experience.",
      "The company would likely choose a hybrid: buy the standard tools, build the delivery platform that sets them apart.",
    ] },
    mistakes: ["Comparing only first year costs.", "Building custom software for standard functions.", "Ignoring lock in and per user pricing growth.", "Choosing a development partner without checking support and documentation."],
    checklist: ["Separate standard processes from differentiating ones.", "Check whether a product fits most of your needs.", "Estimate five year total cost for both options.", "Consider integration requirements.", "Confirm ownership and support terms.", "Start custom work with a focused first version."],
  },
};
