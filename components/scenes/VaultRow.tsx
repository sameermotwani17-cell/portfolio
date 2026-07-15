'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import type { VaultItem } from '@/lib/projects'

function VaultCard({
  item,
  index,
  onOpen,
}: {
  item: VaultItem
  index: number
  onOpen: () => void
}) {
  return (
    <motion.button
      onClick={onOpen}
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="snap-start shrink-0 w-[270px] md:w-[300px] text-left group focus:outline-none"
      aria-label={`Open ${item.title} case study`}
    >
      <motion.div
        layoutId={`album-${item.id}`}
        className="relative h-full rounded-xl overflow-hidden transition-shadow duration-300 group-hover:shadow-[0_16px_44px_rgba(0,0,0,0.6)]"
        style={{
          background: 'rgba(10,10,10,0.72)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.09)',
        }}
      >
        {/* full-width brand cover — the logo IS the sleeve */}
        <div
          className="h-28 flex items-center justify-center px-6"
          style={{
            background: item.logo
              ? 'rgba(250,250,248,0.96)'
              : `linear-gradient(145deg, ${item.accent}26 0%, rgba(8,8,8,0.6) 70%)`,
            borderBottom: `2px solid ${item.accent}`,
          }}
        >
          {item.logo ? (
            <Image
              src={item.logo}
              alt={`${item.title} brand logo`}
              width={220}
              height={96}
              className="h-20 w-auto object-contain"
            />
          ) : (
            <span className="font-display text-3xl tracking-wide" style={{ color: item.accent, textShadow: '0 2px 14px rgba(0,0,0,0.5)' }}>
              {item.title.split(' ').pop()?.toUpperCase()}
            </span>
          )}
        </div>

        <div className="p-5">
        <h4 className="font-display text-xl text-white leading-tight">{item.title}</h4>
        <p className="font-body text-[10px] tracking-[0.16em] uppercase mt-1.5" style={{ color: 'rgba(245,245,242,0.45)' }}>
          {item.tag}
        </p>
        {item.badge && (
          <span
            className="inline-block font-body text-[9px] tracking-[0.12em] uppercase rounded px-2 py-0.5 mt-2.5"
            style={{ color: item.accent, border: `1px solid ${item.accent}45`, background: `${item.accent}0d` }}
          >
            {item.badge}
          </span>
        )}
        <p className="font-body text-xs leading-relaxed mt-3" style={{ color: 'rgba(245,245,242,0.6)' }}>
          {item.short}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {item.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="font-body text-[10px] px-2 py-0.5 rounded"
              style={{ border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(245,245,242,0.45)' }}
            >
              {t}
            </span>
          ))}
          {item.tech.length > 4 && (
            <span className="font-body text-[10px] px-1 py-0.5" style={{ color: 'rgba(245,245,242,0.35)' }}>
              +{item.tech.length - 4}
            </span>
          )}
        </div>
        <span
          className="mt-4 inline-flex items-center gap-1.5 font-body text-[10px] tracking-[0.18em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: item.accent }}
          aria-hidden
        >
          ▶ open
        </span>
        </div>
      </motion.div>
    </motion.button>
  )
}

export default function VaultRow({
  items,
  onOpen,
}: {
  items: VaultItem[]
  onOpen: (item: VaultItem) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="flex items-baseline gap-4 mb-7"
      >
        <h3 className="font-display text-2xl md:text-3xl text-white">more from the vault</h3>
        <span className="hidden md:block flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(249,115,22,0.4), transparent)' }} />
        <span className="font-body text-[10px] tracking-[0.25em] uppercase" style={{ color: 'rgba(245,245,242,0.35)' }}>
          scroll →
        </span>
      </motion.div>

      <div
        className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 md:mx-0 md:px-0"
        style={{ scrollbarWidth: 'thin' }}
      >
        {items.map((item, i) => (
          <VaultCard key={item.id} item={item} index={i} onOpen={() => onOpen(item)} />
        ))}
      </div>
    </div>
  )
}
