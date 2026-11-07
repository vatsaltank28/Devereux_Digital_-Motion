# Devereux Digitals — Product Requirements Document (PRD)

**Document status:** Implementation brief / v1.0  
**Product:** Devereux Digitals — Full-service digital agency website  
**Primary deliverable:** Responsive marketing website with homepage, service detail pages, portfolio/case studies, about, contact, and supporting conversion content  
**Primary audience:** Business owners, founders, marketing leads, and teams evaluating digital service partners  
**Brand direction:** Premium, confident, modern, technology-aware, minimal, motion-rich  
**Reference basis:** Client-provided screenshots showing the homepage structure, service grid, service-detail page outline, navigation drawer, and black/white/electric-blue visual direction.

---

## 1. Executive summary

Devereux Digitals needs a polished digital presence that communicates its capabilities clearly, demonstrates credibility, and turns qualified visitors into project enquiries. The experience should feel like a high-end digital studio while remaining easy to navigate and commercially effective.

The supplied client references establish the required information architecture:

- Homepage hero with clear positioning and two calls to action.
- Eight clickable service cards, each leading to its own service page.
- A concise “Why Choose Us?” section.
- A final project-enquiry CTA and complete footer.
- A service detail template demonstrated with Web Design & Development.
- A minimal navigation system with an expandable Services group.
- Service detail content covering introduction, problems solved, deliverables, process, portfolio, testimonials, pricing, FAQs, and final CTA.

The website should elevate that structure through purposeful motion design, selective 3D, strong typography, carefully art-directed project imagery, and responsive interactions. Motion must reinforce hierarchy and storytelling—not delay content, obstruct navigation, or reduce accessibility.

## 2. Product vision

Create a distinctive, trustworthy agency website that makes Devereux Digitals feel capable of delivering measurable digital growth across design, marketing, commerce, content, AI/business solutions, and branding.

### 2.1 Experience principles

1. **Clarity before spectacle:** Visitors should understand what the agency does within the first screen.
2. **One visual system:** Every service page should feel related, even when its imagery differs.
3. **Motion with purpose:** Each animation must communicate hierarchy, continuity, feedback, or depth.
4. **Proof over unsupported claims:** Use real projects, real testimonials, verified metrics, and approved client logos only.
5. **Conversion without pressure:** Calls to action should be visible and helpful, not aggressive.
6. **Mobile parity:** Mobile should be designed intentionally, not treated as a compressed desktop.
7. **Performance is part of the design:** 3D and animation must degrade gracefully on low-powered devices.

## 3. Business goals and success measures

### 3.1 Primary goals

- Explain the agency's eight service categories.
- Generate qualified project enquiries.
- Establish credibility through portfolio work, process transparency, and approved testimonials.
- Make it easy for visitors to move from a service overview to a relevant service detail page.
- Provide a reusable system for adding services, projects, FAQs, and testimonials.

### 3.2 Suggested measurement plan

Instrument the site with privacy-conscious analytics after the client approves a provider and consent approach.

| Goal | Event / KPI | Measurement note |
|---|---|---|
| Improve service discovery | `service_card_click` | Include service slug |
| Increase enquiry intent | `cta_click` | Include CTA location and label |
| Capture leads | `contact_form_submit` | Track success only; do not send form contents to analytics |
| Show portfolio engagement | `case_study_open` | Include project slug |
| Improve content engagement | Scroll depth / section visibility | Use aggregated analytics |
| Reduce friction | Form error rate | Track field names, never field values |
| Maintain quality | Core Web Vitals | Review real-user data after launch |

No conversion targets should be invented before baseline traffic and business goals are known.

## 4. Target audiences and user needs

### Persona A — Business owner / founder
- Needs: a professional online presence, lead generation, trust, clear scope, and an understandable process.
- Questions: “Can they solve my problem?”, “What will I receive?”, “How do I start?”
- Priority content: hero, services, relevant work, process, pricing approach, FAQs, contact.

