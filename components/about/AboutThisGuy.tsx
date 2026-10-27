import { ABOUT } from '@/lib/content/about'

const PHOTOS = [
  '/about/portrait-08898.webp',
  '/about/portrait-08847.webp',
  '/about/portrait-08883.webp',
  '/about/portrait-09060.webp',
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
        </div>
        <ul className="about__photos">
          {PHOTOS.map((p) => (
            <li key={p}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p} alt="Sameer, studio portrait" loading="lazy" decoding="async" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
