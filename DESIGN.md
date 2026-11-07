# Devereux Digitals — Design System & Experience Specification

**Document status:** Design handoff / v1.0  
**Design intent:** Premium dark digital studio, editorial typography, electric-blue signal color, restrained 3D, precise motion  
**Primary reference:** Client-supplied screenshots  
**Design principle:** Make the work feel advanced; make the interface feel effortless.

---

## 1. Creative direction

### 1.1 Design thesis

Devereux Digitals should look like a contemporary digital studio with the confidence of a specialist agency. The interface should combine:
- A dark editorial canvas.
- Oversized, high-contrast typography.
- A controlled electric-blue accent.
- Architectural grid layouts.
- Carefully selected project imagery.
- A single memorable 3D hero motif.
- Small, high-quality interactions throughout.

Avoid the generic “AI agency” aesthetic: random neon gradients, floating glass cards everywhere, excessive glowing borders, meaningless dashboards, and decorative particle effects without a concept.

### 1.2 Reference interpretation

The client screenshots communicate:
- Black page background and white primary typography.
- Blue pill labels for section numbers.
- Fine grey dividers and subtle card outlines.
- Service cards arranged in a compact grid.
- Clear page sections with explicit labels.
- A minimal navigation drawer with a grouped Services list.
- A practical service detail structure.
- Strong conversion CTAs.

Preserve this recognizable design language while elevating typography, spacing, art direction, and motion.

### 1.3 Desired emotional response

Visitors should feel:
1. “This agency understands modern digital work.”
2. “I can quickly find the service I need.”
3. “Their work and process feel credible.”
4. “The website is polished, but not difficult to use.”
5. “I know exactly how to start a conversation.”

## 2. Visual system

### 2.1 Color tokens

Use CSS variables or equivalent design tokens. Values below are starting tokens and should be checked against actual contrast ratios.

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#050505` | Main background |
| `--color-surface` | `#0B0C0F` | Raised sections |
| `--color-surface-2` | `#111318` | Cards / menus |
| `--color-surface-3` | `#1A1D23` | Hover / selected surface |
| `--color-text` | `#F7F8FA` | Primary text |
| `--color-text-muted` | `#A5A9B2` | Secondary text |
| `--color-text-subtle` | `#737984` | Metadata only |
| `--color-accent` | `#398BFF` | Primary accent |
| `--color-accent-bright` | `#63A5FF` | Hover / active |
| `--color-accent-deep` | `#0B2B54` | Accent surface |
| `--color-border` | `rgba(255,255,255,.12)` | Standard borders |
| `--color-border-strong` | `rgba(255,255,255,.22)` | Focus / emphasis |
| `--color-success` | `#6DD6A2` | Only for verified success state |
| `--color-danger` | `#FF7373` | Error state |

Rules:
- Blue is a signal color, not a background for every section.
- Use white for important content and grey for supporting information.
- Borders should be subtle at rest and clearer on focus/hover.
- Do not use low-contrast grey for essential text.
- Gradients should be rare and purposeful: hero atmosphere, selected 3D lighting, or a subtle CTA surface.

### 2.2 Typography

Suggested pairing:
- Display / headings: **Space Grotesk** or **Satoshi**.
- Body / UI: **Inter**.
- Use locally hosted licensed font files where possible; otherwise use a reliable fallback stack.

Type scale (fluid with `clamp()`):
| Role | Desktop target | Mobile target | Weight / line height |
|---|---:|---:|---|
| Display H1 | 76–112 px | 42–58 px | 600–700 / 0.95–1.05 |
| H2 | 48–64 px | 34–42 px | 600–700 / 1.0–1.1 |
| H3 | 28–36 px | 24–30 px | 600 / 1.1–1.2 |
| H4 | 20–24 px | 19–22 px | 600 / 1.2 |
| Body large | 20–24 px | 18–20 px | 400–500 / 1.45–1.6 |
| Body | 16–18 px | 16–17 px | 400 / 1.5–1.65 |
| Caption | 12–14 px | 12–14 px | 500 / 1.4 |

Typography rules:
- Headlines should be concise and intentional.
- Use line breaks to create rhythm, not to force arbitrary shapes.
- Do not use character-by-character animation for long body copy.
- Keep paragraph line length around 55–75 characters on desktop.
- Use uppercase sparingly for micro-labels, not whole paragraphs.

### 2.3 Layout grid and spacing

