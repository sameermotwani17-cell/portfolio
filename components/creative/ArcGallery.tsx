'use client'

import { useEffect, useMemo, useRef, type MutableRefObject } from 'react'
import type { Work } from '@/lib/creative/works'
import type { CategoryId } from '@/lib/creative/categories'
import { LOADER } from '@/lib/creative/intro'

/**
 * The cards, in three shapes, driven by one rAF loop (no React renders per
 * frame):
 *   loading  progress 0 → .55: a deck grows one card at a time
 *            progress .55 → 1: the deck fans into an upright half-ring
 *   reveal   the half-ring unrolls into a curved panoramic wall (camera at
 *            the centre of a cylinder of cards)
 *   live     drag/swipe with inertia, wheel, ←/→; front cards scale up,
 *            the edges dim; previews play on the front 3–5 cards only
 * Desktop: cylinder on the Y axis. Phones: on the X axis (vertical swipe).
 */
export type GalleryPhase = 'loading' | 'reveal' | 'live'

type Props = {
  works: Work[]
  filter: CategoryId | 'all'
  phase: GalleryPhase
  /** loader progress 0..1, read every frame */
  progress: MutableRefObject<number>
  mobile: boolean
  reduced: boolean
  onOpen: (w: Work, rect: DOMRect) => void
  /** horizontal sky drift in px, written every frame */
  skyShift: MutableRefObject<number>
  /** set while a detail sheet is open: keys and drag are ignored */
  paused: boolean
}

type T = { x: number; y: number; z: number; ax: number; ay: number; rz: number; s: number; o: number }

const DEG = Math.PI / 180
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const wrap = (d: number) => ((((d + 180) % 360) + 360) % 360) - 180

