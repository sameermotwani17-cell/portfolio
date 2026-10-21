'use client'

import { REPLAY_EVENT } from './OpeningSequence'

/** `↻ Replay intro`: the only way to see the intro again in the same session. */
export default function ReplayIntro({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="hero-replay"
      onClick={() => window.dispatchEvent(new Event(REPLAY_EVENT))}
    >
      {label}
    </button>
  )
}
