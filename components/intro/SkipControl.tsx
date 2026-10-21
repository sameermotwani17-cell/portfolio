'use client'

import type { MouseEvent } from 'react'

/** Visible from t=0, keyboard-focusable. Enter on it skips (it is a button). */
export default function SkipControl({ onSkip }: { onSkip: () => void }) {
  const onClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onSkip()
  }
  return (
    <button type="button" className="intro-skip" onClick={onClick} data-skip>
      Skip intro <span aria-hidden="true">→</span>
    </button>
  )
}
