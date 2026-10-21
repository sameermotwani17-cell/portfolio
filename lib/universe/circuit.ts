import { mulberry32 } from './noise'

/**
 * Seeded circuit-board generator in the style of the reference: vertical trunks
 * that jog at 45° and branch into thin side traces, ending in filled pads, ring
 * vias and rectangular IC pads. Pure and deterministic: same seed, same board.
 */
export type Pt = [number, number]

export type Trace = {
  id: number
  d: string
  pts: Pt[]
  len: number
  w: number
  trunk: boolean
}
export type Pad = { x: number, y: number, r: number, trace: number }
export type Ic = { x: number, y: number, w: number, h: number, trace: number }
export type Board = {
  W: number
  H: number
  traces: Trace[]
  pads: Pad[]
  vias: Pad[]
  ics: Ic[]
}

const round = (n: number) => Math.round(n)
const toD = (pts: Pt[]) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${round(x)} ${round(y)}`).join('')
const lengthOf = (pts: Pt[]) => {
  let l = 0
  for (let i = 1; i < pts.length; i++) l += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1])
  return l
}

export function makeBoard(seed = 7, W = 1600, H = 900, trunks = 28): Board {
  const rnd = mulberry32(seed)
  const between = (a: number, b: number) => a + rnd() * (b - a)
  const clampX = (x: number) => Math.max(16, Math.min(W - 16, x))

  const traces: Trace[] = []
  const pads: Pad[] = []
  const vias: Pad[] = []
  const ics: Ic[] = []

  const add = (pts: Pt[], w: number, trunk: boolean): Trace => {
    const t: Trace = { id: traces.length, d: toD(pts), pts, len: lengthOf(pts), w, trunk }
    traces.push(t)
    return t
  }

  for (let i = 0; i < trunks; i++) {
    let x = clampX(((i + 0.5) * W) / trunks + between(-18, 18))
    let y = between(-20, H * 0.18)
    const stopY = H * between(0.72, 1.02)
    const pts: Pt[] = [[x, y]]
    while (y < stopY) {
      y += between(60, 210)
      pts.push([x, y])
      if (rnd() < 0.5 && y < stopY - 80) {
        const s = between(28, 70)
        const dir = rnd() < 0.5 ? -1 : 1
        const nx = clampX(x + dir * s)
        const real = Math.abs(nx - x)
        x = nx
        y += real
        pts.push([x, y])
      }
    }
    const trunk = add(pts, 3, true)

    // branches off interior vertices
    const picks = 2 + Math.floor(rnd() * 3)
    for (let b = 0; b < picks; b++) {
      const v = pts[1 + Math.floor(rnd() * Math.max(1, pts.length - 2))]
      let [bx, by] = v
      const dir = rnd() < 0.5 ? -1 : 1
      const up = rnd() < 0.4 ? -1 : 1
      const bp: Pt[] = [[bx, by]]
      const s1 = between(36, 110)
      bx = clampX(bx + dir * s1)
      by += up * Math.abs(bx - bp[0][0])
      bp.push([bx, by])
      const L = between(40, 150)
      by += up * L
      bp.push([bx, by])
      if (rnd() < 0.45) {
        const s2 = between(30, 70)
        const d2 = -dir
        const nx = clampX(bx + d2 * s2)
        by += up * Math.abs(nx - bx)
        bx = nx
        bp.push([bx, by])
        by += up * between(20, 80)
        bp.push([bx, by])
      }
      const bt = add(bp, 1.5, false)
      const end = bp[bp.length - 1]
      const kind = rnd()
      const inMid = end[1] > H * 0.38 && end[1] < H * 0.66
      if (inMid && kind < 0.35) {
        ics.push({ x: end[0] - 5, y: end[1] - 20, w: 10, h: between(34, 48), trace: bt.id })
      } else if (kind < 0.7) {
        pads.push({ x: end[0], y: end[1], r: 5, trace: bt.id })
      } else {
        vias.push({ x: end[0], y: end[1], r: 11, trace: bt.id })
      }
    }

    // trunk ends: a via or a pad
    const last = pts[pts.length - 1]
    if (rnd() < 0.5) vias.push({ x: last[0], y: last[1], r: 12, trace: trunk.id })
    else pads.push({ x: last[0], y: last[1], r: 6, trace: trunk.id })
    if (rnd() < 0.3) {
      const first = pts[0]
      pads.push({ x: first[0], y: first[1], r: 6, trace: trunk.id })
    }
  }

  return { W, H, traces, pads, vias, ics }
}

/** Distance from a point to a polyline. */
export function distToTrace(t: Trace, px: number, py: number): number {
  let best = Infinity
  for (let i = 1; i < t.pts.length; i++) {
    const [ax, ay] = t.pts[i - 1]
    const [bx, by] = t.pts[i]
    const dx = bx - ax
    const dy = by - ay
    const l2 = dx * dx + dy * dy || 1
    let u = ((px - ax) * dx + (py - ay) * dy) / l2
    u = u < 0 ? 0 : u > 1 ? 1 : u
    const d = Math.hypot(px - (ax + u * dx), py - (ay + u * dy))
    if (d < best) best = d
  }
  return best
}
