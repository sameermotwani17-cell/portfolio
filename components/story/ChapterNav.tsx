'use client'

import { CHAPTERS, ERAS } from '@/lib/story/chapters'
import { CHAPTER_NODES } from '@/lib/story/layout'

type Props = {
  chapter: number
  era: number
  phase: 'intro' | 'tour' | 'outro'
  onChapter: (i: number) => void
  onEra: (k: number) => void
  onWhole: () => void
  onSkip: () => void
}

/**
 * Era tabs along the top (they jump to the first chapter of each era), dots
 * for the chapters of the current era, prev / next / whole map along the
 * bottom, and a skip link that is always on screen.
 */
export default function ChapterNav({ chapter, era, phase, onChapter, onEra, onWhole, onSkip }: Props) {
  const dotsEra = era >= 0 ? era : phase === 'outro' ? ERAS.length - 1 : 0
  const dots = CHAPTER_NODES.filter((c) => c.eraIndex === dotsEra)

  const prevTarget = phase === 'outro' ? CHAPTERS.length - 1 : chapter > 0 ? chapter - 1 : -1
  const nextTarget = phase === 'outro' ? -1 : chapter < 0 ? 0 : chapter < CHAPTERS.length - 1 ? chapter + 1 : -2

  return (
    <>
      <div className="sn-top">
        <button type="button" className="sn-skip" onClick={onSkip}>
          skip story <span aria-hidden="true">↓</span>
        </button>
        <nav className="sn-tabs" aria-label="Eras">
          {ERAS.map((e, k) => (
            <button
              key={e.id}
              type="button"
              className="sn-tab"
              aria-current={era === k ? 'true' : undefined}
              onClick={() => onEra(k)}
            >
              {e.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="sn-bottom" data-hidden={phase === 'outro' ? '' : undefined}>
        <button
          type="button"
          className="sn-btn"
          disabled={prevTarget === -1 && chapter !== 0}
          onClick={() => (chapter === 0 ? onWhole() : onChapter(prevTarget))}
        >
          <span aria-hidden="true">←</span> prev
        </button>
        <div className="sn-dots" role="group" aria-label="Chapters in this era">
          {dots.map((c) => (
            <button
              key={c.chapter.id}
              type="button"
              className="sn-dot"
              aria-label={`Chapter ${c.index + 1} of ${CHAPTERS.length}: ${c.chapter.label}`}
              aria-current={chapter === c.index ? 'true' : undefined}
              onClick={() => onChapter(c.index)}
            />
          ))}
        </div>
        <button type="button" className="sn-btn" onClick={onWhole}>
          see whole map
        </button>
        <button
          type="button"
          className="sn-btn"
          disabled={nextTarget === -1 || nextTarget === -2}
          onClick={() => onChapter(nextTarget)}
        >
          next <span aria-hidden="true">→</span>
        </button>
      </div>
    </>
  )
}
