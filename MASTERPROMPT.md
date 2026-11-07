# MASTER PROMPT — Build Devereux Digitals

You are a senior product designer, creative developer, motion designer, accessibility specialist, and performance-focused React engineer. Your task is to design and implement a complete, production-quality website for **Devereux Digitals**, a full-service digital agency.

Treat this prompt together with `PRD.md` and `DESIGN.md` as the source of truth. Read both documents completely before implementation. The client-provided screenshots are authoritative for required content structure and initial visual direction. Do not discard or simplify the specified sections.

Your objective is not to make a generic agency landing page. Build a premium, Awwwards-inspired digital studio experience with an intentional black/white/electric-blue identity, excellent information architecture, carefully choreographed motion, and selective high-quality 3D.

---

## 0. Non-negotiable quality bar

The final website must:
- Look professionally art-directed, not like an untouched template or generic AI output.
- Communicate the agency's services clearly within seconds.
- Include the homepage and all eight service destinations (with “Coming Soon” handled honestly).
- Include a reusable service detail template, portfolio/case studies, about, contact, and footer.
- Be responsive and intentionally composed for mobile.
- Use motion and 3D to support the content, never obstruct it.
- Be accessible by keyboard and screen reader.
- Have a working contact form integration or a clearly documented configuration point.
- Contain no fake client names, testimonials, awards, metrics, pricing, or case-study outcomes.
- Be maintainable, typed, componentized, and ready for real content.

Do not stop after creating a hero or a static homepage mockup. Implement the complete agreed scope.

## 1. First inspect the project

Before writing code:
1. Inspect the repository structure, package manager, existing framework, routing, CSS strategy, and current assets.
2. Identify whether this is an existing app or a clean project.
3. Preserve useful existing conventions and avoid destructive rewrites.
4. Check installed versions and current official documentation for every library.
5. If the repo is empty, choose a sensible React + TypeScript setup. Prefer Next.js when server rendering, metadata, and route architecture justify it; otherwise Vite + React Router is acceptable. Explain the decision in a short implementation note.
6. Create a task plan and implement in small, verifiable phases.
7. Do not ask the user to supply content that is already present in the PRD or screenshots. For unknown business facts, create clearly marked editable placeholders or omit the claim.

## 2. Recommended stack and animation ownership

Use the existing stack if viable. Otherwise use:

- React + TypeScript.
- Next.js App Router or Vite + React Router, chosen based on SEO and hosting needs.
- Tailwind CSS or a coherent CSS variable/token system.
- React Three Fiber + Three.js for the selective 3D hero scene.
- React Bits components selectively copied/adapted from the official library.
- GSAP + ScrollTrigger for complex scroll choreography.
- Motion for React (`motion/react`) for component transitions, gestures, layout and UI state.
- Anime.js for isolated SVG / vector timelines only where it provides clear value.
- Lenis only if smooth scrolling is beneficial and correctly integrated with the selected scroll system.

### Critical animation ownership rule
Do not let multiple libraries animate the same property on the same element. Assign ownership:
- R3F owns objects, camera, lights, and materials inside the canvas.
- GSAP owns pinned/scrubbed scroll scenes and complex DOM timelines.
- Motion owns React UI state, gestures, layout, menus, accordions, and simple component transitions.
- Anime.js owns isolated SVG/vector sequences.
- CSS owns simple hover/focus transitions.
- React Bits provides selected components; adapt their animation ownership to the system above.

Do not add libraries just to increase the dependency count. Avoid duplicate scroll engines and avoid using both Lenis and another smooth-scroll controller.

## 3. Brand and art direction

Build the visual identity around:

```css
:root {
  --color-bg: #050505;
  --color-surface: #0B0C0F;
  --color-surface-2: #111318;
  --color-surface-3: #1A1D23;
  --color-text: #F7F8FA;
  --color-text-muted: #A5A9B2;
  --color-text-subtle: #737984;
  --color-accent: #398BFF;
  --color-accent-bright: #63A5FF;
  --color-accent-deep: #0B2B54;
  --color-border: rgba(255,255,255,.12);
  --color-border-strong: rgba(255,255,255,.22);
}
```

