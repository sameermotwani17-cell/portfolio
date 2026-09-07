'use client'

import { motion } from 'framer-motion'

/**
 * The side A ↔ side B interchange, drawn as a lemniscate.
 *
 * The scroll-cinematic technique is a progress-driven frame scrub: one
 * continuous motion, no cuts, so it reads the same played forward or backward.
 * That principle is what this borrows. The frames themselves are drawn rather
 * than rendered — an infinity symbol is pure geometry, so an SVG path stays
 * crisp at any size, weighs a couple of KB against ~15MB of JPEG sequence, and
 * keeps the site inside the image budget the rest of the build is tuned to.
 *
 * The two lobes carry the two track accents. A light traces the loop, crossing
 * the centre exactly once — the moment the tracks trade places.
 */
export default function InfinityWipe({
  active,
  from,
  to,
  reduced,
}: {
  /** bumped on every switch; restarts the trace */
  active: number
  from: string
  to: string
  reduced: boolean | null
}) {
  // a lemniscate: two mirrored lobes meeting at a single crossing in the middle
  const PATH =
    'M 100 40 C 118 16 152 16 168 40 C 152 64 118 64 100 40 C 82 16 48 16 32 40 C 48 64 82 64 100 40 Z'

  if (reduced) {
    // no motion: hold a static mark so the affordance still reads
    return (
      <svg viewBox="24 10 152 60" className="w-40 h-auto" aria-hidden>
        <path d={PATH} fill="none" stroke={to} strokeWidth="2" opacity="0.5" />
      </svg>
    )
  }

  return (
    <svg viewBox="24 10 152 60" className="w-40 h-auto overflow-visible" aria-hidden>
      <defs>
        <linearGradient id="infinity-lobes" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={from} />
          <stop offset="50%" stopColor={from} />
          <stop offset="50%" stopColor={to} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>

      {/* the loop itself, always present, quiet */}
      <path d={PATH} fill="none" stroke="url(#infinity-lobes)" strokeWidth="1.5" opacity="0.28" />

      {/* the light that runs the loop on every switch */}
      <motion.path
        key={active}
        d={PATH}
        fill="none"
        stroke="url(#infinity-lobes)"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ filter: `drop-shadow(0 0 6px ${to}90)` }}
        initial={{ pathLength: 0, pathOffset: 0, opacity: 0 }}
        animate={{ pathLength: [0, 0.45, 0], pathOffset: [0, 0.55, 1], opacity: [0, 1, 0] }}
        transition={{ duration: 1.15, ease: [0.5, 0, 0.1, 1], times: [0, 0.5, 1] }}
      />
    </svg>
  )
}
