'use client'

import Image from 'next/image'
import { useRef, useState, useCallback } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import { albums, retroReleases, vault, type Album, type Release, type Track, type VaultItem } from '@/lib/projects'
import AlbumGrid, { ReleaseGrid } from './AlbumGrid'
import InfinityWipe from './InfinityWipe'
import VaultRow from './VaultRow'
import SkillsBlock from './SkillsBlock'
import CaseStudyOverlay from './CaseStudyOverlay'
import Embers from './Embers'
import LayeredTitle from './LayeredTitle'

/**
 * Side A / Side B. The record is one release with two sides — the split is
 * organisational, not a redesign: both tracks render the identical sleeve.
 * Creative leads, because that is the half the site used to bury.
 */
const TRACKS: { id: Track; label: string; note: string; accent: string }[] = [
  { id: 'creative', label: 'creative direction', note: 'side a', accent: '#f5f5f2' },
  { id: 'tech', label: 'engineering', note: 'side b', accent: '#f97316' },
]

function TrackToggle({
  value,
  onChange,
  switches,
  reduced,
}: {
  value: Track
  onChange: (t: Track) => void
  switches: number
  reduced: boolean | null
}) {
  const other = TRACKS.find((t) => t.id !== value)!
  const current = TRACKS.find((t) => t.id === value)!
  return (
    <div className="flex flex-col items-center gap-4 mb-14">
      {/* the interchange: one continuous loop, crossing the centre once */}
      <InfinityWipe active={switches} from={other.accent} to={current.accent} reduced={reduced} />
      <div
        role="tablist"
        aria-label="Project track"
        className="inline-flex p-1 rounded-full"
        style={{ border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(0,0,0,0.45)' }}
      >
        {TRACKS.map((t) => {
          const active = t.id === value
          return (
            <button
              key={t.id}
              role="tab"
              aria-selected={active}
              onClick={() => onChange(t.id)}
              className="relative px-5 md:px-7 py-2.5 rounded-full font-body text-[11px] md:text-xs tracking-[0.18em] uppercase transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              style={{ color: active ? '#0a0a0a' : 'rgba(245,245,242,0.6)' }}
            >
              {active && (
                <motion.span
                  layoutId="track-pill"
                  className="absolute inset-0 rounded-full"
                  style={{ background: t.accent }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <span className="opacity-50 tabular-nums">{t.note}</span>
                {t.label}
              </span>
            </button>
          )
        })}
      </div>
      <p className="font-body text-[11px] tracking-[0.16em] uppercase" style={{ color: 'rgba(245,245,242,0.4)' }}>
        two sides of the same record
      </p>
    </div>
  )
}

export default function FireScene() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const [selected, setSelected] = useState<Album | VaultItem | Release | null>(null)
  // creative leads: this site is being read by design hires as often as eng ones
  const [track, setTrack] = useState<Track>('creative')
  // bumping this restarts the lemniscate trace on every interchange
  const [switches, setSwitches] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // the hero already morphed the burning hoop in — this scene starts lit,
  // with the warm bloom settling as the content arrives
  const glowOpacity = useTransform(scrollYProgress, [0, 0.14], [0.45, 0.25])

  // transition 2: the fire dies. Desaturate, dim, drift upward, navy bleeds in.
  // The grade is a second, pre-filtered copy of the frame faded in over the
  // first rather than a filter animated on the live layer: animating `filter`
  // on a full-viewport element repaints it every frame, which measured as the
  // single biggest source of scroll jank in this scene (median frame 27.8ms ->
  // 18.3ms at 4x CPU throttle when removed). Both copies hang off the same
  // ken-burns parent, so they cannot drift out of sync.
  const dieFade = useTransform(scrollYProgress, [0.85, 1], [0, 1])
  const dieDrift = useTransform(scrollYProgress, [0.82, 1], ['0%', '-5%'])
  const navyIn = useTransform(scrollYProgress, [0.88, 1], [0, 0.9])
  const emberFade = useTransform(scrollYProgress, [0.82, 0.94], [1, 0])

  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-30%' })

  const open = useCallback((item: Album | VaultItem | Release) => setSelected(item), [])
  const close = useCallback(() => setSelected(null), [])
  const switchTrack = useCallback((t: Track) => {
    setTrack((prev) => {
      if (prev !== t) setSwitches((n) => n + 1)
      return t
    })
  }, [])

  return (
    <section ref={ref} id="projects" className="relative bg-ink">
      {/* ── sticky fire backdrop ── */}
      <div className="sticky top-0 h-screen overflow-hidden" style={{ zIndex: 0 }}>
        <motion.div
          className="absolute inset-0"
          style={reduced ? undefined : { y: dieDrift }}
        >
          <div
            className="absolute inset-0"
            style={reduced ? undefined : { animation: 'kenBurns 36s ease-in-out infinite alternate' }}
          >
            <Image
              src="/scenes/burning-hoop.webp"
              alt=""
              aria-hidden
              fill
              className="object-cover"
              sizes="100vw"
              style={{ objectPosition: 'center 30%' }}
            />
            {/* the dead grade, cross-faded in on opacity alone */}
            {!reduced && (
              <motion.div
                className="absolute inset-0"
                style={{ opacity: dieFade, filter: 'saturate(0.15) brightness(0.45)' }}
                aria-hidden
              >
                <Image
                  src="/scenes/burning-hoop.webp"
                  alt=""
                  aria-hidden
                  fill
                  className="object-cover"
                  sizes="100vw"
                  style={{ objectPosition: 'center 30%' }}
                />
              </motion.div>
            )}
          </div>
          {/* darken for legibility */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.35) 40%, rgba(5,5,5,0.72) 100%)' }}
          />
        </motion.div>

        {/* warm bloom settling over the hoop (left-center) */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: reduced ? 0 : glowOpacity,
            background: 'radial-gradient(ellipse 60% 55% at 30% 52%, rgba(249,115,22,0.5) 0%, rgba(249,115,22,0.12) 40%, transparent 70%)',
          }}
        />

        {/* embers */}
        {!reduced && (
          <motion.div className="absolute inset-0" style={{ opacity: emberFade }}>
            <Embers />
          </motion.div>
        )}

        {/* deep navy bleeding in as the fire dies */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: reduced ? 0 : navyIn,
            background: 'linear-gradient(to bottom, #0a0f1e 0%, rgba(10,15,30,0.85) 55%, rgba(10,15,30,0.95) 100%)',
          }}
        />
      </div>

      {/* ── content flowing over the sticky backdrop ── */}
      <div className="relative -mt-[100vh]" style={{ zIndex: 1 }}>
        {/* re-introduction lives inside the hero transition; static fallback
            here for reduced-motion users who never see the pin */}
        {reduced && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
            <p className="text-lg md:text-xl mb-4" style={{ fontFamily: 'var(--font-scrawl), cursive', color: 'rgba(249,115,22,0.9)' }}>
              allow me to re-introduce myself...
            </p>
            <LayeredTitle
              text="MY NAME IS RETRO"
              accent="#f97316"
              scrawl="nice to meet you"
              className="font-display text-white leading-[0.95]"
              style={{ fontSize: 'clamp(2.6rem, 9vw, 7.5rem)' }}
            />
            <p className="font-body text-sm md:text-base max-w-md leading-relaxed mt-8" style={{ color: 'rgba(245,245,242,0.65)' }}>
              retro is the creative part of sameer. the half that directs the camera,
              cuts the film, and makes the music. the engineer ships. retro makes it cinematic.
            </p>
          </div>
        )}

        {/* title beat */}
        <div ref={titleRef} className="min-h-screen flex flex-col items-center justify-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-body text-[11px] tracking-mega uppercase mb-5"
            style={{ color: 'rgba(249,115,22,0.85)' }}
          >
            scene 02
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <LayeredTitle
              text="PROJECTS"
              accent="#f97316"
              scrawl="the fire"
              className="font-display text-white text-center leading-none"
              style={{ fontSize: 'clamp(4rem, 14vw, 11rem)', textShadow: '0 6px 40px rgba(0,0,0,0.6)' }}
            />
          </motion.div>
          {/* flame underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={titleInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-[3px] w-[min(320px,60vw)] mt-6 rounded-full origin-left"
            style={{
              background: 'linear-gradient(to right, #fbbf24, #f97316 40%, rgba(249,115,22,0.15))',
              boxShadow: '0 0 18px rgba(249,115,22,0.7)',
              animation: 'flameShimmer 2.6s ease-in-out infinite',
            }}
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={titleInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="font-body text-sm text-center mt-6 max-w-md leading-relaxed"
            style={{ color: 'rgba(245,245,242,0.6)' }}
          >
            Two sides: the studio and the engineering. Click an album to open it.
          </motion.p>
        </div>

        {/* the mentality — a beat alone with the fire */}
        <div className="min-h-[55vh] flex items-center justify-center px-6 pb-10">
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-25%' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-center"
          >
            <p
              style={{
                fontFamily: 'var(--font-scrawl), cursive',
                fontSize: 'clamp(1.5rem, 4.2vw, 2.7rem)',
                lineHeight: 1.35,
                color: '#f5f5f2',
                transform: 'rotate(-1.5deg)',
                textShadow: '0 4px 30px rgba(0,0,0,0.7)',
              }}
            >
              &ldquo;i love the pressure,
              <br />
              <span style={{ color: '#f97316' }}>it&rsquo;s the reason i am where i am today.&rdquo;</span>
            </p>
            <footer
              className="font-body text-[10px] tracking-[0.35em] uppercase mt-6"
              style={{ color: 'rgba(245,245,242,0.45)' }}
            >
              the mentality
            </footer>
          </motion.blockquote>
        </div>

        {/* album grid — split into two tracks */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 pb-24">
          <TrackToggle value={track} onChange={switchTrack} switches={switches} reduced={reduced} />

          <AlbumGrid albums={albums.filter((a) => a.track === track)} onOpen={open} />

          {/* the discography — RETRO Studios is the artist, each release its own album */}
          {track === 'creative' && (
            <div className="mt-28">
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 0.8 }}
                className="font-body text-[11px] tracking-mega uppercase mb-5 text-center"
                style={{ color: 'rgba(245,245,242,0.5)' }}
              >
                scene 02b · the discography
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="flex justify-center"
              >
                <LayeredTitle
                  text="RETRO STUDIOS"
                  accent="#f5f5f2"
                  scrawl="the back catalogue"
                  className="font-display text-white text-center leading-none"
                  style={{ fontSize: 'clamp(2.2rem, 7vw, 5rem)', textShadow: '0 6px 40px rgba(0,0,0,0.6)' }}
                />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-15%' }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-body text-sm text-center mt-10 mb-14 max-w-lg mx-auto leading-relaxed"
                style={{ color: 'rgba(245,245,242,0.6)' }}
              >
                Seven releases under one studio. Each one opens its own story: why it exists
                and what it cost, in the colour and typeface of the brand it belongs to, not
                this site&apos;s. The live work is one click further in.
              </motion.p>
              <ReleaseGrid releases={retroReleases} onOpen={open} />
            </div>
          )}
        </div>

        {/* the vault */}
        <div id="vault" className="max-w-6xl mx-auto px-6 md:px-10 pb-24">
          <VaultRow items={vault} onOpen={open} />
        </div>

        {/* skills */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 pb-[26vh]">
          <SkillsBlock />
        </div>
      </div>

      {/* case study overlay */}
      <AnimatePresence>
        {selected && <CaseStudyOverlay item={selected} onClose={close} />}
      </AnimatePresence>
    </section>
  )
}
