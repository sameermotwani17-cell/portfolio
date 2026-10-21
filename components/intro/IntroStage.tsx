'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { AmbientVideo } from './IntroVideo'

const PORTRAIT = '(max-aspect-ratio: 1/1)'

/**
 * A 16:9 box that holds the video and ALL overlays in one coordinate space.
 * Overlays are positioned in % of this box, never the viewport, so `CREATE`
 * and the Enter glow stay glued to the keyboard at any screen size.
 *
 * Landscape: the stage covers the viewport (centred, cropped).
 * Portrait:  the stage is 100vw wide and fitted, with the same footage
 *            blurred behind it as an ambient fill. See globals.css.
 */
export default function IntroStage({ children }: { children: ReactNode }) {
  const [portrait, setPortrait] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(PORTRAIT)
    const onChange = () => setPortrait(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <>
      {portrait && <AmbientVideo />}
      <div className="intro-stage">{children}</div>
    </>
  )
}
