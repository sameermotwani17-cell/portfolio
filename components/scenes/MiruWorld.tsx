'use client'

import Image from 'next/image'
import type { Album, VaultItem } from '@/lib/projects'

/**
 * MIRU (見る — to see) — a 72-hour film in the brand's navy and teal.
 * Cream identity band with the wordmark, then five scenes: the arena,
 * the gap, the engine, the scoring, the podium (the real 銅賞 photo).
 */

const TEAL = '#2ec4b6'
const NAVY = '#16305e'
const DARK = '#0a1526'

/* SCENE III — session state flow */
function StateFlow() {
  const nodes = [
    { x: 18, label: 'mic in' },
    { x: 88, label: '/turn' },
    { x: 158, label: 'state' },
    { x: 228, label: 'adapt' },
  ]
  return (
    <svg viewBox="0 0 300 110" className="w-full" aria-label="Session state flow: mic input to turn endpoint to persistent state to adaptive next question">
      {nodes.map((n, i) => (
        <g key={n.label}>
          <rect x={n.x} y={32} width={56} height={30} rx={8} fill={`${TEAL}14`} stroke={TEAL} strokeWidth={1.8} />
          <text x={n.x + 28} y={51} fontSize={10.5} fill="#fff" fontFamily="monospace" textAnchor="middle">
            {n.label}
          </text>
          {i < nodes.length - 1 && (
            <path d={`M${n.x + 58} 47 L${n.x + 68} 47`} stroke={TEAL} strokeWidth={2} markerEnd="url(#arr)" />
          )}
        </g>
      ))}
      <defs>
        <marker id="arr" viewBox="0 0 8 8" refX={7} refY={4} markerWidth={7} markerHeight={7} orient="auto">
          <path d="M0 0 L8 4 L0 8 Z" fill={TEAL} />
        </marker>
      </defs>
      <path d="M256 64 Q256 96 150 96 Q46 96 46 64" fill="none" stroke={`${TEAL}88`} strokeWidth={1.8} strokeDasharray="5 5" markerEnd="url(#arr)" />
      <text x={150} y={92} fontSize={9} fill="rgba(255,255,255,0.5)" fontFamily="monospace" textAnchor="middle">
        no loops · no premature endings · state persists
      </text>
    </svg>
  )
}

/* SCENE IV — the debrief radar */
function Radar() {
  const axes = ['communication', 'clarity', 'cultural_fit', 'problem_solving']
  const cx = 150
  const cy = 78
  const R = 58
  const pt = (i: number, r: number) => {
    const a = (Math.PI / 2) * i - Math.PI / 2
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
  }
  const scores = [0.85, 0.7, 0.55, 0.78]
  const poly = scores.map((s, i) => pt(i, R * s).map((v) => v.toFixed(1)).join(',')).join(' ')
  return (
    <svg viewBox="0 0 300 160" className="w-full" aria-label="Debrief radar chart across communication, clarity, cultural fit and problem solving">
      {[1, 0.66, 0.33].map((k) => (
        <polygon key={k} points={[0, 1, 2, 3].map((i) => pt(i, R * k).map((v) => v.toFixed(1)).join(',')).join(' ')} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth={1} />
      ))}
      {[0, 1, 2, 3].map((i) => {
        const [x, y] = pt(i, R)
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.14)" strokeWidth={1} />
      })}
      <polygon points={poly} fill={`${TEAL}33`} stroke={TEAL} strokeWidth={2.5} strokeLinejoin="round" />
      {scores.map((s, i) => {
        const [x, y] = pt(i, R * s)
        return <circle key={i} cx={x} cy={y} r={3.5} fill={TEAL} />
      })}
      {axes.map((a, i) => {
        const [x, y] = pt(i, R + 16)
        return (
          <text key={a} x={x} y={y + 3} fontSize={9.5} fill="rgba(255,255,255,0.6)" fontFamily="monospace" textAnchor="middle">
            {a}
          </text>
        )
      })}
      <text x={cx} y={155} fontSize={9} fill="rgba(255,255,255,0.4)" fontFamily="monospace" textAnchor="middle">
        scored quietly, every turn — then explained in English
      </text>
    </svg>
  )
}

/* SCENE II — the culture-gap translation card */
function WaCard() {
  return (
    <div className="rounded-lg p-5" style={{ border: `1px dashed ${TEAL}70`, background: 'rgba(255,255,255,0.02)' }}>
      <div className="flex items-center gap-4">
        <span className="font-display leading-none" style={{ fontSize: '3rem', color: TEAL }}>
          和
        </span>
        <div>
          <p className="font-mono text-sm" style={{ color: '#fff' }}>
            “I want to build my career at your company.”
          </p>
          <p className="font-mono text-xs mt-1.5" style={{ color: TEAL }}>
            → heard as: taking, not giving
          </p>
        </div>
      </div>
      <p className="font-body text-[11px] mt-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
        the same answer lands differently across cultures. MIRU makes the invisible air of a
        Japanese interview visible — then shows you what the interviewer was really thinking.
      </p>
    </div>
  )
}

/* SCENE V — the real podium moment */
function TeamPhoto() {
  return (
    <figure>
      <div className="relative rounded-lg overflow-hidden" style={{ border: `1.5px solid ${TEAL}60` }}>
        <Image
          src="/scenes/miru-team.webp"
          alt="Team MIRU receiving the bronze prize (銅賞) certificate at the Kyutech × Science Tokyo × APU Joint Hackathon 2026"
          width={1000}
          height={1330}
          className="w-full h-auto object-cover"
          sizes="(max-width: 768px) 90vw, 460px"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/5 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(10,21,38,0.8), transparent)' }} />
        <span className="absolute bottom-3 left-3 font-body text-[10px] tracking-[0.2em] uppercase text-white/85 bg-black/50 rounded px-2 py-1">
          銅賞 · the moment
        </span>
      </div>
    </figure>
  )
}

