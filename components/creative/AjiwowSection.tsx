'use client'

import { AJIWOW } from '@/lib/creative/ajiwow'

/** Case study for Ajiwow: brand system, website, poster and launch films. */
export default function AjiwowSection() {
  return (
    <section id="ajiwow" className="cr-aj" aria-labelledby="cr-aj-h">
      <header className="cr-aj__head">
        <p className="cr-aj__eyebrow">
          Case study · {AJIWOW.name} <span lang="ja">{AJIWOW.jp}</span>
        </p>
        <h2 id="cr-aj-h">{AJIWOW.title}</h2>
        <p className="cr-aj__jp" lang="ja">
          {AJIWOW.titleJp}
        </p>
        <p className="cr-aj__intro">{AJIWOW.intro}</p>
        <dl className="cr-aj__meta">
          <div>
            <dt>Kicker</dt>
            <dd>{AJIWOW.kicker}</dd>
          </div>
          <div>
            <dt>My role</dt>
            <dd>{AJIWOW.role}</dd>
          </div>
          <div>
            <dt>When</dt>
            <dd>{AJIWOW.when}</dd>
          </div>
        </dl>
        <div className="cr-aj__links">
          {AJIWOW.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
              {l.label} ↗
            </a>
          ))}
        </div>
      </header>

      <div className="cr-aj__stats">
        {AJIWOW.stats.map((s) => (
          <div key={s.label}>
            <b>{s.value}</b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="cr-aj__block">
        <h3>The website, live</h3>
        <div className="cr-aj__site">
          {AJIWOW.site.map((s) => (
            <figure key={s.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt={s.label} loading="lazy" decoding="async" />
              <figcaption>{s.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="cr-aj__block">
        <h3>Brand system v1.0</h3>
        <div className="cr-aj__swatches" aria-label="Brand colours">
          {AJIWOW.swatches.map((c) => (
            <span key={c.hex} style={{ background: c.hex }} data-light={c.name === 'Paper' || undefined}>
              {c.name}
              <i>{c.hex}</i>
            </span>
          ))}
        </div>
        <div className="cr-aj__rail" tabIndex={0} aria-label="Brand guideline pages, scroll sideways">
          {AJIWOW.brand.map((b) => (
            <figure key={b.src}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.src} alt={b.label} loading="lazy" decoding="async" />
              <figcaption>{b.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="cr-aj__block cr-aj__split">
        <div>
          <h3>How it went</h3>
          <ol className="cr-aj__steps">
            {AJIWOW.steps.map((s) => (
              <li key={s.n}>
                <span>{s.n}</span>
                <div>
                  <b>{s.title}</b>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <figure className="cr-aj__poster">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={AJIWOW.poster.src} alt={AJIWOW.poster.label} loading="lazy" decoding="async" />
          <figcaption>{AJIWOW.poster.label}</figcaption>
        </figure>
      </div>

      <div className="cr-aj__block">
        <h3>Launch films</h3>
        <div className="cr-aj__films">
          {AJIWOW.films.map((f) => (
            <figure key={f.id}>
              <video src={f.src} poster={f.poster} controls playsInline preload="none" style={{ aspectRatio: String(f.ratio) }} />
              <figcaption>
                <b>{f.title}</b>
                <i>{f.tag}</i>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