### Persona B — Marketing manager
- Needs: a capable partner for campaign execution, content, paid advertising, brand consistency, and measurable outcomes.
- Questions: “Can they support our marketing goals?”, “What channels and deliverables are covered?”
- Priority content: Digital Marketing, Paid Advertising, Video & Content, case studies, reporting/process details.

### Persona C — Ecommerce operator
- Needs: conversion-focused commerce experiences, product presentation, integrations, and ongoing optimization.
- Questions: “Can they build and improve an online store?”
- Priority content: E-commerce Solutions, Web Design & Development, portfolio, deliverables, enquiry.

### Persona D — Innovation / operations lead
- Needs: practical AI and business solutions with clear use cases, implementation boundaries, and support.
- Questions: “What business problem does this solve?”, “How will it fit into our workflow?”
- Priority content: AI & Business Solutions, process, FAQs, consultation CTA.

## 5. Scope

### 5.1 In scope — launch release

- Responsive homepage.
- Global navigation and mobile menu.
- Services overview and eight service detail pages.
- About / Why Choose Us content.
- Portfolio / case-study index and project detail template.
- Testimonials module, only populated with approved real feedback.
- Pricing / packages presentation, with client-approved values or “request a proposal” treatment.
- FAQ accordions.
- Contact / project enquiry form with validation and success/error states.
- Footer with navigation, contact details, and social links.
- CMS/data model for repeatable content.
- Motion system and selected 3D hero scene.
- SEO metadata, Open Graph, sitemap, robots, semantic structure.
- Analytics event hooks, subject to client approval.
- Accessibility, performance, and responsive QA.

### 5.2 Explicitly out of scope unless separately approved

- Customer login, client portal, dashboards, or account management.
- Online checkout or payment processing.
- Automated quotation/pricing engine.
- CRM automation or email marketing workflows.
- AI chatbot or AI-generated recommendations.
- Blog/news publishing beyond a simple CMS-ready structure.
- Multilingual content.
- Complex custom configurators.
- Claims of guaranteed rankings, revenue, or campaign performance.

## 6. Sitemap and information architecture

```text
/
├── Home
├── Services
│   ├── Web Design & Development
│   ├── Digital Marketing
│   ├── Paid Advertising
│   ├── E-commerce Solutions
│   ├── Video & Content
│   ├── AI & Business Solutions
│   ├── Branding & Creative Design
│   └── Coming Soon (status/teaser; destination only if content is approved)
├── Work / Portfolio
│   └── Case Study Detail (CMS)
├── About Us
├── Contact / Start a Project
├── Privacy Policy
└── Terms (if required by client)
```

Navigation should remain minimal. “Services” expands to reveal the eight service destinations. The primary navigation should not expose every page at once on small screens.

## 7. Global layout and navigation requirements

### 7.1 Header
- Brand wordmark at left.
- Menu trigger at right on compact layouts; desktop may use a restrained horizontal nav if approved.
- Sticky or fixed behavior only if it does not consume excessive viewport height.
- Header background may begin transparent over the hero and become opaque/blurred after scroll.
- Clear focus state, keyboard operation, Escape-to-close, and correct focus restoration.

### 7.2 Expanded navigation
- Full-width or large overlay panel with clear hierarchy.
- Home, Services, About Us, Contact.
- Services list with eight items and directional affordance.
- “Let’s Discuss Your Project” CTA.
- Close button and Escape support.
- On mobile, use a full-screen or near-full-screen drawer with large tap targets.
- Do not rely on hover to reveal essential navigation.

### 7.3 Footer
- Wordmark and concise agency positioning.
- Primary navigation and service links.
- Approved email, phone, address, and social links only.
- Copyright year generated dynamically.
- Privacy / terms links when supplied.
- Optional final CTA.

## 8. Homepage requirements

### H01 — Hero / agency positioning
**Purpose:** Establish what Devereux Digitals does, who it helps, and the next action.

Required content:
- Strong headline and agency positioning.
- Short description of Devereux Digitals.
- Primary CTA: “Explore Our Services”.
- Secondary CTA: “Let’s Talk” / “Start a Project”.
- Optional credibility line, only if supported by real facts.

