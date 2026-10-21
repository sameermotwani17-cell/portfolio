import { CHAPTER_NODES, CENTRE_PT, ERA_NODES, type Pt } from './layout'

/**
 * The camera tour. Scroll progress p (0..1 across the pinned section) maps to
 * a point on a path through the map: full map -> era -> chapter -> chapter...
 * -> full map. Segment lengths are weights, not pixels, so the same table
 * drives desktop (taller section) and mobile (shorter section).
 *
 *   INTRO  hold on the full map while it draws itself
 *   each chapter: GLIDE (camera travels) then HOLD (camera rests, panel read)
 *   OUTRO  pull back to the full map, then the closing line writes on
 */
export const T = {
  INTRO: 50,
  CHAPTER: 70,
  GLIDE: 28,
  OUTRO_ZOOM: 50,
  OUTRO_HOLD: 40,
  /** the panel swaps once the camera is this far through a glide */
  ACTIVATE: 0.2,
} as const

export const SCALE = { full: 1, era: 1.6, chapter: 2.7, pullBack: 0.95 } as const

export const N = CHAPTER_NODES.length
export const TOTAL = T.INTRO + N * T.CHAPTER + T.OUTRO_ZOOM + T.OUTRO_HOLD

export type View = { cx: number; cy: number; scale: number; fx: number; fy: number }
export type Sample = {
  view: View
  chapter: number // -1 outside the tour
  era: number // -1 outside the tour
  phase: 'intro' | 'tour' | 'outro'
  outro: boolean // the closing line has started to write
}

const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x))
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2) // easeInOutCubic
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

const FULL: View = { cx: CENTRE_PT.x, cy: CENTRE_PT.y, scale: SCALE.full, fx: 0.5, fy: 0.5 }

function quad(a: number, c: number, b: number, t: number) {
  const m = 1 - t
  return m * m * a + 2 * m * t * c + t * t * b
}
function cubic(a: number, c1: number, c2: number, b: number, t: number) {
  const m = 1 - t
  return m * m * m * a + 3 * m * m * t * c1 + 3 * m * t * t * c2 + t * t * t * b
}

type Mode = 'wide' | 'compact'

function chapterView(i: number, mode: Mode): View {
  const c = CHAPTER_NODES[i]
  const f = mode === 'wide' ? c.focusWide : c.focusCompact
  return { cx: c.target.x, cy: c.target.y, scale: SCALE.chapter, fx: f.fx, fy: f.fy }
}

/** A path of bezier control points {pt, scale} that the camera follows. */
function path(from: View, via: { pt: Pt; scale: number }[], to: View, t: number): View {
  const e = ease(t)
  const ls = (s: number) => Math.log(s)
  let cx: number
  let cy: number
  let s: number
  if (via.length === 1) {
    cx = quad(from.cx, via[0].pt.x, to.cx, e)
    cy = quad(from.cy, via[0].pt.y, to.cy, e)
    s = Math.exp(quad(ls(from.scale), ls(via[0].scale), ls(to.scale), e))
  } else {
    cx = cubic(from.cx, via[0].pt.x, via[1].pt.x, to.cx, e)
    cy = cubic(from.cy, via[0].pt.y, via[1].pt.y, to.cy, e)
    s = Math.exp(cubic(ls(from.scale), ls(via[0].scale), ls(via[1].scale), ls(to.scale), e))
  }
  return { cx, cy, scale: s, fx: lerp(from.fx, to.fx, e), fy: lerp(from.fy, to.fy, e) }
}

/** The view the camera has when chapter i is at rest. */
export function restView(i: number, mode: Mode): View {
  return chapterView(i, mode)
}

/** Weighted offset (0..TOTAL) where chapter i's hold begins. */
export function holdStart(i: number) {
  return T.INTRO + i * T.CHAPTER + T.GLIDE
}

/** Progress (0..1) to scroll to so chapter i is read at rest. */
export function progressForChapter(i: number) {
  return (holdStart(i) + 6) / TOTAL
}

/** Progress for the first chapter of an era. */
export function progressForEra(eraIdx: number) {
  const first = CHAPTER_NODES.findIndex((c) => c.eraIndex === eraIdx)
  return progressForChapter(first)
}

export function sample(p: number, mode: Mode): Sample {
  const w = clamp(p) * TOTAL

  if (w < T.INTRO) {
    return { view: FULL, chapter: -1, era: -1, phase: 'intro', outro: false }
  }

  const tourEnd = T.INTRO + N * T.CHAPTER
  if (w >= tourEnd) {
    // OUTRO: pull back to the full map, then hold while the line writes on
    const local = w - tourEnd
    const last = chapterView(N - 1, mode)
    const t = clamp(local / T.OUTRO_ZOOM)
    const view = path(last, [{ pt: { x: CENTRE_PT.x, y: CENTRE_PT.y }, scale: 1.25 }], FULL, t)
    return { view, chapter: -1, era: -1, phase: 'outro', outro: local >= T.OUTRO_ZOOM * 0.7 }
  }

  const i = Math.min(N - 1, Math.floor((w - T.INTRO) / T.CHAPTER))
  const local = w - T.INTRO - i * T.CHAPTER
  const node = CHAPTER_NODES[i]
  const to = chapterView(i, mode)
  const firstOfEra = node.indexInEra === 0

  let view: View
  if (local >= T.GLIDE) {
    view = to
  } else {
    const t = local / T.GLIDE
    const era = ERA_NODES[node.eraIndex]
    if (i === 0) {
      // full map -> the first era -> chapter
      view = path(
        FULL,
        [
          { pt: era.target, scale: 1.4 },
          { pt: era.target, scale: SCALE.era },
        ],
        to,
        t,
      )
    } else if (firstOfEra) {
      // era change: pull back through the centre, then into the next era
      view = path(
        chapterView(i - 1, mode),
        [
          { pt: { x: CENTRE_PT.x, y: CENTRE_PT.y }, scale: SCALE.pullBack },
          { pt: era.target, scale: SCALE.era },
        ],
        to,
        t,
      )
    } else {
      // glide along the twigs: previous node -> the era's label -> this node
      view = path(chapterView(i - 1, mode), [{ pt: era.pos, scale: 1.5 }], to, t)
    }
  }

  const activated = local >= T.CHAPTER * T.ACTIVATE
  const chapter = activated ? i : i === 0 ? -1 : i - 1
  const eraNow = local >= T.CHAPTER * 0.1 ? node.eraIndex : i === 0 ? -1 : CHAPTER_NODES[i - 1].eraIndex
  return { view, chapter, era: eraNow, phase: 'tour', outro: false }
}

/** The SVG viewBox for a view, given the stage's aspect ratio (w / h). */
export function viewBoxFor(v: View, aspect: number, vbW: number, vbH: number) {
  const fitW = Math.max(vbW, vbH * aspect)
  const fitH = fitW / aspect
  const w = fitW / v.scale
  const h = fitH / v.scale
  return { x: v.cx - v.fx * w, y: v.cy - v.fy * h, w, h }
}
