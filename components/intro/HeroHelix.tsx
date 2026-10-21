'use client'

import { useEffect, useRef } from 'react'

/**
 * The DNA helix that lives inside the hero frame.
 *
 * A canvas behind the hero's content covering the whole frame. One wide
 * double-helix ribbon runs diagonally from the bottom-left to the top-right
 * and flows upward along that line, turning as it goes; a thin field of
 * dust drifts upward through the rest of the frame, so there is something
 * to disturb wherever the cursor goes. On the hero's first reveal the dots
 * gather out of scatter onto the ribbon; after that every dot is pushed
 * away by the cursor and springs back. Hover only, never captures input
 * (pointer-events: none). Runs only while the hero is on screen.
 * Reduced motion: drawn once, static.
 */

type P = {
  sx: number // scatter position (0..1 of width / height)
  sy: number
  t: number // position along the ribbon, 0 -> 1 (dust: -1)
  u: number // position across the ribbon, -1 .. 1
  d: number // formation delay
  a: number // base alpha
  edge: boolean
  ox: number // displacement from the home position (cursor push)
  oy: number
  vx: number
  vy: number
}

const FORM_SECONDS = 2.2
const FLOW = 0.028 // ribbon lengths per second, upward along the diagonal
const SPIN = 0.25 // rad / s
const DUST_RISE = 14 // px / s
const PUSH_RADIUS = 170
const PUSH = 2.2
const SPRING = 0.07
const DAMP = 0.85

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

