import type { Faq } from "./types";

/**
 * FAQ content — DRAFT.
 *
 * PRD §9 S09: answers must reflect Devereux Digitals’ real policies. Policies were not supplied,
 * so every answer is deliberately non-committal: it describes how a good project is scoped and
 * states that specifics (timelines, revision rounds, payment terms) are confirmed in the written
 * proposal. The client must review and replace these before launch (see README content checklist).
 */
const q = (
  serviceSlug: string | undefined,
  sortOrder: number,
  question: string,
  answer: string,
): Faq => ({ id: `${serviceSlug ?? "general"}-${sortOrder}`, serviceSlug, sortOrder, question, answer });

export const faqs: Faq[] = [
  // ── General ──────────────────────────────────────────────────────────────
  q(undefined, 1, "How do I start a project with Devereux Digitals?",
    "Send an enquiry through the contact form with a short summary of what you need. We’ll reply to talk through the scope and whether we’re the right fit before anything is agreed."),
  q(undefined, 2, "How long will my project take?",
    "It depends on scope and on how quickly feedback and content arrive. We confirm a realistic schedule in the written proposal before work begins."),
  q(undefined, 3, "How are projects priced?",
    "Every project is scoped individually, so we share a tailored proposal rather than a fixed price list. The proposal sets out what is included, what is not, and how payment is structured."),
  q(undefined, 4, "Do you work with more than one service at a time?",
    "Yes. Many projects combine services — for example a website with a launch campaign. We can plan them together so the work fits."),

  // ── Web design & development ────────────────────────────────────────────
  q("web-design-development", 1, "How long does a website project take?",
    "A focused landing page and a multi-page business site are very different jobs. We confirm a schedule in the proposal once we understand page count, content readiness and integrations."),
  q("web-design-development", 2, "How many rounds of revisions are included?",
    "The number of review rounds is set out in the proposal for each project. Defined rounds at design and build stages keep feedback focused and the project moving."),
  q("web-design-development", 3, "What do I need to provide?",
    "Ideally your logo and brand assets, the content you already have, and examples of sites you like. If copy or photography doesn’t exist yet, we can scope that as part of the project."),
  q("web-design-development", 4, "Will I own the website and have access to it?",
    "Ownership and access arrangements are stated in the proposal. We hand over the access and documentation you need to manage the site after launch."),
  q("web-design-development", 5, "Do you provide support after launch?",
    "Post-launch support and maintenance can be agreed as an option in the proposal, depending on how much help you want."),

  // ── Digital marketing ───────────────────────────────────────────────────
  q("digital-marketing", 1, "Which channels will you manage?",
    "We recommend channels based on your audience and goals during the strategy stage, then agree exactly which ones we manage before work starts."),
  q("digital-marketing", 2, "Can you guarantee rankings or follower growth?",
    "No. Search rankings and audience growth depend on factors outside any agency’s control. We commit to a clear plan, consistent execution and honest reporting."),
  q("digital-marketing", 3, "How often will I receive reports?",
    "Reporting frequency is agreed in the proposal. Each report explains what happened, what it means and what we recommend next."),
  q("digital-marketing", 4, "Do I need to supply content?",
    "It helps to have your expertise, product details and brand assets available. We can handle writing and creative production if the scope includes them."),

  // ── Paid advertising ────────────────────────────────────────────────────
  q("paid-advertising", 1, "Who controls the ad budget?",
    "You do. Ad spend is paid to the platforms and set by you; our fees are separate and set out in the proposal."),
  q("paid-advertising", 2, "Can you promise a specific return?",
    "No. Results depend on your offer, market and budget. We structure campaigns so performance is measurable and decisions are evidence-based."),
  q("paid-advertising", 3, "Who owns the advertising accounts?",
    "We recommend that ads accounts are owned by your business, with us given access to manage them. Arrangements are confirmed in the proposal."),
  q("paid-advertising", 4, "How quickly will I see results?",
    "Campaigns usually need an initial testing period before patterns are clear. We share early signals as they appear and explain what they do and don’t tell us."),

  // ── E-commerce ──────────────────────────────────────────────────────────
  q("ecommerce-solutions", 1, "Which e-commerce platform do you build on?",
    "We recommend a platform based on your catalogue, team and budget during the requirements stage. The choice and its trade-offs are explained in the proposal."),
  q("ecommerce-solutions", 2, "Can you migrate my existing store?",
    "Migration of products, customers and content can be scoped when we understand the volume and the current platform."),
  q("ecommerce-solutions", 3, "Who sets up payments and shipping?",
    "We configure and test them with you. Accounts with payment providers and carriers remain in your business’s name."),
  q("ecommerce-solutions", 4, "Do you support the store after launch?",
    "Ongoing support and optimization can be agreed as an option, depending on how much help your team wants."),

  // ── Video & content ─────────────────────────────────────────────────────
  q("video-content", 1, "Do you handle scripting and planning?",
    "Yes — planning is part of the process. We agree the idea, script and shot list with you before any filming happens."),
  q("video-content", 2, "Which formats will I receive?",
    "The delivery formats are listed in the proposal. We plan for multiple formats from the start so each channel gets a properly framed version."),
  q("video-content", 3, "How are revisions handled?",
    "Feedback rounds on each edit are defined in the proposal so everyone knows what to expect."),
  q("video-content", 4, "Who owns the final footage and files?",
    "Usage rights and file ownership are written into the proposal. Talent, music and location permissions are covered at the planning stage."),

  // ── AI & business solutions ─────────────────────────────────────────────
  q("ai-business-solutions", 1, "Do I need AI for my business?",
    "Not necessarily. We start with your workflow and only recommend AI or automation where it will genuinely save effort or improve quality."),
  q("ai-business-solutions", 2, "What happens to my data?",
    "Data handling is discussed before any work starts. We explain which tools touch your data, where it goes, and the safeguards in place."),
  q("ai-business-solutions", 3, "Can the tools make mistakes?",
    "Yes, so we design a human review step wherever an error would matter, and we tell you plainly what a tool can and can’t be relied on to do."),
  q("ai-business-solutions", 4, "Will my team be able to use it?",
    "Handover includes documentation and a walkthrough so your team understands how the tool works and what to do when it needs changing."),

  // ── Branding & creative design ──────────────────────────────────────────
  q("branding-creative-design", 1, "What will I receive at the end?",
    "The deliverables depend on scope — from a logo and core identity to a full system with guidelines and templates. The proposal lists each item."),
  q("branding-creative-design", 2, "How many creative directions will you present?",
    "The number of concepts and revision rounds is set out in the proposal so the creative process stays focused."),
  q("branding-creative-design", 3, "Do I own the brand once it’s finished?",
    "Rights and ownership of final artwork are stated in the proposal and transferred as agreed on completion."),
  q("branding-creative-design", 4, "Can you refresh an existing brand instead of starting over?",
    "Yes. A refresh can modernize and tighten an identity while keeping the recognition you’ve already built."),
];

export function getFaqs(serviceSlug?: string): Faq[] {
  return faqs.filter((f) => f.serviceSlug === serviceSlug).sort((a, b) => a.sortOrder - b.sortOrder);
}