- Desktop content max width: 1440 px (with generous side gutters).
- Main content width: 1200–1320 px depending on viewport.
- Grid: 12 columns desktop, 8 tablet, 4 mobile.
- Desktop gutters: 48–72 px; tablet: 28–40 px; mobile: 20–24 px.
- Section spacing: 120–180 px desktop, 80–112 px tablet, 64–88 px mobile.
- Card gap: 12–20 px depending on density.
- Use an 8 px base spacing rhythm with 4 px half-step for micro spacing.
- Avoid full-bleed text blocks that become difficult to scan.

Suggested spacing tokens:
`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120, 160`.

### 2.4 Shape and surface language

- Cards: 12–20 px radius, thin border, minimal shadow.
- Buttons: 999 px pill or 10–14 px radius depending on component.
- Pills: blue-dark surface with blue text; compact and restrained.
- Dividers: 1 px with low-opacity white.
- Avoid excessive glassmorphism. Use blur only for overlay navigation or floating controls where it improves separation.
- Use shadows primarily to separate layers, not to make every component float.

## 3. Brand visual motifs

### 3.1 Primary motif: “Digital signal field”
A restrained abstract system of fine lines, nodes, and depth cues that suggests connected digital capabilities. It should be atmospheric and secondary to content.

### 3.2 3D hero object
Recommended concept: **The Signal Core**.
- A sculptural, abstract object composed of a central reflective form and a small number of orbiting / connected elements.
- Material: dark chrome / smoked glass / satin metal with electric-blue edge lighting.
- Shape language: clean, engineered, rounded geometry; no literal robot, brain, or generic AI head.
- Motion: slow rotation, subtle orbital movement, slight pointer parallax on desktop.
- Camera: restrained perspective, object kept to the right or behind the text.
- Lighting: one key light, one blue rim light, low-intensity ambient.
- Background: deep black with sparse depth particles or a soft radial atmosphere.
- No rapid flashing, uncontrolled particle storm, or large bloom halo.
- The object must never make text difficult to read.

### 3.3 Imagery art direction
- Use real project screenshots and approved brand assets wherever possible.
- Prefer large, crisp images with carefully controlled crop.
- Case study visuals should feel like editorial project features, not a stock-photo card grid.
- For abstract service imagery, use consistent art direction across all eight services.
- Avoid unrelated stock photography of handshakes, generic office teams, and glowing circuit brains.
- If no real work exists, label concept work transparently.

## 4. Component design specifications

### 4.1 Header
Desktop:
- Wordmark left.
- Navigation links or menu trigger aligned right.
- Optional small CTA.
- Transparent over hero, transitioning to opaque `--color-bg` with subtle backdrop blur after scroll.

Mobile:
- Wordmark left.
- Menu icon and label right.
- At least 44 × 44 px interactive target.
- Header height around 64–76 px.

### 4.2 Navigation overlay / drawer
- Dark surface, full viewport or near-full viewport.
- Large, legible navigation links.
- Services group expanded with eight service links.
- Clear close affordance.
- Project CTA near bottom.
- Stagger links by 40–70 ms, but do not delay interaction availability.
- Escape closes; focus is trapped while modal-style overlay is open; focus returns to trigger.
- On mobile, do not rely on hover or tiny submenu hit areas.

### 4.3 Service cards
Desktop:
- 2–4 columns depending on content width and density.
- Number label small and muted.
- Service title prominent.
- “Explore service” link and directional icon.
- Optional visual layer / background image revealed on hover.

Hover / focus:
- Border becomes brighter.
- Surface lifts subtly (2–4 px).
- Accent line or image crop moves 2–4%.
- Arrow shifts 3–5 px.
- Focus state must be at least as clear as hover.

Mobile:
- No hover-only content.
- Tap target is the whole card.
- Use one-column or two-column layout only if titles remain readable.

### 4.4 Buttons
Primary:
- Electric blue fill or blue outline based on background.
- Clear verb-led label.
- Arrow icon optional.
- Hover: slight brightness and 1–2 px lift.
- Press: scale to 0.98 or equivalent tactile response.
- No large cursor-following magnetic behavior on touch.

Secondary:
- Transparent surface, subtle border, white text.
- Hover border brightens.

### 4.5 Section labels
- Compact blue-dark pill.
- Example: `01 / SERVICES`.
- Use consistent numbering and spacing.
- Do not let labels become the primary visual hierarchy.