Typography:
- Display: Space Grotesk or Satoshi.
- Body/UI: Inter.
- Use fluid type with `clamp()`.
- Large, confident, carefully line-broken headings.
- Comfortable paragraph measure.
- Use blue as a signal accent, not as a blanket background.

Design language:
- Near-black backgrounds.
- White and muted grey typography.
- Electric-blue section labels, CTA details, and selected highlights.
- Fine borders and controlled radii.
- Editorial layouts, asymmetric compositions where useful, generous negative space.
- Strong project imagery.
- No generic stock-photo collage.
- No meaningless glass cards, neon gradients, floating dashboards, or random circuit patterns.

## 4. Homepage architecture

Implement this order unless the PRD explicitly calls for an adjustment:

1. Header / navigation.
2. Hero.
3. Services overview.
4. Why Devereux Digitals.
5. Featured work / selected projects.
6. Process / how we work (recommended).
7. Testimonials (only with real approved content).
8. Final CTA.
9. Footer.

### Hero requirements
- Strong headline communicating agency value.
- Concise supporting description.
- Primary CTA: “Explore Our Services”.
- Secondary CTA: “Let’s Talk” or “Start a Project”.
- A signature 3D visual on the right / behind copy, with clear text contrast.
- Do not hide the headline behind an intro animation.
- Keep initial motion short and content immediately available.
- Use semantic HTML text, not text rendered inside canvas.

Suggested headline direction (editable, not mandatory): “Digital experiences that move businesses forward.” Do not claim guaranteed growth or results.

### Services grid
Create eight service cards:
1. Web Design & Development
2. Digital Marketing
3. Paid Advertising
4. E-commerce Solutions
5. Video & Content
6. AI & Business Solutions
7. Branding & Creative Design
8. Coming Soon

Each available service card must link to a dedicated route. “Coming Soon” must be visually clear and must not route to an empty or misleading page. Use a disabled/teaser/waitlist treatment only after confirming intended behavior.

Each card:
- Number.
- Title.
- Concise service description.
- “Explore service” link.
- Directional arrow.
- Border / surface hover feedback.
- Visible keyboard focus.
- Touch-friendly behavior.

### Why choose us
Use real approved differentiators. If none are provided, write neutral, editable copy about approach, collaboration, craft, and optimization. Do not invent years of experience, client totals, awards, or results.

### Featured work
Use actual approved work if present in the repository/assets. Otherwise create clearly labeled example placeholders that are easy to replace. Do not imply fictional projects are real client commissions. Case study cards need image, title, category, summary, and link.

### Final CTA
Suggested direction: “Let’s build something that grows.”
Use a strong enquiry CTA with a clear next step.

## 5. Service detail pages

Build a reusable, data-driven template and route for each published service.

Required sections:
1. Service introduction.
2. Problems we solve.
3. What we deliver.
4. Our process.
5. Portfolio / past work.
6. Benefits / why choose us.
7. Client reviews & testimonials (approved only).
8. Pricing & packages (approved values only; otherwise quote-based).
9. FAQs.
10. Final call to action.

For Web Design & Development, use the supplied reference examples:
- Problems: outdated websites that do not convert; poor mobile experiences; slow websites; lack of a professional online presence.
- Deliverables: business websites, ecommerce websites, landing pages, redesigns, responsive design, optimization.
- Process: discovery, planning/design, development, testing/optimization, launch/handover.

For other services, write unique service-specific content. Do not copy/paste web design content onto Digital Marketing, Paid Advertising, Ecommerce, Video, AI, or Branding pages.

Use CMS-ready typed data:
- `services`
- `projects`
- `testimonials`
- `faqs`

