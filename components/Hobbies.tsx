'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

/* ── Fixed data arrays (no Math.random → no hydration mismatch) ── */
const EMBERS = [
  { w: 3, h: 3, o: 0.7, l: 15, b: 6,  dur: 3.2, delay: 0    },
  { w: 2, h: 2, o: 0.5, l: 28, b: 10, dur: 2.6, delay: 0.4  },
  { w: 4, h: 4, o: 0.6, l: 42, b: 4,  dur: 3.8, delay: 0.9  },
  { w: 2, h: 2, o: 0.4, l: 58, b: 14, dur: 2.9, delay: 1.3  },
  { w: 3, h: 3, o: 0.8, l: 70, b: 8,  dur: 3.5, delay: 0.6  },
  { w: 2, h: 2, o: 0.5, l: 82, b: 5,  dur: 2.7, delay: 1.8  },
  { w: 3, h: 3, o: 0.6, l: 35, b: 18, dur: 4.0, delay: 2.1  },
  { w: 2, h: 2, o: 0.4, l: 90, b: 12, dur: 3.1, delay: 0.2  },
]

const CHESS_COLS = [0, 12.5, 25, 37.5, 50, 62.5, 75, 87.5]
const CHESS_ROWS = [0, 14.3, 28.6, 42.9, 57.2, 71.5, 85.8]

const EQ_COUNT = 12
const EQ_ANIMATIONS = ['eqBar1','eqBar2','eqBar3','eqBar1','eqBar2','eqBar3','eqBar1','eqBar2','eqBar3','eqBar1','eqBar2','eqBar3']
const EQ_DELAYS    = [0, 0.1, 0.2, 0.05, 0.15, 0.25, 0.08, 0.18, 0.28, 0.03, 0.13, 0.23]
const EQ_HEIGHTS   = [20, 35, 28, 40, 22, 32, 38, 25, 30, 20, 35, 28]

/* ════════════════════════════════════
   BASKETBALL CARD
════════════════════════════════════ */
function BasketballCard({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl overflow-hidden"
      style={{ aspectRatio: '4/5', background: '#0d0d0d' }}
    >
      {/* Photo */}
      <Image
        src="/basketball.png"
        alt="Basketball"
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ filter: 'brightness(0.55) saturate(1.1)' }}
      />

      {/* Heat glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(249,115,22,0.45) 0%, rgba(239,68,68,0.2) 40%, transparent 70%)',
          animation: 'heatPulse 3s ease-in-out infinite',
        }}
      />

      {/* Ember particles */}
      {EMBERS.map((e, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: e.w,
            height: e.h,
            backgroundColor: i % 2 === 0 ? 'rgba(249,115,22,0.9)' : 'rgba(239,68,68,0.8)',
            left: `${e.l}%`,
            bottom: `${e.b}%`,
            opacity: e.o,
            animation: `emberFloat ${e.dur}s ease-out ${e.delay}s infinite`,
            boxShadow: '0 0 4px rgba(249,115,22,0.8)',
          }}
        />
      ))}

      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-7">
        <p className="text-xs font-body tracking-[0.35em] uppercase mb-2" style={{ color: '#f97316' }}>
          On the court
        </p>
        <h3 className="font-display text-4xl text-white font-bold leading-none mb-3">Basketball</h3>
        <p className="text-white/50 font-body text-sm leading-relaxed">
          Point guard instincts — reading the play before it happens.
        </p>
      </div>

      {/* Corner accent */}
      <div className="absolute top-5 right-5 w-8 h-8 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute top-0 right-0 w-full h-px bg-orange-500" />
        <div className="absolute top-0 right-0 h-full w-px bg-orange-500" />
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════
   CHESS CARD
