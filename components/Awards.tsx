'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

const awards = [
  {
    icon: '🥇',
    title: 'AIHack 2026 — Top 4, Final Round',
    subtitle: 'Aiful Corporation · ¥1,000,000 prize competition',
    year: '2026',
    color: '#f97316',
    logo: null,
    badges: null,
  },
  {
    icon: '🥇',
    title: 'APU Annual Hackathon 2025 — 1st Place',
    subtitle: 'GOMI Snap · AI Waste Classification Platform',
    year: '2025',
    color: '#3b82f6',
    logo: '/apu-logo.jpg',
    badges: null,
  },
  {
    icon: '🥈',
    title: 'Hult Prize APU Campus Round 2026',
    subtitle: '1st Runner-Up · Best Speaker Award · Global STEAM Initiative',
    year: '2026',
    color: '#f97316',
    logo: null,
    badges: ['🥈 1st Runner-Up', '🎤 Best Speaker'],
  },
  {
    icon: '🥇',
    title: 'Next Einstein Forum — 1st Place',
    subtitle: 'Africa Science Week · Educate the Next Generation',
    year: '2023',
    color: '#3b82f6',
    logo: null,
    badges: null,
  },
  {
    icon: '🏅',
    title: 'Best High School Short Story Writer',
    subtitle: 'Educate the Next Generation 2023',
    year: '2023',
    color: '#f97316',
    logo: null,
    badges: null,
  },
]

function AwardItem({
  award,
  index,
}: {
  award: (typeof awards)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group flex items-center gap-5 md:gap-8 py-6 border-b border-white/5 hover:border-white/10 transition-colors duration-300"
    >
      {/* Index number */}
      <span className="font-body text-xs text-white/20 tabular-nums w-6 shrink-0 hidden md:block">
        0{index + 1}
      </span>

      {/* Emoji icon */}
      <span className="text-2xl md:text-3xl shrink-0">{award.icon}</span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3
          className="font-display text-xl md:text-2xl text-white/90 group-hover:text-white font-semibold leading-tight transition-colors duration-300"
          style={{}}
        >
          <span className="group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
            style={{
              backgroundImage: `linear-gradient(90deg, ${award.color}, #f5f5f5)`,
            }}
          >
            {award.title}
          </span>
        </h3>
        <p className="text-white/40 font-body text-sm mt-1">{award.subtitle}</p>
        {award.badges && (
          <div className="flex flex-wrap gap-2 mt-2">
            {award.badges.map((badge) => (
              <span
                key={badge}
                className="text-xs font-body px-2.5 py-0.5 rounded-full"
                style={{
                  border: `1px solid ${award.color}50`,
                  color: award.color,
                  backgroundColor: `${award.color}10`,
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Logo */}
      {award.logo && (
        <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/10 shrink-0 hidden md:block">
          <Image src={award.logo} alt="logo" fill className="object-contain p-1 bg-white/5" />
        </div>
      )}

      {/* Year */}
      <span className="text-white/25 font-body text-sm shrink-0 tabular-nums">{award.year}</span>
    </motion.div>
  )
}

export default function Awards() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="awards" className="py-28 md:py-36 px-6 md:px-20 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-14 md:mb-20"
      >
        <p className="text-primary text-xs tracking-[0.35em] uppercase font-body mb-3">
          Recognition
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-white font-bold">Awards</h2>
      </motion.div>

      <div>
        {awards.map((award, i) => (
          <AwardItem key={award.title} award={award} index={i} />
        ))}
      </div>
    </section>
  )
}