Experience:
- Strong typographic composition.
- Selective 3D visual or abstract motion graphic that does not compete with headline.
- Initial entrance sequence should be brief and skippable by reduced-motion preference.
- CTA must be visible without requiring a long animation.
- Hero copy must remain HTML text, not baked into an image or canvas.

### H02 — Services overview
Display eight clickable service cards:
1. Web Design
2. Digital Marketing
3. Paid Advertising
4. E-commerce Solutions
5. Video & Content
6. AI & Business Solutions
7. Branding & Creative Design
8. Coming Soon

Requirements:
- Each available service card links to its own detail page.
- “Coming Soon” must not imply an available service. It can be a disabled card, waitlist CTA, or approved teaser.
- Card includes number, service title, concise descriptor, and “Explore service” affordance.
- Cards support keyboard focus, touch, hover, and reduced-motion behavior.
- Use a responsive grid: 4 columns on wide desktop where space permits, 2 on tablet, 1 or 2 on mobile depending on readability.
- Avoid excessive card height or uneven content.

### H03 — Why Devereux Digitals
Short explanation of approach, expertise, and commitment to measurable results.
- Use three to four approved differentiators.
- Avoid invented client counts, years of experience, awards, or performance metrics.
- Optional process or capability visual.
- Use scroll reveal sparingly.

### H04 — Work / featured projects (recommended addition)
The client's homepage sketch does not explicitly place this section, but proof of work is important for an agency.
- Feature three to six real, approved projects.
- Each card shows project title, industry/category, deliverables, image, and link.
- If client work is unavailable, use clearly labeled concept projects—not fabricated client endorsements.
- Do not publish confidential work without permission.

### H05 — Final CTA
Suggested headline: “Let’s Build Something That Grows.”
- Invite project discussion or consultation.
- CTA: “Start a Project” / “Get a Project Quote”.
- Secondary contact method if approved.
- Strong but restrained visual treatment.

### H06 — Footer
Complete footer described in section 7.3.

## 9. Service detail page template

Create one reusable template driven by CMS data. The supplied reference demonstrates Web Design & Development; the same framework should be adapted to each of the other seven services without duplicating generic copy.

### S01 — Service introduction
- Service title.
- One-sentence value proposition.
- Detailed introductory paragraph.
- Hero visual / relevant project image.
- Primary CTA: “Start Your Project”.
- Secondary CTA: “View Our Work”.

### S02 — Problems we solve
List the actual audience problems for that service. For Web Design & Development, reference examples include:
- Outdated websites that do not convert.
- Poor mobile experiences.
- Slow-loading websites.
- Businesses without a professional online presence.

The examples above are client-provided reference content; final copy must be reviewed and approved.

### S03 — What we deliver
A specific deliverables list. For Web Design & Development, examples include:
- Business website development.
- E-commerce websites.
- Landing pages.
- Website redesign.
- Mobile-responsive design.
- Website optimization.

Other service pages must have service-specific deliverables, not recycled website-development bullets.

### S04 — Our process
Reference process:
1. Discovery and requirements.
2. Planning and design.
3. Development / production / campaign setup (adapt per service).
4. Testing and optimization.
5. Launch and handover / reporting.

The process must be truthful to the agency's actual workflow.

### S05 — Portfolio / past work
- Display relevant approved work.
- Include project description, challenge, solution, deliverables, and outcomes where verified.
- Link to full case studies when available.
- Never invent results or imply a concept is a commissioned client project.

### S06 — Benefits / why choose us (recommended)
Explain outcomes in plain language and connect each benefit to a deliverable or method.
- Avoid empty superlatives.
- Use evidence where possible.

### S07 — Client reviews & testimonials
- Publish only genuine feedback with permission.
- Include client name, business, role, and image only if approved.
- If no testimonials are available, omit the section or use a process/FAQ section instead.
- Never generate fake quotes, logos, or identities.

### S08 — Pricing & packages
Possible tiers from the reference:
- Starter
- Professional
- Premium
- Custom Solutions

