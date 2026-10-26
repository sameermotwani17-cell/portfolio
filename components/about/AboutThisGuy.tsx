import { ABOUT } from '@/lib/content/about'

const PHOTOS = [
  '/creative/model/08898.webp',
  '/creative/model/08847.webp',
  '/creative/model/08883.webp',
  '/creative/model/09060.webp',
]

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
        <ul className="about__photos">
          {PHOTOS.map((p) => (
            <li key={p}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p} alt="Sameer, studio portrait" loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
        <a className="about__model" href="/creative#modeling">
          Looking for modeling work →
        </a>
      </div>
    </section>
  )
}
