# mohammedobaid.dev — Portfolio v3.0

> MISSION CONTROL — a futuristic, HUD-inspired portfolio for Mohammed Obaid, full-stack software engineer.

Deep-carbon black. Acid lime. Expanded display type. A WebGL particle galaxy. Boot sequence included.

## Stack

| Layer | Tech |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript 5 |
| Styling | Tailwind CSS v4 (CSS-variable theme via `@theme`), custom utilities |
| Animation | GSAP 3.15 (ScrollTrigger, SplitText, ScrollTo) + `@gsap/react` |
| Smooth scroll | Lenis, synced to GSAP's ticker & ScrollTrigger |
| 3D / WebGL | Three.js + React Three Fiber (spiral particle galaxy, mouse parallax) |
| Type | Archivo (variable, `wdth` 125 expanded display) + JetBrains Mono via `next/font` |
| Micro-interactions | Custom GSAP cursor, magnetic CTA, marquees, hover flips |

## Anatomy

- **Preloader** — terminal boot log + percent counter, wipes up when systems are nominal
- **Hero** — R3F particle galaxy, SplitText char reveal, HUD readouts (coords, status, scroll)
- **/01 Operator** — `identity.log` terminal card, bio, animated stat counters
- **/02 Orbit History** — career timeline from first commit to Smartquip
- **/03 Payloads** — selected builds; rows flip acid-lime on hover
- **/04 Tech Stack** — dual marquees + four categorized unit panels
- **/05 Contact** — magnetic "send transmission" CTA, live IST clock, socials

## Run

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # static production build
```

## Editing content

All copy lives in [`lib/data.ts`](lib/data.ts) — profile, socials, stats, projects, career chapters and skill groups. Add a new project or job entry there; no component changes needed.

---

Designed & rebuilt from scratch in 2026. Previous version: Vite + SCSS (see git history).
