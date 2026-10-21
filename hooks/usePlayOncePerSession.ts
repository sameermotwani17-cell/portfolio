'use client'

import { useCallback } from 'react'

export const INTRO_SESSION_KEY = 'retro:intro:v1'

/** html[data-intro] values. `play` hides the hero until the intro hands over. */
export type IntroFlag = 'play' | 'done' | 'static'

function setFlag(flag: IntroFlag) {
  document.documentElement.setAttribute('data-intro', flag)
}

/**
 * Plays the intro once per browser session. The decision is made by an inline
 * boot script in `app/page.tsx` before first paint (so the hero never flashes
 * under the intro); this hook reads that decision and records completion.
 *
 * sessionStorage is wrapped in try/catch: if it throws (private mode, blocked
 * storage), the intro simply plays.
 */
export function usePlayOncePerSession() {
  const shouldPlay = useCallback((): boolean => {
    if (typeof document === 'undefined') return false
    return document.documentElement.getAttribute('data-intro') === 'play'
  }, [])

  const markPlayed = useCallback(() => {
    try {
      window.sessionStorage.setItem(INTRO_SESSION_KEY, '1')
    } catch {
      /* storage unavailable: play again next time, which is fine */
    }
    setFlag('done')
  }, [])

  /** Arms a replay: clears the session flag and hides the hero again. */
  const armReplay = useCallback(() => {
    try {
      window.sessionStorage.removeItem(INTRO_SESSION_KEY)
    } catch {
      /* ignore */
    }
    setFlag('play')
  }, [])

  const markStatic = useCallback(() => setFlag('static'), [])

  return { shouldPlay, markPlayed, armReplay, markStatic }
}
