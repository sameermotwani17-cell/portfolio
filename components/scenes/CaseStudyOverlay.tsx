'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import type { Album, VaultItem } from '@/lib/projects'

type OverlayItem = (Album | VaultItem) & { cover?: string | null; stencil?: boolean }

/**
 * Full-screen case study. The panel shares layoutId `album-{id}` with its
 * grid cover so the album visually "opens". Traps focus, closes on Esc,
 * locks body + Lenis scroll while open.
 */
export default function CaseStudyOverlay({
  item,
  onClose,
}: {
  item: OverlayItem
  onClose: () => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const prevFocus = useRef<Element | null>(null)

  // scroll lock (native + Lenis)
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    window.__lenis?.stop()
    return () => {
      document.body.style.overflow = ''
      window.__lenis?.start()
    }
  }, [])

  // focus trap + Esc
  useEffect(() => {
    prevFocus.current = document.activeElement
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      ;(prevFocus.current as HTMLElement | null)?.focus?.()
    }
  }, [onClose])

  const accent = item.accent
  const displayFont = item.stencil ? 'var(--font-stencil)' : 'var(--font-display)'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[9999] overflow-y-auto"
      style={{
        background: 'rgba(3,3,3,0.88)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        padding: 'clamp(16px, 4vw, 48px)',
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title} case study`}
    >
      <motion.div
        ref={panelRef}
        layoutId={`album-${item.id}`}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto w-full max-w-3xl rounded-2xl overflow-hidden"
        style={{
          background: '#0c0c0c',
          border: `1px solid ${accent}35`,
          boxShadow: `0 40px 120px rgba(0,0,0,0.9), 0 0 80px ${accent}12`,
        }}
      >
        {/* hero art */}
        <div className="relative h-52 md:h-72 overflow-hidden">
          {item.cover ? (
            <Image src={item.cover} alt="" fill className="object-cover" sizes="768px" unoptimized={item.cover.startsWith('http')} />
          ) : (
            <CodeCover accent={accent} title={item.title} />
          )}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, #0c0c0c 4%, rgba(12,12,12,0.35) 45%, transparent 100%)' }}
          />
          {/* spinning vinyl peeking out */}
          <div
            aria-hidden
            className="absolute -right-16 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full hidden md:block"
            style={{
              background: `radial-gradient(circle, #0a0a0a 18%, #151515 19%, #0a0a0a 21%, #131313 40%, #0a0a0a 41%, #161616 62%, #0b0b0b 63%, #181818 84%, #0c0c0c 85%)`,
              border: `1px solid ${accent}30`,
              animation: 'vinylSpin 9s linear infinite',
            }}
          >
            <div className="absolute inset-0 m-auto w-14 h-14 rounded-full" style={{ background: accent, opacity: 0.85 }} />
            <div className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-ink" />
          </div>
        </div>

        {/* close */}
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close case study"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center font-body text-sm transition-colors"
          style={{
            background: 'rgba(0,0,0,0.55)',
            border: '1px solid rgba(255,255,255,0.18)',
            color: 'rgba(245,245,242,0.85)',
          }}
        >
          ✕
        </button>

        {/* header */}
        <div className="px-6 md:px-10 -mt-10 relative z-[5]">
          {item.badge && (
            <span
              className="inline-block font-body text-[10px] tracking-[0.14em] uppercase rounded px-2.5 py-1 mb-3"
              style={{ color: accent, border: `1px solid ${accent}45`, background: `${accent}12` }}
            >
              {item.badge}
            </span>
          )}
          <h2
            className="text-white leading-none"
            style={{ fontFamily: displayFont, fontSize: 'clamp(1.9rem, 5.5vw, 3.2rem)' }}
          >
            {item.title}
          </h2>
          <p className="font-body text-[11px] md:text-xs tracking-[0.16em] uppercase mt-2" style={{ color: 'rgba(245,245,242,0.45)' }}>
            {item.tag}
          </p>

          {/* links */}
          {item.detail.links && item.detail.links.length > 0 && (
            <div className="flex flex-wrap gap-2.5 mt-4">
              {item.detail.links.map((link) =>
                link.href.startsWith('TODO') ? (
                  <span
                    key={link.label}
                    className="font-body text-[11px] tracking-[0.12em] uppercase rounded-md px-3 py-1.5 opacity-60"
                    style={{ color: accent, border: `1px dashed ${accent}60` }}
                  >
                    {link.label} — TODO: link coming
                  </span>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-[11px] tracking-[0.12em] uppercase rounded-md px-3 py-1.5 transition-colors hover:text-white"
                    style={{ color: accent, border: `1px solid ${accent}50`, background: `${accent}0d` }}
                  >
                    {link.label} ↗
                  </a>
                )
              )}
            </div>
          )}
        </div>

        {/* body */}
        <div className="px-6 md:px-10 py-7 md:py-9">
          <p className="font-body text-sm md:text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,245,242,0.82)' }}>
            {item.detail.overview}
          </p>

          {item.detail.stats && item.detail.stats.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mt-7">
              {item.detail.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl px-4 py-3.5"
                  style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${accent}22` }}
                >
                  <div className="font-display text-2xl md:text-3xl" style={{ color: accent }}>
                    {stat.value}
                  </div>
                  <div className="font-body text-[11px] leading-snug mt-1.5" style={{ color: 'rgba(245,245,242,0.5)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {item.detail.sections.map((section) => (
            <div key={section.title} className="mt-8">
              <div className="flex items-center gap-2.5 mb-3.5">
                <span className="w-5 h-px" style={{ background: accent }} />
                <span className="font-body text-[10px] tracking-[0.22em] uppercase font-semibold" style={{ color: accent }}>
                  {section.title}
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                {section.items.map((line, i) => (
                  <li key={i} className="flex gap-2.5 font-body text-[13px] md:text-sm leading-relaxed" style={{ color: 'rgba(245,245,242,0.72)' }}>
                    <span className="shrink-0 pt-[3px] text-[11px]" style={{ color: accent }}>
                      —
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* tech */}
          <div className="mt-9 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="font-body text-[10px] tracking-[0.22em] uppercase mb-3" style={{ color: 'rgba(245,245,242,0.35)' }}>
              Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {item.tech.map((t) => (
                <span
                  key={t}
                  className="font-body text-[11px] px-2.5 py-1 rounded"
                  style={{
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(245,245,242,0.6)',
                    background: 'rgba(255,255,255,0.03)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/** Code-drawn cover for albums without artwork (SlideViewer) */
export function CodeCover({ accent, title }: { accent: string; title: string }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: `linear-gradient(150deg, #0a1630 0%, #060a18 55%, #050505 100%)` }}
      aria-hidden
    >
      {/* stacked slide frames */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute rounded-md"
          style={{
            left: `${14 + i * 9}%`,
            top: `${20 + i * 11}%`,
            width: '46%',
            height: '38%',
            border: `1px solid ${accent}${i === 3 ? '85' : '30'}`,
            background: i === 3 ? `${accent}14` : 'rgba(255,255,255,0.02)',
          }}
        />
      ))}
      {/* speed stamp */}
      <div
        className="absolute right-[8%] bottom-[14%] font-display leading-none"
        style={{ color: accent, fontSize: 'clamp(2rem, 6vw, 3.4rem)', opacity: 0.92 }}
      >
        678ms
      </div>
      <div
        className="absolute right-[8%] bottom-[8%] font-body text-[9px] tracking-[0.3em] uppercase"
        style={{ color: 'rgba(245,245,242,0.4)' }}
      >
        was 10s+ · slow 3g
      </div>
      <span className="sr-only">{title}</span>
    </div>
  )
}
