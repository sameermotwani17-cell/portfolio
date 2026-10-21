'use client'

import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Work } from '@/lib/creative/works'
import { CATEGORIES } from '@/lib/creative/categories'

/**
 * A card flies forward and becomes a full-screen sheet: media (video with
 * sound on by user action, or stills), title, client, role, tools, a short
 * description and links. Esc, ✕ or a swipe down closes it and the card flies
 * back to its slot.
 */
type Props = { work: Work; from: DOMRect; onClose: () => void }

export default function WorkDetail({ work, from, onClose }: Props) {
  const reduced = useReducedMotion()
  const [closing, setClosing] = useState(false)
  const [still, setStill] = useState(0)
  const stills = work.gallery?.length ? work.gallery : [work.thumb]
  const cat = CATEGORIES.find((c) => c.id === work.category)?.label

  const close = () => setClosing(true)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const rect = { left: from.left, top: from.top, width: from.width, height: from.height, borderRadius: 6 }
  const full = { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight, borderRadius: 0 }
  const dur = reduced ? 0 : 0.55

  return (
    <div className="cr-detail" role="dialog" aria-modal="true" aria-label={work.title}>
      <motion.div
        className="cr-detail__scrim"
        initial={{ opacity: 0 }}
        animate={{ opacity: closing ? 0 : 1 }}
        transition={{ duration: dur * 0.6 }}
        onClick={close}
      />
      <motion.div
        className="cr-detail__sheet"
        initial={rect}
        animate={closing ? rect : full}
        transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
        onAnimationComplete={() => {
          if (closing) onClose()
        }}
        drag={reduced ? false : 'y'}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 120) close()
        }}
      >
        <div className="cr-detail__media">
          {work.video ? (
            <video src={work.video} poster={work.thumb} controls playsInline preload="metadata" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={stills[still]} alt={`${work.title}, still ${still + 1}`} draggable={false} />
          )}
          {!work.video && stills.length > 1 && (
            <div className="cr-detail__thumbs">
              {stills.map((s, i) => (
                <button
                  key={s}
                  type="button"
                  aria-label={`Still ${i + 1}`}
                  data-on={i === still || undefined}
                  onClick={() => setStill(i)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s} alt="" draggable={false} />
                </button>
              ))}
            </div>
          )}
        </div>
        <motion.div
          className="cr-detail__body"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: closing ? 0 : 1, y: closing ? 16 : 0 }}
          transition={{ duration: dur * 0.6, delay: closing ? 0 : dur * 0.55 }}
        >
          <p className="cr-detail__cat">{cat}</p>
          <h2 className="cr-detail__title">{work.title}</h2>
          <p className="cr-detail__meta">
            {work.client} · {work.year}
          </p>
          <dl className="cr-detail__facts">
            <dt>Role</dt>
            <dd>{work.role}</dd>
            {work.tools.length > 0 && (
              <>
                <dt>Tools</dt>
                <dd>{work.tools.join(' · ')}</dd>
              </>
            )}
          </dl>
          <p className="cr-detail__desc">{work.description}</p>
          {work.links.length > 0 && (
            <div className="cr-detail__links">
              {work.links.map((l) => (
                <a key={l.href + l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </motion.div>
        <button type="button" className="cr-detail__close" onClick={close} aria-label="Close">
          ✕
        </button>
      </motion.div>
    </div>
  )
}
