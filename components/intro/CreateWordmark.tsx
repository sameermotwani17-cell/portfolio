'use client'

import type { CSSProperties } from 'react'
import type { Beat } from '@/lib/intro/cues'
import { WORDMARK } from '@/lib/intro/anchors'

const WORD = 'CREATE'

/**
 * `C R E A T E` on the home row.
 * Beat C: letters print in one at a time, then a blinking cursor.
 * Beat D: perfectly still; the cursor disappears at ENTER_PRESS (submitted).
 * Beat E: tracking widens and the word fades.
 * All state transitions are CSS keyed on `data-beat`; the beat comes from
 * the video clock.
 */
export default function CreateWordmark({ beat }: { beat: Beat }) {
  const style = {
    '--wm-x': `${WORDMARK.x}%`,
    '--wm-y': `${WORDMARK.y}%`,
  } as CSSProperties

  return (
    <div className="wm" data-beat={beat} style={style} aria-hidden="true">
      {WORD.split('').map((ch, i) => (
        <span key={i} className="wm__l" style={{ '--i': i } as CSSProperties}>
          {ch}
        </span>
      ))}
      <span className="wm__cursor">▍</span>
      <span className="wm__hint">press ⏎</span>
    </div>
  )
}
