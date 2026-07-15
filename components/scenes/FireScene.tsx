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
import { albums, vault, type Album, type VaultItem } from '@/lib/projects'
import AlbumGrid from './AlbumGrid'
import VaultRow from './VaultRow'
import SkillsBlock from './SkillsBlock'
import CaseStudyOverlay from './CaseStudyOverlay'
import Embers from './Embers'
import LayeredTitle from './LayeredTitle'

export default function FireScene() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const [selected, setSelected] = useState<Album | VaultItem | null>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // the hero already morphed the burning hoop in — this scene starts lit,
  // with the warm bloom settling as the content arrives
  const glowOpacity = useTransform(scrollYProgress, [0, 0.14], [0.45, 0.25])

  // transition 2: the fire dies — desaturate, dim, drift upward, navy bleeds in
  const dieFilter = useTransform(
    scrollYProgress,
    [0.85, 1],
    ['saturate(1) brightness(1)', 'saturate(0.15) brightness(0.45)']
  )
  const dieDrift = useTransform(scrollYProgress, [0.82, 1], ['0%', '-5%'])
  const navyIn = useTransform(scrollYProgress, [0.88, 1], [0, 0.9])
  const emberFade = useTransform(scrollYProgress, [0.82, 0.94], [1, 0])

  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: '-30%' })

  const open = useCallback((item: Album | VaultItem) => setSelected(item), [])
  const close = useCallback(() => setSelected(null), [])

  return (
    <section ref={ref} id="projects" className="relative bg-ink">
      {/* ── sticky fire backdrop ── */}
      <div className="sticky top-0 h-screen overflow-hidden" style={{ zIndex: 0 }}>
        <motion.div
          className="absolute inset-0"
          style={reduced ? undefined : { filter: dieFilter, y: dieDrift }}
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
            Four records that mattered. Click an album to open it.
          </motion.p>
        </div>

        {/* album grid */}
        <div className="max-w-6xl mx-auto px-6 md:px-10 pb-24">
          <AlbumGrid albums={albums} onOpen={open} />
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
