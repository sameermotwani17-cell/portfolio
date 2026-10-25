'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import type { CaseStudy } from '@/lib/creative/cases'

/**
 * The sheet every arc card opens: a client style case study. Esc or the close
 * button returns to the arc. Body and smooth scroll are locked while it is open.
 */
export default function CaseStudySheet({ study, onClose }: { study: CaseStudy; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    window.__lenis?.stop()
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      window.__lenis?.start()
      prev?.focus?.()
    }
  }, [onClose])

  useEffect(() => {
    sheetRef.current?.scrollTo({ top: 0 })
  }, [study.id])

  const s = study
  return (
    <div
      ref={sheetRef}
      className="cr-case"
      role="dialog"
      aria-modal="true"
      aria-label={`${s.title} case study`}
      style={{ ['--case-accent' as string]: s.accent } as CSSProperties}
    >
      <button ref={closeRef} type="button" className="cr-case__x" onClick={onClose} aria-label="Close case study">
        ✕
      </button>

      <section className="cr-aj">
        <header className="cr-aj__head">
          <p className="cr-aj__eyebrow">
            Case study · {s.client.split(' · ')[0]}
            {s.jpName && <span lang="ja">{s.jpName}</span>}
          </p>
          <h2>{s.title}</h2>
          {s.titleJp && (
            <p className="cr-aj__jp" lang="ja">
              {s.titleJp}
            </p>
          )}
          {s.kicker && !s.titleJp && <p className="cr-aj__jp">{s.kicker}</p>}
          <p className="cr-aj__intro">{s.intro}</p>
          <dl className="cr-aj__meta">
            <div>
              <dt>Client</dt>
              <dd>{s.client}</dd>
            </div>
            <div>
              <dt>My role</dt>
              <dd>{s.role}</dd>
            </div>
            <div>
              <dt>When</dt>
              <dd>{s.when}</dd>
            </div>
          </dl>
          {s.links.length > 0 && (
            <div className="cr-aj__links">
              {s.links.map((l) => (
                <a key={l.href + l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </header>

        {s.stats.length > 0 && (
          <div className="cr-aj__stats">
            {s.stats.map((x) => (
              <div key={x.label}>
                <b>{x.value}</b>
                <span>{x.label}</span>
              </div>
            ))}
          </div>
        )}

        {s.site && s.site.length > 0 && (
          <div className="cr-aj__block">
            <h3>The website, live</h3>
            <div className="cr-aj__site">
              {s.site.map((m) => (
                <figure key={m.src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.src} alt={m.label} loading="lazy" decoding="async" />
                  <figcaption>{m.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        {s.rail && s.rail.length > 0 && (
          <div className="cr-aj__block">
            <h3>{s.railTitle ?? 'The work'}</h3>
            {s.swatches && (
              <div className="cr-aj__swatches" aria-label="Brand colours">
                {s.swatches.map((c) => (
                  <span key={c.hex} style={{ background: c.hex }} data-light={c.name === 'Paper' || undefined}>
                    {c.name}
                    <i>{c.hex}</i>
                  </span>
                ))}
              </div>
            )}
            <div className="cr-aj__rail" tabIndex={0} aria-label="Gallery, scroll sideways">
              {s.rail.map((m) => (
                <figure key={m.src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.src} alt={m.label} loading="lazy" decoding="async" />
                  <figcaption>{m.label}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}

        {(s.steps.length > 0 || s.poster) && (
          <div className={`cr-aj__block ${s.steps.length > 0 && s.poster ? 'cr-aj__split' : ''}`}>
            {s.steps.length > 0 && (
              <div>
                <h3>How it went</h3>
                <ol className="cr-aj__steps">
                  {s.steps.map((x) => (
                    <li key={x.n + x.title}>
                      <span>{x.n}</span>
                      <div>
                        <b>{x.title}</b>
                        <p>{x.body}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
            {s.poster && (
              <figure className="cr-aj__poster">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.poster.src} alt={s.poster.label} loading="lazy" decoding="async" />
                <figcaption>{s.poster.label}</figcaption>
              </figure>
            )}
          </div>
        )}

        {s.films && s.films.length > 0 && (
          <div className="cr-aj__block">
            <h3>Films</h3>
            <div className="cr-aj__films">
              {s.films.map((f) => (
                <figure key={f.src}>
                  <video src={f.src} poster={f.poster} controls playsInline preload="none" style={{ aspectRatio: String(f.ratio) }} />
                  <figcaption>
                    <b>{f.title}</b>
                    <i>{f.tag}</i>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
