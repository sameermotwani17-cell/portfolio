import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import fs from 'fs'
import path from 'path'

interface CardOptions {
  buyerEmail: string
}

export async function generateFounderCard(opts: CardOptions): Promise<Uint8Array> {
  const { buyerEmail: _buyerEmail } = opts

  const pdfDoc = await PDFDocument.create()

  // Card dimensions — FIFA card portrait ratio
  const W = 360
  const H = 504
  const page = pdfDoc.addPage([W, H])

  // ── Background ──────────────────────────────────────────────────
  page.drawRectangle({
    x: 0, y: 0, width: W, height: H,
    color: rgb(0.07, 0.06, 0.05),
  })

  // Dark warm gradient strips (simulate)
  page.drawRectangle({
    x: 0, y: H * 0.55, width: W, height: H * 0.45,
    color: rgb(0.12, 0.08, 0.04),
    opacity: 0.7,
  })

  // Gold top bar
  page.drawRectangle({
    x: 0, y: H - 12, width: W, height: 12,
    color: rgb(0.85, 0.65, 0.15),
  })
  // Gold bottom bar
  page.drawRectangle({
    x: 0, y: 0, width: W, height: 8,
    color: rgb(0.85, 0.65, 0.15),
  })
  // Gold left bar
  page.drawRectangle({
    x: 0, y: 0, width: 8, height: H,
    color: rgb(0.85, 0.65, 0.15),
  })
  // Gold right bar
  page.drawRectangle({
    x: W - 8, y: 0, width: 8, height: H,
    color: rgb(0.85, 0.65, 0.15),
  })

  const helveticaBold   = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const helvetica       = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique)

  const gold   = rgb(0.95, 0.80, 0.25)
  const white  = rgb(1, 1, 1)
  const dimmed = rgb(0.65, 0.55, 0.35)

  // ── OVR ──────────────────────────────────────────────────────────
  page.drawText('93', {
    x: 26, y: H - 72,
    size: 44,
    font: helveticaBold,
    color: gold,
  })
  page.drawText('OVR', {
    x: 26, y: H - 84,
    size: 9,
    font: helvetica,
    color: dimmed,
  })

  // ── Position / Type ───────────────────────────────────────────────
  page.drawText('FND', {
    x: 26, y: H - 104,
    size: 11,
    font: helveticaBold,
    color: gold,
  })

  // ── Photo embed ────────────────────────────────────────────────────
  try {
    const photoPath = path.join(process.cwd(), 'public', 'photo.png')
    const photoBytes = fs.readFileSync(photoPath)
    const photoImage = await pdfDoc.embedPng(photoBytes)
    const imgW = 220
    const imgH = imgW * (photoImage.height / photoImage.width)
    page.drawImage(photoImage, {
      x: W / 2 - imgW / 2,
      y: H - 80 - imgH,
      width: imgW,
      height: imgH,
      opacity: 0.92,
    })
  } catch {
    // Photo not available — draw placeholder silhouette
    page.drawRectangle({
      x: W / 2 - 80, y: H - 340,
      width: 160, height: 240,
      color: rgb(0.15, 0.12, 0.08),
    })
  }

  // ── Gold separator line ───────────────────────────────────────────
  page.drawLine({
    start: { x: 20, y: 195 },
    end:   { x: W - 20, y: 195 },
    thickness: 1,
    color: gold,
    opacity: 0.4,
  })

  // ── Name ──────────────────────────────────────────────────────────
  const name = 'SAMEER'
  const nameSize = 36
  const nameW = helveticaBold.widthOfTextAtSize(name, nameSize)
  page.drawText(name, {
    x: W / 2 - nameW / 2,
    y: 165,
    size: nameSize,
    font: helveticaBold,
    color: white,
  })

  // ── FOUNDER badge ─────────────────────────────────────────────────
  const badge = 'FOUNDER'
  const badgeSize = 9
  const badgeW = helveticaBold.widthOfTextAtSize(badge, badgeSize)
  page.drawText(badge, {
    x: W / 2 - badgeW / 2,
    y: 148,
    size: badgeSize,
    font: helveticaBold,
    color: gold,
  })

  // ── FRESHMAN badge ────────────────────────────────────────────────
  const fb = '✦ FRESHMAN ✦'
  const fbSize = 7.5
  const fbW = helvetica.widthOfTextAtSize(fb, fbSize)
  page.drawText(fb, {
    x: W / 2 - fbW / 2,
    y: 135,
    size: fbSize,
    font: helveticaOblique,
    color: dimmed,
  })

  // ── Stats grid ─────────────────────────────────────────────────────
  const stats = [
    { label: 'AI',    value: '96' },
    { label: 'SHIP',  value: '91' },
    { label: 'CODE',  value: '88' },
    { label: 'BUILD', value: '92' },
    { label: 'UX',    value: '74' },
    { label: 'EXEC',  value: '87' },
  ]

  const colW = (W - 40) / 3
  const startY = 115

  stats.forEach((s, i) => {
    const col = i % 3
    const row = Math.floor(i / 3)
    const x = 20 + col * colW
    const y = startY - row * 38

    // Stat value
    const valW = helveticaBold.widthOfTextAtSize(s.value, 18)
    page.drawText(s.value, {
      x: x + colW / 2 - valW / 2,
      y: y,
      size: 18,
      font: helveticaBold,
      color: white,
    })
    // Stat label
    const lblW = helvetica.widthOfTextAtSize(s.label, 7)
    page.drawText(s.label, {
      x: x + colW / 2 - lblW / 2,
      y: y - 11,
      size: 7,
      font: helvetica,
      color: dimmed,
    })
  })

  // ── Footer ────────────────────────────────────────────────────────
  const footer = 'sameermotwani17@gmail.com'
  const footerW = helvetica.widthOfTextAtSize(footer, 6.5)
  page.drawText(footer, {
    x: W / 2 - footerW / 2,
    y: 18,
    size: 6.5,
    font: helvetica,
    color: dimmed,
  })

  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}
