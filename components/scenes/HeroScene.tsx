'use client'

import Image from 'next/image'
import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  MotionValue,
} from 'framer-motion'
import Butterfly from './Butterfly'
import LayeredTitle from './LayeredTitle'

// ─── Ambient butterfly field (fixed data → no hydration mismatch) ─────────────
// depth 1 = far (small, slow), 3 = near (big, fast past the lens)

type Amb = {
  x: number // vw
  y: number // vh
  size: number
  depth: 1 | 2 | 3
  flapDur: number
  driftDur: number
  driftDelay: number
  color: string
  accent: string
}

const MONARCH = { color: '#d97b31', accent: '#a8541c' }
const TEAL = { color: '#3aa7bd', accent: '#22758a' }
const MOSS = { color: '#b9c46a', accent: '#8a9a3e' }
const SKY = { color: '#5b96d6', accent: '#3b6ea8' }

const AMBIENT: Amb[] = [
  { x: 12, y: 16, size: 34, depth: 1, flapDur: 0.9, driftDur: 11, driftDelay: 0.0, ...TEAL },
  { x: 78, y: 12, size: 30, depth: 1, flapDur: 1.1, driftDur: 13, driftDelay: 1.2, ...MOSS },
  { x: 30, y: 8,  size: 38, depth: 2, flapDur: 0.8, driftDur: 10, driftDelay: 0.6, ...MONARCH },
  { x: 66, y: 30, size: 44, depth: 2, flapDur: 0.75, driftDur: 12, driftDelay: 2.0, ...SKY },
  { x: 8,  y: 48, size: 48, depth: 2, flapDur: 0.85, driftDur: 9,  driftDelay: 1.6, ...MOSS },
  { x: 88, y: 44, size: 52, depth: 3, flapDur: 0.7, driftDur: 8,  driftDelay: 0.3, ...MONARCH },
  { x: 20, y: 70, size: 58, depth: 3, flapDur: 0.65, driftDur: 9,  driftDelay: 2.4, ...MONARCH },
  { x: 72, y: 66, size: 46, depth: 3, flapDur: 0.72, driftDur: 10, driftDelay: 1.0, ...TEAL },
]

function AmbientButterfly({ cfg, progress }: { cfg: Amb; progress: MotionValue<number> }) {
  // camera pushes in → butterflies accelerate outward from frame center
  const mult = cfg.depth * 42
  const dirX = (cfg.x - 50) / 50
  const dirY = (cfg.y - 45) / 45
  const x = useTransform(progress, [0.1, 0.5], [0, dirX * mult], { clamp: true })
  const y = useTransform(progress, [0.1, 0.5], [0, dirY * mult - cfg.depth * 6], { clamp: true })
  const scale = useTransform(progress, [0.1, 0.5], [1, 1 + cfg.depth * 0.45])
  const opacity = useTransform(progress, [0.38, 0.52], [1, 0])

  return (
    <motion.div
      className={cfg.depth === 1 ? 'absolute hidden md:block' : 'absolute'}
      style={{
        left: `${cfg.x}vw`,
        top: `${cfg.y}vh`,
        x: useTransform(x, (v) => `${v}vw`),
        y: useTransform(y, (v) => `${v}vh`),
        scale,
        opacity,
        zIndex: cfg.depth,
        filter: cfg.depth === 1 ? 'blur(0.6px)' : undefined,
      }}
    >
      <div style={{ animation: `butterflyDrift ${cfg.driftDur}s ease-in-out ${cfg.driftDelay}s infinite` }}>
        <Butterfly size={cfg.size} color={cfg.color} accent={cfg.accent} flapDur={cfg.flapDur} />
      </div>
    </motion.div>
  )
}

// two big foreground butterflies that sweep across and out of frame on scroll
function Sweeper({
  progress,
  from,
  to,
  top,
  size,
  colors,
  flapDur,
}: {
  progress: MotionValue<number>
  from: number
  to: number
  top: [number, number]
  size: number
  colors: { color: string; accent: string }
  flapDur: number
}) {
  const x = useTransform(progress, [0.12, 0.46], [`${from}vw`, `${to}vw`])
  const y = useTransform(progress, [0.12, 0.46], [`${top[0]}vh`, `${top[1]}vh`])
  const rotate = useTransform(progress, [0.12, 0.46], [from < to ? -12 : 14, from < to ? 16 : -18])
  const scale = useTransform(progress, [0.12, 0.46], [0.9, 1.7])
  const opacity = useTransform(progress, [0.08, 0.14, 0.42, 0.5], [0, 1, 1, 0])

  return (
    <motion.div
      className="absolute left-0 top-0 z-20"
      style={{ x, y, rotate, scale, opacity, filter: 'blur(1.5px)' }}
    >
      <Butterfly size={size} color={colors.color} accent={colors.accent} flapDur={flapDur} />
    </motion.div>
  )
}

// ─── Welcome title card ───────────────────────────────────────────────────────