export default function ArcGallery({ works, filter, phase, progress, mobile, reduced, onOpen, skyShift, paused }: Props) {
  const stageRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([])
  const phaseRef = useRef(phase)
  const pausedRef = useRef(paused)
  phaseRef.current = phase
  pausedRef.current = paused

  // visible order: matching cards keep their slot order
  const active = useMemo(
    () => works.map((w, i) => (filter === 'all' || w.category === filter ? i : -1)).filter((i) => i >= 0),
    [works, filter],
  )
  const activeRef = useRef(active)
  const relayoutUntil = useRef(0)
  useEffect(() => {
    activeRef.current = active
    relayoutUntil.current = performance.now() + 650
    rot.current.target = 0
    rot.current.snapping = true
  }, [active])

  const rot = useRef({ v: 0, vel: 0, target: 0, snapping: false, dragging: false, moved: 0, lastX: 0, lastT: 0 })
  const revealAt = useRef(0)
  useEffect(() => {
    if (phase === 'reveal') revealAt.current = performance.now()
  }, [phase])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    let raf = 0
    let W = stage.clientWidth
    let H = stage.clientHeight

    const geo = () => {
      W = stage.clientWidth
      H = stage.clientHeight
      const n = Math.max(activeRef.current.length, 1)
      const slotsInRing = Math.max(n, mobile ? 10 : 14)
      const slot = 360 / slotsInRing
      const cw = mobile ? Math.min(W * 0.56, 260, H * 0.34) : Math.max(220, Math.min(W * 0.24, 420))
      const ch = mobile ? cw * 1.25 : cw * 0.625
      const span = mobile ? ch : cw
      const R = (span * 1.16) / (slot * DEG)
      const P = R * 0.78 // perspective: camera sits at the centre of the ring
      return { n, slot, cw, ch, R, P }
    }
    let g = geo()
    stage.style.setProperty('--cw', `${g.cw}px`)
    stage.style.setProperty('--ch', `${g.ch}px`)
    stage.style.perspective = `${g.P}px`

    const onResize = () => {
      g = geo()
      stage.style.setProperty('--cw', `${g.cw}px`)
      stage.style.setProperty('--ch', `${g.ch}px`)
      stage.style.perspective = `${g.P}px`
    }
    window.addEventListener('resize', onResize)

    const stackT = (k: number): T => ({
      x: k * 0.7,
      y: -k * 1.6,
      z: 0,
      ax: 0,
      ay: 0,
      rz: (k % 2 ? 1 : -1) * Math.min(6, k * 0.7),
      s: mobile ? 0.5 : 0.62,
      o: 1,
    })
    const arcT = (k: number, n: number): T => {
      const Ra = Math.min(W * (mobile ? 0.36 : 0.27), H * 0.33)
      const a = Math.PI - (n > 1 ? k / (n - 1) : 0.5) * Math.PI
      return {
        x: Ra * Math.cos(a),
        y: -Ra * Math.sin(a) + Ra * 0.42,
        z: 0,
        ax: 0,
        ay: 0,
        rz: 90 - a / DEG,
        s: mobile ? 0.34 : 0.42,
        o: 1,
      }
    }
    const wallT = (theta: number): T => {
      const t = theta * DEG
      if (mobile) {
        return { x: 0, y: g.R * Math.sin(t), z: g.P - g.R * Math.cos(t), ax: theta, ay: 0, rz: 0, s: 1, o: 1 }
      }
      return { x: g.R * Math.sin(t), y: 0, z: g.P - g.R * Math.cos(t), ax: 0, ay: -theta, rz: 0, s: 1, o: 1 }
    }

    const apply = (el: HTMLElement, t: T, dim: number, hidden: boolean) => {
      el.style.transform = `translate(-50%, -50%) translate3d(${t.x.toFixed(1)}px, ${t.y.toFixed(1)}px, ${t.z.toFixed(1)}px) rotateX(${t.ax.toFixed(2)}deg) rotateY(${t.ay.toFixed(2)}deg) rotateZ(${t.rz.toFixed(2)}deg) scale(${t.s.toFixed(3)})`
      el.style.opacity = hidden ? '0' : t.o.toFixed(3)
      el.style.visibility = hidden ? 'hidden' : 'visible'
      el.style.setProperty('--dim', dim.toFixed(3))
    }

    const loop = (now: number) => {
      const ph = phaseRef.current
      const act = activeRef.current
      const n = act.length
      const r = rot.current
      const p = clamp01(progress.current)

      // ── rotation physics (live only) ────────────────────────────────────
      if (ph === 'live' && !r.dragging) {
        if (Math.abs(r.vel) > 0.02) {
          r.v += r.vel
          r.vel *= 0.93
          if (Math.abs(r.vel) <= 0.02) {
            r.target = Math.round(r.v / g.slot) * g.slot
            r.snapping = true
          }
        } else if (r.snapping) {
          r.v += (r.target - r.v) * (reduced ? 1 : 0.14)
          if (Math.abs(r.target - r.v) < 0.01) {
            r.v = r.target
            r.snapping = false
          }
        }
      }
      skyShift.current = -20 * Math.sin(r.v * DEG * 0.5)

      const relayout = now < relayoutUntil.current
      const revealT = ph === 'reveal' ? ease(clamp01((now - revealAt.current) / LOADER.REVEAL_MS)) : ph === 'live' ? 1 : 0
      const centre = (n - 1) / 2
      const frontSet: number[] = []

      cardRefs.current.forEach((el, i) => {
        if (!el) return
        const k = act.indexOf(i)
        if (k < 0) {
          el.style.opacity = '0'
          el.style.visibility = 'hidden'
          el.style.pointerEvents = 'none'
          return
        }
        el.style.pointerEvents = ph === 'live' ? 'auto' : 'none'
        el.style.transition = relayout ? 'transform 0.6s cubic-bezier(0.16,1,0.3,1), opacity 0.4s' : 'none'
        const theta = wrap((k - centre) * g.slot + r.v)

        if (ph === 'loading') {
          const deckP = clamp01(p / 0.55)
          const shown = Math.ceil(deckP * n)
          if (k >= shown) {
            apply(el, { ...stackT(k), y: 60, o: 0 }, 0, false)
            return
          }
          const fan = ease(clamp01((p - 0.55) / 0.45))
          const a = stackT(k)
          const b = arcT(k, n)
          apply(
            el,
            {
              x: lerp(a.x, b.x, fan),
              y: lerp(a.y, b.y, fan),
              z: 0,
              ax: 0,
              ay: 0,
              rz: lerp(a.rz, b.rz, fan),
              s: lerp(a.s, b.s, fan),
              o: 1,
            },
            0,
            false,
          )
          return
        }

        const w = wallT(theta)
        const far = Math.abs(theta)
        const culled = far > (mobile ? 44 : 62)
        const front = clamp01(1 - far / (g.slot * 1.6))
        w.s = 1 + 0.07 * front
        const dim = clamp01((far - g.slot * 0.6) / 50) * 0.7
        if (far < g.slot * 2.2) frontSet.push(i)

        if (ph === 'reveal' && revealT < 1) {
          const b = arcT(k, n)
          const t = revealT
          apply(
            el,
            {
              x: lerp(b.x, w.x, t),
              y: lerp(b.y, w.y, t),
              z: lerp(0, w.z, t),
              ax: lerp(0, w.ax, t),
              ay: lerp(0, w.ay, t),
              rz: lerp(b.rz, 0, t),
              s: lerp(b.s, w.s, t),
              o: 1,
            },
            dim * t,
            culled && t > 0.6,
          )
          return
        }
        apply(el, w, dim, culled)
      })

      // previews on the front cards only
      cardRefs.current.forEach((el, i) => {
        const v = el?.querySelector('video')
        if (!v) return
        const on = ph === 'live' && frontSet.includes(i)
        if (on && v.paused) {
          v.preload = 'auto'
          void v.play().catch(() => {})
        } else if (!on && !v.paused) v.pause()
      })

      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [mobile, reduced, progress, skyShift])

  // ── input ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const r = rot.current
    const degPerPx = () => {
      const cw = parseFloat(stage.style.getPropertyValue('--cw')) || 300
      const n = Math.max(activeRef.current.length, 1)
      const slot = 360 / Math.max(n, mobile ? 10 : 14)
      return slot / (cw * 1.1)
    }
    const step = (dir: number) => {
      const slot = 360 / Math.max(activeRef.current.length, mobile ? 10 : 14)
      r.vel = 0
      r.target = (Math.round(r.v / slot) + dir) * slot
      r.snapping = true
    }

    const onDown = (e: PointerEvent) => {
      if (phaseRef.current !== 'live' || pausedRef.current) return
      r.dragging = true
      r.moved = 0
      r.vel = 0
      r.snapping = false
      r.lastX = mobile ? e.clientY : e.clientX
      r.lastT = performance.now()
    }
    const onMove = (e: PointerEvent) => {
      if (!r.dragging) return
      const x = mobile ? e.clientY : e.clientX
      const dx = x - r.lastX
      r.lastX = x
      r.moved += Math.abs(dx)
      const d = dx * degPerPx() * (mobile ? -1 : 1)
      r.v += d
      r.vel = d
    }
    const onUp = () => {
      if (!r.dragging) return
      r.dragging = false
      // the click that follows this release still sees the drag distance
      window.setTimeout(() => {
        r.moved = 0
      }, 0)
      if (Math.abs(r.vel) < 0.05) {
        const slot = 360 / Math.max(activeRef.current.length, mobile ? 10 : 14)
        r.target = Math.round(r.v / slot) * slot
        r.snapping = true
      }
    }
    const onWheel = (e: WheelEvent) => {
      if (phaseRef.current !== 'live' || pausedRef.current) return
      e.preventDefault()
      const d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY
      r.snapping = false
      r.vel = -d * 0.012
    }
    const onKey = (e: KeyboardEvent) => {
      if (phaseRef.current !== 'live' || pausedRef.current) return
      const back = mobile ? 'ArrowUp' : 'ArrowLeft'
      const fwd = mobile ? 'ArrowDown' : 'ArrowRight'
      if (e.key === back || e.key === 'ArrowLeft') {
        e.preventDefault()
        step(1)
      } else if (e.key === fwd || e.key === 'ArrowRight') {
        e.preventDefault()
        step(-1)
      }
    }
    stage.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    stage.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKey)
    return () => {
      stage.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      stage.removeEventListener('wheel', onWheel)
      window.removeEventListener('keydown', onKey)
    }
  }, [mobile])

  return (
    <div ref={stageRef} className="cr-arc" data-phase={phase} data-mobile={mobile || undefined}>
      <div
        className="cr-arc__scene"
        onClick={(e) => {
          // 3D hit-testing can land the click on the scene instead of the card
          // under the cursor; find the card by point and open it
          if ((e.target as HTMLElement).closest('.cr-card')) return
          if (rot.current.moved > 6) return
          const card = document
            .elementsFromPoint(e.clientX, e.clientY)
            .find((el) => el instanceof HTMLElement && el.classList.contains('cr-card')) as HTMLElement | undefined
          if (card) card.click()
        }}
      >
        {works.map((w, i) => (
          <button
            key={w.id}
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            type="button"
            className="cr-card"
            data-category={w.category}
            aria-label={`${w.title}, ${w.client}, ${w.year}`}
            onClick={(e) => {
              if (rot.current.moved > 6) return
              onOpen(w, e.currentTarget.querySelector('.cr-card__media')!.getBoundingClientRect())
            }}
          >
            <span className="cr-card__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={w.thumb} alt="" draggable={false} decoding="async" loading={i < 6 ? 'eager' : 'lazy'} />
              {w.preview && <video src={w.preview} poster={w.thumb} muted loop playsInline preload="none" />}
            </span>
            <span className="cr-card__cap">
              <b>{w.title}</b> · {w.client.split(' · ')[0]} · {w.year}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
