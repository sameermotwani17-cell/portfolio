'use client'

import { useEffect, useRef, useState } from 'react'
import { SHOWROOM, SHOWROOM_CATEGORIES, type ShowroomCategory, type ShowroomItem } from '@/lib/creative/showroom'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

type Filter = 'all' | ShowroomCategory
const FILTERS: { id: Filter; label: string; count: number }[] = [
  { id: 'all', label: 'All', count: SHOWROOM.length },
  ...SHOWROOM_CATEGORIES.map((c) => ({ ...c, count: SHOWROOM.filter((s) => s.cat === c.id).length })),
]

/** A wall tile: stills are plain images, videos autoplay muted while on screen. */
function Tile({ item, reduced, onOpen }: { item: ShowroomItem; reduced: boolean; onOpen: () => void }) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = ref.current
    if (!v || reduced) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) void v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.35 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [reduced])

  return (
    <button
      type="button"
      className="cr-show__tile"
      style={{ aspectRatio: String(item.ratio) }}
      onClick={onOpen}
      aria-label={`${item.title}, ${item.tag}${item.kind === 'video' ? ', video' : ''}`}
    >
      {item.kind === 'video' ? (
        <video ref={ref} src={item.src} poster={item.poster} muted loop playsInline preload="none" />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.src} alt="" loading="lazy" decoding="async" draggable={false} />
      )}
      {item.kind === 'video' && <span className="cr-show__badge">Video · tap for sound</span>}
      <span className="cr-show__cap">
        <b>{item.title}</b>
        <i>{item.tag}</i>
      </span>
    </button>
  )
}

function Lightbox({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: ShowroomItem[]
  index: number
  onIndex: (i: number) => void
  onClose: () => void
}) {
  const item = items[index]
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    window.__lenis?.stop()
    closeRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
      window.__lenis?.start()
      prev?.focus?.()
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') onIndex((index + 1) % items.length)
      else if (e.key === 'ArrowLeft') onIndex((index - 1 + items.length) % items.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index, items.length, onClose, onIndex])

  return (
    <div className="cr-lb" role="dialog" aria-modal="true" aria-label={item.title} onClick={onClose}>
      <button ref={closeRef} type="button" className="cr-lb__x" onClick={onClose} aria-label="Close">
        ✕
      </button>
      <button
        type="button"
        className="cr-lb__nav cr-lb__nav--prev"
        aria-label="Previous"
        onClick={(e) => {
          e.stopPropagation()
          onIndex((index - 1 + items.length) % items.length)
        }}
      >
        ←
      </button>
      <figure className="cr-lb__fig" onClick={(e) => e.stopPropagation()}>
        {item.kind === 'video' ? (
          <video key={item.id} src={item.src} poster={item.poster} controls autoPlay loop playsInline />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={item.id} src={item.src} alt={item.title} />
        )}
        <figcaption>
          <b>{item.title}</b>
          <i>{item.tag}</i>
        </figcaption>
      </figure>
      <button
        type="button"
        className="cr-lb__nav cr-lb__nav--next"
        aria-label="Next"
        onClick={(e) => {
          e.stopPropagation()
          onIndex((index + 1) % items.length)
        }}
      >
        →
      </button>
    </div>
  )
}

/** The showroom under the arc: a masonry wall of the most photoreal pieces. */
export default function Showroom() {
  const reduced = usePrefersReducedMotion()
  const [filter, setFilter] = useState<Filter>('all')
  const [open, setOpen] = useState<number | null>(null)
  const items = SHOWROOM.filter((s) => filter === 'all' || s.cat === filter)

  return (
    <section id="showroom" className="cr-show" aria-labelledby="cr-show-h">
      <header className="cr-show__head">
        <p className="cr-show__eyebrow">Retro Studios · AI production</p>
        <h2 id="cr-show-h">Showroom</h2>
        <p className="cr-show__sub">
          The most photoreal pieces from the studio. Every frame generated, directed and finished in-house.
        </p>
        <div className="cr-show__filters" role="tablist" aria-label="Filter the showroom">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              data-on={filter === f.id || undefined}
              onClick={() => {
                setFilter(f.id)
                setOpen(null)
              }}
            >
              {f.label} <span>{f.count}</span>
            </button>
          ))}
        </div>
      </header>

      <div className="cr-show__wall">
        {items.map((item, i) => (
          <Tile key={item.id} item={item} reduced={reduced} onOpen={() => setOpen(i)} />
        ))}
      </div>

      <a
        className="cr-show__top"
        href="#top"
        onClick={(e) => {
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
        }}
      >
        ↑ Back to the work
      </a>

      {open !== null && items[open] && (
        <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </section>
  )
}
