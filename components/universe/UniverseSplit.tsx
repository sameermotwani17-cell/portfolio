'use client'

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { animate, useMotionValue } from 'framer-motion'
import { useInViewRaf } from '@/hooks/useInViewRaf'
import { usePointerField } from '@/hooks/usePointerField'
import { useSharedTicker } from '@/hooks/useSharedTicker'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { UNIVERSES, universeOnSide, type SideId, type UniverseId } from '@/lib/universe/sides'
import { FROM_KEY, VT_NAME, navigateWithTransition, notifyRouteReady } from '@/lib/universe/transition'
import SplitPortrait from './SplitPortrait'
import SideLabel from './SideLabel'
import { initialStage, type StageState } from './types'

// Heavy layers load only when the section is within a viewport of the screen.
const WarpGrid = dynamic(() => import('./WarpGrid'), { ssr: false })
const CircuitLayer = dynamic(() => import('./CircuitLayer'), { ssr: false })
const CreativeLayer = dynamic(() => import('./CreativeLayer'), { ssr: false })

type Mode = 'idle' | 'hover-left' | 'hover-right' | 'entering-left' | 'entering-right'

const EASE = [0.16, 1, 0.3, 1] as const

/**
 * Section 03: one image of me from behind, split down the middle. Left is the
 * tech universe, right the creative one. Hover leans the seam toward the other
 * side; click sweeps the clicked half over the screen and enters that universe.
 *
 * The two halves are real links (/tech, /creative), so the section works with
 * no JS and is keyboard reachable; JS adds the lean, the sweep and the layers.
 */
