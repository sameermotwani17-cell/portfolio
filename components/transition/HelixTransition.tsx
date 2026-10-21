'use client'

import { useEffect, useRef } from 'react'

/**
 * Section 01 -> 02 transition: a double helix of light forms out of dust as
 * you scroll. Pure canvas, monochrome, scroll-driven only (no autonomous
 * animation): every particle starts scattered across the frame and settles
 * onto a twisted ribbon, top to bottom, while the ribbon keeps turning with
 * the scroll. With reduced motion the formed helix is drawn once, static.
 *
 * The section is tall (see .helix-section); the stage inside is sticky, so
 * the helix holds the viewport while the scroll drives its progress 0 -> 1.
 */

type P = {
  sx: number // scatter position (0..1 of width / height)
  sy: number
  t: number // position along the ribbon, 0 top -> 1 bottom
  u: number // position across the ribbon, -1 .. 1
  d: number // per-particle delay so the helix forms top-down
  a: number // base alpha
}

const TURNS = 2.6 // full twists visible in one viewport height
const RUNG_PX = 8 // vertical spacing of the dotted rungs
const DOT_PX = 5 // spacing of dots along a rung
const STARS = 140

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3)
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function HelixTransition() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rand = mulberry32(7)

    let W = 0
    let H = 0
    let dpr = 1
    let particles: P[] = []
    let stars: { x: number; y: number; a: number; r: number }[] = []
    let lastP = -1
    let frame = 0

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      W = Math.max(1, Math.round(rect.width))
      H = Math.max(1, Math.round(rect.height))
      dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Ribbon geometry in CSS px. The ribbon runs from above the top edge
      // to below the bottom edge so the helix never has a visible end.
      const ribbonW = Math.min(W * 0.34, 320)
      const span = H * 1.3
      const rungs = Math.floor(span / RUNG_PX)
      const perRung = Math.max(8, Math.floor(ribbonW / DOT_PX))

      const r = mulberry32(11)
      particles = []
      for (let i = 0; i < rungs; i++) {
        const t = i / rungs
        for (let j = 0; j < perRung; j++) {
          const u = -1 + (2 * (j + 0.5)) / perRung
          // the strands (edges) are denser than the rungs
          const edge = Math.abs(u) > 0.86
          if (!edge && r() < 0.38) continue
          particles.push({
            sx: r(),
            sy: r(),
            t,
            u: u + (r() - 0.5) * 0.04,
            d: t * 0.55 + r() * 0.18,
            a: edge ? 0.95 : 0.55 + r() * 0.3,
          })
        }
      }

      const s = mulberry32(3)
      stars = []
      for (let i = 0; i < STARS; i++) {
        stars.push({ x: s() * W, y: s() * H, a: 0.15 + s() * 0.45, r: s() < 0.85 ? 0.6 : 1.1 })
      }
      lastP = -1
    }

    const draw = (p: number) => {
      ctx.fillStyle = '#050302'
      ctx.fillRect(0, 0, W, H)

      ctx.fillStyle = '#f2f0ec'
      for (const st of stars) {
        ctx.globalAlpha = st.a
        ctx.fillRect(st.x, st.y, st.r, st.r)
      }

      const ribbonW = Math.min(W * 0.34, 320)
      const R = ribbonW / 2
      const span = H * 1.3
      const yTop = -H * 0.15
      const phase = p * Math.PI * 2 * 1.1 // keeps turning with the scroll
      const sway = Math.min(W * 0.09, 90)

      for (const q of particles) {
        // formation progress for this particle
        const f = easeOutCubic(Math.min(1, Math.max(0, (p - q.d) / 0.45)))
        const theta = q.t * TURNS * Math.PI * 2 + phase
        const cx = W / 2 + Math.sin(q.t * Math.PI * 1.6 + p * 1.2) * sway
        const tx = cx + q.u * R * Math.cos(theta)
        const ty = yTop + q.t * span
        const z = q.u * Math.sin(theta) // -1 (back) .. 1 (front)

        const x = q.sx * W + (tx - q.sx * W) * f
        const y = q.sy * H + (ty - q.sy * H) * f

        const depth = (z + 1) / 2
        const alpha = (0.08 + 0.92 * f) * q.a * (0.3 + 0.7 * depth)
        const size = (q.a > 0.9 ? 0.7 + 0.9 * depth : 0.8 + 1.4 * depth) * (0.6 + 0.4 * f)
        ctx.globalAlpha = alpha
        ctx.fillRect(x, y, size, size)
      }
      ctx.globalAlpha = 1
    }

    const progress = () => {
      const rect = section.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      if (total <= 0) return 1
      return Math.min(1, Math.max(0, -rect.top / total))
    }

    const render = () => {
      frame = 0
      const p = reduced ? 1 : progress()
      if (p === lastP) return
      lastP = p
      draw(p)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render)
    }
    const onResize = () => {
      build()
      schedule()
    }

    build()
    render()
    if (!reduced) window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <section ref={sectionRef} className="helix-section" aria-hidden="true">
      <div className="helix-stage">
        <canvas ref={canvasRef} className="helix-canvas" />
      </div>
    </section>
  )
}
