# Cinematic scroll stage — reference study, build notes and match report

Route: **`/reference-motion-lab`** (noindex, not in nav/sitemap; unsmoothed scrub + progress HUD).
The same component powers the production homepage hero: `<ScrollStage content={homeStage} />`.

## 1. What the reference actually is (read this first)

The URL supplied — `getlayers.ai/layer/ai-studio` — is a **catalogue page for a paid template**, not the
experience itself. Inspected in Chromium, top to bottom: a static WebP thumbnail, a description, and a grid of 59
other templates. There is **no WebGL canvas, no pinned scroll, no star and no particles on that page**, and the
template's real page is paywalled ("Premium — upgrade to get access").

The closest observable artefact is the template's own 12.6 s promo recording (`ai-studio-desktop.mp4` /
`-mobile.mp4`, linked from the page). I extracted frames at 2 fps (analysis only; **nothing from it is in the
codebase**) and treated it as the benchmark. Consequences, stated plainly:

* **Measured:** visual states over time — what is on screen, where, how big, what colour.
* **Assumed, not measurable:** that scroll maps *linearly* to the recording's time (`p = t / 12.6 s`).
* **Not observable at all:** real section heights, pinning mechanics, easing curves, scrub smoothing, and
  reverse-scroll behaviour of the original. Those are my engineering choices, not matched facts.

## 2. Observed sequence (benchmark) → implementation

| Time (p) | Benchmark | Here |
|---|---|---|
| 0 – 1.4 s (0 – .11) | White page; violet hero card, tilted, swings up and away; huge marquee text behind | Hero card (−7°) swings away (`rotateX`/`rotation`/`yPercent`); marquee scrubbed behind |
| 1.4 – 3.2 s (.11 – .25) | Two tilted cards swing in and converge on one violet ✦ card | Side cards `rotateY` 62° → 28° → 84° (edge-on slivers) around the centre card |
| 3.2 – 3.6 s (.25 – .29) | **The ✦ scales until its silhouette fills the screen**, white corners remain; a dotted violet→white sphere with a small white star is inside | The ✦ *is* a CSS-mask hole in the white layer that grows to 3.6× the viewport; the WebGL canvas is masked to the same ✦ so particles exist only inside the silhouette |
| 3.9 – 4.8 s (.31 – .38) | Camera flies into the sphere; near wall disperses; hollow dust ring; copy fades up bottom-left | Camera dollies 13.5 → 1.25 through a Fibonacci-lattice shell (custom shader); shell blows outward as the camera passes; copy fades in |
| 5 – 7 s (.40 – .55) | Large image panels rise/slide in over black | Three large panels rise from the bottom edge and drift left |
| 7 – 10 s (.55 – .79) | Panels scatter and float in depth | 7 panels fly to a scattered field (translateZ/rotation/scale), idle drift on an inner node |
| 10 – 12.6 s (.79 – 1) | One floating panel (violet, chrome star inside) grows to fill the frame; white page-frame; headline left, huge chrome star right, cropped | The violet card peeks bottom-right, grows to a large card, then the frame. The chrome star is composed *for the card window* (same inset maths as the DOM clip) |

## 3. Architecture

* **One master timeline.** A single GSAP timeline (0→1) scrubbed by ScrollTrigger drives every DOM layer, the mask
  hole, and a proxy `prog.v`. `timeline.ts` holds every phase range; the DOM (`ScrollStage.tsx`) and the WebGL
  scene (`StageScene.tsx`) both read it. Nothing triggers "on enter"; all state is a pure function of progress, so
  scrolling up replays the sequence in reverse.
* **Layout:** CSS `sticky` stage inside a 720 svh (560 svh on phones) section — native scrolling, no pin-spacer,
  no scroll hijack.
* **WebGL (`StageScene.tsx`):** custom particle shader (`shaders.ts`), billboarded flat star, bevelled extruded
  chrome star (`chromeStar.ts`) lit by procedural light-formers. Lazy-loaded; paused offscreen; quality tiers.
