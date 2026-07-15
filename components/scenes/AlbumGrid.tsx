'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState } from 'react'
import type { Album } from '@/lib/projects'
import { CodeCover } from './CaseStudyOverlay'

function AlbumCard({
  album,
  index,
  onOpen,
}: {
  album: Album
  index: number
  onOpen: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.button
      ref={ref}
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 70 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="relative block w-full text-left group focus:outline-none"
      aria-label={`Open ${album.title} case study`}
    >
      {/* layout-morph source: keep this element free of transforms so the
          shared-layout expansion into the overlay stays glitch-free */}
      <motion.div
        layoutId={`album-${album.id}`}
        className="relative aspect-square rounded-xl overflow-hidden transition-shadow duration-400"
        style={{
          border: hovered ? `1px solid ${album.accent}70` : '1px solid rgba(255,255,255,0.1)',
          boxShadow: hovered
            ? `0 24px 70px rgba(0,0,0,0.75), 0 0 50px ${album.accent}28`
            : '0 16px 44px rgba(0,0,0,0.6)',
          background: '#0b0b0b',
        }}
      >
        {/* cover art */}
        {album.cover ? (
          <Image
            src={album.cover}
            alt={`${album.title} cover art`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            sizes="(max-width: 768px) 92vw, 520px"
            unoptimized={album.cover.startsWith('http')}
          />
        ) : (
          <CodeCover accent={album.accent} title={album.title} />
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

        {/* brand logo chip */}
        {album.logo && (
          <div className="absolute top-4 left-4 w-12 h-12 rounded-lg overflow-hidden bg-white/95 p-1.5 shadow-lg">
            <Image src={album.logo} alt={`${album.title} brand logo`} width={48} height={48} className="w-full h-full object-contain" />
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
          {album.tracklist.map((t) => (
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
          {album.badge && (
            <span
              className="inline-block font-body text-[9px] tracking-[0.14em] uppercase rounded px-2 py-0.5 mb-2"
              style={{ color: album.accent, border: `1px solid ${album.accent}50`, background: 'rgba(0,0,0,0.45)' }}
            >
              {album.badge}
            </span>
          )}
          <h3
            className="text-white leading-none"
            style={{
              fontFamily: album.stencil ? 'var(--font-stencil)' : 'var(--font-display)',
              fontSize: album.stencil ? 'clamp(1.15rem, 3vw, 1.7rem)' : 'clamp(1.5rem, 3.6vw, 2.2rem)',
              textShadow: '0 2px 16px rgba(0,0,0,0.7)',
            }}
          >
            {album.title}
          </h3>
          <p className="font-body text-[11px] tracking-[0.14em] uppercase mt-1.5" style={{ color: 'rgba(245,245,242,0.55)' }}>
            {album.subtitle}
          </p>
          <p
            className="font-body text-xs leading-relaxed mt-2 max-w-[92%] transition-opacity duration-300"
            style={{ color: 'rgba(245,245,242,0.6)', opacity: hovered ? 1 : 0 }}
            aria-hidden={!hovered}
          >
            {album.short}
          </p>
        </div>

        {/* open affordance */}
        <div
          className="absolute bottom-5 right-5 flex items-center gap-1.5 font-body text-[10px] tracking-[0.2em] uppercase transition-opacity duration-300"
          style={{ color: album.accent, opacity: hovered ? 1 : 0 }}
          aria-hidden
        >
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-[9px]"
            style={{ border: `1px solid ${album.accent}80`, background: `${album.accent}18` }}
          >
            ▶
          </span>
          open
        </div>

        {/* glow ring on hover */}
        <div
          className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-400"
          style={{ boxShadow: `inset 0 0 0 1px ${album.accent}45`, opacity: hovered ? 1 : 0 }}
        />
      </motion.div>
    </motion.button>
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
