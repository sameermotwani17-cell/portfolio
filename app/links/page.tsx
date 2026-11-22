import type { Metadata } from 'next'
import Link from 'next/link'
import { GROUPS, LINKS, SONG, cleanSrc, type LinkItem } from '@/lib/links'

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
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'RETRO' }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION, images: ['/og.jpg'] },
}

const ROW =
  'group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 ' +
  'transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.07] ' +
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b5cf6]'

function Row({ link, src }: { link: LinkItem; src: string }) {
  const inner = (
    <>
      <span className="min-w-0">
        <span className="block font-body text-base text-paper">{link.label}</span>
        {link.note && <span className="block truncate font-mono text-xs text-paper/50">{link.note}</span>}
      </span>
      <span
        aria-hidden
        className="font-body text-lg text-paper/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-paper"
      >
        {link.external ? '↗' : '→'}
      </span>
    </>
  )

  if (!link.external) {
    return (
      <Link href={link.href} className={ROW}>
        {inner}
      </Link>
    )
  }
  // plain <a>, not <Link>: no prefetch, so only real taps are counted
  const href = `/go/${link.slug}${src ? `?src=${src}` : ''}`
  return (
    <a href={href} className={ROW}>
      {inner}
    </a>
  )
}

export default function LinksPage({ searchParams }: { searchParams: { src?: string } }) {
  const src = cleanSrc(searchParams?.src)
  const song = LINKS.find((l) => l.slug === 'song')!
  const apple = LINKS.find((l) => l.slug === 'apple')!
  const goSong = `/go/song${src ? `?src=${src}` : ''}`

  return (
    <main className="relative min-h-screen overflow-hidden bg-ink text-paper">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px]"
        style={{ background: 'radial-gradient(60% 60% at 50% 0%, rgba(139,92,246,0.28), rgba(5,5,5,0) 70%)' }}
      />

      <div className="relative mx-auto flex w-full max-w-md flex-col px-5 pb-16 pt-14">
        <header className="text-center">
          <h1 className="font-display text-[88px] leading-[0.9] tracking-tight">RETRO</h1>
          <p className="mt-3 font-body text-sm text-paper/70">🇱🇷 in 🇯🇵 · I stream, make songs, make content</p>
        </header>

        {/* New single: the one thing this page exists to push */}
        <a
          href={goSong}
          className="group mt-10 block rounded-3xl border border-[#8b5cf6]/40 bg-[#8b5cf6]/[0.08] p-4 shadow-[0_0_60px_-12px_rgba(139,92,246,0.55)] transition-colors duration-200 hover:bg-[#8b5cf6]/[0.14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8b5cf6]"
        >
          <div className="flex items-center gap-4">
            <div
              aria-hidden
              className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl bg-paper p-2 text-center font-stencil text-[17px] uppercase leading-[0.95] text-ink"
            >
              RETRO
              <br />
              DID IT
              <br />
              AGAIN
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#a78bfa]">New single · out now</p>
              <p className="mt-1 font-display text-2xl leading-tight">{SONG.title}</p>
              <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-paper px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.12em] text-ink transition-transform duration-200 group-hover:scale-[1.03]">
                {song.label} <span aria-hidden>↗</span>
              </span>
            </div>
          </div>
        </a>
        <div className="mt-3">
          <Row link={apple} src={src} />
        </div>

        {GROUPS.map((g) => {
          const items = LINKS.filter((l) => l.group === g.id)
          if (!items.length) return null
          return (
            <section key={g.id} className="mt-9" aria-labelledby={`g-${g.id}`}>
              <h2 id={`g-${g.id}`} className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/40">
                {g.title}
              </h2>
              <div className="flex flex-col gap-3">
                {items.map((l) => (
                  <Row key={l.slug} link={l} src={src} />
                ))}
              </div>
            </section>
          )
        })}

        <footer className="mt-14 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-paper/30">
          © RETRO · xsofficialbrand.com
        </footer>
      </div>
    </main>
  )
}
