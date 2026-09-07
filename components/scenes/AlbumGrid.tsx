'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState } from 'react'
import type { Album, ProjectLink, Release } from '@/lib/projects'
import { CodeCover } from './CaseStudyOverlay'

/**
 * The shape the record sleeve actually renders. Featured albums and RETRO
 * Studios releases both satisfy it — the only difference is what a click does:
 * an album opens its case-study overlay, a release leaves for the live project.
 */
export type RecordItem = {
  id: string
  title: string
  subtitle: string
  short: string
  tracklist: string[]
  badge: string | null
  accent: string
  accents?: string[]
  font?: string
  cover: string | null
  coverContain?: boolean
  coverBg?: string
  stencil?: boolean
  logo?: string
  links?: ProjectLink[]
}

function titleFont(item: RecordItem) {
  if (item.font) return item.font
  return item.stencil ? 'var(--font-stencil)' : 'var(--font-display)'
}

function RecordSleeve({ item, hovered }: { item: RecordItem; hovered: boolean }) {
  const custom = !!item.font
  // release covers are served by each project's own deployment; if one ever
  // goes down the sleeve falls back to that record's real base colour rather
  // than rendering a broken-image box
  const [coverFailed, setCoverFailed] = useState(false)
  const cover = coverFailed ? null : item.cover
  return (
    <motion.div
      layoutId={`album-${item.id}`}
      className="relative aspect-square rounded-xl overflow-hidden transition-shadow duration-400"
      style={{
        border: hovered ? `1px solid ${item.accent}70` : '1px solid rgba(255,255,255,0.1)',
        boxShadow: hovered
          ? `0 24px 70px rgba(0,0,0,0.75), 0 0 50px ${item.accent}28`
          : '0 16px 44px rgba(0,0,0,0.6)',
        background: item.coverBg || '#0b0b0b',
      }}
    >
      {/* cover art — decorative, the title sits right below it */}
      {cover ? (
        item.coverContain ? (
          <div className="absolute inset-0 p-10 md:p-14" style={{ background: item.coverBg || '#0b0b0b' }}>
            <div className="relative w-full h-full">
              <Image
                src={cover}
                alt=""
                aria-hidden
                fill
                className="object-contain transition-transform duration-700 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 92vw, 520px"
                unoptimized={cover.startsWith('http')}
                onError={() => setCoverFailed(true)}
              />
            </div>
          </div>
        ) : (
          <Image
            src={cover}
            alt=""
            aria-hidden
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 92vw, 520px"
            unoptimized={cover.startsWith('http')}
            onError={() => setCoverFailed(true)}
          />
        )
      ) : item.cover ? (
        // a cover that failed to load: hold the record's own base colour
        <div className="absolute inset-0" style={{ background: item.coverBg || '#0b0b0b' }} aria-hidden />
      ) : (
        <CodeCover accent={item.accent} title={item.title} />
      )}

      {/* vinyl sleeve gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.35) 34%, transparent 62%)',
        }}
      />
      {/* sleeve edge highlight */}
      <div
        className="absolute inset-y-0 left-0 w-[3px] pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(255,255,255,0.14), transparent)' }}
      />

      {/* brand logo chip (skip when the cover already is the logo) */}
      {item.logo && !item.coverContain && (
        <div className="absolute top-4 left-4 w-12 h-12 rounded-lg overflow-hidden bg-white/95 p-1.5 shadow-lg">
          <Image src={item.logo} alt={`${item.title} brand logo`} width={48} height={48} className="w-full h-full object-contain" />
        </div>
      )}

      {/* tracklist — hover reveal */}
      <div
        className="absolute top-4 right-4 flex flex-col items-end gap-1"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateY(0)' : 'translateY(-8px)',
          transition: 'opacity 0.4s, transform 0.4s',
        }}
        aria-hidden
      >
        {item.tracklist.map((t) => (
          <span
            key={t}
            className="font-body text-[10px] tracking-[0.12em] uppercase px-2 py-0.5 rounded-sm"
            style={{ color: 'rgba(245,245,242,0.85)', background: 'rgba(0,0,0,0.55)' }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* bottom-left title block */}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
        {item.badge && (
          <span
            className="inline-block font-body text-[9px] tracking-[0.14em] uppercase rounded px-2 py-0.5 mb-2"
            style={{ color: item.accent, border: `1px solid ${item.accent}50`, background: 'rgba(0,0,0,0.45)' }}
          >
            {item.badge}
          </span>
        )}
        {/* colorway bar — the release's signature palette, where it has one */}
        {item.accents && item.accents.length > 1 && (
          <div className="flex h-[3px] w-16 mb-2.5 rounded-full overflow-hidden" aria-hidden>
            {item.accents.map((c) => (
              <span key={c} className="flex-1" style={{ background: c }} />
            ))}
          </div>
        )}
        <h3
          className="text-white leading-none"
          style={{
            fontFamily: titleFont(item),
            fontSize: custom ? 'clamp(1.45rem, 3.4vw, 2.1rem)' : item.stencil ? 'clamp(1.15rem, 3vw, 1.7rem)' : 'clamp(1.5rem, 3.6vw, 2.2rem)',
            letterSpacing: custom ? '0.02em' : undefined,
            textShadow: '0 2px 16px rgba(0,0,0,0.7)',
          }}
        >
          {item.title}
        </h3>
        <p className="font-body text-[11px] tracking-[0.14em] uppercase mt-1.5" style={{ color: 'rgba(245,245,242,0.55)' }}>
          {item.subtitle}
        </p>
        <p
          className="touch-show font-body text-xs leading-relaxed mt-2 max-w-[92%] transition-opacity duration-300"
          style={{ color: 'rgba(245,245,242,0.6)', opacity: hovered ? 1 : 0 }}
        >
          {item.short}
        </p>
      </div>

      {/* open affordance */}
      <div
        className="touch-show absolute bottom-5 right-5 flex items-center gap-1.5 font-body text-[10px] tracking-[0.2em] uppercase transition-opacity duration-300"
        style={{ color: item.accent, opacity: hovered ? 1 : 0 }}
        aria-hidden
      >
        <span
          className="w-6 h-6 rounded-full flex items-center justify-center text-[9px]"
          style={{ border: `1px solid ${item.accent}80`, background: `${item.accent}18` }}
        >
          ▶
        </span>
        open
      </div>

      {/* glow ring on hover */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-400"
        style={{ boxShadow: `inset 0 0 0 1px ${item.accent}45`, opacity: hovered ? 1 : 0 }}
      />
    </motion.div>
  )
}

function useSleeveState(index: number) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)
  return {
    ref,
    hovered,
    motionProps: {
      initial: { opacity: 0, y: 70 },
      animate: inView ? { opacity: 1, y: 0 } : {},
      transition: { duration: 0.85, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] as const },
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    },
  }
}

