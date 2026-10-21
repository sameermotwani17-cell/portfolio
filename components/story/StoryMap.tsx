import type { CSSProperties } from 'react'
import { CENTRE, CHAPTERS, ERAS, OUTRO } from '@/lib/story/chapters'
import {
  CENTRE_PT,
  CHAPTER_DOODLE,
  ERA_DOODLE,
  ERA_NODES,
  FONT,
  OUTRO_PT,
  VB,
  type ChapterNode,
  type EraNode,
} from '@/lib/story/layout'
import { DoodleUse } from './doodles/Doodle'
import { roughCurve, roughLine, type RoughPath } from './doodles/rough'

/**
 * The hand-drawn map, rendered on the server: a single SVG with the centre
 * word, five era branches, fifteen chapter twigs, their labels and doodles.
 * Every rough path has a fixed seed. The client scene never re-draws anything;
 * it only moves the viewBox and flips data attributes.
 *
 * Labels are rendered inert (no role, no tab stop): the reduced-motion and
 * no-JS versions have nothing to click. StoryGate turns them into real
 * buttons (role, tabindex, aria-label from data-label) only in pinned mode.
 *
 * Draw-on timing is plain CSS: each .draw / .fade element carries its delay
 * in --d (seconds), and the animations run once the section is flagged
 * data-drawn (see globals.css).
 */

const T_CENTRE = 1.0 // centre word written
const T_ERAS = 1.0 // first era branch starts
const T_ERA_STAGGER = 0.12
const T_TWIGS = 1.9 // first chapter twig starts
const T_TWIG_STAGGER = 0.06

const d = (s: number): CSSProperties => ({ ['--d' as string]: `${s.toFixed(2)}s` })

function Draw({ paths, cls, delay }: { paths: RoughPath[]; cls: string; delay: number }) {
  return (
    <>
      {paths.map((p, i) => (
        <path
          key={i}
          className={`draw ${cls}`}
          pathLength={1}
          d={p.d}
          fill="none"
          stroke={p.stroke}
          strokeWidth={p.sw}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={d(delay)}
        />
      ))}
    </>
  )
}

function EraGroup({ node }: { node: EraNode }) {
  const k = node.index
  const delay = T_ERAS + k * T_ERA_STAGGER
  const { era, pos, labelWidth } = node
  const name = era.label.toUpperCase()
  const n = node.chapters.length
  return (
    <g className="eg" data-e={k}>
      <g aria-hidden="true">
        <Draw paths={roughCurve(node.branch, `era-branch-${era.id}`, 2.5)} cls="branch" delay={delay} />
      </g>

      {/* era label + doodle: one button */}
      <g
        className="lbl era-lbl"
        data-label={`Era ${k + 1} of ${ERAS.length}: ${era.label}, ${n} chapters`}
        data-e={k}
      >
        <rect
          className="hit"
          x={pos.x - labelWidth / 2 - 16}
          y={pos.y - 34}
          width={labelWidth + 32}
          height={68}
          rx={14}
        />
        <g className="dd fade" style={d(delay + 0.35)}>
          <DoodleUse id={era.doodle} x={node.doodle.x} y={node.doodle.y} size={ERA_DOODLE} />
        </g>
        <text
          className="t-era fade"
          x={pos.x}
          y={pos.y}
          textAnchor="middle"
          dominantBaseline="central"
          style={d(delay + 0.3)}
          aria-hidden="true"
        >
          {name}
        </text>
      </g>

      {node.chapters.map((c) => (
        <ChapterGroup key={c.chapter.id} node={c} />
      ))}
    </g>
  )
}

function ChapterGroup({ node }: { node: ChapterNode }) {
  const { chapter: c, index: i, label } = node
  const delay = T_TWIGS + i * T_TWIG_STAGGER
  const still = c.id === 'october-7' // the candle never moves
  const w = node.labelWidth
  const hitX = label.anchor === 'start' ? label.x - 6 : label.anchor === 'end' ? label.x - w - 6 : label.x - w / 2 - 6
  return (
    <g className="cg" data-c={i} data-e={node.eraIndex}>
      <g aria-hidden="true">
        <Draw paths={roughCurve(node.twig, `twig-${c.id}`, 1.5)} cls="twig" delay={delay} />
      </g>
      <g
        className="lbl ch-lbl"
        data-label={`Chapter ${i + 1} of ${CHAPTERS.length}: ${c.label}`}
        data-c={i}
      >
        <rect
          className="hit"
          x={hitX - (label.anchor === 'start' ? CHAPTER_DOODLE + 20 : 0)}
          y={node.doodle.y - 34}
          width={w + 12 + CHAPTER_DOODLE + 20}
          height={68}
          rx={12}
        />
        <g className={`dd fade${still ? ' still' : ''}`} style={d(delay + 0.3)}>
          <DoodleUse id={c.doodle} x={node.doodle.x} y={node.doodle.y} size={CHAPTER_DOODLE} />
        </g>
        <text
          className="t-ch fade"
          x={label.x}
          y={label.y}
          textAnchor={label.anchor}
          style={d(delay + 0.3)}
          aria-hidden="true"
        >
          {c.label}
        </text>
      </g>
    </g>
  )
}

export default function StoryMap() {
  // the closing line, split into its two sentences so it can wrap on phones
  const outro = OUTRO.split(/(?<=[.!?])\s+/)
  const ul = roughLine(CENTRE_PT.x - 245, CENTRE_PT.y + 78, CENTRE_PT.x + 245, CENTRE_PT.y + 70, 'my-story-underline', 5)
  const ul2 = roughLine(CENTRE_PT.x - 170, CENTRE_PT.y + 98, CENTRE_PT.x + 150, CENTRE_PT.y + 95, 'my-story-underline-2', 3.5)
  return (
    <svg
      className="story-svg"
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="xMidYMid meet"
      role="group"
      aria-label={`${CENTRE}: a hand-drawn map of ${ERAS.length} eras and ${CHAPTERS.length} chapters`}
    >
      <g aria-hidden="true" className="centre">
        <text className="t-centre" x={CENTRE_PT.x} y={CENTRE_PT.y} textAnchor="middle" dominantBaseline="central">
          {CENTRE}
        </text>
        <g className="ul" style={{ color: 'var(--signal)' }}>
          <Draw paths={ul} cls="ul-a" delay={T_CENTRE * 0.8} />
          <Draw paths={ul2} cls="ul-b" delay={T_CENTRE * 0.8 + 0.25} />
        </g>
      </g>

      {ERA_NODES.map((n) => (
        <EraGroup key={n.era.id} node={n} />
      ))}

      <text className="t-outro" textAnchor="middle" aria-hidden="true">
        {outro.map((line, i) => (
          <tspan key={i} x={OUTRO_PT.x} y={OUTRO_PT.y + i * 58}>
            {line}
          </tspan>
        ))}
      </text>
    </svg>
  )
}
