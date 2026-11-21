import type { Article } from "./types";

/** Category 1: Website Design & Development (articles 1 to 5 of the content plan). */
export const webArticles: Article[] = [
  {
    slug: "website-not-generating-leads",
    category: "web",
    title: "Your Website Is Not Generating Leads: 7 Things Your Business Needs to Fix",
    seoTitle: "Website Not Generating Leads? 7 Fixes That Actually Work",
    description: "Getting traffic but no enquiries? Here are the seven most common reasons business websites fail to generate leads, and exactly how to fix each one.",
    primaryKeyword: "website not generating leads",
    keywords: ["how to get more leads from website", "website conversion problems", "lead generation website", "improve website enquiries"],
    excerpt: "Traffic without enquiries usually comes down to a handful of fixable problems. Here are the seven we see most, and what to do about each.",
    intro: [
      "Your website gets visitors. Google Analytics shows people arriving, browsing, maybe even spending a few minutes on the page. And yet the contact form stays quiet and the phone does not ring.",
      "This is one of the most common problems business owners bring to us, and the good news is that it is rarely mysterious. A website that does not generate leads is almost always failing at one of a small number of jobs. Fix those jobs and enquiries follow.",
    ],
    takeaways: [
      "Most lead problems come from unclear messaging, weak calls to action or too much friction, not from a lack of traffic.",
      "Visitors decide in seconds whether you can help them. Your first screen has to answer that.",
      "Every page needs one obvious next step, and that step needs to be easy on a phone.",
      "Measure enquiries, not just visits, so you know which fixes are working.",
    ],
    sections: [
      {
        id: "unclear-message",
        title: "1. Visitors cannot tell what you do in five seconds",
        blocks: [
          { t: "p", text: "The first screen of your homepage carries most of the weight. If a visitor has to scroll, decode a slogan or open a menu to understand what you offer and who it is for, many will simply leave." },
          { t: "p", text: "Replace clever taglines with a plain statement: what you do, who you do it for and the result they get. \"Commercial cleaning for offices in Manchester, done after hours so your team never notices\" beats \"Excellence in every detail\" every time." },
          { t: "callout", title: "Quick test", text: "Show your homepage to someone outside your industry for five seconds, then hide it. If they cannot tell you what you sell and who it is for, rewrite the headline." },
        ],
      },
      {
        id: "weak-cta",
        title: "2. There is no clear next step",
        blocks: [
          { t: "p", text: "A surprising number of sites end their pages without asking for anything. Others ask for five things at once: call us, email us, follow us, download a brochure, sign up for a newsletter. When everything is a priority, nothing is." },
          { t: "p", text: "Choose one primary action for each page, such as \"Book a free consultation\" or \"Get a quote\", and repeat it at natural decision points: after the hero, after your services, after proof, and at the end." },
        ],
      },
      {
        id: "no-proof",
        title: "3. You are asking for trust without earning it",
        blocks: [
          { t: "p", text: "Before someone hands over their details, they want evidence that you are real and that you have done this before. Generic stock photos and anonymous claims do the opposite." },
          { t: "ul", items: ["Show real work: projects, before and after examples, case studies.", "Use genuine reviews with names or company types, and link to where they live (Google, Trustpilot).", "Add the practical reassurances people look for: response times, guarantees, accreditations, a real address or phone number."] },
        ],
      },
      {
        id: "friction",
        title: "4. Your forms ask for too much",
        blocks: [
          { t: "p", text: "Every extra field is another reason to give up. If your enquiry form asks for budget, company size, how they heard about you and a detailed brief before you have even spoken, you are filtering out good leads along with bad ones." },
          { t: "p", text: "Start with the minimum you genuinely need to reply: name, email or phone, and a short message. You can qualify further on the first call, or with a short follow up question after they submit." },
        ],
      },
      {
        id: "mobile",
        title: "5. The mobile experience is an afterthought",
        blocks: [
          { t: "p", text: "For most service businesses, a large share of visitors arrive on a phone. If buttons are tiny, text needs zooming, or the phone number is not tappable, those visitors leave before they reach your form." },
          { t: "ul", items: ["Make phone numbers and WhatsApp links tap to call or chat.", "Keep buttons at least the size of a fingertip and well spaced.", "Check that forms work with the mobile keyboard and autofill."] },
        ],
      },
      {
        id: "speed",
        title: "6. The site is slow",
        blocks: [
          { t: "p", text: "Slow pages lose visitors before they see your offer. Oversized images, heavy themes and too many plugins or tracking scripts are the usual causes." },
          { t: "p", text: "Run your key pages through Google PageSpeed Insights. Compress and resize images, remove scripts you no longer use, and consider whether your platform or theme is holding you back." },
        ],
      },
      {
        id: "no-tracking",
        title: "7. You are not measuring the right thing",
        blocks: [
          { t: "p", text: "If you only look at visits, you cannot tell which pages produce enquiries. Set up conversion tracking for form submissions, calls and WhatsApp clicks so every change you make can be judged on results." },
          { t: "flow", caption: "What to track, from visit to lead", items: ["Visit", "Key page viewed", "CTA clicked", "Form submitted or call made", "Lead followed up"] },
        ],
      },
      {
        id: "where-to-start",
        title: "Where to start",
        blocks: [
          { t: "p", text: "You do not need to fix everything at once. In order of impact, most businesses should start with the headline and primary call to action, then proof, then form friction and mobile, then speed. Tracking should be set up first so you can see the difference each change makes." },
        ],
      },
    ],
    tools: ["Google Analytics 4", "Google Tag Manager", "Google Search Console", "PageSpeed Insights", "Microsoft Clarity"],
    faqs: [
      { q: "How long does it take to see more leads after fixing my website?", a: "Messaging and call to action changes can show results within weeks, as soon as enough visitors have seen them. Speed and SEO improvements usually take longer to reflect in traffic." },
      { q: "Do I need a full redesign to fix lead generation?", a: "Not always. Many sites improve significantly with clearer copy, better calls to action and simpler forms. A redesign makes sense when the structure or platform itself is the problem." },
      { q: "Is more traffic the answer?", a: "Only once your site converts the traffic it already has. Sending more visitors to a page that does not convert simply wastes more of your marketing budget." },
      { q: "What is a good conversion rate for a service website?", a: "It varies widely by industry, price point and traffic source, so the most useful benchmark is your own: measure today, make changes, and compare." },
    ],
    conclusion: [
      "A website that does not generate leads is not a lost cause. It is usually a clear message, one obvious next step and a little less friction away from doing its job.",
      "If you would like a second pair of eyes, we can review your site and show you exactly where visitors are dropping off and what to change first.",
    ],
    coverConcept: "A laptop showing a website with a glowing, empty contact form, while subtle connection lines lead away from it toward a phone and an inbox.",
    coverPrompt: "Premium dark studio scene, laptop displaying a minimal website with an empty contact form glowing in cobalt blue, faint connection lines to a smartphone and email icon, soft rim light, shallow depth of field, editorial tech photography, 16:9",
    related: ["anatomy-of-high-converting-business-website", "website-needs-more-than-good-design", "automated-sales-pipeline-lead-follow-up"],
  },

  {
    slug: "anatomy-of-high-converting-business-website",
    category: "web",
    title: "The Anatomy of a High-Converting Business Website: From First Visit to Customer Enquiry",
    seoTitle: "Anatomy of a High-Converting Business Website (Section by Section)",
    description: "A section by section breakdown of a business website that turns visitors into enquiries, from the hero and proof to services, FAQs and the contact flow.",
    primaryKeyword: "high converting business website",
    keywords: ["website structure for conversions", "business website sections", "homepage layout that converts", "website conversion optimisation"],
    excerpt: "What should actually be on your homepage, and in what order? A walk through every section of a site built to turn visitors into enquiries.",
    intro: [
      "High converting websites are rarely clever. They are clear. They answer the questions a visitor has, in the order they have them, and they make the next step obvious at every point.",
      "Below is the structure we use as a starting point for service business websites, section by section, with what each part needs to do.",
    ],
    takeaways: [
      "A good page follows the visitor’s thinking: what is this, is it for me, can I trust them, what do I do next.",
      "Each section has one job. If a section does not move the visitor forward, cut it.",
      "Proof belongs near the claims it supports, not hidden on a separate page.",
      "The contact flow is part of the design, not an afterthought.",
    ],
    sections: [
      {
        id: "journey",
        title: "The visitor journey your page should follow",
        blocks: [
          { t: "p", text: "Before choosing sections, map the questions a new visitor asks. Every effective page answers them in roughly this order." },
          { t: "flow", caption: "The questions a visitor asks, in order", items: ["What is this?", "Is it for me?", "Can I trust them?", "What will it cost me?", "What do I do next?"] },
        ],
      },
      {
        id: "hero",
        title: "The hero: what you do and for whom",
        blocks: [
          { t: "p", text: "The top of the page should state the outcome you deliver, who it is for, and offer one primary action. Supporting text adds one or two specifics, such as location, speed or specialism." },
          { t: "ul", items: ["Headline: the result, in plain language.", "Sub headline: who it is for and how you are different.", "Primary button: the single action you want most.", "A quiet trust signal: rating, client logos or years in business."] },
        ],
      },
      {
        id: "proof",
        title: "Proof, early",
        blocks: [
          { t: "p", text: "Place a strip of proof directly under the hero: recognisable client logos, a review score, or a short testimonial. Visitors are deciding whether to keep reading, and proof buys you their attention." },
        ],
      },
      {
        id: "services",
        title: "Services framed as problems solved",
        blocks: [
          { t: "p", text: "List your services as outcomes, not internal department names. Each card should say what problem it solves, who it suits, and link to a dedicated page with detail." },
          { t: "callout", title: "Tip", text: "Add a \"best for\" line to each service. It helps visitors self select in seconds and reduces unsuitable enquiries." },
        ],
      },
      {
        id: "work",
        title: "Work and case studies",
        blocks: [
          { t: "p", text: "Show real projects with enough context to be useful: who the client was, what the challenge was, what you delivered and what changed. A few strong case studies outperform a gallery of fifty thumbnails." },
        ],
      },
      {
        id: "process",
        title: "Process and what to expect",
        blocks: [
          { t: "p", text: "Uncertainty stops people enquiring. A simple three to five step process (call, plan, build, launch, support) shows the visitor exactly what happens after they get in touch." },
        ],
      },
      {
        id: "pricing",
        title: "Pricing signals",
        blocks: [
          { t: "p", text: "You do not have to publish a full price list, but giving a starting price or typical range helps visitors qualify themselves and makes the enquiry feel less risky." },
        ],
      },
      {
        id: "faqs",
        title: "FAQs that handle objections",
        blocks: [
          { t: "p", text: "Use FAQs to answer the doubts that stop people enquiring: timelines, ownership, what happens if something goes wrong, whether you work with businesses their size. These also help your search visibility." },
        ],
      },
      {
        id: "contact",
        title: "A contact flow that respects the visitor",
        blocks: [
          { t: "ul", items: ["Offer more than one way in: a short form, phone, and WhatsApp or chat.", "Say how quickly you reply, and then do it.", "After submission, show a clear confirmation and what happens next.", "Send an automatic acknowledgement so the lead knows you received it."] },
        ],
      },
    ],
    tools: ["Figma", "Next.js or WordPress", "Google Analytics 4", "HubSpot or a CRM", "Calendly"],
    faqs: [
      { q: "How long should a homepage be?", a: "As long as it needs to answer the visitor’s questions and no longer. For most service businesses that means six to nine focused sections." },
      { q: "Should I put prices on my website?", a: "Giving a starting price or range usually helps. It filters out poor fits and makes serious buyers more comfortable enquiring." },
      { q: "Do I need separate pages for each service?", a: "Yes, if you offer more than one. Dedicated pages let you answer specific questions in depth and rank for the searches each service attracts." },
    ],
    conclusion: [
      "A high converting website is a conversation in the right order. Answer what, who, why you and what next, back it up with proof, and make the final step effortless.",
      "If your current site skips steps in that conversation, our web design team can help restructure it around how your customers actually decide.",
    ],
    coverConcept: "An exploded, layered view of a website page, each section floating as a separate glass panel in sequence from hero to contact form.",
    coverPrompt: "Isometric exploded view of a modern website, sections as floating frosted glass layers from hero banner to contact form, cobalt and soft pink accents on a near black background, clean product render, 16:9",
    related: ["website-not-generating-leads", "build-professional-website-paying-customers", "website-redesign-vs-rebuild"],
  },

  {
    slug: "website-redesign-vs-rebuild",
    category: "web",
    title: "Website Redesign vs Complete Rebuild: How to Know What Your Business Actually Needs",
    seoTitle: "Website Redesign vs Rebuild: Which Does Your Business Need?",
    description: "Should you refresh your current website or start again? A practical guide to the signs, costs and risks of a redesign versus a full rebuild.",
    primaryKeyword: "website redesign vs rebuild",
    keywords: ["when to rebuild a website", "website redesign checklist", "should I redesign my website", "website migration SEO"],
    excerpt: "A fresh coat of paint or new foundations? How to tell whether your site needs a redesign or a full rebuild, before you spend a penny.",
    intro: [
      "When a website stops performing, the instinct is often to \"redo it\". But redoing can mean two very different projects: a redesign that improves what visitors see, or a rebuild that replaces what the site is built on.",
      "Choosing the wrong one is expensive. Redesign a site with broken foundations and the problems return. Rebuild a site that only needed better content and you have spent months on work that was not necessary.",
    ],
    takeaways: [
      "A redesign changes look, layout and content. A rebuild changes the platform, code and structure underneath.",
      "If your problems are about clarity and trust, a redesign is usually enough.",
      "If your problems are about speed, security, editing or integrations, you probably need a rebuild.",
      "Either way, protect your SEO with redirects and a migration plan.",
    ],
    sections: [
      {
        id: "difference",
        title: "The difference in plain terms",
        blocks: [
          { t: "compare", caption: "Redesign vs rebuild at a glance", head: ["Redesign", "Rebuild"], rows: [
            ["What changes", "Visual design, layout, copy, imagery", "Platform, code, structure, hosting"],
            ["Typical trigger", "Looks dated, unclear, low trust", "Slow, insecure, hard to edit, cannot integrate"],
            ["Effort", "Lower", "Higher"],
            ["SEO risk", "Low if URLs stay the same", "Higher without a migration plan"],
          ] },
        ],
      },
      {
        id: "redesign-signs",
        title: "Signs a redesign is enough",
        blocks: [
          { t: "ul", items: ["The site works and loads reasonably fast, but looks dated.", "Your services or positioning have changed and the copy no longer fits.", "Visitors do not understand what you offer quickly enough.", "You can edit content yourself without difficulty."] },
        ],
      },
      {
        id: "rebuild-signs",
        title: "Signs you need a rebuild",
        blocks: [
          { t: "ul", items: ["Pages are slow even after compressing images.", "Updates break things, or plugins and themes are no longer maintained.", "You rely on a developer for every small change.", "You need integrations (CRM, booking, payments) your platform cannot handle well.", "The site was built for desktop and patched for mobile."] },
          { t: "callout", tone: "warn", title: "Security matters", text: "A site on an outdated platform with unpatched plugins is a security risk, regardless of how it looks. That alone can justify a rebuild." },
        ],
      },
      {
        id: "decide",
        title: "A simple way to decide",
        blocks: [
          { t: "steps", items: [
            { title: "Audit performance", text: "Run PageSpeed Insights and check Search Console for errors. Poor scores on a simple page point to platform problems." },
            { title: "Audit editing", text: "Ask your team how long it takes to change a page or add a service. Pain here is a rebuild signal." },
            { title: "List what you need next", text: "Bookings, payments, a client portal, multiple languages. If your platform cannot support these, rebuild." },
            { title: "Compare the cost of patching", text: "If fixing the old site costs close to rebuilding it, rebuild." },
          ] },
        ],
      },
      {
        id: "seo",
        title: "Protecting your search rankings",
        blocks: [
          { t: "p", text: "Rankings are attached to URLs and content. When either changes, plan carefully: keep URLs where possible, set up 301 redirects for any that change, keep your best performing content, and resubmit your sitemap after launch." },
        ],
      },
    ],
    tools: ["Google Search Console", "PageSpeed Insights", "Screaming Frog", "Next.js", "WordPress", "Webflow"],
    faqs: [
      { q: "Will a rebuild hurt my Google rankings?", a: "It can if URLs change without redirects or important content is removed. With a proper migration plan, rankings typically hold and often improve thanks to better speed." },
      { q: "Can I keep my content during a rebuild?", a: "Yes. Good content can be migrated and improved. A rebuild is a chance to rewrite weak pages, not throw away strong ones." },
      { q: "Is a rebuild always more expensive?", a: "Up front, usually. Over a few years it can cost less than repeatedly patching an ageing site." },
    ],
    conclusion: [
      "Redesign when the problem is what visitors see. Rebuild when the problem is what the site is built on. Audit before you decide.",
      "Not sure which camp you are in? Our web design team can review your current site and recommend the smallest change that solves the real problem.",
    ],
    coverConcept: "A website wireframe being renovated: half the page polished and finished, the other half showing scaffolding and exposed structure.",
    coverPrompt: "Split composition of a website mockup, left half sleek and finished, right half exposed wireframe with scaffolding lines, architectural blueprint aesthetic, cobalt blue lines on dark background, 16:9",
    related: ["anatomy-of-high-converting-business-website", "website-needs-more-than-good-design", "custom-vs-ready-made-software"],
  },

  {
    slug: "build-professional-website-paying-customers",
    category: "web",
    title: "How to Build a Professional Website That Turns Visitors Into Paying Customers",
    seoTitle: "How to Build a Professional Website That Converts Visitors",
    description: "A step by step guide to planning, designing and launching a professional business website that turns visitors into paying customers.",
    primaryKeyword: "build a professional website",
    keywords: ["business website development process", "website planning checklist", "professional website design", "website that converts"],
    excerpt: "From goals and sitemap to launch and beyond: the process we follow to build websites that earn their keep.",
    intro: [
      "A professional website is not defined by animations or the newest framework. It is defined by whether it helps a stranger understand you, trust you and buy from you.",
      "Here is the process we follow to build websites with that goal, from the first conversation to the weeks after launch.",
    ],
    takeaways: [
      "Start with goals and customers, not colours and fonts.",
      "Write the content before you design the pages.",
      "Choose a platform your team can actually manage.",
      "Launch is the beginning: measure, learn and improve.",
    ],
    sections: [
      {
        id: "process",
        title: "The build process at a glance",
        blocks: [
          { t: "flow", caption: "From idea to a website that sells", items: ["Goals", "Content & structure", "Design", "Build", "Test", "Launch & improve"] },
        ],
      },
      {
        id: "goals",
        title: "Step 1: Define what the website must achieve",
        blocks: [
          { t: "p", text: "Decide on one or two measurable goals: booked calls, quote requests, online sales. Then describe your ideal customer, the problem they are trying to solve and the questions they ask before buying. Every later decision should serve these answers." },
        ],
      },
      {
        id: "content",
        title: "Step 2: Plan structure and write the content first",
        blocks: [
          { t: "p", text: "Create a simple sitemap: home, one page per service, work or case studies, about, contact, plus any landing pages for campaigns. Then write the core copy. Designing around real content produces clearer pages than filling lorem ipsum later." },
          { t: "callout", title: "Tip", text: "Gather your proof early: reviews, client logos, project photos and results you can verify. It is often the slowest thing to collect." },
        ],
      },
      {
        id: "design",
        title: "Step 3: Design for clarity and trust",
        blocks: [
          { t: "ul", items: ["Design mobile and desktop layouts intentionally, not one squeezed into the other.", "Use a consistent type scale and spacing so pages feel calm and credible.", "Make calls to action visually distinct and consistent across the site.", "Use real photography of your work and team wherever possible."] },
        ],
      },
      {
        id: "platform",
        title: "Step 4: Choose the right platform",
        blocks: [
          { t: "compare", caption: "Common platform choices", head: ["Best for", "Watch out for"], rows: [
            ["WordPress", "Content heavy sites, many plugins", "Plugin bloat, maintenance"],
            ["Webflow", "Design led marketing sites", "Complex logic, cost at scale"],
            ["Next.js (custom)", "Speed, custom features, integrations", "Needs a developer for structural changes"],
            ["Shopify", "Selling products online", "Less flexible for non store content"],
          ] },
        ],
      },
      {
        id: "build-test",
        title: "Step 5: Build, then test properly",
        blocks: [
          { t: "ul", items: ["Test on real phones, not just a resized browser.", "Check speed with PageSpeed Insights and fix the biggest issues.", "Submit every form and confirm the emails arrive.", "Check basic accessibility: contrast, keyboard navigation, alt text.", "Set up analytics and conversion tracking before launch."] },
        ],
      },
      {
        id: "launch",
        title: "Step 6: Launch, measure and improve",
        blocks: [
          { t: "p", text: "After launch, watch where visitors drop off, which pages lead to enquiries and what questions leads ask on calls. Feed those insights back into the copy and layout every month or quarter." },
        ],
      },
    ],
    tools: ["Figma", "Next.js", "WordPress", "Webflow", "Google Analytics 4", "Search Console"],
    faqs: [
      { q: "How long does it take to build a professional website?", a: "A focused small business site often takes a few weeks. Larger sites with custom features or many pages take longer. Content readiness is frequently the deciding factor." },
      { q: "Should I write my own website copy?", a: "You know your business best, so your input is essential. A professional writer or agency can shape it into clear, persuasive copy." },
      { q: "What should I prepare before contacting an agency?", a: "Your goals, a list of services, examples of sites you like, and any existing branding, photos and reviews." },
    ],
    conclusion: [
      "Professional websites come from a disciplined process: clear goals, real content, intentional design, the right platform and honest testing.",
      "If you want a website built this way, our web design and development team can take you from first plan to launch and beyond.",
    ],
    coverConcept: "A blueprint transforming into a finished website on a laptop, with a stream of small customer avatars flowing into a checkout or booking confirmation.",
    coverPrompt: "Cinematic product shot, technical blueprint lines morphing into a polished website on a laptop screen, small glowing customer icons flowing toward a booking confirmation, cobalt and white palette, dark background, 16:9",
    related: ["anatomy-of-high-converting-business-website", "website-redesign-vs-rebuild", "website-not-generating-leads"],
  },

  {
    slug: "website-needs-more-than-good-design",
    category: "web",
    title: "Why Your Business Website Needs More Than Just Good Design",
    seoTitle: "Why Your Website Needs More Than Good Design to Grow",
    description: "Beautiful websites still fail when strategy, speed, SEO and follow up are missing. Here is what a business website needs beyond good looks.",
    primaryKeyword: "website more than good design",
    keywords: ["website strategy", "website SEO basics", "website speed importance", "website and CRM integration"],
    excerpt: "A beautiful website that nobody finds, that loads slowly or that drops leads into an unread inbox is still a failing website.",
    intro: [
      "Good design matters. It builds trust in seconds and makes a business look established. But many beautiful websites still fail to bring in business.",
      "That is because design is only one layer. A website that grows a business also needs a strategy, a solid technical foundation, visibility in search and a system for what happens after someone enquires.",
    ],
    takeaways: [
      "Design earns attention. Strategy, content and systems turn attention into revenue.",
      "Speed, accessibility and SEO are invisible until they are missing.",
      "A website should connect to how you follow up leads, not end at a form.",
      "Treat your website as a living asset, not a one off project.",
    ],
    sections: [
      {
        id: "layers",
        title: "The layers of a website that works",
        blocks: [
          { t: "flow", caption: "Design is one layer of five", items: ["Strategy", "Content", "Design", "Technology", "Follow up systems"] },
        ],
      },
      {
        id: "strategy",
        title: "Strategy: who it is for and what it must do",
        blocks: [
          { t: "p", text: "Without a clear audience and goal, design decisions become matters of taste. With them, every element can be judged on whether it helps the right visitor take the right action." },
        ],
      },
      {
        id: "content",
        title: "Content that answers real questions",
        blocks: [
          { t: "p", text: "Customers search for answers: prices, timelines, comparisons, how something works. Pages that answer those questions clearly convert better and rank better than pages filled with generic claims." },
        ],
      },
      {
        id: "technical",
        title: "The invisible technical foundation",
        blocks: [
          { t: "ul", items: ["Speed: fast pages keep visitors and are favoured by search engines.", "Accessibility: readable contrast, keyboard navigation and alt text widen your audience.", "Security: maintained platforms, HTTPS and backups protect your reputation.", "Search basics: titles, descriptions, headings, structured data and a sitemap."] },
          { t: "callout", title: "Check yours", text: "Google Search Console is free and shows how your site appears in search, which pages have problems and what people searched before clicking." },
        ],
      },
      {
        id: "systems",
        title: "Systems for what happens after the enquiry",
        blocks: [
          { t: "p", text: "Many leads are lost after the form, not before it. Enquiries land in a shared inbox, nobody owns them, and replies go out days later. Connecting your website to a CRM or automated follow up means every lead gets an instant acknowledgement and a named owner." },
          { t: "flow", caption: "A connected enquiry", items: ["Form submitted", "Lead saved to CRM", "Instant confirmation", "Owner notified", "Follow up scheduled"] },
        ],
      },
      {
        id: "living",
        title: "A living asset",
        blocks: [
          { t: "p", text: "The businesses that get the most from their websites review them regularly: new case studies, updated pricing, fresh answers to common questions, and small tests to improve conversion. A website that never changes slowly falls behind." },
        ],
      },
    ],
    tools: ["Google Search Console", "PageSpeed Insights", "HubSpot", "Zapier or Make", "Google Analytics 4"],
    faqs: [
      { q: "Is good design still worth investing in?", a: "Yes. Design creates the first impression and trust. It just needs to be combined with strategy, content and solid technology to deliver results." },
      { q: "What is the easiest technical improvement to make?", a: "Image optimisation. Resizing and compressing images is often the quickest way to make a slow site noticeably faster." },
      { q: "How often should I update my website?", a: "Review key pages at least quarterly, and add new proof such as case studies and reviews whenever you have them." },
    ],
    conclusion: [
      "Great websites look good and work hard. They are built on a clear strategy, useful content, a fast and secure foundation, and systems that catch every lead.",
      "If your site looks the part but is not delivering, our team can help with the layers you cannot see.",
    ],
    coverConcept: "A sleek website facade on the surface, with a cutaway revealing the engine room beneath: gears, data lines, search and CRM icons working together.",
    coverPrompt: "Cutaway illustration of a modern website, polished interface on top, intricate glowing machinery beneath representing SEO, speed and CRM systems, cobalt and violet light, dark premium aesthetic, 16:9",
    related: ["website-not-generating-leads", "connect-website-crm-whatsapp-email", "anatomy-of-high-converting-business-website"],
  },
];
