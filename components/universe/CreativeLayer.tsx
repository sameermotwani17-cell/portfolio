'use client'

import { useEffect, useRef, type RefObject } from 'react'
import { useSharedTicker } from '@/hooks/useSharedTicker'
import type { PointerField } from '@/hooks/usePointerField'
import { createNoise3D, mulberry32 } from '@/lib/universe/noise'
import { thermalRamp } from '@/lib/universe/palette'
import type { StageState } from './types'

/**
 * Generative motion art: curl-noise particle trails in the thermal palette over
 * slowly drifting ink blobs. The pointer is a vortex, a tap is a 60-particle burst.
 * Reduced motion: the blobs stay, the particles don't run.
 */
type Props = {
  field: RefObject<PointerField>
  state: RefObject<StageState>
  enabled: boolean
  reduced: boolean
  mobile: boolean
  /** `right`: only the right of the stage is alive (the split). `full`: whole box. */
  region: 'right' | 'full'
}

const BUCKETS = 10
const BURST = 60

export default function CreativeLayer({ field, state, enabled, reduced, mobile, region }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sim = useRef<{
    n: number
    x: Float32Array; y: Float32Array; px: Float32Array; py: Float32Array
    vx: Float32Array; vy: Float32Array; age: Float32Array; max: Float32Array
    w: number; h: number; dpr: number; off: number; t: number; burstAt: number
    noise: ReturnType<typeof createNoise3D>
    rnd: () => number
    colors: string[]
  } | null>(null)

  const spawn = (s: NonNullable<typeof sim.current>, i: number, at?: { x: number, y: number }) => {
    const x0 = region === 'right' ? s.w * 0.38 : 0
    s.x[i] = at ? at.x : x0 + s.rnd() * (s.w - x0)
    s.y[i] = at ? at.y : s.rnd() * s.h
    s.px[i] = s.x[i]
    s.py[i] = s.y[i]
    s.vx[i] = s.vy[i] = 0
    s.age[i] = 0
    s.max[i] = 160 + s.rnd() * 240
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reduced) return
    const setup = () => {
      // the wrapper is display:contents, so size from the stage (pointer field) or the canvas
      const cropped = region === 'right'
      const w = field.current?.w || canvas.clientWidth / (cropped ? 0.64 : 1)
      const h = canvas.clientHeight
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      // in the split only the right 64% of the stage is alive: don't pay for the rest
      const off = cropped ? w * 0.36 : 0
      canvas.width = Math.round((w - off) * dpr)
      canvas.height = Math.round(h * dpr)
      const n = mobile ? 400 : 900
      const prev = sim.current
      const s = {
        n, w, h, dpr, off,
        x: new Float32Array(n), y: new Float32Array(n), px: new Float32Array(n), py: new Float32Array(n),
        vx: new Float32Array(n), vy: new Float32Array(n), age: new Float32Array(n), max: new Float32Array(n),
        t: prev?.t ?? 0, burstAt: 0,
        noise: prev?.noise ?? createNoise3D(5),
        rnd: prev?.rnd ?? mulberry32(21),
        colors: prev?.colors ?? thermalRamp(BUCKETS),
      }
      sim.current = s
      for (let i = 0; i < n; i++) {
        spawn(s, i)
        s.age[i] = s.rnd() * s.max[i]
      }
    }
    setup()
    const ro = new ResizeObserver(setup)
    ro.observe(canvas)
    return () => ro.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobile, reduced, region])

  useSharedTicker((dt) => {
    const s = sim.current
    const f = field.current
    const st = state.current
    const canvas = canvasRef.current
    if (!s || !f || !st || !canvas) return
    const ctx = canvas.getContext('2d')!
    const k = dt / 16.7
    const speed = region === 'right' ? st.speedR : st.speedL
    s.t += 0.00006 * dt * speed
    const { w, h, dpr, off, x, y, px, py, vx, vy, age, max, noise } = s

    ctx.setTransform(dpr, 0, 0, dpr, -off * dpr, 0)
    ctx.globalCompositeOperation = 'destination-out'
    ctx.fillStyle = 'rgba(0,0,0,0.11)'
    ctx.fillRect(off, 0, w - off, h)

    // bursts from taps
    while (f.taps.length) {
      const tap = f.taps.shift()!
      if (region === 'right' && tap.x < st.seam * w) continue
      for (let b = 0; b < BURST; b++) {
        const i = (s.burstAt = (s.burstAt + 1) % s.n)
        spawn(s, i, tap)
        const a = (b / BURST) * Math.PI * 2 + s.rnd() * 0.3
        const sp = 3 + s.rnd() * 4
        vx[i] = Math.cos(a) * sp
        vy[i] = Math.sin(a) * sp
        age[i] = 0
        max[i] = 120 + s.rnd() * 80
      }
    }

    const e = 0.01
    const R = mobile ? 150 : 220
    const buckets: number[][] = Array.from({ length: BUCKETS }, () => [])
    for (let i = 0; i < s.n; i++) {
      const nx = x[i] * 0.0016
      const ny = y[i] * 0.0016
      const cx = (noise(nx, ny + e, s.t) - noise(nx, ny - e, s.t)) / (2 * e)
      const cy = -(noise(nx + e, ny, s.t) - noise(nx - e, ny, s.t)) / (2 * e)
      let ax = cx * 1.1 * speed
      let ay = cy * 1.1 * speed
      if (f.active) {
        const dx = x[i] - f.x
        const dy = y[i] - f.y
        const d = Math.hypot(dx, dy)
        if (d < R && d > 1) {
          const wgt = 1 - d / R
          ax += (-dy / d) * wgt * 3 - (dx / d) * wgt * 0.5
          ay += (dx / d) * wgt * 3 - (dy / d) * wgt * 0.5
        }
      }
      vx[i] = vx[i] * 0.9 + ax * 0.1 * 2.2
      vy[i] = vy[i] * 0.9 + ay * 0.1 * 2.2
      px[i] = x[i]
      py[i] = y[i]
      x[i] += vx[i] * k
      y[i] += vy[i] * k
      age[i] += k
      const x0 = region === 'right' ? w * 0.36 : -20
      if (age[i] > max[i] || x[i] < x0 || x[i] > w + 20 || y[i] < -20 || y[i] > h + 20) {
        spawn(s, i)
        continue
      }
      buckets[Math.min(BUCKETS - 1, Math.floor((age[i] / max[i]) * BUCKETS))].push(i)
    }

    ctx.globalCompositeOperation = 'lighter'
    ctx.lineWidth = 1.4
    ctx.lineCap = 'round'
    for (let b = 0; b < BUCKETS; b++) {
      const list = buckets[b]
      if (!list.length) continue
      ctx.strokeStyle = s.colors[b]
      ctx.globalAlpha = 0.85
      ctx.beginPath()
      for (let q = 0; q < list.length; q++) {
        const i = list[q]
        ctx.moveTo(px[i], py[i])
        ctx.lineTo(x[i], y[i])
      }
      ctx.stroke()
    }
    ctx.globalAlpha = 1
  }, enabled && !reduced)

  return (
    <div className="uni-creative" aria-hidden="true">
      <span className="uni-blob uni-blob--a" />
      <span className="uni-blob uni-blob--b" />
      <span className="uni-blob uni-blob--c" />
      <canvas ref={canvasRef} className={`uni-flow${region === 'right' ? ' uni-flow--right' : ''}`} />
    </div>
  )
}
