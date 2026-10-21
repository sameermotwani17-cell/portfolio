'use client'

import { useEffect, useRef, type RefObject } from 'react'

/**
 * The master clock. While `active`, reads `video.currentTime` every animation
 * frame and hands it to `onTick`. Nothing in the intro is timed with
 * setTimeout: every beat change, glow, bloom and hand-over is derived from the
 * video clock here, so seeking the video (the Enter shortcut) moves every
 * overlay with it.
 */
export function useIntroClock(
  videoRef: RefObject<HTMLVideoElement>,
  active: boolean,
  onTick: (t: number) => void,
) {
  const tickRef = useRef(onTick)
  tickRef.current = onTick

  useEffect(() => {
    if (!active) return
    let frame = 0
    let last = -1
    const loop = () => {
      const video = videoRef.current
      if (video) {
        const t = video.currentTime
        if (t !== last) {
          last = t
          tickRef.current(t)
        }
      }
      frame = requestAnimationFrame(loop)
    }
    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [active, videoRef])
}
