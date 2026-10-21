'use client'

import { useEffect, useRef } from 'react'
import { SHOT, PARTICLE_CAP, IMPACT_STYLE } from '@/lib/creative/intro'
import { headOnStage } from '@/lib/creative/anchors'
import { THERMAL } from '@/lib/universe/palette'

/**
 * Act 1 · The Shot (~2.3s), edited like a film:
 *   freeze → snap zoom with two X-ray frames → a real bullet (photographed
 *   sprite) crosses the frame in slow motion, the camera tracking it in
 *   close-up until it touches the hair → CUT: one white frame, black → wide
 *   shot of the aftermath: the head is knocked back and comes apart into
 *   paint, the room shaking. No blood, no gore.
 *
 * Before the cut the split's stage is zoomed and panned directly. After the
 * cut the canvas draws the whole shot itself (the photo with the head lifted
 * out, plus the particles that were the head), so the colours match exactly.
 */
type Props = { stageEl: HTMLElement; mobile: boolean; onDone: () => void }

export const BULLET_SRC = '/creative/bullet.webp'
// warm the sprite as soon as this chunk loads (on CREATIVE hover)
if (typeof window !== 'undefined') {
  const warm = new Image()
  warm.src = BULLET_SRC
}

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
const PAL = THERMAL.map(hex)
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const inOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const outCubic = (t: number) => 1 - Math.pow(1 - t, 3)

function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647
    return (seed - 1) / 2147483646
  }
}

