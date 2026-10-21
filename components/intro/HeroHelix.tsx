'use client'

import { useEffect, useRef } from 'react'

/**
 * The DNA helix that lives inside the hero frame.
 *
 * A canvas behind the hero's content, so the ribbon shows in the negative
 * space (it runs down the first column of the tile grid, where the portrait
 * is blank). On the hero's first reveal the dots gather out of dust onto the
 * ribbon; after that the helix turns slowly on its own and the dots are
 * pushed away by the cursor and spring back. Hover only, never captures
 * input (pointer-events: none). Runs only while the hero is on screen.
 * Reduced motion: the formed helix is drawn once, static.
 */

type P = {
  sx: number
  sy: number
  t: number
  u: number
  d: number
  a: number
  edge: boolean
  ox: number // displacement from the home position (cursor push)
  oy: number
  vx: number
  vy: number
}

const TURNS = 2.4
const RUNG_PX = 8
const DOT_PX = 5
const FORM_SECONDS = 2.0
const SPIN = 0.22 // rad / s
const PUSH_RADIUS = 130
const PUSH = 1.9
const SPRING = 0.075
const DAMP = 0.84

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

export default function HeroHelix({ tilesId }: { tilesId: string }) {
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
    let cx0 = 0 // ribbon centre x
    let R = 0 // ribbon half width
    let particles: P[] = []
    let frame = 0
    let running = false
    let visible = false
    let formedAt = -1 // performance.now() when formation started
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

      // First column of the tile grid, in hero coordinates.
      const tiles = document.getElementById(tilesId)
      if (tiles) {
        const tr = tiles.getBoundingClientRect()
        const gap = parseFloat(getComputedStyle(tiles).columnGap || '10') || 10
        const col = (tr.width - 2 * gap) / 3
        cx0 = tr.left - rect.left + col / 2
        R = Math.min(col * 0.3, 150)
      } else {
        cx0 = W * 0.38
        R = Math.min(W * 0.1, 150)
      }
    }

    const build = () => {
      const r = mulberry32(11)
      const span = H * 1.2
      const rungs = Math.floor(span / RUNG_PX)
      const perRung = Math.max(8, Math.floor((R * 2) / DOT_PX))
      particles = []
      for (let i = 0; i < rungs; i++) {
        const t = i / rungs
        for (let j = 0; j < perRung; j++) {
          const u = -1 + (2 * (j + 0.5)) / perRung
          const edge = Math.abs(u) > 0.86
          if (!edge && r() < 0.4) continue
          particles.push({
            sx: r(),
            sy: r(),
            t,
            u: u + (r() - 0.5) * 0.04,
            d: t * 0.9 + r() * 0.25,
            a: edge ? 0.9 : 0.5 + r() * 0.3,
            edge,
            ox: 0,
            oy: 0,
            vx: 0,
            vy: 0,
          })
        }
      }
    }

    const draw = (now: number, dt: number) => {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#f2f0ec'

      const T = formedAt < 0 ? 1 : Math.min(1, (now - formedAt) / 1000 / FORM_SECONDS)
      const phase = reduced ? 0.6 : (now / 1000) * SPIN
      const span = H * 1.2
      const yTop = -H * 0.1
      const sway = R * 0.35

      for (const q of particles) {
        const f = reduced ? 1 : easeOutCubic(Math.min(1, Math.max(0, (T * 1.25 - q.d) / 0.5)))
        const theta = q.t * TURNS * Math.PI * 2 + phase
        const cx = cx0 + Math.sin(q.t * Math.PI * 1.4 + phase * 0.5) * sway
        const hx = cx + q.u * R * Math.cos(theta)
        const hy = yTop + q.t * span
        const z = q.u * Math.sin(theta)

        // cursor push + spring back (only once formed)
        if (!reduced && f > 0.98) {
          const px = hx + q.ox
          const py = hy + q.oy
          const dx = px - mx
          const dy = py - my
          const dist = Math.hypot(dx, dy)
          if (dist < PUSH_RADIUS && dist > 0.001) {
            const s = (1 - dist / PUSH_RADIUS) * PUSH * dt * 60
            q.vx += (dx / dist) * s
            q.vy += (dy / dist) * s
          }
          q.vx += -q.ox * SPRING * dt * 60
          q.vy += -q.oy * SPRING * dt * 60
          q.vx *= DAMP
          q.vy *= DAMP
          q.ox += q.vx * dt * 60
          q.oy += q.vy * dt * 60
        }

        const x = q.sx * W + (hx - q.sx * W) * f + q.ox
        const y = q.sy * H + (hy - q.sy * H) * f + q.oy
        const depth = (z + 1) / 2
        const disturbed = Math.min(1, Math.hypot(q.ox, q.oy) / 40)
        ctx.globalAlpha = (0.06 + 0.94 * f) * q.a * (0.3 + 0.7 * depth) * (1 - 0.35 * disturbed)
        const size = (q.edge ? 0.7 + 0.9 * depth : 0.8 + 1.3 * depth) * (0.6 + 0.4 * f)
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
    } else {
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
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [tilesId])

  return <canvas ref={canvasRef} className="hero-helix" aria-hidden="true" />
}
