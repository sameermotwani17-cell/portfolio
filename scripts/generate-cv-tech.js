/**
 * Generates public/cv.pdf, the engineering CV. One page, Times, ATS friendly.
 * Every number here matches /tech and lib/projects.ts. If a figure changes,
 * change it in all three places, then run:  node scripts/generate-cv-tech.js
 */
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib')
const fs = require('fs')
const path = require('path')

const W = 612
const H = 792
const M = 46
const INK = rgb(0.06, 0.06, 0.06)
const SOFT = rgb(0.35, 0.35, 0.35)

async function main() {
  const doc = await PDFDocument.create()
  const page = doc.addPage([W, H])
  const reg = await doc.embedFont(StandardFonts.TimesRoman)
  const bold = await doc.embedFont(StandardFonts.TimesRomanBold)
  const ital = await doc.embedFont(StandardFonts.TimesRomanItalic)
  let y = H - 42

  const wrap = (text, font, size, width) => {
    const words = text.split(' ')
    const lines = []
    let line = ''
    for (const w of words) {
      const probe = line ? line + ' ' + w : w
      if (font.widthOfTextAtSize(probe, size) > width && line) {
        lines.push(line)
        line = w
      } else line = probe
    }
    if (line) lines.push(line)
    return lines
  }
  const center = (s, font, size, color = INK) => {
    page.drawText(s, { x: (W - font.widthOfTextAtSize(s, size)) / 2, y, size, font, color })
  }
  const right = (s, font, size, color = INK) => {
    page.drawText(s, { x: W - M - font.widthOfTextAtSize(s, size), y, size, font, color })
  }
  const section = (t) => {
    y -= 3
    page.drawText(t.toUpperCase(), { x: M, y, size: 10, font: bold, color: INK })
    y -= 3.5
    page.drawLine({ start: { x: M, y }, end: { x: W - M, y }, thickness: 0.7, color: INK })
    y -= 11
  }
  const entry = (l, r) => {
    page.drawText(l, { x: M, y, size: 10, font: bold, color: INK })
    if (r) right(r, bold, 10)
    y -= 11
  }
  const sub = (l, r) => {
    page.drawText(l, { x: M, y, size: 9.6, font: ital, color: INK })
    if (r) right(r, ital, 9.6)
    y -= 10.6
  }
  const bullet = (s) => {
    wrap(s, reg, 9.3, W - 2 * M - 14).forEach((ln, i) => {
      if (i === 0) page.drawText('•', { x: M + 2, y, size: 9.3, font: reg, color: INK })
      page.drawText(ln, { x: M + 14, y, size: 9.3, font: reg, color: INK })
      y -= 10.4
    })
  }

  center('SAMEER MOTWANI', bold, 18)
  y -= 12
  center('Beppu, Oita, Japan · sameermotwani17@gmail.com · linkedin.com/in/sameer-motwani-2625a62b5 · github.com/sameermotwani17-cell', reg, 8.3, SOFT)
  y -= 10
  center('Portfolio: xsofficialbrand.com/tech', reg, 8.3, SOFT)
  y -= 14

  section('Education')
  entry('Ritsumeikan Asia Pacific University (APU)', 'Beppu, Japan')
  sub('B.B.A., Finance', 'Expected 2029')
  bullet('1st Place, APU Annual Hackathon 2025; 1st Runner-Up and Best Speaker, Hult Prize APU Campus Round 2026.')
  y -= 2
  entry('YOUNITED International School', 'Israel')
  sub('International Baccalaureate Diploma - HL: Computer Science, English, Business', '2025')
  y -= 4

  section('Experience')
  entry("Stick'Em Pte Ltd  (Singapore EdTech; Hult Prize Global 2025 winner)", 'Remote from Japan')
  sub('Contract Software Engineer', 'May 2026 - Sep 2026')
  bullet('Rebuilt production slide-delivery infrastructure serving teachers in Brunei and the Philippines: replaced failing Google Slides iframes with a pre-processed WebP pipeline (Slides API, Sharp, Supabase CDN), ~15x faster on simulated Slow-3G (678ms vs 10s+), legacy iframe kept as automatic fallback.')
  bullet('Built a virtualized snap-scroll slide viewer (current slide +/-2) with dual IntersectionObserver media gating; validated against 55+ slide decks and tested across network throttling profiles.')
  bullet('Identified and closed a public-bundle secret exposure (NEXT_PUBLIC_ prefix) before merge; kept SQL-verified QA over agent self-reports and strict branch isolation, zero commits to main.')
  bullet('Shipped a curriculum-alignment engine mapping STEM lessons to 13 government standards (UK, India, USA) with anti-hallucination index-only selection and two-tier validation.')
  y -= 3
  if (process.env.SHOW_AJIWOW !== '0') {
  entry('Ajiwow Inc. (ROKU SHOKU, Techstars Tokyo 2026)', 'Tokyo, remote')
  sub('Freelance Creative Technologist', 'Sep 30 - Nov 2026')
  bullet('Built a JA/EN Astro site deployed on Azure Static Web Apps in the client tenant with GitHub Actions push-to-deploy and per-PR previews; moved the repo into the client GitHub org and handed the finish to in-house engineers.')
  bullet('Shipped the brand system (18-page guide, tokens as CSS/JSON, Claude design system and skill) in 2 days; scripted a Python print pipeline with a 31-point automated check, and an audio pipeline (demucs, ElevenLabs, -14 LUFS mastering).')
  y -= 3
  }
  entry('Retro Studios (under StarLabs)', 'Beppu, Japan')
  sub('Founder & Creative Director', 'Apr 2026 - Present')
  bullet('One-person AI creative studio running a paid campaign for DK2R Football Wear (2026 World Cup capsule): 12 country editions, 36 SKUs, 150+ AI-generated hero images delivered; 55-asset manufacturing QA with zero redos.')
  bullet('Solo-built the brand e-commerce platform (Next.js 14, Supabase, live PayPal + Stripe on Vercel) and an 8-layer reference-locked prompt architecture reused across every edition.')
  y -= 3
  entry('GOMI Snap', 'Beppu, Japan')
  sub('Founder & CTO', 'Nov 2025 - 2026')
  bullet('AI waste-classification PWA (GPT-4V + rule engine reverse-engineered from municipal PDFs) for a city with 20+ waste categories: 520+ organic users, 95.3% adoption intent (n=400), Beppu City government engagement.')
  bullet('Shipped GOMI Snap 2.0 (per-tenant QR logging + property-manager compliance dashboards); wound the company down and folded it into StarLabs.')
  y -= 4

  section('Selected Projects')
  entry('AI Hack 2026 (AIFUL) - Lead Modeler, Team StarLabs', 'Kyoto, Mar 2026')
  bullet('Credit-default prediction on real consumer-finance data (68,546 applications): peak public AUC 0.7635 (briefly 2nd), 4th at prelims, top-8 Kyoto finalist, the only all-freshman team; diagnosed temporal drift (fold AUC 0.774 to 0.686) and designed dual StratifiedKFold + out-of-time validation; reverse-engineered a lost pipeline from submission rank arrays.')
  entry('MIRU - Developer (72-hour build)', 'APU, Mar 2026')
  bullet('Voice AI interview coach for foreigners job-hunting in Japan, built on Claude with simulated Japanese-HR evaluation and English debriefs; Bronze Prize at the Kyutech x Science Tokyo x APU Joint Hackathon, the only APU team on the podium among 15+ teams.')
  entry('SCRAPYARD - Spec-Driven Build', '2026')
  bullet('3D multiplayer browser FPS shipped in one day from a ~200-line spec executed by Claude Code: server-authoritative 30Hz netcode with client-side prediction on Cloudflare Durable Objects, Three.js client, 91 automated tests. Live at scrapyard-lake.vercel.app.')
  y -= 3

  section('Skills & Languages')
  bullet('Programming: TypeScript, JavaScript, Python, Java, SQL; React, Next.js, Astro, FastAPI, Node.js, Express.')
  bullet('AI / ML: LightGBM, CatBoost, XGBoost, Optuna, scikit-learn; Claude & OpenAI APIs, prompt architecture, LLM evaluation design; n8n workflow orchestration and agent pipelines.')
  bullet('Infrastructure: Supabase/Postgres, Vercel, Azure Static Web Apps, GitHub Actions CI/CD, Cloudflare, Google Cloud APIs, Git; performance engineering (CDN pipelines, virtualization, caching).')
  bullet('Languages: English (native), Spanish (intermediate), Japanese (developing).')

  const out = path.join(__dirname, '..', 'public', 'cv.pdf')
  fs.writeFileSync(out, await doc.save())
  console.log('cv.pdf written, final y =', Math.round(y))
}

main()
