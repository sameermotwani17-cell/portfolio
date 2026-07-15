'use client'

import Image from 'next/image'
import type { Album, VaultItem } from '@/lib/projects'

/**
 * RETRO STUDIOS — a film in three movements. Strict black & white, ravens
 * throughout. The graveyard (black, the thesis) → the light (white, the
 * system) → the world cup (the runway: real DK2R campaign frames).
 */

const LOOKS = [
  { src: '/dk2r/dk2r-1.webp', label: 'México — mercado still life' },
  { src: '/dk2r/dk2r-3.webp', label: 'México — the luchador' },
  { src: '/dk2r/dk2r-6.webp', label: 'México — matchday editorial' },
  { src: '/dk2r/dk2r-4.webp', label: 'Morocco — red edition at sundown' },
  { src: '/dk2r/dk2r-2.webp', label: 'México — gloves up' },
  { src: '/dk2r/dk2r-5.webp', label: 'the worldwide drop — one master system' },
]

/* small raven silhouette */
function Raven({ size = 26, flip = false }: { size?: number; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 32 22"
      width={size}
      height={(size * 22) / 32}
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      aria-hidden
    >
      <path
        d="M2 12 Q8 4 15 8 Q18 2 24 3 Q21 6 21 9 Q27 8 30 12 Q24 12 20 14 Q16 20 10 19 Q13 16 12 13 Q6 15 2 12 Z"
        fill="currentColor"
      />
    </svg>
  )
}

/* a drifting flock */
function Flock({ light = false }: { light?: boolean }) {
  const birds = [
    { l: '8%', t: '18%', s: 20, d: 13, delay: 0, flip: false },
    { l: '22%', t: '10%', s: 26, d: 16, delay: 2, flip: false },
    { l: '70%', t: '14%', s: 18, d: 12, delay: 1, flip: true },
    { l: '84%', t: '26%', s: 24, d: 15, delay: 4, flip: true },
    { l: '48%', t: '8%', s: 16, d: 14, delay: 3, flip: false },
  ]
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {birds.map((b, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: b.l,
            top: b.t,
            color: light ? 'rgba(10,10,10,0.75)' : 'rgba(245,245,242,0.8)',
            animation: `butterflyDrift ${b.d}s ease-in-out ${b.delay}s infinite`,
          }}
        >
          <Raven size={b.s} flip={b.flip} />
        </span>
      ))}
    </div>
  )
}

type WorldItem = (Album | VaultItem) & { logo?: string }

