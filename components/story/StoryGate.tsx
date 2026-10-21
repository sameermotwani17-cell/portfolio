'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Tiny, always-loaded gate around the pinned stage. It
 *  - flags the section `data-drawn` when it scrolls into view, which starts
 *    the CSS draw-on of the map (the map is server-rendered, nothing mounts);
 *  - loads the tour (StoryScene) only once the section is within a viewport
 *    of being reached, so the camera, panel and nav code stay out of the
 *    initial bundle.
 * In reduced-motion / no-JS mode (html[data-story] is not "pinned") it does
 * nothing and the static map and cards are shown.
 */
const StoryScene = dynamic(() => import('./StoryScene'), { ssr: false })

export default function StoryGate({ children }: { children: ReactNode }) {
  const pinned = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    if (document.documentElement.getAttribute('data-story') !== 'pinned') return
    const el = pinned.current
    const section = el?.closest<HTMLElement>('.story')
    if (!el || !section) return

    // pinned mode only: the map labels become real, focusable buttons
    section.querySelectorAll<SVGGElement>('.lbl').forEach((l) => {
      l.setAttribute('role', 'button')
      l.setAttribute('tabindex', '0')
      if (l.dataset.label) l.setAttribute('aria-label', l.dataset.label)
    })

    if (!('IntersectionObserver' in window)) {
      setNear(true)
      section.setAttribute('data-drawn', '')
      return
    }

    let doneTimer = 0
    const draw = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        section.setAttribute('data-drawn', '')
        // after the draw-on has played, hover redraws take over from the intro animation
        doneTimer = window.setTimeout(() => section.setAttribute('data-done', ''), 4200)
        draw.disconnect()
      },
      { rootMargin: '0px 0px -30% 0px' },
    )
    const load = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        load.disconnect()
        // the story starts exactly one viewport below the hero, so "near" is true
        // on load: wait for an idle moment so the tour's code never competes
        // with the hero's first paint
        const idle = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
          .requestIdleCallback
        if (idle) idle(() => setNear(true), { timeout: 2500 })
        else window.setTimeout(() => setNear(true), 1200)
      },
      { rootMargin: '100% 0px 100% 0px' },
    )
    draw.observe(section)
    load.observe(el)
    return () => {
      draw.disconnect()
      load.disconnect()
      window.clearTimeout(doneTimer)
    }
  }, [])

  return (
    <div className="story-pinned" ref={pinned}>
      <div className="story-stage" ref={stage}>
        {children}
        {near && <StoryScene pinned={pinned} stage={stage} />}
      </div>
    </div>
  )
}
