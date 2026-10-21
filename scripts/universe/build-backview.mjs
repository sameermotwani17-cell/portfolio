/**
 * Builds the four back-view images the split uses.
 *
 *   node scripts/universe/build-backview.mjs <desktop-src> <mobile-src>
 *   node scripts/universe/build-backview.mjs --placeholder
 *
 * Outputs to public/universe/: backview-{desktop,mobile}.webp (warm original)
 * and backview-{desktop,mobile}-tech.webp (baked graphite grade: saturation
 * 0.15, blue-grey tint, contrast +10%). --placeholder draws a synthetic scene
 * (window, light rays, silhouette) so the section works before the generated
 * photo is dropped in.
 */
import sharp from 'sharp'
import { mkdirSync } from 'node:fs'

const OUT = 'public/universe'
mkdirSync(OUT, { recursive: true })

const scene = (w, h) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <radialGradient id="g" cx="50%" cy="38%" r="70%"><stop offset="0" stop-color="#fff3c4"/><stop offset=".35" stop-color="#9bb066"/><stop offset="1" stop-color="#0b120a"/></radialGradient>
    <linearGradient id="r" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff6cf" stop-opacity=".55"/><stop offset="1" stop-color="#fff6cf" stop-opacity="0"/></linearGradient>
    <radialGradient id="v" cx="50%" cy="48%" r="75%"><stop offset=".45" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".85"/></radialGradient>
    <filter id="b"><feGaussianBlur stdDeviation="${w / 220}"/></filter>
  </defs>
  <rect width="100%" height="100%" fill="#0d140b"/>
  <rect x="${w * 0.2}" y="${h * 0.1}" width="${w * 0.6}" height="${h * 0.5}" fill="url(#g)"/>
  <g stroke="#0d140b" stroke-width="${w / 240}" opacity=".9">
    <line x1="${w * 0.35}" y1="${h * 0.1}" x2="${w * 0.35}" y2="${h * 0.6}"/><line x1="${w * 0.5}" y1="${h * 0.1}" x2="${w * 0.5}" y2="${h * 0.6}"/><line x1="${w * 0.65}" y1="${h * 0.1}" x2="${w * 0.65}" y2="${h * 0.6}"/>
    <line x1="${w * 0.2}" y1="${h * 0.27}" x2="${w * 0.8}" y2="${h * 0.27}"/><line x1="${w * 0.2}" y1="${h * 0.44}" x2="${w * 0.8}" y2="${h * 0.44}"/>
  </g>
  <polygon points="${w * 0.3},${h * 0.1} ${w * 0.55},${h * 0.1} ${w * 0.95},${h} ${w * 0.4},${h}" fill="url(#r)" filter="url(#b)"/>
  <g fill="#070a06" filter="url(#b)">
    <ellipse cx="${w * 0.5}" cy="${h * 0.5}" rx="${w * 0.075}" ry="${h * 0.12}"/>
    <path d="M ${w * 0.5} ${h * 0.58} C ${w * 0.3} ${h * 0.6} ${w * 0.26} ${h * 0.8} ${w * 0.25} ${h} L ${w * 0.75} ${h} C ${w * 0.74} ${h * 0.8} ${w * 0.7} ${h * 0.6} ${w * 0.5} ${h * 0.58} Z"/>
    <rect x="${w * 0.07}" y="${h * 0.68}" width="${w * 0.09}" height="${h * 0.04}"/>
    <rect x="${w * 0.1}" y="${h * 0.6}" width="${w * 0.03}" height="${h * 0.09}"/>
  </g>
  <rect width="100%" height="100%" fill="url(#v)"/>
</svg>`

async function build(srcBuf, name, width, maxKB) {
  const base = sharp(srcBuf).resize({ width, withoutEnlargement: true })
  for (const [suffix, tech] of [['', false], ['-tech', true]]) {
    let img = base.clone()
    if (tech) {
      img = img
        .modulate({ saturation: 0.15, brightness: 1.45 })
        .tint({ r: 150, g: 165, b: 190 })
        .linear(1.1, -(128 * 0.1))
    }
    let q = 82
    let buf
    do {
      buf = await img.clone().webp({ quality: q }).toBuffer()
      q -= 6
    } while (buf.length > maxKB * 1024 && q > 30)
    await sharp(buf).toFile(`${OUT}/backview-${name}${suffix}.webp`)
    console.log(`${name}${suffix}`, (buf.length / 1024).toFixed(0), 'KB')
  }
}

const args = process.argv.slice(2)
if (args[0] === '--placeholder') {
  const d = await sharp(Buffer.from(scene(2400, 1350))).png().toBuffer()
  const m = await sharp(Buffer.from(scene(1200, 1500))).png().toBuffer()
  await build(d, 'desktop', 2400, 350)
  await build(m, 'mobile', 1200, 250)
} else {
  const [desktop, mobile] = args
  if (!desktop || !mobile) throw new Error('usage: build-backview.mjs <desktop-src> <mobile-src> | --placeholder')
  await build(desktop, 'desktop', 2400, 350)
  await build(mobile, 'mobile', 1200, 250)
}
