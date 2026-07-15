/**
 * Generates public/resume.pdf — Harvard-format one-pager.
 * Facts sourced from the portfolio's verified project data.
 * Run: node scripts/generate-resume.js
 */
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib')
const fs = require('fs')
const path = require('path')

const PAGE_W = 612 // US Letter
const PAGE_H = 792
const M = 46
const INK = rgb(0.08, 0.08, 0.08)
const SOFT = rgb(0.35, 0.35, 0.35)

async function main() {
  const doc = await PDFDocument.create()
  const page = doc.addPage([PAGE_W, PAGE_H])
  const times = await doc.embedFont(StandardFonts.TimesRoman)
  const bold = await doc.embedFont(StandardFonts.TimesRomanBold)
  const italic = await doc.embedFont(StandardFonts.TimesRomanItalic)

  let y = PAGE_H - M

  const wrap = (text, font, size, width) => {
    const words = text.split(' ')
    const lines = []
    let line = ''
    for (const w of words) {
      const probe = line ? line + ' ' + w : w
      if (font.widthOfTextAtSize(probe, size) > width && line) {
        lines.push(line)
        line = w
      } else {
        line = probe
      }
    }
    if (line) lines.push(line)
    return lines
  }

  const text = (str, { font = times, size = 9.6, x = M, color = INK, dy = null } = {}) => {
    page.drawText(str, { x, y, size, font, color })
    if (dy !== null) y -= dy
  }

  const centered = (str, font, size, color = INK) => {
    const w = font.widthOfTextAtSize(str, size)
    page.drawText(str, { x: (PAGE_W - w) / 2, y, size, font, color })
  }

  const rightText = (str, font, size, color = INK) => {
    const w = font.widthOfTextAtSize(str, size)
    page.drawText(str, { x: PAGE_W - M - w, y, size, font, color })
  }

  const section = (title) => {
    y -= 4
    text(title.toUpperCase(), { font: bold, size: 10.2 })
    y -= 3.5
    page.drawLine({ start: { x: M, y }, end: { x: PAGE_W - M, y }, thickness: 0.7, color: INK })
    y -= 11.5
  }

  const entry = (left, right) => {
    text(left, { font: bold, size: 9.8 })
    rightText(right, bold, 9.8)
    y -= 11.5
  }

  const subline = (left, right) => {
    text(left, { font: italic, size: 9.4 })
    if (right) rightText(right, italic, 9.4)
    y -= 11
  }

  const bullet = (str) => {
    const lines = wrap(str, times, 9.4, PAGE_W - 2 * M - 14)
    lines.forEach((ln, i) => {
      if (i === 0) page.drawText('•', { x: M + 2, y, size: 9.4, font: times, color: INK })
      page.drawText(ln, { x: M + 14, y, size: 9.4, font: times, color: INK })
      y -= 10.8
    })
  }

  const gap = (n = 4) => (y -= n)

  // ── header ──
  centered('SAMEER MOTWANI', bold, 17)
  y -= 14
  centered(
    'Beppu, Oita, Japan  ·  sameermotwani17@gmail.com  ·  linkedin.com/in/sameer-motwani-2625a62b5  ·  github.com/sameermotwani17-cell',
    times,
    8.6,
    SOFT
  )
  y -= 10.5
  centered('Portfolio: portfolio-gamma-two-d8j6b2mgkq.vercel.app', times, 8.6, SOFT)
  y -= 15

  // ── education ──
  section('Education')
  entry('Ritsumeikan Asia Pacific University (APU)', 'Beppu, Japan')
  subline('B.B.A., Finance', 'Expected 2029')
  bullet('1st Place, APU Annual Hackathon 2025; 1st Runner-Up and Best Speaker, Hult Prize APU Campus Round 2026.')
  gap()
  entry('YOUNITED International School', 'Israel')
  subline('International Baccalaureate Diploma - HL: Computer Science, English, Business', '2025')
  gap(6)

  // ── experience ──
  section('Experience')
  entry("Stick'Em Pte Ltd  (Singapore EdTech; Hult Prize Global 2025 winner)", 'Remote from Japan')
  subline('Contract Software Engineer', 'May 2026 - Present')
  bullet(
    'Rebuilt production slide-delivery infrastructure serving teachers in Brunei and the Philippines: replaced failing Google Slides iframes with a pre-processed WebP pipeline (Slides API, Sharp, Supabase CDN) - ~15x faster on simulated Slow-3G (678ms vs 10s+), legacy iframe kept as automatic fallback.'
  )
  bullet(
    'Built a virtualized snap-scroll slide viewer (current slide +/-2) with dual IntersectionObserver media gating; validated against 55+ slide decks and CEO-tested across network throttling profiles.'
  )
  bullet(
    'Identified and closed a public-bundle secret exposure (NEXT_PUBLIC_ prefix) before merge; maintained SQL-verified QA over agent self-reports and strict branch isolation with zero commits to main.'
  )
  bullet(
    'Separately shipped a curriculum-alignment engine mapping STEM lessons to 13 government standards (UK, India, USA) with anti-hallucination index-only selection and two-tier validation.'
  )
  gap()
  entry('Retro Studios (under StarLabs)', 'Beppu, Japan')
  subline('Founder & Creative Director', 'Apr 2026 - Present')
  bullet(
    'One-person AI creative studio running a paid campaign for DK2R Football Wear (2026 World Cup capsule): 12 country editions, 36 SKUs, 150+ AI-generated hero images delivered; 55-asset manufacturing QA with zero redos.'
  )
  bullet(
    'Solo-built the brand e-commerce platform (Next.js 14, Supabase, live PayPal + Stripe on Vercel) and an 8-layer reference-locked prompt architecture reused across every edition.'
  )
  gap()
  entry('GOMI Snap', 'Beppu, Japan')
  subline('Founder & CTO', 'Nov 2025 - 2026')
  bullet(
    'AI waste-classification PWA (GPT-4V + rule engine reverse-engineered from municipal PDFs) for a city with 20+ waste categories: 520+ organic users, 95.3% adoption intent (n=400), Beppu City government engagement.'
  )
  bullet(
    'Shipped GOMI Snap 2.0 (per-tenant QR logging + property-manager compliance dashboards); wound the company down and folded it into StarLabs.'
  )
  gap(6)

  // ── projects ──
  section('Selected Projects')
  entry('AI Hack 2026 (AIFUL) - Lead Modeler, Team StarLabs', 'Kyoto, Mar 2026')
  bullet(
    'Credit-default prediction on real consumer-finance data (68,546 applications): peak public AUC 0.7635 (briefly 2nd), 4th at prelims, top-8 Kyoto finalist - the only all-freshman team; diagnosed temporal drift (fold AUC 0.774 to 0.686) and designed dual StratifiedKFold + out-of-time validation; reverse-engineered a lost pipeline from submission rank arrays.'
  )
  gap()
  entry('MIRU - Developer (72-hour build)', 'APU, Mar 2026')
  bullet(
    'Voice AI interview coach for foreigners job-hunting in Japan, built on Claude with simulated Japanese-HR evaluation and English debriefs; Bronze Prize at the Kyutech x Science Tokyo x APU Joint Hackathon - the only APU team on the podium among 15+ teams.'
  )
  gap()
  entry('SCRAPYARD - Spec-Driven Build', '2026')
  bullet(
    '3D multiplayer browser FPS shipped in one day from a ~200-line spec executed by Claude Code: server-authoritative 30Hz netcode with client-side prediction on Cloudflare Durable Objects, Three.js client, 91 automated tests. Live at scrapyard-lake.vercel.app.'
  )
  gap(6)

  // ── skills ──
  section('Skills & Languages')
  bullet('Programming: TypeScript, JavaScript, Python, Java, SQL; React, Next.js, FastAPI, Node.js, Express.')
  bullet('AI / ML: LightGBM, CatBoost, XGBoost, Optuna, scikit-learn; Claude & OpenAI APIs, prompt architecture, LLM evaluation design; n8n workflow orchestration and agent pipelines.')
  bullet('Infrastructure: Supabase/Postgres, Vercel, Cloudflare, Google Cloud APIs, Git; performance engineering (CDN pipelines, virtualization, caching).')
  bullet('Languages: English (native), Spanish (intermediate), Japanese (developing).')

  fs.mkdirSync(path.join(__dirname, '..', 'public'), { recursive: true })
  const bytes = await doc.save()
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'resume.pdf'), bytes)
  console.log('resume.pdf written,', Math.round(bytes.length / 1024) + 'KB, final y =', Math.round(y))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
