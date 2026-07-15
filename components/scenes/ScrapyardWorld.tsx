'use client'

import Image from 'next/image'
import type { Album, VaultItem } from '@/lib/projects'

/**
 * SCRAPYARD — the case study as a playable-feeling match lobby. Wide,
 * explorable like the yard itself: HUD chrome, killfeed, drifting smoke,
 * fire-glow flicker, splatter hit-markers, and zones you scroll through
 * horizontally across a live panorama.
 */

const YELLOW = '#eab308'
const RUST = '#b45309'

const KILLFEED = [
  'RETRO dropped BOT_04 · headshot',
  'BOT_02 walked into the container lane',
  'RETRO is on a 5 streak',
  'BOT_07 respawning in 3…',
  'RETRO dropped BOT_01 · 340ms ttk',
]

function Crosshair({ size = 60 }: { size?: number }) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size} aria-hidden>
      <circle cx={30} cy={30} r={18} fill="none" stroke={YELLOW} strokeWidth={2.5} opacity={0.9} />
      <circle cx={30} cy={30} r={2.5} fill={YELLOW} />
      {[
        [30, 2, 30, 14],
        [30, 46, 30, 58],
        [2, 30, 14, 30],
        [46, 30, 58, 30],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={YELLOW} strokeWidth={3} strokeLinecap="round" />
      ))}
    </svg>
  )
}

