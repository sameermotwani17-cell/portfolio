import { CSSProperties, ElementType } from 'react'

type LayeredTitleProps = {
  text: string
  /** accent color for the offset echo + scrawl */
  accent?: string
  /** handwritten marker overlay word(s), album-cover style */
  scrawl?: string
  scrawlStyle?: CSSProperties
  as?: ElementType
  className?: string
  style?: CSSProperties
}

/**
 * Album-cover display type: the solid title sits on two offset copies —
 * a light outline echo up-left and an accent outline echo down-right —
 * with an optional Permanent Marker scrawl crossing it.
 */
export default function LayeredTitle({
  text,
  accent = '#f97316',
  scrawl,
  scrawlStyle,
  as: Tag = 'h2',
  className = '',
  style,
}: LayeredTitleProps) {
  return (
    <Tag className={`relative ${className}`} style={style}>
      {/* light outline echo — up-left */}
      <span
        aria-hidden
        className="absolute inset-0 select-none pointer-events-none"
        style={{
          WebkitTextStroke: '2px rgba(245,245,242,0.4)',
          color: 'transparent',
          transform: 'translate(-0.045em, -0.05em)',
        }}
      >
        {text}
      </span>
      {/* accent outline echo — down-right */}
      <span
        aria-hidden
        className="absolute inset-0 select-none pointer-events-none"
        style={{
          WebkitTextStroke: `2px ${accent}`,
          color: 'transparent',
          opacity: 0.55,
          transform: 'translate(0.055em, 0.06em)',
        }}
      >
        {text}
      </span>
      {/* solid front */}
      <span className="relative">{text}</span>
      {/* marker scrawl overlay */}
      {scrawl && (
        <span
          aria-hidden
          className="absolute select-none pointer-events-none"
          style={{
            fontFamily: 'var(--font-scrawl), cursive',
            color: accent,
            fontSize: '0.28em',
            lineHeight: 1,
            right: '-0.1em',
            bottom: '-0.42em',
            transform: 'rotate(-5deg)',
            textShadow: '0 2px 12px rgba(0,0,0,0.45)',
            WebkitTextStroke: '0px',
            ...scrawlStyle,
          }}
        >
          {scrawl}
        </span>
      )}
    </Tag>
  )
}
