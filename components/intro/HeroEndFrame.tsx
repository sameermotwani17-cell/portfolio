import type { CSSProperties } from 'react'
import { HERO, HALFTONE_MODE, HALFTONE_SRC, TILE_PATTERN } from '@/lib/content/hero'
import ReplayIntro from './ReplayIntro'
import TileParallax from './TileParallax'
import HeroReveal from './HeroReveal'
import HeroHelix from './HeroHelix'
import HeroChrome from './HeroChrome'

const TILES_ID = 'hero-tiles'

/**
 * The Swiss-poster hero the intro lands on. Server-rendered: the h1 and all
 * the copy are in the initial HTML. The layout follows the reference poster's
 * structure (paper, giant red display type, a halftone portrait sliced into
 * a gutter grid, a stacked word on the left, a statement block bottom-right);
 * every piece of content is ours.
 */
export default function HeroEndFrame() {
  const portrait = HALFTONE_SRC[HALFTONE_MODE]

  // Diagonal reveal order: by (row + col), then by col.
  const order = TILE_PATTERN.flatMap((row, r) => row.map((_, c) => ({ r, c })))
    .sort((a, b) => a.r + a.c - (b.r + b.c) || a.c - b.c)
  const revealIndex = (r: number, c: number) =>
    order.findIndex((o) => o.r === r && o.c === c)

  return (
    <section className="hero-root" data-halftone={HALFTONE_MODE}>
      <Grunge />
      <HeroReveal />
      <HeroHelix />
      <HeroChrome />
      <h1 className="sr-only">{HERO.h1}</h1>

      <div className="hero-inner" aria-hidden="true">
        <div className="hero-super">{HERO.superscript}</div>

        <div className="hero-name">
          {HERO.name.split('').map((ch, i) => (
            <span key={i}>{ch}</span>
          ))}
        </div>
        <div className="hero-role">
          {HERO.role.map((r) => (
            <span key={r}>{r}</span>
          ))}
        </div>

        <div className="hero-main">
          <div className="hero-stack">
            {HERO.stack.map((row, i) => (
              <span
                key={row}
                className={`hero-stack__row${i === 1 ? ' hero-stack__row--mid' : ''}`}
                style={{ '--i': i } as CSSProperties}
              >
                {row}
              </span>
            ))}
          </div>

          <div className="hero-tiles" id={TILES_ID}>
            <div className="hero-lens" aria-hidden="true" />
            {TILE_PATTERN.map((row, r) =>
              row.map((kind, c) => {
                if (kind === 'statement') {
                  return (
                    <div key={`${r}${c}`} className="tile tile--statement hero-statement">
                      {HERO.statement.map((line, i) => (
                        <span
                          key={line}
                          className="hero-statement__line"
                          style={{ '--i': i } as CSSProperties}
                        >
                          {line}
                          {i === HERO.statement.length - 1 && (
                            <span className="hero-cursor">▍</span>
                          )}
                        </span>
                      ))}
                    </div>
                  )
                }
                if (kind === 'empty') {
                  return <div key={`${r}${c}`} className="tile tile--empty" />
                }
                const i = revealIndex(r, c)
                return (
                  <div
                    key={`${r}${c}`}
                    className="tile tile--filled"
                    style={
                      {
                        '--r': r,
                        '--c': c,
                        '--i': i,
                        '--d': (0.5 + ((r * 3 + c) % 3) * 0.25).toFixed(2),
                      } as CSSProperties
                    }
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="tile__img"
                      src={portrait}
                      alt=""
                      draggable={false}
                      decoding="async"
                      /* the poster (LCP) goes first; the portrait follows
                         after layout, not from the preload scanner */
                      loading="lazy"
                      fetchPriority="low"
                    />
                  </div>
                )
              }),
            )}
          </div>
        </div>

        <div className="hero-foot">
          <div>
            <p className="hero-body">{HERO.body}</p>
            <ReplayIntro label={HERO.replay} />
          </div>
          <nav className="hero-ctas" aria-label="Links">
            {HERO.ctas.map((cta) => (
              <a
                key={cta.label}
                href={cta.href}
                {...('external' in cta && cta.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {cta.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <TileParallax targetId={TILES_ID} />
    </section>
  )
}

/**
 * Paper grunge, generated in code: fractal noise thresholded by a discrete
 * transfer function, ink-coloured, at ~7% opacity. Two layers: fine speckle
 * and coarse blotches. No texture image file.
 */
function Grunge() {
  return (
    <svg className="hero-grunge" aria-hidden="true" focusable="false">
      <defs>
        <filter id="hero-speckle" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" stitchTiles="stitch" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.95
                    0 0 0 0 0.95
                    0 0 0 0 0.95
                    0.33 0.33 0.33 0 -0.1"
          />
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 0 1" />
          </feComponentTransfer>
        </filter>
        <filter id="hero-blotch" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="4" seed="3" stitchTiles="stitch" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.95
                    0 0 0 0 0.95
                    0 0 0 0 0.95
                    0.33 0.33 0.33 0 -0.22"
          />
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0.6 1" />
          </feComponentTransfer>
        </filter>
      </defs>
      <rect width="100%" height="100%" filter="url(#hero-speckle)" opacity="0.07" />
      <rect width="100%" height="100%" filter="url(#hero-blotch)" opacity="0.045" />
    </svg>
  )
}
