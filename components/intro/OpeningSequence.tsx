'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import IntroStage from './IntroStage'
import IntroVideo from './IntroVideo'
import CreateWordmark from './CreateWordmark'
import EnterPulse from './EnterPulse'
import SkipControl from './SkipControl'
import { CUES, CANPLAY_TIMEOUT_MS, CROSSFADE_MS, beatAt, type Beat } from '@/lib/intro/cues'
import { useIntroClock } from '@/hooks/useIntroClock'
import { usePlayOncePerSession } from '@/hooks/usePlayOncePerSession'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { click as keyClick } from '@/lib/sound'

export const REPLAY_EVENT = 'retro:replay-intro'

type Phase = 'idle' | 'playing'

/* Keys that must not skip: Tab (reaching the skip button) and bare modifiers. */
const PASSTHROUGH_KEYS = new Set(['Tab', 'Shift', 'Control', 'Alt', 'Meta', 'CapsLock'])

/**
 * State machine + layers for the opening sequence.
 *
 *   boot script  ->  html[data-intro=play]  ->  playing  ->  hand-over  ->  idle
 *
 * The video clock is the only timeline. Beats are derived from
 * `video.currentTime` every frame; the Enter shortcut *seeks* the video to
 * TRANSITION_START so every overlay jumps with it. Skip, errors, slow
 * networks, blocked autoplay and tab switches all resolve to the same
 * hand-over: tag <html> as done (the hero's entrance starts), fade this
 * layer out over 300ms, unmount.
 */
export default function OpeningSequence() {
  const { shouldPlay, markPlayed, armReplay, markStatic } = usePlayOncePerSession()
  const reduced = usePrefersReducedMotion()

  const [phase, setPhase] = useState<Phase>('idle')
  const [run, setRun] = useState(0)
  const [beat, setBeat] = useState<Beat>('typing')

  const videoRef = useRef<HTMLVideoElement>(null)
  const phaseRef = useRef<Phase>('idle')
  const beatRef = useRef<Beat>('typing')
  const readyRef = useRef(false)

  /* ── hand-over ───────────────────────────────────────────────────────── */
  const finish = useCallback(() => {
    if (phaseRef.current !== 'playing') return
    phaseRef.current = 'idle'
    videoRef.current?.pause()
    markPlayed()
    setPhase('idle')
  }, [markPlayed])

  const seekToTransition = useCallback(() => {
    const video = videoRef.current
    if (!video) return finish()
    if (video.currentTime < CUES.TRANSITION_START) {
      video.currentTime = CUES.TRANSITION_START
    }
  }, [finish])

  /* ── boot: play once per session, never with reduced motion ──────────── */
  useEffect(() => {
    if (reduced) {
      if (shouldPlay()) markStatic()
      return
    }
    if (shouldPlay()) {
      phaseRef.current = 'playing'
      setPhase('playing')
    }
    // Boot decision only; later `reduced` changes are handled by the skip path.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ── replay via the hero's ↻ button ──────────────────────────────────── */
  useEffect(() => {
    const onReplay = () => {
      if (reduced || phaseRef.current === 'playing') return
      armReplay()
      window.scrollTo(0, 0)
      beatRef.current = 'typing'
      readyRef.current = false
      setBeat('typing')
      setRun((r) => r + 1)
      phaseRef.current = 'playing'
      setPhase('playing')
    }
    window.addEventListener(REPLAY_EVENT, onReplay)
    return () => window.removeEventListener(REPLAY_EVENT, onReplay)
  }, [armReplay, reduced])

  /* ── master clock ────────────────────────────────────────────────────── */
  useIntroClock(videoRef, phase === 'playing', (t) => {
    const b = beatAt(t)
    if (b !== beatRef.current) {
      const prev = beatRef.current
      if ((b === 'enter' || b === 'transition') && (prev === 'word' || prev === 'blackout')) keyClick()
      beatRef.current = b
      setBeat(b)
    }
    if (t >= CUES.HERO_IN) finish()
  })

  /* ── while playing: scroll lock, canplay guard, visibility, inputs ───── */
  useEffect(() => {
    if (phase !== 'playing') return

    const html = document.documentElement
    const body = document.body
    const prevOverflow = body.style.overflow
    body.style.overflow = 'hidden'
    window.__lenis?.stop()

    // If the video hasn't reached canplay in time, don't make anyone wait.
    const guard = window.setTimeout(() => {
      if (!readyRef.current) finish()
    }, CANPLAY_TIMEOUT_MS)

    const onVisibility = () => {
      if (document.hidden) videoRef.current?.pause()
      else finish()
    }
    const onKey = (e: KeyboardEvent) => {
      if (PASSTHROUGH_KEYS.has(e.key)) return
      if (e.key === 'Enter') {
        // Enter on the skip button is a click: let it skip.
        if ((e.target as HTMLElement | null)?.closest?.('[data-skip]')) return
        const b = beatRef.current
        if (b === 'word' || b === 'enter') {
          e.preventDefault()
          seekToTransition()
          return
        }
        if (b === 'transition') return
      }
      finish()
    }
    const onWheel = () => finish()
    const onTouchMove = () => finish()

    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('keydown', onKey)
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })

    return () => {
      window.clearTimeout(guard)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchmove', onTouchMove)
      body.style.overflow = prevOverflow
      window.__lenis?.start()
      if (html.getAttribute('data-intro') === 'play') html.setAttribute('data-intro', 'done')
    }
  }, [phase, finish, seekToTransition])

  /* ── video events ────────────────────────────────────────────────────── */
  const onReady = useCallback(() => {
    readyRef.current = true
    const video = videoRef.current
    if (!video) return
    const p = video.play()
    if (p && typeof p.catch === 'function') p.catch(() => finish())
  }, [finish])

  const onVideoEnded = useCallback(() => finish(), [finish])

  return (
    <AnimatePresence>
      {phase === 'playing' && (
        <motion.div
          key={run}
          className="intro-root"
          role="presentation"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: CROSSFADE_MS / 1000, ease: 'linear' }}
          onClick={finish}
        >
          <IntroStage>
            <IntroVideo
              ref={videoRef}
              pushIn={beat === 'transition' || beat === 'hero'}
              onReady={onReady}
              onError={finish}
              onEnded={onVideoEnded}
            />
            <CreateWordmark beat={beat} />
            <EnterPulse beat={beat} />
          </IntroStage>
          {/* The bloom settles into this: the hero's paper colour. */}
          <motion.div
            className="intro-plate"
            aria-hidden="true"
            initial={false}
            animate={{ opacity: beat === 'transition' || beat === 'hero' ? 1 : 0 }}
            transition={{ delay: 0.25, duration: 0.3, ease: 'easeOut' }}
          />
          <SkipControl onSkip={finish} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