export default function UniverseSplit({ id }: { id: string }) {
  const router = useRouter()
  const reduced = usePrefersReducedMotion()
  const rootRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLAnchorElement>(null)
  const rightRef = useRef<HTMLAnchorElement>(null)

  const [near, setNear] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [mode, setMode] = useState<Mode>('idle')
  // reduced-motion only changes markup after mount, so server and client HTML always match
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const modeRef = useRef<Mode>('idle')
  const stage = useRef<StageState>(initialStage())
  const target = useRef({ L: 1, R: 1 })
  const field = usePointerField(stageRef)
  const seam = useMotionValue(0.5)
  const zoom = useMotionValue(1)
  const img = useMotionValue(1)
  const seamAnim = useRef<{ stop: () => void } | null>(null)
  const running = useInViewRaf(rootRef) && near

  const setBoth = (m: Mode) => {
    modeRef.current = m
    setMode(m)
  }

  // load layers one viewport early
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return
        io.disconnect()
        const idle = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
          .requestIdleCallback
        if (idle) idle(() => setNear(true), { timeout: 1500 })
        else window.setTimeout(() => setNear(true), 600)
      },
      { rootMargin: '100% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const on = () => setMobile(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  // motion values → CSS and stage state
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const offSeam = seam.on('change', (v) => {
      stage.current.seam = v
      el.style.setProperty('--seam', `${(v * 100).toFixed(2)}%`)
    })
    const offZoom = zoom.on('change', (v) => el.style.setProperty('--zoom', v.toFixed(4)))
    const offImg = img.on('change', (v) => el.style.setProperty('--img', v.toFixed(3)))
    return () => {
      offSeam()
      offZoom()
      offImg()
    }
  }, [seam, zoom, img])

  // coming back from a universe: the seam sweeps back from the side we left by
  useEffect(() => {
    let from: string | null = null
    try {
      from = sessionStorage.getItem(FROM_KEY)
      if (from) sessionStorage.removeItem(FROM_KEY)
    } catch {}
    if (from === 'tech' || from === 'creative') {
      const side: SideId = UNIVERSES[from as UniverseId].side
      const ground = stageRef.current?.querySelector<HTMLElement>(`.uni-half--${side} .uni-ground`)
      if (ground) ground.style.viewTransitionName = VT_NAME
      seam.set(side === 'left' ? 1 : 0)
      if (!reduced) {
        window.setTimeout(() => {
          if (ground) ground.style.viewTransitionName = ''
          animate(seam, 0.5, { duration: 0.8, ease: EASE })
        }, 450)
      } else {
        seam.set(0.5)
      }
    }
    notifyRouteReady()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ease motion speeds toward their targets
  useSharedTicker(() => {
    const s = stage.current
    s.speedL += (target.current.L - s.speedL) * 0.08
    s.speedR += (target.current.R - s.speedR) * 0.08
  }, running)

  const lean = useCallback(
    (side: SideId | null) => {
      if (modeRef.current.startsWith('entering')) return
      setBoth(side ? (`hover-${side}` as Mode) : 'idle')
      stage.current.lean = side
      target.current = side === 'left' ? { L: 1.5, R: 0.6 } : side === 'right' ? { L: 0.6, R: 1.5 } : { L: 1, R: 1 }
      seamAnim.current?.stop()
      seamAnim.current = animate(seam, side === 'left' ? 0.55 : side === 'right' ? 0.45 : 0.5, {
        duration: 0.5,
        ease: EASE,
      })
    },
    [seam],
  )

  const enter = useCallback(
    (side: SideId) => {
      if (modeRef.current.startsWith('entering')) return
      const u = universeOnSide(side)
      setBoth(`entering-${side}` as Mode)
      try {
        sessionStorage.setItem(FROM_KEY, u.id)
      } catch {}
      const el = stageRef.current

      if (reduced) {
        if (el) animate(el, { opacity: 0 }, { duration: 0.3 })
        window.setTimeout(() => router.push(u.href), 300)
        return
      }

      // 0–150ms: the chosen half surges, the other half's grid freezes
      const s = stage.current
      target.current = side === 'left' ? { L: 3, R: 0.6 } : { L: 0.6, R: 3 }
      if (side === 'left') s.freezeR = true
      else s.freezeL = true
      seamAnim.current?.stop()

      const ground = el?.querySelector<HTMLElement>(`.uni-half--${side} .uni-ground`)
      if (ground) ground.style.viewTransitionName = VT_NAME

      // 150–900ms: seam sweeps to the far edge, image pushes in toward my head
      window.setTimeout(() => {
        seamAnim.current = animate(seam, side === 'left' ? 1 : 0, { duration: 0.75, ease: EASE })
        animate(zoom, 1.12, { duration: 0.95, ease: EASE })
      }, 150)
      // 700–1100ms: the photo fades; the motion layer stays and becomes the page background
      window.setTimeout(() => animate(img, 0, { duration: 0.4, ease: 'easeOut' }), 700)
      window.setTimeout(() => navigateWithTransition(router, u.href), 900)
    },
    [reduced, router, seam, zoom, img],
  )

  const onClick = (side: SideId) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    enter(side)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      leftRef.current?.focus()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      rightRef.current?.focus()
    }
  }

  const live = near
  const hoverProps = (side: SideId) => ({
    onPointerEnter: (e: React.PointerEvent) => e.pointerType === 'mouse' && lean(side),
    onPointerLeave: (e: React.PointerEvent) => e.pointerType === 'mouse' && lean(null),
    onFocus: () => lean(side),
    onBlur: () => lean(null),
  })

  return (
    <section id={id} ref={rootRef} className="uni" aria-label="Choose your universe">
      <div ref={stageRef} className="uni-stage" data-mode={mode} onKeyDown={onKeyDown}>
        <div className="uni-half uni-half--left">
          <div className="uni-ground uni-ground--tech" />
          {live && <CircuitLayer field={field} state={stage} enabled={running} reduced={reduced} />}
          <SplitPortrait variant="tech" />
        </div>
        <div className="uni-half uni-half--right">
          <div className="uni-ground uni-ground--creative" />
          {live && (
            <CreativeLayer field={field} state={stage} enabled={running} reduced={reduced} mobile={mobile} region="right" />
          )}
          <SplitPortrait variant="warm" />
        </div>

        {live && <WarpGrid field={field} state={stage} enabled={running} reduced={reduced} mobile={mobile} mode="split" />}

        <div className="uni-seam" aria-hidden="true">
          <svg width="14" height="100%" preserveAspectRatio="none">
            <defs>
              <filter id="uni-seam-jitter" x="-300%" y="0" width="700%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.004 0.35" numOctaves="2" seed="3" result="n">
                  {mounted && !reduced && (
                    <animate attributeName="baseFrequency" values="0.004 0.35;0.006 0.4;0.004 0.35" dur="7s" repeatCount="indefinite" />
                  )}
                </feTurbulence>
                <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
            <rect x="6.5" y="0" width="1" height="100%" fill="rgba(255,255,255,0.6)" filter="url(#uni-seam-jitter)" />
          </svg>
        </div>

        <p className="uni-eyebrow">CHOOSE A SIDE</p>

        <a
          ref={leftRef}
          href={UNIVERSES.tech.href}
          className="uni-hit uni-hit--left"
          aria-label={UNIVERSES.tech.aria}
          data-cursor="→"
          onClick={onClick('left')}
          {...hoverProps('left')}
        >
          <SideLabel u={UNIVERSES.tech} />
        </a>
        <a
          ref={rightRef}
          href={UNIVERSES.creative.href}
          className="uni-hit uni-hit--right"
          aria-label={UNIVERSES.creative.aria}
          data-cursor="→"
          onClick={onClick('right')}
          {...hoverProps('right')}
        >
          <SideLabel u={UNIVERSES.creative} />
        </a>
      </div>
    </section>
  )
}
