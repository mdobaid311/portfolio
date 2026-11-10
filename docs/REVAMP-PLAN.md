# Night Shift — portfolio review and revamp plan

Target: mohammedobaid.in (this repo, branch `design/night-shift`).
Written 2026-11-10. Method: single-context review of all source files plus a live walkthrough at 1440×900 and 375×812. No parallel reviewers were used.

This document has two halves. Part A is the review. Part B is a build plan written so that any capable AI coding model (or a human) can implement it phase by phase without further design decisions. Where a decision depends on something only Mohammed can supply, it is marked `CONFIRM` or `ASSET`.

An honest note first: no plan can guarantee an Awwwards award. Site of the Day goes to "only the sites scored the highest by the jury", and the jury is at least 18 people. What a plan can do is remove everything that currently caps the score and give the site one idea a juror will remember. That is what this does.

---

## Part A — Review

### A1. Verdict in one paragraph

The site is well made and forgettable. The craft is real: the type is set carefully, the capsule-to-full-screen footage is a good idea executed cleanly, accessibility and reduced-motion handling are better than most award winners. But the site has one idea, spends it in the first 160vh, and then becomes a tidy résumé on beige. The headline promises "after dark" and the page never gets dark. Nothing after the hero could not appear unchanged on another developer's portfolio. That is the missing spark: not more effects, but one concept carried from the first pixel to the last.

### A2. Estimated Awwwards score today

Awwwards weights: Design 40%, Usability 30%, Creativity 20%, Content 10%. Honorable Mention needs 6.5 or more from the jury. These are my estimates, not jury numbers.

| Criterion | Weight | Today | After this plan (target) | What is holding it down today |
|---|---|---|---|---|
| Design | 40% | 6.5 | 8.0 | One typeface at a timid scale, a palette that never changes, a repeated zigzag, weak project imagery |
| Usability | 30% | 7.0 | 8.0 | Navigation disappears after the hero, long uniform work section, small mobile headline |
| Creativity | 20% | 5.5 | 8.0 | One signature moment, no concept after it, no page transitions, nothing interactive |
| Content | 10% | 6.0 | 7.5 | No case studies, no outcomes, strongest credentials buried, one blog post |
| **Weighted** | | **6.4** | **7.9** | Borderline Honorable Mention today |

### A3. Three lenses

**As a senior UI designer**

1. The concept is abandoned. "Mostly after dark" is the best line on the site and the page stays daylight-beige from top to bottom. The only night is inside the video, and the page cuts straight back to beige after it (`components/sections/About.tsx`).
2. The headline is too small for a type-led site. At 1440px wide, line one spans about 62% of the content width (`text-[min(7.2vw,138px)]` in `components/sections/Hero.tsx:156`). Type-led winners fill the measure. On mobile it is 32px, which reads as a paragraph heading, with a large empty band above it.
3. The accent colour does almost nothing. `#d9381e` appears as an 8px dot and on hover. A palette of beige, black and a dot is restraint without a point of view.
4. The work section is five copies of one layout. Number, title, logline, a three-row table, tags, link, image; then mirrored; then again. 4,650px of it. By the third project the eye has stopped reading.
5. The project imagery is the weakest part of the site. One box-and-line SVG, one dark screenshot on a dark frame (it reads as a grey smudge), one invented mock-up, one real screenshot, and a miniature of the site itself. The Liliums screenshot is the most beautiful image on the page and it is shown in grayscale, which removes its gold.
6. "This portfolio" as a project is filler. It tells a juror the list ran out.
7. Section rhythm never changes. Every section is: small label or big title, hairline, content. No section is denser, darker, wider or quieter than another.
8. The footer email is a good ending but arrives as a hard black block with no build-up.

**As a web motion designer**

1. There is one choreographed moment (the capsule opening). Everything else is the same 28px fade-up at 1.1s (`components/Reveal.tsx`, variant `lift`). Uniform reveals read as a template, and 1.1s on body text makes people wait to read.
2. Nothing is scroll-linked after the hero. The page stops responding to the visitor.
3. No page transitions. Home to blog is a hard cut into a different, narrower layout.
4. Hover states are tasteful but identical (underline draw, arrow nudge). No element has its own behaviour.
5. The signature footage is 1280×720 at roughly 160 kbps (420 KB for 20.8 s). Small is right for the capsule. Full-screen on a 1440p or 4K display, which is the peak of the whole site, it is visibly soft and blocky.
6. The count-up numbers are the most dated effect on the page.
7. What is already right and must be kept: one easing family, transform/clip-path only, reduced-motion fallbacks, video paused off screen.

**As a client deciding whether to hire**

1. I understand in five seconds that you are a full-stack engineer. I do not understand what I can hire you for. You are employed full time at Smartquip and also "Available for new work". Freelance? A new job? Evenings only?
2. Your two strongest credentials are a bullet point each, two-thirds of the way down: a ground-support-equipment system for the new Western Sydney International Airport, and sales analytics for Guitar Center (`lib/data.ts:124`, `:134`).
3. Four of five projects are personal. The one client project (Liliums) says nothing about what happened after launch.
4. There are no results anywhere. No latency, no downloads, no orders, no uptime.
5. I cannot see you. No photo, no voice beyond one paragraph, no sense of how you work, when you reply, or what time zone overlap we would have.
6. Nobody vouches for you. No testimonial, no LinkedIn link, no résumé.
7. The only way to act is a mailto link.

### A4. What is working — do not lose it