Requirements:
- Do not invent prices.
- Display prices only after client approval and define currency, tax treatment, scope, billing basis, and exclusions.
- If pricing varies, use “Request a tailored proposal”.
- Explain key inclusions and CTA for each tier.
- Avoid promising unlimited revisions or fixed timelines unless contractually accurate.

### S09 — FAQs
Answer service-specific questions about:
- Timelines.
- Revisions.
- Payments.
- Maintenance / support.
- Delivery / handover.
- What the client needs to provide.
- Scope changes.
- Ownership and access.

Answers must reflect the agency's actual policies.

### S10 — Final CTA
Service-specific enquiry invitation, e.g. “Ready to build your website?”
- CTA to contact form with service preselected.
- Optional “Book a consultation” only if a real booking process exists.

## 10. Service-specific content guidance

Each service requires unique value proposition, audience, problems, deliverables, process adjustments, portfolio filters, FAQs, and metadata.

| Service | Content focus | Example deliverable categories (confirm with client) |
|---|---|---|
| Web Design & Development | Credibility, usability, conversion, performance | Business sites, landing pages, redesigns, responsive builds, optimization |
| Digital Marketing | Audience growth, visibility, strategy, reporting | Strategy, content planning, channel management, reporting |
| Paid Advertising | Qualified traffic, campaign structure, budget control | Campaign setup, creative testing, optimization, reporting |
| E-commerce Solutions | Product discovery, checkout experience, store operations | Store setup, product pages, integrations, conversion improvements |
| Video & Content | Brand storytelling and content consistency | Video production, editing, short-form content, creative assets |
| AI & Business Solutions | Practical workflow improvement and automation | Process discovery, prototypes, integrations, automation (only confirmed capabilities) |
| Branding & Creative Design | Recognition, consistency, positioning | Identity systems, guidelines, campaign creative, collateral |
| Coming Soon | Clearly communicate availability status | Waitlist or “coming soon” notice; no false service promise |

## 11. Portfolio and case-study requirements

### Portfolio index
- Filter by service/category only if enough content exists.
- Use responsive visual grid or editorial list.
- Include image, project name, industry, service tags, and short summary.
- Provide a useful empty state if there are no published projects.

### Case-study detail
- Project overview.
- Client / industry only with permission.
- Challenge.
- Strategy / approach.
- Deliverables.
- Final visuals.
- Results with verifiable source or approved wording.
- Related projects.
- CTA.

## 12. Contact and enquiry form

### Required fields (minimum viable)
- Name.
- Work email.
- Service of interest (select; allow multiple only if useful).
- Project summary.
- Consent checkbox if legally required by the selected jurisdiction and processing approach.

### Optional fields
- Company / website.
- Approximate budget range (only if the agency wants to qualify leads).
- Preferred contact method.
- Timeline.

### Functional requirements
- Inline validation and understandable error messages.
- Server-side validation; never rely on client validation alone.
- Spam protection appropriate to the selected stack.
- Clear loading, success, and failure states.
- Do not clear form content after a recoverable failure.
- Do not expose private API keys in client code.
- Form submission destination / CRM / email provider must be selected by the client.
- Privacy notice and retention approach must be approved.

## 13. CMS / content model

Recommended collections:

### Services
- `title`
- `slug`
- `number`
- `shortDescription`
- `heroHeadline`
- `heroDescription`
- `heroImage`
- `problems[]`
- `deliverables[]`
- `processSteps[]`
- `benefits[]`
- `pricingMode` (hidden / from-price / packages / quote)
- `packages[]` (approved values only)
- `faqs[]`
- `featuredProjects[]`
- `seoTitle`
- `seoDescription`
- `status` (published / coming-soon / draft)
- `sortOrder`

### Projects
- `title`
- `slug`
- `clientName` (optional, approval required)
- `industry`
- `serviceTags[]`
- `summary`
- `challenge`
- `approach`
- `deliverables[]`
- `heroImage`
- `gallery[]`
- `results[]` (verified only)
- `published`
- `featured`
- `seoTitle`
- `seoDescription`

### Testimonials
- `quote`
- `personName`
- `role`
- `company`
- `avatar` (permission required)
- `approvedForPublication`
- `sortOrder`

