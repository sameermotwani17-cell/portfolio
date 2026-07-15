'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

// slower, softer easing personality for the dusk scene
const EXHALE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const fadeUp = {
  initial: { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
}

// ─── Beyond-the-code blocks ───────────────────────────────────────────────────

function RetroBlock() {
  return (
    <motion.div {...fadeUp} transition={{ duration: 1.1, ease: EXHALE }} className="group relative rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(139,147,201,0.16)', background: 'rgba(10,15,30,0.55)', backdropFilter: 'blur(8px)' }}>
      <div className="flex flex-col sm:flex-row">
        <div className="relative sm:w-44 h-40 sm:h-auto shrink-0">
          <Image src="/cinematic.png" alt="Retro Studios cinematic work" fill className="object-cover" sizes="176px"
            style={{ filter: 'brightness(0.6) saturate(0.85)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, rgba(10,15,30,0.9))' }} />
        </div>
        <div className="p-6 md:p-7 flex-1">
          <p className="font-body text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: '#fbbf24' }}>
            retro studios · starlabs
          </p>
          <h4 className="font-display text-2xl text-white leading-tight">the studio</h4>
          <p className="font-body text-sm leading-relaxed mt-3" style={{ color: 'rgba(245,245,242,0.62)' }}>
            One person, an AI-native stack, and the thesis that it can outproduce a full agency.
            Cinematic brand content, shipped daily.
          </p>
          <a
            href="https://www.instagram.com/retro.studios_"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-2.5 mt-5 font-body text-[11px] tracking-[0.16em] uppercase px-4 py-2 rounded-full transition-all duration-500 hover:text-white"
            style={{ border: '1px solid rgba(251,191,36,0.4)', color: '#fbbf24', background: 'rgba(251,191,36,0.07)' }}
          >
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inline-flex w-full h-full rounded-full animate-ping" style={{ background: '#fbbf24', opacity: 0.6 }} />
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full" style={{ background: '#fbbf24' }} />
            </span>
            @retro.studios_
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">↗ live feed</span>
          </a>
        </div>
      </div>
    </motion.div>
  )
}

/* small hoop icon — the burning hoop, remembered */
function HoopIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <rect x="4" y="3" width="18" height="12" rx="1" stroke="rgba(139,147,201,0.7)" strokeWidth="1.4" />
      <rect x="9" y="7" width="8" height="6" rx="0.5" stroke="rgba(249,115,22,0.8)" strokeWidth="1.2" />
      <path d="M9 13 c0 4 8 4 8 0" stroke="rgba(139,147,201,0.7)" strokeWidth="1.2" fill="none" />
      <line x1="13" y1="15" x2="13" y2="23" stroke="rgba(139,147,201,0.5)" strokeWidth="1.4" />
    </svg>
  )
}

