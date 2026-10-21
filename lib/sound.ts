/**
 * Opt-in site sound, synthesised with Web Audio (no audio files).
 *  - ambient: low brown-noise room tone, slowly breathing
 *  - click():  a short mechanical key click (the intro's Enter press)
 * Off by default. The choice persists in localStorage. An AudioContext can
 * only start after a user gesture, so enabling always happens from a click.
 */
const KEY = 'retro:sound'
type Listener = (on: boolean) => void

let ctx: AudioContext | null = null
let master: GainNode | null = null
let ambient: AudioBufferSourceNode | null = null
let on = false
const listeners = new Set<Listener>()

function readPref(): boolean {
  try {
    return window.localStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}
function writePref(v: boolean) {
  try {
    window.localStorage.setItem(KEY, v ? '1' : '0')
  } catch {
    /* ignore */
  }
}

function ensure(): AudioContext | null {
  if (ctx) return ctx
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AC) return null
  ctx = new AC()
  master = ctx.createGain()
  master.gain.value = 0
  master.connect(ctx.destination)
  return ctx
}

function startAmbient() {
  if (!ctx || !master || ambient) return
  const len = ctx.sampleRate * 4
  const buf = ctx.createBuffer(1, len, ctx.sampleRate)
  const d = buf.getChannelData(0)
  let last = 0
  for (let i = 0; i < len; i++) {
    const w = Math.random() * 2 - 1
    last = (last + 0.02 * w) / 1.02
    d[i] = last * 3.2
  }
  ambient = ctx.createBufferSource()
  ambient.buffer = buf
  ambient.loop = true
  const lp = ctx.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.value = 420
  const g = ctx.createGain()
  g.gain.value = 0.22
  // slow breathing on the room tone
  const lfo = ctx.createOscillator()
  const lfoGain = ctx.createGain()
  lfo.frequency.value = 0.07
  lfoGain.gain.value = 0.08
  lfo.connect(lfoGain).connect(g.gain)
  lfo.start()
  ambient.connect(lp).connect(g).connect(master)
  ambient.start()
}

export function isSoundOn() {
  return on
}

export function initSound() {
  // Remember the preference, but only start audio after a gesture.
  on = false
  if (readPref()) {
    const resume = () => {
      window.removeEventListener('pointerdown', resume)
      window.removeEventListener('keydown', resume)
      if (readPref()) setSound(true)
    }
    window.addEventListener('pointerdown', resume, { once: true })
    window.addEventListener('keydown', resume, { once: true })
  }
}

export function setSound(v: boolean) {
  on = v
  writePref(v)
  if (v) {
    const c = ensure()
    if (!c || !master) return
    void c.resume()
    startAmbient()
    master.gain.cancelScheduledValues(c.currentTime)
    master.gain.setTargetAtTime(1, c.currentTime, 0.4)
  } else if (ctx && master) {
    master.gain.cancelScheduledValues(ctx.currentTime)
    master.gain.setTargetAtTime(0, ctx.currentTime, 0.15)
  }
  listeners.forEach((l) => l(v))
}

export function onSound(l: Listener) {
  listeners.add(l)
  return () => {
    listeners.delete(l)
  }
}

/** A short mechanical key click. */
export function click() {
  if (!on || !ctx || !master) return
  const t = ctx.currentTime
  const len = Math.floor(ctx.sampleRate * 0.05)
  const buf = ctx.createBuffer(1, len, ctx.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 6)
  const src = ctx.createBufferSource()
  src.buffer = buf
  const bp = ctx.createBiquadFilter()
  bp.type = 'bandpass'
  bp.frequency.value = 2400
  bp.Q.value = 1.4
  const g = ctx.createGain()
  g.gain.setValueAtTime(0.9, t)
  src.connect(bp).connect(g).connect(master)
  // low thock under the click
  const o = ctx.createOscillator()
  const og = ctx.createGain()
  o.frequency.setValueAtTime(160, t)
  o.frequency.exponentialRampToValueAtTime(70, t + 0.08)
  og.gain.setValueAtTime(0.35, t)
  og.gain.exponentialRampToValueAtTime(0.001, t + 0.1)
  o.connect(og).connect(master)
  src.start(t)
  o.start(t)
  o.stop(t + 0.12)
}
