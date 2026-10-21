'use client'

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { STORM } from '@/lib/creative/intro'
import { FILLER, HEADLINES, KEYWORDS, isRetro } from '@/lib/creative/keywords'
import { garamond } from '@/lib/creative/fonts'

/**
 * Act 2 · RETRO (~5s). A newspaper under a reading lamp: yellowed newsprint,
 * a masthead, ruled columns of my own copy and a couple of headline rows,
 * all curved and blurred except one sharp band in the middle where the
 * keywords pop into focus. RETRO hits print in signal red. Ends on
 * RETRO STUDIOS, then the page flips away to white.
 */
type Props = { mobile: boolean; onDone: () => void }

const BLUR = [0, 1.5, 3, 5, 7, 8]
const ALPHA = [1, 0.85, 0.65, 0.5, 0.35, 0.3]

/** Per-word durations: eased from START to END, RETRO hits held longer. */
function schedule() {
  const n = KEYWORDS.length
  return KEYWORDS.map((w, i) => {
    if (i === n - 1) return STORM.FINAL_HOLD_MS
    const k = i / (n - 2)
    const base = STORM.START_MS + (STORM.END_MS - STORM.START_MS) * (1 - Math.pow(1 - k, 1.6))
    return Math.round(isRetro(w) ? base * STORM.RETRO_HOLD : base)
  })
}

export default function RetroWordStorm({ mobile, onDone }: Props) {
  const [idx, setIdx] = useState(-1)
  const [open, setOpen] = useState(false)
  const [flip, setFlip] = useState(false)
  const doneRef = useRef(onDone)
  doneRef.current = onDone

  const half = mobile ? 3 : 4
  const cols = mobile ? 2 : 3
  const rows = useMemo(() => Array.from({ length: half * 2 + 1 }, (_, i) => i - half), [half])
  // the rows two away from the centre are headlines
  const headRow = (d: number) => Math.abs(d) === 2

  useEffect(() => {
    const durs = schedule()
    const timers: number[] = []
    let at = STORM.OPEN_MS
    timers.push(window.setTimeout(() => setOpen(true), 16))
    durs.forEach((d, i) => {
      timers.push(window.setTimeout(() => setIdx(i), at))
      at += d
    })
    timers.push(window.setTimeout(() => setFlip(true), at))
    timers.push(window.setTimeout(() => doneRef.current(), at + STORM.FLIP_MS))
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [])

  const word = idx >= 0 ? KEYWORDS[idx] : ''

  return (
    <div className={`cr-storm ${garamond.className}`} data-open={open} data-flip={flip} aria-hidden="true">
      <div className="cr-storm__page">
        <div className="cr-storm__paper" />
        <div className="cr-storm__block" style={{ '--flip-ms': `${STORM.FLIP_MS}ms` } as CSSProperties}>
          <div className="cr-storm__mast" style={{ '--d': -(half + 1) } as CSSProperties}>
            <span className="cr-storm__mast-meta">Beppu, Japan</span>
            <span className="cr-storm__mast-name">The Retro Times</span>
            <span className="cr-storm__mast-meta">Creative edition · 2026</span>
          </div>
          {rows.map((d) => {
            const a = Math.abs(d)
            const style = {
              '--d': d,
              '--blur': `${BLUR[Math.min(a, 5)]}px`,
              '--alpha': ALPHA[Math.min(a, 5)],
            } as CSSProperties

            if (d === 0) {
              return (
                <div key={d} className="cr-storm__line cr-storm__line--centre" style={style}>
                  <span className="cr-storm__side cr-storm__side--l">{FILLER[2]}</span>
                  <span
                    key={idx}
                    className="cr-storm__word"
                    data-retro={isRetro(word) || undefined}
                    data-final={idx === KEYWORDS.length - 1 || undefined}
                  >
                    {word}
                  </span>
                  <span className="cr-storm__side cr-storm__side--r">{FILLER[5]}</span>
                </div>
              )
            }
            if (headRow(d)) {
              const h = HEADLINES[(d + half) % HEADLINES.length]
              return (
                <div key={d} className="cr-storm__line cr-storm__line--head" style={style}>
                  <span className="cr-storm__run" style={{ '--drift': `${30 + a * 4}s`, '--dir': d > 0 ? 'reverse' : 'normal' } as CSSProperties}>
                    {h} · {h} · {h} ·
                  </span>
                </div>
              )
            }
            return (
              <div key={d} className="cr-storm__line cr-storm__cols" style={style}>
                {Array.from({ length: cols }, (_, k) => {
                  const text = FILLER[(d + half + k * 3) % FILLER.length]
                  return (
                    <span key={k} className="cr-storm__col">
                      <span
                        className="cr-storm__run"
                        style={
                          {
                            '--drift': `${16 + ((d * 7 + k * 5 + 30) % 11) * 2}s`,
                            '--dir': (d + k) % 2 === 0 ? 'normal' : 'reverse',
                          } as CSSProperties
                        }
                      >
                        {text} {text} {text}
                      </span>
                    </span>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
