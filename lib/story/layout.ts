import { CHAPTERS, ERAS, eraIndex, type Chapter, type Era } from './chapters'

/**
 * Deterministic geometry for the map. Everything is computed once from the
 * data in chapters.ts: adding a chapter never needs hand placement.
 *
 * Coordinates are SVG user units in a 2000 x 1400 box. Eras sit on an ellipse
 * around the centre word, clockwise from 12 o'clock. Each era's chapters fan
 * out on an arc AWAY from the centre, so twigs never cross.
 */
export const VB = { w: 2000, h: 1400 } as const
export const CENTRE_PT = { x: 1000, y: 700 } as const

export type Pt = { x: number; y: number }
export type Curve = { from: Pt; c: Pt; to: Pt }
export type Anchor = 'start' | 'middle' | 'end'

// Font sizes in user units (CSS in globals.css mirrors these; compact screens override).
export const FONT = { centre: 150, era: 40, chapter: 27 } as const
const EST = 0.52 // average glyph width / em for the handwriting face (estimate)

const RX = 500
const RY = 315
const START_ANGLE = -90
const ERA_STEP = 72
const DOODLE_R = 24 // half of the 48u chapter doodle
export const ERA_DOODLE = 64
export const CHAPTER_DOODLE = 48

const rad = (d: number) => (d * Math.PI) / 180
const add = (a: Pt, b: Pt): Pt => ({ x: a.x + b.x, y: a.y + b.y })
const mul = (a: Pt, k: number): Pt => ({ x: a.x * k, y: a.y * k })
const len = (a: Pt) => Math.hypot(a.x, a.y)
const unit = (a: Pt): Pt => mul(a, 1 / (len(a) || 1))
const sub = (a: Pt, b: Pt): Pt => ({ x: a.x - b.x, y: a.y - b.y })

export type ChapterNode = {
  chapter: Chapter
  index: number // global, 0..14
  eraIndex: number
  indexInEra: number
  twig: Curve
  node: Pt // end of the twig
  doodle: Pt // centre of the 48u doodle
  label: { x: number; y: number; anchor: Anchor; baseline: 'middle' | 'alphabetic' }
  labelWidth: number // estimated, user units
  /** where the camera looks when this chapter is active */
  target: Pt
  /** side the ChapterPanel takes on wide screens (never the node's side) */
  panel: 'left' | 'right'
  /** where the target sits on screen, 0..1 */
  focusWide: { fx: number; fy: number }
  focusCompact: { fx: number; fy: number }
}

export type EraNode = {
  era: Era
  index: number
  pos: Pt // era label centre
  labelWidth: number
  branch: Curve // from the centre word to the era's doodle
  doodle: Pt
  chapters: ChapterNode[]
  /** bounding box of the era's whole cluster (camera framing) */
  bbox: { x0: number; y0: number; x1: number; y1: number }
  target: Pt
}

function curve(from: Pt, to: Pt, bend: number): Curve {
  const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 }
  const d = unit(sub(to, from))
  const n = { x: -d.y, y: d.x }
  return { from, to, c: add(mid, mul(n, bend * len(sub(to, from)))) }
}