### FAQs
- `question`
- `answer`
- `serviceRelation`
- `sortOrder`

The selected CMS must be decided before implementation. If using a code-first stack, define typed content schemas and a maintainable content source. Do not hardcode repeated content in multiple page components.

## 14. Motion and interaction requirements

Motion is a core part of the brand experience, but the website must remain readable and fast.

### Global motion
- Route transition: short opacity/clip or shared-element transition; never block navigation.
- Section reveals: restrained opacity + y translation; stagger only small groups.
- Buttons: subtle magnetic or directional feedback on fine-pointer devices; normal touch behavior on mobile.
- Cards: border/lighting/image movement on hover; provide equivalent focus state.
- Navigation: smooth drawer reveal and staggered links.
- Page progress indicator: optional, subtle, and nonessential.

### 3D direction
- Use one primary 3D hero scene or abstract interactive object, not multiple heavy scenes on every page.
- Candidate visual: abstract digital sculpture / glass-and-metal forms / orbiting geometry / layered blue energy field.
- Scene should reinforce digital craft and connected services without literal stock-like icons.
- Provide a static image/CSS fallback.
- Disable or simplify scene on low-power devices, reduced-motion preference, or WebGL failure.
- Avoid excessive bloom, noise, particles, or high-poly meshes.

### Motion acceptance
- No animation may hide essential copy or delay CTA availability.
- No scroll hijacking.
- No perpetual high-frequency motion that distracts from reading.
- Reduced-motion mode must remove parallax, auto-rotation, large travel distances, and scrub-heavy effects.
- All interactions must work with keyboard and touch.

## 15. Technical requirements and recommended implementation

Recommended implementation baseline (confirm against hosting and existing codebase before build):
- React + TypeScript.
- Vite or Next.js depending on SEO, routing, CMS, and deployment requirements.
- Tailwind CSS or a tokenized CSS architecture.
- React Three Fiber + Three.js for the selective 3D scene.
- React Bits components as selectively integrated source components.
- GSAP + ScrollTrigger for complex scroll choreography.
- Motion for React for component state, gestures, layout, and simple reveals.
- Anime.js for isolated SVG / vector / timeline sequences where it adds clear value.
- Lenis only if smooth-scroll behavior is desired and verified with accessibility, browser history, ScrollTrigger, and touch behavior.
- Avoid multiple animation libraries controlling the same element.

### Performance targets
Use Core Web Vitals as the quality framework:
- LCP: aim for <= 2.5 s at the 75th percentile.
- INP: aim for <= 200 ms at the 75th percentile.
- CLS: aim for <= 0.1 at the 75th percentile.

Additional engineering targets:
- Lazy-load below-the-fold media and noncritical 3D.
- Use responsive AVIF/WebP images with explicit dimensions.
- Keep initial JS and 3D payload under active review; establish bundle budgets during implementation.
- Avoid unnecessary re-renders in R3F; use frame-loop updates for continuous scene motion.
- Respect `prefers-reduced-motion`.
- Do not render a large WebGL scene on small/low-power devices without a performance reason.

## 16. Accessibility requirements

Target WCAG 2.2 AA as the design and QA goal.
- Semantic landmarks and heading order.
- Keyboard-operable navigation, accordions, carousels, forms, and CTAs.
- Visible focus indicators.
- Text contrast meeting applicable WCAG AA requirements.
- Alternative text for meaningful images; decorative imagery hidden from assistive technology.
- Form labels, instructions, and error associations.
- Captions/transcripts for meaningful video.
- No content conveyed by color alone.
- Reduced-motion support.
- Avoid flashing content and unexpected auto-playing audio.
- 3D canvas must be decorative unless it has a real keyboard-accessible interaction model.

## 17. SEO and sharing requirements

- Unique title and meta description for every indexable route.
- Canonical URLs.
- Open Graph and social preview images.
- Semantic H1/H2 hierarchy.
- Descriptive image alt text.
- XML sitemap and robots configuration.
- Structured data only where accurate and appropriate (Organization / ProfessionalService, BreadcrumbList, Article for published articles).
- Service pages must have unique, useful copy—not thin duplicates.
- Avoid keyword stuffing and fabricated local addresses or service areas.

