'use client'

import { useEffect } from 'react'

/**
 * The story map and the universe split are far below the hero, but the browser
 * still styles and lays them out before the first paint. The boot script sets
 * `data-defer` on <html> (CSS then skips their contents); this drops it at the
 * first idle moment after the hero has painted. No JS: the flag is never set and
 * everything renders normally.
 */
export default function DeferReveal() {
  useEffect(() => {
    const root = document.documentElement
    const reveal = () => root.removeAttribute('data-defer')
    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
      .requestIdleCallback
    // two frames first so the hero's own paint is never behind this
    const id = requestAnimationFrame(() => requestAnimationFrame(() => (idle ? idle(reveal, { timeout: 1200 }) : setTimeout(reveal, 300))))
    return () => cancelAnimationFrame(id)
  }, [])
  return null
}
