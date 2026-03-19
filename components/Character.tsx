'use client'

import { motion } from 'framer-motion'

const OVERALL = 93
const POSITION_CODE = 'FND'
const POSITION = 'FOUNDER'
const TIER = 'FRESHMAN'
const NAME = 'SAMEER'

const STATS = [
  { label: 'AI',    value: 96 },
  { label: 'SHIP',  value: 91 },
  { label: 'CODE',  value: 88 },
  { label: 'BUILD', value: 92 },
  { label: 'UX',    value: 74 },
  { label: 'EXEC',  value: 87 },
]

export default function Character() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -12 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      style={{ perspective: 1000 }}
    >
      {/* Idle float + subtle tilt */}
      <motion.div
        animate={{ y: [0, -8, 0], rotateY: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: 310,
          height: 465,
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ── CARD BODY ── */}
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 14,
            overflow: 'hidden',
            position: 'relative',
            background:
              'linear-gradient(155deg, #1c1000 0%, #2e1c00 25%, #1a0e00 55%, #0e0800 100%)',
            border: '1.5px solid rgba(249,180,50,0.55)',
            boxShadow:
              '0 24px 80px rgba(0,0,0,0.85), 0 0 40px rgba(249,115,22,0.18), inset 0 0 60px rgba(0,0,0,0.4)',
          }}
        >
          {/* Gold foil sheen sweep */}
          <motion.div
            animate={{ x: ['-120%', '120%'] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'linear', repeatDelay: 2.5 }}
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(105deg, transparent 30%, rgba(255,210,80,0.12) 45%, rgba(255,230,120,0.22) 50%, rgba(255,210,80,0.12) 55%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 30,
            }}
          />

          {/* ── TOP SECTION — rating + photo ── */}
          <div style={{ position: 'relative', height: '58%' }}>
            {/* Overall rating + position (top-left) */}
            <div style={{ position: 'absolute', top: 14, left: 14, zIndex: 10 }}>
              {/* Big overall number */}
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '3.2rem',
                  fontWeight: 900,
                  color: 'rgba(255,210,60,1)',
                  lineHeight: 1,
                  textShadow: '0 0 20px rgba(249,180,50,0.6), 0 2px 6px rgba(0,0,0,0.6)',
                }}
              >
                {OVERALL}
              </div>
              {/* FIFA-style position code */}
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '1.15rem',
                  fontWeight: 900,
                  color: 'rgba(255,210,60,1)',
                  letterSpacing: '0.06em',
                  lineHeight: 1,
                  textShadow: '0 0 12px rgba(249,180,50,0.5)',
                  marginTop: 5,
                }}
              >
                {POSITION_CODE}
              </div>
              {/* Full position label */}
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.85rem',
                  letterSpacing: '0.1em',
                  color: 'rgba(255,200,60,0.9)',
                  textTransform: 'uppercase',
                  marginTop: 3,
                  fontWeight: 700,
                }}
              >
                {POSITION}
              </div>
              {/* Tier badge */}
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  color: 'rgba(249,115,22,1)',
                  textTransform: 'uppercase',
                  marginTop: 7,
                  padding: '3px 8px',
                  border: '1px solid rgba(249,115,22,0.6)',
                  borderRadius: 2,
                  display: 'inline-block',
                  background: 'rgba(249,115,22,0.12)',
                  fontWeight: 700,
                }}
              >
                {TIER}
              </div>
            </div>

            {/* Character photo */}
            <div
              style={{
                position: 'absolute',
                bottom: -10,
                left: '50%',
                transform: 'translateX(-42%)',
                width: '82%',
                height: '125%',
                overflow: 'hidden',
              }}
            >
              <motion.img
                src="/retro-character.png"
                alt="Sameer"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 5%',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  filter: 'contrast(1.12) saturate(1.2) brightness(0.95)',
                }}
              />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '8%',
                background: 'linear-gradient(to bottom, #1c1000 0%, transparent 100%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
                background: 'linear-gradient(to top, #1c1000 0%, transparent 100%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '18%',
                background: 'linear-gradient(to right, #1c1000, transparent)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '12%',
                background: 'linear-gradient(to left, #1c1000, transparent)', pointerEvents: 'none' }} />
            </div>
          </div>

          {/* ── DIVIDER ── */}
          <div
            style={{
              height: 1,
              background:
                'linear-gradient(to right, transparent, rgba(255,200,60,0.55) 30%, rgba(255,200,60,0.55) 70%, transparent)',
              margin: '0 14px',
              position: 'relative',
              zIndex: 5,
            }}
          />

          {/* ── PLAYER NAME ── */}
          <div
            style={{
              textAlign: 'center',
              padding: '8px 0 5px',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              letterSpacing: '0.42em',
              color: 'rgba(255,210,60,1)',
              textTransform: 'uppercase',
              fontWeight: 700,
              textShadow: '0 0 14px rgba(249,180,50,0.55)',
              position: 'relative',
              zIndex: 5,
            }}
          >
            {NAME}
          </div>

          {/* ── STATS GRID ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '5px 8px',
              padding: '2px 18px 16px',
              position: 'relative',
              zIndex: 5,
            }}
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
              >
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '1.25rem',
                    fontWeight: 900,
                    color: 'rgba(255,210,60,1)',
                    lineHeight: 1,
                    textShadow: '0 0 10px rgba(249,180,50,0.5)',
                  }}
                >
                  {s.value}
                </span>
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.56rem',
                    letterSpacing: '0.08em',
                    color: 'rgba(249,115,22,1)',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Inner border glow */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 14,
              border: '1px solid rgba(255,200,60,0.15)',
              pointerEvents: 'none',
              zIndex: 40,
            }}
          />
        </div>

        {/* Card drop shadow glow */}
        <div
          style={{
            position: 'absolute',
            bottom: -20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            height: 24,
            background: 'radial-gradient(ellipse, rgba(249,115,22,0.4) 0%, transparent 70%)',
            filter: 'blur(8px)',
            pointerEvents: 'none',
            zIndex: -1,
          }}
        />
      </motion.div>
    </motion.div>
  )
}
