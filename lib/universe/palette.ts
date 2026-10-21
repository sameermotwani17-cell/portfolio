/** Thermal palette from the hero portrait: orange → red → magenta → violet. */
export const THERMAL = ['#FFB000', '#FF4D3D', '#E0218A', '#7A2BFF'] as const

export const TECH = {
  groundTop: '#CFD2D6',
  groundBottom: '#9EA3A9',
  trace: 'rgba(14,14,14,0.7)',
  pulse: '#FFFFFF',
  pulseGlow: '#7CF7FF',
  grid: 'rgba(14,14,14,0.32)',
} as const

export const CREATIVE = {
  groundTop: '#1a0a2a',
  groundBottom: '#070309',
  grid: 'rgba(255,170,120,0.45)',
} as const

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))

/** `n` rgb strings sampled across the thermal ramp (life 0 → 1). */
export function thermalRamp(n: number): string[] {
  const stops = THERMAL.map(hex)
  const out: string[] = []
  for (let i = 0; i < n; i++) {
    const t = (i / (n - 1)) * (stops.length - 1)
    const k = Math.min(stops.length - 2, Math.floor(t))
    const f = t - k
    const c = stops[k].map((v, j) => Math.round(v + (stops[k + 1][j] - v) * f))
    out.push(`rgb(${c[0]},${c[1]},${c[2]})`)
  }
  return out
}
