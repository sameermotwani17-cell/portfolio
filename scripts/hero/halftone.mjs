#!/usr/bin/env node
/**
 * Builds the hero halftone from assets-src/hero/retro-portrait.png.
 *
 *   node scripts/hero/halftone.mjs
 *
 * Samples a grid with a 6px dot pitch (at 1600px on the long edge) and draws
 * one circle per cell, sized by luminance (bright = big dot), on transparent.
 * Two outputs:
 *   public/hero/portrait-halftone.webp       thermal: each dot keeps its source colour
 *   public/hero/portrait-halftone-mono.webp  mono: ink dots only
 *
 * The crop is chosen so the eye and nose sit inside the centre tile of the
 * hero's 3x3 grid (see CROP below; negative offsets pad with black, which the
 * halftone treats as empty).
 */
import sharp from 'sharp'
import { mkdir, stat } from 'node:fs/promises'
import path from 'node:path'

const SRC = 'assets-src/hero/retro-portrait.png'
const OUT_DIR = 'public/hero'
const SIZE = 1600 // long edge of the output
const PITCH = 6 // dot pitch in output px
const SUPER = 2 // supersampling for anti-aliased dots
const INK = { r: 14, g: 14, b: 14 } // #0E0E0E
const MAX_RADIUS = PITCH * 0.6 // slight overlap at full brightness
const MIN_LUMA = 0.035 // below this a cell is empty (the black background)
const CURVE = 0.38 // radius = max * luma^CURVE; <0.5 lifts the dark violet hair
const WEBP = {
  thermal: { quality: 56, alphaQuality: 64, effort: 6, smartSubsample: true },
  mono: { quality: 72, alphaQuality: 80, effort: 6, smartSubsample: true },
}

/**
 * Square crop in SOURCE pixels. The portrait is a left-facing profile with
 * the face on the left of the frame; padding on the left (negative `left`)
 * shifts the face toward the centre tile of the grid.
 */
const CROP = { left: -260, top: 165, size: 900 }

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const meta = await sharp(SRC).metadata()
  const padL = Math.max(0, -CROP.left)
  const padT = Math.max(0, -CROP.top)
  const padR = Math.max(0, CROP.left + CROP.size - (meta.width ?? 0))
  const padB = Math.max(0, CROP.top + CROP.size - (meta.height ?? 0))

  // sharp applies extract before extend whatever the call order, so pad first.
  const padded = await sharp(SRC)
    .extend({ left: padL, top: padT, right: padR, bottom: padB, background: '#000' })
    .png()
    .toBuffer()

  const { data, info } = await sharp(padded)
    .extract({ left: CROP.left + padL, top: CROP.top + padT, width: CROP.size, height: CROP.size })
    .resize(SIZE, SIZE, { fit: 'fill', kernel: 'lanczos3' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const W = info.width
  const H = info.height
  const cols = Math.floor(W / PITCH)
  const rows = Math.floor(H / PITCH)

  // Per-cell average colour + luminance.
  const cells = []
  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      let r = 0, g = 0, b = 0, n = 0
      for (let y = gy * PITCH; y < (gy + 1) * PITCH; y++) {
        for (let x = gx * PITCH; x < (gx + 1) * PITCH; x++) {
          const i = (y * W + x) * 3
          r += data[i]; g += data[i + 1]; b += data[i + 2]; n++
        }
      }
      r /= n; g /= n; b /= n
      const luma = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255
      if (luma < MIN_LUMA) continue
      const radius = MAX_RADIUS * Math.pow(luma, CURVE)
      cells.push({ cx: (gx + 0.5) * PITCH, cy: (gy + 0.5) * PITCH, radius, r, g, b })
    }
  }

  const render = async (mode, file) => {
    const SW = W * SUPER, SH = H * SUPER
    const buf = Buffer.alloc(SW * SH * 4, 0)
    for (const c of cells) {
      const col = mode === 'mono' ? INK : boost(c)
      const cx = c.cx * SUPER, cy = c.cy * SUPER, rad = c.radius * SUPER
      const x0 = Math.max(0, Math.floor(cx - rad - 1)), x1 = Math.min(SW - 1, Math.ceil(cx + rad + 1))
      const y0 = Math.max(0, Math.floor(cy - rad - 1)), y1 = Math.min(SH - 1, Math.ceil(cy + rad + 1))
      for (let y = y0; y <= y1; y++) {
        for (let x = x0; x <= x1; x++) {
          const d = Math.hypot(x + 0.5 - cx, y + 0.5 - cy)
          const cov = Math.max(0, Math.min(1, rad - d + 0.5))
          if (cov <= 0) continue
          const i = (y * SW + x) * 4
          const a = Math.round(cov * 255)
          if (a > buf[i + 3]) {
            buf[i] = col.r; buf[i + 1] = col.g; buf[i + 2] = col.b; buf[i + 3] = a
          }
        }
      }
    }
    const out = path.join(OUT_DIR, file)
    await sharp(buf, { raw: { width: SW, height: SH, channels: 4 } })
      .resize(W, H, { kernel: 'lanczos3' })
      .webp(WEBP[mode])
      .toFile(out)
    const { size } = await stat(out)
    console.log(`${file}: ${cols}x${rows} cells, ${cells.length} dots, ${(size / 1024).toFixed(0)} KB`)
  }

  await render('thermal', 'portrait-halftone.webp')
  await render('mono', 'portrait-halftone-mono.webp')
}

/** Thermal dots: keep the source hue, lift saturation a touch so dots stay vivid on paper. */
function boost({ r, g, b }) {
  const m = (r + g + b) / 3
  const k = 1.18
  const cl = (v) => Math.max(0, Math.min(255, Math.round(m + (v - m) * k)))
  return { r: cl(r), g: cl(g), b: cl(b) }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
