/**
 * Generates public/cv-creative.pdf — the creative-direction counterpart to
 * public/cv.pdf. One page, set in Helvetica, because this one is read by
 * design and brand hires rather than engineering ones.
 *
 * Every claim here is sourced from the portfolio's verified project data and
 * from each project's own live site. Nothing is invented.
 * Run: node scripts/generate-cv.js
 */
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib')
const fs = require('fs')
const path = require('path')

const PAGE_W = 612 // US Letter
const PAGE_H = 792
const M = 46
const INK = rgb(0.08, 0.08, 0.08)
const SOFT = rgb(0.38, 0.38, 0.38)
const RULE = rgb(0.08, 0.08, 0.08)

async function main() {
  const doc = await PDFDocument.create()
  const page = doc.addPage([PAGE_W, PAGE_H])
  const sans = await doc.embedFont(StandardFonts.Helvetica)
  const bold = await doc.embedFont(StandardFonts.HelveticaBold)
  const oblique = await doc.embedFont(StandardFonts.HelveticaOblique)

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

  const text = (str, { font = sans, size = 9.2, x = M, color = INK, dy = null } = {}) => {
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
    text(title.toUpperCase(), { font: bold, size: 9.4 })
    y -= 3.5
    page.drawLine({ start: { x: M, y }, end: { x: PAGE_W - M, y }, thickness: 0.7, color: RULE })
    y -= 11
  }

  const entry = (left, right) => {
    text(left, { font: bold, size: 9.4 })
    if (right) rightText(right, bold, 9.4)
    y -= 11
  }

  const subline = (left, right) => {
    text(left, { font: oblique, size: 9 })
    if (right) rightText(right, oblique, 9)
    y -= 10.5
  }

  const bullet = (str) => {
    const lines = wrap(str, sans, 8.9, PAGE_W - 2 * M - 14)
    lines.forEach((ln, i) => {
      if (i === 0) page.drawText('•', { x: M + 2, y, size: 8.9, font: sans, color: INK })
      page.drawText(ln, { x: M + 14, y, size: 8.9, font: sans, color: INK })
      y -= 10.2
    })
  }

  /** a discography line: title, one-line description, right-aligned role */
  const work = (title, role, desc) => {
    text(title, { font: bold, size: 9 })
    if (role) rightText(role, oblique, 8.6, SOFT)
    y -= 10
    wrap(desc, sans, 8.7, PAGE_W - 2 * M - 10).forEach((ln) => {
      page.drawText(ln, { x: M + 10, y, size: 8.7, font: sans, color: SOFT })
      y -= 9.8
    })
    y -= 2
  }

  const gap = (n = 4) => (y -= n)

  // ── header ──
  centered('SAMEER MOTWANI', bold, 17)
  y -= 13
  centered('Creative Director  ·  Multimedia Designer  ·  Brand & Campaign Systems', sans, 9.6, SOFT)
  y -= 12
  centered(
    'Beppu, Oita, Japan  ·  sameermotwani17@gmail.com  ·  instagram.com/retro.studios_',
    sans,
    8.3,
    SOFT
  )
  y -= 10
  centered(
    'Portfolio: portfolio-gamma-two-d8j6b2mgkq.vercel.app  ·  linkedin.com/in/sameer-motwani-2625a62b5',
    sans,
    8.3,
    SOFT
  )
  y -= 16

  // ── profile ──
  section('Profile')
  bullet(
    'Creative director who ships the whole pipeline: brand identity and art direction through campaign photography, motion, copy, and the production-grade site the work sells on. Currently running a paid 12-country World Cup apparel campaign solo, as director, prompt engineer, and technical producer.'
  )
  gap(6)

  // ── creative experience ──
  section('Creative Experience')
  entry('Retro Studios (under StarLabs)', 'Beppu, Japan')
  subline('Founder & Creative Director', 'Apr 2026 - Present')
  bullet(
    'One-person AI-native creative studio producing agency-grade cinematic brand content: statics, reels, and commercial spots delivered without a crew.'
  )
  bullet(
    'Built an 8-layer, reference-locked prompt architecture reused across every edition, including a dedicated anti-perfection layer that defeats the tells of synthetic imagery (sourceless light, static fabric, flawless skin).'
  )
  bullet(
    'Locked a house visual DNA - ARRI Alexa / Kodak 2383 colour science - and held it across 150+ delivered hero images so a 12-market campaign reads as one film.'
  )
  gap()
  entry('DK2R Football Wear', 'Client engagement')
  subline('Creative Director, Prompt Engineer & Technical Producer - for founder Hassan Kai Turay', '2026')
  bullet(
    'Art-directed 12 country editions for a 2026 World Cup capsule - Morocco Zellige tilework, Japan kintsugi-slashed sakura, Brazil rhinestone crest - each with its own visual language across three silhouettes, 300 numbered pieces per edition, no restocks.'
  )
  bullet(
    'Directed AI campaign photography and video per edition, then bridged renders into factory production sheets: a 55-asset, 14-edition manufacturing QA pass shipped with zero redos.'
  )
  bullet(
    'Designed and solo-built the live e-commerce store the collection sells on (Next.js, Supabase, Stripe, PayPal). Contract and deposit before any engagement.'
  )
  gap(6)

  // ── selected work ──
  section('Selected Work - Retro Studios Discography')
  work(
    'DK2R - dkai2ray.company',
    'Creative direction, campaign, storefront',
    'A 12-country limited jersey line and the live shop it sells from. Football, identity, prestige.'
  )
  work(
    'Afro Week 2026 - millennium-hall.vercel.app',
    'Event identity & booking UX',
    'Ticketing site for a theatrical production at Millennium Hall, APU: 732 seats in live availability, a seat picker, free admission down to a name and an email, and an instant QR e-ticket. Pan-African red-gold-green used as structure, not decoration.'
  )
  work(
    'Plastivore - plastivore-plum.vercel.app',
    'Concept brand & art direction',
    'A shoe with a bio-engineered sole that eats microplastics, built for APU’s AD WARS marketing simulation. Scroll-scrubbed cinematic product film, an exploded four-layer sole diagram, three named colorways, pitched in an investor-deck register. Fictional science, real design discipline.'
  )
  work(
    'Too Easy - too-easy-seven.vercel.app',
    'Brand & product-first commerce',
    'A minimal streetwear label built as an exercise in restraint: five hero pieces shot and priced like a real drop, carried entirely by the product grid - no manifesto, no lifestyle campaign.'
  )
  work(
    'First Light - first-light-alpha.vercel.app',
    'Product design & editorial art direction',
    'An AI photo-culling tool made as a gift: point it at 1,847 wedding frames, describe the edit in plain English, get a ranked shortlist with a one-line reason per pick. Sold in warm editorial photography rather than UI chrome, with a local-first privacy story.'
  )
  work(
    'Danflix - danflix-murex.vercel.app',
    'Interface art direction',
    'A birthday gift built as a streaming service - profile gate, wordmark ident with audio sting, ten titles with posters, hover previews, detail modals and a subtitled player - set to Netflix’s own design tokens.'
  )
  gap(4)

  // ── capabilities ──
  section('Capabilities')
  bullet(
    'Creative direction: brand identity, art direction, campaign systems, visual DNA and style-rule authoring, editorial and copy voice.'
  )
  bullet(
    'Production: AI campaign photography and video (GPT Image 2, Higgsfield Cinema Studio, Kling, Seedance), colour grading, motion and edit (CapCut), music (Suno).'
  )
  bullet(
    'Design engineering: Next.js, Tailwind, Supabase, Vercel, Stripe/PayPal - design systems taken from concept to a deployed, transacting site.'
  )
  gap(6)

  // ── recognition & education ──
  section('Recognition & Education')
  entry('Ritsumeikan Asia Pacific University (APU)', 'Beppu, Japan')
  subline('B.B.A., Finance', 'Expected 2029')
  bullet(
    '1st Place, APU Annual Hackathon 2025 · 1st Runner-Up and Best Speaker, Hult Prize APU Campus Round 2026 · 1st Place, Next Einstein Forum (Africa Science Week) 2023 · Best High School Short Story Writer 2023.'
  )
  bullet('Music: five original tracks released as RETRO on Spotify and Apple Music.')
  bullet('Languages: English (native), Spanish (intermediate), Japanese (developing).')

  fs.mkdirSync(path.join(__dirname, '..', 'public'), { recursive: true })
  const bytes = await doc.save()
  fs.writeFileSync(path.join(__dirname, '..', 'public', 'cv-creative.pdf'), bytes)
  console.log('cv-creative.pdf written,', Math.round(bytes.length / 1024) + 'KB, final y =', Math.round(y))
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
