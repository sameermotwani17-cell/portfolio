import type { DoodleId } from '@/lib/story/chapters'

/**
 * Doodles are data: a list of simple shapes in a 64 x 64 box, drawn by
 * rough.js on the server (see rough.ts) into <symbol>s. Loose marker style,
 * same hand as the reference: a few strokes each, nothing detailed.
 */
export type Shape =
  | { t: 'l'; a: [number, number, number, number] }
  | { t: 'c'; a: [number, number, number]; f?: boolean }
  | { t: 'e'; a: [number, number, number, number] }
  | { t: 'r'; a: [number, number, number, number] }
  | { t: 'p'; d: string; f?: boolean }
  | { t: 'g'; pts: [number, number][]; f?: boolean }
  | { t: 'x'; x: number; y: number; size: number; text: string }

const L = (x1: number, y1: number, x2: number, y2: number): Shape => ({ t: 'l', a: [x1, y1, x2, y2] })
const C = (cx: number, cy: number, d: number, f = false): Shape => ({ t: 'c', a: [cx, cy, d], f })
const E = (cx: number, cy: number, w: number, h: number): Shape => ({ t: 'e', a: [cx, cy, w, h] })
const R = (x: number, y: number, w: number, h: number): Shape => ({ t: 'r', a: [x, y, w, h] })
const P = (d: string, f = false): Shape => ({ t: 'p', d, f })
const G = (pts: [number, number][], f = false): Shape => ({ t: 'g', pts, f })
const T = (x: number, y: number, size: number, text: string): Shape => ({ t: 'x', x, y, size, text })

function star(cx: number, cy: number, ro: number, ri: number): [number, number][] {
  const pts: [number, number][] = []
  for (let k = 0; k < 10; k++) {
    const r = k % 2 ? ri : ro
    const a = (-90 + k * 36) * (Math.PI / 180)
    pts.push([+(cx + r * Math.cos(a)).toFixed(1), +(cy + r * Math.sin(a)).toFixed(1)])
  }
  return pts
}
function rays(cx: number, cy: number, r1: number, r2: number, n: number): Shape[] {
  return Array.from({ length: n }, (_, k) => {
    const a = (k / n) * Math.PI * 2
    return L(
      +(cx + r1 * Math.cos(a)).toFixed(1),
      +(cy + r1 * Math.sin(a)).toFixed(1),
      +(cx + r2 * Math.cos(a)).toFixed(1),
      +(cy + r2 * Math.sin(a)).toFixed(1),
    )
  })
}
function dots(p0: [number, number], c: [number, number], p1: [number, number], n: number): Shape[] {
  return Array.from({ length: n }, (_, k) => {
    const t = (k + 0.5) / n
    const m = 1 - t
    return C(
      +(m * m * p0[0] + 2 * m * t * c[0] + t * t * p1[0]).toFixed(1),
      +(m * m * p0[1] + 2 * m * t * c[1] + t * t * p1[1]).toFixed(1),
      2.6,
      true,
    )
  })
}

const envelope = (): Shape[] => [R(4, 8, 40, 28), P('M4 8 L24 24 L44 8')]

