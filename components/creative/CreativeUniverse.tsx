'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import ArcLoader from './ArcLoader'
import ArcGallery, { type GalleryPhase } from './ArcGallery'
import WorkDetail from './WorkDetail'
import { WORKS, PRELOAD, SOCIAL, type Work } from '@/lib/creative/works'
import { CATEGORIES, type CategoryId } from '@/lib/creative/categories'
import { KEYS, LOADER, readFlag, setFlag } from '@/lib/creative/intro'
import { garamond } from '@/lib/creative/fonts'
import { FROM_KEY, navigateWithTransition, notifyRouteReady } from '@/lib/universe/transition'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * /creative · Act 3. White loader with the 000→100 counter while the cards
 * stack and fan into an arc, then my sky fades in and the arc opens into the
 * curved, draggable gallery. A direct visit starts here; a click from the
 * split arrives here after Acts 1–2. Reduced motion: a 300ms crossfade to the
 * finished gallery.
 */
const SKY = { desktop: '/creative/sky-desktop.webp', mobile: '/creative/sky-mobile.webp' }

export default function CreativeUniverse() {
  const router = useRouter()
  const reduced = usePrefersReducedMotion()
  const [mounted, setMounted] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [phase, setPhase] = useState<GalleryPhase>('loading')
  const [skip, setSkip] = useState(false)
  const [filter, setFilter] = useState<CategoryId | 'all'>('all')
  const [detail, setDetail] = useState<{ work: Work; rect: DOMRect } | null>(null)
  const progress = useRef(0)
  const skyShift = useRef(0)
  const skyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const on = () => setMobile(mq.matches)
    on()
    mq.addEventListener('change', on)
    const skipped = readFlag(KEYS.SKIP)
    if (skipped) setFlag(KEYS.SKIP, false)
    setSkip(skipped)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      progress.current = 1
      setPhase('live')
    }
    setMounted(true)
    notifyRouteReady()
    return () => mq.removeEventListener('change', on)
  }, [])

  // sky parallax, opposite to the gallery's rotation
  useEffect(() => {
    if (phase === 'loading' || reduced) return
    let raf = 0
    const loop = () => {
      if (skyRef.current) skyRef.current.style.transform = `translate3d(${skyShift.current.toFixed(2)}px,0,0) scale(1.04)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [phase, reduced])

  const onLoaded = useCallback(() => {
    setPhase('reveal')
    window.setTimeout(() => setPhase('live'), LOADER.REVEAL_MS)
  }, [])

  const go = (href: string, from: 'creative' | 'tech') => (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
    e.preventDefault()
    try {
      sessionStorage.setItem(FROM_KEY, from)
    } catch {}
    navigateWithTransition(router, href)
  }

  const openStudio = () => {
    const w = WORKS.find((x) => x.id === 'retro-studios')
    const el = document.querySelector<HTMLElement>('.cr-card .cr-card__media')
    if (w && el) setDetail({ work: w, rect: el.getBoundingClientRect() })
  }

  const urls = [...PRELOAD, mobile ? SKY.mobile : SKY.desktop]
  const live = phase === 'live'

  return (
    <main className={`cr-universe ${garamond.variable}`} data-phase={phase} data-reduced={reduced || undefined}>
      <div ref={skyRef} className="cr-sky" aria-hidden="true">
        <picture>
          <source media="(max-width: 767px)" srcSet={SKY.mobile} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={SKY.desktop} alt="" decoding="async" />
        </picture>
      </div>

      <header className="cr-bar">
        <a href="/creative" className="cr-mark" aria-label="Retro, creative universe home">
          Retro.
        </a>
        <nav className="cr-nav" aria-label="Creative">
          <button type="button" onClick={() => setFilter('all')}>
            Work
          </button>
          <button type="button" onClick={openStudio}>
            Studio
          </button>
          <button type="button" onClick={() => setFilter('music')}>
            Music
          </button>
          <a href="/#universe" onClick={go('/#universe', 'creative')}>
            ← Universe
          </a>
          <a href="/tech" className="cr-nav__switch" onClick={go('/tech', 'tech')}>
            Switch to TECH →
          </a>
        </nav>
        <div className="cr-social">
          <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
            </svg>
          </a>
          <a href={SOCIAL.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                fill="currentColor"
                d="M16.6 3c.4 2.2 1.8 3.7 4 3.9v3.1c-1.5.1-2.8-.4-4-1.1v6.2c0 3.6-2.8 5.9-5.8 5.9A5.8 5.8 0 0 1 5 15.2c0-3.6 3.1-6.2 6.7-5.6v3.2c-1.6-.4-3.4.6-3.4 2.4 0 1.5 1.2 2.6 2.6 2.6 1.6 0 2.6-1 2.6-2.9V3h3.1z"
              />
            </svg>
          </a>
        </div>
      </header>

      {mounted && phase === 'loading' && !reduced && (
        <ArcLoader urls={urls} progress={progress} skip={skip} onDone={onLoaded} />
      )}

      <div className="cr-filters" role="tablist" aria-label="Filter work">
        {[{ id: 'all' as const, label: 'All' }, ...CATEGORIES].map((c) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={filter === c.id}
            onClick={() => setFilter(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {mounted && (
        <ArcGallery
          works={WORKS}
          filter={filter}
          phase={phase}
          progress={progress}
          mobile={mobile}
          reduced={reduced}
          skyShift={skyShift}
          paused={!!detail}
          onOpen={(work, rect) => setDetail({ work, rect })}
        />
      )}

      <p className="cr-tagline">
        I direct AI campaigns, build brand worlds and make music.
        <br />
        Retro Studios, Beppu.
      </p>
      {live && (
        <p className="cr-hint" aria-hidden="true">
          {mobile ? 'Swipe' : 'Drag · scroll · ← →'}
        </p>
      )}

      {detail && <WorkDetail work={detail.work} from={detail.rect} onClose={() => setDetail(null)} />}
    </main>
  )
}