export default function RetroWorld({ item }: { item: WorldItem }) {
  const flow = item.detail.flow
  return (
    <div className="bg-black">
      {/* strip */}
      <div className="px-6 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.18)' }}>
        <span className="font-body text-[10px] tracking-[0.35em] uppercase text-white/60">retro studios</span>
        <span className="font-body text-[10px] tracking-[0.35em] uppercase text-white/60">a film in three movements</span>
      </div>

      {/* ── movement i: the graveyard ── */}
      <div className="relative px-6 md:px-12 py-14 md:py-16 text-center overflow-hidden">
        <Flock />
        <Image src="/scenes/retro-raven.webp" alt="Retro Studios raven" width={190} height={190} className="mx-auto w-36 md:w-44 h-auto" />
        <p className="text-lg md:text-xl mt-2 text-white/85" style={{ fontFamily: 'var(--font-scrawl), cursive', transform: 'rotate(-2deg)' }}>
          movement i — the graveyard
        </p>
        <h2 className="font-display text-white leading-none mt-4" style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)' }}>
          {item.title.toUpperCase()}
        </h2>
        <p className="font-body text-[11px] tracking-[0.16em] uppercase mt-2 text-white/45">{item.tag}</p>
        <p className="font-body text-sm md:text-base leading-relaxed max-w-xl mx-auto mt-6 text-white/75">
          {item.detail.overview}
        </p>
        {item.detail.stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mt-8">
            {item.detail.stats.map((stat) => (
              <div key={stat.label} className="rounded-lg px-3 py-3" style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
                <div className="font-display text-2xl md:text-3xl text-white">{stat.value}</div>
                <div className="font-body text-[10px] leading-snug mt-1 text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── movement ii: the light (inverted) ── */}
      <div className="relative px-6 md:px-12 py-12 md:py-14 overflow-hidden" style={{ background: '#f5f5f2' }}>
        <Flock light />
        <p className="text-lg md:text-xl" style={{ fontFamily: 'var(--font-scrawl), cursive', color: '#0a0a0a', transform: 'rotate(-1.5deg)' }}>
          movement ii — then the light.
        </p>
        <h3 className="font-display leading-none mt-3" style={{ color: '#0a0a0a', fontSize: 'clamp(1.6rem, 4vw, 2.6rem)' }}>
          {flow[2]?.headline.toUpperCase()}
        </h3>
        <div className="flex flex-wrap gap-2.5 mt-5 max-w-3xl">
          {flow[2]?.points?.map((p) => (
            <span key={p} className="font-body text-xs md:text-[13px] px-3 py-1.5 rounded-md" style={{ border: '1.5px solid #0a0a0a', color: '#0a0a0a' }}>
              {p}
            </span>
          ))}
        </div>
        <p className="font-body text-sm leading-relaxed max-w-xl mt-6" style={{ color: 'rgba(10,10,10,0.7)' }}>
          {flow[3]?.headline}. {flow[3]?.points?.[0]}.
        </p>
      </div>

      {/* ── movement iii: the world cup — the runway ── */}
      <div className="pt-12">
        <div className="px-6 md:px-12 flex items-baseline justify-between">
          <p className="text-lg md:text-xl text-white/90" style={{ fontFamily: 'var(--font-scrawl), cursive', transform: 'rotate(-1.5deg)' }}>
            movement iii — the world cup.
          </p>
          <span className="font-body text-[10px] tracking-[0.25em] uppercase text-white/40">scroll →</span>
        </div>
        <p className="px-6 md:px-12 font-body text-sm text-white/60 max-w-xl mt-3">
          Real frames from the DK2R campaign — every image AI-generated, art-directed, and
          production-locked by one person. {flow[1]?.points?.[0]}.
        </p>
        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 py-8" style={{ scrollbarWidth: 'thin' }}>
          {LOOKS.map((look, i) => (
            <figure key={look.src} className="snap-start shrink-0 w-[270px] md:w-[330px]" style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}>
              <div className="relative rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.25)' }}>
                <Image
                  src={look.src}
                  alt={look.label}
                  width={660}
                  height={880}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 768px) 80vw, 330px"
                />
                {/* runway spotlight */}
                <div className="absolute inset-x-0 bottom-0 h-1/4 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75), transparent)' }} />
                <span className="absolute top-3 left-3 font-display text-white/90 text-sm tracking-wide bg-black/60 rounded px-2 py-0.5">
                  look {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <figcaption className="font-body text-[11px] tracking-[0.12em] uppercase text-white/55 mt-3 text-center">
                {look.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* ── credits ── */}
      <div className="px-6 md:px-12 pb-8">
        <div className="pt-5 flex flex-wrap items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.18)' }}>
          <div className="flex flex-wrap gap-2">
            {item.tech.map((t) => (
              <span key={t} className="font-body text-[11px] px-2.5 py-1 rounded text-white/60" style={{ border: '1px solid rgba(255,255,255,0.16)' }}>
                {t}
              </span>
            ))}
          </div>
          {item.detail.links?.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[11px] tracking-[0.16em] uppercase px-4 py-2 rounded-md transition-colors hover:bg-white hover:text-black"
              style={{ border: '1.5px solid #fff', color: '#fff' }}
            >
              {link.label} ↗
            </a>
          ))}
        </div>
        <p className="font-body text-[10px] tracking-[0.35em] uppercase text-white/30 text-center mt-6">fin — shot by no one. directed by retro.</p>
      </div>
    </div>
  )
}
