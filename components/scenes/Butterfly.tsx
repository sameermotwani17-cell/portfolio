'use client'

import { CSSProperties } from 'react'

type ButterflyProps = {
  size: number
  color: string
  accent: string
  flapDur: number
  style?: CSSProperties
  className?: string
}

/**
 * Hand-drawn SVG butterfly — two wing groups flap via the wingFlapL/R
 * keyframes (scaleX toward the body), the whole insect drifts on a slow
 * sine-wave keyframe applied by the parent. No external assets.
 */
export default function Butterfly({ size, color, accent, flapDur, style, className }: ButterflyProps) {
  return (
    <div
      className={className}
      style={{ width: size, height: size * 0.82, pointerEvents: 'none', ...style }}
      aria-hidden
    >
      <svg viewBox="0 0 100 82" width="100%" height="100%" style={{ overflow: 'visible' }}>
        {/* left wings */}
        <g
          style={{
            transformOrigin: '50px 41px',
            animation: `wingFlapL ${flapDur}s ease-in-out infinite`,
          }}
        >
          <path d="M50 38 C 30 6, 6 10, 9 30 C 11 42, 30 46, 48 42 Z" fill={color} opacity={0.92} />
          <path d="M49 45 C 32 48, 16 54, 20 68 C 24 78, 42 70, 50 50 Z" fill={accent} opacity={0.85} />
        </g>
        {/* right wings */}
        <g
          style={{
            transformOrigin: '50px 41px',
            animation: `wingFlapR ${flapDur}s ease-in-out ${flapDur / 2}s infinite`,
          }}
        >
          <path d="M50 38 C 70 6, 94 10, 91 30 C 89 42, 70 46, 52 42 Z" fill={color} opacity={0.92} />
          <path d="M51 45 C 68 48, 84 54, 80 68 C 76 78, 58 70, 50 50 Z" fill={accent} opacity={0.85} />
        </g>
        {/* body */}
        <ellipse cx="50" cy="43" rx="2.4" ry="11" fill="#141414" />
        <circle cx="50" cy="30" r="3" fill="#141414" />
      </svg>
    </div>
  )
}