* **Ownership:** GSAP owns the DOM timeline; R3F owns the canvas; CSS owns mask/clip rendering. No two systems write
  the same property.
* **Alternatives:** reduced motion, no WebGL and no JS render `StaticStage` (same story, stacked, nothing moves).
  Only the active layer's links are focusable at any progress.
* **Header:** flips to dark ink while the white paper phase is on screen (`data-stage-light`).

## 4. Match report (side-by-side; images in `qa/motion-comparison/`, gitignored — they contain benchmark frames)

Method: seek the lab to the progress value matching a benchmark timestamp, screenshot at 1440×900, place beside the
extracted benchmark frame. Eight iterations; sheets `01`–`05`.

**Matches closely:** opening composition (large tilted violet card on white, marquee behind); the ✦ card with edge-on
side cards; the **✦-silhouette wipe with white corners and a dotted sphere inside**; sphere colour (white rim → violet
core) and small centre star; the camera-inside sparse dust with bottom-left copy; near-empty black beat with only the
star; large centre gallery panel with neighbours; scattered floating panels; the violet card carrying the chrome star;
final frame composition (white page-frame, headline left, cropped chrome star right); silver gradient face with a dark
bevel.

**Does not match (honest list):**
* Imagery: the benchmark uses photography; mine is generated vector artwork (deliberate — no third-party assets).
* The sphere is a point cloud; the benchmark's reads as a finer, smoother dotted mesh with a hollower interior.
* Star: my tips are slightly more pointed and the bevel catches a stronger violet rim than the benchmark's softer silver.
* The benchmark's gallery strip peeks at the bottom at p≈.38; mine starts a touch later.
* Benchmark chrome (floating pill nav, "Get started" copy) is not reproduced — I keep the site's own header/CTAs.
* Easing/pinning/scrub smoothing cannot be compared (see §1).

I do **not** claim a perfect match — only that the observable sequence, composition and look are reproduced as
closely as a promo recording allows.

## 5. Verification actually run

| Check | Result |
|---|---|
| Reversibility (DOM) | p=.476 and p=.254 reached scrolling **down vs up**: pixel-identical (mean diff 0.00). p=.79 differs only by the chrome star's deliberate time-based idle sway |
| Refresh robustness | 3 forced resizes (ScrollTrigger refresh) → closing headline still hides/reveals correctly (this found and fixed a real GSAP percent-transform bug) |
| Mobile 390×844 | Own portrait composition; hero card no longer clipped; star kept low so copy stays clear |
| Reduced motion | Static twin renders, no canvas, header legible, all links live |
| Focus | Only the active layer's links are focusable; hero CTA jumps past the stage to Services |
| Lighthouse (home, mobile) | Accessibility 100 · Best Practices 100 · SEO 100 · Agentic 100 |
| Core Web Vitals (home, 390×844, CPU 4×, Fast 4G) | LCP 1.47 s · CLS 0.00 |
| Frame time (software-rendered WebGL, scrub sweep) | paper/✦/particles ≈ 7.5 ms avg; gallery ≈ 13.6 ms (p95 28 ms); card+star ≈ 11.7 ms (p95 28 ms); ≤2 frames >50 ms per 2.5 s sweep |
| Regression | typecheck ✓ lint ✓ build ✓ (28 routes) · 562 links, 0 broken · 60 route×width overflow checks clean · enquiry API/form unchanged (422/400/503 paths) · no console errors (one R3F `THREE.Clock` deprecation warning) |

## 6. Not verified

* Real mobile GPUs and Safari/Firefox (Chromium emulation + software WebGL only). The quality tier + frame-rate guard exist
  to protect low-end devices, but their thresholds are untested on hardware.
* Original easing/scrub/pinning/reverse behaviour (unobservable).
* The in-lab `?scene=force` flag disables only the frame-rate fallback, for QA on software GL.
* Screen-reader walkthrough of the pinned stage.