- The headline sentence and the capsule that plays footage as a word.
- The editorial grid, hairlines and the restraint. The fix is to give the restraint a subject, not to add decoration.
- Schibsted Grotesk with real italics, tight tracking, `text-pretty` and `text-balance`.
- Accessibility: skip link, focus rings, reduced-motion paths, alt text, landmarks, tap targets.
- Performance discipline: static pages, tiny JS surface, no layout animation.
- The writing: "built to be run rather than demoed" is a real voice.

### A5. Priority issues

| # | Severity | Issue | Fixed in |
|---|---|---|---|
| 1 | P1 | Concept stops after the hero; page never goes dark | B1, Phases 1–2, 5 |
| 2 | P1 | Work section: repetitive layout, weak imagery, no case studies | Phases 3–4 |
| 3 | P1 | Client proof missing: outcomes, credentials, engagement terms, testimonial | Phases 2, 4, 5 + assets |
| 4 | P1 | Navigation disappears after the hero | Phase 1 |
| 5 | P2 | Headline scale, especially mobile | Phase 1 |
| 6 | P2 | Uniform reveal motion; nothing scroll-linked after hero; no page transitions | Phases 2–5 |
| 7 | P2 | Hero footage too low-bitrate for its full-screen moment | Phase 1 + asset |
| 8 | P2 | Writing section has one row; blog uses different chrome | Phases 2, 6 |
| 9 | P3 | "This portfolio" filler project; count-up effect; no LinkedIn | Phases 2–3 |

---

## Part B — The revamp

### B1. The concept: one night, end to end

**Scrolling the page is working one night shift.** The site opens at dusk on paper. The capsule in the headline opens into the desk footage and night falls: from that moment the page is dark and stays dark. The projects are the lit monitors, the only colour in the room. The page ends at sunrise: the dark page lifts like a curtain, the paper comes back, and the red dot that has been glowing in the header all night rises as the sun behind the email address.

"End to end" now means three things at once: the stack, the night, and the page.

Why this concept and not a generic upgrade:

- It is true. He works at night, the footage is his own desk at 2 a.m., the header already shows Hyderabad time.
- It turns the best existing moment (the capsule opening) from a trick into the cause of everything after it.
- It gives the client a reason to care: **after dark in Hyderabad is the working day in New York and San Francisco.** The gimmick becomes the pitch.
- It needs no WebGL and no new libraries. Jurors state plainly that plenty of Sites of the Day are CSS and a scroll library.

**Art-direction rules. These are binding; every later decision follows from them.**

1. Two tones only: **day** (paper, ink text) and **night** (ink, paper text). No third theme, no gradients between them.
2. **Colour lives only in three places:** inside project screens, the red LED dot, and the sun. Everything else is paper, ink and greys. The desk footage stays black and white.
3. **The red dot is one object.** Standby LED in the header all night; the sun at the end. Never use the accent as a general highlight colour again.
4. **Tone changes are hidden behind a physical event**, never a fade. Dusk to night happens underneath the opened video. Night to day happens as a curtain lift.
5. **One vocabulary of motion:** things open like windows (clip-path) or rise from behind an edge (mask). Nothing fades up from nowhere, nothing bounces, nothing rotates.
6. Time is shown, not explained. A small clock in the header runs from 18:30 to 06:12 as you scroll. No section is titled "Night" or "Dawn".

**Deliberately excluded** (do not add these, even if they seem award-like): preloader, WebGL/Three.js, custom cursor outside project screens, magnetic buttons, marquee text, parallax on text, glassmorphism, gradient text, bento grids, serif-italic accent font, emoji, sound that plays without being asked.

### B2. Stack and constraints for implementers

- Next.js 16.2 App Router, React 19.2, Tailwind CSS v4 (tokens in `app/globals.css` under `@theme`), `motion` 12, `lenis` 1.3. **Add no new runtime dependencies.** Everything below is achievable with what is installed.
- This Next.js version differs from older ones. Before using a framework API, read the bundled docs in `node_modules/next/dist/docs/`. View transitions are documented at `01-app/02-guides/view-transitions.md` and `01-app/03-api-reference/05-config/01-next-config-js/viewTransition.md`.
- Animate only `transform`, `opacity` and `clip-path`. Never animate layout properties.
- Every scroll-linked or timed effect must have a `prefers-reduced-motion: reduce` path that shows the final state with no pinning. Follow the existing pattern in `components/sections/Hero.tsx` (`reduce` flag removes the runway and the sticky stage).
- Per-frame updates write to the DOM through refs or CSS variables. Never call `setState` on every scroll frame.
- Keep all existing accessibility behaviour: skip link, focus-visible ring, landmarks, alt text, `hit-area` tap targets.
- Missing assets must not block a phase. Use the existing files as stand-ins and leave a `TODO(asset): <what>` comment.
- After each phase run `npm run lint` and `npm run build`, then check the page at 375, 768, 1440 and 1920 px, and once with reduced motion emulated.

### B3. Design tokens

Edit `app/globals.css`.

**Colour.** Keep the literal tokens and add semantic ones that flip by tone.

```css
@theme {
  /* literal, never change by tone */
  --color-paper: #eeebe4;
  --color-ink: #121212;
  --color-accent: #d9381e;        /* LED and sun only */

  /* semantic, day values */
  --color-bg: var(--color-paper);
  --color-fg: var(--color-ink);
  --color-dim: #625e58;           /* 5.4:1 on paper */
  --color-line: rgb(18 18 18 / 0.14);
  --color-surface: #e5e1d8;
  --color-signal: #b02c17;        /* small accent-coloured text */
}

[data-tone="night"] {
  --color-bg: var(--color-ink);
  --color-fg: var(--color-paper);
  --color-dim: #9b968d;           /* about 6:1 on ink */
  --color-line: rgb(238 235 228 / 0.16);
  --color-surface: #1b1b1b;
  --color-signal: #ff6b4a;        /* about 6.5:1 on ink */
  background: var(--color-bg);
  color: var(--color-fg);
}
```

