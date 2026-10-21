'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import ShotSequence from './ShotSequence'
import RetroWordStorm from './RetroWordStorm'
import { KEYS, setFlag } from '@/lib/creative/intro'

/**
 * Plays Act 1 (the shot) and Act 2 (RETRO) on top of the split after a
 * CREATIVE click, then hands over to /creative, where Act 3 (the arc) runs.
 * Only ever mounted from an explicit click, never on page load.
 *
 * Skip (button, Esc, wheel, swipe) jumps to the end of Act 3's loader: we
 * set the SKIP flag and go straight to /creative.
 */
type Props = {
  stageEl: HTMLElement
  mobile: boolean
  /** called if the entry is aborted before navigating (e.g. stage vanished) */
  onAbort?: () => void
}

type Phase = 'shot' | 'storm' | 'out'

export default function CreativeEntry({ stageEl, mobile }: Props) {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>('shot')
  const [white, setWhite] = useState(false)
  const leaving = useRef(false)

  const leave = useCallback(
    (skipped: boolean) => {
      if (leaving.current) return
      leaving.current = true
      if (skipped) setFlag(KEYS.SKIP)
      setWhite(true)
      setPhase('out')
      router.prefetch('/creative')
      window.setTimeout(() => router.push('/creative'), skipped ? 180 : 0)
    },
    [router],
  )

  useEffect(() => {
    setFlag(KEYS.ACTS_PLAYED)
    router.prefetch('/creative')
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') leave(true)
    }
    const onWheel = () => leave(true)
    const onTouch = () => leave(true)
    window.addEventListener('keydown', onKey)
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.__lenis?.stop()
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchmove', onTouch)
      document.body.style.overflow = prevOverflow
      window.__lenis?.start()
    }
  }, [leave, router])

  return createPortal(
    <div className="cr-entry" data-phase={phase}>
      {phase === 'shot' && <ShotSequence stageEl={stageEl} mobile={mobile} onDone={() => setPhase('storm')} />}
      {phase === 'storm' && <RetroWordStorm mobile={mobile} onDone={() => leave(false)} />}
      <div className="cr-entry__white" data-on={white} aria-hidden="true" />
      <button type="button" className="cr-skip" onClick={() => leave(true)}>
        Skip <span aria-hidden="true">→</span>
      </button>
    </div>,
    document.body,
  )
}
