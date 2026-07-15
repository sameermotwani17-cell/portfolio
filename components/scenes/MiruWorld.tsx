'use client'

import type { Album, VaultItem } from '@/lib/projects'

/**
 * MIRU (見る — to see) — the storyline in evaluator teal. Five chapters:
 * the brief, the engine, the scoring, the culture layer, the podium.
 * Assets are code-drawn: the eye, the session state flow, the debrief
 * radar, the 和 translation card, and the podium.
 */

const TEAL = '#14b8a6'
const DARK = '#04100e'

/* the mark — an evaluating eye */
function Eye({ size = 88 }: { size?: number }) {
  return (
    <svg viewBox="0 0 120 70" width={size} height={(size * 70) / 120} aria-hidden>
      <path d="M6 35 Q60 -8 114 35 Q60 78 6 35 Z" fill="none" stroke={TEAL} strokeWidth={4} />
      <circle cx={60} cy={35} r={16} fill={`${TEAL}22`} stroke={TEAL} strokeWidth={4} />
      <circle cx={60} cy={35} r={6} fill={TEAL} />
      <path d="M60 8 L60 0 M84 14 L89 7 M36 14 L31 7" stroke={TEAL} strokeWidth={3} strokeLinecap="round" />
    </svg>
  )
}

/* CH II — session state flow */
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
      {/* loop back */}
      <path d="M256 64 Q256 96 150 96 Q46 96 46 64" fill="none" stroke={`${TEAL}88`} strokeWidth={1.8} strokeDasharray="5 5" markerEnd="url(#arr)" />
      <text x={150} y={92} fontSize={9} fill="rgba(255,255,255,0.5)" fontFamily="monospace" textAnchor="middle">
        no loops · no premature endings · state persists
      </text>
    </svg>
  )
}

/* CH III — the debrief radar */
function Radar() {
  const axes = ['communication', 'clarity', 'cultural_fit', 'problem_solving']
  const cx = 150
  const cy = 78
  const R = 58
  const pt = (i: number, r: number) => {
    const a = (Math.PI / 2) * i - Math.PI / 2
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
  }
  const scores = [0.85, 0.7, 0.55, 0.78] // illustrative turn scores
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
        scored 0–10, every turn — deterministic, schema-validated
      </text>
    </svg>
  )
}

/* CH IV — the culture translation card */
function WaCard() {
  return (
    <div className="rounded-lg p-5" style={{ border: `1px dashed ${TEAL}70`, background: 'rgba(255,255,255,0.02)' }}>
      <div className="flex items-center gap-4">
        <span className="font-display leading-none" style={{ fontSize: '3rem', color: TEAL }}>
          和
        </span>
        <div>
          <p className="font-mono text-sm" style={{ color: '#fff' }}>
            “I achieved X.”
          </p>
          <p className="font-mono text-xs mt-1.5" style={{ color: TEAL }}>
            → flagged: harmony (和) · humility
          </p>
        </div>
      </div>
      <p className="font-body text-[11px] mt-4 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
        the same answer reads differently across cultures. MIRU rewrites it the way a
        Japanese HR evaluator would want to hear it — and shows you their internal monologue.
      </p>
    </div>
  )
}

/* CH V — the podium */
function Podium() {
  return (
    <svg viewBox="0 0 240 130" className="w-full max-w-[300px] mx-auto" aria-label="Hackathon podium, third place highlighted">
      {/* 2nd */}
      <rect x={20} y={62} width={60} height={58} rx={4} fill="rgba(255,255,255,0.08)" />
      <text x={50} y={95} fontSize={18} fill="rgba(255,255,255,0.45)" fontFamily="var(--font-display)" textAnchor="middle">2</text>
      {/* 1st */}
      <rect x={90} y={40} width={60} height={80} rx={4} fill="rgba(255,255,255,0.08)" />
      <text x={120} y={75} fontSize={18} fill="rgba(255,255,255,0.45)" fontFamily="var(--font-display)" textAnchor="middle">1</text>
      {/* 3rd — ours */}
      <rect x={160} y={76} width={60} height={44} rx={4} fill={`${TEAL}30`} stroke={TEAL} strokeWidth={2.5} />
      <text x={190} y={103} fontSize={18} fill={TEAL} fontFamily="var(--font-display)" textAnchor="middle">3</text>
      {/* eye standing on 3rd */}
      <g transform="translate(168 48) scale(0.38)">
        <path d="M6 35 Q60 -8 114 35 Q60 78 6 35 Z" fill={DARK} stroke={TEAL} strokeWidth={5} />
        <circle cx={60} cy={35} r={14} fill={TEAL} />
      </g>
      <text x={120} y={16} fontSize={10} fill="rgba(255,255,255,0.5)" fontFamily="monospace" textAnchor="middle">
        demo day
      </text>
    </svg>
  )
}

type WorldItem = (Album | VaultItem) & { logo?: string }

const CHAPTER_ASSETS: (null | (() => JSX.Element))[] = [null, StateFlow, Radar, WaCard, Podium]

export default function MiruWorld({ item }: { item: WorldItem }) {
  const flow = item.detail.flow
  return (
    <div style={{ background: DARK }}>
      {/* ── identity band ── */}
      <div
        className="relative px-6 md:px-10 py-9 overflow-hidden"
        style={{ background: `radial-gradient(ellipse 80% 120% at 50% 0%, ${TEAL}1f, transparent 60%), ${DARK}` }}
      >
        <div className="relative flex flex-col md:flex-row items-center gap-6">
          <Eye />
          <div className="text-center md:text-left">
            {item.badge && (
              <span className="inline-block font-body text-[10px] tracking-[0.14em] uppercase rounded px-2.5 py-1 mb-2.5" style={{ color: TEAL, border: `1.5px solid ${TEAL}70`, background: `${TEAL}12` }}>
                {item.badge}
              </span>
            )}
            <h2 className="font-display text-white leading-none" style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}>
              {item.title}
              <span className="ml-3 align-middle" style={{ fontSize: '0.45em', color: TEAL }}>見る — to see</span>
            </h2>
            <p className="font-body text-[11px] tracking-[0.16em] uppercase mt-2" style={{ color: 'rgba(245,245,242,0.5)' }}>
              {item.tag}
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
      </div>

      {/* ── five chapters ── */}
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
                    style={{ border: `2px solid ${TEAL}`, color: '#fff', background: `${TEAL}20` }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-base" style={{ fontFamily: 'var(--font-scrawl), cursive', color: TEAL }}>
                    {stage.label}
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

      {/* ── stack ── */}
      <div className="px-6 md:px-10 py-8">
        <div className="pt-5" style={{ borderTop: `1px solid ${TEAL}30` }}>
          <div className="font-body text-[10px] tracking-[0.22em] uppercase mb-3" style={{ color: 'rgba(245,245,242,0.35)' }}>
            the stack
          </div>
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
