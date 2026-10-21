'use client'

import { useEffect, useRef } from 'react'

/**
 * One requestAnimationFrame loop for everything in Section 03 (warp grid, flow
 * field, circuit pulses). Callbacks only run while their `enabled` flag is true,
 * and the loop stops itself when nobody is subscribed.
 */
type Tick = (dt: number, now: number) => void

const subs = new Set<Tick>()
let raf = 0
let last = 0

function loop(now: number) {
  const dt = Math.min(64, now - last)
  last = now
  subs.forEach((fn) => fn(dt, now))
  raf = subs.size ? requestAnimationFrame(loop) : 0
}

export function useSharedTicker(cb: Tick, enabled: boolean) {
  const ref = useRef(cb)
  ref.current = cb

  useEffect(() => {
    if (!enabled) return
    const fn: Tick = (dt, now) => ref.current(dt, now)
    subs.add(fn)
    if (!raf) {
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }
    return () => {
      subs.delete(fn)
    }
  }, [enabled])
}

/**
 * Idle frame-rate cap: gentle ambient motion does not need 60fps, so while
 * nothing is interacting a layer runs every `idleMs` (about 30fps) and halves
 * its cost. Returns the elapsed ms to simulate this frame, or 0 to skip it.
 */
export function createIdleThrottle(idleMs = 32) {
  let acc = 0
  return (dt: number, busy: boolean): number => {
    acc += dt
    if (!busy && acc < idleMs - 2) return 0
    const step = acc
    acc = 0
    return step
  }
}