export default function ShotSequence({ stageEl, mobile, onDone }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
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
    const hx = rect.left + head.x
    const hy = rect.top + head.y
    const unit = Math.min(W, H)
    const rand = rng(97)
    const im = head.image
    const scale = head.cover.scale

    const prev = {
      t: stageEl.style.transform,
      o: stageEl.style.transformOrigin,
      f: stageEl.style.filter,
    }
    stageEl.style.transformOrigin = `${head.x}px ${head.y}px`
    stageEl.style.willChange = 'transform, filter'

    // ── assets ────────────────────────────────────────────────────────────
    const photo = new Image()
    photo.decoding = 'async'
    photo.src = im.src
    let pixels: ImageData | null = null
    let ring = [120, 96, 70] // fallback surround colour
    photo.onload = () => {
      try {
        const off = document.createElement('canvas')
        off.width = im.w
        off.height = im.h
        const o = off.getContext('2d', { willReadFrequently: true })
        if (!o) return
        o.drawImage(photo, 0, 0, im.w, im.h)
        pixels = o.getImageData(0, 0, im.w, im.h)
        // average colour just outside the head: what you'd see through the hole
        const icx = (head.x - head.cover.offX) / scale
        const icy = (head.y - head.cover.offY) / scale
        const ir = head.r / scale
        let r = 0, g = 0, b = 0, n = 0
        for (let a = 0; a < 64; a++) {
          for (const k of [1.18, 1.3, 1.42]) {
            const x = Math.round(icx + Math.cos((a / 64) * Math.PI * 2) * ir * k)
            const y = Math.round(icy + Math.sin((a / 64) * Math.PI * 2) * ir * k * 0.9)
            if (x < 0 || y < 0 || x >= im.w || y >= im.h || y > icy + ir * 0.6) continue
            const i = (y * im.w + x) * 4
            r += pixels.data[i]; g += pixels.data[i + 1]; b += pixels.data[i + 2]; n++
          }
        }
        if (n) ring = [r / n, g / n, b / n]
      } catch {
        pixels = null
      }
    }
    const bullet = new Image()
    bullet.decoding = 'async'
    bullet.src = BULLET_SRC

    // ── camera before the cut ─────────────────────────────────────────────
    // during the bullet the head slides to ~38% of the width so the bullet
    // has room to come in from the right
    const camAt = (t: number) => {
      const e = inOut(clamp01((t - SHOT.ZOOM_END) / 500))
      return { x: (W * (mobile ? 0.42 : 0.38) - hx) * e, y: (H * 0.5 - hy) * e }
    }
    const zoomAt = (t: number) => {
      if (t < SHOT.FREEZE_END) return 1
      if (t < SHOT.ZOOM_END) return 1 + (SHOT.ZOOM_TO - 1) * inOut((t - SHOT.FREEZE_END) / (SHOT.ZOOM_END - SHOT.FREEZE_END))
      const k = clamp01((t - SHOT.ZOOM_END) / (SHOT.CONTACT - SHOT.ZOOM_END))
      return SHOT.ZOOM_TO + (SHOT.CLOSE_ZOOM - SHOT.ZOOM_TO) * k * k
    }

    type Ring = { x: number; y: number; born: number }
    const rings: Ring[] = []
    let lastRing = -1
    const trail: { x: number; y: number }[] = []

    // ── the aftermath ─────────────────────────────────────────────────────
    const AZ = SHOT.AFTER_ZOOM
    const toView = (ix: number, iy: number) => {
      const sx = head.cover.offX + ix * scale
      const sy = head.cover.offY + iy * scale
      return { x: hx + (sx - head.x) * AZ, y: hy + (sy - head.y) * AZ }
    }
    const cap = mobile ? PARTICLE_CAP.mobile : PARTICLE_CAP.desktop
    let n = 0
    let bx = new Float32Array(0)
    let by = bx, px = bx, py = bx, vx = bx, vy = bx, cr = bx, cg = bx, cb = bx, tr = bx, tg = bx, tb = bx, sz = bx, dl = bx
    let built = false
    const impact = { x: 0, y: 0 }

    const build = () => {
      built = true
      const icx = (head.x - head.cover.offX) / scale
      const icy = (head.y - head.cover.offY) / scale
      const ir = head.r / scale
      const byCap = Math.sqrt((Math.PI * ir * ir) / cap)
      const byScreen = 3 / (scale * AZ)
      const b = Math.max(byCap, byScreen, 1)
      const pts: number[] = []
      for (let y = icy - ir; y < icy + ir; y += b) {
        for (let x = icx - ir; x < icx + ir; x += b) {
          const dx = x - icx
          const dy = (y - icy) * 1.08
          if (dx * dx + dy * dy <= ir * ir) pts.push(x, y)
        }
      }
      n = Math.min(cap, pts.length / 2)
      const mk = () => new Float32Array(n)
      bx = mk(); by = mk(); px = mk(); py = mk(); vx = mk(); vy = mk()
      cr = mk(); cg = mk(); cb = mk(); tr = mk(); tg = mk(); tb = mk(); sz = mk(); dl = mk()
      const rView = head.r * AZ
      impact.x = hx + rView * 0.92
      impact.y = hy - rView * 0.08
      const block = Math.max(2, b * scale * AZ + 0.6)
      for (let i = 0; i < n; i++) {
        const ix = pts[i * 2]
        const iy = pts[i * 2 + 1]
        const v = toView(ix, iy)
        bx[i] = v.x; by[i] = v.y; px[i] = v.x; py[i] = v.y
        if (pixels) {
          const xi = Math.max(0, Math.min(im.w - 1, Math.round(ix)))
          const yi = Math.max(0, Math.min(im.h - 1, Math.round(iy)))
          const k = (yi * im.w + xi) * 4
          cr[i] = pixels.data[k]; cg[i] = pixels.data[k + 1]; cb[i] = pixels.data[k + 2]
        } else {
          const c = PAL[i % 4]
          cr[i] = c[0]; cg[i] = c[1]; cb[i] = c[2]
        }
        const c = PAL[(i * 7) % 4]
        tr[i] = c[0]; tg[i] = c[1]; tb[i] = c[2]
        // the head moves as a mass first, then crumbles from the impact side
        const d = Math.hypot(v.x - impact.x, v.y - impact.y) / (rView * 2)
        dl[i] = 30 + d * 170 + rand() * 40
        let ox = v.x - impact.x
        let oy = v.y - impact.y
        const len = Math.hypot(ox, oy) || 1
        ox /= len; oy /= len
        const sp = (2 + rand() * 9) * (unit / 900)
        vx[i] = ox * sp - (3 + rand() * 7) * (unit / 900)
        vy[i] = oy * sp * 0.8 - rand() * 1.5
        sz[i] = block * (0.85 + rand() * 0.4)
      }
    }

    type Splat = { x: number; y: number; r: number; col: number[]; pts: number[]; born: number }
    const splats: Splat[] = []

    const drawBullet = (x: number, y: number, ang: number, len: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(ang + Math.PI) // sprite points left; flight is right → left
      if (bullet.complete && bullet.naturalWidth) {
        const h = len * (bullet.naturalHeight / bullet.naturalWidth)
        ctx.drawImage(bullet, 0, -h / 2, len, h)
      } else {
        ctx.fillStyle = '#b87333'
        ctx.beginPath()
        ctx.ellipse(len * 0.3, 0, len * 0.3, len * 0.07, 0, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }

    let frame = 0
    let finished = false
    let afterAt = -1
    const t0 = performance.now()

    const loop = (now: number) => {
      const t = now - t0
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, W, H)
      const cut = t >= SHOT.CONTACT
      const after = t >= SHOT.CONTACT + SHOT.CUT_WHITE_MS + SHOT.CUT_BLACK_MS

      if (!cut) {
        // ── close-up: zoom, track, X-ray, bullet ───────────────────────────
        const z = zoomAt(t)
        const cam = camAt(t)
        stageEl.style.transform = `translate(${cam.x.toFixed(2)}px, ${cam.y.toFixed(2)}px) scale(${z.toFixed(4)})`
        const xray = SHOT.XRAY.some(([a, b]) => t >= a && t < b)
        stageEl.style.filter = xray ? 'invert(1) contrast(1.4) grayscale(1)' : ''

        const hxs = hx + cam.x
        const hys = hy + cam.y
        const rz = head.r * z

        // time-stop vignette
        const vig = Math.min(1, t / SHOT.FREEZE_END) * 0.62
        const vg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.32, W / 2, H / 2, Math.hypot(W, H) * 0.62)
        vg.addColorStop(0, 'rgba(0,0,0,0)')
        vg.addColorStop(1, `rgba(0,0,0,${vig.toFixed(3)})`)
        ctx.fillStyle = vg
        ctx.fillRect(0, 0, W, H)

        if (xray) {
          ctx.save()
          ctx.strokeStyle = 'rgba(210,255,255,0.9)'
          ctx.shadowColor = '#7cf7ff'
          ctx.shadowBlur = 60
          ctx.lineWidth = 6
          ctx.strokeRect(3, 3, W - 6, H - 6)
          ctx.restore()
        }

        if (t >= SHOT.ZOOM_END) {
          const u = (t - SHOT.ZOOM_END) / (SHOT.CONTACT - SHOT.ZOOM_END)
          // sprite = slug (~53%) + smoke trail; size the slug to ~40% of the head radius
          const len = Math.max(110, (rz * (mobile ? 0.5 : 0.42)) / 0.53)
          // contact point: the right edge of the curls
          const ex = hxs + rz * 0.9
          const ey = hys - rz * 0.06
          const sx = W + len * 1.2
          const sy = ey - unit * 0.06
          const x = sx + (ex - sx) * u
          const y = sy + (ey - sy) * u - Math.sin(u * Math.PI) * unit * 0.02
          const ang = Math.atan2(ey - sy, ex - sx)

          if (lastRing < 0 || t - lastRing >= SHOT.RING_EVERY) {
            lastRing = t
            rings.push({ x, y, born: t })
          }
          // faint pressure rings riding the bullet's axis
          for (const r of rings) {
            const age = t - r.born
            if (age < 0 || age > 650) continue
            const k = age / 650
            ctx.strokeStyle = `rgba(255,255,255,${(0.16 * (1 - k)).toFixed(3)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.ellipse(r.x, r.y, 4 + k * len * 0.25, 6 + k * len * 0.9, ang, 0, Math.PI * 2)
            ctx.stroke()
          }
          // heat haze behind the slug
          trail.push({ x, y })
          if (trail.length > 30) trail.shift()
          ctx.lineWidth = Math.max(2, len * 0.06)
          for (let s = 0; s < 3; s++) {
            ctx.strokeStyle = `rgba(255,240,220,${(0.035 + s * 0.012).toFixed(3)})`
            ctx.beginPath()
            trail.forEach((q, k) => {
              const w = Math.sin(t * 0.025 + k * 0.6 + s * 2) * (2 + s * 1.5)
              if (k === 0) ctx.moveTo(q.x + len * 0.5, q.y + w)
              else ctx.lineTo(q.x + len * 0.5, q.y + w)
            })
            ctx.stroke()
          }
          drawBullet(x, y, ang, len)
        }
        if (labelRef.current) labelRef.current.style.opacity = t >= SHOT.ZOOM_END ? '1' : '0'
      } else if (!after) {
        // ── the cut: one white frame, then black ───────────────────────────
        stageEl.style.filter = ''
        if (labelRef.current) labelRef.current.style.opacity = '0'
        ctx.fillStyle = t < SHOT.CONTACT + SHOT.CUT_WHITE_MS ? '#fff' : '#000'
        ctx.fillRect(0, 0, W, H)
      } else {
        // ── wide shot: the head is knocked back and comes apart ────────────
        if (afterAt < 0) {
          afterAt = now
          stageEl.style.transform = prev.t
          if (!built) build()
          for (let s = 0; s < (mobile ? 2 : 3); s++) {
            const pts: number[] = []
            for (let k = 0; k < 14; k++) pts.push(0.7 + rand() * 0.55)
            splats.push({
              x: hx - head.r * AZ * (0.6 + rand() * 1.4),
              y: hy + head.r * AZ * (rand() - 0.6),
              r: unit * (0.035 + rand() * 0.05),
              col: PAL[(s + 1) % 4],
              pts,
              born: now + 90 + s * 60,
            })
          }
        }
        const at = now - afterAt
        let shakeX = 0
        let shakeY = 0
        if (at < SHOT.SHAKE_MS) {
          const p = at / SHOT.SHAKE_MS
          shakeX = SHOT.SHAKE_PX * Math.sin(p * Math.PI * 2 * SHOT.SHAKE_CYCLES) * (1 - p)
          shakeY = SHOT.SHAKE_PX * 0.5 * Math.cos(p * Math.PI * 2 * SHOT.SHAKE_CYCLES) * (1 - p)
        }
        ctx.translate(shakeX, shakeY)

        // the shot: the photo, warm and slightly tighter
        ctx.fillStyle = '#050302'
        ctx.fillRect(-20, -20, W + 40, H + 40)
        if (photo.complete && photo.naturalWidth) {
          const dw = im.w * scale * AZ
          const dh = im.h * scale * AZ
          const dx = hx + (head.cover.offX - head.x) * AZ
          const dy = hy + (head.cover.offY - head.y) * AZ
          ctx.filter = 'brightness(0.86) saturate(1.08) contrast(1.06)'
          ctx.drawImage(photo, dx, dy, dw, dh)
          ctx.filter = 'none'
        }
        // lift the head out: the window light behind it shows through
        const rView = head.r * AZ
        const open = outCubic(clamp01((at - 40) / 260))
        if (open > 0) {
          const g = ctx.createRadialGradient(hx, hy, 0, hx, hy, rView * 1.18)
          const [r, gg, b] = ring
          const lift = (v: number, k: number) => Math.min(255, Math.round(v * k))
          g.addColorStop(0, `rgba(${lift(r, 1.35)},${lift(gg, 1.3)},${lift(b, 1.2)},${open})`)
          g.addColorStop(0.75, `rgba(${lift(r, 1.05)},${lift(gg, 1.05)},${lift(b, 1.05)},${open})`)
          g.addColorStop(1, `rgba(${r | 0},${gg | 0},${b | 0},0)`)
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(hx, hy, rView * 1.18, 0, Math.PI * 2)
          ctx.fill()
        }

        // paint splats
        for (const s of splats) {
          const k = clamp01((now - s.born) / 220)
          if (k <= 0) continue
          const R = s.r * (1 + 2.2 * Math.pow(k - 1, 3) + 1.2 * Math.pow(k - 1, 2))
          ctx.fillStyle = `rgba(${s.col[0]},${s.col[1]},${s.col[2]},0.72)`
          ctx.beginPath()
          const m = s.pts.length
          for (let q = 0; q <= m; q++) {
            const a = (q / m) * Math.PI * 2
            const rr = R * s.pts[q % m]
            const x = s.x + Math.cos(a) * rr * 1.5 // stretched along the shot direction
            const y = s.y + Math.sin(a) * rr
            if (q === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
          }
          ctx.closePath()
          ctx.fill()
        }

        // the head itself, as particles: knocked back as a mass, then crumbling
        const knock = outCubic(clamp01(at / SHOT.KNOCK_MS))
        const kx = -rView * 0.22 * knock
        const ky = -rView * 0.05 * knock
        const toCentre = t > SHOT.BURST_END ? clamp01((t - SHOT.BURST_END) / SHOT.DISSOLVE_MS) : 0
        const solid = 1 - clamp01((at - 30) / 200)
        if (solid > 0 && photo.complete && photo.naturalWidth) {
          const dw = im.w * scale * AZ
          const dh = im.h * scale * AZ
          const dx = hx + (head.cover.offX - head.x) * AZ
          const dy = hy + (head.cover.offY - head.y) * AZ
          ctx.save()
          ctx.globalAlpha = solid
          ctx.translate(kx, ky)
          // a slight tilt back from the hit, pivoting at the neck
          ctx.translate(hx, hy + rView)
          ctx.rotate(-0.12 * knock)
          ctx.translate(-hx, -(hy + rView))
          ctx.beginPath()
          ctx.ellipse(hx, hy, rView, rView / 1.08, 0, 0, Math.PI * 2)
          ctx.clip()
          ctx.filter = 'brightness(0.86) saturate(1.08) contrast(1.06)'
          ctx.drawImage(photo, dx, dy, dw, dh)
          ctx.filter = 'none'
          ctx.restore()
        }
        for (let i = 0; i < n; i++) {
          let x: number
          let y: number
          if (at < dl[i]) {
            px[i] = bx[i] + kx
            py[i] = by[i] + ky
            continue
          } else {
            if (toCentre > 0) {
              vx[i] += (W / 2 - px[i]) * 0.01 * toCentre
              vy[i] += (H / 2 - py[i]) * 0.01 * toCentre
            }
            vx[i] *= 0.955
            vy[i] = vy[i] * 0.955 + 0.05
            px[i] += vx[i]
            py[i] += vy[i]
            x = px[i]
            y = py[i]
          }
          const rc = clamp01((at - dl[i]) / 520) * 0.8
          const r = cr[i] + (tr[i] - cr[i]) * rc
          const g2 = cg[i] + (tg[i] - cg[i]) * rc
          const b2 = cb[i] + (tb[i] - cb[i]) * rc
          ctx.fillStyle = `rgb(${r | 0},${g2 | 0},${b2 | 0})`
          ctx.fillRect(x, y, sz[i], sz[i])
        }

        // the crack of the hit on the first frames
        if (at < 60) {
          ctx.fillStyle = `rgba(255,250,240,${(0.55 * (1 - at / 60)).toFixed(3)})`
          ctx.fillRect(0, 0, W, H)
        }

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        if (t > SHOT.BURST_END) {
          ctx.fillStyle = `rgba(0,0,0,${clamp01((t - SHOT.BURST_END) / SHOT.DISSOLVE_MS).toFixed(3)})`
          ctx.fillRect(0, 0, W, H)
        }
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
      stageEl.style.transform = prev.t
      stageEl.style.transformOrigin = prev.o
      stageEl.style.filter = prev.f
      stageEl.style.willChange = ''
    }
  }, [stageEl, mobile])

  return (
    <>
      <canvas ref={canvasRef} className="cr-shot" aria-hidden="true" />
      <span ref={labelRef} className="cr-timescale" aria-hidden="true" style={{ opacity: 0 }}>
        0.05x
      </span>
    </>
  )
}