Keep page content separate from layout components. Create reusable `ServicePageTemplate`, `ServiceHero`, `ProblemList`, `DeliverablesGrid`, `ProcessSteps`, `ProjectGrid`, `Testimonial`, `PricingBlock`, `FAQAccordion`, and `ServiceCTA` components where appropriate.

## 6. Navigation

Implement the minimal menu shown in the client references:
- Home.
- Services expandable group with eight service entries.
- About Us.
- Contact.
- “Let’s Discuss Your Project” CTA.

Requirements:
- Desktop and mobile behavior.
- Keyboard accessible.
- Escape closes.
- Focus management.
- Visible close control.
- Touch target >= 44 px.
- Do not rely on hover.
- Menu must not trap users or block browser back behavior.
- Animate overlay with a short, elegant reveal and restrained stagger.

## 7. Signature 3D experience — “The Signal Core”

Build one polished hero scene using React Three Fiber and Three.js.

### Art direction
Create an abstract sculptural digital object:
- A central dark chrome / smoked-glass geometry.
- A few orbiting rings, connected forms, or subtle nodes.
- Electric-blue rim lighting.
- Deep-black environment.
- Controlled reflections and restrained bloom.
- Premium industrial / digital-art feeling.
- Avoid literal robot heads, brains, generic AI icons, or stock-looking sci-fi objects.

### Interaction
- Slow idle rotation.
- Subtle pointer parallax on desktop only.
- Pointer interaction must be damped and limited.
- No cursor tracking that causes nausea or distracts.
- Pause when offscreen or tab is hidden where practical.
- Reduced-motion preference disables or greatly reduces idle rotation and parallax.

### Performance
- Lazy-load the scene.
- Use a fallback static image / CSS composition.
- Use capability-aware quality tiers.
- Avoid expensive post-processing unless measured and justified.
- Keep geometry and texture sizes reasonable.
- Use R3F frame updates / refs for continuous motion, not React state updates every frame.
- Consider `frameloop="demand"` if the scene can be mostly static.
- Ensure the canvas does not block scrolling or text selection.
- Add an error boundary / fallback if WebGL initialization fails.
- Canvas is decorative (`aria-hidden`) unless a fully accessible control model is implemented.

## 8. React Bits integration

Browse the current official React Bits library and inspect each component's current source, dependencies, license, and responsive behavior before use:
- https://www.reactbits.dev/
- https://www.reactbits.dev/get-started/index
- https://github.com/DavidHDev/react-bits

Potential component candidates (choose selectively):
- BlurText / SplitText for short hero or section reveals.
- Magnet for desktop CTA feedback.
- SpotlightCard for one card family if restrained.
- TiltedCard for selected portfolio card depth, disabled on touch.
- PixelTransition for one selected image transition.
- Aurora / Threads / Squares / Particles for a single atmospheric background.
- CountUp only for verified metrics.
- TextType / RotatingText only for a short supporting phrase, never the main value proposition.

Do not use every effect. Choose a coherent subset. Prefer two or three signature React Bits components over a catalogue of unrelated animations.

## 9. Motion direction and implementation

### Motion hierarchy
1. Signature motion: hero 3D object and hero headline reveal.
2. Section motion: restrained in-view reveals and portfolio image transitions.
3. Interaction motion: buttons, cards, menu, accordion, form feedback.
4. Ambient motion: optional slow background effect.

### GSAP
Use GSAP + ScrollTrigger for:
- A small number of high-value scroll sequences.
- Pinned feature storytelling only if it improves the narrative.
- Image / typography sequences where synchronization matters.
- Desktop-specific scenes with mobile alternatives.

Use proper React lifecycle cleanup and responsive matchMedia logic. Avoid excessive pinning and long scroll locks.

### Motion for React
Use for:
- Menu open/close.
- Accordions.
- Card and button interaction.
- Layout transitions.
- Simple in-view reveals.
- Page-level transition if compatible with router and accessibility.

