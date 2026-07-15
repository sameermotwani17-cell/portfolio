'use client'

import Image from 'next/image'
import type { Album, VaultItem } from '@/lib/projects'

/**
 * The Stick'Em cinema experience — a landscape world built from the brand's
 * chopsticks. Acts unroll horizontally like film scenes; every icon is
 * constructed from chopstick primitives. Purple + wood + white, letterboxed.
 */

const PURPLE = '#a855f7'
const WOOD_A = '#d2a878'
const WOOD_B = '#a8794a'

// ─── chopstick-built icons ────────────────────────────────────────────────────

function Stick({ x, y, len, angle, w = 7 }: { x: number; y: number; len: number; angle: number; w?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`}>
      <rect x={0} y={-w / 2} width={len} height={w} rx={w / 2} fill="url(#wood)" />
      <rect x={len * 0.72} y={-w / 2} width={len * 0.28} height={w} rx={w / 2} fill={WOOD_B} opacity={0.55} />
    </g>
  )
}

function WoodDefs() {
  return (
    <defs>
      <linearGradient id="wood" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor={WOOD_A} />
        <stop offset="100%" stopColor={WOOD_B} />
      </linearGradient>
    </defs>
  )
}

/* ACT I — the problem: a cracked slide, chopsticks crossed like a warning */
function IconBroken() {
  return (
    <svg viewBox="0 0 140 110" className="w-28 h-24" aria-hidden>
      <WoodDefs />
      <Stick x={18} y={92} len={110} angle={-38} />
      <Stick x={112} y={96} len={110} angle={-141} />
      <rect x={40} y={26} width={60} height={44} rx={5} fill="#161616" stroke={PURPLE} strokeWidth={2.5} />
      <path d="M55 26 l10 16 -8 10 12 18" stroke="#f5f5f2" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <text x={70} y={100} textAnchor="middle" fontSize="9" fill="rgba(245,245,242,0.5)" fontFamily="monospace">
        10s+ · black screen
      </text>
    </svg>
  )
}

/* ACT II — the rebuild: a chopstick robot carrying a fresh WebP tile */
function IconChopbot() {
  return (
    <svg viewBox="0 0 140 110" className="w-28 h-24" aria-hidden>
      <WoodDefs />
      {/* legs */}
      <Stick x={52} y={102} len={34} angle={-75} w={6} />
      <Stick x={78} y={102} len={34} angle={-105} w={6} />
      {/* body */}
      <rect x={44} y={42} width={44} height={30} rx={6} fill="#161616" stroke={PURPLE} strokeWidth={2.5} />
      <circle cx={58} cy={57} r={3.5} fill={PURPLE} />
      <circle cx={74} cy={57} r={3.5} fill={PURPLE} />
      {/* antenna */}
      <Stick x={64} y={40} len={18} angle={-90} w={4} />
      <circle cx={64} cy={20} r={4} fill={PURPLE} />
      {/* arm hoisting a webp tile */}
      <Stick x={88} y={52} len={34} angle={-30} w={6} />
      <rect x={112} y={22} width={24} height={18} rx={3} fill="#f5f5f2" />
      <text x={124} y={34} textAnchor="middle" fontSize="8" fontWeight="bold" fill={PURPLE} fontFamily="monospace">
        webp
      </text>
    </svg>
  )
}

/* ACT III — the viewer: chopsticks gripping a stack of slides like sushi */
function IconStack() {
  return (
    <svg viewBox="0 0 140 110" className="w-28 h-24" aria-hidden>
      <WoodDefs />
      <Stick x={12} y={30} len={116} angle={14} />
      <Stick x={14} y={58} len={116} angle={2} />
      <g transform="rotate(6 70 55)">
        <rect x={46} y={30} width={48} height={12} rx={3} fill="#f5f5f2" opacity={0.45} />
        <rect x={44} y={46} width={52} height={13} rx={3} fill="#f5f5f2" opacity={0.75} />
        <rect x={42} y={63} width={56} height={14} rx={3} fill="#f5f5f2" />
        <text x={70} y={73.5} textAnchor="middle" fontSize="8.5" fontWeight="bold" fill={PURPLE} fontFamily="monospace">
          slide ±2
        </text>
      </g>
    </svg>
  )
}

/* ACT IV — the receipts: chopsticks presenting the stopwatch */
function IconStopwatch() {
  return (
    <svg viewBox="0 0 140 110" className="w-28 h-24" aria-hidden>
      <WoodDefs />
      <Stick x={8} y={96} len={58} angle={-42} w={6} />
      <Stick x={132} y={96} len={58} angle={-138} w={6} />
      <circle cx={70} cy={50} r={30} fill="#161616" stroke={PURPLE} strokeWidth={3} />
      <rect x={65} y={12} width={10} height={7} rx={2} fill={PURPLE} />
      <path d="M70 50 L70 32" stroke="#f5f5f2" strokeWidth={3} strokeLinecap="round" />
      <path d="M70 50 L82 56" stroke={PURPLE} strokeWidth={3} strokeLinecap="round" />
      <text x={70} y={97} textAnchor="middle" fontSize="12" fontWeight="bold" fill={PURPLE} fontFamily="var(--font-display)">
        678ms
      </text>
    </svg>
  )
}

const ACT_ICONS = [IconBroken, IconChopbot, IconStack, IconStopwatch]
const ROMAN = ['I', 'II', 'III', 'IV', 'V']

/* film sprocket strip */
function Sprockets() {
  return (
    <div className="flex items-center gap-3 opacity-50" aria-hidden>
      {Array.from({ length: 14 }).map((_, i) => (
        <span key={i} className="w-2.5 h-3.5 rounded-[3px] shrink-0" style={{ background: 'rgba(245,245,242,0.28)' }} />
      ))}
    </div>
  )
}

type CinemaItem = (Album | VaultItem) & { logo?: string }

export default function StickemCinema({ item }: { item: CinemaItem }) {
  return (
    <div>
      {/* ── letterbox top: production strip ── */}
      <div className="bg-black px-6 py-3 flex items-center justify-between gap-4 overflow-hidden">
        <Sprockets />
        <p className="font-body text-[10px] tracking-[0.35em] uppercase whitespace-nowrap" style={{ color: PURPLE }}>
          stick&apos;em pictures presents
        </p>
        <Sprockets />
      </div>

      {/* ── wide title frame ── */}
      <div
        className="relative overflow-hidden px-8 py-10 md:py-12"
        style={{ background: `radial-gradient(ellipse 80% 100% at 50% 0%, ${PURPLE}30, transparent 65%), linear-gradient(150deg, #17091f 0%, #0b0510 60%, #080808 100%)` }}
      >
        {/* giant crossed chopsticks behind everything */}
        <svg viewBox="0 0 800 240" className="absolute inset-0 w-full h-full opacity-[0.16]" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <WoodDefs />
          <Stick x={-40} y={225} len={880} angle={-14} w={16} />
          <Stick x={-60} y={140} len={900} angle={-4} w={16} />
        </svg>
        {/* film grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
            animation: 'filmGrain 0.18s steps(1) infinite',
          }}
          aria-hidden
        />
        <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-10">
          {item.logo && (
            <Image src={item.logo} alt="Stick'Em logo" width={220} height={180} className="w-36 md:w-44 h-auto object-contain drop-shadow-[0_10px_30px_rgba(168,85,247,0.35)]" />
          )}
          <div className="text-center md:text-left">
            {item.badge && (
              <span
                className="inline-block font-body text-[10px] tracking-[0.14em] uppercase rounded px-2.5 py-1 mb-3"
                style={{ color: PURPLE, border: `1px solid ${PURPLE}45`, background: `${PURPLE}12` }}
              >
                {item.badge}
              </span>
            )}
            <h2 className="font-display text-white leading-none" style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}>
              {item.title}
            </h2>
            <p className="font-body text-[11px] md:text-xs tracking-[0.16em] uppercase mt-2" style={{ color: 'rgba(245,245,242,0.5)' }}>
              {item.tag}
            </p>
          </div>
        </div>
      </div>

      {/* ── overview + box office (landscape two-column) ── */}
      <div className="grid md:grid-cols-[1.25fr_1fr] gap-6 md:gap-10 px-6 md:px-10 py-7">
        <div>
          <p className="text-base mb-2" style={{ fontFamily: 'var(--font-scrawl), cursive', color: PURPLE }}>
            the plot
          </p>
          <p className="font-body text-sm md:text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,245,242,0.8)' }}>
            {item.detail.overview}
          </p>
          {item.detail.links && item.detail.links.length > 0 && (
            <div className="flex flex-wrap gap-2.5 mt-5">
              {item.detail.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-[11px] tracking-[0.12em] uppercase rounded-md px-3 py-1.5 transition-colors hover:text-white"
                  style={{ color: PURPLE, border: `1px solid ${PURPLE}50`, background: `${PURPLE}0d` }}
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
        {item.detail.stats && (
          <div>
            <p className="text-base mb-2" style={{ fontFamily: 'var(--font-scrawl), cursive', color: PURPLE }}>
              box office
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {item.detail.stats.map((stat) => (
                <div key={stat.label} className="rounded-lg px-3 py-2.5" style={{ background: `${PURPLE}0c`, border: `1px solid ${PURPLE}30` }}>
                  <div className="font-display text-xl md:text-2xl" style={{ color: PURPLE }}>
                    {stat.value}
                  </div>
                  <div className="font-body text-[10px] leading-snug mt-1" style={{ color: 'rgba(245,245,242,0.5)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── THE ACTS: horizontal film-strip journey ── */}
      <div className="px-6 md:px-10 pb-2">
        <div className="flex items-baseline justify-between mb-4">
          <p className="text-base" style={{ fontFamily: 'var(--font-scrawl), cursive', color: PURPLE }}>
            the journey — act by act
          </p>
          <span className="font-body text-[10px] tracking-[0.25em] uppercase" style={{ color: 'rgba(245,245,242,0.35)' }}>
            scroll →
          </span>
        </div>
      </div>
      <div className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-6 md:px-10 pb-8" style={{ scrollbarWidth: 'thin' }}>
        {item.detail.flow.map((stage, i) => {
          const Icon = ACT_ICONS[i % ACT_ICONS.length]
          return (
            <div
              key={stage.label}
              className="relative snap-start shrink-0 w-[290px] md:w-[360px] rounded-xl p-6 overflow-hidden"
              style={{ background: `linear-gradient(160deg, ${PURPLE}14 0%, rgba(10,6,14,0.9) 55%)`, border: `1px solid ${PURPLE}30` }}
            >
              {/* act numeral, ghosted */}
              <span
                aria-hidden
                className="absolute -top-3 right-2 font-display leading-none select-none"
                style={{ fontSize: '5.5rem', color: 'transparent', WebkitTextStroke: `1.5px ${PURPLE}40` }}
              >
                {ROMAN[i]}
              </span>
              <p className="font-body text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: PURPLE }}>
                act {ROMAN[i].toLowerCase()} — {stage.label}
              </p>
              <Icon />
              {/* chopstick shelf */}
              <svg viewBox="0 0 320 14" className="w-full h-3 my-3" preserveAspectRatio="none" aria-hidden>
                <WoodDefs />
                <rect x={0} y={4} width={320} height={6} rx={3} fill="url(#wood)" opacity={0.8} />
              </svg>
              <h4 className="font-display text-white leading-tight" style={{ fontSize: 'clamp(1.05rem, 2.4vw, 1.35rem)' }}>
                {stage.headline}
              </h4>
              {stage.points && (
                <ul className="mt-3 flex flex-col gap-1.5">
                  {stage.points.map((p) => (
                    <li key={p} className="flex gap-2 font-body text-[12px] leading-relaxed" style={{ color: 'rgba(245,245,242,0.68)' }}>
                      <span aria-hidden className="shrink-0 mt-[7px] w-3 h-[3px] rounded-full" style={{ background: WOOD_A }} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </div>

      {/* ── credits: stack ── */}
      <div className="px-6 md:px-10 pb-7">
        <div className="pt-5" style={{ borderTop: `1px solid ${PURPLE}22` }}>
          <div className="font-body text-[10px] tracking-[0.22em] uppercase mb-3" style={{ color: 'rgba(245,245,242,0.35)' }}>
            credits — the stack
          </div>
          <div className="flex flex-wrap gap-2">
            {item.tech.map((t) => (
              <span
                key={t}
                className="font-body text-[11px] px-2.5 py-1 rounded"
                style={{ border: `1px solid ${PURPLE}26`, color: 'rgba(245,245,242,0.65)', background: `${PURPLE}08` }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── letterbox bottom ── */}
      <div className="bg-black px-6 py-3 flex items-center justify-center gap-4 overflow-hidden">
        <Sprockets />
        <p className="font-body text-[9px] tracking-[0.3em] uppercase whitespace-nowrap" style={{ color: 'rgba(245,245,242,0.3)' }}>
          fin
        </p>
        <Sprockets />
      </div>
    </div>
  )
}
