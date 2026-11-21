import type { Article } from "./types";

/** Category 2: E-commerce Development (articles 6 to 10 of the content plan). */
export const ecommerceArticles: Article[] = [
  {
    slug: "online-store-visitors-but-no-sales",
    category: "ecommerce",
    title: "Why Your Online Store Gets Visitors but Not Enough Sales",
    seoTitle: "Online Store Getting Traffic but No Sales? Here Is Why",
    description: "Visitors browse but do not buy? Learn the most common reasons online stores underperform, from product pages to checkout, and how to fix them.",
    primaryKeyword: "online store traffic but no sales",
    keywords: ["ecommerce conversion rate", "why customers abandon cart", "product page optimisation", "Shopify store not selling"],
    excerpt: "Traffic that browses but never buys is a signal, not bad luck. Here is where online stores usually leak sales, and how to plug the gaps.",
    intro: [
      "Seeing visitors in your store analytics but very few orders is frustrating, especially when you are paying for that traffic with ads or social content.",
      "The good news is that a store with traffic has already solved the hardest problem. The job now is to find where interested shoppers lose confidence, and fix those moments one by one.",
    ],
    takeaways: [
      "Most lost sales happen on product pages and at checkout, not on the homepage.",
      "Shoppers buy when they trust the product, the price and the delivery. Make all three obvious.",
      "Unexpected costs and forced account creation are classic checkout killers.",
      "Look at your funnel step by step to see exactly where people drop off.",
    ],
    sections: [
      {
        id: "find-the-leak",
        title: "First, find where shoppers drop off",
        blocks: [
          { t: "p", text: "Before changing anything, look at your funnel. Shopify, WooCommerce and Google Analytics 4 can all show how many visitors view a product, add to cart, start checkout and complete an order. The biggest drop is where to start." },
          { t: "flow", caption: "The e-commerce funnel", items: ["Visit", "View product", "Add to cart", "Start checkout", "Purchase"] },
        ],
      },
      {
        id: "traffic-fit",
        title: "1. The traffic does not match the offer",
        blocks: [
          { t: "p", text: "If an ad promises one thing and the landing page shows another, visitors leave. Make sure each campaign lands on the most relevant product or collection, not just the homepage, and that the price and offer match what the ad said." },
        ],
      },
      {
        id: "product-pages",
        title: "2. Product pages do not answer buying questions",
        blocks: [
          { t: "p", text: "Online shoppers cannot touch the product, so the page has to do that work. Thin descriptions and a single photo leave too many doubts." },
          { t: "ul", items: ["Several high quality images, including scale and the product in use.", "Clear size, fit or compatibility information.", "Delivery times and costs shown on the page, not only at checkout.", "Returns policy summarised in one line near the add to cart button.", "Real reviews, ideally with photos."] },
          { t: "callout", title: "Quick win", text: "Add a short line under the price that states your real delivery and returns policy. It answers two of the biggest doubts at the moment of decision." },
        ],
      },
      {
        id: "trust",
        title: "3. The store does not feel trustworthy",
        blocks: [
          { t: "p", text: "New brands in particular need to work harder for trust. Recognisable payment logos, a real contact page, clear policies and genuine reviews all help. So does a fast, polished site that works perfectly on mobile." },
        ],
      },
      {
        id: "checkout",
        title: "4. Checkout creates friction",
        blocks: [
          { t: "ul", items: ["Surprise shipping costs or taxes revealed at the last step.", "Forcing shoppers to create an account before paying.", "Too few payment options, especially wallets like Apple Pay, Google Pay and PayPal.", "Long forms with fields you do not need.", "Errors that clear the form or are hard to understand on mobile."] },
          { t: "p", text: "Offering guest checkout and express wallets is one of the simplest changes with a meaningful effect, because returning shoppers can pay without typing anything." },
        ],
      },
      {
        id: "speed",
        title: "5. The store is slow on phones",
        blocks: [
          { t: "p", text: "Large product images, heavy apps and multiple tracking scripts slow stores down, especially on mobile data. Audit installed apps, remove the ones you no longer use, and make sure images are compressed and served in modern formats." },
        ],
      },
      {
        id: "recover",
        title: "6. Nobody follows up abandoned carts",
        blocks: [
          { t: "p", text: "Many shoppers who leave mid checkout were genuinely interested. An automated abandoned cart email or SMS sequence, sent within hours, reminds them what they left behind and answers common hesitations." },
        ],
      },
    ],
    tools: ["Shopify Analytics", "Google Analytics 4", "Klaviyo", "Hotjar or Microsoft Clarity", "PageSpeed Insights"],
    faqs: [
      { q: "What is a normal e-commerce conversion rate?", a: "It varies a lot by industry, price and traffic source. Rather than chasing a generic number, track your own rate over time and test improvements against it." },
      { q: "Should I offer free shipping?", a: "Unexpected delivery costs are a common reason for abandoned checkouts. A free shipping threshold or clearly stated costs on the product page often help." },
      { q: "Do reviews really affect sales?", a: "Shoppers rely on other customers’ experiences when they cannot see the product in person, so genuine reviews are one of the strongest trust signals a store can have." },
    ],
    conclusion: [
      "A store with visitors but few sales is usually one or two fixable problems away from performing. Find the biggest drop in your funnel, answer the questions shoppers have at that moment, and remove friction.",
      "If you would like help finding and fixing those leaks, our e-commerce team can audit your store and prioritise the changes that matter most.",
    ],
    coverConcept: "A busy online storefront with many shopper cursors on product cards, but an almost empty checkout lane highlighted in the foreground.",
    coverPrompt: "Stylised 3D render of an online storefront on a phone, many glowing cursor dots hovering over product cards, a nearly empty checkout path in the foreground lit in cobalt, premium dark background, 16:9",
    related: ["anatomy-of-high-converting-ecommerce-store", "ecommerce-retention-repeat-customers", "website-not-generating-leads"],
  },

  {
    slug: "anatomy-of-high-converting-ecommerce-store",
    category: "ecommerce",
    title: "The Anatomy of a High-Converting E-commerce Store: From Product Discovery to Checkout",
    seoTitle: "Anatomy of a High-Converting E-commerce Store (Full Breakdown)",
    description: "A page by page breakdown of a high converting online store: navigation, collections, product pages, cart and checkout, and what each must do.",
    primaryKeyword: "high converting ecommerce store",
    keywords: ["ecommerce store design", "product page layout", "ecommerce checkout best practices", "online store structure"],
    excerpt: "From the homepage to the thank you page, here is what every part of a store needs to do to turn browsers into buyers.",
    intro: [
      "Great online stores feel effortless. Shoppers find what they want quickly, understand it fully, and pay without thinking twice. That feeling is designed, page by page.",
      "Here is how we break a store down, from the first click to the order confirmation.",
    ],
    takeaways: [
      "Discovery should be fast: clear navigation, smart collections and good search.",
      "The product page is your salesperson. Images, details, proof and delivery info all belong there.",
      "Cart and checkout should remove doubts, not add steps.",
      "The order confirmation is the start of the next sale.",
    ],
    sections: [
      {
        id: "path",
        title: "The path to purchase",
        blocks: [
          { t: "flow", caption: "Every store page has one job", items: ["Discover", "Compare", "Decide", "Pay", "Return"] },
        ],
      },
      {
        id: "homepage",
        title: "Homepage and navigation: help people find their way",
        blocks: [
          { t: "ul", items: ["A clear value proposition: what you sell and why buy from you.", "Navigation organised the way customers think (by need, use or style), not by internal SKU groups.", "Prominent search on stores with many products.", "Best sellers and featured collections to shortcut decisions."] },
        ],
      },
      {
        id: "collections",
        title: "Collection pages: make comparison easy",
        blocks: [
          { t: "p", text: "Collection pages should let shoppers narrow choices quickly. Useful filters (size, colour, price, use case), consistent product images and visible prices and ratings on each card help visitors shortlist without opening every product." },
        ],
      },
      {
        id: "product",
        title: "Product pages: answer every question",
        blocks: [
          { t: "steps", items: [
            { title: "Visuals", text: "Multiple images, zoom, a short video if possible, and the product in real use." },
            { title: "The essentials", text: "Price, variants, stock status and a clear add to cart button, all visible without scrolling on mobile." },
            { title: "Reassurance", text: "Delivery time and cost, returns policy and secure payment, right beside the button." },
            { title: "Detail and proof", text: "Benefits first, then specifications, followed by genuine reviews and FAQs." },
          ] },
          { t: "callout", title: "Comparison tables sell", text: "If you compete on quality, a simple \"us vs typical alternatives\" table can communicate value faster than paragraphs of copy." },
        ],
      },
      {
        id: "cart",
        title: "Cart: confirm the decision",
        blocks: [
          { t: "p", text: "The cart should confirm what they are buying, show the total including delivery, and offer relevant add ons without pushing. A slide out cart keeps shoppers on the page and reduces the feeling of leaving." },
        ],
      },
      {
        id: "checkout",
        title: "Checkout: remove every unnecessary step",
        blocks: [
          { t: "ul", items: ["Guest checkout as the default option.", "Express wallets (Apple Pay, Google Pay, Shop Pay, PayPal).", "Address autocomplete and minimal fields.", "Clear error messages and no surprises in the total."] },
        ],
      },
      {
        id: "after",
        title: "Confirmation: the first step of the next order",
        blocks: [
          { t: "p", text: "A clear confirmation page and email with order details, delivery expectations and support contact reduce anxiety. It is also the moment to invite an account creation or a follow on purchase." },
        ],
      },
    ],
    tools: ["Shopify", "WooCommerce", "Klaviyo", "Judge.me or Okendo", "Google Analytics 4"],
    faqs: [
      { q: "Which page matters most in an online store?", a: "Usually the product page, because that is where the buying decision happens. Collection pages and checkout come close behind." },
      { q: "Should I use a slide out cart or a cart page?", a: "A slide out cart keeps shoppers browsing and works well for most stores. Larger, considered purchases sometimes benefit from a full cart page." },
      { q: "How many images should a product have?", a: "Enough to answer visual questions: front, back, detail, scale and in use. For most products that means four to eight." },
    ],
    conclusion: [
      "A high converting store is a sequence of small, deliberate decisions: easy discovery, complete product pages, a reassuring cart and a frictionless checkout.",
      "If your store is missing pieces of that sequence, our e-commerce team can help design and build each stage properly.",
    ],
    coverConcept: "A product journey drawn as a glowing path through floating store screens: homepage, collection grid, product page, cart and checkout confirmation.",
    coverPrompt: "Floating smartphone screens arranged in a curved path showing homepage, product grid, product detail, cart and order confirmation, connected by a glowing cobalt line, clean studio render, dark background, 16:9",
    related: ["online-store-visitors-but-no-sales", "online-store-automated-orders-payments-inventory", "ecommerce-retention-repeat-customers"],
  },

  {
    slug: "online-store-automated-orders-payments-inventory",
    category: "ecommerce",
    title: "How to Build an Online Store With Automated Orders, Payments and Inventory",
    seoTitle: "Build an Online Store With Automated Orders, Payments & Stock",
    description: "Learn how to set up an online store where orders, payments and stock levels update automatically, so you spend less time on admin and more on growth.",
    primaryKeyword: "automated online store",
    keywords: ["ecommerce inventory automation", "automated order processing", "Shopify automation", "payment gateway integration"],
    excerpt: "Stop copying orders between systems. Here is how to build a store where payments, stock and fulfilment talk to each other automatically.",
    intro: [
      "Many small online businesses start the same way: a store, a payment account and a spreadsheet for stock. It works until order volume grows, and suddenly someone spends hours every day updating stock, chasing payments and copying addresses.",
      "Building automation in from the start, or adding it now, means each order flows through the business without anyone retyping it.",
    ],
    takeaways: [
      "Choose a platform with reliable built in payments and inventory before adding extras.",
      "Keep one source of truth for stock, synced to every channel you sell on.",
      "Automate the predictable steps: confirmation, invoicing, fulfilment requests, low stock alerts.",
      "Add complexity only where volume justifies it.",
    ],
    sections: [
      {
        id: "foundations",
        title: "The automated store at a glance",
        blocks: [
          { t: "flow", caption: "One order, no manual steps", items: ["Customer pays", "Stock reduced", "Invoice and confirmation sent", "Fulfilment notified", "Tracking emailed"] },
        ],
      },
      {
        id: "platform",
        title: "Step 1: Pick a platform that does the basics well",
        blocks: [
          { t: "p", text: "Shopify, WooCommerce and BigCommerce all include payments, order management and inventory tracking. For most small and mid sized stores, Shopify gives the most reliable automation with the least maintenance. WooCommerce suits businesses already invested in WordPress that want full control." },
        ],
      },
      {
        id: "payments",
        title: "Step 2: Set up payments properly",
        blocks: [
          { t: "ul", items: ["Use a mainstream gateway such as Shopify Payments, Stripe or PayPal.", "Enable express wallets so returning shoppers pay in one tap.", "Configure taxes and currencies for the markets you sell to.", "Turn on automatic payment capture and fraud checks provided by your gateway."] },
        ],
      },
      {
        id: "inventory",
        title: "Step 3: Make stock a single source of truth",
        blocks: [
          { t: "p", text: "If you sell on your website, marketplaces and in person, stock must be shared. Inventory apps and multichannel tools keep counts in sync so an item sold on one channel disappears from the others." },
          { t: "callout", tone: "warn", title: "Avoid overselling", text: "Set low stock thresholds and automatic alerts. Overselling creates refunds, unhappy customers and poor reviews." },
        ],
      },
      {
        id: "fulfilment",
        title: "Step 4: Automate fulfilment and communication",
        blocks: [
          { t: "steps", items: [
            { title: "Shipping labels", text: "Connect a shipping app so labels and rates are generated from the order automatically." },
            { title: "Third party logistics", text: "If you use a warehouse partner, orders can be sent to them automatically through an integration." },
            { title: "Customer updates", text: "Confirmation, shipping and delivery emails or SMS go out on their own, with tracking links." },
          ] },
        ],
      },
      {
        id: "accounting",
        title: "Step 5: Connect accounting",
        blocks: [
          { t: "p", text: "Syncing orders, fees and refunds to accounting software such as Xero or QuickBooks removes hours of manual bookkeeping and makes tax returns far simpler." },
        ],
      },
      {
        id: "workflows",
        title: "Step 6: Add custom workflows where they pay off",
        blocks: [
          { t: "p", text: "Once the basics run smoothly, tools like Shopify Flow, Zapier or Make can handle specific rules: tag VIP customers, route wholesale orders, alert the team about high value purchases, or reorder from suppliers when stock is low." },
        ],
      },
    ],
    tools: ["Shopify", "WooCommerce", "Stripe", "Shopify Flow", "Zapier or Make", "Xero or QuickBooks", "ShipStation"],
    faqs: [
      { q: "Is Shopify or WooCommerce better for automation?", a: "Shopify offers more reliable automation out of the box with less maintenance. WooCommerce is more flexible but needs more care to keep plugins and integrations working." },
      { q: "Can I sync stock between my website and Amazon or eBay?", a: "Yes. Multichannel inventory tools keep stock levels synchronised across your store and marketplaces." },
      { q: "When should I invest in custom automation?", a: "When a repetitive task is taking hours each week or causing errors, and off the shelf apps cannot handle it cleanly." },
    ],
    conclusion: [
      "An automated store lets every order flow from payment to delivery without retyping. Start with solid platform basics, keep stock in one place, then add workflows where your time is going.",
      "If you want a store built this way, or need your current one connected up, our e-commerce team can help.",
    ],
    coverConcept: "A clean e-commerce control centre: a store on a laptop connected by animated lines to a payment card, stock boxes, a shipping label and an invoice.",
    coverPrompt: "Isometric scene of an online store dashboard connected by glowing lines to a payment card, warehouse boxes, shipping label and invoice icons, automation feel, cobalt and white on dark background, 16:9",
    related: ["automated-ecommerce-operations-after-order", "anatomy-of-high-converting-ecommerce-store", "connect-website-crm-whatsapp-email"],
  },

  {
    slug: "automated-ecommerce-operations-after-order",
    category: "ecommerce",
    title: "What Happens After a Customer Places an Order? Building an Automated E-commerce Operation",
    seoTitle: "After the Order: Building an Automated E-commerce Operation",
    description: "From payment confirmation to delivery, returns and reviews: how to automate the operations that happen after an online order is placed.",
    primaryKeyword: "automated ecommerce operations",
    keywords: ["order fulfilment automation", "post purchase experience", "ecommerce returns process", "order tracking emails"],
    excerpt: "The sale is not the finish line. Here is how to automate everything that happens after the buy button, so customers stay happy and your team stays sane.",
    intro: [
      "Most store owners obsess over the moment of purchase. Customers, however, judge you on what happens next: how quickly they hear from you, when the parcel arrives, and how easy it is to sort out a problem.",
      "A well automated post purchase operation makes that experience consistent, whether you ship ten orders a week or ten thousand.",
    ],
    takeaways: [
      "Map every step from payment to review, then decide which can run automatically.",
      "Proactive updates reduce \"where is my order?\" messages.",
      "Returns and exchanges deserve a clear, self serve process.",
      "Post purchase is your best moment to earn reviews and repeat orders.",
    ],
    sections: [
      {
        id: "map",
        title: "Map the journey after the order",
        blocks: [
          { t: "flow", caption: "The post purchase journey", items: ["Order confirmed", "Picked & packed", "Shipped", "Delivered", "Review & reorder"] },
          { t: "p", text: "For each step, ask three questions: who does this today, what triggers it, and what does the customer see? Steps with a clear trigger and a predictable action are ideal for automation." },
        ],
      },
      {
        id: "confirmation",
        title: "Confirmation and payment",
        blocks: [
          { t: "p", text: "The confirmation email should arrive within seconds, with a clear summary, expected delivery date and how to get help. Payment capture, fraud screening and invoice generation can all run automatically through your platform and gateway." },
        ],
      },
      {
        id: "fulfilment",
        title: "Fulfilment",
        blocks: [
          { t: "ul", items: ["Route orders automatically to the right location or warehouse partner.", "Generate shipping labels from order data, not by hand.", "Batch pick lists so packing is faster and more accurate.", "Flag unusual orders (high value, international, custom) for a human check."] },
        ],
      },
      {
        id: "updates",
        title: "Proactive delivery updates",
        blocks: [
          { t: "p", text: "Shipping and delivery notifications with tracking links answer the question before the customer asks it. Many tracking apps also offer a branded tracking page, which keeps the customer on your site rather than a courier’s." },
          { t: "callout", title: "Reduce support load", text: "Add an order status page linked from every email. A large share of support messages are simply customers asking where their parcel is." },
        ],
      },
      {
        id: "returns",
        title: "Returns and exchanges",
        blocks: [
          { t: "p", text: "A self serve returns portal lets customers start a return, choose an exchange or refund, and print a label without emailing anyone. Rules can approve standard returns automatically while sending exceptions to your team." },
        ],
      },
      {
        id: "reviews",
        title: "Reviews and the next purchase",
        blocks: [
          { t: "p", text: "Timed after delivery, an automated review request collects social proof while the experience is fresh. A later email with care tips, related products or a replenishment reminder turns a one off buyer into a repeat customer." },
        ],
      },
      {
        id: "monitor",
        title: "Monitor exceptions, not every order",
        blocks: [
          { t: "p", text: "The goal is for your team to spend time on exceptions only: delayed parcels, failed payments, damaged items. Set up alerts for those, and let everything else run." },
        ],
      },
    ],
    tools: ["Shopify Flow", "ShipStation", "AfterShip", "Loop Returns", "Klaviyo", "Gorgias", "Zapier or Make"],
    faqs: [
      { q: "What should an order confirmation email include?", a: "Order details, total paid, delivery address, expected delivery date, and a clear way to contact support or view order status." },
      { q: "Can returns really be automated?", a: "Standard returns that meet your policy can be approved and labelled automatically, with exceptions routed to your team for review." },
      { q: "When should I ask for a review?", a: "After the customer has received and used the product, which is usually a few days to a couple of weeks after delivery depending on the item." },
    ],
    conclusion: [
      "What happens after the order defines whether a customer comes back. Automate the predictable steps, keep customers informed without them asking, and let your team focus on exceptions.",
      "Our e-commerce team can map your post purchase journey and connect the tools that make it run smoothly.",
    ],
    coverConcept: "A parcel travelling along a conveyor that passes through glowing checkpoints: confirmation, packing, shipping, delivery and a five star review.",
    coverPrompt: "Minimal 3D conveyor belt carrying a branded parcel through glowing checkpoints labelled with icons for confirmation, packing, truck, home delivery and star review, cobalt accents, dark studio background, 16:9",
    related: ["online-store-automated-orders-payments-inventory", "ecommerce-retention-repeat-customers", "hidden-cost-manual-business-operations"],
  },

  {
    slug: "ecommerce-retention-repeat-customers",
    category: "ecommerce",
    title: "How to Turn One-Time Buyers Into Repeat Customers: E-commerce Retention Systems",
    seoTitle: "Turn One-Time Buyers Into Repeat Customers: Retention Systems",
    description: "Acquiring customers is expensive. Learn how to build email, SMS, loyalty and subscription systems that turn first time buyers into loyal repeat customers.",
    primaryKeyword: "ecommerce customer retention",
    keywords: ["repeat customers ecommerce", "ecommerce email marketing flows", "loyalty programme online store", "subscription ecommerce"],
    excerpt: "The cheapest sale is the second one. Here is how to build the systems that bring customers back without constant discounting.",
    intro: [
      "Most stores spend heavily to win a first order, then let that customer drift away. Yet the customers you already have know your brand, trust your delivery and are far easier to sell to again.",
      "Retention is not a single tactic. It is a system of timely, relevant messages and reasons to return, running in the background after every purchase.",
    ],
    takeaways: [
      "Retention starts with a great first experience. No email fixes a bad delivery.",
      "Automated flows (welcome, post purchase, replenishment, win back) do most of the work.",
      "Segment customers by behaviour so messages feel relevant, not spammy.",
      "Loyalty and subscriptions give customers a reason to stay, beyond discounts.",
    ],
    sections: [
      {
        id: "foundation",
        title: "The foundation: an experience worth repeating",
        blocks: [
          { t: "p", text: "Before building flows, make sure the basics are excellent: accurate product descriptions, fast delivery, careful packaging and responsive support. Retention marketing amplifies the experience you already deliver." },
        ],
      },
      {
        id: "flows",
        title: "The core automated flows",
        blocks: [
          { t: "steps", items: [
            { title: "Welcome series", text: "Introduce your brand story, best sellers and what makes you different to new subscribers and first time buyers." },
            { title: "Post purchase", text: "Thank the customer, set delivery expectations, and share tips to get the most from the product." },
            { title: "Replenishment", text: "For consumables, remind customers shortly before they are likely to run out." },
            { title: "Cross sell", text: "Recommend genuinely complementary products based on what they bought." },
            { title: "Win back", text: "Re engage customers who have not ordered for a while, with something new or useful rather than only a discount." },
          ] },
        ],
      },
      {
        id: "lifecycle",
        title: "The retention lifecycle",
        blocks: [
          { t: "flow", caption: "From first order to loyal customer", items: ["First order", "Great delivery", "Helpful follow up", "Second order", "Loyal customer"] },
        ],
      },
      {
        id: "segment",
        title: "Segment by behaviour",
        blocks: [
          { t: "ul", items: ["First time buyers vs repeat customers.", "High value customers who deserve early access or perks.", "Product interest, based on what they browsed and bought.", "Lapsed customers who need a different message."] },
          { t: "callout", title: "Keep it relevant", text: "Sending everyone the same promotion trains customers to ignore you. A few well targeted messages outperform frequent blasts." },
        ],
      },
      {
        id: "loyalty",
        title: "Loyalty programmes and subscriptions",
        blocks: [
          { t: "p", text: "A simple points or tier programme gives customers a reason to choose you over a competitor. For products bought regularly, subscriptions with easy pause and skip options create predictable revenue and convenience for the customer." },
        ],
      },
      {
        id: "measure",
        title: "Measure what matters",
        blocks: [
          { t: "p", text: "Track repeat purchase rate, time between orders and revenue from automated flows. These numbers tell you whether retention is improving, far better than open rates alone." },
        ],
      },
    ],
    tools: ["Klaviyo", "Shopify Email", "Smile.io or LoyaltyLion", "Recharge or Skio", "Postscript or Attentive"],
    faqs: [
      { q: "Should I rely on discounts to bring customers back?", a: "Use them sparingly. Constant discounts train customers to wait for sales. Useful content, early access and loyalty perks build longer lasting habits." },
      { q: "Email or SMS for retention?", a: "Both have a place. Email suits richer content and regular communication, while SMS works for timely, short messages to customers who have opted in." },
      { q: "When should a win back email go out?", a: "It depends on your typical reorder cycle. Look at how long most repeat customers take to order again and trigger win back messages after that window passes." },
    ],
    conclusion: [
      "Repeat customers are built, not hoped for. Deliver a great first experience, then let automated, relevant messages and real reasons to return do the rest.",
      "Our e-commerce team can design and build retention flows and loyalty systems that fit your store and your customers.",
    ],
    coverConcept: "A circular loop of glowing product boxes returning to the same customer, forming an infinity shape around a phone showing a personalised email.",
    coverPrompt: "Elegant infinity loop made of small glowing parcels circling a smartphone displaying a personalised email, premium product photography style, cobalt and soft pink light, dark background, 16:9",
    related: ["automated-ecommerce-operations-after-order", "online-store-visitors-but-no-sales", "whatsapp-enquiry-to-paying-customer"],
  },
];
