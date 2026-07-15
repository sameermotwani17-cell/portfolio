'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import type { Album, VaultItem } from '@/lib/projects'
import StickemCinema from './StickemCinema'
import ScrapyardWorld from './ScrapyardWorld'
import RetroWorld from './RetroWorld'
import GomiWorld from './GomiWorld'
import AihackWorld from './AihackWorld'
import MiruWorld from './MiruWorld'

type OverlayItem = (Album | VaultItem) & {
  cover?: string | null
  coverContain?: boolean
  coverBg?: string
  stencil?: boolean
  mono?: boolean
  world?: 'stickem' | 'scrapyard' | 'retro' | 'gomi' | 'aihack' | 'miru'
  logo?: string
}

const WORLDS: Record<string, React.ComponentType<{ item: OverlayItem }>> = {
  stickem: StickemCinema,
  scrapyard: ScrapyardWorld,
  retro: RetroWorld,
  gomi: GomiWorld,
  aihack: AihackWorld,
  miru: MiruWorld,
}

/**
 * Full-screen case study, themed per project (accent color; RETRO gets the
 * monochrome raven treatment). Content is a design-slide roadmap — numbered
 * stages with one headline and a few short points — not walls of text.
 * Traps focus, closes on Esc, locks body + Lenis scroll while open.
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
  const mono = !!item.mono
  const displayFont = item.stencil ? 'var(--font-stencil)' : 'var(--font-display)'
  const panelBg = mono
    ? '#000'
    : `radial-gradient(ellipse 90% 40% at 50% 0%, ${accent}1f, transparent 60%), radial-gradient(ellipse 70% 30% at 50% 100%, ${accent}0d, transparent 60%), #0c0c0c`
  const hairline = mono ? 'rgba(255,255,255,0.22)' : `${accent}35`
  const softText = 'rgba(245,245,242,0.6)'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      data-lenis-prevent
      className="fixed inset-0 z-[9999] overflow-y-auto overscroll-contain"
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
        className={`relative mx-auto w-full ${item.world ? 'max-w-6xl' : 'max-w-3xl'} rounded-2xl overflow-hidden`}
        style={{
          background: item.world ? '#0a0610' : panelBg,
          border: `1px solid ${hairline}`,
          boxShadow: mono
            ? '0 40px 120px rgba(0,0,0,0.95), 0 0 80px rgba(255,255,255,0.06)'
            : `0 40px 120px rgba(0,0,0,0.9), 0 0 80px ${accent}12`,
        }}
      >
        {/* close — first child so it survives both layouts */}
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

        {item.world && WORLDS[item.world] ? (
          (() => {
            const World = WORLDS[item.world]
            return <World item={item} />
          })()
        ) : (
          <>
        {/* hero art */}
        <div className="relative h-52 md:h-64 overflow-hidden">
          {item.cover ? (
            item.coverContain ? (
              <div className="absolute inset-0 py-6" style={{ background: item.coverBg || '#0b0b0b' }}>
                <div className="relative w-full h-full">
                  <Image src={item.cover} alt="" fill className="object-contain" sizes="768px" />
                </div>
              </div>
            ) : (
              <Image src={item.cover} alt="" fill className="object-cover" sizes="768px" unoptimized={item.cover.startsWith('http')} />
            )
          ) : (
            <CodeCover accent={accent} title={item.title} />
          )}
          <div
            className="absolute inset-0"
            style={{
              background: mono
                ? 'linear-gradient(to top, #000 4%, rgba(0,0,0,0.3) 50%, transparent 100%)'
                : 'linear-gradient(to top, #0c0c0c 4%, rgba(12,12,12,0.35) 45%, transparent 100%)',
            }}
          />
        </div>

        {/* header */}
        <div className="px-6 md:px-10 -mt-10 relative z-[5]">
          {item.logo && (
            <span className="block w-14 h-14 rounded-xl overflow-hidden bg-white/95 p-1.5 mb-3 shadow-lg">
              <Image src={item.logo} alt={`${item.title} brand logo`} width={56} height={56} className="w-full h-full object-contain" />
            </span>
          )}
          {item.badge && (
            <span
              className="inline-block font-body text-[10px] tracking-[0.14em] uppercase rounded px-2.5 py-1 mb-3"
              style={{
                color: mono ? '#fff' : accent,
                border: `1px solid ${hairline}`,
                background: mono ? 'rgba(255,255,255,0.06)' : `${accent}12`,
              }}
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
              {item.detail.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[11px] tracking-[0.12em] uppercase rounded-md px-3 py-1.5 transition-colors hover:text-white"
                  style={{
                    color: mono ? '#fff' : accent,
                    border: `1px solid ${hairline}`,
                    background: mono ? 'rgba(255,255,255,0.06)' : `${accent}0d`,
                  }}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>

        {/* body */}
        <div className="px-6 md:px-10 py-7 md:py-9">
          <p className="font-body text-sm md:text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,245,242,0.8)' }}>
            {item.detail.overview}
          </p>

          {/* stats */}
          {item.detail.stats && item.detail.stats.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mt-7">
              {item.detail.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl px-4 py-3.5"
                  style={{
                    background: mono ? 'rgba(255,255,255,0.04)' : `${accent}0c`,
                    border: `1px solid ${mono ? 'rgba(255,255,255,0.14)' : `${accent}30`}`,
                  }}
                >
                  <div className="font-display text-2xl md:text-3xl" style={{ color: mono ? '#fff' : accent }}>
                    {stat.value}
                  </div>
                  <div className="font-body text-[11px] leading-snug mt-1.5" style={{ color: 'rgba(245,245,242,0.5)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* the roadmap */}
          <div className="relative mt-10">
            {/* rail */}
            <div
              aria-hidden
              className="absolute left-[19px] top-3 bottom-3 w-px"
              style={{ background: `linear-gradient(to bottom, ${mono ? 'rgba(255,255,255,0.4)' : accent}, transparent)` }}
            />
            {item.detail.flow.map((stage, i) => (
              <div key={stage.label} className="relative flex gap-5 md:gap-6 pb-9 last:pb-0">
                {/* node */}
                <div
                  className="relative z-[2] shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-display text-sm"
                  style={{
                    background: mono ? '#000' : '#0c0c0c',
                    border: `1.5px solid ${mono ? 'rgba(255,255,255,0.6)' : accent}`,
                    color: mono ? '#fff' : accent,
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="pt-0.5 min-w-0">
                  <span
                    className="block text-base"
                    style={{ fontFamily: 'var(--font-scrawl), cursive', color: mono ? 'rgba(255,255,255,0.75)' : accent }}
                  >
                    {stage.label}
                  </span>
                  <h4
                    className="text-white leading-tight mt-1"
                    style={{ fontFamily: displayFont, fontSize: 'clamp(1.15rem, 3vw, 1.6rem)' }}
                  >
                    {stage.headline}
                  </h4>
                  {stage.points && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {stage.points.map((p) => (
                        <span
                          key={p}
                          className="font-body text-[11px] md:text-xs px-2.5 py-1 rounded-md"
                          style={{
                            border: `1px solid ${mono ? 'rgba(255,255,255,0.16)' : `${accent}2e`}`,
                            background: mono ? 'rgba(255,255,255,0.03)' : `${accent}0a`,
                            color: 'rgba(245,245,242,0.72)',
                          }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* tech */}
          <div className="mt-10 pt-6" style={{ borderTop: `1px solid ${mono ? 'rgba(255,255,255,0.14)' : 'rgba(255,255,255,0.07)'}` }}>
            <div className="font-body text-[10px] tracking-[0.22em] uppercase mb-3" style={{ color: 'rgba(245,245,242,0.35)' }}>
              Stack
            </div>
            <div className="flex flex-wrap gap-2">
              {item.tech.map((t) => (
                <span
                  key={t}
                  className="font-body text-[11px] px-2.5 py-1 rounded"
                  style={{
                    border: `1px solid ${mono ? 'rgba(255,255,255,0.14)' : `${accent}26`}`,
                    color: 'rgba(245,245,242,0.65)',
                    background: mono ? 'rgba(255,255,255,0.03)' : `${accent}08`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}

/** Code-drawn cover for albums without artwork (SlideViewer) */
export function CodeCover({ accent, title }: { accent: string; title: string }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: `linear-gradient(150deg, #1a1030 0%, #0a0618 55%, #050505 100%)` }}
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
