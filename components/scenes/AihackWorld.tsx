'use client'

import Image from 'next/image'
import type { Album, VaultItem } from '@/lib/projects'

/**
 * AI HACK 2026 — the storyline, in AIFUL red and white. Five chapters:
 * the arena, the drift diagnosis, the leaderboard climb, the lost-codebase
 * crisis, and Kyoto. Every asset is code-drawn: the drift chart, the
 * leaderboard, the recovery equation, the torii gate.
 */

const RED = '#e0242c'
const DARK = '#160607'

/* red ribbon stripes — the identity motif */
function Stripes({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden>
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${-20 + i * 14} 70 Q 40 ${34 - i * 12} 130 ${18 - i * 6}`}
          stroke={RED}
          strokeWidth={7}
          fill="none"
          strokeLinecap="round"
          opacity={1 - i * 0.25}
        />
      ))}
    </svg>
  )
}

/* CH II — the drift chart: fold AUC falling across application-date cohorts */
function DriftChart() {
  // cohort AUCs interpolated between the documented endpoints 0.7738 → 0.6860
  const pts = [0.7738, 0.762, 0.748, 0.729, 0.706, 0.686]
  const x = (i: number) => 34 + i * 46
  const y = (v: number) => 24 + (0.78 - v) * 900
  const path = pts.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)} ${y(v).toFixed(1)}`).join(' ')
  return (
    <svg viewBox="0 0 300 140" className="w-full" aria-label="Fold AUC degrading from 0.774 on early cohorts to 0.686 on late cohorts">
      {/* gridlines */}
      {[0.77, 0.74, 0.71, 0.68].map((g) => (
        <g key={g}>
          <line x1={30} x2={288} y1={y(g)} y2={y(g)} stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
          <text x={2} y={y(g) + 3} fontSize={9} fill="rgba(255,255,255,0.45)" fontFamily="monospace">
            {g.toFixed(2)}
          </text>
        </g>
      ))}
      {/* the fall */}
      <path d={path} stroke={RED} strokeWidth={3} fill="none" strokeLinecap="round" />
      {pts.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r={4} fill={i === 0 || i === pts.length - 1 ? RED : DARK} stroke={RED} strokeWidth={2} />
      ))}
      <text x={x(0) - 4} y={y(pts[0]) - 10} fontSize={11} fontWeight="bold" fill="#fff" fontFamily="monospace">
        0.774
      </text>
      <text x={x(5) - 30} y={y(pts[5]) + 20} fontSize={11} fontWeight="bold" fill={RED} fontFamily="monospace">
        0.686
      </text>
      <text x={160} y={136} fontSize={9} fill="rgba(255,255,255,0.45)" fontFamily="monospace" textAnchor="middle">
        application-date cohorts → time
      </text>
    </svg>
  )
}