export const DOODLES: Record<DoodleId, Shape[]> = {
  // ── eras ────────────────────────────────────────────────────────────────
  'house-star': [
    G(star(32, 10, 8.5, 3.6), true),
    P('M9 38 L32 21 L55 38'),
    P('M15 35 L15 58 L49 58 L49 35'),
    R(27, 44, 10, 14),
  ],
  'paper-plane': [
    P('M6 30 L58 8 L42 54 L30 38 L6 30'),
    P('M30 38 L58 8'),
    ...dots([4, 60], [8, 46], [24, 50], 5),
  ],
  'sun-hill': [C(32, 26, 20), ...rays(32, 26, 15, 22, 8), P('M2 56 Q18 38 32 48 Q46 36 62 56')],
  onsen: [
    P('M18 4 Q10 12 18 18 Q26 24 18 30'),
    P('M32 2 Q24 10 32 16 Q40 22 32 28'),
    P('M46 4 Q38 12 46 18 Q54 24 46 30'),
    E(32, 48, 54, 18),
    P('M12 48 Q32 56 52 48'),
  ],
  'headphones-note': [
    P('M10 36 Q10 8 32 8 Q54 8 54 36'),
    R(6, 34, 10, 18),
    R(48, 34, 10, 18),
    C(29, 44, 8, true),
    L(33, 44, 33, 26),
    P('M33 26 Q42 28 41 36'),
  ],

  // ── chapters ────────────────────────────────────────────────────────────
  'two-circles': [C(24, 32, 30), C(40, 32, 30)],
  'speech-bubble': [
    P('M6 12 Q6 6 12 6 L52 6 Q58 6 58 12 L58 34 Q58 40 52 40 L30 40 L18 54 L20 40 L12 40 Q6 40 6 34 Z'),
    T(32, 28, 13, 'M-M-My'),
  ],
  'pot-flames': [
    P('M16 22 L16 38 Q16 44 22 44 L42 44 Q48 44 48 38 L48 22 Z'),
    L(12, 22, 52, 22),
    P('M16 28 Q8 28 8 34 Q8 38 16 38'),
    P('M48 28 Q56 28 56 34 Q56 38 48 38'),
    P('M22 60 Q18 54 23 50 Q24 54 27 53 Q29 57 22 60'),
    P('M34 61 Q29 55 35 50 Q36 55 40 54 Q42 58 34 61'),
    P('M45 60 Q42 56 45 52 Q47 56 49 56 Q50 59 45 60'),
  ],
  'envelope-x': [...envelope(), L(38, 40, 55, 57), L(55, 40, 38, 57)],
  'envelope-check': [...envelope(), P('M38 48 L46 56 L59 38')],
  'suitcase-tear': [
    R(6, 24, 38, 30),
    P('M18 24 L18 18 Q18 14 22 14 L28 14 Q32 14 32 18 L32 24'),
    L(6, 38, 44, 38),
    R(22, 35, 6, 6),
    P('M54 26 Q47 38 54 45 Q61 38 54 26 Z'),
  ],
  'stick-pair': [
    C(22, 12, 10),
    L(22, 22, 22, 42),
    L(22, 42, 15, 58),
    L(22, 42, 29, 58),
    L(22, 29, 9, 39),
    L(22, 28, 43, 36),
    C(44, 28, 8),
    L(44, 36, 44, 50),
    L(44, 50, 39, 60),
    L(44, 50, 49, 60),
    L(44, 42, 36, 47),
  ],
  candle: [R(25, 28, 14, 26), L(32, 28, 32, 23), P('M32 22 Q26 16 32 7 Q38 16 32 22'), E(32, 56, 34, 8)],
  basketball: [
    C(35, 32, 40),
    L(35, 12, 35, 52),
    L(15, 32, 55, 32),
    P('M21 15 Q31 32 21 49'),
    P('M49 15 Q39 32 49 49'),
    L(2, 22, 9, 22),
    L(0, 32, 8, 32),
    L(2, 42, 9, 42),
  ],
  'masks-crown': [
    P('M6 18 L30 18 L30 36 Q30 48 18 52 Q6 48 6 36 Z'),
    P('M11 27 Q14 24 17 27'),
    P('M20 27 Q23 24 26 27'),
    P('M11 36 Q18 44 25 36'),
    P('M34 29 L58 29 L58 47 Q58 59 46 63 Q34 59 34 47 Z'),
    P('M39 37 Q42 40 45 37'),
    P('M48 37 Q51 40 54 37'),
    P('M39 53 Q46 47 53 53'),
    G([[36, 29], [36, 17], [42, 23], [47, 13], [52, 23], [58, 17], [58, 29]]),
  ],
  'cracked-heart': [
    P('M26 56 Q2 38 8 22 Q15 8 26 22 Q37 8 44 22 Q50 38 26 56'),
    P('M26 22 L21 31 L29 37 L23 47'),
    C(52, 54, 8, true),
    L(56, 54, 56, 38),
    P('M56 38 Q62 40 60 46'),
  ],
  'trash-bag': [
    P('M20 26 Q8 32 10 46 Q12 60 32 60 Q52 60 54 46 Q56 32 44 26 Q38 22 36 14 L28 14 Q26 22 20 26'),
    P('M25 20 Q32 26 39 20'),
    G([[32, 30], [47, 53], [17, 53]]),
    T(32, 49, 15, '!'),
  ],
  'door-window': [
    R(6, 4, 30, 56),
    R(12, 10, 18, 16),
    R(12, 32, 18, 20),
    C(30, 36, 3.5, true),
    R(46, 20, 14, 16),
    P('M46 20 L40 23 L40 33 L46 36'),
    L(51, 14, 49, 10),
    L(56, 14, 58, 10),
  ],
  'phone-signal': [
    R(14, 6, 24, 46),
    L(14, 13, 38, 13),
    L(14, 43, 38, 43),
    C(26, 48, 3),
    P('M44 18 Q51 26 44 34'),
    P('M49 12 Q60 26 49 40'),
  ],
  vinyl: [
    C(32, 32, 56),
    C(32, 32, 42),
    C(32, 32, 28),
    C(32, 32, 14),
    C(32, 32, 3.6, true),
    P('M11 24 Q15 14 25 10'),
  ],
}
