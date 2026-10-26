import { MODEL_SHOTS } from '@/lib/creative/model'

const MAIL = 'mailto:sameermotwani17@gmail.com?subject=Modeling'

/**
 * "Open for modeling": a plain section under the arc with a portrait, a short
 * pitch, how to book, and a strip of frames from the shoot. Server rendered.
 */
export default function ModelingSection({ onOpenAlbum }: { onOpenAlbum?: () => void }) {
  const strip = MODEL_SHOTS.filter((m) => m.ratio < 1)
  return (
    <section id="modeling" className="cr-model" aria-labelledby="cr-model-h">
      <div className="cr-model__grid">
        <figure className="cr-model__photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/creative/model/08898.webp" alt="Portrait of Sameer, low key light on black" loading="lazy" decoding="async" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/creative/model/08883.webp" alt="" loading="lazy" decoding="async" />
        </figure>
        <div>
          <p className="cr-model__eyebrow">Open for bookings · Beppu, Japan</p>
          <h2 id="cr-model-h">
            Looking for <em>modeling</em> work
          </h2>
          <p>
            Editorial, commercial and product. Born in Monrovia, raised between Liberia, Israel and Japan, with curls, a
            camera-ready stare and a habit of building things between shoots.
          </p>
          <p>I am still a builder first. The tech portfolio is next, so you can book the face and hire the engineer in one place.</p>
          <div className="cr-model__cta">
            <a href={MAIL}>Book me</a>
            {onOpenAlbum && (
              <button type="button" onClick={onOpenAlbum}>
                Open the modeling album
              </button>
            )}
            <a href="/tech">See the tech side →</a>
          </div>
        </div>
      </div>

      <div className="cr-model__strip" aria-hidden="true">
        <div className="cr-model__track">
          {[...strip, ...strip].map((m, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={`${m.id}-${i}`} src={m.src} alt="" loading="lazy" decoding="async" width={Math.round(420 * m.ratio)} height={420} />
          ))}
        </div>
      </div>
    </section>
  )
}
