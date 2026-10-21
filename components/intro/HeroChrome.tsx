'use client'

import { useEffect, useState } from 'react'
import { initSound, isSoundOn, onSound, setSound } from '@/lib/sound'

/**
 * The hero's corner furniture:
 *  - top-left: local time in Beppu, ticking (a person, right now)
 *  - top-right: opt-in sound toggle, off by default
 *  - bottom-centre: the scroll cue, which is also "press ⏎"
 * And the Enter motif as a site rule: Enter on the hero goes to the work.
 */
function useBeppuTime() {
  const [t, setT] = useState('')
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Tokyo',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    const tick = () => setT(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 15_000)
    return () => window.clearInterval(id)
  }, [])
  return t
}

function goToWork() {
  // the next section on the page: the story
  const el = document.getElementById('story')
  if (!el) return
  if (window.__lenis) window.__lenis.scrollTo(el, { duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

export default function HeroChrome() {
  const time = useBeppuTime()
  const [sound, setSoundState] = useState(false)

  useEffect(() => {
    initSound()
    setSoundState(isSoundOn())
    return onSound(setSoundState)
  }, [])

  // Enter anywhere on the landing (outside the intro and form fields) scrolls on.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter' || e.defaultPrevented) return
      if (document.documentElement.getAttribute('data-intro') === 'play') return
      const tgt = e.target as HTMLElement | null
      if (tgt?.closest('a, button, input, textarea, select, [contenteditable]')) return
      const hero = document.querySelector('.hero-root')
      if (!hero) return
      const r = hero.getBoundingClientRect()
      if (r.bottom < window.innerHeight * 0.5) return
      e.preventDefault()
      goToWork()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <div className="hero-clock" aria-label="Local time in Beppu, Japan">
        <span className="hero-clock__dot" aria-hidden="true" />
        BEPPU, JP · <span suppressHydrationWarning>{time || '--:--'}</span>
      </div>

      <button
        type="button"
        className="hero-sound"
        aria-pressed={sound}
        onClick={() => setSound(!sound)}
      >
        SOUND <span aria-hidden="true">{sound ? '●' : '○'}</span>
      </button>

      <button type="button" className="hero-scroll" onClick={goToWork} aria-label="Scroll to work">
        <span className="hero-scroll__label">
          SCROLL <span className="hero-scroll__or">or press ⏎</span>
        </span>
        <span className="hero-scroll__line" aria-hidden="true" />
      </button>
    </>
  )
}