### 4.6 Portfolio cards
- Editorial image ratio around 4:3 or 16:10 depending on project.
- Project title, category, short outcome / role.
- Image reveal can use a subtle mask or scale.
- Hover should reveal details without hiding title or link.
- On mobile, all information remains visible.

### 4.7 Testimonial
- Large quote typography but not oversized to the point of reducing readability.
- Attribution only when permission exists.
- Avoid fake star ratings.
- Carousel auto-play should be avoided; if used, provide pause and manual controls.

### 4.8 Pricing cards
- Clear tier name, price / quote state, scope, and CTA.
- Do not visually imply a “best value” tier unless the client has selected it.
- Use feature grouping and a clear distinction between included and excluded scope.
- Avoid decorative animated counters.

### 4.9 FAQ accordion
- Native button trigger.
- Correct `aria-expanded` and panel relationship.
- Smooth height transition that respects reduced motion.
- Keep answer text in the DOM and readable.
- Keyboard support with standard tab behavior.

### 4.10 Contact form
- Dark surface, high-contrast labels, visible field borders.
- Clear required / optional markers.
- Focus border blue.
- Error state uses text and icon, not color alone.
- Success state confirms what happens next without inventing response times.

## 5. Page composition

### 5.1 Homepage sequence

1. Header.
2. Hero / agency positioning.
3. Services overview (eight cards).
4. Why Devereux Digitals.
5. Featured work / selected projects.
6. Process / how we work (recommended).
7. Testimonials (only if approved).
8. Final CTA.
9. Footer.

The client’s original sequence is the source of truth for required sections. Featured work and process may be introduced where they strengthen credibility and flow.

### 5.2 Service page sequence

1. Breadcrumb / service label.
2. Service introduction.
3. Problems we solve.
4. What we deliver.
5. Process.
6. Portfolio / related case studies.
7. Benefits / differentiators.
8. Testimonials if relevant and approved.
9. Pricing / quote approach.
10. FAQs.
11. Final CTA.
12. Footer.

Use a consistent layout system, but allow each service page to have distinct hero imagery and service-specific content.

### 5.3 About page
- Agency point of view.
- Values / principles.
- Team only if actual team details and imagery are approved.
- Process and collaboration model.
- CTA.

### 5.4 Contact page
- Direct, low-friction project enquiry.
- Clear expectations about what information is useful.
- Contact methods only if approved.
- No fake calendar availability.

## 6. Motion design system

### 6.1 Motion principles
- Motion should be directional, restrained, and consistent.
- Prefer opacity and transform over animating layout-heavy properties.
- Use a single signature motion language across all pages.
- Avoid animating every element.
- Do not run expensive effects continuously in the background.
- Content must be visible if animation fails.

### 6.2 Timing and easing tokens

| Token | Duration | Use |
|---|---:|---|
| `--motion-micro` | 120–180 ms | Button / icon feedback |
| `--motion-ui` | 180–280 ms | Menus, accordions, hover |
| `--motion-reveal` | 500–750 ms | Section entrance |
| `--motion-feature` | 800–1200 ms | Hero / major visual |
| `--motion-stagger` | 40–90 ms | Small groups |

Easing guidance:
- UI: ease-out / spring with low bounce.
- Editorial reveals: power2.out / power3.out equivalent.
- 3D idle: linear or smooth sine-like interpolation.
- Avoid elastic overshoot on professional agency interfaces.

### 6.3 Motion choreography by section

#### Page load / hero
- Wordmark / nav appears quickly.
- Eyebrow label fades in.
- H1 reveals by line with masked vertical movement.
- Supporting copy fades in shortly after.
- CTA enters with a small upward movement.
- 3D scene fades from low opacity and settles into a slow idle loop.
- Entire initial sequence should feel complete in roughly 1–1.5 seconds, while content remains accessible immediately.

#### Services section
- Section label and title reveal.
- Cards enter with a restrained stagger.
- On hover/focus, use border, arrow, and visual feedback.
- Do not rotate cards or create large perspective distortions.

#### Why section
- Text reveals by line.
- Optional visual or statistic enters only when in view.
- Counters only animate if they represent verified numbers; otherwise do not use fake counters.

#### Portfolio
- Image mask reveal / subtle scale from 1.04 to 1.
- Title and metadata fade in.
- Optional horizontal drag carousel only when it improves browsing; do not make desktop content inaccessible to keyboard.