/** A featured album — opens the case-study overlay. */
function AlbumCard({ album, index, onOpen }: { album: Album; index: number; onOpen: () => void }) {
  const { ref, hovered, motionProps } = useSleeveState(index)
  return (
    <motion.div ref={ref} {...motionProps} className="relative">
      <button
        onClick={onOpen}
        className="relative block w-full text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-xl"
        aria-label={`Open ${album.title} case study`}
      >
        <RecordSleeve item={album} hovered={hovered} />
      </button>
    </motion.div>
  )
}

/**
 * A RETRO Studios release. Same sleeve as a featured album, and the same
 * behaviour: "▶ open" opens the case study — the story, why it was made, in
 * that brand's own colour and typeface — and the live project is linked from
 * inside it rather than swallowing the click.
 */
function ReleaseCard({ release, index, onOpen }: { release: Release; index: number; onOpen: () => void }) {
  const { ref, hovered, motionProps } = useSleeveState(index)
  return (
    <motion.div ref={ref} {...motionProps} className="relative">
      <button
        onClick={onOpen}
        className="relative block w-full text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded-xl"
        aria-label={`Open ${release.title} case study`}
      >
        <RecordSleeve item={release} hovered={hovered} />
      </button>
      {/* the live project stays one click away without hijacking the card */}
      <div className="flex flex-wrap gap-2 mt-3">
        <a
          href={release.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-[10px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-md transition-colors hover:text-white"
          style={{ color: release.accent, border: `1px solid ${release.accent}40`, background: `${release.accent}0d` }}
        >
          visit live ↗
        </a>
        {release.links?.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-[10px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-md transition-colors hover:text-white"
            style={{ color: 'rgba(245,245,242,0.55)', border: '1px solid rgba(255,255,255,0.14)' }}
          >
            {link.label} ↗
          </a>
        ))}
      </div>
    </motion.div>
  )
}

export default function AlbumGrid({
  albums,
  onOpen,
}: {
  albums: Album[]
  onOpen: (album: Album) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {albums.map((album, i) => (
        <AlbumCard key={album.id} album={album} index={i} onOpen={() => onOpen(album)} />
      ))}
    </div>
  )
}

/** The RETRO Studios discography grid. */
export function ReleaseGrid({
  releases,
  onOpen,
}: {
  releases: Release[]
  onOpen: (release: Release) => void
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {releases.map((release, i) => (
        <ReleaseCard key={release.id} release={release} index={i} onOpen={() => onOpen(release)} />
      ))}
    </div>
  )
}