export default function HeroHelix() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const hero = canvas?.closest<HTMLElement>('.hero-root')
    if (!canvas || !hero) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let W = 0
    let H = 0
    let R = 0 // ribbon half width
    // diagonal axis A (bottom-left, off frame) -> B (top-right, off frame)
    let ax = 0
    let ay = 0
    let bx = 0
    let by = 0
    let nx = 0 // unit normal to the axis
    let ny = 0
    let turns = 3
    let particles: P[] = []
    let frame = 0
    let running = false
    let visible = false
    let formedAt = -1
    let mx = -1e4
    let my = -1e4
    let last = 0

    const layout = () => {
      const rect = hero.getBoundingClientRect()
      W = Math.max(1, Math.round(rect.width))
      H = Math.max(1, Math.round(rect.height))
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      R = Math.min(Math.min(W, H) * 0.22, 240)
      ax = -W * 0.12
      ay = H * 1.12
      bx = W * 1.12
      by = -H * 0.12
      const dx = bx - ax
      const dy = by - ay
      const len = Math.hypot(dx, dy)
      nx = -dy / len
      ny = dx / len
      turns = Math.max(2.2, len / (Math.min(W, H) * 1.05))
    }

    const build = () => {
      const r = mulberry32(11)
      const small = W < 1024
      const rungPx = small ? 10 : 8
      const dotPx = small ? 7 : 5
      const len = Math.hypot(bx - ax, by - ay)
      const rungs = Math.floor(len / rungPx)
      const perRung = Math.max(8, Math.floor((R * 2) / dotPx))
      particles = []
      // phones: dust only, so the ribbon never crosses the face
      for (let i = 0; i < (W < 768 ? 0 : rungs); i++) {
        const t = i / rungs
        for (let j = 0; j < perRung; j++) {
          const u = -1 + (2 * (j + 0.5)) / perRung
          const edge = Math.abs(u) > 0.88
          if (!edge && r() < 0.45) continue
          particles.push({
            sx: r(),
            sy: r(),
            t,
            u: u + (r() - 0.5) * 0.04,
            d: t * 0.9 + r() * 0.25,
            a: edge ? 0.9 : 0.45 + r() * 0.3,
            edge,
            ox: 0,
            oy: 0,
            vx: 0,
            vy: 0,
          })
        }
      }
      // dust everywhere else, so the whole frame answers the cursor
      const dust = Math.round((W * H) / (W < 768 ? 1400 : small ? 2600 : 1500))
      for (let i = 0; i < dust; i++) {
        particles.push({
          sx: r(),
          sy: r(),
          t: -1,
          u: 0,
          d: r() * 0.4,
          a: 0.18 + r() * 0.3,
          edge: false,
          ox: 0,
          oy: 0,
          vx: 0,
          vy: 0,
        })
      }
    }

    const draw = (now: number, dt: number) => {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#f2f0ec'

      const sec = now / 1000
      const T = formedAt < 0 ? 1 : Math.min(1, (now - formedAt) / 1000 / FORM_SECONDS)
      const phase = reduced ? 0.6 : sec * SPIN
      const flow = reduced ? 0 : sec * FLOW
      const rise = reduced ? 0 : sec * DUST_RISE
      const step = dt * 60
      const axl = bx - ax
      const ayl = by - ay

      for (const q of particles) {
        let hx: number
        let hy: number
        let depth = 0.5
        if (q.t < 0) {
          hx = q.sx * W
          hy = (((q.sy * H - rise) % H) + H) % H
        } else {
          // the ribbon flows up the diagonal: wrap the parameter off-frame
          const t = (q.t + flow) % 1
          const theta = t * turns * Math.PI * 2 + phase
          const off = q.u * R * Math.cos(theta)
          hx = ax + t * axl + nx * off
          hy = ay + t * ayl + ny * off
          depth = (q.u * Math.sin(theta) + 1) / 2
        }
        const f = reduced ? 1 : easeOutCubic(Math.min(1, Math.max(0, (T * 1.25 - q.d) / 0.5)))

        // cursor push + spring back
        if (!reduced) {
          const px = hx + q.ox
          const py = hy + q.oy
          const dx = px - mx
          const dy = py - my
          const dist = Math.hypot(dx, dy)
          if (dist < PUSH_RADIUS && dist > 0.001) {
            const s = (1 - dist / PUSH_RADIUS) * PUSH * step
            q.vx += (dx / dist) * s
            q.vy += (dy / dist) * s
          }
          q.vx += -q.ox * SPRING * step
          q.vy += -q.oy * SPRING * step
          q.vx *= DAMP
          q.vy *= DAMP
          q.ox += q.vx * step
          q.oy += q.vy * step
        }

        const x = q.sx * W + (hx - q.sx * W) * f + q.ox
        const y = q.sy * H + (hy - q.sy * H) * f + q.oy
        const disturbed = Math.min(1, Math.hypot(q.ox, q.oy) / 40)
        ctx.globalAlpha = (0.06 + 0.94 * f) * q.a * (0.3 + 0.7 * depth) * (1 - 0.3 * disturbed)
        const size =
          q.t < 0 ? 0.9 : (q.edge ? 0.7 + 0.9 * depth : 0.8 + 1.3 * depth) * (0.6 + 0.4 * f)
        ctx.fillRect(x, y, size, size)
      }
      ctx.globalAlpha = 1
    }

    const loop = (now: number) => {
      frame = 0
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60
      last = now
      draw(now, dt)
      if (running) frame = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running || reduced) return
      running = true
      last = 0
      if (!frame) frame = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      if (frame) cancelAnimationFrame(frame)
      frame = 0
    }

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      mx = e.clientX - rect.left
      my = e.clientY - rect.top
    }
    const onLeave = () => {
      mx = -1e4
      my = -1e4
    }
    const onResize = () => {
      layout()
      build()
      if (reduced) draw(performance.now(), 0)
    }
    const onVisibility = () => {
      if (document.hidden) stop()
      else if (visible) start()
    }

    layout()
    build()

    if (reduced) {
      draw(performance.now(), 0)
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }

    const io = new IntersectionObserver(
      (entries) => {
        visible = entries.some((e) => e.isIntersecting)
        if (visible) {
          if (formedAt < 0) formedAt = performance.now()
          start()
        } else {
          stop()
        }
      },
      { threshold: 0.05 },
    )
    io.observe(hero)
    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('resize', onResize)
    return () => {
      io.disconnect()
      stop()
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-helix" aria-hidden="true" />
}
