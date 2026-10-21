'use client'

import { useEffect, useRef, type RefObject } from 'react'
import { useSharedTicker } from '@/hooks/useSharedTicker'
import type { PointerField } from '@/hooks/usePointerField'
import { createNoise3D } from '@/lib/universe/noise'
import { TECH, CREATIVE } from '@/lib/universe/palette'
import type { StageState } from './types'

/**
 * Interactive wireframe: a grid of damped springs on top of a drifting simplex
 * field. Idle it breathes; under the pointer it bends; on release it ripples
 * back like jelly; a tap sends a ring through it. One path, stroked twice with a
 * clip either side of the live seam so each universe gets its own colour.
 */
type Props = {
  field: RefObject<PointerField>
  state: RefObject<StageState>
  enabled: boolean
  reduced: boolean
  mobile: boolean
  mode: 'split' | 'tech' | 'creative'
}

const AMP = 18
const STIFF = 0.08
const DAMP = 0.86

const smooth = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t))

export default function WarpGrid({ field, state, enabled, reduced, mobile, mode }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sim = useRef<{
    cols: number; rows: number
    rx: Float32Array; ry: Float32Array; ox: Float32Array; oy: Float32Array; vx: Float32Array; vy: Float32Array
    tL: number; tR: number
    w: number; h: number; dpr: number
    noise: ReturnType<typeof createNoise3D>
  } | null>(null)

  const build = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    const cols = mobile ? 28 : 48
    const rows = mobile ? 40 : 28
    const n = cols * rows
    const rx = new Float32Array(n), ry = new Float32Array(n)
    const bleed = 0.05
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        rx[j * cols + i] = (-bleed + ((1 + 2 * bleed) * i) / (cols - 1)) * w
        ry[j * cols + i] = (-bleed + ((1 + 2 * bleed) * j) / (rows - 1)) * h
      }
    }
    const prev = sim.current
    sim.current = {
      cols, rows, rx, ry,
      ox: new Float32Array(n), oy: new Float32Array(n), vx: new Float32Array(n), vy: new Float32Array(n),
      tL: prev?.tL ?? 3, tR: prev?.tR ?? 3, w, h, dpr,
      noise: prev?.noise ?? createNoise3D(11),
    }
    if (reduced || !enabled) draw(true)
  }

  const draw = (settle = false) => {
    const s = sim.current
    const canvas = canvasRef.current
    if (!s || !canvas) return
    const ctx = canvas.getContext('2d')!
    if (settle) {
      // static, already-warped frame (reduced motion / before first tick)
      for (let k = 0; k < s.rx.length; k++) {
        s.ox[k] = s.noise(s.rx[k] * 0.0022, s.ry[k] * 0.0022, s.tL) * AMP
        s.oy[k] = s.noise(s.rx[k] * 0.0022 + 91, s.ry[k] * 0.0022, s.tL) * AMP
      }
    }
    const { dpr, w, h } = s
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)
    ctx.lineWidth = 1
    if (mode === 'split') {
      // one stroke: a gradient with a hard stop at the live seam colours each side
      const at = Math.min(0.999, Math.max(0.001, state.current?.seam ?? 0.5))
      const g = ctx.createLinearGradient(0, 0, w, 0)
      g.addColorStop(0, TECH.grid)
      g.addColorStop(at, TECH.grid)
      g.addColorStop(at + 0.0005, CREATIVE.grid)
      g.addColorStop(1, CREATIVE.grid)
      ctx.strokeStyle = g
    } else {
      ctx.strokeStyle = mode === 'tech' ? TECH.grid : CREATIVE.grid
    }
    strokeSide(ctx, s)
    // hold the grid back over the silhouette (half strength)
    ctx.globalCompositeOperation = 'destination-out'
    const rg = ctx.createRadialGradient(w * 0.5, h * 0.58, 0, w * 0.5, h * 0.58, Math.max(w, h) * 0.3)
    rg.addColorStop(0, 'rgba(0,0,0,0.5)')
    rg.addColorStop(0.6, 'rgba(0,0,0,0.5)')
    rg.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = rg
    const rr = Math.max(w, h) * 0.3
    ctx.fillRect(w * 0.5 - rr, h * 0.58 - rr, rr * 2, rr * 2)
    ctx.globalCompositeOperation = 'source-over'
  }

  const strokeSide = (ctx: CanvasRenderingContext2D, s: NonNullable<typeof sim.current>) => {
    const { cols, rows, rx, ry, ox, oy } = s
    ctx.beginPath()
    for (let j = 0; j < rows; j++) {
      const o = j * cols
      ctx.moveTo(rx[o] + ox[o], ry[o] + oy[o])
      for (let i = 1; i < cols; i++) ctx.lineTo(rx[o + i] + ox[o + i], ry[o + i] + oy[o + i])
    }
    for (let i = 0; i < cols; i++) {
      ctx.moveTo(rx[i] + ox[i], ry[i] + oy[i])
      for (let j = 1; j < rows; j++) {
        const k = j * cols + i
        ctx.lineTo(rx[k] + ox[k], ry[k] + oy[k])
      }
    }
    ctx.stroke()
  }

  useEffect(() => {
    build()
    const canvas = canvasRef.current
    if (!canvas) return
    const ro = new ResizeObserver(() => build())
    ro.observe(canvas)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobile, reduced])

  useSharedTicker((dt, now) => {
    const s = sim.current
    const f = field.current
    const st = state.current
    if (!s || !f || !st) return
    const k = dt / 16.7
    const seamPx = st.seam * s.w
    s.tL += 0.15 * 0.001 * dt * st.speedL
    s.tR += 0.15 * 0.001 * dt * st.speedR
    const R = mobile ? 120 : 160
    const { cols, rows, rx, ry, ox, oy, vx, vy, noise } = s
    const imp = f.impulses
    for (let a = imp.length - 1; a >= 0; a--) if (now - imp[a].t > 1000) imp.splice(a, 1)

    for (let idx = 0; idx < cols * rows; idx++) {
      const x = rx[idx]
      const left = mode === 'split' ? x < seamPx : mode === 'tech'
      if (left ? st.freezeL : st.freezeR) continue
      const t = left ? s.tL : s.tR
      const tx = noise(x * 0.0022, ry[idx] * 0.0022, t) * AMP
      const ty = noise(x * 0.0022 + 91, ry[idx] * 0.0022, t) * AMP
      let fx = (tx - ox[idx]) * STIFF
      let fy = (ty - oy[idx]) * STIFF

      const px = x + ox[idx]
      const py = ry[idx] + oy[idx]
      if (f.active) {
        const dx = px - f.x
        const dy = py - f.y
        const d = Math.hypot(dx, dy)
        if (d < R && d > 0.001) {
          const w = smooth(1 - d / R)
          fx += (dx / d) * w * 3.4 + f.vx * w * 0.06
          fy += (dy / d) * w * 3.4 + f.vy * w * 0.06
        }
      }
      for (let a = 0; a < imp.length; a++) {
        const age = now - imp[a].t
        const dx = px - imp[a].x
        const dy = py - imp[a].y
        const d = Math.hypot(dx, dy)
        const dist = Math.abs(d - age * 0.6)
        if (dist < 70 && d > 0.001) {
          const w = (1 - dist / 70) * (1 - age / 1000) * 5.5
          fx += (dx / d) * w
          fy += (dy / d) * w
        }
      }
      vx[idx] = (vx[idx] + fx * k) * Math.pow(DAMP, k)
      vy[idx] = (vy[idx] + fy * k) * Math.pow(DAMP, k)
      ox[idx] += vx[idx] * k
      oy[idx] += vy[idx] * k
    }
    draw()
  }, enabled && !reduced)

  return <canvas ref={canvasRef} className="uni-grid" aria-hidden="true" />
}
