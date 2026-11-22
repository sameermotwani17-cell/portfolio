import type { Metadata } from 'next'
import Link from 'next/link'
import { ICONS } from '@/lib/icons'
import { GROUPS, LINKS, SONG, cleanSrc, type LinkItem } from '@/lib/links'
import './links.css'

const TITLE = 'RETRO · links'
const DESCRIPTION = 'New single "RETRO did it again" is out. Stream it, follow RETRO on every platform, and find Retro Clips.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/links' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/links',
    siteName: 'RETRO',
    images: [{ url: '/links/cover-og.jpg', width: 1200, height: 1200, alt: 'RETRO did it again cover art' }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/links/cover-og.jpg'] },
}

function Glyph({ name, className = 'h-5 w-5' }: { name?: string; className?: string }) {
  const ic = name ? ICONS[name] : undefined
  if (!ic) return null
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={`${className} shrink-0 fill-current`}>
      <path d={ic.path} />
    </svg>
  )
}

const ROW =
  'lk-row lk-rise group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 backdrop-blur-sm ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b5cf6]'

function Row({ link, src, i }: { link: LinkItem; src: string; i: number }) {
  const inner = (
    <>
      <span className="flex min-w-0 items-center gap-4">
        {link.img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={link.img} alt="" width={44} height={44} className="lk-ico h-11 w-11 shrink-0 rounded-xl object-contain" />
        ) : (
          <span className="lk-ico flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-paper">
            <Glyph name={link.icon} />
          </span>
        )}
        <span className="min-w-0">
          <span className="block font-body text-[15px] font-medium text-paper">{link.label}</span>
          {link.note && <span className="block truncate font-mono text-xs text-paper/50">{link.note}</span>}
        </span>
      </span>
      <span
        aria-hidden
        className="font-body text-lg text-paper/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-paper"
      >
        {link.external ? '↗' : '→'}
      </span>
    </>
  )
  const style = { ['--i' as string]: i } as React.CSSProperties

  if (!link.external) {
    return (
      <Link href={link.href} className={ROW} style={style}>
        {inner}
      </Link>
    )
  }
  // plain <a>, not <Link>: no prefetch, so only real taps are counted
  const href = `/go/${link.slug}${src ? `?src=${src}` : ''}`
  return (
    <a href={href} className={ROW} style={style}>
      {inner}
    </a>
  )
}

export default function LinksPage({ searchParams }: { searchParams: { src?: string } }) {
  const src = cleanSrc(searchParams?.src)
  const musicRows = LINKS.filter((l) => l.group === 'music')
  const goSong = `/go/song${src ? `?src=${src}` : ''}`
  let n = 3 // stagger index; hero + song card take the first slots

  return (
    <main className="lk-root relative min-h-screen overflow-hidden bg-ink text-paper">
      <div className="lk-aurora" aria-hidden>
        <i />
        <i />
        <i />
      </div>
      <div className="lk-grain" aria-hidden />

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-col">
        {/* HERO: portrait + glitch wordmark */}
        <header className="lk-hero">
          <div className="lk-photo aspect-[3/3.6] w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/links/hero.webp"
              alt="RETRO, portrait with rings"
              width={1100}
              height={1650}
              fetchPriority="high"
              decoding="async"
            />
          </div>
          <div className="absolute inset-x-0 bottom-0 px-5 pb-1 text-center">
            <h1 className="lk-word lk-rise font-display" data-t="RETRO" style={{ ['--i' as string]: 0 } as React.CSSProperties}>
              RETRO
            </h1>
            <p
              className="lk-rise mt-2 font-mono text-[11px] uppercase tracking-[0.32em] text-paper/70"
              style={{ ['--i' as string]: 1 } as React.CSSProperties}
            >
              Streamer · Artist · Creator
            </p>
          </div>
        </header>

        <div className="px-5 pb-16 pt-6">
          {/* NEW SINGLE */}
          <div className="lk-rise mb-3 flex items-center justify-center gap-2.5" style={{ ['--i' as string]: 2 } as React.CSSProperties}>
            <span className="lk-dot" aria-hidden />
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-paper/80">New single · out now</span>
          </div>

          <a href={goSong} className="lk-song lk-rise block" style={{ ['--i' as string]: 3 } as React.CSSProperties}>
            <div className="lk-song-in flex items-center gap-4 p-3.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/links/cover.webp"
                alt="RETRO did it again cover art"
                width={104}
                height={104}
                className="lk-cover h-[104px] w-[104px] shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0">
                <p className="font-display text-[26px] leading-[1.02] text-paper">{SONG.title}</p>
                <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">RETRO</p>
                <span className="lk-cta mt-3 inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.12em] text-ink">
                  Play now <span aria-hidden>▶</span>
                </span>
              </div>
            </div>
          </a>

          <section className="mt-3" aria-label="Listen">
            <div className="flex flex-col gap-3">
              {musicRows.map((l) => (
                <Row key={l.slug} link={l} src={src} i={++n} />
              ))}
            </div>
          </section>

          {GROUPS.map((g) => {
            const items = LINKS.filter((l) => l.group === g.id)
            if (!items.length) return null
            return (
              <section key={g.id} className="mt-9" aria-labelledby={`g-${g.id}`}>
                <h2
                  id={`g-${g.id}`}
                  className="lk-rise mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/45"
                  style={{ ['--i' as string]: ++n } as React.CSSProperties}
                >
                  {g.title}
                </h2>
                <div className="flex flex-col gap-3">
                  {items.map((l) => (
                    <Row key={l.slug} link={l} src={src} i={++n} />
                  ))}
                </div>
              </section>
            )
          })}

          <footer className="mt-14 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-paper/30">
            © RETRO · xsofficialbrand.com
          </footer>
        </div>
      </div>
    </main>
  )
}
