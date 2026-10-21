import { CHAPTERS, CENTRE, ERAS, OUTRO } from '@/lib/story/chapters'
import { DoodleSvg } from './doodles/Doodle'
import { Rich } from './Rich'

/**
 * The whole story as real HTML: <h2>, an <h3> per era, an <ol> of chapters
 * (<h4> + <p>), then the closing line. It is in the server HTML for search
 * and screen readers. With the pinned tour it is visually hidden; in the
 * reduced-motion / no-JS version the very same markup is laid out as stacked
 * paper cards (see globals.css), so nothing is duplicated.
 */
export default function SemanticStory() {
  return (
    <div className="story-text">
      <h2 id="story-h2" className="st-h2">
        {CENTRE}
      </h2>
      {ERAS.map((era, k) => (
        <section key={era.id} className="st-era" aria-labelledby={`st-era-${era.id}`}>
          <h3 id={`st-era-${era.id}`} className="st-h3">
            <DoodleSvg id={era.doodle} size={64} className="st-doodle st-doodle--era" />
            <span>{era.label}</span>
          </h3>
          <ol className="st-list">
            {CHAPTERS.filter((c) => c.era === era.id).map((c) => (
              <li key={c.id} className="st-card">
                <DoodleSvg id={c.doodle} size={52} className="st-doodle" />
                <h4 className="st-h4">{c.label}</h4>
                <p className="st-cap">
                  {c.place} · {c.when}
                </p>
                <p className="st-body">
                  <Rich text={c.text} />
                </p>
              </li>
            ))}
          </ol>
          {k === ERAS.length - 1 && <p className="st-outro">{OUTRO}</p>}
        </section>
      ))}
    </div>
  )
}
