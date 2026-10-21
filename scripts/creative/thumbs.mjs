#!/usr/bin/env node
/**
 * Builds the creative gallery thumbnails from assets-src/creative/src/.
 *   node scripts/creative/thumbs.mjs
 * 1280px on the long edge, WebP, stepped down in quality until <= 120 KB.
 */
import sharp from 'sharp'
import { mkdir, stat } from 'node:fs/promises'

const SRC = 'assets-src/creative/src'
const OUT = 'public/creative/works'
const MAX = 120 * 1024

// output id -> source file (+ optional flat background for transparent product shots)
const MAP = {
  'retro-studios': ['cinematic-lg.webp'],
  'retro-raven': ['retro-raven.webp'],
  dk2r: ['dk2r-mercado-jersey.webp'],
  'dk2r-1': ['dk2r-1.webp'],
  'dk2r-2': ['dk2r-2.webp'],
  'dk2r-3': ['dk2r-3.webp'],
  'dk2r-4': ['dk2r-4.webp'],
  'dk2r-5': ['dk2r-5.webp'],
  'dk2r-6': ['dk2r-6.webp'],
  'too-easy': ['too-easy.png', '#ffffff'],
  plastivore: ['plastivore.png', '#07090a'],
  'afro-week': ['afro-week.jpg'],
  danflix: ['danflix.jpg'],
  'first-light': ['first-light.jpg'],
  music: ['music.webp'],
}

await mkdir(OUT, { recursive: true })
for (const [id, [file, bg]] of Object.entries(MAP)) {
  let img = sharp(`${SRC}/${file}`).rotate().resize(1280, 1280, { fit: 'inside', withoutEnlargement: true })
  if (bg) img = img.flatten({ background: bg })
  const out = `${OUT}/${id}.webp`
  let q = 78
  for (;;) {
    await img.clone().webp({ quality: q, effort: 6 }).toFile(out)
    const { size } = await stat(out)
    if (size <= MAX || q <= 40) {
      console.log(`${id.padEnd(14)} q${q}  ${(size / 1024).toFixed(0)} KB`)
      break
    }
    q -= 6
  }
}
