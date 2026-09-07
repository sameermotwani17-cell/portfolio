# Sameer Motwani — Portfolio

A cinematic scroll narrative — light → fire → dusk — where every project opens
into its own branded world. Built and art-directed as one continuous take.

**Live:** [portfolio-gamma-two-d8j6b2mgkq.vercel.app](https://portfolio-gamma-two-d8j6b2mgkq.vercel.app) · **CV:** [/cv.pdf](https://portfolio-gamma-two-d8j6b2mgkq.vercel.app/cv.pdf) · **Creative CV:** [/cv-creative.pdf](https://portfolio-gamma-two-d8j6b2mgkq.vercel.app/cv-creative.pdf)

---

## Architecture

Three pinned scenes assembled in [`app/page.tsx`](app/page.tsx), each using a
sticky-backdrop pattern (full-viewport sticky layer + content flowing over it),
scroll-scrubbed with framer-motion `useScroll` and smoothed by Lenis.

| Scene | File | What happens |
|---|---|---|
| 01 — Light | [`HeroScene.tsx`](components/scenes/HeroScene.tsx) | Butterfly field (hand-drawn SVGs, 3 parallax depths), camera push-in, three-layer crossfade into the verse card, then the fire |
| 02 — Fire | [`FireScene.tsx`](components/scenes/FireScene.tsx) | Album-cover project grid with shared-layout expansion into per-project worlds; vault row; skills |
| 03 — Dusk | [`DuskScene.tsx`](components/scenes/DuskScene.tsx) | Life blocks, awards, open-to roles, contact |

Every case study is a bespoke component behind one registry
([`CaseStudyOverlay.tsx`](components/scenes/CaseStudyOverlay.tsx)):
chopstick cinema for Stick'Em, a match-lobby HUD for the Scrapyard FPS,
a three-movement black-and-white film for Retro Studios, and storyline
worlds for GOMI Snap, AI Hack (AIFUL red), and MIRU — all data-driven
from [`lib/projects.ts`](lib/projects.ts).

## Engineering notes

- **Performance:** ~160KB first-load JS, one eager image (~309KB hero),
  everything below the fold lazy, per-world assets load only when a case
  study opens. All animation is transform/opacity only. Static prerender.
- **Images:** sources neural-upscaled 4x (OpenCV EDSR) and served as
  right-sized WebP; `Cache-Control` with stale-while-revalidate on all
  static imagery.
- **Accessibility:** focus-trapped dialogs with Esc handling, full
  `prefers-reduced-motion` fallbacks per scene, aria labels throughout.
- **Two tracks:** the PROJECTS scene splits into side A (creative direction)
  and side B (engineering). Side A opens into the RETRO Studios discography —
  seven releases, each carrying the accent colour and typeface taken from that
  project's own live site rather than from this one.
- **Documents:** two downloads — `public/cv.pdf` (the general CV) and
  `public/cv-creative.pdf`, a creative-direction one-pager generated from the
  same verified project data via [`scripts/generate-cv.js`](scripts/generate-cv.js)
  (pdf-lib). Regenerate the latter with `npm run generate-cv`.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind · framer-motion · Lenis ·
sharp · pdf-lib · Vercel (git-connected, CI on every push)

## Running locally

```bash
npm ci
npm run dev
```

## License

Personal portfolio — all rights reserved. Code structure may be referenced
for learning.