#### Service page
- Hero uses the same intro grammar with a service-specific visual.
- Problem and deliverable lists use subtle stagger.
- Process may use a vertical progress line or numbered steps.
- Case-study gallery uses image transitions, not continuous parallax on every image.
- FAQ uses a height / opacity transition.

#### Navigation
- Overlay fades in with a short scale or clip reveal.
- Link list staggers.
- Close animation must be fast.
- Do not delay the ability to close.

#### CTA
- Small magnetic response on desktop fine pointer only.
- Accent glow should be subtle and limited.
- Avoid large cursor-following effects that interfere with text selection.

### 6.4 Motion library responsibility matrix

Use the following division to avoid redundant animation systems:

| Tool | Primary responsibility | Use it for | Do not use it for |
|---|---|---|---|
| React Bits | Ready-made creative component source | Text effects, backgrounds, hover cards, cursor effects, selected visual primitives | Blindly importing every effect |
| GSAP + ScrollTrigger | Complex scroll choreography | Pinned storytelling, scrubbed sequences, synchronized multi-element timelines | Simple button hover or basic React state |
| Motion for React | React-native interaction | Component entrance, gestures, layout, modal, accordion, route-level transitions | Competing with GSAP on the same DOM property |
| Anime.js | Isolated vector / SVG timelines | SVG line drawing, icon sequences, logo animation, controlled decorative timeline | Animating the same nodes as GSAP/Motion |
| React Three Fiber + Three.js | 3D scene | Hero sculpture, scene camera, materials, lights, pointer parallax | General DOM UI |
| Lenis | Optional smooth scroll | Consistent scroll feel if verified and genuinely beneficial | Replacing native accessibility or hijacking touch |

**Rule:** A DOM element should have one animation owner for each animated property. If GSAP owns the transform of an element, Motion must not also animate that transform.

### 6.5 React Bits component shortlist

Select components based on actual fit and current availability in the library. Verify implementation API and dependencies at integration time.

Potential candidates:
- **BlurText / SplitText:** hero or section heading reveal.
- **TextType / RotatingText:** only for a short rotating descriptor, not the main H1.
- **Magnet:** subtle desktop CTA interaction.
- **SpotlightCard:** optional service card lighting.
- **TiltedCard:** portfolio card depth, use sparingly and disable on touch.
- **PixelTransition:** selected image transition or one portfolio feature.
- **Aurora / Threads / Squares / Particles:** background atmosphere; use only one primary background effect.
- **SplashCursor:** only if it fits the brand and is throttled; likely omit from core agency pages.
- **CountUp:** verified metrics only.
- **Dock / animated navigation patterns:** only if they improve navigation rather than decorate it.

Do not install components solely because they look impressive in a demo. Review source, accessibility, bundle cost, mobile behavior, licensing, and maintenance.

### 6.6 GSAP usage
Recommended:
- `ScrollTrigger` for a small number of scroll-linked scenes.
- `SplitText` (if licensed / available under current GSAP terms) for responsive line / word reveals.
- GSAP context / cleanup pattern in React.
- Use `matchMedia` for desktop-only pinned effects.
- Kill and revert animations on unmount.
- Avoid long pinned sequences on mobile.

### 6.7 Anime.js usage
Recommended:
- Logo line-draw / SVG path reveal.
- Small icon morph or vector sequence.
- One independent abstract SVG timeline.
- Use current Anime.js documentation and API, not old v2 examples.
- Do not use it as a second global scroll engine.

### 6.8 3D implementation
- React Three Fiber scene should be isolated in a lazy-loaded component.
- Use Canvas only where required.
- Use `frameloop="demand"` where continuous rendering is not necessary.
- If idle animation is required, use a restrained frame loop and pause when offscreen / tab hidden.
- Use instancing for repeated geometry if appropriate.
- Compress textures and avoid oversized maps.
- Keep geometry and material counts low.
- Use device / capability-aware quality levels.
- Add a CSS / image fallback if WebGL is unavailable.
- The canvas should be `aria-hidden` if decorative.
- Pointer interaction must not prevent normal page scrolling or text selection.

## 7. Responsive behavior

### 7.1 Desktop (>= 1200 px)
- Full 3D hero scene.
- 12-column grid.
- 2–4 service cards per row based on content.
- Rich hover interactions.
- Optional pinned or horizontal scroll feature only for selected work.

### 7.2 Tablet (768–1199 px)
- Reduce 3D complexity and parallax amplitude.
- 2-column services grid.
- Avoid tight navigation.
- Reduce heading scale and section gaps.
- Ensure no sticky/pinned animation traps.