Then replace usages across components: `text-ink`→`text-fg`, `bg-paper`→`bg-bg`, `text-muted`→`text-dim`, `border-rule`→`border-line`, `bg-card`→`bg-surface`, `text-accent-text`→`text-signal`. Keep `bg-ink`/`bg-paper` only where the colour must not flip (the video frame, the footer). Remove the old `--color-muted`, `--color-rule`, `--color-card`, `--color-accent-text` once nothing references them. Verify every dim/signal text pair with a contrast checker (4.5:1 minimum for text under 24px).

Night background is exactly `--color-ink` so it is seamless with the opened video frame and its vignette.

**Type.** Keep Schibsted Grotesk and JetBrains Mono. The change is scale and discipline, not a new face.

```css
--text-hero: clamp(2.75rem, 10.8vw, 13rem);     /* new: hero headline */
--text-title: clamp(2.75rem, 6vw, 7rem);        /* project titles, was 5rem max */
--text-section: clamp(2.25rem, 4.6vw, 4.5rem);  /* unchanged */
--text-statement: clamp(1.9rem, 4.2vw, 4.25rem);/* unchanged */
--text-subtitle: clamp(1.75rem, 2.6vw, 2.6rem); /* unchanged */
--text-mega: clamp(1.5rem, 8.2vw, 10rem);       /* unchanged */
```

- Hero: tune `--text-hero` so the longest line ("I build web software") spans 96–100% of the content width at 1440px. Start at 10.8vw and adjust by eye; it must not overflow at 1024px or 1920px.
- Mono is used only for real data: the clock, dates, counts. Not for labels.
- Body 18px/1.6, measure capped at 60ch. Small text never below 14px.
- Optional upgrade if a licence is bought (`CONFIRM`): swap `--font-display` to PP Neue Montreal or Söhne Breit via `next/font/local`. Nothing else changes.

**Motion.**

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);   /* entrances; exists */
--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1); /* wipes, page transitions; new */
```

| Name | Duration | Easing | Used for |
|---|---|---|---|
| micro | 200ms | ease-out-expo | colour, opacity on hover |
| small | 450ms | ease-out-expo | underline draw, arrow nudge, list expand |
| reveal | 900ms | ease-out-expo | mask and window reveals (was 1100ms) |
| wipe | 900ms | ease-in-out-quart | project screen change, curtain |
| page | 600ms | ease-in-out-quart | view transitions |
| hero | 1100ms / 1400ms | ease-out-expo | headline rise / capsule wipe (unchanged) |

Add `EASE_IO = [0.76, 0, 0.24, 1] as const` beside `EXPO_OUT` in `lib/data.ts`.

**Reveal rules** (edit `components/Reveal.tsx`): headings use `mask`; media uses `window`; body text uses a new `lift` of 12px over 600ms, or nothing. Never wrap a whole section in one `lift`.

### B4. Page architecture (home)

| # | Section | Tone | Clock at section start | Change |
|---|---|---|---|---|
| 0 | Header | follows page | — | Fixed, with the shift clock and LED |
| 1 | Hero | day → night | 18:30 | Bigger type, sharper footage, night stays |
| 2 | In short | night | 02:04 | Words light up as you scroll; stack row folded in |
| 3 | Selected work | night | 02:20 | Pinned "monitors" with real screen recordings; four projects |
| 4 | Experience | night | 04:10 | Credentials statement above the dated log |
| 5 | Writing | night | 04:50 | Compact; grows when there are three posts |
| 6 | Working together | night | 05:30 | New: world clocks, engagement facts, optional testimonial |
| 7 | Footer | day | 06:12 | Curtain reveal, sunrise, email with copy |

`app/page.tsx` becomes:

```tsx
<Header />
<main id="main" className="relative z-10">
  <Hero />
  <div data-tone="night">
    <About /> <Projects /> <Experience /> <Writing /> <WorkingTogether />
  </div>
</main>
<Contact />
```

Each section root gets `data-time="HH:MM"` from the table above.

---

### Phase 0 — Foundations

**Files:** `app/globals.css`, `lib/data.ts`, every component (token rename only).

1. Add the tokens in B3. Rename utilities across components as listed.
2. Add `EASE_IO` to `lib/data.ts`.
3. Update `Reveal.tsx`: reveal duration 0.9s; `lift` becomes `y: 12`, duration 0.6s.
4. Remove the "This portfolio" entry from `projects` in `lib/data.ts`, the `Portfolio` function and the `"portfolio"` case from `components/ProjectVisual.tsx`, and `"portfolio"` from the `visual` union.
5. Add LinkedIn to `profile.socials` (`ASSET`: URL).

**Done when:** the site looks identical to before in day tone (minus the removed project), lint and build pass, and wrapping any section in `<div data-tone="night">` renders it legibly in the dark with no hard-coded colours leaking.

---

### Phase 1 — Header, clock and hero

**Files:** `components/Header.tsx`, new `components/ShiftClock.tsx`, `components/sections/Hero.tsx`, `app/page.tsx`, `public/`.

**1.1 Fixed header**

- `position: fixed; inset-inline: 0; top: 0; z-index: 50`, class `gutter`, height about 56px, `mix-blend-mode: difference`, text colour `#fff`. Difference blending makes the header read correctly over paper, ink and the video with no tone logic.
- Layout, desktop: name (left) · shift clock (centre-left column) · nav links Work, Experience, Writing, Contact (right). Drop the two descriptive paragraphs from the header; that information moves to the hero meta row and the footer.
- The LED dot sits **outside** the blended element (a sibling, also fixed, `z-index: 51`) so it stays `--color-accent`. 8px, placed left of the clock. Keep the existing slow `animate-ping` halo.
- Mobile (<768px): name · clock · a "Menu" button. Menu opens a full-screen night-tone overlay: four links in `display-type` at 14vw, each rising with the `mask` reveal at 60ms stagger, email and socials at the bottom. Use a native `<dialog>` with `showModal()` for focus trapping and Esc; close on link click.
- If difference blending produces an illegible result anywhere, the fallback is an IntersectionObserver that sets `data-tone` on the header from the section under it. Try blending first.
- The Lenis mount (`<ReactLenis root …>`) stays in the header component.

