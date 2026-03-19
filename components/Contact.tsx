'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="py-28 md:py-36 px-6 md:px-20 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.1 }}
          className="text-primary text-xs tracking-[0.35em] uppercase font-body mb-5"
        >
          Get in touch
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-white leading-[0.9] mb-8"
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
        >
          Let&apos;s build
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(90deg, #f97316, #3b82f6)' }}
          >
            something.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-white/45 font-body text-base md:text-lg mb-12 max-w-lg mx-auto leading-relaxed"
        >
          Open to collaborations, startup opportunities, and interesting problems worth solving.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="mailto:sameermotwani17@gmail.com"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-9 py-4 rounded-full font-body text-xs tracking-[0.2em] uppercase text-black font-semibold"
            style={{ backgroundColor: '#f97316' }}
          >
            Email me
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/sameer-motwani-2625a62b5/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-9 py-4 rounded-full font-body text-xs tracking-[0.2em] uppercase border border-white/15 text-white/70 hover:border-secondary hover:text-secondary transition-colors duration-300 flex items-center gap-2.5"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </motion.a>

          <motion.a
            href="https://github.com/sameermotwani17-cell"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-9 py-4 rounded-full font-body text-xs tracking-[0.2em] uppercase border border-white/15 text-white/70 hover:border-white/40 hover:text-white transition-colors duration-300 flex items-center gap-2.5"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </motion.a>
        </motion.div>

        {/* Education row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16"
        >
          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
              <Image
                src="/apu-logo.jpg"
                alt="APU"
                fill
                className="object-contain p-1.5 bg-white/5"
              />
            </div>
            <div className="text-left">
              <p className="text-white/60 font-body text-sm font-medium">
                Ritsumeikan Asia Pacific University
              </p>
              <p className="text-white/30 font-body text-xs mt-0.5">
                BBA Finance · 2025–2029 · Beppu, Japan
              </p>
            </div>
          </div>

          <div className="w-px h-10 bg-white/10 hidden md:block" />

          <div className="flex items-center gap-4">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
              <Image
                src="/younited.png"
                alt="YOUNITED"
                fill
                className="object-contain p-1.5 bg-white/5"
              />
            </div>
            <div className="text-left">
              <p className="text-white/60 font-body text-sm font-medium">
                YOUNITED International School
              </p>
              <p className="text-white/30 font-body text-xs mt-0.5">
                IB Diploma · HL: CS, English, Business · Israel
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
        className="mt-20 flex flex-col items-center gap-3"
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-white/20 font-body text-xs tracking-[0.2em]">
            sameermotwani17@gmail.com
          </span>
        </div>
        <p className="text-white/15 font-body text-xs tracking-widest">
          © 2026 Sameer Motwani — Built with Next.js & Framer Motion
        </p>
      </motion.div>
    </section>
  )
}