function Ammo({ size = 60 }: { size?: number }) {
  return (
    <svg viewBox="0 0 70 60" width={size + 10} height={size} aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${8 + i * 15} ${10 + (i % 2) * 4})`}>
          <rect x={0} y={14} width={9} height={26} rx={2} fill={RUST} />
          <path d="M0 14 Q4.5 0 9 14 Z" fill={YELLOW} />
        </g>
      ))}
    </svg>
  )
}

function RadioTower({ size = 60 }: { size?: number }) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size} aria-hidden>
      <path d="M22 54 L30 12 L38 54" fill="none" stroke={YELLOW} strokeWidth={2.5} strokeLinejoin="round" />
      <line x1={25} y1={40} x2={35} y2={40} stroke={YELLOW} strokeWidth={2} />
      <line x1={26.5} y1={30} x2={33.5} y2={30} stroke={YELLOW} strokeWidth={2} />
      <circle cx={30} cy={10} r={3} fill={YELLOW} />
      <path d="M18 12 Q30 -2 42 12" fill="none" stroke={RUST} strokeWidth={2.5} strokeLinecap="round" />
      <path d="M22 14 Q30 5 38 14" fill="none" stroke={RUST} strokeWidth={2} strokeLinecap="round" opacity={0.8} />
    </svg>
  )
}

function VictoryFlag({ size = 60 }: { size?: number }) {
  return (
    <svg viewBox="0 0 60 60" width={size} height={size} aria-hidden>
      <line x1={18} y1={6} x2={18} y2={56} stroke={RUST} strokeWidth={3.5} strokeLinecap="round" />
      <path d="M20 8 L48 14 L20 24 Z" fill={YELLOW} />
      <text x={30} y={48} fontSize="11" fontFamily="var(--font-stencil)" fill={YELLOW}>
        GG
      </text>
    </svg>
  )
}

const ZONE_ICONS = [Crosshair, Ammo, RadioTower, VictoryFlag]

/* drifting smoke puffs — pure CSS, transform-only */
function Smoke() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {[
        { l: '5%', t: '30%', s: 180, d: 26, delay: 0 },
        { l: '45%', t: '15%', s: 240, d: 34, delay: 6 },
        { l: '75%', t: '40%', s: 200, d: 30, delay: 12 },
      ].map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.l,
            top: p.t,
            width: p.s,
            height: p.s * 0.55,
            background: 'radial-gradient(ellipse, rgba(200,190,180,0.14), transparent 70%)',
            filter: 'blur(18px)',
            animation: `smokeDrift ${p.d}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

type WorldItem = (Album | VaultItem) & { logo?: string }

export default function ScrapyardWorld({ item }: { item: WorldItem }) {
  return (
    <div style={{ background: '#0c0a05' }}>
      {/* ── HUD top bar ── */}
      <div className="bg-black px-5 py-2.5 flex items-center justify-between gap-4 font-stencil text-[11px] tracking-[0.2em]" style={{ color: YELLOW }}>
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#22c55e' }} />
          SERVER: LIVE
        </span>
        <span className="hidden md:block">FFA DEATHMATCH · FIRST TO 30</span>
        <span>30HZ TICK</span>
      </div>

      {/* ── title frame: the burning yard, slowly panning ── */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <div className="absolute inset-0" style={{ animation: 'yardPan 42s ease-in-out infinite alternate', width: '115%' }}>
          <Image src="/scenes/scrap-burn.webp" alt="" aria-hidden fill className="object-cover" sizes="1200px" />
        </div>
        {/* fire flicker glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 40% 50% at 12% 75%, rgba(249,115,22,0.35), transparent 70%)', animation: 'heatPulse 2.8s ease-in-out infinite' }}
        />
        <Smoke />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #0c0a05 6%, transparent 55%)' }} />
        <div className="absolute inset-x-0 bottom-0 p-6 md:px-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            {item.badge && (
              <span className="inline-block font-body text-[10px] tracking-[0.14em] uppercase rounded px-2.5 py-1 mb-3" style={{ color: YELLOW, border: `1px solid ${YELLOW}55`, background: 'rgba(0,0,0,0.5)' }}>
                {item.badge}
              </span>
            )}
            <h2 className="font-stencil text-white leading-none" style={{ fontSize: 'clamp(2.2rem, 6vw, 4.2rem)', textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}>
              {item.title}
            </h2>
            <p className="font-body text-[11px] tracking-[0.16em] uppercase mt-2" style={{ color: 'rgba(245,245,242,0.55)' }}>
              {item.tag}
            </p>
          </div>
          {item.detail.links?.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-stencil text-sm tracking-[0.15em] px-6 py-3 rounded-md transition-transform hover:scale-[1.04]"
              style={{ background: YELLOW, color: '#131006', boxShadow: `0 0 40px ${YELLOW}44` }}
            >
              ▶ {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* ── killfeed ticker ── */}
      <div className="relative overflow-hidden py-2" style={{ borderTop: `1px solid ${YELLOW}30`, borderBottom: `1px solid ${YELLOW}30`, background: 'rgba(0,0,0,0.5)' }}>
        <div className="flex gap-10 whitespace-nowrap" style={{ animation: 'killfeed 28s linear infinite', width: 'max-content' }} aria-hidden>
          {[...KILLFEED, ...KILLFEED].map((k, i) => (
            <span key={i} className="font-body text-[11px] tracking-[0.1em] uppercase" style={{ color: i % 3 === 0 ? YELLOW : 'rgba(245,245,242,0.45)' }}>
              ⊕ {k}
            </span>
          ))}
        </div>
      </div>

      {/* ── briefing + match stats ── */}
      <div className="grid md:grid-cols-[1.25fr_1fr] gap-6 md:gap-10 px-6 md:px-10 py-7">
        <div>
          <p className="font-stencil text-sm tracking-[0.2em] mb-2" style={{ color: YELLOW }}>
            MISSION BRIEFING
          </p>
          <p className="font-body text-sm md:text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,245,242,0.8)' }}>
            {item.detail.overview}
          </p>
        </div>
        {item.detail.stats && (
          <div>
            <p className="font-stencil text-sm tracking-[0.2em] mb-2" style={{ color: YELLOW }}>
              MATCH STATS
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {item.detail.stats.map((stat) => (
                <div key={stat.label} className="rounded-md px-3 py-2.5" style={{ background: `${YELLOW}0d`, border: `1px solid ${YELLOW}35` }}>
                  <div className="font-stencil text-xl md:text-2xl" style={{ color: YELLOW }}>
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

      {/* ── THE YARD: horizontal explorable zone map ── */}
      <div className="px-6 md:px-10">
        <div className="flex items-baseline justify-between mb-3">
          <p className="font-stencil text-sm tracking-[0.2em]" style={{ color: YELLOW }}>
            EXPLORE THE YARD
          </p>
          <span className="font-body text-[10px] tracking-[0.25em] uppercase" style={{ color: 'rgba(245,245,242,0.35)' }}>
            scroll →
          </span>
        </div>
      </div>
      <div className="relative overflow-x-auto snap-x snap-mandatory" style={{ scrollbarWidth: 'thin' }}>
        {/* one continuous panorama behind the zones */}
        <div className="relative flex gap-6 px-6 md:px-10 py-8 w-max" style={{ minWidth: '100%' }}>
          <div className="absolute inset-0 -z-0">
            <Image src="/scenes/scrap-yard.webp" alt="" aria-hidden fill className="object-cover opacity-45" sizes="2400px" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(12,10,5,0.85), rgba(12,10,5,0.35) 45%, rgba(12,10,5,0.9))' }} />
          </div>
          {item.detail.flow.map((stage, i) => {
            const Icon = ZONE_ICONS[i % ZONE_ICONS.length]
            return (
              <div
                key={stage.label}
                className="relative z-[1] snap-start shrink-0 w-[290px] md:w-[360px] rounded-lg p-6 overflow-hidden backdrop-blur-[2px]"
                style={{ background: 'rgba(10,8,3,0.78)', border: `1px solid ${YELLOW}40` }}
              >
                {/* splatter hit-marker behind the zone number */}
                <div
                  aria-hidden
                  className="absolute -top-6 -right-6 w-32 h-32 opacity-40 mix-blend-screen"
                  style={{ backgroundImage: 'url(/scenes/splatter-burst.webp)', backgroundSize: 'cover', filter: 'hue-rotate(15deg) saturate(1.3)' }}
                />
                <p className="font-stencil text-[11px] tracking-[0.25em] mb-3" style={{ color: YELLOW }}>
                  ZONE {String(i + 1).padStart(2, '0')} — {stage.label.toUpperCase()}
                </p>
                <Icon size={56} />
                <h4 className="font-stencil text-white leading-tight mt-3" style={{ fontSize: 'clamp(1rem, 2.2vw, 1.25rem)' }}>
                  {stage.headline}
                </h4>
                {stage.points && (
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {stage.points.map((p) => (
                      <li key={p} className="flex gap-2 font-body text-[12px] leading-relaxed" style={{ color: 'rgba(245,245,242,0.7)' }}>
                        <span aria-hidden className="shrink-0 mt-[6px] w-2 h-2 rotate-45" style={{ background: YELLOW, opacity: 0.7 }} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* ── loadout ── */}
      <div className="px-6 md:px-10 py-7">
        <div className="pt-5" style={{ borderTop: `1px solid ${YELLOW}25` }}>
          <div className="font-stencil text-[11px] tracking-[0.25em] mb-3" style={{ color: 'rgba(245,245,242,0.4)' }}>
            LOADOUT — THE STACK
          </div>
          <div className="flex flex-wrap gap-2">
            {item.tech.map((t) => (
              <span key={t} className="font-body text-[11px] px-2.5 py-1 rounded" style={{ border: `1px solid ${YELLOW}30`, color: 'rgba(245,245,242,0.65)', background: `${YELLOW}0a` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── match over ── */}
      <div className="bg-black px-6 py-3 text-center">
        <span className="font-stencil text-[11px] tracking-[0.4em]" style={{ color: YELLOW }}>
          MATCH OVER — VICTORY
        </span>
      </div>
    </div>
  )
}
