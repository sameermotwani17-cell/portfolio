# Sameer Motwani — Portfolio

Personal portfolio built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion. Cinematic design, GPU-animated UI, and a custom cursor.

**Live site:** [sameermotwani.vercel.app](https://sameermotwani.vercel.app)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Fonts | Cormorant Garamond · DM Sans (Google Fonts) |
| Deployment | Vercel |

---

## Project Structure

```
my-portfolio/
├── app/
│   ├── layout.tsx          # Root layout — fonts, CustomCursor
│   ├── page.tsx            # Page assembly
│   └── globals.css         # CSS variables, scrollbar, cursor: none
├── components/
│   ├── Hero.tsx            # Full-bleed photo, parallax, cinematic overlay
│   ├── Navbar.tsx          # Blur backdrop nav + mobile hamburger
│   ├── Projects.tsx        # Project cards + modal detail view
│   ├── Skills.tsx          # Skill groups
│   ├── Awards.tsx          # Award timeline
│   ├── Hobbies.tsx         # Basketball, Chess, Cinematic, Music cards
│   ├── Contact.tsx         # CTA + education row + footer
│   ├── CustomCursor.tsx    # Lerp-smoothed glowing dot + ring
│   ├── Character.tsx       # FIFA-style stat card
│   ├── ParticlesBurst.tsx  # SVG concentric rings animation
│   └── StarField.tsx       # Background star canvas
├── public/
│   ├── photo.png           # Hero portrait
│   ├── apu-logo.jpg        # APU university logo
│   ├── hult-prize.jpg      # Hult Prize logo
│   └── ...                 # Other assets
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## Sections

### Hero
Full-bleed portrait with parallax scroll, idle camera drift, animated word reveal, and a FIFA-style stat card on the right.

### Projects
Five project cards with hover-reveal descriptions and click-to-expand modals:

- **GOMI Snap** — AI civic-tech startup. CV-powered waste classification. 1st Place APU Hackathon 2025.
- **Stick'Em** — Curriculum alignment engine. 13 standards across UK/India/USA. Hult Prize Global Winner 2025.
- **Retro GitHub Agent** — Autonomous AI coding agent. Chains Claude API + n8n + GitHub.
- **AI Hack 2026** — Credit default risk model. AUC ~0.763. Top ~8 finish at Kyoto Finals (AIFUL).
- **MIRU** — Stateful AI interview evaluation system. Structured scoring + Japanese HR cultural reasoning layer.

### Skills
Grouped skill tags: AI/ML, Programming, Infrastructure, Security, Finance/Business.

### Awards
Timeline of competition wins and recognitions.

### Hobbies
Animated cards for Basketball, Chess, Cinematic Creation (links to [Retro Studios Instagram](https://www.instagram.com/retro.studios_)), and Music (links to [Spotify](https://open.spotify.com/artist/2vNpaYQTU7PNUh3BjOx07b) + [Apple Music](https://music.apple.com/jp/artist/retro/1803961641)).

### Contact
Email, LinkedIn, GitHub CTAs + education row (APU + YOUNITED).

---

## Design System

```css
--color-bg:        #0a0a0a
--color-primary:   #f97316   /* orange */
--color-secondary: #3b82f6   /* blue */
--color-text:      #f5f5f5
```

Fonts are configured as Tailwind utilities:
- `font-display` → Cormorant Garamond (headings)
- `font-body` → DM Sans (body text)

---

## Running Locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

Build for production:

```bash
npm run build
npm start
```

---

## Deployment

Deployed on Vercel. Push to `main` triggers automatic redeployment.

```bash
git add .
git commit -m "your message"
git push origin main
```

---

## License

Personal portfolio — all rights reserved. Code structure may be referenced for learning purposes.
