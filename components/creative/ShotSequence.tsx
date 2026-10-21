'use client'

import { useEffect, useRef } from 'react'
import { SHOT, PARTICLE_CAP, IMPACT_STYLE } from '@/lib/creative/intro'
import { headOnStage } from '@/lib/creative/anchors'
import { THERMAL } from '@/lib/universe/palette'

/**
 * Act 1 · The Shot (~2s). MK-style: time freeze, X-ray flash frames, a slow-
 * motion bullet with shockwave rings, a hard white impact, then my head
 * bursts into paint: particles sampled from the real photo's pixels, pushed
 * out and recoloured toward the thermal palette. No blood, no gore.
 *
 * One canvas over the split, one rAF loop. The split's stage element is
 * zoomed, shaken and X-rayed directly; its motion layers are frozen by the
 * parent before this mounts.
 */
type Props = {
  stageEl: HTMLElement
  mobile: boolean
  onDone: () => void
}

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
const PAL = THERMAL.map(hex)

const easeZoom = (t: number) => {
  // cubic-bezier(0.7, 0, 0.2, 1) approximation: slow start, hard snap
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)

function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

export default function ShotSequence({ stageEl, mobile, onDone }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    if (IMPACT_STYLE !== 'paint') return
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const W = window.innerWidth
    const H = window.innerHeight
    const dpr = Math.min(1.5, window.devicePixelRatio || 1)
    canvas.width = Math.round(W * dpr)
    canvas.height = Math.round(H * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const rect = stageEl.getBoundingClientRect()
    const head = headOnStage(rect.width, rect.height, mobile)
    // head in viewport px; the zoom origin is the head so it stays put
    const hx = rect.left + head.x
    const hy = rect.top + head.y
    const unit = Math.min(W, H)
    const rand = rng(97)

    const prevTransform = stageEl.style.transform
    const prevOrigin = stageEl.style.transformOrigin
    const prevFilter = stageEl.style.filter
    stageEl.style.transformOrigin = `${head.x}px ${head.y}px`
    stageEl.style.willChange = 'transform, filter'

    // ── source pixels for the burst (same-origin image: no taint) ──────────
    let pixels: ImageData | null = null
    const img = new Image()
    img.decoding = 'async'
    img.src = head.image.src
    img.onload = () => {
      try {
        const off = document.createElement('canvas')
        off.width = head.image.w
        off.height = head.image.h
        const octx = off.getContext('2d', { willReadFrequently: true })
        if (!octx) return
        octx.drawImage(img, 0, 0, head.image.w, head.image.h)
        pixels = octx.getImageData(0, 0, head.image.w, head.image.h)
      } catch {
        pixels = null // tainted or failed: fall back to palette particles
      }
    }

    // ── bullet path: right edge → head, on a slight arc ─────────────────────
    const p0 = { x: W + 120, y: hy - H * 0.2 }
    const p1 = { x: W * 0.78, y: hy - H * 0.24 }
    const p2 = { x: hx + head.r * SHOT.ZOOM_TO * 0.55, y: hy - head.r * 0.1 }
    const bez = (u: number) => {
      const a = (1 - u) * (1 - u)
      const b = 2 * (1 - u) * u
      const c = u * u
      return { x: a * p0.x + b * p1.x + c * p2.x, y: a * p0.y + b * p1.y + c * p2.y }
    }
    const bezD = (u: number) => ({
      x: 2 * (1 - u) * (p1.x - p0.x) + 2 * u * (p2.x - p1.x),
      y: 2 * (1 - u) * (p1.y - p0.y) + 2 * u * (p2.y - p1.y),
    })

    type Ring = { x: number; y: number; born: number; jit: number[] }
    const rings: Ring[] = []
    let lastRing = -1
    const trail: { x: number; y: number }[] = []

    // ── particles ──────────────────────────────────────────────────────────
    const cap = mobile ? PARTICLE_CAP.mobile : PARTICLE_CAP.desktop
    let n = 0
    let px = new Float32Array(0)
    let py = px, vx = px, vy = px, sr = px, sg = px, sb = px, tr = px, tg = px, tb = px, sz = px
    let burstAt = -1

    type Splat = { x: number; y: number; r: number; col: number[]; pts: number[]; born: number }
    const splats: Splat[] = []

    const spawnBurst = (now: number) => {
      burstAt = now
      const Z = SHOT.ZOOM_TO
      const scale = head.cover.scale
      const im = head.image
      const icx = (head.x - head.cover.offX) / scale
      const icy = (head.y - head.cover.offY) / scale
      const ir = head.r / scale
      // block size in image px: enough blocks to stay under the cap, ≥ 4 screen px
      const byCap = Math.sqrt((Math.PI * ir * ir) / cap)
      const byScreen = 4 / (scale * Z)
      const b = Math.max(byCap, byScreen, 1)
      const list: number[] = []
      for (let y = icy - ir; y < icy + ir; y += b) {
        for (let x = icx - ir; x < icx + ir; x += b) {
          const dx = x - icx
          const dy = (y - icy) * 1.08 // the curls are a touch taller than wide
          if (dx * dx + dy * dy > ir * ir) continue
          list.push(x, y)
        }
      }
      n = Math.min(cap, list.length / 2)
      px = new Float32Array(n); py = new Float32Array(n); vx = new Float32Array(n); vy = new Float32Array(n)
      sr = new Float32Array(n); sg = new Float32Array(n); sb = new Float32Array(n)
      tr = new Float32Array(n); tg = new Float32Array(n); tb = new Float32Array(n); sz = new Float32Array(n)
      const ix = p2.x - 0 // impact point, viewport
      const iy = p2.y
      const blockScreen = Math.max(2, Math.min(7, b * scale * Z))
      for (let i = 0; i < n; i++) {
        const ixImg = list[i * 2]
        const iyImg = list[i * 2 + 1]
        // image px → stage px → zoomed viewport px
        const sx = head.cover.offX + ixImg * scale
        const sy = head.cover.offY + iyImg * scale
        px[i] = rect.left + head.x + (sx - head.x) * Z
        py[i] = rect.top + head.y + (sy - head.y) * Z
        let r = 0, g = 0, bl = 0
        if (pixels) {
          const xi = Math.max(0, Math.min(im.w - 1, Math.round(ixImg)))
          const yi = Math.max(0, Math.min(im.h - 1, Math.round(iyImg)))
          const k = (yi * im.w + xi) * 4
          r = pixels.data[k]; g = pixels.data[k + 1]; bl = pixels.data[k + 2]
          // lift the dark curls so the paint reads on black
          r = Math.min(255, r * 1.6 + 30); g = Math.min(255, g * 1.4 + 20); bl = Math.min(255, bl * 1.3 + 20)
        } else {
          const c = PAL[i % 4]
          r = c[0]; g = c[1]; bl = c[2]
        }
        sr[i] = r; sg[i] = g; sb[i] = bl
        const c = PAL[(i * 7) % 4]
        tr[i] = c[0]; tg[i] = c[1]; tb[i] = c[2]
        // outward from the impact, mostly away from the bullet (leftward)
        let dx = px[i] - ix
        let dy = py[i] - iy
        const d = Math.hypot(dx, dy) || 1
        dx /= d; dy /= d
        const sp = (3 + rand() * 15) * (unit / 900)
        vx[i] = dx * sp - (2 + rand() * 6) * (unit / 900)
        vy[i] = dy * sp - rand() * 2
        sz[i] = blockScreen * (0.7 + rand() * 0.6)
      }
      // big paint splats
      for (let s = 0; s < (mobile ? 3 : 4); s++) {
        const ang = rand() * Math.PI * 2
        const dist = unit * (0.08 + rand() * 0.38)
        const pts: number[] = []
        for (let k = 0; k < 14; k++) pts.push(0.72 + rand() * 0.5)
        splats.push({
          x: hx + Math.cos(ang) * dist - unit * 0.08,
          y: hy + Math.sin(ang) * dist * 0.7,
          r: unit * (0.1 + rand() * 0.14),
          col: PAL[s % 4],
          pts,
          born: now + s * 40,
        })
      }
    }

    const drawBullet = (x: number, y: number, ang: number) => {
      const k = unit / 900
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(ang)
      // motion streak
      const g = ctx.createLinearGradient(-300 * k, 0, 0, 0)
      g.addColorStop(0, 'rgba(255,220,180,0)')
      g.addColorStop(1, 'rgba(255,230,200,0.55)')
      ctx.fillStyle = g
      ctx.fillRect(-300 * k, -3.5 * k, 300 * k, 7 * k)
      // dark slug
      ctx.fillStyle = '#1d1b1a'
      ctx.beginPath()
      ctx.ellipse(-6 * k, 0, 20 * k, 7 * k, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = 'rgba(255,255,255,0.25)'
      ctx.fillRect(-20 * k, -4 * k, 26 * k, 1.5 * k)
      // brass tip
      const tg2 = ctx.createLinearGradient(8 * k, -7 * k, 8 * k, 7 * k)
      tg2.addColorStop(0, '#f0c36a')
      tg2.addColorStop(1, '#8a5a1c')
      ctx.fillStyle = tg2
      ctx.beginPath()
      ctx.moveTo(6 * k, -7 * k)
      ctx.quadraticCurveTo(30 * k, -4 * k, 34 * k, 0)
      ctx.quadraticCurveTo(30 * k, 4 * k, 6 * k, 7 * k)
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    const drawSplat = (s: Splat, now: number) => {
      const t = clamp01((now - s.born) / 280)
      if (t <= 0) return
      // overshoot ease
      const e = 1 + 2.4 * Math.pow(t - 1, 3) + 1.4 * Math.pow(t - 1, 2)
      const R = s.r * e
      ctx.fillStyle = `rgba(${s.col[0]},${s.col[1]},${s.col[2]},0.82)`
      ctx.beginPath()
      const m = s.pts.length
      for (let k = 0; k <= m; k++) {
        const a = (k / m) * Math.PI * 2
        const rr = R * s.pts[k % m]
        const x = s.x + Math.cos(a) * rr
        const y = s.y + Math.sin(a) * rr
        if (k === 0) ctx.moveTo(x, y)
        else {
          const pa = ((k - 0.5) / m) * Math.PI * 2
          const pr = R * (s.pts[(k - 1) % m] + s.pts[k % m]) * 0.62
          ctx.quadraticCurveTo(s.x + Math.cos(pa) * pr, s.y + Math.sin(pa) * pr, x, y)
        }
      }
      ctx.closePath()
      ctx.fill()
      // a few flung droplets per splat
      for (let k = 0; k < 6; k++) {
        const a = s.pts[k] * 9.1 + k
        const d = R * (1.15 + s.pts[(k + 3) % m] * 0.5) * t
        ctx.beginPath()
        ctx.arc(s.x + Math.cos(a) * d, s.y + Math.sin(a) * d, R * 0.06 * s.pts[k], 0, Math.PI * 2)
        ctx.fill()
      }
    }

    let frame = 0
    let finished = false
    const t0 = performance.now()

    const loop = (now: number) => {
      const t = now - t0
      ctx.clearRect(0, 0, W, H)

      // ── stage camera: zoom, drift, shake, x-ray ───────────────────────────
      let z = 1
      if (t >= SHOT.FREEZE_END) z = 1 + (SHOT.ZOOM_TO - 1) * easeZoom(clamp01((t - SHOT.FREEZE_END) / (SHOT.ZOOM_END - SHOT.FREEZE_END)))
      let camX = 0
      let camY = 0
      const bu = clamp01((t - SHOT.ZOOM_END) / (SHOT.BULLET_END - SHOT.ZOOM_END))
      const bp = bez(bu)
      if (t > SHOT.ZOOM_END && t < SHOT.BULLET_END) {
        camX = -(bp.x - hx) * 0.025
        camY = -(bp.y - hy) * 0.02
      }
      let shakeX = 0
      let shakeY = 0
      if (t >= SHOT.BULLET_END && t < SHOT.IMPACT_END) {
        const p = (t - SHOT.BULLET_END) / (SHOT.IMPACT_END - SHOT.BULLET_END)
        shakeX = SHOT.SHAKE_PX * Math.sin(p * Math.PI * 2 * SHOT.SHAKE_CYCLES) * (1 - p)
        shakeY = SHOT.SHAKE_PX * 0.6 * Math.cos(p * Math.PI * 2 * SHOT.SHAKE_CYCLES) * (1 - p)
      }
      stageEl.style.transform = `translate(${(camX + shakeX).toFixed(2)}px, ${(camY + shakeY).toFixed(2)}px) scale(${z.toFixed(4)})`
      const xray = SHOT.XRAY.some(([a, b]) => t >= a && t < b)
      stageEl.style.filter = xray ? 'invert(1) contrast(1.4) grayscale(1)' : ''

      ctx.save()
      ctx.translate(shakeX, shakeY)

      // time-stop vignette
      const vig = Math.min(1, t / SHOT.FREEZE_END) * (t < SHOT.IMPACT_END ? 0.6 : 0.35)
      const vg = ctx.createRadialGradient(hx, hy, unit * 0.2, W / 2, H / 2, Math.hypot(W, H) * 0.65)
      vg.addColorStop(0, 'rgba(0,0,0,0)')
      vg.addColorStop(1, `rgba(0,0,0,${vig.toFixed(3)})`)
      ctx.fillStyle = vg
      ctx.fillRect(-20, -20, W + 40, H + 40)

      if (xray) {
        ctx.save()
        ctx.strokeStyle = 'rgba(210,255,255,0.9)'
        ctx.shadowColor = '#7cf7ff'
        ctx.shadowBlur = 60
        ctx.lineWidth = 6
        ctx.strokeRect(3, 3, W - 6, H - 6)
        ctx.restore()
      }

      // ── bullet, rings, heat trail ─────────────────────────────────────────
      if (t >= SHOT.ZOOM_END && t < SHOT.BULLET_END) {
        if (lastRing < 0 || t - lastRing >= SHOT.RING_EVERY) {
          lastRing = t
          const jit: number[] = []
          for (let k = 0; k < 36; k++) jit.push(0.9 + rand() * 0.2)
          rings.push({ x: bp.x, y: bp.y, born: t, jit })
        }
        trail.push({ x: bp.x, y: bp.y })
        if (trail.length > 26) trail.shift()
        // heat shimmer: wavy translucent strands behind the slug
        ctx.save()
        ctx.lineWidth = 5
        for (let s = 0; s < 3; s++) {
          ctx.strokeStyle = `rgba(255,236,210,${0.05 + s * 0.02})`
          ctx.beginPath()
          trail.forEach((q, k) => {
            const w = Math.sin(t * 0.03 + k * 0.7 + s * 2) * (3 + s * 2)
            if (k === 0) ctx.moveTo(q.x, q.y + w)
            else ctx.lineTo(q.x, q.y + w)
          })
          ctx.stroke()
        }
        ctx.restore()
        const d = bezD(bu)
        drawBullet(bp.x, bp.y, Math.atan2(d.y, d.x))
      }
      for (const r of rings) {
        const age = t - r.born
        if (age > 700) continue
        const rad = 6 + (age / 700) * unit * 0.13
        ctx.strokeStyle = `rgba(255,255,255,${(0.55 * (1 - age / 700)).toFixed(3)})`
        ctx.lineWidth = 1
        ctx.beginPath()
        for (let k = 0; k <= 36; k++) {
          const a = (k / 36) * Math.PI * 2
          const rr = rad * r.jit[k % 36]
          const x = r.x + Math.cos(a) * rr * 0.55 // squashed: rings ride the bullet's axis
          const y = r.y + Math.sin(a) * rr
          if (k === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // ── impact + burst ───────────────────────────────────────────────────
      if (t >= SHOT.BULLET_END && burstAt < 0) spawnBurst(now)
      if (burstAt >= 0) {
        const bt = now - burstAt
        // a hole of light where my head was
        const holeR = head.r * SHOT.ZOOM_TO * 1.08
        const hole = ctx.createRadialGradient(hx, hy, 0, hx, hy, holeR)
        const ha = t < SHOT.BURST_END ? 0.96 : 0.96 * (1 - clamp01((t - SHOT.BURST_END) / SHOT.DISSOLVE_MS))
        hole.addColorStop(0, `rgba(255,246,232,${ha})`)
        hole.addColorStop(0.7, `rgba(255,214,170,${ha * 0.92})`)
        hole.addColorStop(1, 'rgba(255,190,140,0)')
        ctx.fillStyle = hole
        ctx.beginPath()
        ctx.arc(hx, hy, holeR, 0, Math.PI * 2)
        ctx.fill()

        for (const s of splats) drawSplat(s, now)

        const recol = clamp01(bt / 450)
        const toCentre = t > SHOT.BURST_END ? clamp01((t - SHOT.BURST_END) / SHOT.DISSOLVE_MS) : 0
        ctx.globalCompositeOperation = 'lighter'
        for (let i = 0; i < n; i++) {
          if (toCentre > 0) {
            vx[i] += (W / 2 - px[i]) * 0.012 * toCentre
            vy[i] += (H / 2 - py[i]) * 0.012 * toCentre
          }
          vx[i] *= 0.955
          vy[i] = vy[i] * 0.955 + 0.06
          px[i] += vx[i]
          py[i] += vy[i]
          const r = sr[i] + (tr[i] - sr[i]) * recol
          const g = sg[i] + (tg[i] - sg[i]) * recol
          const b = sb[i] + (tb[i] - sb[i]) * recol
          ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`
          ctx.fillRect(px[i], py[i], sz[i], sz[i])
        }
        ctx.globalCompositeOperation = 'source-over'
      }

      ctx.restore()

      // hard white flash
      if (t >= SHOT.BULLET_END && t < SHOT.BULLET_END + SHOT.FLASH_MS) {
        ctx.fillStyle = `rgba(255,255,255,${(1 - (t - SHOT.BULLET_END) / SHOT.FLASH_MS).toFixed(3)})`
        ctx.fillRect(0, 0, W, H)
      }
      // crossfade to black into Act 2
      if (t > SHOT.BURST_END) {
        ctx.fillStyle = `rgba(0,0,0,${clamp01((t - SHOT.BURST_END) / SHOT.DISSOLVE_MS).toFixed(3)})`
        ctx.fillRect(0, 0, W, H)
      }

      if (t >= SHOT.BURST_END + SHOT.DISSOLVE_MS) {
        if (!finished) {
          finished = true
          doneRef.current()
        }
        return
      }
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(frame)
      stageEl.style.transform = prevTransform
      stageEl.style.transformOrigin = prevOrigin
      stageEl.style.filter = prevFilter
      stageEl.style.willChange = ''
    }
  }, [stageEl, mobile])

  return (
    <>
      <canvas ref={canvasRef} className="cr-shot" aria-hidden="true" />
      <span className="cr-timescale" aria-hidden="true">
        0.05x
      </span>
    </>
  )
}