type WorldItem = (Album | VaultItem) & { logo?: string }

const SCENE_ASSETS: (null | (() => JSX.Element))[] = [null, WaCard, StateFlow, Radar, TeamPhoto]

export default function MiruWorld({ item }: { item: WorldItem }) {
  const flow = item.detail.flow
  return (
    <div style={{ background: DARK }}>
      {/* ── production strip ── */}
      <div className="px-6 py-3 flex items-center justify-between" style={{ background: NAVY }}>
        <span className="font-body text-[10px] tracking-[0.35em] uppercase" style={{ color: 'rgba(255,255,255,0.75)' }}>
          team miru presents
        </span>
        <span className="font-body text-[10px] tracking-[0.35em] uppercase" style={{ color: TEAL }}>
          a 72-hour film
        </span>
      </div>

      {/* ── cream identity band, straight off the brand board ── */}
      <div className="relative px-6 md:px-10 py-8" style={{ background: '#faf5e9' }}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Image src="/miru-logo.svg" alt="MIRU wordmark" width={340} height={170} className="w-56 md:w-72 h-auto" />
          <div className="text-center md:text-left">
            {item.badge && (
              <span
                className="inline-block font-body text-[10px] tracking-[0.12em] uppercase rounded px-2.5 py-1 mb-2.5"
                style={{ color: NAVY, border: `1.5px solid ${NAVY}55`, background: `${TEAL}18` }}
              >
                {item.badge}
              </span>
            )}
            <p className="font-body text-[11px] tracking-[0.16em] uppercase" style={{ color: `${NAVY}aa` }}>
              {item.tag}
            </p>
            <p className="font-body text-sm mt-2 max-w-md" style={{ color: `${NAVY}cc` }}>
              見る — to see. an AI interview coach that makes the invisible air of
              Japanese hiring visible.
            </p>
          </div>
        </div>
      </div>

      {/* ── the story ── */}
      <div className="px-6 md:px-10 py-7">
        <p className="text-base mb-2" style={{ fontFamily: 'var(--font-scrawl), cursive', color: TEAL }}>
          the story
        </p>
        <p className="font-body text-sm md:text-[0.95rem] leading-relaxed max-w-3xl" style={{ color: 'rgba(245,245,242,0.8)' }}>
          {item.detail.overview}
        </p>
        {item.detail.links && item.detail.links.length > 0 && (
          <div className="flex flex-wrap gap-2.5 mt-4">
            {item.detail.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[11px] tracking-[0.12em] uppercase rounded-md px-3 py-1.5 transition-colors hover:text-white"
                style={{ color: TEAL, border: `1px solid ${TEAL}55`, background: `${TEAL}0d` }}
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        )}
      </div>

      {/* ── five scenes ── */}
      <div className="px-6 md:px-10 pb-4 flex flex-col gap-8">
        {flow.map((stage, i) => {
          const Asset = SCENE_ASSETS[i]
          return (
            <div
              key={stage.label}
              className={`grid gap-6 md:gap-10 items-center ${Asset ? 'md:grid-cols-2' : ''} ${i % 2 === 1 && Asset ? 'md:[direction:rtl]' : ''}`}
            >
              <div className="md:[direction:ltr]">
                <div className="flex items-center gap-3">
                  <span
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-display text-sm"
                    style={{ border: `2px solid ${TEAL}`, color: '#fff', background: `${TEAL}20` }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-base" style={{ fontFamily: 'var(--font-scrawl), cursive', color: TEAL }}>
                    scene {String(i + 1).padStart(2, '0')} — {stage.label}
                  </span>
                </div>
                <h3 className="font-display text-white leading-tight mt-3" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)' }}>
                  {stage.headline}
                </h3>
                {stage.points && (
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {stage.points.map((p) => (
                      <li key={p} className="flex gap-2.5 font-body text-[13px] leading-relaxed" style={{ color: 'rgba(245,245,242,0.7)' }}>
                        <span aria-hidden className="shrink-0 mt-[8px] w-3 h-[3px]" style={{ background: TEAL }} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {Asset && (
                <div className="md:[direction:ltr]">
                  <Asset />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ── credits ── */}
      <div className="px-6 md:px-10 py-8">
        <div className="pt-5" style={{ borderTop: `1px solid ${TEAL}30` }}>
          <p className="font-body text-[12px] leading-relaxed mb-4" style={{ color: 'rgba(245,245,242,0.55)' }}>
            Team MIRU — Sameer (development: the working voice product, technical design) ·
            Siddik (research & systems) · Jeana (strategy) · Takako (Japanese presentation — the bridge itself).
          </p>
          <div className="flex flex-wrap gap-2">
            {item.tech.map((t) => (
              <span key={t} className="font-body text-[11px] px-2.5 py-1 rounded" style={{ border: `1px solid ${TEAL}30`, color: 'rgba(245,245,242,0.65)', background: `${TEAL}0a` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <p className="font-body text-[10px] tracking-[0.35em] uppercase text-center mt-6" style={{ color: 'rgba(245,245,242,0.3)' }}>
          it doesn&apos;t just listen. it sees.
        </p>
      </div>
    </div>
  )
}