## 18. Content and asset requirements from client

Before launch, obtain:
- Final logo / wordmark and permitted variations.
- Brand name capitalization and legal business name.
- Approved positioning statement and service descriptions.
- Actual service capabilities and exclusions.
- Real portfolio projects and publication permissions.
- High-quality project imagery / video.
- Genuine testimonials and permissions.
- Approved pricing or quote-only policy.
- Contact email, phone, social links, and any address to publish.
- Privacy / terms content and form-processing destination.
- Preferred domain, hosting, analytics, and CMS decisions.

## 19. Acceptance criteria

### Functional
- Every published service card opens the correct service detail route.
- Navigation opens, closes, and works via keyboard and touch.
- Contact form validates, submits to the approved endpoint, and displays success/failure feedback.
- Portfolio cards link to the correct case studies.
- FAQs expand/collapse accessibly.
- All links have valid destinations.
- No placeholder links or lorem ipsum remain in production.

### Visual
- The dark editorial system is consistent across routes.
- Typography, spacing, color, borders, cards, buttons, and motion follow the design system.
- Desktop, tablet, and mobile layouts are intentionally composed.
- No horizontal overflow at common viewport sizes.
- 3D scene has a fallback and does not obscure copy.

### Quality
- No critical console errors.
- No broken images or routes.
- No fake metrics, client logos, testimonials, or pricing.
- Reduced-motion mode is verified.
- Keyboard-only path to all core actions is verified.
- Core Web Vitals and bundle performance are measured before launch.

## 20. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Too much motion weakens clarity | Motion budget; hierarchy-first design review |
| 3D harms performance | One primary scene, lazy load, quality tiers, fallback |
| Content is incomplete | CMS fields and explicit content checklist; no fabricated copy |
| Animation libraries conflict | Assign each library a clear responsibility |
| Mobile experience feels like an afterthought | Mobile-specific composition and interaction QA |
| Portfolio permissions unclear | Publication approval field and sign-off |
| Form endpoint unknown | Treat integration as a launch dependency |
| Pricing / testimonials unavailable | Hide those modules or use honest alternatives |

## 21. Open decisions requiring client confirmation

1. Is Devereux Digitals positioned as a local agency, remote-first studio, or both?
2. What exact service capabilities are currently offered?
3. Is “Coming Soon” a service teaser, waitlist, or non-clickable card?
4. Which projects may be published, and what results can be substantiated?
5. Are package prices public, indicative, or quote-only?
6. What is the approved contact / CRM destination?
7. Which domain, hosting, and CMS should be used?
8. Are there brand assets beyond the supplied black/white/blue references?
9. Are there approved client logos, reviews, awards, or business metrics?
10. Does the client prefer a more restrained professional motion system or a more experimental Awwwards-style experience?

---

## 22. Reference sources and implementation reading

The client-provided screenshots remain the primary source for business structure and visual direction. The following official resources inform implementation choices:

- React Bits component library: https://www.reactbits.dev/
- React Bits repository: https://github.com/DavidHDev/react-bits
- React Bits component browser: https://www.reactbits.dev/get-started/index
- Motion for React: https://motion.dev/docs/react
- Motion layout animations: https://motion.dev/docs/react-layout-animations
- GSAP ScrollTrigger: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- GSAP SplitText: https://gsap.com/docs/v3/Plugins/SplitText/
- Anime.js documentation: https://animejs.com/documentation
- Anime.js timelines: https://animejs.com/documentation/timeline
- React Three Fiber: https://r3f.docs.pmnd.rs/
- Lenis smooth scroll: https://lenis.dev/
- Awwwards: https://www.awwwards.com/
- Locomotive: https://locomotive.ca/
- Resn: https://resn.co.nz/
- Bürocratik: https://www.burocratik.com/
- Immersive Garden: https://immersive-g.com/

**Implementation note:** Verify current package versions, licensing, browser support, and API syntax at build time. The PRD defines requirements; it does not lock the project to an unverified version number.
