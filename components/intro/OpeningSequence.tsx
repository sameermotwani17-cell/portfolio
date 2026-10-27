'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import IntroStage from './IntroStage'
import IntroVideo from './IntroVideo'
import CreateWordmark from './CreateWordmark'
import EnterPulse from './EnterPulse'
import SkipControl from './SkipControl'
import SoundToggle from './SoundToggle'
import { CUES, CANPLAY_TIMEOUT_MS, CROSSFADE_MS, beatAt, type Beat } from '@/lib/intro/cues'
import { useIntroClock } from '@/hooks/useIntroClock'
import { usePlayOncePerSession } from '@/hooks/usePlayOncePerSession'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { click as keyClick, initSound, swoosh, typeKey, unlockSound } from '@/lib/sound'

export const REPLAY_EVENT = 'retro:replay-intro'

type Phase = 'idle' | 'playing'

/** The intro hands over by itself this long after it starts. Any key, tap or scroll skips sooner. */
const AUTO_ADVANCE_MS = 2000

/* Keys that must not skip: Tab (reaching the skip button) and bare modifiers. */
const PASSTHROUGH_KEYS = new Set(['Tab', 'Shift', 'Control', 'Alt', 'Meta', 'CapsLock'])

/**
 * State machine + layers for the opening sequence.
 *
 *   boot script  ->  html[data-intro=play]  ->  playing (muted)  ->  hand-over  ->  idle
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
  // how many letters of CREATE have printed (and sounded) so far
  const typedRef = useRef(0)
  const readyRef = useRef(false)
  // the gesture that starts the intro must not also skip it
  const startedAtRef = useRef(0)

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

  const startPlaying = useCallback((gesture = false) => {
    if (phaseRef.current === 'playing') return
    // only a gesture that started the intro needs protecting from also skipping it
    startedAtRef.current = gesture ? performance.now() : 0
    phaseRef.current = 'playing'
    setPhase('playing')
  }, [])

  /* ── boot: play once per session, never with reduced motion ──────────── */
  useEffect(() => {
    if (reduced) {
      if (shouldPlay()) markStatic()
      return
    }
    if (shouldPlay()) {
      // starts straight away and muted; the visitor can turn sound on from the intro
      initSound()
      startPlaying()
    }
    // Boot decision only; later `reduced` changes are handled by the skip path.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ── replay via the hero's ↻ button ──────────────────────────────────── */
  useEffect(() => {
    const onReplay = () => {
      if (reduced || phaseRef.current === 'playing') return
      unlockSound()
      armReplay()
      window.scrollTo(0, 0)
      beatRef.current = 'typing'
      typedRef.current = 0
      readyRef.current = false
      setBeat('typing')
      setRun((r) => r + 1)
      startedAtRef.current = performance.now()
      phaseRef.current = 'playing'
      setPhase('playing')
    }
    window.addEventListener(REPLAY_EVENT, onReplay)
    return () => window.removeEventListener(REPLAY_EVENT, onReplay)
  }, [armReplay, reduced])

  /* ── master clock ────────────────────────────────────────────────────── */
  useIntroClock(videoRef, phase === 'playing', (t) => {
    // a keystroke for each letter as it prints in (same 110ms stagger as the CSS)
    if (t >= CUES.ENTER_PRESS) typedRef.current = 6
    else if (t >= CUES.WORD_START) {
      const typed = Math.min(6, Math.floor((t - CUES.WORD_START) / 0.11) + 1)
      if (typed > typedRef.current) {
        typeKey(typed - 1)
        typedRef.current = typed
      }
    }
    const b = beatAt(t)
    if (b !== beatRef.current) {
      const prev = beatRef.current
      if ((b === 'enter' || b === 'transition') && (prev === 'word' || prev === 'blackout')) keyClick()
      // the frame opens out into the hero: the whoosh follows the click
      if (b === 'transition' && prev !== 'transition') swoosh()
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

    // Nobody waits more than ~2s: jump to the hand-over beat on a timer.
    const auto = window.setTimeout(() => seekToTransition(), AUTO_ADVANCE_MS)

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
      // the sound toggle is a button: Enter and Space on it must not skip the intro
      if ((e.target as HTMLElement | null)?.closest?.('[data-sound]')) return
      // the key that started the intro (or its auto-repeat) must not skip it
      if (e.repeat || performance.now() - startedAtRef.current < 500) return
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
      window.clearTimeout(auto)
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
    <>
    <AnimatePresence>
      {phase === 'playing' && (
        <motion.div
          key={run}
          className="intro-root"
          role="presentation"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: CROSSFADE_MS / 1000, ease: 'linear' }}
          onClick={() => {
            if (performance.now() - startedAtRef.current > 500) finish()
          }}
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
          <SoundToggle />
          <SkipControl onSkip={finish} />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