**1.2 Shift clock** (`components/ShiftClock.tsx`, client component)

- Reads every `[data-time]` element once on mount and on resize: `{ top: offsetTop, minutes }` where minutes are counted from 18:00 so the sequence is monotonic across midnight (18:30→30, 02:04→484, 02:20→500, 04:10→610, 04:50→650, 05:30→690, 06:12→732).
- On scroll (`useScroll().scrollY` with `useMotionValueEvent`), take the viewport's vertical centre, find the two bracketing entries, interpolate linearly, and write `HH:MM` (24-hour, mod 1440 after adding 18:00) to a `<span>` through a ref. `font-mono tabular-nums text-[0.8rem]`.
- Because the hero spans 18:30→02:04, the clock runs fast while the capsule opens. That time-lapse is intended.
- `aria-hidden="true"`. Reduced motion: still updates (it is information, not animation).
- The real Hyderabad time that used to be in the header moves to the footer (Phase 5). Reuse its `Intl.DateTimeFormat` code there.

**1.3 Hero**

- Headline uses `text-hero`. Remove the `text-[8.6vw] md:text-[min(7.2vw,138px)]` classes.
- Line breaks, desktop (≥768px): `I build web software` / `end to end, [capsule]` / `mostly *after dark.*`
- Line breaks, mobile: `I build web` / `software end` / `to end, [capsule]` / `mostly *after dark.*` at about 13vw. Render both sets and switch with `hidden md:block` / `md:hidden`, keeping one `<h1>` and marking the duplicate set `aria-hidden`. The capsule `slot` ref must point at whichever is visible (measure the one with non-zero `offsetWidth`).
- Stage: the sticky stage now starts at the top of the viewport under the fixed header. Top padding `pt-[16vh]` desktop, `pt-[18vh]` mobile, so the headline sits in the upper-middle, not floating low.
- Meta row under the headline, three items on the 4-column grid:
  - Left: availability line (copy in B5).
  - Middle (2 columns): the short bio (copy in B5), max 46ch.
  - Right: `Email` and `GitHub ↗` links (unchanged).
- Scroll cue, bottom-left of the stage, `text-sm text-dim`: "Scroll. Night falls." Fades out over the first 10% of hero scroll.
- Footage: add a high-quality source for large screens (`ASSET` for the raw file; until then keep the current one).

  ```html
  <source media="(min-width: 1024px)" src="/hero-1080.webm" type="video/webm" />
  <source media="(min-width: 1024px)" src="/hero-1080.mp4" type="video/mp4" />
  <source src="/hero.webm" type="video/webm" />
  <source src="/hero.mp4" type="video/mp4" />
  ```

  Encode from the raw clip, 8–12 s seamless loop, black and white, 1.5–3 MB:

  ```bash
  ffmpeg -i raw.mp4 -an -vf "scale=1920:-2,fps=24,hue=s=0" -c:v libvpx-vp9 -b:v 0 -crf 34 -row-mt 1 public/hero-1080.webm
  ```

  ```bash
  ffmpeg -i raw.mp4 -an -vf "scale=1920:-2,fps=24,hue=s=0" -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart public/hero-1080.mp4
  ```

  Update `CLIP` in `Hero.tsx` to the new frame size and re-tune `FOCUS` and `POS` so the lit monitor is still centred in the capsule.
- The caption "At the desk in Hyderabad, a little after 2 a.m." and "Fig. 1" stay.
- **Night stays.** Nothing else is needed in the hero: the next sibling in `app/page.tsx` is the `data-tone="night"` wrapper, whose background equals the opened frame's `bg-ink`. Confirm there is no paper-coloured gap between them (the hero section itself must not have bottom margin or padding).

**Done when:** at 1440px the headline fills the measure; the header is visible and legible at every scroll position including over the open video; the clock reads 18:30 at the top and about 02:00 when the footage is fully open; scrolling past the hero stays dark with no flash of beige; mobile headline is four lines at about 48px.

---

### Phase 2 — The night sections

**Files:** `components/sections/About.tsx`, `components/sections/Experience.tsx`, `components/sections/Contact.tsx` (the `Writing` export), `components/SectionHead.tsx`, `lib/data.ts`.

**2.1 In short — words light up**

