'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const rings = [
  { maxR: 30, color: '#f97316', delay: 0.0, strokeW: 1.2 },
  { maxR: 65, color: '#3b82f6', delay: 0.2, strokeW: 0.8 },
  { maxR: 100, color: '#f97316', delay: 0.4, strokeW: 0.6 },
  { maxR: 140, color: '#3b82f6', delay: 0.6, strokeW: 0.5 },
  { maxR: 180, color: '#f97316', delay: 0.8, strokeW: 0.4 },
  { maxR: 220, color: '#3b82f6', delay: 1.0, strokeW: 0.3 },
]

const W = 500
const H = 120
const CX = W / 2
const CY = H / 2

export default function ParticlesBurst() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '-80px' })

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ height: H }}
    >
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        className="absolute"
        aria-hidden="true"
      >
        {rings.map((ring, i) => (
          <motion.circle
            key={i}
            cx={CX}
            cy={CY}
            r={ring.maxR}
            fill="none"
            stroke={ring.color}
            strokeWidth={ring.strokeW}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              inView
                ? {
                    scale: [0, 1],
                    opacity: [0, 0.7, 0],
                  }
                : { scale: 0, opacity: 0 }
            }
            transition={{
              duration: 2.4,
              delay: ring.delay,
              ease: 'easeOut',
              repeat: Infinity,
              repeatDelay: 1.5,
            }}
            style={{
              transformOrigin: `${CX}px ${CY}px`,
              filter: `drop-shadow(0 0 5px ${ring.color})`,
            }}
          />
        ))}

        {/* Center dot */}
        <motion.circle
          cx={CX}
          cy={CY}
          r={3}
          fill="#f97316"
          animate={inView ? { opacity: [0.3, 1, 0.3] } : { opacity: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 8px #f97316)' }}
        />
      </svg>
    </div>
  )
}
