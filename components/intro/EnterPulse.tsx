'use client'

import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import type { Beat } from '@/lib/intro/cues'
import { ENTER_KEY, KEY_SIZE } from '@/lib/intro/anchors'

/**
 * Two warm pulses anchored to the Enter key.
 *  1. ENTER_PRESS: a key-sized glow, scale 0.6 -> 1, fading over 400ms.
 *  2. TRANSITION_START: a bloom from the same point, scaling to ~34x to cover
 *     the stage (opacity 0 -> 0.9 -> 0 over 700ms) while the video pushes in.
 * Only transform, opacity and filter are animated.
 */
export default function EnterPulse({ beat }: { beat: Beat }) {
  const pressed = beat === 'enter' || beat === 'transition' || beat === 'hero'
  const blooming = beat === 'transition' || beat === 'hero'

  const style = {
    '--key-x': `${ENTER_KEY.x}%`,
    '--key-y': `${ENTER_KEY.y}%`,
    '--key-size': KEY_SIZE,
  } as CSSProperties

  return (
    <>
      <motion.div
        className="enter-glow"
        style={style}
        aria-hidden="true"
        initial={false}
        animate={
          pressed
            ? { opacity: [0, 1, 0], scale: [0.6, 1, 1.06] }
            : { opacity: 0, scale: 0.6 }
        }
        transition={{ duration: 0.4, ease: 'easeOut', times: [0, 0.35, 1] }}
      />
      <motion.div
        className="enter-bloom"
        style={style}
        aria-hidden="true"
        initial={false}
        animate={
          blooming
            ? { opacity: [0, 0.9, 0], scale: [1, 34, 34] }
            : { opacity: 0, scale: 1 }
        }
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
          times: [0, 0.5, 1],
        }}
      />
    </>
  )
}
