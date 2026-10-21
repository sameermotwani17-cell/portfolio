'use client'

import { useEffect, useRef, type RefObject } from 'react'

/**
 * Pointer state for the split stage, in stage-local pixels. Mouse and touch both
 * feed it. Plain mutable object read by the shared ticker: no React renders.
 */
export type Impulse = { x: number, y: number, t: number }
export type PointerField = {
  x: number
  y: number
  vx: number
  vy: number
  /** Pointer is over the stage (mouse) or a finger is down (touch). */
  active: boolean
  down: boolean
  w: number
  h: number
  impulses: Impulse[]
  /** Taps/clicks waiting to be consumed (particle bursts). */
  taps: { x: number, y: number }[]
}

export function usePointerField(ref: RefObject<HTMLElement>): RefObject<PointerField> {
  const field = useRef<PointerField>({
    x: -9999, y: -9999, vx: 0, vy: 0, active: false, down: false, w: 1, h: 1, impulses: [], taps: [],
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const f = field.current
    let rect = el.getBoundingClientRect()
    const measure = () => {
      rect = el.getBoundingClientRect()
      f.w = rect.width
      f.h = rect.height
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('scroll', measure, { passive: true })

    const set = (e: PointerEvent) => {
      const nx = e.clientX - rect.left
      const ny = e.clientY - rect.top
      if (f.x > -9000) {
        f.vx = nx - f.x
        f.vy = ny - f.y
      }
      f.x = nx
      f.y = ny
    }
    const onMove = (e: PointerEvent) => {
      set(e)
      f.active = e.pointerType === 'mouse' || f.down
    }
    const onDown = (e: PointerEvent) => {
      measure()
      f.x = -9999
      set(e)
      f.down = true
      f.active = true
      f.impulses.push({ x: f.x, y: f.y, t: performance.now() })
      f.taps.push({ x: f.x, y: f.y })
    }
    const onUp = (e: PointerEvent) => {
      f.down = false
      if (e.pointerType !== 'mouse') f.active = false
    }
    const onLeave = () => {
      f.active = false
      f.down = false
      f.vx = f.vy = 0
    }
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointerup', onUp)
    el.addEventListener('pointercancel', onLeave)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', measure)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointerup', onUp)
      el.removeEventListener('pointercancel', onLeave)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [ref])

  return field
}