- Remove the `Count` component and the count-up entirely.
- Section padding: `pt-[22vh] pb-[18vh]`; this is the quiet beat after the footage.
- The statement paragraph is split into word `<span>`s at render time (server-side, plain `split(" ")`). Numbers ("3+", "4", "100+", "1") are always full opacity. Every other word starts at 0.22 opacity and lights to 1 in reading order as the paragraph crosses the viewport.
- Implementation: one `useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] })`; on change set `--p` (0–1) on the paragraph. Each word has `style="--i: <index>"`; the paragraph has `style="--n: <word count>"`. CSS:

  ```css
  .lit > span { opacity: clamp(0.22, calc(var(--p) * var(--n) - var(--i)), 1); }
  @media (prefers-reduced-motion: reduce) { .lit > span { opacity: 1; } }
  ```

- Copy unchanged: "3+ years shipping production code. 4 platforms running in production. 100+ public repositories, and 1 Kubernetes cluster I host myself."
- "Tools I reach for" stays as the second row, but smaller: `text-lg text-dim`, tool names in `text-fg`. It is reference information, not a headline.

**2.2 Section heads** (`SectionHead.tsx`)

- The bottom rule becomes a separate element that draws left to right (`scaleX` 0→1, `origin-left`, wipe timing) when the head enters view. The title rises with the `mask` variant. The aside fades in 150ms later.
- Rule colour `--color-fg`.

**2.3 Experience**

- Above the dated rows, add a credentials statement in `text-statement text-dim`, with the proper nouns in `text-fg`, using the same word-light-up component as 2.1:

  > By day I build asset-uptime software for **rail, aviation and maritime** at **Smartquip**, including the ground-support system for the new **Western Sydney International Airport**. Before that: real-time stream processing on **Kafka**, and sales analytics for **Guitar Center**.

  `CONFIRM`: that both client names may be published.
- Dated rows keep their 3/4/5 grid. Each row's bottom hairline draws in on entry (same as section head rule) instead of the whole row fading up.
- Section aside: "Since 2019" stays.

**2.4 Writing**

- With fewer than three posts, render the section as a single wide row without the big section head: left `text-sm text-dim` label "Writing", then the post title at `text-subtitle`, then read time and an arrow. With three or more, use the current list layout. Branch on `posts.length`.
- `ASSET`: two more posts would let this section stand on its own.

**Done when:** scrolling through "In short" lights the sentence word by word and scrubs backwards cleanly; no count-up remains; section rules draw in; the airport and Guitar Center are readable in the first screen of Experience.

---

### Phase 3 — Selected work: the monitors

**Files:** `components/sections/Projects.tsx` (rewrite as a client component), `components/ProjectVisual.tsx` (rewrite as `ProjectScreen`), `lib/data.ts`, `public/work/`.

**3.1 Data** — extend `Project` in `lib/data.ts`:

```ts
export type Project = {
  slug: string;              // "resource-scheduler"
  title: string;
  status: string;            // "On npm"
  year: string;              // "2026"
  role: string;              // "Design and build"
  logline: string;
  outcome?: string;          // one line with a number. ASSET.
  points: [label: string, text: string][];
  tags: string[];
  links: { label: string; href: string }[];
  media: { webm?: string; mp4?: string; poster: string; alt: string; fit?: "cover" | "contain" };
};
```

Order: Resource Scheduler, MiniURL, Liliums, Guide Recorder. Lead with what is shipped and visual; end with the one in development.

Until recordings arrive, `media.poster` is the existing image (`/work/resource-scheduler.png`, `/work/liliums.jpg`); MiniURL keeps its SVG diagram and Guide Recorder its mock, rendered inside the same screen frame.

**3.2 Media specs** (`ASSET`, details in B6): 1600×1000 (16:10) screen recordings, 8–14 s loops, no audio, WebM plus MP4, at most 1.5 MB each, plus a JPG poster under 80 KB. **Full colour.** Remove the grayscale-until-hover treatment completely (rule 2: colour lives in the screens).

**3.3 Desktop layout (≥1024px, motion allowed)**

- Section: `<section id="work" data-time="02:20">`. Section head "Selected work" with aside `(04)` scrolls normally.
- Below it, a runway: `height: calc(N * 70vh + 100vh)` where N is the number of projects. Inside, a `sticky top-0 h-svh` stage with the 12-column grid, vertically centred content, `pt-14` to clear the header.
- **Left, columns 1–5: the index.** All N titles stacked in `display-type text-title`. Active title `text-fg`; inactive `opacity-30`, transitioning over 450ms. Each title is a `<Link href="/work/slug">`. Under the active title only, a panel expands (`grid-template-rows: 0fr → 1fr`, 450ms): logline (`text-xl`, max 34ch), the `outcome` line in `text-fg`, the three `points` rows (existing `dl` styling), tags, links, and "Read the case study →". A 1px progress line under the active title fills left to right with scroll progress through that project's segment (`scaleX` from a motion value).
- **Right, columns 7–12: the monitor.** One frame, `aspect-[16/10]`, `rounded-[6px]`, background `#0a0a0a`, `box-shadow: 0 0 0 1px rgb(238 235 228 / 0.08), 0 40px 120px -40px rgb(238 235 228 / 0.18)` (the screen lights the room). Inside it, all N media layers stacked absolutely in order.
  - Layer i is open when `i <= active`: `clip-path: inset(0)`. Closed: `inset(100% 0 0 0)`. Animate with Motion's `animate` prop, wipe timing. Scrolling forward wipes the next screen up from the bottom; scrolling back wipes it down again. No z-index juggling is needed because order equals stacking.
  - The media inside each layer scales 1.08→1 while its layer opens.
  - Only the active layer's `<video>` plays; others are paused. `preload="none"` with poster; set `preload="auto"` on the next layer when the current one becomes active.