/* CH III — the public leaderboard, mid-competition flash */
function Leaderboard() {
  const rows = [
    { rank: 1, name: 'team_quant_msc', auc: '0.7641', us: false },
    { rank: 2, name: 'STARLABS', auc: '0.7635', us: true },
    { rank: 3, name: 'phd_ensemble', auc: '0.7629', us: false },
    { rank: 4, name: 'mathfin_lab', auc: '0.7611', us: false },
  ]
  return (
    <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${RED}40` }}>
      <div className="px-4 py-2 flex justify-between font-body text-[9px] tracking-[0.25em] uppercase" style={{ background: `${RED}18`, color: 'rgba(255,255,255,0.6)' }}>
        <span>public leaderboard — mid-competition</span>
        <span>auc</span>
      </div>
      {rows.map((r) => (
        <div
          key={r.rank}
          className="px-4 py-2.5 flex items-center gap-3 font-body text-xs"
          style={{
            background: r.us ? RED : 'rgba(255,255,255,0.02)',
            color: r.us ? '#fff' : 'rgba(255,255,255,0.55)',
            fontWeight: r.us ? 700 : 400,
          }}
        >
          <span className="w-5 font-display text-sm">{r.rank}</span>
          <span className="flex-1 tracking-wide">{r.name}</span>
          <span className="font-mono">{r.auc}</span>
          {r.us && <span className="text-[9px] tracking-[0.2em] uppercase bg-black/25 rounded px-1.5 py-0.5">freshmen</span>}
        </div>
      ))}
      <p className="px-4 py-2 font-body text-[10px]" style={{ color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.02)' }}>
        illustrative board — StarLabs peak 0.7635, briefly #2 · finished prelims 4th
      </p>
    </div>
  )
}

/* CH IV — the recovery equation */
function RecoveryEquation() {
  return (
    <div className="rounded-lg p-5 text-center" style={{ border: `1px dashed ${RED}70`, background: 'rgba(255,255,255,0.02)' }}>
      <p className="font-mono text-sm md:text-base" style={{ color: '#fff' }}>
        rank(submission) = R · w
      </p>
      <p className="font-mono text-lg md:text-xl mt-2 font-bold" style={{ color: RED }}>
        ⇒ solve for w
      </p>
      <p className="font-body text-[11px] mt-3 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
        the code was gone. the outputs weren&apos;t. blend weights recovered by solving
        linear systems over submitted rank arrays — the pipeline rebuilt from its own fingerprint.
      </p>
    </div>
  )
}

/* CH V — torii gate for Kyoto */
function Torii() {
  return (
    <svg viewBox="0 0 160 120" className="w-36 md:w-44 mx-auto" aria-hidden>
      <path d="M10 26 Q80 12 150 26 L146 38 Q80 26 14 38 Z" fill={RED} />
      <rect x={26} y={48} width={108} height={9} rx={2} fill={RED} />
      <rect x={38} y={38} width={10} height={78} rx={2} fill={RED} transform="rotate(-2 43 77)" />
      <rect x={112} y={38} width={10} height={78} rx={2} fill={RED} transform="rotate(2 117 77)" />
      <rect x={75} y={26} width={10} height={22} rx={2} fill={RED} />
    </svg>
  )
}

type WorldItem = (Album | VaultItem) & { logo?: string }

const CHAPTER_ASSETS: (null | (() => JSX.Element))[] = [null, DriftChart, Leaderboard, RecoveryEquation, Torii]

export default function AihackWorld({ item }: { item: WorldItem }) {
  const flow = item.detail.flow
  return (
    <div style={{ background: DARK }}>
      {/* ── white identity band ── */}
      <div className="relative px-6 md:px-10 py-8 overflow-hidden" style={{ background: '#fff' }}>
        <Stripes className="absolute -right-4 -top-2 w-44 md:w-56 opacity-90" />
        <Stripes className="absolute -left-10 bottom-0 w-40 opacity-25" />
        <div className="relative flex flex-col md:flex-row items-center gap-6">
          {item.logo && (
            <Image src={item.logo} alt="AIFUL mark" width={110} height={110} className="w-20 md:w-24 h-auto object-contain" />
          )}
          <div className="text-center md:text-left">
            {item.badge && (
              <span className="inline-block font-body text-[10px] tracking-[0.14em] uppercase rounded px-2.5 py-1 mb-2.5" style={{ color: RED, border: `1.5px solid ${RED}`, background: `${RED}0d` }}>
                {item.badge}
              </span>
            )}
            <h2 className="font-display leading-none" style={{ color: '#14090a', fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}>
              {item.title}
            </h2>
            <p className="font-body text-[11px] tracking-[0.16em] uppercase mt-2" style={{ color: 'rgba(20,9,10,0.6)' }}>
              {item.tag}
            </p>
          </div>
        </div>
      </div>

      {/* ── overview + scoreboard ── */}
      <div className="grid md:grid-cols-[1.25fr_1fr] gap-6 md:gap-10 px-6 md:px-10 py-8">
        <div>
          <p className="text-base mb-2" style={{ fontFamily: 'var(--font-scrawl), cursive', color: RED }}>
            the story
          </p>
          <p className="font-body text-sm md:text-[0.95rem] leading-relaxed" style={{ color: 'rgba(255,255,255,0.82)' }}>
            {item.detail.overview}
          </p>
        </div>
        {item.detail.stats && (
          <div className="grid grid-cols-2 gap-2.5">
            {item.detail.stats.map((stat) => (
              <div key={stat.label} className="rounded-lg px-3 py-2.5" style={{ background: `${RED}10`, border: `1px solid ${RED}45` }}>
                <div className="font-display text-xl md:text-2xl" style={{ color: RED }}>
                  {stat.value}
                </div>
                <div className="font-body text-[10px] leading-snug mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── the five chapters ── */}
      <div className="px-6 md:px-10 pb-4 flex flex-col gap-8">
        {flow.map((stage, i) => {
          const Asset = CHAPTER_ASSETS[i]
          return (
            <div
              key={stage.label}
              className={`grid gap-6 md:gap-10 items-center ${Asset ? 'md:grid-cols-2' : ''} ${i % 2 === 1 && Asset ? 'md:[direction:rtl]' : ''}`}
            >
              <div className="md:[direction:ltr]">
                <div className="flex items-center gap-3">
                  <span
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-display text-sm"
                    style={{ border: `2px solid ${RED}`, color: '#fff', background: `${RED}22` }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-base" style={{ fontFamily: 'var(--font-scrawl), cursive', color: RED }}>
                    {stage.label}
                  </span>
                </div>
                <h3 className="font-display text-white leading-tight mt-3" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.8rem)' }}>
                  {stage.headline}
                </h3>
                {stage.points && (
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {stage.points.map((p) => (
                      <li key={p} className="flex gap-2.5 font-body text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        <span aria-hidden className="shrink-0 mt-[8px] w-3 h-[3px]" style={{ background: RED }} />
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
        <div className="pt-5" style={{ borderTop: `1px solid ${RED}35` }}>
          <p className="font-body text-[12px] leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Team StarLabs — Sameer (lead modeler, validation design, bilingual documentation) ·
            Ken (co-modeler) · Momoka (Japanese-language final presentation, Kyoto).
          </p>
          <div className="flex flex-wrap gap-2">
            {item.tech.map((t) => (
              <span key={t} className="font-body text-[11px] px-2.5 py-1 rounded" style={{ border: `1px solid ${RED}35`, color: 'rgba(255,255,255,0.65)', background: `${RED}0a` }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <p className="font-body text-[10px] tracking-[0.35em] uppercase text-center mt-6" style={{ color: 'rgba(255,255,255,0.3)' }}>
          the gap to close is experience — not fundamentals.
        </p>
      </div>
    </div>
  )
}