const WELCOME_WORDS = ['Welcome', 'to', 'the', 'Sameer', 'Motwani', 'portfolio']

function WelcomeReveal() {
  return (
    <p
      aria-label="Welcome to the Sameer Motwani portfolio"
      className="font-body text-sm md:text-base tracking-[0.3em] uppercase flex flex-wrap justify-center gap-x-3 gap-y-1 rounded-full px-6 py-2.5 mx-4"
      style={{
        color: 'rgba(245,245,242,0.92)',
        background: 'rgba(5,5,5,0.38)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        textShadow: '0 1px 8px rgba(0,0,0,0.5)',
      }}
    >
      {WELCOME_WORDS.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: '115%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.35 + i * 0.14, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </p>
  )
}

// ─── Scene ────────────────────────────────────────────────────────────────────

export default function HeroScene() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // camera push-in
  const bgScale = useTransform(scrollYProgress, [0.08, 0.52], [1, 1.45])
  const bgY = useTransform(scrollYProgress, [0.08, 0.52], ['0%', '-4%'])
  // the frame dims (never to black) while the vignette closes in
  const dim = useTransform(scrollYProgress, [0.26, 0.5], [0, 0.55])
  const vignette = useTransform(scrollYProgress, [0.1, 0.46], [0, 0.85])
  // the golden light morphs in over the butterflies — the verse lands here
  const lightIn = useTransform(scrollYProgress, [0.4, 0.58], [0, 1])
  // then the fire bleeds in at the very end, glow leading, seamless into projects
  const glowIn = useTransform(scrollYProgress, [0.78, 0.86, 0.96, 1], [0, 0.9, 0.9, 0.5])
  const hoopIn = useTransform(scrollYProgress, [0.84, 0.97], [0, 1])
  // the re-introduction lands on the light — and leaves before the fire arrives
  const introOpacity = useTransform(scrollYProgress, [0.6, 0.7, 0.78, 0.86], [0, 1, 1, 0])
  const introY = useTransform(scrollYProgress, [0.6, 0.7, 0.78, 0.86], [40, 0, 0, -40])
  // title card exits early
  const textOpacity = useTransform(scrollYProgress, [0.07, 0.2], [1, 0])
  const textY = useTransform(scrollYProgress, [0.07, 0.2], [0, -60])
  const cueOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0])

  if (reduced) {
    // static, accessible version — no pin, no scrub
    return (
      <section id="home" className="relative h-screen overflow-hidden">
        <Image
          src="/scenes/butterflies.webp"
          alt="Sameer Motwani surrounded by butterflies against a white sky"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center 42%' }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-between py-[12vh] px-6">
          <p
            className="font-body text-sm tracking-[0.3em] uppercase rounded-full px-6 py-2.5"
            style={{
              color: 'rgba(245,245,242,0.92)',
              background: 'rgba(5,5,5,0.38)',
              backdropFilter: 'blur(10px)',
            }}
          >
            Welcome to the Sameer Motwani portfolio
          </p>
          <div className="text-center">
            <LayeredTitle
              as="h1"
              text="SAMEER MOTWANI"
              accent="#f97316"
              scrawl="beppu, japan"
              className="font-display text-white leading-[0.9]"
              style={{ fontSize: 'clamp(3.5rem, 11vw, 9rem)', textShadow: '0 4px 30px rgba(0,0,0,0.45)' }}
            />
            <p className="font-body text-white/75 text-xs md:text-sm tracking-[0.25em] mt-6 lowercase">
              engineer · founder · builder
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} id="home" className="relative" style={{ height: '320vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* backdrop: full-bleed landscape crop framed on the figure */}
        <motion.div className="absolute inset-0" style={{ scale: bgScale, y: bgY }}>
          <Image
            src="/scenes/butterflies.webp"
            alt="Sameer Motwani surrounded by butterflies against a white sky"
            fill
            priority
            className="object-cover"
            sizes="100vw"
            style={{ objectPosition: 'center 42%' }}
          />
        </motion.div>

        {/* ambient butterfly field */}
        <div className="absolute inset-0 z-10">
          {AMBIENT.map((cfg, i) => (
            <AmbientButterfly key={i} cfg={cfg} progress={scrollYProgress} />
          ))}
          <Sweeper
            progress={scrollYProgress}
            from={-14}
            to={112}
            top={[64, 18]}
            size={150}
            colors={MONARCH}
            flapDur={0.55}
          />
          <Sweeper
            progress={scrollYProgress}
            from={108}
            to={-22}
            top={[30, 72]}
            size={120}
            colors={TEAL}
            flapDur={0.6}
          />
        </div>

        {/* top scrim so the navbar and welcome line always read */}
        <div
          className="absolute inset-x-0 top-0 z-[29] pointer-events-none"
          style={{ height: 130, background: 'linear-gradient(to bottom, rgba(5,5,5,0.55), transparent)' }}
        />

        {/* vignette that closes in */}
        <motion.div
          className="absolute inset-0 z-30 pointer-events-none"
          style={{
            opacity: vignette,
            background: 'radial-gradient(ellipse at center, transparent 26%, rgba(5,5,5,0.92) 82%)',
          }}
        />
        {/* dimming pass — never fully black */}
        <motion.div className="absolute inset-0 z-30 pointer-events-none bg-ink" style={{ opacity: dim }} />

        {/* the golden light: the verse backdrop crossfades over the butterflies */}
        <motion.div className="absolute inset-0 z-[31] pointer-events-none" style={{ opacity: lightIn }}>
          <Image
            src="/scenes/verse-light.webp"
            alt=""
            aria-hidden
            fill
            className="object-cover"
            sizes="100vw"
            style={{ objectPosition: 'center 40%' }}
          />
          {/* left scrim so the verse type reads over the trees */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(10,6,2,0.55) 0%, rgba(10,6,2,0.25) 40%, transparent 65%)' }}
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(10,6,2,0.3) 0%, transparent 30%, rgba(10,6,2,0.45) 100%)' }}
          />
        </motion.div>

        {/* the fire morphs in at the end: burning hoop crossfades over the light */}
        <motion.div className="absolute inset-0 z-[32] pointer-events-none" style={{ opacity: hoopIn }}>
          <Image
            src="/scenes/burning-hoop.webp"
            alt=""
            aria-hidden
            fill
            className="object-cover"
            sizes="100vw"
            style={{ objectPosition: 'center 30%' }}
          />
          {/* same legibility grade as the fire scene, so the handoff is seamless */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.35) 40%, rgba(5,5,5,0.72) 100%)' }}
          />
        </motion.div>
        {/* warm bloom leads the morph */}
        <motion.div
          className="absolute inset-0 z-[33] pointer-events-none"
          style={{
            opacity: glowIn,
            background: 'radial-gradient(ellipse 60% 55% at 30% 52%, rgba(249,115,22,0.5) 0%, rgba(249,115,22,0.12) 40%, transparent 70%)',
          }}
        />

        {/* the re-introduction — lands on the static fire frame, anchored left
            so the figure on the right stays clear */}
        <motion.div
          className="absolute inset-0 z-[36] flex flex-col items-center md:items-start justify-center px-6 md:pl-[6vw] md:pr-[34vw] text-center md:text-left pointer-events-none"
          style={{ opacity: introOpacity, y: introY }}
        >
          <p
            className="text-lg md:text-2xl mb-5"
            style={{
              fontFamily: 'var(--font-scrawl), cursive',
              color: 'rgba(249,115,22,0.95)',
              transform: 'rotate(-2deg)',
              textShadow: '0 3px 20px rgba(0,0,0,0.7)',
            }}
          >
            allow me to re-introduce myself —
          </p>
          <LayeredTitle
            text="MY NAME IS RETRO"
            accent="#f97316"
            scrawl="nice to meet you"
            className="font-display text-white leading-[0.95]"
            style={{ fontSize: 'clamp(2.6rem, 9vw, 7.5rem)', textShadow: '0 6px 40px rgba(0,0,0,0.7)' }}
          />
          <p
            className="font-body text-sm md:text-base max-w-md leading-relaxed mt-9"
            style={{ color: 'rgba(245,245,242,0.7)', textShadow: '0 2px 14px rgba(0,0,0,0.6)' }}
          >
            retro is the creative part of sameer — the half that directs the camera,
            cuts the film, and makes the music. the engineer ships. retro makes it cinematic.
          </p>
        </motion.div>

        {/* title card */}
        <motion.div
          className="absolute inset-0 z-40 flex flex-col items-center justify-between pointer-events-none"
          style={{ opacity: textOpacity, y: textY, paddingTop: '13vh', paddingBottom: '14vh' }}
        >
          <WelcomeReveal />

          <div className="text-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 1.12, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 1.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <LayeredTitle
                as="h1"
                text="SAMEER MOTWANI"
                accent="#f97316"
                scrawl="beppu, japan"
                className="font-display text-white leading-[0.9]"
                style={{
                  fontSize: 'clamp(3.5rem, 11vw, 9rem)',
                  textShadow: '0 4px 30px rgba(0,0,0,0.45)',
                }}
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 2.15 }}
              className="font-body text-white/85 text-xs md:text-sm tracking-[0.25em] mt-6 lowercase"
              style={{ textShadow: '0 2px 14px rgba(0,0,0,0.6)' }}
            >
              engineer · founder · builder
            </motion.p>
          </div>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2"
          style={{ opacity: cueOpacity }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.7, duration: 0.8 }}
            className="font-body text-[10px] tracking-[0.35em] uppercase text-white/70"
          >
            scroll
          </motion.span>
          <div className="w-px h-12 overflow-hidden">
            <div className="w-px h-12 bg-white/60" style={{ animation: 'scrollCue 1.8s ease-in-out infinite' }} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