- Top-right of the frame, outside it: `01 / 04` in mono, `text-dim`, updating with the active index. Bottom-left outside the frame: status and year ("On npm · 2026").
- **Active index:** `useScroll({ target: runway, offset: ["start start", "end end"] })`, then `Math.min(N - 1, Math.floor(progress * N))`. Call `setActive` only when the value changes.
- Clicking a title that is not active scrolls to that segment (`window.scrollTo({ top: runwayTop + i * segment, behavior: "smooth" })`; Lenis picks this up) instead of navigating. Clicking the active title, the monitor, or "Read the case study" navigates. Keyboard: focusing a title makes it active.
- **Cursor label** (pointer: fine and hover: hover only): while the pointer is over the monitor, a 72px paper-coloured disc with the word "Open" in ink follows it with a spring (`useSpring`, stiffness 300, damping 30); the native cursor is hidden over the monitor only. This is the only custom cursor on the site.
- Never intercept wheel or touch events. The pin is `position: sticky` only.

**3.4 Mobile and reduced motion**

No runway, no pin. One `<article>` per project, stacked with `py-16`: screen (`window` reveal) → `01` and status → title → logline → outcome → points → links → "Read the case study →". Videos play when at least half visible (IntersectionObserver), otherwise show the poster. With reduced motion, posters only.

**Done when:** on desktop the section is one pinned screen where four projects change by wipe as you scroll, in both directions, with no jump at pin start or end; the header clock keeps running; tab order visits each title; on mobile the layout is a simple readable stack; total section scroll length is under 400vh (it was about 520vh).

---

### Phase 4 — Case studies and page transitions

**Files:** `next.config.ts`, new `app/work/[slug]/page.tsx`, new `lib/markdown.ts`, new `content/work/<slug>.md` ×4, `app/blog/room-booking-app-ai-agent-prisma/page.tsx`, `app/sitemap.ts`.

**4.1 Shared markdown renderer.** Move the `render()` function and its helpers out of `app/blog/room-booking-app-ai-agent-prisma/page.tsx` into `lib/markdown.ts` as `renderMarkdown(path: string): Promise<{ html: string; toc: { id: string; text: string }[] }>`. Keep the blog-specific "fold the recap" replacement in the blog page. Both blog posts and case studies use it.

**4.2 Route.** `app/work/[slug]/page.tsx`, statically generated with `generateStaticParams` from `projects`, `dynamicParams = false`, `generateMetadata` per project (title, description from `logline`, canonical, Open Graph image from `media.poster`). The whole page is night tone and uses the shared `Header` and `Contact` footer.

Layout, top to bottom:

1. Back link "← Selected work" (`/#work`) and `02 / 04` in mono.
2. Title in `text-hero` scaled to 70%, logline beside or below it.
3. The screen: full content width, `aspect-[16/10]`, same frame styling as the home monitor, video autoplaying.
4. Meta row on the 4-column grid, hairline above: Role · Year · Stack · Links.
5. The outcome line in `text-statement`.
6. Body from `content/work/<slug>.md`, rendered with the existing `.post` styles (add night-tone overrides for `.post` colours under `[data-tone="night"]`), measure 68ch, in columns 5–11 on desktop with the `h2` labels hanging in columns 1–4.
7. "Next project" block: full-width link, label "Next", the next title in `text-title`, its screen at reduced height opening with the `window` reveal on hover or on scroll into view. The last project links to the first.

**4.3 Case study content template** (`content/work/<slug>.md`; 350–600 words each; first person; `ASSET` for the facts):

```md
## The problem
Two or three sentences. Who had it, why the obvious answer was not good enough.

## What I built
The system in one paragraph, then a diagram or a second recording.

## The hard part
One decision that was genuinely difficult, the options, what was chosen and why.
A short code block or a diagram here.

## What happened
Numbers. Latency, throughput, downloads, orders, uptime, load-test results.

## What I would do differently
Two or three honest sentences.
```

