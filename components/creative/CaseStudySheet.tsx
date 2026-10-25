'use client'

import { useEffect, useRef } from 'react'
import type { CaseStudy, Scope } from '@/lib/creative/cases'
import { RELEASES, SPOTIFY_ARTIST, APPLE_ARTIST } from '@/lib/creative/music'

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`


function ScopeEmbed({ e }: { e: Scope['embeds'][number] }) {
  if (e.kind === 'images') {
    return (
      <div className="cr-aj__rail" tabIndex={0} aria-label="Examples, scroll sideways">
        {e.items.map((m) => (
          <figure key={m.src}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.src} alt={m.label} loading="lazy" decoding="async" />
            <figcaption>{m.label}</figcaption>
          </figure>
        ))}
      </div>
    )
  }
  if (e.kind === 'films') {
    return (
      <div className="cr-aj__films">
        {e.items.map((f) => (
          <figure key={f.src}>
            <video src={f.src} poster={f.poster} controls playsInline preload="none" style={{ aspectRatio: String(f.ratio) }} />
            <figcaption>
              <b>{f.title}</b>
              <i>{f.tag}</i>
            </figcaption>
          </figure>
        ))}
      </div>
    )
  }
  if (e.kind === 'site') {
    return (
      <figure className="cr-browser">
        <div className="cr-browser__bar">
          <i />
          <i />
          <i />
          <a href={e.href} target="_blank" rel="noopener noreferrer">
            {e.label} ↗
          </a>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={e.shot} alt={e.label} loading="lazy" decoding="async" />
      </figure>
    )
  }
  if (e.kind === 'swatches') {
    return (
      <div className="cr-aj__swatches" aria-label="Colours">
        {e.items.map((c) => (
          <span key={c.hex} style={{ background: c.hex }} data-light={/^#(?:f|e)/i.test(c.hex) || undefined}>
            {c.name}
            <i>{c.hex}</i>
          </span>
        ))}
      </div>
    )
  }
  return (
    <figure className="cr-aj__poster cr-aj__poster--inline">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={e.src} alt={e.label} loading="lazy" decoding="async" style={{ aspectRatio: String(e.ratio) }} />
      <figcaption>{e.label}</figcaption>
    </figure>
  )
}

/**
 * The sheet every arc card opens: a client style case study with its own theme
 * (colours, type, pattern) and its album cover art. The music card opens a
 * Spotify style discography instead. Esc or the close button returns to the arc.
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
  const isMusic = s.id === 'music'
  const hasScopes = !!s.scopes?.length

  return (
    <div ref={sheetRef} className="cr-case" data-lenis-prevent data-theme={s.theme} role="dialog" aria-modal="true" aria-label={`${s.title} case study`}>
      <button ref={closeRef} type="button" className="cr-case__x" onClick={onClose} aria-label="Close case study">
        ✕
      </button>

      <section className="cr-aj">
        <header className="cr-aj__hero">
          <div>
            <p className="cr-aj__eyebrow">
              {isMusic ? 'Artist' : 'Case study'} · {s.client.split(' · ')[0]}
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
            {isMusic && (
              <div className="cr-disc__bar">
                <div className="cr-aj__links">
                  <a href={SPOTIFY_ARTIST} target="_blank" rel="noopener noreferrer">
                    Open on Spotify ↗
                  </a>
                  <a href={APPLE_ARTIST} target="_blank" rel="noopener noreferrer">
                    Apple Music ↗
                  </a>
                </div>
              </div>
            )}
          </div>
          <div className="cr-aj__art" aria-hidden="true">
            <div className="cr-aj__vinyl" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.cover} alt="" />
          </div>
        </header>

        <dl className="cr-aj__meta">
          <div>
            <dt>{isMusic ? 'Name' : 'Client'}</dt>
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
        {!isMusic && s.links.length > 0 && (
          <div className="cr-aj__links">
            {s.links.map((l) => (
              <a key={l.href + l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                {l.label} ↗
              </a>
            ))}
          </div>
        )}

        {isMusic && (
          <>
            <div className="cr-aj__block">
              <h3>Popular</h3>
              <ol className="cr-disc__list">
                {RELEASES.slice(0, 5).map((r, i) => (
                  <li key={r.slug}>
                    <a href={r.apple} target="_blank" rel="noopener noreferrer">
                      <span className="n">{i + 1}</span>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={r.cover} alt="" loading="lazy" />
                      <span>
                        <b>{r.title}</b>
                        <small>{r.feat ? `RETRO, ${r.feat}` : 'RETRO'}</small>
                      </span>
                      <span className="d">{r.year}</span>
                      <span className="d">{mmss(r.seconds)}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
            <div className="cr-aj__block">
              <h3>Discography</h3>
              <div className="cr-disc__grid">
                {RELEASES.map((r) => (
                  <a key={r.slug} href={r.apple} target="_blank" rel="noopener noreferrer">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.cover} alt={`${r.title} cover art`} loading="lazy" />
                    <b>{r.title}</b>
                    <small>
                      {r.year} · Single
                    </small>
                  </a>
                ))}
              </div>
            </div>
          </>
        )}

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

        {hasScopes && (
          <div className="cr-aj__block">
            <h3>Scopes of work</h3>
            <div className="cr-scopes">
              {s.scopes!.map((sc, i) => (
                <article className="cr-scope" key={sc.title}>
                  <header>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    <h4>{sc.title}</h4>
                    <p>{sc.summary}</p>
                    <ul>
                      {sc.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </header>
                  {sc.embeds.length > 0 && (
                    <div className="cr-scope__embed">
                      {sc.embeds.map((e, k) => (
                        <ScopeEmbed key={k} e={e} />
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        )}

        {!hasScopes && s.site && s.site.length > 0 && (
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

        {!hasScopes && s.rail && s.rail.length > 0 && !isMusic && (
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

        {(s.steps.length > 0 || (!hasScopes && s.poster)) && (
          <div className={`cr-aj__block ${s.steps.length > 0 && !hasScopes && s.poster ? 'cr-aj__split' : ''}`}>
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
            {!hasScopes && s.poster && (
              <figure className="cr-aj__poster">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.poster.src} alt={s.poster.label} loading="lazy" decoding="async" />
                <figcaption>{s.poster.label}</figcaption>
              </figure>
            )}
          </div>
        )}

        {!hasScopes && s.films && s.films.length > 0 && (
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