function GymBlock() {
  return (
    <motion.div {...fadeUp} transition={{ duration: 1.1, delay: 0.12, ease: EXHALE }} className="relative rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(139,147,201,0.16)', background: 'rgba(10,15,30,0.55)', backdropFilter: 'blur(8px)' }}>
      <div className="flex flex-col sm:flex-row">
        <div className="relative sm:w-44 h-40 sm:h-auto shrink-0">
          <Image src="/basketball.png" alt="Basketball" fill className="object-cover" sizes="176px"
            style={{ filter: 'brightness(0.5) saturate(0.7) hue-rotate(-10deg)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, rgba(10,15,30,0.9))' }} />
        </div>
        <div className="p-6 md:p-7 flex-1">
          <div className="flex items-center gap-2.5 mb-2">
            <p className="font-body text-[10px] tracking-[0.3em] uppercase" style={{ color: '#8b93c9' }}>
              the gym
            </p>
            <HoopIcon />
          </div>
          <h4 className="font-display text-2xl text-white leading-tight">training &amp; hooping</h4>
          <p className="font-body text-sm leading-relaxed mt-3" style={{ color: 'rgba(245,245,242,0.62)' }}>
            Lifting most mornings, point guard whenever there&apos;s a run. Reading the play before it
            happens is the same skill as reading a codebase — you just sweat more. That burning hoop
            back there? Still my favorite frame on this site.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function MusicBlock() {
  return (
    <motion.div {...fadeUp} transition={{ duration: 1.1, delay: 0.12, ease: EXHALE }} className="relative rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(139,147,201,0.16)', background: 'rgba(10,15,30,0.55)', backdropFilter: 'blur(8px)' }}>
      <div className="flex flex-col sm:flex-row">
        <div className="relative sm:w-44 h-40 sm:h-auto shrink-0">
          <Image src="/music.png" alt="Music" fill className="object-cover" sizes="176px"
            style={{ filter: 'brightness(0.45) saturate(1.1)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, rgba(10,15,30,0.9))' }} />
        </div>
        <div className="p-6 md:p-7 flex-1">
          <p className="font-body text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: '#8b5cf6' }}>
            music · 5 tracks released
          </p>
          <h4 className="font-display text-2xl text-white leading-tight">the j. cole thread</h4>
          <p className="font-body text-sm leading-relaxed mt-3" style={{ color: 'rgba(245,245,242,0.62)' }}>
            Original production — writing lyrics before writing code was ever a thing. This whole
            site is sequenced like an album because that&apos;s how Cole taught me stories are told:
            light, fire, then dusk.
          </p>
          <div className="flex items-center gap-2.5 mt-5 flex-wrap">
            <a href="https://open.spotify.com/artist/2vNpaYQTU7PNUh3BjOx07b?si=oxYbEYnHT--4lLJ8wOWSZg" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-[11px] tracking-[0.12em] uppercase px-4 py-2 rounded-full transition-opacity hover:opacity-80"
              style={{ border: '1px solid rgba(30,215,96,0.35)', color: '#1ed760', background: 'rgba(30,215,96,0.08)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Spotify
            </a>
            <a href="https://music.apple.com/jp/artist/retro/1803961641?l=en-US" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-[11px] tracking-[0.12em] uppercase px-4 py-2 rounded-full transition-opacity hover:opacity-80"
              style={{ border: '1px solid rgba(250,77,77,0.3)', color: '#fa4d4d', background: 'rgba(250,77,77,0.07)' }}>
              Apple Music
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ChessBlock() {
  return (
    <motion.div {...fadeUp} transition={{ duration: 1.1, delay: 0.2, ease: EXHALE }} className="relative rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(139,147,201,0.16)', background: 'rgba(10,15,30,0.55)', backdropFilter: 'blur(8px)' }}>
      <div className="flex flex-col sm:flex-row">
        <div className="relative sm:w-44 h-40 sm:h-auto shrink-0">
          <Image src="/chess.png" alt="Chess" fill className="object-cover" sizes="176px"
            style={{ filter: 'brightness(0.5) saturate(0.6)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 60%, rgba(10,15,30,0.9))' }} />
        </div>
        <div className="p-6 md:p-7 flex-1">
          <p className="font-body text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: '#3b82f6' }}>
            strategic mind
          </p>
          <h4 className="font-display text-2xl text-white leading-tight">chess</h4>
          <p className="font-body text-sm leading-relaxed mt-3" style={{ color: 'rgba(245,245,242,0.62)' }}>
            Twelve moves ahead. Patience as a weapon.
          </p>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Awards (migrated, restyled quieter) ──────────────────────────────────────

const awards = [
  { title: 'AIHack 2026 — Top 4, Final Round', subtitle: 'Aiful Corporation · ¥1,000,000 prize competition', year: '2026' },
  { title: 'APU Annual Hackathon 2025 — 1st Place', subtitle: 'GOMI Snap · AI Waste Classification Platform', year: '2025' },
  { title: 'Hult Prize APU Campus Round 2026', subtitle: '1st Runner-Up · Best Speaker Award · Global STEAM Initiative', year: '2026' },
  { title: 'Next Einstein Forum — 1st Place', subtitle: 'Africa Science Week · Educate the Next Generation', year: '2023' },
  { title: 'Best High School Short Story Writer', subtitle: 'Educate the Next Generation 2023', year: '2023' },
]

function AwardsList() {
  return (
    <div id="awards" className="mt-28">
      <motion.div {...fadeUp} transition={{ duration: 1, ease: EXHALE }} className="flex items-center gap-4 mb-4">
        <h3 className="font-display text-2xl md:text-3xl text-white">recognition</h3>
        <span className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(139,147,201,0.35), transparent)' }} />
      </motion.div>
      {awards.map((award, i) => (
        <motion.div
          key={award.title}
          {...fadeUp}
          transition={{ duration: 0.9, delay: i * 0.08, ease: EXHALE }}
          className="group flex items-baseline gap-5 md:gap-8 py-5"
          style={{ borderBottom: '1px solid rgba(139,147,201,0.12)' }}
        >
          <span className="font-body text-[11px] tabular-nums w-6 shrink-0" style={{ color: 'rgba(139,147,201,0.5)' }}>
            0{i + 1}
          </span>
          <div className="flex-1 min-w-0">
            <h4 className="font-body font-medium text-[15px] md:text-base text-white/85 group-hover:text-white transition-colors duration-500 leading-snug">
              {award.title}
            </h4>
            <p className="font-body text-xs mt-1" style={{ color: 'rgba(245,245,242,0.4)' }}>
              {award.subtitle}
            </p>
          </div>
          <span className="font-body text-xs tabular-nums shrink-0" style={{ color: 'rgba(139,147,201,0.55)' }}>
            {award.year}
          </span>
        </motion.div>
      ))}
    </div>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactBlock() {
  return (
    <div id="contact" className="mt-32 text-center">
      <motion.p {...fadeUp} transition={{ duration: 1, ease: EXHALE }}
        className="font-body text-[11px] tracking-mega uppercase mb-6" style={{ color: 'rgba(139,147,201,0.8)' }}>
        scene 03 — after hours
      </motion.p>
      <motion.h2
        {...fadeUp}
        transition={{ duration: 1.2, delay: 0.1, ease: EXHALE }}
        className="font-display text-white leading-[0.92]"
        style={{ fontSize: 'clamp(3.4rem, 10vw, 8rem)' }}
      >
        let&apos;s build
        <br />
        <span
          className="text-transparent bg-clip-text"
          style={{ backgroundImage: 'linear-gradient(90deg, #8b93c9, #8b5cf6 45%, #f97316)' }}
        >
          something.
        </span>
      </motion.h2>
      <motion.p {...fadeUp} transition={{ duration: 1, delay: 0.25, ease: EXHALE }}
        className="font-body text-sm md:text-base mt-8 max-w-md mx-auto leading-relaxed" style={{ color: 'rgba(245,245,242,0.55)' }}>
        Open to serious engineering work, collaborations, and problems worth losing sleep over.
      </motion.p>

      <motion.p {...fadeUp} transition={{ duration: 1, delay: 0.3, ease: EXHALE }}
        className="font-body text-[11px] tracking-[0.14em] uppercase mt-5 max-w-xl mx-auto leading-loose"
        style={{ color: 'rgba(139,147,201,0.65)' }}>
        currently — rebuilding production slide infrastructure for Stick&apos;Em (contract) ·
        running Retro Studios under StarLabs · BBA at APU, Beppu
      </motion.p>

      <motion.div {...fadeUp} transition={{ duration: 1, delay: 0.35, ease: EXHALE }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
        <a href="mailto:sameermotwani17@gmail.com"
          className="px-9 py-4 rounded-full font-body text-xs tracking-[0.2em] uppercase font-semibold text-ink transition-transform duration-300 hover:scale-[1.04]"
          style={{ background: 'linear-gradient(90deg, #f5f5f2, #c9cfec)' }}>
          Email me
        </a>
        <a href="https://www.linkedin.com/in/sameer-motwani-2625a62b5/" target="_blank" rel="noopener noreferrer"
          className="px-9 py-4 rounded-full font-body text-xs tracking-[0.2em] uppercase flex items-center gap-2.5 transition-colors duration-300 hover:text-white hover:border-white/40"
          style={{ border: '1px solid rgba(139,147,201,0.3)', color: 'rgba(245,245,242,0.7)' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
        <a href="https://github.com/sameermotwani17-cell" target="_blank" rel="noopener noreferrer"
          className="px-9 py-4 rounded-full font-body text-xs tracking-[0.2em] uppercase flex items-center gap-2.5 transition-colors duration-300 hover:text-white hover:border-white/40"
          style={{ border: '1px solid rgba(139,147,201,0.3)', color: 'rgba(245,245,242,0.7)' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          GitHub
        </a>
      </motion.div>

      {/* education row */}
      <motion.div {...fadeUp} transition={{ duration: 1.1, delay: 0.45, ease: EXHALE }}
        className="mt-24 pt-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16"
        style={{ borderTop: '1px solid rgba(139,147,201,0.12)' }}>
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
            <Image src="/apu-logo.jpg" alt="APU" fill className="object-contain p-1.5 bg-white/5" sizes="48px" />
          </div>
          <div className="text-left">
            <p className="font-body text-sm font-medium" style={{ color: 'rgba(245,245,242,0.65)' }}>
              Ritsumeikan Asia Pacific University
            </p>
            <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(245,245,242,0.35)' }}>
              BBA Finance · 2025–2029 · Beppu, Japan
            </p>
          </div>
        </div>
        <div className="w-px h-10 hidden md:block" style={{ background: 'rgba(139,147,201,0.2)' }} />
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
            <Image src="/younited.png" alt="YOUNITED" fill className="object-contain p-1.5 bg-white/5" sizes="48px" />
          </div>
          <div className="text-left">
            <p className="font-body text-sm font-medium" style={{ color: 'rgba(245,245,242,0.65)' }}>
              YOUNITED International School
            </p>
            <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(245,245,242,0.35)' }}>
              IB Diploma · HL: CS, English, Business · Israel
            </p>
          </div>
        </div>
      </motion.div>

      {/* footer */}
      <motion.div {...fadeUp} transition={{ duration: 1.2, delay: 0.5, ease: EXHALE }}
        className="mt-20 pb-14 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#8b5cf6' }} />
          <span className="font-body text-xs tracking-[0.2em]" style={{ color: 'rgba(245,245,242,0.3)' }}>
            sameermotwani17@gmail.com
          </span>
        </div>
        <p className="font-body text-[11px] tracking-widest" style={{ color: 'rgba(245,245,242,0.2)' }}>
          © 2026 Sameer Motwani — one continuous take, light to dusk.
        </p>
        <a
          href="https://github.com/sameermotwani17-cell/portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="font-body text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 hover:text-white/60"
          style={{ color: 'rgba(245,245,242,0.25)' }}
        >
          view source ↗
        </a>
      </motion.div>
    </div>
  )
}

// ─── Scene ────────────────────────────────────────────────────────────────────

export default function DuskScene() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  })

  // the dusk bleeds in from the navy the fire left behind
  const navyOut = useTransform(scrollYProgress, [0, 0.16], [1, 0])
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '3%'])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1])

  return (
    <section ref={ref} id="beyond" className="relative" style={{ background: '#0a0f1e' }}>
      {/* sticky rooftop backdrop */}
      <div className="sticky top-0 h-screen overflow-hidden" style={{ zIndex: 0 }}>
        <motion.div className="absolute inset-0" style={reduced ? undefined : { y: bgY, scale: bgScale }}>
          <Image
            src="/scenes/rooftop-dusk.webp"
            alt=""
            aria-hidden
            fill
            className="object-cover"
            sizes="100vw"
            style={{ objectPosition: 'center 35%' }}
          />
        </motion.div>
        {/* cool grade + legibility */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,15,30,0.68) 0%, rgba(10,15,30,0.45) 45%, rgba(6,9,20,0.88) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(139,92,246,0.1), transparent 60%)' }} />
        {/* navy entry veil — cross-dissolve from the dying fire */}
        {!reduced && (
          <motion.div className="absolute inset-0 pointer-events-none" style={{ opacity: navyOut, background: '#0a0f1e' }} />
        )}
      </div>

      {/* content */}
      <div className="relative -mt-[100vh]" style={{ zIndex: 1 }}>
        <div className="max-w-5xl mx-auto px-6 md:px-10 pt-[24vh]">
          <motion.p {...fadeUp} transition={{ duration: 1.1, ease: EXHALE }}
            className="font-body text-[11px] tracking-mega uppercase mb-5" style={{ color: 'rgba(139,147,201,0.8)' }}>
            the fire burns out · the sky comes back
          </motion.p>
          <motion.h2 {...fadeUp} transition={{ duration: 1.2, delay: 0.1, ease: EXHALE }}
            className="font-display text-white leading-none" style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}>
            BEYOND THE CODE
          </motion.h2>
          <motion.p {...fadeUp} transition={{ duration: 1.1, delay: 0.22, ease: EXHALE }}
            className="font-body text-sm md:text-base mt-5 max-w-lg leading-relaxed" style={{ color: 'rgba(245,245,242,0.55)' }}>
            The quieter tracks. What happens when the laptop closes.
          </motion.p>

          <div className="grid grid-cols-1 gap-5 md:gap-6 mt-16">
            <RetroBlock />
            <GymBlock />
            <MusicBlock />
            <ChessBlock />
          </div>

          <AwardsList />

          <ContactBlock />
        </div>
      </div>
    </section>
  )
}
