import rough from 'roughjs'
import type { Curve } from '@/lib/story/layout'
import type { Shape } from './shapes'

/**
 * Server-side rough.js: every hand-drawn path in the section is generated
 * here with a FIXED seed per element, so nothing re-randomises between
 * renders or between server and client. roughjs never reaches the browser.
 */
const gen = rough.generator()

export type RoughPath = { d: string; stroke: string; fill: string; sw: number }

export function seedOf(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return (h >>> 0) % 2147483646 || 1
}

const trim = (d: string, dec: number) => d.replace(/-?\d+\.\d+/g, (m) => String(+(+m).toFixed(dec)))

type D = ReturnType<typeof gen.line>
const toPaths = (dr: D, dec = 1): RoughPath[] =>
  gen.toPaths(dr).map((p) => ({ d: trim(p.d, dec), stroke: p.stroke, fill: p.fill ?? 'none', sw: p.strokeWidth }))

const BASE = { roughness: 1.2, bowing: 1.5, stroke: 'currentColor' } as const

const cache = new Map<string, RoughPath[]>()
function memo(key: string, make: () => RoughPath[]) {
  let v = cache.get(key)
  if (!v) cache.set(key, (v = make()))
  return v
}

/** A branch or twig: one quadratic curve, drawn twice by rough's multi-stroke. */
export function roughCurve(c: Curve, id: string, strokeWidth: number): RoughPath[] {
  return memo(`curve:${id}:${strokeWidth}`, () =>
    toPaths(
      gen.path(`M ${c.from.x.toFixed(1)} ${c.from.y.toFixed(1)} Q ${c.c.x.toFixed(1)} ${c.c.y.toFixed(1)} ${c.to.x.toFixed(1)} ${c.to.y.toFixed(1)}`, {
        ...BASE,
        strokeWidth,
        seed: seedOf(id),
      }),
    ),
  )
}

export function roughLine(x1: number, y1: number, x2: number, y2: number, id: string, strokeWidth: number): RoughPath[] {
  return memo(`line:${id}`, () => toPaths(gen.line(x1, y1, x2, y2, { ...BASE, strokeWidth, seed: seedOf(id) })))
}

export type Drawn = { paths: RoughPath[]; text?: { x: number; y: number; size: number; text: string } }

/** One doodle: 64 x 64 box, loose strokes (less wobble than the big branches). */
export function roughDoodle(id: string, shapes: Shape[]): { paths: RoughPath[]; texts: Extract<Shape, { t: 'x' }>[] } {
  const paths: RoughPath[] = []
  const texts: Extract<Shape, { t: 'x' }>[] = []
  shapes.forEach((s, i) => {
    const o = {
      ...BASE,
      roughness: 1,
      maxRandomnessOffset: 1.1,
      strokeWidth: 2,
      seed: seedOf(`${id}:${i}`),
    }
    const solid = { fill: 'currentColor', fillStyle: 'solid' as const }
    let d: D | null = null
    switch (s.t) {
      case 'l':
        d = gen.line(...s.a, o)
        break
      case 'c':
        d = gen.circle(s.a[0], s.a[1], s.a[2], s.f ? { ...o, ...solid } : o)
        break
      case 'e':
        d = gen.ellipse(...s.a, o)
        break
      case 'r':
        d = gen.rectangle(...s.a, o)
        break
      case 'p':
        d = gen.path(s.d, s.f ? { ...o, ...solid } : o)
        break
      case 'g':
        d = gen.polygon(s.pts, s.f ? { ...o, ...solid } : o)
        break
      case 'x':
        texts.push(s)
        break
    }
    // integer coordinates: a 64-unit box does not need more, and it is a third smaller
    if (d) paths.push(...toPaths(d, 0))
  })
  return { paths, texts }
}