function build() {
  const eras: EraNode[] = []
  const flat: ChapterNode[] = []

  ERAS.forEach((era, k) => {
    const theta = START_ANGLE + ERA_STEP * k
    const dir = { x: Math.cos(rad(theta)), y: Math.sin(rad(theta)) }
    const pos = { x: CENTRE_PT.x + RX * dir.x, y: CENTRE_PT.y + RY * dir.y }
    const labelWidth = era.label.length * FONT.era * (EST + 0.06)
    // the era doodle sits on the inner side, clear of the label's ellipse
    const lrx = labelWidth / 2 + 10
    const lry = 26
    const toEdge = 1 / Math.sqrt((dir.x / lrx) ** 2 + (dir.y / lry) ** 2)
    const doodle = add(pos, mul(dir, -(toEdge + ERA_DOODLE * 0.5 + 22)))

    // main branch: from just outside the centre word to the era's doodle
    const ring = { x: CENTRE_PT.x + 310 * dir.x, y: CENTRE_PT.y + 112 * dir.y }
    const branch = curve(ring, add(doodle, mul(dir, -ERA_DOODLE * 0.52)), k % 2 ? 0.1 : -0.1)

    const mine = CHAPTERS.map((c, i) => ({ c, i })).filter(({ c }) => eraIndex(c.era) === k)
    const n = mine.length
    // Israel has the most chapters: give it the widest fan
    const step = n >= 5 ? 42 : n === 4 ? 45 : 50
    const ers: ChapterNode[] = []

    mine.forEach(({ c, i }, j) => {
      const psi = theta + (j - (n - 1) / 2) * step
      const u = { x: Math.cos(rad(psi)), y: Math.sin(rad(psi)) }
      const rx = labelWidth / 2 + 18
      const ry = 30
      const start = add(pos, { x: rx * u.x, y: ry * u.y })
      const R = 165 + Math.abs(u.x) * (labelWidth / 2) + (n >= 5 ? 24 : 0)
      const node = add(pos, mul(u, R))
      const twig = curve(start, node, j % 2 ? 0.14 : -0.14)
      const dd = unit(sub(node, twig.c)) // direction the twig arrives from
      const doodlePt = add(node, mul(dd, DOODLE_R + 8))
      const lw = c.label.length * FONT.chapter * EST

      let anchor: Anchor
      let lx: number
      let ly: number
      let baseline: 'middle' | 'alphabetic' = 'alphabetic'
      if (dd.x > 0.5) {
        anchor = 'start'
        lx = doodlePt.x + DOODLE_R + 10
        ly = doodlePt.y + FONT.chapter * 0.3
      } else if (dd.x < -0.5) {
        anchor = 'end'
        lx = doodlePt.x - DOODLE_R - 10
        ly = doodlePt.y + FONT.chapter * 0.3
      } else {
        anchor = 'middle'
        lx = doodlePt.x
        ly = dd.y < 0 ? doodlePt.y - DOODLE_R - 12 : doodlePt.y + DOODLE_R + FONT.chapter + 6
      }

      // the camera looks at the middle of doodle + label
      const target: Pt =
        anchor === 'start'
          ? { x: doodlePt.x + lw / 2 * 0.55, y: doodlePt.y }
          : anchor === 'end'
            ? { x: doodlePt.x - lw / 2 * 0.55, y: doodlePt.y }
            : { x: doodlePt.x, y: (doodlePt.y + ly) / 2 }

      let panel: 'left' | 'right'
      let fx: number
      if (anchor === 'start') {
        panel = 'left'
        fx = 0.54
      } else if (anchor === 'end') {
        panel = 'right'
        fx = 0.46
      } else {
        panel = target.x < CENTRE_PT.x ? 'right' : 'left'
        fx = panel === 'right' ? 0.36 : 0.64
      }
      const fxC = anchor === 'start' ? 0.4 : anchor === 'end' ? 0.6 : 0.5

      ers.push({
        chapter: c,
        index: i,
        eraIndex: k,
        indexInEra: j,
        twig,
        node,
        doodle: doodlePt,
        label: { x: lx, y: ly, anchor, baseline },
        labelWidth: lw,
        target,
        panel,
        focusWide: { fx, fy: 0.5 },
        focusCompact: { fx: fxC, fy: 0.24 },
      })
    })

    // cluster bounding box: era label + doodle + every chapter's doodle and label
    let x0 = pos.x - labelWidth / 2
    let x1 = pos.x + labelWidth / 2
    let y0 = pos.y - 40
    let y1 = pos.y + 40
    for (const g of [doodle, ...ers.map((e) => e.doodle)]) {
      x0 = Math.min(x0, g.x - 30)
      x1 = Math.max(x1, g.x + 30)
      y0 = Math.min(y0, g.y - 30)
      y1 = Math.max(y1, g.y + 30)
    }
    for (const e of ers) {
      const { x, y, anchor } = e.label
      const w = e.labelWidth
      const lx0 = anchor === 'start' ? x : anchor === 'end' ? x - w : x - w / 2
      x0 = Math.min(x0, lx0)
      x1 = Math.max(x1, lx0 + w)
      y0 = Math.min(y0, y - FONT.chapter)
      y1 = Math.max(y1, y + 10)
    }

    eras.push({
      era,
      index: k,
      pos,
      labelWidth,
      branch,
      doodle,
      chapters: ers,
      bbox: { x0, y0, x1, y1 },
      target: { x: (x0 + x1) / 2, y: (y0 + y1) / 2 },
    })
    flat.push(...ers)
  })

  flat.sort((a, b) => a.index - b.index)
  return { eras, chapters: flat }
}

const built = build()
export const ERA_NODES: EraNode[] = built.eras
export const CHAPTER_NODES: ChapterNode[] = built.chapters

/** Where the outro line is handwritten: centred under the whole map. */
export const OUTRO_PT: Pt = { x: CENTRE_PT.x, y: 1318 }
