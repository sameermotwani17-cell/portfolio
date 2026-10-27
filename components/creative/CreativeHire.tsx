'use client'

const MAIL = 'mailto:sameermotwani17@gmail.com?subject=Modeling'

/**
 * "Modeling & on-camera work": the creative-side way to hire me for the face.
 * The engineering pitch lives on /tech; anything on camera or on brand lives here.
 */
export default function CreativeHire({ onOpenModeling }: { onOpenModeling: () => void }) {
  return (
    <section id="hire" className="cr-hire" aria-labelledby="cr-hire-h">
      <div className="cr-hire__inner">
        <p className="cr-hire__eyebrow">Open for bookings · Beppu, Japan</p>
        <h2 id="cr-hire-h">Modeling &amp; on-camera work</h2>
        <p className="cr-hire__lead">
          Editorial, commercial and product. One studio shoot built as a book, a comp card and a person who also edits his own footage.
        </p>
        <div className="cr-hire__cta">
          <button type="button" onClick={onOpenModeling}>
            Open the modeling book
          </button>
          <a href={MAIL}>Book me</a>
        </div>
      </div>
    </section>
  )
}
