import type { DoodleId } from '@/lib/story/chapters'
import { DOODLES } from './shapes'
import { roughDoodle } from './rough'

/**
 * All 20 doodles are drawn ONCE, here, as <symbol>s in a zero-size SVG that
 * lives in the section. Everything else (the map, the reduced-motion cards)
 * just <use>s them, so the markup is not repeated per place a doodle appears.
 */
export function DoodleDefs() {
  return (
    <svg className="story-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        {(Object.keys(DOODLES) as DoodleId[]).map((id) => {
          const { paths, texts } = roughDoodle(id, DOODLES[id])
          return (
            <symbol key={id} id={`dd-${id}`} viewBox="0 0 64 64" overflow="visible">
              <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {paths.map((p, i) =>
                  p.fill === 'none' ? (
                    <path key={i} d={p.d} />
                  ) : (
                    // solid-filled shapes (dots, star, flame): fill, no outline
                    <path key={i} d={p.d} fill={p.fill} stroke="none" />
                  ),
                )}
              </g>
              {texts.map((t, i) => (
                <text
                  key={`t${i}`}
                  x={t.x}
                  y={t.y}
                  fontSize={t.size}
                  textAnchor="middle"
                  fill="currentColor"
                  className="dd-text"
                >
                  {t.text}
                </text>
              ))}
            </symbol>
          )
        })}
      </defs>
    </svg>
  )
}

/** A doodle placed inside an existing <svg> (the map), centred on x,y. */
export function DoodleUse({ id, x, y, size }: { id: DoodleId; x: number; y: number; size: number }) {
  return (
    <use
      href={`#dd-${id}`}
      x={(x - size / 2).toFixed(1)}
      y={(y - size / 2).toFixed(1)}
      width={size}
      height={size}
      aria-hidden="true"
    />
  )
}

/** A doodle as a standalone inline SVG (the reduced-motion cards). */
export function DoodleSvg({ id, size = 56, className }: { id: DoodleId; size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <use href={`#dd-${id}`} width="64" height="64" />
    </svg>
  )
}
