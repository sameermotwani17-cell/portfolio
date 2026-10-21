'use client'

import { useEffect, useMemo, useRef, type RefObject } from 'react'
import { useSharedTicker } from '@/hooks/useSharedTicker'
import type { PointerField } from '@/hooks/usePointerField'
import { makeBoard, distToTrace } from '@/lib/universe/circuit'
import { TECH } from '@/lib/universe/palette'
import type { StageState } from './types'

/**
 * Tech half: a seeded circuit board (same board every render) with signal
 * pulses travelling along 10 of its traces. Hovering near a trace lights it and
 * its pad. Drawn once as SVG; the shared ticker only moves dash offsets.
 */
type Props = {
  field: RefObject<PointerField>
  state: RefObject<StageState>
  enabled: boolean
  reduced: boolean
}

const SEED = 7
const PULSES = 10
const SEG = 80
const SPEED = 0.2 // board units per ms

export default function CircuitLayer({ field, state, enabled, reduced }: Props) {
  const board = useMemo(() => makeBoard(SEED), [])
  const svgRef = useRef<SVGSVGElement>(null)
  const pulses = useMemo(() => {
    // deterministic pick: every few traces, trunks first
    const order = [...board.traces].sort((a, b) => b.len - a.len)
    return order.filter((_, i) => i % 7 === 0).slice(0, PULSES)
  }, [board])
  const phase = useRef<number[]>(pulses.map((_, i) => (i * 0.37) % 1))
  const lit = useRef<Float32Array>(new Float32Array(board.traces.length))
  const glowEls = useRef<SVGPathElement[]>([])
  const dotEls = useRef<Map<number, SVGElement[]>>(new Map())
  const pulseEls = useRef<SVGPathElement[][]>([])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const board = svg.previousElementSibling as SVGSVGElement | null
    glowEls.current = Array.from(svg.querySelectorAll<SVGPathElement>('[data-glow]'))
    dotEls.current = new Map()
    board?.querySelectorAll<SVGElement>('[data-dot]').forEach((el) => {
      const id = Number(el.dataset.dot)
      dotEls.current.set(id, [...(dotEls.current.get(id) ?? []), el])
    })
    pulseEls.current = pulses.map((_, i) => Array.from(svg.querySelectorAll<SVGPathElement>(`[data-pulse="${i}"]`)))
  }, [pulses])

  useSharedTicker((dt) => {
    const st = state.current
    const f = field.current
    if (!st || !f) return
    const sp = st.speedL
    pulses.forEach((t, i) => {
      phase.current[i] = (phase.current[i] + (SPEED * dt * sp) / (t.len + SEG)) % 1
      const off = SEG - phase.current[i] * (t.len + SEG)
      for (const el of pulseEls.current[i] ?? []) el.setAttribute('stroke-dashoffset', off.toFixed(1))
    })

    // hover: light the nearest traces under the pointer
    const L = lit.current
    let bx = -1e6
    let by = -1e6
    if (f.active) {
      const s = Math.max(f.w / board.W, f.h / board.H)
      bx = (f.x - (f.w - board.W * s) / 2) / s
      by = (f.y - (f.h - board.H * s) / 2) / s
    }
    for (let i = 0; i < board.traces.length; i++) {
      const near = f.active && !st.freezeL ? distToTrace(board.traces[i], bx, by) : 1e6
      const target = near < 34 ? 1 : 0
      const next = L[i] + (target - L[i]) * (target ? 0.3 : 0.06)
      if (Math.abs(next - L[i]) > 0.004) {
        L[i] = next
        const g = glowEls.current[i]
        if (g) g.style.opacity = next.toFixed(2)
        const dots = dotEls.current.get(i)
        if (dots) for (const d of dots) d.setAttribute('data-lit', next > 0.5 ? '1' : '0')
      } else if (L[i] !== target && Math.abs(next - target) < 0.004) {
        L[i] = target
      }
    }
  }, enabled && !reduced)

  const viewBox = `0 0 ${board.W} ${board.H}`
  return (
    <>
      {/* the board never changes after first paint, so it keeps its own raster layer */}
      <svg className="uni-circuit" viewBox={viewBox} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g fill="none" stroke={TECH.trace} strokeLinecap="round" strokeLinejoin="round">
          {board.traces.map((t) => (
            <path key={t.id} d={t.d} strokeWidth={t.w} />
          ))}
        </g>
        <g fill={TECH.trace}>
          {board.pads.map((p, i) => (
            <circle key={i} data-dot={p.trace} cx={p.x} cy={p.y} r={p.r} />
          ))}
          {board.ics.map((r, i) => (
            <rect key={i} data-dot={r.trace} x={r.x} y={r.y} width={r.w} height={r.h} />
          ))}
        </g>
        <g fill="none" stroke={TECH.trace} strokeWidth={1.5}>
          {board.vias.map((v, i) => (
            <g key={i} data-dot={v.trace}>
              <circle cx={v.x} cy={v.y} r={v.r} strokeDasharray="46 22" transform={`rotate(${(i * 47) % 360} ${v.x} ${v.y})`} />
              <circle cx={v.x} cy={v.y} r={4.5} fill={TECH.trace} stroke="none" />
            </g>
          ))}
        </g>
      </svg>
      {/* hover glow and signal pulses: the only parts that move */}
      <svg ref={svgRef} className="uni-circuit" viewBox={viewBox} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g fill="none" stroke={TECH.pulseGlow} strokeLinecap="round" strokeLinejoin="round">
          {board.traces.map((t) => (
            <path key={t.id} data-glow d={t.d} strokeWidth={t.w + 3} style={{ opacity: 0 }} />
          ))}
        </g>
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          {pulses.map((t, i) => (
            <g key={t.id}>
              <path
                data-pulse={i}
                d={t.d}
                stroke={TECH.pulseGlow}
                strokeOpacity={0.4}
                strokeWidth={8}
                strokeDasharray={`${SEG} ${t.len + SEG}`}
                strokeDashoffset={SEG}
              />
              <path
                data-pulse={i}
                d={t.d}
                stroke={TECH.pulse}
                strokeWidth={2.6}
                strokeDasharray={`${SEG} ${t.len + SEG}`}
                strokeDashoffset={SEG}
              />
            </g>
          ))}
        </g>
      </svg>
    </>
  )
}