════════════════════════════════════ */
function ChessCard({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl overflow-hidden"
      style={{ aspectRatio: '4/5', background: '#0d0d0d' }}
    >
      {/* Photo */}
      <Image
        src="/chess.png"
        alt="Chess"
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ filter: 'brightness(0.5) saturate(0.7)' }}
      />

      {/* Chess grid overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {CHESS_COLS.map((col) =>
          CHESS_ROWS.map((row) => (
            <div
              key={`${col}-${row}`}
              className="absolute"
              style={{
                left: `${col}%`,
                top: `${row}%`,
                width: '12.5%',
                height: '14.3%',
                backgroundColor: (Math.floor(col / 12.5) + Math.floor(row / 14.3)) % 2 === 0
                  ? 'rgba(59,130,246,0.04)'
                  : 'rgba(255,255,255,0.02)',
                animation: `chessBlink ${2 + (col * 0.1)}s ease-in-out infinite`,
                animationDelay: `${row * 0.08}s`,
              }}
            />
          ))
        )}

        {/* Scan line */}
        <div
          className="absolute inset-x-0 pointer-events-none"
          style={{
            height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.7), transparent)',
            animation: 'gridScanLine 4s linear infinite',
            top: 0,
          }}
        />
      </div>

      {/* Blue tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.12) 0%, transparent 70%)' }}
      />

      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-7">
        <p className="text-xs font-body tracking-[0.35em] uppercase mb-2" style={{ color: '#3b82f6' }}>
          Strategic mind
        </p>
        <h3 className="font-display text-4xl text-white font-bold leading-none mb-3">Chess</h3>
        <p className="text-white/50 font-body text-sm leading-relaxed">
          Twelve moves ahead. Patience as a weapon.
        </p>
      </div>

      {/* ELO badge */}
      <div
        className="absolute top-5 left-5 px-3 py-1.5 rounded-full font-body text-xs tracking-[0.15em] uppercase"
        style={{ border: '1px solid rgba(59,130,246,0.4)', color: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.08)' }}
      >
        Rated
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════
   CINEMATIC CREATION CARD
════════════════════════════════════ */
function CinematicCard({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl overflow-hidden"
      style={{ aspectRatio: '4/5', background: '#0d0d0d', animation: 'filmFlicker 8s ease-in-out infinite', cursor: 'pointer' }}
      onClick={() => window.open('https://www.instagram.com/retro.studios_?igsh=MTRnc2x1NXZ6YmJhNQ%3D%3D&utm_source=qr', '_blank', 'noopener,noreferrer')}
    >
      {/* Photo */}
      <Image
        src="/cinematic.png"
        alt="Cinematic Creation"
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ filter: 'brightness(0.5) contrast(1.1) saturate(0.85)' }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`,
          animation: 'filmGrain 0.15s steps(1) infinite',
        }}
      />

      {/* Light leak */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 30%, rgba(251,191,36,0.18) 50%, transparent 70%)',
          animation: 'lightLeak 6s ease-in-out infinite',
        }}
      />

      {/* Gold vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(251,191,36,0.08) 0%, transparent 60%)' }}
      />

      {/* Film strip bars */}
      <div className="absolute top-0 inset-x-0 h-5 pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.7)', borderBottom: '1px solid rgba(251,191,36,0.15)' }}
      />
      <div className="absolute bottom-0 inset-x-0 h-5 pointer-events-none"
        style={{ background: 'rgba(0,0,0,0.7)', borderTop: '1px solid rgba(251,191,36,0.15)' }}
      />

      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-3/4 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.4) 55%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-7">
        <p className="text-xs font-body tracking-[0.35em] uppercase mb-2" style={{ color: '#fbbf24' }}>
          Retro Studios
        </p>
        <h3 className="font-display text-3xl text-white font-bold leading-tight mb-3">
          Cinematic<br />Creation
        </h3>
        <p className="text-white/50 font-body text-sm leading-relaxed">
          Short films, edits, and visual storytelling. Every frame intentional.
        </p>
      </div>

      {/* REC badge */}
      <div className="absolute top-7 right-5 flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500" style={{ boxShadow: '0 0 6px rgba(239,68,68,0.8)' }} />
        <span className="font-body text-[10px] tracking-[0.2em] text-red-400 uppercase">REC</span>
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════
   MUSIC / ARTIST CARD
════════════════════════════════════ */
function MusicCard({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl overflow-hidden"
      style={{ aspectRatio: '4/5', background: '#0d0d0d' }}
    >
      {/* Photo */}
      <Image
        src="/music.png"
        alt="Music"
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ filter: 'brightness(0.45) saturate(1.2) hue-rotate(-10deg)' }}
      />

      {/* Sound rings */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: '50%',
            top: '38%',
            width: 60,
            height: 60,
            border: `1px solid rgba(139,92,246,${0.5 - i * 0.12})`,
            animation: `soundRing 2.4s ease-out ${i * 0.6}s infinite`,
          }}
        />
      ))}

      {/* Purple glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(139,92,246,0.22) 0%, rgba(6,182,212,0.08) 50%, transparent 75%)' }}
      />

      {/* EQ visualizer */}
      <div className="absolute bottom-[120px] inset-x-0 flex items-end justify-center gap-[3px] h-10 px-10 pointer-events-none">
        {Array.from({ length: EQ_COUNT }).map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: EQ_HEIGHTS[i],
              background: 'linear-gradient(to top, rgba(139,92,246,0.8), rgba(6,182,212,0.5))',
              animation: `${EQ_ANIMATIONS[i]} ${0.6 + (i % 3) * 0.1}s ease-in-out infinite`,
              animationDelay: `${EQ_DELAYS[i]}s`,
              transformOrigin: 'bottom center',
            }}
          />
        ))}
      </div>

      {/* Bottom gradient */}
      <div
        className="absolute inset-x-0 bottom-0 h-3/4 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.45) 55%, transparent 100%)' }}
      />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-7">
        <p className="text-xs font-body tracking-[0.35em] uppercase mb-2" style={{ color: '#8b5cf6' }}>
          Artist
        </p>
        <h3 className="font-display text-4xl text-white font-bold leading-none mb-2">Music</h3>

        {/* Tracks badge */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className="text-xs font-body px-2.5 py-0.5 rounded-full tracking-[0.12em] uppercase"
            style={{ border: '1px solid rgba(139,92,246,0.4)', color: '#a78bfa', backgroundColor: 'rgba(139,92,246,0.1)' }}
          >
            5 tracks released
          </span>
        </div>

        <p className="text-white/50 font-body text-sm leading-relaxed mb-5">
          Original production. Writing lyrics before writing code was ever a thing.
        </p>

        {/* Streaming links */}
        <div className="flex items-center gap-3">
          <a
            href="https://open.spotify.com/artist/2vNpaYQTU7PNUh3BjOx07b?si=oxYbEYnHT--4lLJ8wOWSZg"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full font-body text-xs tracking-[0.1em] uppercase transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: 'rgba(30,215,96,0.12)', border: '1px solid rgba(30,215,96,0.35)', color: '#1ed760' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Spotify icon */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Spotify
          </a>
          <a
            href="https://music.apple.com/jp/artist/retro/1803961641?l=en-US"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full font-body text-xs tracking-[0.1em] uppercase transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: 'rgba(250,77,77,0.1)', border: '1px solid rgba(250,77,77,0.3)', color: '#fa4d4d' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Apple Music icon */}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 0 0-1.877-.726 10.496 10.496 0 0 0-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208a4.93 4.93 0 0 0-.35 1.48c-.065.665-.063 1.33-.07 1.996v8.519c0 .33.003.66.01.99.022.62.088 1.232.255 1.839.45 1.64 1.55 2.75 3.18 3.27.76.24 1.54.31 2.34.33.19.01.39.01.58.01h12.02c.19 0 .38-.01.57-.01.79-.03 1.57-.1 2.33-.34 1.63-.51 2.73-1.62 3.18-3.27.17-.61.23-1.22.25-1.85.01-.33.01-.66.01-.99V8.57c0-.49-.01-.97-.04-1.46l.01.01zm-6.56 3.56v5.56c0 .56-.1 1.09-.44 1.56-.47.64-1.12.97-1.89 1.01-.83.04-1.52-.4-1.87-1.08-.36-.7-.29-1.72.42-2.34.37-.32.81-.5 1.27-.65.28-.09.57-.16.85-.25.34-.11.49-.32.49-.68V9.55c0-.31-.14-.45-.44-.39l-3.62.72c-.35.07-.47.22-.47.58v6.46c0 .57-.09 1.12-.45 1.59-.47.62-1.13.94-1.91.97-.85.03-1.55-.42-1.89-1.13-.29-.6-.26-1.21.07-1.79.28-.5.72-.81 1.24-1.02.39-.16.79-.27 1.19-.38.21-.06.43-.1.64-.16.42-.12.57-.32.57-.75V7.36c0-.47.17-.77.62-.87l5.09-1.02c.41-.08.75.17.75.59v3.61z"/>
            </svg>
            Apple Music
          </a>
        </div>
      </div>
    </motion.div>
  )
}

/* ════════════════════════════════════
   MAIN SECTION
════════════════════════════════════ */
export default function Hobbies() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="hobbies" className="py-28 md:py-36 px-6 md:px-20 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-14 md:mb-20"
      >
        <p className="text-primary text-xs tracking-[0.35em] uppercase font-body mb-3">
          Beyond the screen
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-white font-bold">Hobbies</h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
        <BasketballCard inView={inView} />
        <ChessCard inView={inView} />
        <CinematicCard inView={inView} />
        <MusicCard inView={inView} />
      </div>
    </section>
  )
}
