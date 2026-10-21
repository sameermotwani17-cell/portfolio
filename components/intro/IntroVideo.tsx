'use client'

import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { CUES } from '@/lib/intro/cues'
import { INTRO_SRC } from '@/lib/intro/assets'

type Props = {
  /** Beat E: push in (scale 1 -> 1.15) toward the screen glow. */
  pushIn: boolean
  onReady: () => void
  onError: () => void
  onEnded: () => void
}

const PUSH_SECONDS = CUES.HERO_IN - CUES.TRANSITION_START

/**
 * The footage. One landscape file for every device, muted, no controls.
 * The clock reads `currentTime` from this element.
 */
const IntroVideo = forwardRef<HTMLVideoElement, Props>(function IntroVideo(
  { pushIn, onReady, onError, onEnded },
  ref,
) {
  return (
    <motion.video
      ref={ref}
      className="intro-video"
      poster={INTRO_SRC.poster}
      autoPlay
      muted
      playsInline
      preload="auto"
      disablePictureInPicture
      aria-hidden="true"
      tabIndex={-1}
      onCanPlay={onReady}
      onError={onError}
      onEnded={onEnded}
      initial={{ scale: 1 }}
      animate={{ scale: pushIn ? 1.15 : 1 }}
      transition={{ duration: PUSH_SECONDS, ease: [0.16, 1, 0.3, 1] }}
    >
      <source src={INTRO_SRC.webm} type="video/webm" />
      <source src={INTRO_SRC.mp4} type="video/mp4" />
    </motion.video>
  )
})

export default IntroVideo

/** Blurred, dimmed copy of the footage that fills above/below the stage on phones. */
export function AmbientVideo() {
  return (
    <video
      className="intro-ambient"
      autoPlay
      muted
      playsInline
      loop
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={INTRO_SRC.webm} type="video/webm" />
      <source src={INTRO_SRC.mp4} type="video/mp4" />
    </video>
  )
}
