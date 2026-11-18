import { chatProof, type MediaImage } from "./media";

/**
 * Client reviews, supplied by the client:
 *  - Chat-proof reviews come first (quotes transcribed from the original screenshots, which open via "See Chat").
 *  - Then the written reviews from "Devereux Digitals Reviews (No chat proof).docx", verbatim.
 * All are shown as 5.0 per the client's format instructions.
 */
export interface Review {
  quote: string;
  name: string;
  role: string;
  service: string;
  chat?: MediaImage;
}

const r = (name: string, role: string, quote: string): Omit<Review, "service"> => ({ name, role, quote });

const data: Record<string, { label: string; items: Omit<Review, "service">[] }> = {
  "web-design-development": {
    label: "Web Design",
    items: [
      {
        name: "Verified client",
        role: "Business Owner",
        quote:
          "I love the website and you were calm in the process — that’s an addition. I recommend your service. Thank you!",
        chat: chatProof["web-design-development"],
      },
      r("Daniel Carter", "Founder, Carter & Co. Interiors", "I honestly love how the website turned out. I had a particular idea of what I wanted, but the team made it look even better than I imagined. Everything feels clean and professional, and the website works really well on mobile too."),
      r("Olivia Bennett", "Owner, Bloom Beauty Studio", "Working with Devereux Digitals was a good experience. They were patient with my changes and made sure everything was right before completing the project. I’ve already had people compliment the new website."),
      r("Marcus Williams", "Director, Williams Auto Hub", "We needed a proper website for the business, something customers could visit and easily understand what we offer. That’s exactly what we got. Communication was good and the delivery was smooth."),
    ],
  },
  "digital-marketing": {
    label: "Digital & Sales Marketing",
    items: [
      {
        name: "Verified client",
        role: "Business Owner",
        quote:
          "For real, the results are crazy. Since you started running the ads and handling our social media, we’ve had way more sales. Orders doubled this month and the engagement on our page is at an all-time high.",
        chat: chatProof["digital-marketing"],
      },
      r("Sophia Mitchell", "Founder, Luxe Living Store", "We were posting on social media but didn’t really have a proper direction. Devereux helped us become more consistent with our content and how we communicate with customers. It’s made a noticeable difference to our online presence."),
      r("Ethan Brooks", "Owner, Brooks Fitness Club", "The team understood what we were trying to achieve with our marketing. I particularly liked that they focused on reaching the right audience instead of just making us post every day. It’s been a positive experience."),
      r("Isabella Reed", "Founder, The Daily Essentials", "Since we started working together, our marketing has become much more organized. We now have a clearer content direction and a better way of approaching potential customers. Really appreciate their work."),
    ],
  },
  "paid-advertising": {
    label: "Paid Advertising",
    items: [
      {
        name: "Cal",
        role: "Business Owner",
        quote: "One of the deals from ads just closed. $20K. A few more in the pipeline.",
        chat: chatProof["paid-advertising"],
      },
      r("James Anderson", "Owner, Anderson Electronics", "We wanted to start running ads properly instead of just boosting random posts. Devereux helped us get things organized, from the creatives to the audience targeting. The whole process was handled professionally."),
      r("Chloe Martin", "Founder, CM Skincare", "I liked how involved they were throughout the campaign. They explained what was happening, what needed improvement and why certain changes were being made. It wasn’t just about launching ads and leaving them."),
      r("Ryan Foster", "Director, Foster Digital Retail", "Good experience overall. They took time to understand our target customers and helped structure the campaigns around our business goals. I appreciated the regular communication and attention to detail."),
    ],
  },
  "ecommerce-solutions": {
    label: "E-commerce",
    items: [
      r("Emily Parker", "Owner, Parker Fashion House", "Our new online store looks beautiful. The layout is easy to navigate, the products are presented properly and the overall experience feels much more professional. I’m happy with how everything came together."),
      r("Noah Thompson", "Founder, NT Gadgets", "I had been planning to move my business online for a while, and Devereux helped make the process much easier. They handled the store setup and important integrations without making things complicated."),
      r("Grace Wilson", "Owner, Grace Home & Living", "The team did a great job with our store redesign. I especially like how organized the product pages are now. Everything looks cleaner and gives customers a better shopping experience."),
    ],
  },
  "video-content": {
    label: "Video & Content",
    items: [
      r("Liam Scott", "Content Creator, The Liam Show", "I’ve worked with different editors before, but what I liked here was how well they understood the style I was going for. The final videos looked polished without losing the original feel of my content."),
      r("Ava Richardson", "Marketing Lead, AVA Cosmetics", "We needed short videos for our social pages, and the team delivered some really good edits. The pacing, transitions and overall presentation were exactly the direction we wanted."),
      r("Benjamin Clark", "YouTube Creator, Beyond The Pitch", "I sent over the raw footage and gave them a general idea of what I wanted. They handled the editing really well and saved me a lot of time. Definitely enjoyed working with them."),
    ],
  },
  "ai-business-solutions": {
    label: "AI & Business",
    items: [
      r("Samuel Cooper", "Founder, Cooper Business Services", "We had a lot of repetitive tasks that were taking up time every day. The automation solution helped us organize some of those processes and made things easier for the team to manage."),
      r("Natalie Adams", "Operations Manager, Adams Consulting", "The CRM setup was exactly what we needed. Before, keeping track of inquiries and follow-ups was becoming difficult. Having a more organized system has made our workflow much better."),
      r("David Morgan", "Owner, Morgan Trade Solutions", "I wasn’t very familiar with business automation before this project, but the team explained everything clearly. The solution was practical and suited what we actually needed rather than being unnecessarily complicated."),
    ],
  },
  "branding-creative-design": {
    label: "Branding",
    items: [
      {
        name: "Verified client",
        role: "Business Owner",
        quote: "I really love it so much. More than — we love it.",
        chat: chatProof["branding-creative-design"],
      },
      r("Victoria James", "Founder, VJ Beauty House", "I absolutely love the new brand identity. Everything feels more connected now, from the logo to the colours and other designs. It finally gives the business the look I’ve been trying to achieve."),
      r("Alexander Lewis", "Owner, Lewis Luxury Watches", "The creative direction was very good. I wanted something simple but premium, and they understood that from the beginning. The final designs represented the brand really well."),
      r("Hannah Moore", "Founder, HM Events & Decor", "Devereux did a lovely job with our branding materials. The designs were clean, professional and consistent. I also appreciated how open they were to feedback throughout the process."),
    ],
  },
};

export function getReviews(slug: string): Review[] {
  const d = data[slug];
  return d ? d.items.map((it) => ({ ...it, service: d.label })) : [];
}

/** The headline review shown on the home page (client's "most important" review, photo 1). */
export const featuredReview = {
  quote:
    "I like working with you guys a lot. A lot… You’re the one and only agency we’ve hired that we actually like. We tolerate a number of agencies, but you guys operate like you’re a part of our team.",
  followUp:
    "What you’ve done great is being able to bring in the right talent that meshes well with your style of work. Your entire team communicates really well.",
  name: "Verified client",
  role: "Company founder",
};
