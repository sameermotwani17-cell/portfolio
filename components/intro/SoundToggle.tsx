'use client'

import { useState, type MouseEvent } from 'react'
import { isSoundEnabled, setSoundEnabled } from '@/lib/sound'

/** Sound is off by default. This is the only way to turn it on for the intro. */
export default function SoundToggle() {
  const [on, setOn] = useState(isSoundEnabled())
  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation() // a click on the intro skips it; this one must not
    const next = !on
    setSoundEnabled(next)
    setOn(next)
  }
  return (
    <button type="button" className="intro-sound" onClick={toggle} aria-pressed={on} data-sound>
      Sound {on ? 'on' : 'off'}
    </button>
  )
}