### 7.3 Mobile (< 768 px)
- Single-column hero composition; 3D object can sit behind or below copy.
- Use static or simplified 3D fallback on low-power devices.
- 1–2 column service cards depending on width.
- Full-screen navigation drawer.
- No hover-only affordances.
- Disable magnetic cursor, tilt, and large parallax.
- Avoid horizontal scroll unless there is a clear carousel control and keyboard equivalent.
- Keep CTA visible and easy to tap.
- Respect safe-area insets.

## 8. Accessibility and inclusive motion

- Support `prefers-reduced-motion: reduce`.
- Replace large transforms and parallax with simple opacity or no animation.
- Stop auto-rotating 3D scene when reduced motion is requested.
- No auto-playing sound.
- Avoid flashing and rapid high-contrast changes.
- All controls need visible keyboard focus.
- Decorative canvas should not create a screen-reader obstacle.
- Use semantic buttons and links.
- Maintain readable contrast.
- Do not encode information only in color or motion.
- Provide pause control for any nonessential long-running animation if it meets the relevant accessibility criteria.

## 9. Performance and quality guardrails

- Do not load the 3D scene before it is needed if it materially increases initial load.
- Use responsive image sources and modern formats.
- Set image width/height or aspect ratio to prevent layout shift.
- Lazy-load below-the-fold media.
- Avoid multiple large WebGL backgrounds.
- Avoid huge blur filters and full-screen high-cost shader layers on mobile.
- Animate `transform` and `opacity` where possible.
- Avoid React state updates on every animation frame.
- Use R3F refs / frame updates for scene motion.
- Test with CPU throttling and mobile emulation.
- Target Core Web Vitals: LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1 at the 75th percentile.

## 10. Design QA checklist

### Brand
- [ ] Black / white / blue visual language is consistent.
- [ ] Accent blue is used intentionally.
- [ ] Typography hierarchy is clear.
- [ ] No generic template styling remains uncustomized.

### Layout
- [ ] Content grid is consistent.
- [ ] Service cards are aligned and readable.
- [ ] Section spacing feels deliberate.
- [ ] No horizontal overflow.
- [ ] Footer is complete.

### Motion
- [ ] Hero intro is brief.
- [ ] Motion does not delay content.
- [ ] Scroll effects do not hijack scrolling.
- [ ] Reduced-motion mode works.
- [ ] Touch devices do not depend on hover.
- [ ] No animation conflicts across libraries.

### 3D
- [ ] Scene supports fallback.
- [ ] Scene does not obscure copy.
- [ ] Low-power behavior is acceptable.
- [ ] Canvas is not an accessibility barrier.
- [ ] No unnecessary continuous render loop.

### Content
- [ ] Every service has unique copy.
- [ ] Projects and testimonials are approved.
- [ ] Pricing is accurate or hidden.
- [ ] No fabricated metrics, logos, awards, or claims.
- [ ] All CTAs have real destinations.

---

## 11. Design references and useful libraries

### Client-provided visual references
Use the supplied screenshots as the authoritative source for:
- Homepage section order.
- Eight service cards.
- Service detail structure.
- Menu / navigation hierarchy.
- Dark visual style and blue section labels.
- CTA and footer content.

### Inspiration websites
Study interaction patterns and art direction—not copy or exact layouts:
- Locomotive — https://locomotive.ca/
- Resn — https://resn.co.nz/
- Bürocratik — https://www.burocratik.com/
- Immersive Garden — https://immersive-g.com/
- Awwwards — https://www.awwwards.com/

### Implementation references
- React Bits — https://www.reactbits.dev/
- React Bits component browser — https://www.reactbits.dev/get-started/index
- React Bits GitHub — https://github.com/DavidHDev/react-bits
- Motion for React — https://motion.dev/docs/react
- Motion layout animation — https://motion.dev/docs/react-layout-animations
- GSAP ScrollTrigger — https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- GSAP SplitText — https://gsap.com/docs/v3/Plugins/SplitText/
- Anime.js — https://animejs.com/documentation
- Anime.js timelines — https://animejs.com/documentation/timeline
- React Three Fiber — https://r3f.docs.pmnd.rs/
- Lenis — https://lenis.dev/

**Final design rule:** The site should feel award-worthy because of its art direction, content, transitions, and craft—not because every element is moving.
