'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useInViewRaf } from '@/hooks/useInViewRaf'
import { usePointerField } from '@/hooks/usePointerField'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { initialStage } from '@/components/universe/types'
import { FROM_KEY, navigateWithTransition, notifyRouteReady } from '@/lib/universe/transition'
import {
  MATRIX_COLS,
  TECH_BUILDS,
  TECH_EDUCATION,
  TECH_EXPERIENCE,
  TECH_LANGUAGES,
  TECH_METRICS,
  TECH_PRINCIPLES,
  TECH_PROFILE,
  TECH_SKILLS,
  TECH_WEB,
  type Build,
} from '@/lib/tech/data'
import { HIRE, STICKEM, TECH_ACHIEVEMENTS } from '@/lib/tech/hire'

const WarpGrid = dynamic(() => import('@/components/universe/WarpGrid'), { ssr: false })
const CircuitLayer = dynamic(() => import('@/components/universe/CircuitLayer'), { ssr: false })

const NAV = [
  ['numbers', 'Numbers'],
  ['experience', 'Experience'],
  ['builds', 'Builds'],
  ['skills', 'Skills'],
  ['recognition', 'Recognition'],
  ['method', 'Method'],
  ['hire', 'Hire me'],
  ['contact', 'Contact'],
] as const

function BuildCard({ b, open, onToggle }: { b: Build; open: boolean; onToggle: () => void }) {
  return (
    <article className="tech-build" data-open={open || undefined} style={{ ['--b' as string]: b.accent }}>
      <button type="button" className="tech-build__head" onClick={onToggle} aria-expanded={open} aria-controls={`b-${b.id}`}>
        <span className="tech-build__idx">{String(TECH_BUILDS.indexOf(b) + 1).padStart(2, '0')}</span>
        <span className="tech-build__title">
          <b>{b.title}</b>
          <i>{b.subtitle}</i>
        </span>
        <span className="tech-build__tag">{b.tag}</span>
        <span className="tech-build__plus" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>
      <p className="tech-plain">
        <span>In plain English</span>
        {b.plain}
      </p>
      <p className="tech-build__hook">
        <span>Technically</span>
        {b.hook}
      </p>
      {b.stats.length > 0 && (
        <dl className="tech-build__stats">
          {b.stats.map((s) => (
            <div key={s.label}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      )}
      <ul className="tech-chips" aria-label="Stack">
        {b.tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      {open && (
        <div id={`b-${b.id}`} className="tech-build__body">
          <p className="tech-build__over">{b.overview}</p>
          {b.diagram && (
            <ol className="tech-diagram" aria-label="Deploy pipeline">
              {b.diagram.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ol>
          )}
          {b.quote && (
            <blockquote className="tech-quote">
              <p>{b.quote.text}</p>
              <cite>{b.quote.who}</cite>
            </blockquote>
          )}
          <ol className="tech-flow">
            {b.flow.map((f, i) => (
              <li key={f.label}>
                <span className="tech-flow__n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <span className="tech-flow__label">{f.label}</span>
                  <b>{f.headline}</b>
                  {f.points && (
                    <ul>
                      {f.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
          {b.timeline && (
            <div className="tech-timeline">
              <h4>Timeline</h4>
              <ul>
                {b.timeline.map((t) => (
                  <li key={t.date}>
                    <b>{t.date}</b>
                    <span>{t.what}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {b.links.length > 0 && (
            <div className="tech-links">
              {b.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  )
}

/**
 * /tech: the engineering portfolio. The circuit board stays as a fixed backdrop;
 * the page is a technical read built from the CV and the project records.
 */
export default function TechUniverse() {
  const router = useRouter()
  const reduced = usePrefersReducedMotion()
  const bgRef = useRef<HTMLDivElement>(null)
  const state = useRef(initialStage())
  const field = usePointerField(bgRef)
  const running = useInViewRaf(bgRef)
  const [mobile, setMobile] = useState(false)
  const [open, setOpen] = useState<string | null>(TECH_BUILDS[0].id)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const on = () => setMobile(mq.matches)
    on()
    mq.addEventListener('change', on)
    notifyRouteReady()
    return () => mq.removeEventListener('change', on)
  }, [])

  const go = (href: string) => (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    try {
      sessionStorage.setItem(FROM_KEY, 'tech')
    } catch {}
    navigateWithTransition(router, href)
  }

  const jump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
  }

  const P = TECH_PROFILE

  return (
    <main className="tech" data-universe="tech">
      <div ref={bgRef} className="uni-shell tech__bg" data-universe="tech" aria-hidden="true">
        <div className="uni-shell__ground uni-ground--tech" />
        <CircuitLayer field={field} state={state} enabled={running} reduced={reduced} />
        <WarpGrid field={field} state={state} enabled={running} reduced={reduced} mobile={mobile} mode="tech" />
      </div>

      <header className="tech-bar">
        <a href="/#universe" className="uni-btn" onClick={go('/#universe')}>
          ← Back
        </a>
        <nav aria-label="Tech sections">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} onClick={jump(id)}>
              {label}
            </a>
          ))}
        </nav>
        <span className="tech-bar__right">
          <a href={P.cv} className="uni-btn" target="_blank" rel="noopener noreferrer">
            CV ↓
          </a>
          <a href="/creative" className="uni-btn" onClick={go('/creative')}>
            Creative →
          </a>
        </span>
      </header>

      <div className="tech-wrap">
        <section className="tech-hero" aria-labelledby="tech-h1">
          <p className="tech-term">
            <span>$</span> whoami
          </p>
          <h1 id="tech-h1">{P.name}</h1>
          <p className="tech-role">{P.role}</p>
          <p className="tech-term">
            <span>$</span> cat summary.txt
          </p>
          <p className="tech-sum">{P.summary}</p>
          <p className="tech-sum tech-sum--plain">{P.plain}</p>
          <div className="tech-cta">
            <a href={`mailto:${P.email}`}>Email me</a>
            <a href={P.github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
            <a href={P.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
            <a href={P.cv} target="_blank" rel="noopener noreferrer">
              Download CV
            </a>
          </div>
          <p className="tech-where">{P.where}</p>
        </section>

        <section id="numbers" className="tech-sec" aria-labelledby="tech-n">
          <h2 id="tech-n" className="tech-h">
            <span>01</span> Numbers
          </h2>
          <div className="tech-metrics">
            {TECH_METRICS.map((m) => (
              <div key={m.label} className="tech-metric">
                <b>{m.value}</b>
                <span>{m.label}</span>
                <i>{m.src}</i>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="tech-sec" aria-labelledby="tech-e">
          <h2 id="tech-e" className="tech-h">
            <span>02</span> Experience
          </h2>
          <div className="tech-roles">
            {TECH_EXPERIENCE.map((r) => (
              <article key={r.org} className="tech-role-card">
                <header>
                  <div>
                    <h3>{r.org}</h3>
                    {r.note && <p>{r.note}</p>}
                  </div>
                  <div className="tech-role-card__when">
                    <b>{r.title}</b>
                    <span>
                      {r.when} · {r.where}
                    </span>
                  </div>
                </header>
                <ul>
                  {r.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="tech-edu">
            {TECH_EDUCATION.map((e) => (
              <div key={e.org}>
                <b>{e.org}</b>
                <span>
                  {e.title} · {e.when}
                </span>
                <p>{e.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="builds" className="tech-sec" aria-labelledby="tech-b">
          <h2 id="tech-b" className="tech-h">
            <span>03</span> Case files
          </h2>
          <p className="tech-lede">Seven engineering builds. Open one for the problem, the constraints, the approach, the decisions and the result.</p>
          <article className="tech-company" aria-label="Stick'Em">
            <header>
              <div>
                <h3>{STICKEM.name}</h3>
                <p>{STICKEM.what}</p>
              </div>
              <ul className="tech-chips">
                {STICKEM.badges.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </header>
            <p className="tech-company__role">{STICKEM.role}</p>
            <p className="tech-plain">
              <span>In plain English</span>
              {STICKEM.plain}
            </p>
            <dl className="tech-company__stats">
              {STICKEM.stats.map((x) => (
                <div key={x.label}>
                  <dt>{x.value}</dt>
                  <dd>{x.label}</dd>
                </div>
              ))}
            </dl>
            <ul className="tech-company__work">
              {STICKEM.work.map((x) => (
                <li key={x.title}>
                  <b>{x.title}</b>
                  <span>{x.body}</span>
                </li>
              ))}
            </ul>
          </article>
          <div className="tech-builds">
            {TECH_BUILDS.map((b) => (
              <BuildCard key={b.id} b={b} open={open === b.id} onToggle={() => setOpen(open === b.id ? null : b.id)} />
            ))}
          </div>

          <h3 className="tech-sub">Shipped web products</h3>
          <div className="tech-web">
            {TECH_WEB.map((w) => (
              <article key={w.id} className="tech-web__card">
                <h4>{w.name}</h4>
                <p>{w.what}</p>
                <ul className="tech-chips">
                  {w.stack.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="tech-links">
                  <a href={w.live} target="_blank" rel="noopener noreferrer">
                    Live ↗
                  </a>
                  {w.repo && (
                    <a href={w.repo} target="_blank" rel="noopener noreferrer">
                      Source ↗
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="tech-sec" aria-labelledby="tech-s">
          <h2 id="tech-s" className="tech-h">
            <span>04</span> Technical skills
          </h2>
          <p className="tech-lede">Each skill: the technical name, what it means in plain words, and the builds that prove it.</p>
          <div className="tech-skills">
            {TECH_SKILLS.map((g) => (
              <div key={g.group} className="tech-skillgroup">
                <h3>{g.group}</h3>
                <ul>
                  {g.skills.map((k) => (
                    <li key={k.name}>
                      <b>{k.name}</b>
                      <p>{k.plain}</p>
                      <span>
                        {k.used.map((u) => (
                          <i key={u}>{MATRIX_COLS.find((c) => c.id === u)?.label}</i>
                        ))}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <h3 className="tech-sub">Evidence map</h3>
          <div className="tech-matrix-wrap">

            <table className="tech-matrix">
              <thead>
                <tr>
                  <th scope="col">Skill</th>
                  {MATRIX_COLS.map((c) => (
                    <th key={c.id} scope="col">
                      <span>{c.label}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              {TECH_SKILLS.map((g) => (
                <tbody key={g.group}>
                  <tr className="tech-matrix__group">
                    <th colSpan={MATRIX_COLS.length + 1} scope="colgroup">
                      {g.group}
                    </th>
                  </tr>
                  {g.skills.map((s) => (
                    <tr key={s.name}>
                      <th scope="row">{s.name}</th>
                      {MATRIX_COLS.map((c) => (
                        <td key={c.id}>
                          {s.used.includes(c.id) ? (
                            <span className="tech-dot" role="img" aria-label={`Used in ${c.label}`} />
                          ) : null}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
          <p className="tech-langs">Languages: {TECH_LANGUAGES}</p>
        </section>

        <section id="recognition" className="tech-sec" aria-labelledby="tech-r">
          <h2 id="tech-r" className="tech-h">
            <span>05</span> Recognition
          </h2>
          <ol className="tech-awards">
            {TECH_ACHIEVEMENTS.map((a) => (
              <li key={a.title}>
                <span className="tech-awards__yr">{a.year}</span>
                <div>
                  <b>{a.title}</b>
                  <p>{a.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="method" className="tech-sec" aria-labelledby="tech-m">
          <h2 id="tech-m" className="tech-h">
            <span>06</span> How I work
          </h2>
          <div className="tech-principles">
            {TECH_PRINCIPLES.map((p, i) => (
              <article key={p.title}>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
                <i>{p.proof}</i>
              </article>
            ))}
          </div>
        </section>

        <section id="hire" className="tech-sec" aria-labelledby="tech-hire">
          <h2 id="tech-hire" className="tech-h">
            <span>07</span> Hire me
          </h2>
          <div className="tech-hire__lead">
            <p className="tech-hire__head">{HIRE.headline}</p>
            <p className="tech-sum tech-sum--plain">{HIRE.plain}</p>
            <ul className="tech-chips" aria-label="Roles">
              {HIRE.open.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <p className="tech-hire__terms">{HIRE.terms}</p>
          </div>

          <h3 className="tech-sub">What I take on</h3>
          <div className="tech-services">
            {HIRE.services.map((x) => (
              <article key={x.title}>
                <h4>{x.title}</h4>
                <p>{x.body}</p>
                <i>{x.proof}</i>
              </article>
            ))}
          </div>

          <div className="tech-sw">
            <div>
              <h3 className="tech-sub">Strengths</h3>
              <ul>
                {HIRE.strengths.map((x) => (
                  <li key={x.title}>
                    <b>{x.title}</b>
                    <p>{x.body}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="tech-sub">Weaknesses, and what I do about them</h3>
              <ul>
                {HIRE.weaknesses.map((x) => (
                  <li key={x.title}>
                    <b>{x.title}</b>
                    <p>{x.body}</p>
                    <em>{x.fix}</em>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="tech-how">
            <div>
              <h3 className="tech-sub">How a project runs</h3>
              <ol>
                {HIRE.how.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ol>
            </div>
            <p className="tech-hire__terms">{HIRE.availability}</p>
          </div>
          <div className="tech-cta">
            <a href={`mailto:${P.email}?subject=Project`}>Pitch me a project</a>
            <a href="/creative" onClick={go('/creative')}>
              See the clipping and creative work
            </a>
          </div>
        </section>

        <section id="contact" className="tech-sec tech-contact" aria-labelledby="tech-c">
          <h2 id="tech-c" className="tech-h">
            <span>08</span> Contact
          </h2>
          <a className="tech-mail" href={`mailto:${P.email}`}>
            {P.email}
          </a>
          <div className="tech-cta">
            <a href={P.github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
            <a href={P.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
            <a href={P.cv} target="_blank" rel="noopener noreferrer">
              Download CV
            </a>
            <a href="/creative" onClick={go('/creative')}>
              See the creative side →
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}
