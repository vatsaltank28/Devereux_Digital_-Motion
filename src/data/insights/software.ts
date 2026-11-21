import type { Article } from "./types";

/** Category 4: Web Applications & Custom Software (articles 17 to 21 of the content plan). */
export const softwareArticles: Article[] = [
  {
    slug: "off-the-shelf-software-vs-custom-application",
    category: "software",
    title: "When Off-the-Shelf Software Stops Working: Does Your Business Need a Custom Application?",
    seoTitle: "Does Your Business Need a Custom Application? Signs to Look For",
    description: "Workarounds, spreadsheets and too many subscriptions are signs your software no longer fits. Learn when a custom application makes sense.",
    primaryKeyword: "custom business application",
    keywords: ["outgrowing software", "custom web application", "SaaS limitations", "bespoke software for small business"],
    excerpt: "Off the shelf tools are great until your business stops fitting inside them. Here are the signs it is time to consider something built for you.",
    intro: [
      "Off the shelf software is usually the right starting point. It is quick to adopt, affordable and good enough for common needs. But as a business grows, its processes become more specific, and the software stops fitting.",
      "The symptoms creep in slowly: workarounds, extra spreadsheets, more subscriptions, staff copying information between systems. At some point, adapting the business to the software costs more than building software for the business.",
    ],
    takeaways: [
      "Workarounds and duplicate data entry are the clearest signs you have outgrown a tool.",
      "Custom does not have to mean replacing everything. Often it fills a gap between existing tools.",
      "Build custom where your process is a competitive advantage. Buy where it is a commodity.",
      "Start small: a focused first version proves value before a large investment.",
    ],
    sections: [
      {
        id: "signs",
        title: "Signs you are outgrowing your software",
        blocks: [
          { t: "ul", items: ["Staff keep spreadsheets alongside the software to track what it cannot.", "The same data is entered into several systems.", "You pay for multiple tools that each do part of a job.", "Key processes rely on one person who knows the workarounds.", "Customers experience delays or errors caused by your systems.", "You have asked vendors for features that never arrive."] },
        ],
      },
      {
        id: "options",
        title: "Your options, from light to heavy",
        blocks: [
          { t: "flow", caption: "Escalate only as far as you need", items: ["Configure better", "Integrate tools", "Add a custom module", "Build a full application"] },
          { t: "p", text: "Before building anything, check whether better configuration or integrations solve the problem. If not, a custom module, such as an internal dashboard or a portal, can bridge the gap without replacing systems that work well." },
        ],
      },
      {
        id: "build-vs-buy",
        title: "Build where you are different, buy where you are not",
        blocks: [
          { t: "p", text: "Accounting, email and payroll are the same in most businesses, so buying makes sense. But the way you quote, schedule, deliver or serve customers may be what sets you apart. That is where custom software can create a lasting advantage." },
          { t: "callout", title: "A useful question", text: "If a competitor copied this process exactly, would it matter? If yes, it may deserve software built around it." },
        ],
      },
      {
        id: "first-version",
        title: "Start with a focused first version",
        blocks: [
          { t: "steps", items: [
            { title: "Pick one painful process", text: "Choose the workflow that wastes the most time or causes the most errors." },
            { title: "Define the minimum", text: "List only the features needed to replace the workaround." },
            { title: "Build and test with real users", text: "Short cycles with your team catch problems early." },
            { title: "Expand from evidence", text: "Add features based on actual use, not assumptions." },
          ] },
        ],
      },
      {
        id: "considerations",
        title: "What to consider before you build",
        blocks: [
          { t: "ul", items: ["Ownership of the code and data.", "Hosting, security and backups.", "Ongoing maintenance and who supports it.", "Integrations with your existing tools.", "How the system will grow as the business grows."] },
        ],
      },
    ],
    tools: ["Next.js", "React", "Node.js", "PostgreSQL", "Supabase", "Vercel or AWS"],
    faqs: [
      { q: "Is custom software only for large companies?", a: "No. Modern frameworks and cloud platforms make focused custom applications practical for small and medium businesses, especially when they replace manual work." },
      { q: "How long does a custom application take to build?", a: "A focused first version can often be delivered in weeks to a few months, depending on complexity. Larger platforms take longer and are best built in stages." },
      { q: "Will I own the software?", a: "That depends on your agreement. Make sure your contract states that you own the code and data." },
    ],
    conclusion: [
      "Off the shelf software is a great start, but not always a great finish. When workarounds pile up, a focused custom application can remove them and give you a system that fits how you actually work.",
      "Our team can assess your current tools and help you decide whether to configure, integrate or build.",
    ],
    coverConcept: "A puzzle piece that does not fit a standard software window, next to a precisely cut custom piece glowing as it slots into place.",
    coverPrompt: "Conceptual 3D render of a generic software window with a mismatched puzzle piece, beside a precisely shaped glowing custom piece clicking into place, cobalt and white, clean dark background, 16:9",
    related: ["custom-vs-ready-made-software", "spreadsheet-to-web-application", "hidden-cost-manual-business-operations"],
  },

  {
    slug: "spreadsheet-to-web-application",
    category: "software",
    title: "From Spreadsheet to Software: How to Turn Manual Business Operations Into a Web Application",
    seoTitle: "From Spreadsheet to Web App: Turn Manual Work Into Software",
    description: "Running the business on spreadsheets? Learn how to turn spreadsheet based operations into a secure, multi user web application, step by step.",
    primaryKeyword: "spreadsheet to web application",
    keywords: ["replace spreadsheets with software", "internal tools", "convert Excel to web app", "business web application"],
    excerpt: "Your most important spreadsheet is probably a web app waiting to happen. Here is how to make the move safely.",
    intro: [
      "Spreadsheets are where many great business processes are born. They are flexible, familiar and free. But when several people depend on the same sheet every day, the cracks show: overwritten formulas, version confusion, no permissions and no audit trail.",
      "Turning that spreadsheet into a web application keeps the logic you have refined, while adding structure, security and automation.",
    ],
    takeaways: [
      "Your spreadsheet is a valuable specification. It shows the data, rules and workflow you already use.",
      "A web app adds users, permissions, validation, history and automation.",
      "Migrate one workflow at a time and run both in parallel briefly.",
      "Plan for reporting from day one so the data stays useful.",
    ],
    sections: [
      {
        id: "signs",
        title: "Signs your spreadsheet should become software",
        blocks: [
          { t: "ul", items: ["Several people edit it at once and changes get lost.", "Formulas break and nobody knows who changed them.", "You email copies around, or keep \"final_v7\" versions.", "Sensitive data is visible to everyone with the link.", "The sheet takes ages to load or regularly hits limits."] },
        ],
      },
      {
        id: "what-changes",
        title: "What a web application adds",
        blocks: [
          { t: "compare", caption: "Spreadsheet vs web application", head: ["Spreadsheet", "Web application"], rows: [
            ["Users", "Everyone sees everything", "Roles and permissions"],
            ["Data quality", "Anything can be typed anywhere", "Validated forms and rules"],
            ["History", "Limited version history", "Full audit trail"],
            ["Automation", "Manual or fragile scripts", "Built in notifications and workflows"],
            ["Access", "Desktop centric", "Any device, any location"],
          ] },
        ],
      },
      {
        id: "process",
        title: "The conversion process",
        blocks: [
          { t: "flow", caption: "From sheet to software", items: ["Study the sheet", "Model the data", "Design screens", "Build & import", "Run in parallel", "Switch over"] },
          { t: "steps", items: [
            { title: "Study the spreadsheet", text: "Identify each tab, column and formula, and what decisions they support." },
            { title: "Model the data", text: "Turn tabs into proper database tables with relationships, such as customers, jobs and invoices." },
            { title: "Design around tasks", text: "Create screens for what people actually do: add a job, approve a quote, update a status." },
            { title: "Import and validate", text: "Clean and import existing data, fixing duplicates and inconsistencies." },
            { title: "Run in parallel", text: "Use both for a short period to confirm the numbers match, then switch." },
          ] },
        ],
      },
      {
        id: "automation",
        title: "Add the automation spreadsheets could not",
        blocks: [
          { t: "p", text: "Once data lives in a proper application, automation becomes straightforward: email the customer when a job status changes, alert a manager when a value crosses a threshold, generate a PDF report every Monday." },
        ],
      },
      {
        id: "reporting",
        title: "Keep reporting easy",
        blocks: [
          { t: "p", text: "People love spreadsheets because they can slice the data. Give them dashboards for the common questions, and an export or connection to tools like Looker Studio or Power BI for the rest." },
          { t: "callout", title: "Low code or custom?", text: "Low code tools such as Airtable or Retool can be a good bridge for simple cases. Custom code makes more sense for customer facing apps, complex rules or larger teams." },
        ],
      },
    ],
    tools: ["Next.js", "PostgreSQL", "Supabase", "Airtable", "Retool", "Looker Studio"],
    faqs: [
      { q: "Will we lose our existing spreadsheet data?", a: "No. Existing data is cleaned and imported into the new system, and you can keep the original as an archive." },
      { q: "Can we still export to Excel?", a: "Yes. Exports and reporting connections can be built in so data remains easy to analyse." },
      { q: "Is low code enough, or do we need custom development?", a: "Low code suits simple internal tools. Custom development fits complex logic, customer facing access, larger teams or strict security needs." },
    ],
    conclusion: [
      "Your spreadsheet already captures how your business works. Turning it into a web application keeps that knowledge while adding the reliability, security and automation a growing team needs.",
      "Our team can review your spreadsheets and plan the move to a web application that fits your operations.",
    ],
    coverConcept: "A grid of spreadsheet cells lifting off the page and reassembling into a clean, modern web dashboard.",
    coverPrompt: "Spreadsheet grid cells floating upward and reassembling into a sleek modern web application dashboard, transformation concept, cobalt and white light, premium 3D render, dark background, 16:9",
    related: ["off-the-shelf-software-vs-custom-application", "customer-portal-business-operations", "hidden-cost-manual-business-operations"],
  },

  {
    slug: "customer-portal-business-operations",
    category: "software",
    title: "How to Build a Customer Portal That Improves Your Business Operations",
    seoTitle: "How to Build a Customer Portal That Improves Operations",
    description: "A customer portal lets clients self serve orders, documents, bookings and updates. Learn what to include and how to build one that reduces admin.",
    primaryKeyword: "customer portal",
    keywords: ["client portal development", "self service portal", "customer portal features", "B2B customer portal"],
    excerpt: "Fewer \"just checking in\" emails, faster answers for clients. Here is how to plan and build a portal customers actually use.",
    intro: [
      "Every business answers the same customer questions repeatedly: where is my order, can you resend that invoice, what stage is my project at, can I change my booking. Each request takes a few minutes, and together they consume hours every week.",
      "A customer portal gives clients a secure place to find those answers themselves, while giving your team a cleaner, more organised way to share information.",
    ],
    takeaways: [
      "Build the portal around the questions customers ask most often.",
      "Self service should be faster than emailing you, or customers will not use it.",
      "Connect the portal to your existing systems so information stays accurate.",
      "Security and permissions are essential from the start.",
    ],
    sections: [
      {
        id: "why",
        title: "What a portal does for both sides",
        blocks: [
          { t: "compare", caption: "Benefits of a customer portal", head: ["For customers", "For your team"], rows: [
            ["Information", "Answers any time, without waiting", "Fewer repetitive emails and calls"],
            ["Documents", "Invoices and files in one place", "No more resending attachments"],
            ["Actions", "Book, reorder, approve, pay online", "Structured requests instead of messages"],
            ["Visibility", "Clear status updates", "One source of truth"],
          ] },
        ],
      },
      {
        id: "features",
        title: "Common portal features",
        blocks: [
          { t: "ul", items: ["Secure login, including password free options.", "Dashboard with current orders, projects or bookings.", "Documents: invoices, contracts, reports, files.", "Requests and support tickets with status tracking.", "Online payments and payment history.", "Notifications by email when something changes."] },
          { t: "callout", title: "Start with the top three", text: "Look at your inbox and phone log. The three most common customer requests should define your first version." },
        ],
      },
      {
        id: "integrations",
        title: "Connect it to your existing systems",
        blocks: [
          { t: "p", text: "A portal is only useful if its information is accurate. Rather than maintaining data twice, connect it to the systems you already use: CRM for customer details, accounting for invoices, project or order systems for status." },
          { t: "flow", caption: "Where portal data comes from", items: ["CRM", "Accounting", "Orders or projects", "Customer portal", "Customer"] },
        ],
      },
      {
        id: "build",
        title: "How to build it",
        blocks: [
          { t: "steps", items: [
            { title: "Define users and permissions", text: "Who logs in, what can they see, and can several people from one client share access?" },
            { title: "Design key journeys", text: "Map the top tasks and make each possible in a few clicks on any device." },
            { title: "Build the foundation", text: "Authentication, database and integrations come first." },
            { title: "Pilot with friendly clients", text: "Launch to a small group, gather feedback and refine." },
            { title: "Roll out with guidance", text: "Introduce it with a short guide, and point customers to it when they email." },
          ] },
        ],
      },
      {
        id: "security",
        title: "Security essentials",
        blocks: [
          { t: "ul", items: ["Strong authentication and session management.", "Customers can only ever see their own data.", "Encrypted connections and secure file storage.", "Activity logs and regular security updates."] },
        ],
      },
    ],
    tools: ["Next.js", "Supabase or Firebase", "Auth0 or Clerk", "Stripe", "HubSpot", "Xero"],
    faqs: [
      { q: "Will customers actually use a portal?", a: "They will if it is quicker than contacting you. Focus on the tasks they do most and make them simple on mobile." },
      { q: "Can a portal integrate with our current software?", a: "Usually yes, through APIs or integration tools. This keeps information accurate without double entry." },
      { q: "Is a portal secure enough for sensitive documents?", a: "With proper authentication, permissions, encryption and maintenance, portals can securely handle sensitive business documents." },
    ],
    conclusion: [
      "A well designed customer portal gives clients instant answers and gives your team back the hours spent on repetitive requests.",
      "Our team can design and build a portal around your customers’ most common needs, connected to the systems you already use.",
    ],
    coverConcept: "A secure, glowing doorway opening onto a clean dashboard with orders, documents and status cards, a key icon subtly integrated.",
    coverPrompt: "Elegant glowing doorway opening into a clean customer dashboard with order cards, documents and status timeline, subtle key motif, cobalt and soft white light, premium 3D render, dark background, 16:9",
    related: ["spreadsheet-to-web-application", "connect-website-crm-whatsapp-email", "building-saas-product-idea-to-platform"],
  },

  {
    slug: "building-saas-product-idea-to-platform",
    category: "software",
    title: "Building a SaaS Product: From Business Idea to a Working Software Platform",
    seoTitle: "Building a SaaS Product: From Idea to Working Platform",
    description: "A practical guide to building a SaaS product: validating the idea, scoping an MVP, choosing the stack, handling billing and launching.",
    primaryKeyword: "building a SaaS product",
    keywords: ["SaaS MVP development", "how to build a SaaS", "SaaS tech stack", "SaaS subscription billing"],
    excerpt: "Turning an idea into software people pay for is a sequence of smart, small bets. Here is the path from first idea to first paying customer.",
    intro: [
      "Many SaaS ideas start inside an existing business: a tool built for your own operations that others in your industry would pay for. Others start from a problem spotted in the market.",
      "Either way, the path from idea to platform is less about writing lots of code and more about building the right small thing, getting it in front of real users, and improving from there.",
    ],
    takeaways: [
      "Validate demand before building: talk to potential customers and test willingness to pay.",
      "Build a minimum viable product that solves one problem well.",
      "Plan multi tenancy, authentication and billing early.",
      "Launch small, measure usage and iterate quickly.",
    ],
    sections: [
      {
        id: "path",
        title: "The SaaS path",
        blocks: [
          { t: "flow", caption: "From idea to platform", items: ["Validate", "Scope MVP", "Design", "Build", "Launch beta", "Iterate & scale"] },
        ],
      },
      {
        id: "validate",
        title: "Step 1: Validate the problem and the market",
        blocks: [
          { t: "p", text: "Speak to potential customers before writing code. Ask how they solve the problem today, what it costs them and what they would pay to fix it. A landing page with a waitlist or pre orders can test interest further." },
          { t: "callout", title: "Strong signal", text: "People offering to pay, or committing time to a pilot, is far stronger validation than people saying the idea sounds interesting." },
        ],
      },
      {
        id: "mvp",
        title: "Step 2: Scope the MVP",
        blocks: [
          { t: "p", text: "The minimum viable product solves the core problem for a specific type of customer, and nothing more. List every feature you imagine, then cut it back to what is essential for someone to get value and pay." },
        ],
      },
      {
        id: "foundations",
        title: "Step 3: Get the SaaS foundations right",
        blocks: [
          { t: "ul", items: ["Multi tenancy: each customer’s data is isolated from others.", "Authentication: secure sign up, login, team invites and roles.", "Billing: subscriptions, trials, upgrades and invoices through a provider like Stripe.", "Onboarding: a first run experience that shows value quickly.", "Analytics: understand how customers use the product."] },
        ],
      },
      {
        id: "stack",
        title: "Step 4: Choose a sensible stack",
        blocks: [
          { t: "p", text: "Choose proven, well supported technology over the newest option. A common modern stack is a React based front end such as Next.js, a PostgreSQL database, managed authentication, Stripe for billing and a cloud platform for hosting. The best stack is one your team can maintain." },
        ],
      },
      {
        id: "launch",
        title: "Step 5: Launch a beta and iterate",
        blocks: [
          { t: "steps", items: [
            { title: "Private beta", text: "Invite a small group of target customers and support them closely." },
            { title: "Measure activation", text: "Track whether users reach the moment where they get real value." },
            { title: "Fix friction", text: "Improve onboarding and the most used features first." },
            { title: "Open up gradually", text: "Expand access as the product becomes stable and valuable." },
          ] },
        ],
      },
      {
        id: "scale",
        title: "Step 6: Prepare to scale",
        blocks: [
          { t: "p", text: "As customers grow, invest in performance, monitoring, backups, security reviews and customer support processes. These are rarely exciting, but they are what makes customers trust your platform with their business." },
        ],
      },
    ],
    tools: ["Next.js", "PostgreSQL", "Supabase", "Clerk or Auth0", "Stripe Billing", "PostHog", "Vercel or AWS"],
    faqs: [
      { q: "How much does it cost to build a SaaS MVP?", a: "It depends heavily on scope and complexity. Keeping the MVP tightly focused is the most effective way to control cost and time." },
      { q: "Should I use no code tools for my SaaS?", a: "No code can be useful for validating an idea quickly. Products that need scale, complex logic or strong security usually move to custom code." },
      { q: "When should I start charging?", a: "As early as you reasonably can. Paying customers give the clearest feedback on whether the product delivers value." },
    ],
    conclusion: [
      "Successful SaaS products start small: a validated problem, a focused MVP, solid foundations and fast iteration with real users.",
      "Our team can help you scope, design and build your SaaS platform, from first version to a product ready to grow.",
    ],
    coverConcept: "A lightbulb idea transforming step by step into layered software screens and a subscription dashboard rising upward.",
    coverPrompt: "Glowing lightbulb dissolving into layered floating software interface screens rising into a subscription analytics dashboard, startup growth concept, cobalt and violet light, premium 3D render, dark background, 16:9",
    related: ["custom-vs-ready-made-software", "customer-portal-business-operations", "off-the-shelf-software-vs-custom-application"],
  },

  {
    slug: "custom-vs-ready-made-software",
    category: "software",
    title: "Custom Software vs Ready-Made Software: Which Is the Better Investment for Your Business?",
    seoTitle: "Custom vs Ready-Made Software: Which Is the Better Investment?",
    description: "Compare custom and ready made software on cost, speed, flexibility, ownership and risk, and learn how to choose the right investment for your business.",
    primaryKeyword: "custom software vs off the shelf",
    keywords: ["bespoke software cost", "SaaS vs custom software", "build or buy software", "software investment decision"],
    excerpt: "Build or buy? A clear comparison of cost, speed, flexibility and risk, plus a simple framework to decide.",
    intro: [
      "Few technology decisions feel as big as choosing between building custom software and buying a ready made product. Both can be the right answer. Both can be expensive mistakes when chosen for the wrong reasons.",
      "The useful question is not which is better in general, but which is the better investment for a particular process in your business.",
    ],
    takeaways: [
      "Ready made software is faster and cheaper to start, but you adapt to it.",
      "Custom software costs more upfront, but adapts to you and can become an asset.",
      "Compare total cost over several years, not just the first invoice.",
      "Many businesses benefit from a mix: ready made for standard needs, custom for what sets them apart.",
    ],
    sections: [
      {
        id: "compare",
        title: "The comparison",
        blocks: [
          { t: "compare", caption: "Custom vs ready made software", head: ["Ready made", "Custom"], rows: [
            ["Time to start", "Days or weeks", "Weeks to months"],
            ["Upfront cost", "Low", "Higher"],
            ["Ongoing cost", "Subscriptions, often per user", "Hosting and maintenance"],
            ["Fit to your process", "You adapt to it", "Built around you"],
            ["Ownership", "Vendor controls roadmap", "You control the product"],
            ["Competitive advantage", "Same as competitors", "Can be unique"],
          ] },
        ],
      },
      {
        id: "ready-made",
        title: "When ready made wins",
        blocks: [
          { t: "ul", items: ["The process is standard, like accounting, payroll or email.", "You need something working this month.", "Your team is small and needs are simple.", "A good product exists that fits most of your needs without workarounds."] },
        ],
      },
      {
        id: "custom",
        title: "When custom wins",
        blocks: [
          { t: "ul", items: ["Your process is unique or a source of competitive advantage.", "You run several tools plus spreadsheets to do one job.", "Per user subscription costs are growing quickly with your team.", "You need tight integration between systems, or customer facing functionality.", "You want to own the product, or even sell it to others."] },
        ],
      },
      {
        id: "tco",
        title: "Think in total cost of ownership",
        blocks: [
          { t: "p", text: "Compare costs over three to five years. For ready made software, include subscriptions as your team grows, add ons, integration tools and the time spent on workarounds. For custom software, include the build, hosting, maintenance and improvements." },
          { t: "callout", title: "Hidden costs on both sides", text: "Ready made: workarounds and lock in. Custom: maintenance and the need for a reliable development partner. Count both." },
        ],
      },
      {
        id: "framework",
        title: "A simple decision framework",
        blocks: [
          { t: "steps", items: [
            { title: "Is it standard?", text: "If the process is the same everywhere, buy." },
            { title: "Does a good product fit 80% or more?", text: "If yes, buy and integrate." },
            { title: "Is it a competitive advantage?", text: "If yes, consider building." },
            { title: "Compare five year cost", text: "Include workarounds and growth, not just licence fees." },
            { title: "Start small", text: "If building, prove value with a focused first version." },
          ] },
        ],
      },
      {
        id: "hybrid",
        title: "The hybrid approach",
        blocks: [
          { t: "p", text: "Most businesses end up with a mix: proven products for standard functions, connected by integrations, plus custom software where it creates the most value. That balance gives speed where it matters and control where it counts." },
          { t: "flow", caption: "A typical hybrid setup", items: ["Ready made CRM", "Ready made accounting", "Integrations", "Custom portal or app", "Unified operations"] },
        ],
      },
    ],
    tools: ["HubSpot", "Xero", "Shopify", "Next.js", "PostgreSQL", "Zapier or Make"],
    faqs: [
      { q: "Is custom software always more expensive?", a: "Upfront, usually. Over several years, especially with growing teams and per user pricing, custom can cost the same or less while fitting better." },
      { q: "What if the developer who built our custom software leaves?", a: "Choose well documented, mainstream technology, ensure you own the code, and work with a partner who documents and supports what they build." },
      { q: "Can we start with ready made and move to custom later?", a: "Yes. Many businesses do exactly that once their processes are proven and the limitations become clear." },
    ],
    conclusion: [
      "Buy where you are like everyone else. Build where you are different. Judge both on total cost over time and how well they fit the way you work.",
      "Our team can help you weigh build versus buy for your specific processes, and build the custom pieces where they make sense.",
    ],
    coverConcept: "A balanced scale with a boxed software package on one side and a custom crafted glowing component on the other.",
    coverPrompt: "Elegant balance scale weighing a generic boxed software package against a precisely crafted glowing custom software component, decision concept, cobalt and white light, premium 3D render, dark background, 16:9",
    related: ["off-the-shelf-software-vs-custom-application", "building-saas-product-idea-to-platform", "website-redesign-vs-rebuild"],
  },
];
