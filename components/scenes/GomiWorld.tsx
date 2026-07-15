'use client'

import Image from 'next/image'
import type { Album, VaultItem } from '@/lib/projects'

/**
 * GOMI SNAP — the accountability layer. Logo-green world built from the
 * real GOMI Snap 2.0 launch (LinkedIn, Feb 2026-era post): 1.0 asked what
 * bin, 2.0 asks which room. Led as Founder & CTO.
 */

const GREEN = '#3f9142'
const DARKGREEN = '#25522a'

const TIMELINE = [
  { when: 'hour 0', what: 'Built in 48 hours at the APU hackathon — 1st place', detail: 'GPT-4V vision + a rule engine reverse-engineered from Beppu municipal PDFs' },
  { when: 'month 1', what: '520+ organic users, zero paid acquisition', detail: '95.3% adoption intent across a 400-person survey' },
  { when: 'the pivot', what: 'City hall and property managers at the table', detail: 'Pilot framework + cost-reduction logic presented to Beppu City' },
  { when: '2.0 ships', what: 'From sorting guide to accountability layer', detail: 'QR per tenant · every disposal logged · live compliance dashboard' },
  { when: 'now', what: 'Pilot conversations live with Beppu operators', detail: 'Then wound down as a company — folded into StarLabs, lessons carried forward' },
]

const FEATURES = [
  'QR sticker per tenant',
  'Every disposal logged',
  'Live compliance dashboard',
  'Flagged rooms + full history',
  'No app install',
  'Works in any mobile browser',
]

type WorldItem = (Album | VaultItem) & { logo?: string }

export default function GomiWorld({ item }: { item: WorldItem }) {
  return (
    <div style={{ background: '#0a120b' }}>
      {/* header band — logo on light */}
      <div className="relative px-6 md:px-10 py-8 flex flex-col md:flex-row items-center gap-6" style={{ background: '#f2f5f0' }}>
        {item.logo && (
          <Image src={item.logo} alt="GOMI Snap logo" width={150} height={130} className="w-28 md:w-32 h-auto object-contain" />
        )}
        <div className="text-center md:text-left">
          {item.badge && (
            <span className="inline-block font-body text-[10px] tracking-[0.14em] uppercase rounded px-2.5 py-1 mb-2.5" style={{ color: DARKGREEN, border: `1.5px solid ${GREEN}`, background: `${GREEN}14` }}>
              {item.badge}
            </span>
          )}
          <h2 className="font-display leading-none" style={{ color: '#12210f', fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}>
            {item.title}
          </h2>
          <p className="font-body text-[11px] tracking-[0.16em] uppercase mt-2" style={{ color: 'rgba(18,33,15,0.6)' }}>
            {item.tag}
          </p>
        </div>
      </div>

      {/* the question that changed */}
      <div className="grid md:grid-cols-2 gap-4 px-6 md:px-10 py-8">
        <div className="rounded-xl p-6" style={{ border: `1px solid ${GREEN}40`, background: `${GREEN}0a` }}>
          <p className="text-base mb-2" style={{ fontFamily: 'var(--font-scrawl), cursive', color: GREEN }}>
            1.0 asked
          </p>
          <h3 className="font-display text-white leading-tight" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.9rem)' }}>
            “What bin does this go in?”
          </h3>
          <p className="font-body text-[13px] leading-relaxed mt-3" style={{ color: 'rgba(245,245,242,0.65)' }}>
            Snap a photo, get instant sorting instructions for Beppu&apos;s 20+ waste categories.
          </p>
        </div>
        <div className="rounded-xl p-6" style={{ border: `1.5px solid ${GREEN}`, background: `${GREEN}16`, boxShadow: `0 0 50px ${GREEN}20` }}>
          <p className="text-base mb-2" style={{ fontFamily: 'var(--font-scrawl), cursive', color: GREEN }}>
            2.0 asks
          </p>
          <h3 className="font-display text-white leading-tight" style={{ fontSize: 'clamp(1.3rem, 3vw, 1.9rem)' }}>
            “Which room put the wrong bag there?”
          </h3>
          <p className="font-body text-[13px] leading-relaxed mt-3" style={{ color: 'rgba(245,245,242,0.7)' }}>
            Mis-sorting is a real operational cost — staff time, complaints, rejected bags.
            2.0 is the accountability layer that makes it traceable.
          </p>
        </div>
      </div>

      {/* features from the 2.0 launch */}
      <div className="px-6 md:px-10">
        <div className="flex flex-wrap gap-2">
          {FEATURES.map((f) => (
            <span key={f} className="font-body text-[11px] md:text-xs px-3 py-1.5 rounded-full" style={{ border: `1px solid ${GREEN}50`, color: 'rgba(245,245,242,0.78)', background: `${GREEN}0d` }}>
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* how it was led */}
      <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 px-6 md:px-10 py-9">
        <div>
          <p className="text-base mb-2" style={{ fontFamily: 'var(--font-scrawl), cursive', color: GREEN }}>
            how it was led
          </p>
          <p className="font-body text-sm md:text-[0.95rem] leading-relaxed" style={{ color: 'rgba(245,245,242,0.78)' }}>
            {item.detail.overview}
          </p>
          {item.detail.stats && (
            <div className="grid grid-cols-2 gap-2.5 mt-6">
              {item.detail.stats.map((stat) => (
                <div key={stat.label} className="rounded-lg px-3 py-2.5" style={{ background: `${GREEN}0c`, border: `1px solid ${GREEN}35` }}>
                  <div className="font-display text-xl md:text-2xl" style={{ color: GREEN }}>
                    {stat.value}
                  </div>
                  <div className="font-body text-[10px] leading-snug mt-1" style={{ color: 'rgba(245,245,242,0.5)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* founder timeline */}
        <div className="relative">
          <div aria-hidden className="absolute left-[7px] top-2 bottom-2 w-px" style={{ background: `linear-gradient(to bottom, ${GREEN}, transparent)` }} />
          {TIMELINE.map((t) => (
            <div key={t.when} className="relative flex gap-4 pb-6 last:pb-0">
              <span className="relative z-[1] shrink-0 mt-1 w-4 h-4 rounded-full" style={{ background: '#0a120b', border: `2.5px solid ${GREEN}` }} />
              <div className="min-w-0">
                <span className="font-body text-[10px] tracking-[0.25em] uppercase" style={{ color: GREEN }}>
                  {t.when}
                </span>
                <h4 className="font-display text-white leading-tight mt-0.5" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)' }}>
                  {t.what}
                </h4>
                <p className="font-body text-[12px] leading-relaxed mt-1" style={{ color: 'rgba(245,245,242,0.55)' }}>
                  {t.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* links + stack */}
      <div className="px-6 md:px-10 pb-8">
        <div className="pt-5 flex flex-wrap items-center justify-between gap-4" style={{ borderTop: `1px solid ${GREEN}30` }}>
          <div className="flex flex-wrap gap-2">
            {item.tech.map((t) => (
              <span key={t} className="font-body text-[11px] px-2.5 py-1 rounded" style={{ border: `1px solid ${GREEN}30`, color: 'rgba(245,245,242,0.65)', background: `${GREEN}08` }}>
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-2.5">
            {item.detail.links?.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-[11px] tracking-[0.14em] uppercase px-4 py-2 rounded-md transition-opacity hover:opacity-80"
                style={{ background: GREEN, color: '#0a120b', fontWeight: 600 }}
              >
                {link.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
