import { ABOUT } from '@/lib/content/about'

/**
 * "About this guy": a short poster-style beat between the hero and the split.
 * Server-rendered, no JS, so it costs nothing at load.
 */
export default function AboutThisGuy({ id }: { id: string }) {
  return (
    <section id={id} className="about" aria-labelledby="about-h2">
      <div className="about__grid">
        <p className="about__index" aria-hidden="true">
          {ABOUT.index}
        </p>
        <h2 id="about-h2" className="about__title">
          {ABOUT.title.map((w) => (
            <span key={w}>{w}</span>
          ))}
        </h2>
        <div className="about__body">
          {ABOUT.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="about__close">{ABOUT.close}</p>
        </div>
      </div>
    </section>
  )
}
