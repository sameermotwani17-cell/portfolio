'use client'

/* Sparse ember field for the fire scene — fixed data, transform/opacity only */

const EMBERS = [
  { l: 8,  b: -2, s: 3, dur: 7.5, delay: 0.0, o: 0.8 },
  { l: 16, b: -4, s: 2, dur: 9.0, delay: 2.1, o: 0.55 },
  { l: 24, b: -2, s: 4, dur: 8.2, delay: 4.4, o: 0.7 },
  { l: 33, b: -3, s: 2, dur: 10.5, delay: 1.2, o: 0.5 },
  { l: 41, b: -2, s: 3, dur: 7.8, delay: 5.6, o: 0.75 },
  { l: 52, b: -4, s: 2, dur: 9.6, delay: 3.0, o: 0.5 },
  { l: 60, b: -2, s: 3, dur: 8.8, delay: 0.8, o: 0.65 },
  { l: 68, b: -3, s: 2, dur: 11.0, delay: 6.2, o: 0.45 },
  { l: 76, b: -2, s: 4, dur: 7.2, delay: 2.8, o: 0.8 },
  { l: 84, b: -4, s: 2, dur: 9.4, delay: 5.0, o: 0.55 },
  { l: 92, b: -2, s: 3, dur: 8.5, delay: 1.6, o: 0.6 },
  { l: 47, b: -3, s: 2, dur: 10.0, delay: 7.4, o: 0.5 },
]

export default function Embers() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {EMBERS.map((e, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${e.l}%`,
            bottom: `${e.b}%`,
            width: e.s,
            height: e.s,
            opacity: 0,
            backgroundColor: i % 3 === 0 ? '#fbbf24' : '#f97316',
            boxShadow: '0 0 6px rgba(249,115,22,0.9)',
            animation: `emberRise ${e.dur}s linear ${e.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