### Anime.js
Use for:
- Logo SVG line drawing.
- A small vector motif.
- One controlled SVG timeline if needed.
Do not use legacy Anime.js v2 syntax without checking current docs.

### Lenis
Optional. Add only if the experience genuinely benefits from it. Preserve native touch behavior, keyboard scrolling, browser history, anchors, and accessibility. If used with ScrollTrigger, follow current official integration guidance and test on iOS and Android.

### Motion details
- Hero line reveal: masked y movement, 500–800 ms, short stagger.
- Body copy: simple opacity / 8–16 px translate, 350–550 ms.
- Cards: 180–280 ms hover/focus.
- Menu: 250–450 ms.
- Scroll reveals: 500–750 ms.
- Avoid bouncy or elastic movement except tiny tactile feedback.
- Use transforms and opacity where possible.
- Never animate every paragraph or every card independently if it creates noise.

### Reduced motion
Implement a shared reduced-motion utility/hook and CSS media query. In reduced-motion mode:
- Disable scroll-scrub sequences.
- Remove large parallax and magnetic effects.
- Stop auto-rotation.
- Replace long transforms with immediate state changes or subtle fades.
- Ensure content remains visible and functional.

## 10. Portfolio / case studies

Build:
- Portfolio index.
- Reusable case study detail route.
- Project card component.
- Optional service/category filters only if there is enough content to make them useful.

Case study content:
- Title.
- Industry.
- Service tags.
- Summary.
- Challenge.
- Approach.
- Deliverables.
- Image gallery.
- Verified outcomes, if provided.
- Related projects.
- CTA.

Never fabricate metrics. If no real project content is available, create obvious “Concept Project” placeholders or keep the section in a preview state until assets are supplied.

## 11. Contact form

Build a polished project enquiry form with:
- Name.
- Work email.
- Service of interest.
- Project summary.
- Optional company / website.
- Optional budget and timeline only if approved.

Requirements:
- Client and server-side validation.
- Accessible labels and error messages.
- Loading, success, and failure states.
- Spam protection.
- Do not send form values to analytics.
- Do not pretend submission succeeded if no backend exists.
- Create a clear integration adapter / environment configuration for the selected email or CRM provider.
- Keep secrets server-side.
- If credentials are missing, show a development-only safe state and document exactly what is needed for launch.

## 12. Responsive implementation

Test at minimum:
- 360 × 800 mobile.
- 390 × 844 mobile.
- 768 × 1024 tablet.
- 1024 × 768 small desktop.
- 1440 × 900 desktop.
- 1920 × 1080 wide desktop.

Mobile rules:
- No hover-only content.
- No magnetic cursor.
- Reduce or disable tilt and parallax.
- Simplify 3D.
- Use intentional line breaks.
- Full-screen or near-full-screen menu.
- Avoid horizontal overflow.
- Keep CTA reachable.
- Respect safe-area insets.
- Do not pin long sections.

## 13. SEO, accessibility, and performance

SEO:
- Unique title and description per route.
- Open Graph metadata.
- Canonical URLs.
- Sitemap and robots.
- Semantic heading hierarchy.
- Useful alt text.
- Structured data only where accurate.

Accessibility:
- Target WCAG 2.2 AA.
- Semantic HTML.
- Keyboard navigation.
- Visible focus.
- Contrast checks.
- Accessible accordions and menu.
- Reduced-motion mode.
- Labels and field errors.
- Decorative canvas hidden from assistive technology.

Performance:
- Target Core Web Vitals: LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1 at 75th percentile.
- Lazy-load noncritical 3D and below-fold images.
- Responsive AVIF/WebP images.
- Explicit image dimensions / aspect ratios.
- Avoid huge background videos and expensive shaders.
- Avoid unnecessary React re-renders.
- Monitor bundle size.
- Test CPU throttling and real mobile hardware.

## 14. Component architecture

Use a clear structure similar to:

```text
src/
  app-or-routes/
  components/
    layout/
      SiteHeader
      NavigationOverlay
      SiteFooter
      PageTransition
    home/
      Hero
      SignalCoreScene
      ServicesGrid
      WhyChooseUs
      FeaturedWork
      ProcessSection
      FinalCTA
    services/
      ServicePageTemplate
      ServiceHero
      ProblemList
      DeliverablesGrid
      ProcessSteps
      ServiceProjects
      PricingBlock
      FAQAccordion
      ServiceCTA
    portfolio/
      ProjectCard
      ProjectGrid
      CaseStudyLayout
    forms/
      ProjectEnquiryForm
    motion/
      Reveal
      ReducedMotionProvider
  data/
    services
    projects
    testimonials
    faqs
  hooks/
  lib/
  styles/
    tokens.css
    globals.css
```

Adapt to the framework and repository conventions. Do not create one giant component file. Keep content data separate from presentation.

## 15. Implementation phases and required checkpoints

### Phase 1 — Audit and foundation
- Inspect repo.
- Confirm framework and package manager.
- Establish tokens, fonts, layout, routes.
- Create shared header/footer and navigation.
- Verify build.

### Phase 2 — Static structure and content model
- Build homepage sections.
- Build service data and reusable detail template.
- Build portfolio and case study model.
- Build about and contact routes.
- Verify every route and link.

### Phase 3 — Visual refinement
- Apply final typography and spacing.
- Refine cards, imagery, CTA, navigation.
- Ensure design is not generic.
- Verify mobile composition before advanced animation.

### Phase 4 — Motion system
- Add Motion for React interactions.
- Add GSAP ScrollTrigger only for selected sequences.
- Add Anime.js only for isolated SVG/vector animation.
- Integrate selected React Bits components.
- Add reduced-motion behavior and cleanup.

### Phase 5 — 3D hero
- Build Signal Core scene.
- Add responsive quality tiers and fallback.
- Measure load and rendering cost.
- Verify mobile and WebGL failure behavior.

### Phase 6 — Form and content integrations
- Connect approved form endpoint.
- Add real approved project assets and content.
- Configure metadata, sitemap, analytics if approved.

### Phase 7 — QA and handoff
- Test responsive breakpoints.
- Test keyboard-only navigation.
- Test reduced motion.
- Test all links and forms.
- Check console and network errors.
- Run build and lint/type checks.
- Document environment variables and deployment steps.
- Provide a list of client content still required.

Do not claim completion while any critical route, form, or navigation behavior is a placeholder.

## 16. Required final deliverables

At completion, provide:
1. Fully implemented responsive website.
2. Reusable component architecture.
3. Typed content data / CMS integration.
4. Working navigation and routes.
5. Working enquiry form or explicit backend integration requirements.
6. 3D hero with fallback.
7. Motion system with reduced-motion support.
8. SEO metadata.
9. README with install, dev, build, and deployment steps.
10. `.env.example` with variable names only; no secrets.
11. QA summary including tested breakpoints and known limitations.
12. Content checklist identifying all client approvals still needed.

## 17. Definition of done

The task is complete only when:
- All pages and service routes work.
- Every service card has the correct destination or honest coming-soon state.
- The navigation works on desktop, tablet, and mobile.
- All sections in the PRD are implemented or explicitly marked pending client content.
- 3D works with fallback and does not block the experience.
- Motion is coherent, performant, and accessible.
- Reduced-motion mode works.
- The site has no horizontal overflow at tested widths.
- No fake claims, fake reviews, or invented prices remain.
- Contact form success/failure behavior is honest and tested.
- Production build passes.
- README and handoff notes are complete.

## 18. Final instruction

Work like a senior studio team delivering a paid client project. Make deliberate design decisions, inspect your own output, and refine it. Do not settle for the first generated layout. Prioritize clarity, originality, accessibility, responsiveness, and performance. Use the client screenshots as the structural brief, the PRD as the product contract, and the design specification as the visual/motion contract.