For MiniURL, move the existing architecture SVG (`MiniUrl` in `ProjectVisual.tsx`) into the case study under "What I built". For Resource Scheduler, a strong optional addition (`CONFIRM`, adds the author's own npm package as a dependency) is to mount the real component in the case study so visitors can drag a booking themselves; load it with `next/dynamic` and `ssr: false`.

**4.4 View transitions.** In `next.config.ts`:

```ts
const nextConfig: NextConfig = { experimental: { viewTransition: true } };
```

- Wrap the home monitor's active media and the case-study screen in `<ViewTransition name={`screen-${slug}`}>` (import `ViewTransition` from `react`). Wrap the title in both places with `name={`title-${slug}`}`. On the home page only the active project carries the names, so names stay unique.
- Default cross-fade for everything else: 300ms. Shared elements: 600ms, `--ease-in-out-quart`, set through `::view-transition-group(*)` in `globals.css`.
- Home ↔ blog also gets the default cross-fade.
- Reduced motion: `@media (prefers-reduced-motion: reduce) { ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; } }`
- Browsers without support simply navigate. No polyfill.
- Read the bundled guide before implementing; the API is marked experimental in this version.

**4.5** Add the four `/work/<slug>` URLs to `app/sitemap.ts`.

**Done when:** clicking the monitor on the home page grows that screen into the case-study hero and the title travels with it; Back reverses it and returns to the same scroll position in the pinned section; all four case studies build statically; each has its own title, description and share image.

---

### Phase 5 — Working together and the sunrise

**Files:** new `components/sections/WorkingTogether.tsx`, new `components/WorldClocks.tsx`, `components/sections/Contact.tsx`, `app/page.tsx`, `app/globals.css`.

**5.1 Working together** (night tone, `data-time="05:30"`, last section inside `<main>`)

- Statement in `text-statement`, word-light-up: "When it is after dark here, it is the working day in New York and San Francisco."
- `WorldClocks`: four live clocks in a row on the 4-column grid — Hyderabad, London, New York, San Francisco — each a city label in `text-dim` and the time in `font-mono text-subtitle tabular-nums`. Use `Intl.DateTimeFormat` with `timeZone` (`Asia/Kolkata`, `Europe/London`, `America/New_York`, `America/Los_Angeles`), tick every 10 s, render `--:--` until mounted. Hyderabad's row carries the LED-coloured dot when the local hour is 21–03.
- Three facts in a 3-column grid, hairline above each, label in `text-dim` and value in `text-fg text-xl` (`CONFIRM` all three):
  - What I take on: "Web apps end to end: product front ends, APIs, the infrastructure they run on."
  - How: "Freelance, alongside my day job. Evenings and weekends IST."
  - Replies: "Within a day."
- Optional testimonial (`ASSET`): one quote in `text-subtitle`, name and role beneath in `text-dim`. Omit the block entirely if there is none; do not invent one.

**5.2 Curtain footer**

- `<main>` gets `relative z-10` and its last child (the night wrapper) must end with enough bottom padding (`pb-[20vh]`) that the last content clears before the lift.
- `Contact` structure:

  ```tsx
  <footer id="contact" data-time="06:12" className="relative h-svh" style={{ clipPath: "inset(0)" }}>
    <div className="fixed inset-x-0 bottom-0 h-svh bg-paper text-ink"> …content… </div>
  </footer>
  ```

  The clip on the outer element confines the fixed inner layer to the footer's box, so as the dark page scrolls up the paper footer is revealed in place underneath it. The moving edge between night and day is the bottom of `<main>`.
- Below 768px, or with reduced motion, or when the viewport is shorter than 640px: no fixed layer; the footer is a normal block with `min-h-svh`.
- Footer tone is day: explicit `bg-paper text-ink` and day token values (it sits outside the night wrapper, so the defaults apply).

**5.3 Footer content**, top to bottom inside the fixed layer, `gutter`, flex column:

1. Lead line, `text-dim`: "Sun's up. What are we building?"
2. The email in `display-type text-mega` (existing `mask` reveal and `link-draw`). Beside it a small "Copy" button: on click `navigator.clipboard.writeText(email)`, label changes to "Copied" for 2 s, announced through an `aria-live="polite"` span.
3. Live status line (`font-mono text-sm`): "It is HH:MM in Hyderabad." followed by a status chosen from the local hour — 09–18 "At the day job. I reply in the evening."; 18–21 "Off the clock."; 21–03 "At the desk."; 03–09 "Asleep. I reply by morning." `CONFIRM` these hours.
4. Three columns: socials (now including LinkedIn; add "Résumé ↓" if supplied) · location and coordinates · colophon ("Set in Schibsted Grotesk. Built with Next.js, Tailwind CSS, Motion and Lenis. The footage is me at my desk, shot on a phone.").
5. Bottom bar: © year and name · "Back to top ↑".
6. **The sun.** Below the bottom bar, reserve the last 22svh with no text in it. A circle `bg-accent`, `width: min(70vw, 900px)`, `aspect-ratio: 1`, horizontally centred, positioned so its centre is below the bottom edge. Scrubbed `translateY` from 100% (fully below the edge) to the point where its top is about 20svh above the bottom edge, driven by `useScroll({ target: footer, offset: ["start end", "end end"] })`. No text may overlap it (ink on the accent is about 4:1, not enough for small text). The page grain overlay already sits above it and gives it a printed texture.
7. As the sun rises, the header LED fades out (opacity 1→0 over the same progress): the dot has become the sun.

**Done when:** the dark page lifts to reveal the paper footer already in place; the red disc rises behind nothing but empty space; the header dot is gone when the disc is up; the clock reads 06:12 at the very bottom; Copy works and is announced; on mobile the footer is a normal block and the sun still rises.

---

### Phase 6 — Consistency, delight, hardening

1. **Blog chrome.** `/blog` and posts use the fixed `Header` and the `Contact` footer instead of `BlogChrome`. Blog index and posts are day tone (reading surface). Delete `components/BlogChrome.tsx` when unused.
2. **404** becomes night tone: full-viewport ink, "Nothing here, even after dark." in `text-title`, clock frozen at 03:33.
3. **Open Graph image** (`app/opengraph-image.tsx`): ink background, the headline in paper, the red dot. Case studies use their poster.
4. **Tab title when hidden:** on `visibilitychange`, hidden → `document.title = "Still up. — Mohammed Obaid"`, visible → restore. Eight lines in `Header.tsx`.
5. **Selection colour** in night tone: paper background, ink text.
6. **`content-visibility: auto`** with `contain-intrinsic-size` on Experience, Writing and Working together.
7. **Performance budget:** LCP under 2.0 s on a throttled mid-range phone; no CLS from the headline (font `display: swap` with size-adjusted fallback, which `next/font` provides); total transfer of the home page under 1.2 MB before any project video plays; Lighthouse 95+ on all four categories for mobile.
8. **Accessibility pass:** keyboard through the pinned work section and the mobile menu dialog; contrast for every dim/signal pair in both tones; screen reader reads the split-word paragraphs as normal sentences (the spans must not carry roles or labels); nothing essential is conveyed by the clock or the sun alone.
9. **Browsers:** current Chrome, Safari (macOS and iOS), Firefox, Edge. Check specifically: `mix-blend-mode: difference` on the fixed header in Safari; `clip-path` on the fixed footer in iOS Safari; `<source media>` selection for the hero video; view transitions in Safari.
10. **Optional, only on request:** a "Sound" toggle in the footer playing a quiet room-tone and keyboard loop (off by default, remembered in `localStorage`).

---

### B5. Copy deck

| Where | Copy | Status |
|---|---|---|
| Hero headline | I build web software end to end, [footage] mostly *after dark.* | Keep |
| Hero availability | Taking on freelance builds | `CONFIRM` |
| Hero bio | Full-stack engineer in Hyderabad. React and Next.js in front, .NET and Node.js behind, Kubernetes underneath. By day I build asset-uptime software for rail, aviation and maritime at Smartquip. After dark I take on builds like yours. | `CONFIRM` |
| Scroll cue | Scroll. Night falls. | New |
| Video caption | At the desk in Hyderabad, a little after 2 a.m. · Fig. 1 | Keep |
| In short | 3+ years shipping production code. 4 platforms running in production. 100+ public repositories, and 1 Kubernetes cluster I host myself. | Keep |
| Experience statement | See 2.3 | `CONFIRM` names |
| Working together | When it is after dark here, it is the working day in New York and San Francisco. | New |
| Footer lead | Sun's up. What are we building? | New |
| 404 | Nothing here, even after dark. | Keep |

Voice rules: first person, short declarative sentences, concrete nouns, no adjectives about himself, no exclamation marks, no "passionate".

### B6. What Mohammed needs to supply

Nothing here blocks starting. Phases 0–2 need none of it.

**Footage (highest impact)**

1. The original hero clip at full resolution (1080p or 4K), uncompressed by WhatsApp or similar.
2. Optional but valuable, 6–10 s each, locked-off phone on a stand, same night, same desk: hands on the keyboard close up; the main monitor close up with code scrolling; the room wide from behind; a monitor being switched off.

**Screen recordings** (1600×1000 or larger, 10–15 s, cursor moving deliberately, no personal data)

3. Resource Scheduler: dragging a booking, resizing one, a blocked double-booking.
4. MiniURL: shortening a link in the UI, plus a terminal with `kubectl get pods` during a rolling update or a load test running.
5. Liliums: scrolling the home page, opening a bouquet, the WhatsApp hand-off. Full colour.
6. Guide Recorder: a real capture turning into a guide, even if rough.

**Facts and numbers**

7. MiniURL: node count, requests per second and p95 latency from a load test, cache hit rate.
8. Resource Scheduler: weekly npm downloads, GitHub stars, bundle size.
9. Liliums: launch date, enquiries or orders through WhatsApp since launch, Lighthouse score.
10. Smartquip and XIT: confirmation that Western Sydney International Airport and Guitar Center may be named; any scale figures that are public.
11. For each case study: the one hard decision, and what he would do differently.

**People and terms**

12. One to three testimonials with name, role and permission (the Liliums owner is the obvious first ask).
13. LinkedIn URL. Résumé PDF if he wants it linked.
14. Confirmation of: freelance availability, typical working hours in IST, reply time, the kinds of projects he wants.
15. A booking link (Cal.com or similar) if he wants "Book a call" beside the email.

**Decisions**

16. Font licence: stay on Schibsted Grotesk (free, recommended) or buy a display face.
17. Live Resource Scheduler demo inside its case study: yes or no.
18. Sound toggle: yes or no.

### B7. Order of work and effort

| Phase | Depends on | Size | Ships alone? |
|---|---|---|---|
| 0 Foundations | — | S | Yes (invisible) |
| 1 Header, clock, hero | 0 | M | Yes |
| 2 Night sections | 0, 1 | M | Yes |
| 3 Work monitors | 0 | L | Yes (with stand-in media) |
| 4 Case studies, transitions | 3 | L | Yes (needs content) |
| 5 Working together, sunrise | 0, 1 | M | Yes |
| 6 Hardening | all | M | — |

Phases 1, 2 and 5 together deliver the whole concept (dusk, night, dawn) and can ship before the work section is rebuilt. That is the recommended first release.

### B8. Before submitting

- Real media in every project screen; no stand-ins, no `TODO(asset)` left in the code.
- All `CONFIRM` items resolved.
- Deployed on the production domain, tested on a real iPhone and a real Android phone, not only emulation. Jurors do check mobile, and a weak mobile version caps a site at Honorable Mention.
- Awwwards submission needs an account, the live URL and completed credits. A site scoring 6.5 or more receives an Honorable Mention; Site of the Day winners are then sent to the developer jury, and a score above 7 there earns the Developer Award. This site's clean, accessible, dependency-light build is a genuine advantage for that second award.
- Submit to CSS Design Awards and a curated gallery or two (Godly, Siteinspire, One Page Love) in the same week. They are easier to win and raise visibility.

### Sources

- Awwwards evaluation system: https://www.awwwards.com/about-evaluation/
- Awwwards portfolio listings: https://www.awwwards.com/websites/portfolio/
- A jury member's advice on portfolio sites (also sells services; treated as opinion): https://www.hontran.dev/blog/how-to-build-an-award-winning-portfolio-site
- Trend round-ups, directional only: https://line25.com/articles/web-design-trends-2026/ , https://tilda.education/en/web-design-trends-2026
- Next.js view transitions: `node_modules/next/dist/docs/01-app/02-guides/view-transitions.md` in this repo
