'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import Character from './Character'

const line1 = ['I', 'build', 'AI']
const line2 = ['that', 'ships.']

// Update these to your actual birthday
const BIRTHDAY_MONTH = 3  // March
const BIRTHDAY_DAY   = 10 // 10th

export default function Hero() {
  const sectionRef    = useRef<HTMLDivElement>(null)
  const [isBirthday, setIsBirthday]   = useState(false)

  // Birthday detection
  useEffect(() => {
    const now = new Date()
    if (now.getMonth() + 1 === BIRTHDAY_MONTH && now.getDate() === BIRTHDAY_DAY) {
      setIsBirthday(true)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const photoY     = useTransform(scrollYProgress, [0, 1], [0, -80])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.05])
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0])

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}
    >
      {/* ── SCROLL PARALLAX WRAPPER ── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          y: photoY,
          scale: photoScale,
        }}
      >
        {/* ── IDLE CAMERA DRIFT (PS4 title screen) ── */}
        <motion.div
          animate={{
            scale: [1, 1.04, 1.02, 1],
            x: [0, -8, -4, 0],
            y: [0, -4, -8, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.3, 0.7, 1],
          }}
          style={{ position: 'absolute', inset: 0 }}
        >
          {/* Background photo (blurred/dark bg layer) */}
          <img
            src="/photo.png"
            alt=""
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              zIndex: 0,
              filter: 'contrast(1.1) saturate(0.6) brightness(0.35) blur(6px)',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          />

          {/* Layer 1 — Vignette */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.85) 100%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* Layer 2a — Top bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 80,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />

          {/* Layer 2b — Bottom bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 160,
              background: 'linear-gradient(to top, #050505 0%, transparent 100%)',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />

          {/* Layer 3 — Color grade */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(135deg, rgba(59,130,246,0.15) 0%, transparent 50%, rgba(249,115,22,0.2) 100%)',
              mixBlendMode: 'color-dodge',
              pointerEvents: 'none',
              zIndex: 3,
            }}
          />

          {/* Layer 4 — Left dark panel */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 4,
            }}
          />
        </motion.div>
      </motion.div>

      {/* ── FIFA CARD — vertically centered right ── */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '6%',
          transform: 'translateY(-50%)',
          zIndex: 8,
          pointerEvents: 'none',
          cursor: 'default',
        }}
      >
        <Character />
      </div>

      {/* ── CHAPTER INDICATOR — top left ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          position: 'absolute',
          top: 24,
          left: 24,
          zIndex: 10,
          fontFamily: 'monospace',
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          color: 'rgba(255,255,255,0.3)',
          margin: 0,
          pointerEvents: 'none',
        }}
      >
        // PORTFOLIO_2026
      </motion.p>

      {/* ── BOTTOM-LEFT TEXT BLOCK ── */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '12%',
          left: '6%',
          zIndex: 10,
          opacity: textOpacity,
        }}
      >
        {/* Small label */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontFamily: 'monospace',
            fontSize: '0.7rem',
            letterSpacing: '0.4em',
            color: 'rgba(249,115,22,0.9)',
            textTransform: 'uppercase',
            margin: '0 0 0.9rem 0',
          }}
        >
          SAMEER MOTWANI
        </motion.p>

        {/* Big tagline — staggered word reveal */}
        <h1
          aria-label="I build AI that ships."
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 900,
            fontSize: 'clamp(4rem, 9vw, 8rem)',
            color: 'white',
            lineHeight: 0.92,
            margin: '0 0 1.25rem 0',
          }}
        >
          <span style={{ display: 'block' }}>
            {line1.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.4 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ display: 'inline-block', marginRight: '0.22em' }}
              >
                {word}
              </motion.span>
            ))}
          </span>
          <span style={{ display: 'block' }}>
            {line2.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.76 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ display: 'inline-block', marginRight: '0.22em' }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          style={{
            fontFamily: 'monospace',
            fontSize: '0.8rem',
            color: 'rgba(255,255,255,0.55)',
            margin: '0 0 2rem 0',
            letterSpacing: '0.04em',
          }}
        >
          Computer vision · LLMs · Real products
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.5 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
        >
          <motion.a
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }}
            whileHover={{ filter: 'brightness(1.2)' }}
            transition={{ duration: 0.15 }}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#f97316',
              color: 'white',
              fontFamily: 'monospace',
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: 0,
              display: 'inline-block',
            }}
          >
            View Projects
          </motion.a>
          <motion.a
            href="mailto:sameermotwani17@gmail.com"
            whileHover={{ filter: 'brightness(1.2)' }}
            transition={{ duration: 0.15 }}
            style={{
              padding: '0.75rem 1.5rem',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              fontFamily: 'monospace',
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: 0,
              display: 'inline-block',
            }}
          >
            Contact
          </motion.a>
        </motion.div>
      </motion.div>

      {/* ── CORNER RETICLE — bottom right ── */}
      <motion.div
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: 32,
          right: 32,
          width: 24,
          height: 24,
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        {/* Horizontal arm */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            width: '100%',
            height: 1,
            background: 'rgba(249,115,22,0.5)',
            transform: 'translateY(-50%)',
          }}
        />
        {/* Vertical arm */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            height: '100%',
            width: 1,
            background: 'rgba(249,115,22,0.5)',
            transform: 'translateX(-50%)',
          }}
        />
      </motion.div>

      {/* ── SCROLL INDICATOR — bottom center ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <div style={{ width: 1, height: 40, overflow: 'hidden' }}>
          <motion.div
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 1,
              height: 40,
              background: 'rgba(255,255,255,0.4)',
              transformOrigin: 'top center',
            }}
          />
        </div>
        <p
          style={{
            fontFamily: 'monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            margin: 0,
          }}
        >
          SCROLL
        </p>
      </div>
    </section>
  )
}
