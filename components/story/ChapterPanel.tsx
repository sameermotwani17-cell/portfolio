'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { CHAPTERS } from '@/lib/story/chapters'
import { CHAPTER_NODES } from '@/lib/story/layout'
import { Rich } from './Rich'

/**
 * The story text for the active chapter. On wide screens it takes the side
 * of the stage opposite the node (chosen per chapter in layout.ts), so it
 * never covers the node or its label. On phones it is a paper card in the
 * bottom ~55%. Words are set in the body face, never in the handwriting.
 */
export default function ChapterPanel({ chapter }: { chapter: number }) {
  const c = chapter >= 0 ? CHAPTERS[chapter] : null
  const side = chapter >= 0 ? CHAPTER_NODES[chapter].panel : 'left'
  return (
    <AnimatePresence initial={false}>
      {c && (
        <motion.article
          key={c.id}
          className="story-panel"
          data-side={side}
          aria-live="polite"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="sp-count">
            {String(chapter + 1).padStart(2, '0')} / {CHAPTERS.length}
          </p>
          <p className="sp-cap">
            {c.place} · {c.when}
          </p>
          <p className="sp-body">
            <Rich text={c.text} />
          </p>
        </motion.article>
      )}
    </AnimatePresence>
  )
}
