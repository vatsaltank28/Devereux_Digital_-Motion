/**
 * "What's included" under each service — verbatim from the client document
 * "Devereux Digitals (What's included under each service)". Shown right after the service overview.
 */
export const included: Record<string, string[]> = {
  "web-design-development": [
    "Custom Website Design",
    "UI/UX Design",
    "Mobile Responsive Design",
    "Website Development",
    "SEO Setup",
    "Speed & Performance Optimization",
    "Website Launch & Support",
  ],
  "digital-marketing": [
    "Sales Marketing",
    "Digital Marketing Strategy",
    "Social Media Management",
    "Content Strategy & Planning",
    "Organic Growth",
    "Brand Awareness",
    "Community Management",
    "Performance Reporting",
  ],
  "paid-advertising": [
    "Meta Ads (Facebook & Instagram)",
    "Google Ads",
    "Campaign Setup & Management",
    "Audience Research & Targeting",
    "Retargeting Campaigns",
    "Ad Creative & Copywriting",
    "Campaign Optimization & Reporting",
  ],
  "ecommerce-solutions": [
    "Online Store Design & Development",
    "Shopify & WooCommerce Setup",
    "Product Catalogue Management",
    "Payment Gateway Integration",
    "Shopping Cart & Checkout Setup",
    "Inventory & Order Management",
    "Store Optimization & Support",
  ],
  "video-content": [
    "Professional Video Editing",
    "Short-Form Video Creation",
    "YouTube Video Editing",
    "Motion Graphics & Animation",
    "AI-Generated Video Content",
    "Content Strategy & Scriptwriting",
    "Subtitles, Captions & Post-Production",
  ],
  "ai-business-solutions": [
    "Business Process Automation",
    "AI Workflow Automation",
    "AI Chatbot Development",
    "CRM Automation",
    "Lead Capture & Management",
    "Third-Party Integrations",
    "Workflow Optimization & Support",
  ],
  "branding-creative-design": [
    "Logo Design",
    "Brand Identity Development",
    "Brand Guidelines",
    "Social Media Design",
    "Marketing & Advertising Creatives",
    "Business Stationery Design",
    "Packaging & Promotional Design",
  ],
};

/** The editing service is delivered by the sister agency. */
export const editsSite = { name: "Devereux Edits", url: "https://devereuxedits.com/" } as const;
