'use client'

import { useEffect } from 'react'

/**
 * Tags the hero with `data-seen` the first time a quarter of it is on screen,
 * which starts its entrance animations (see globals.css). The hero now sits
 * below the helix transition, so the entrance must wait for the scroll
 * rather than the intro's hand-over.
 */
export default function HeroReveal() {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>('.hero-root')
    if (!hero) return
    if (!('IntersectionObserver' in window)) {
      hero.setAttribute('data-seen', '')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          hero.setAttribute('data-seen', '')
          io.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    io.observe(hero)
    return () => io.disconnect()
  }, [])
  return null
}
