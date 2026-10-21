/**
 * Site sound, synthesised with Web Audio (no audio files):
 *  - typeKey(i): one keystroke as a letter of CREATE prints in
 *  - click():    the heavier key press on Enter
 * No ambient bed. On by default; the SOUND toggle turns it off and the choice
 * persists in localStorage. Browsers only let an AudioContext run after a user
 * gesture, so the first gesture on the page (a click, a key, a tap) unlocks it;
 * until then these calls are silent no-ops.
 */
const KEY = 'retro:sound'
type Listener = (on: boolean) => void

let ctx: AudioContext | null = null
let master: GainNode | null = null
let on = true
const listeners = new Set<Listener>()

function readPref(): boolean {
  try {
    return window.localStorage.getItem(KEY) !== '0'
  } catch {
    return true
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
  master.gain.value = on ? 1 : 0
  master.connect(ctx.destination)
  return ctx
}

export function isSoundOn() {
  return on
}

export function initSound() {
  on = readPref()
  ensure()
  // an AudioContext can only start after a gesture: unlock it on the first one
  const unlock = () => {
    window.removeEventListener('pointerdown', unlock)
    window.removeEventListener('keydown', unlock)
    window.removeEventListener('touchend', unlock)
    void ctx?.resume()
  }
  window.addEventListener('pointerdown', unlock)
  window.addEventListener('keydown', unlock)
  window.addEventListener('touchend', unlock)
}

export function setSound(v: boolean) {
  on = v
  writePref(v)
  const c = ensure()
  if (c && master) {
    if (v) void c.resume()
    master.gain.cancelScheduledValues(c.currentTime)
    master.gain.setTargetAtTime(v ? 1 : 0, c.currentTime, 0.08)
  }
  listeners.forEach((l) => l(v))
}

export function onSound(l: Listener) {
  listeners.add(l)
  return () => {
    listeners.delete(l)
  }
}

const live = () => on && !!ctx && !!master && ctx.state === 'running'

/** One light keyboard keystroke; every call is a little different. */
export function typeKey(i = 0) {
  if (!live() || !ctx || !master) return
  const t = ctx.currentTime
  const len = Math.floor(ctx.sampleRate * 0.035)
  const buf = ctx.createBuffer(1, len, ctx.sampleRate)
  const d = buf.getChannelData(0)
  for (let k = 0; k < len; k++) d[k] = (Math.random() * 2 - 1) * Math.pow(1 - k / len, 5)
  const src = ctx.createBufferSource()
  src.buffer = buf
  const bp = ctx.createBiquadFilter()
  bp.type = 'bandpass'
  bp.frequency.value = 1900 + ((i * 337) % 900) + Math.random() * 300
  bp.Q.value = 1.1
  const g = ctx.createGain()
  g.gain.setValueAtTime(0.55 + Math.random() * 0.15, t)
  src.connect(bp).connect(g).connect(master)
  // a soft low thock under the click
  const o = ctx.createOscillator()
  const og = ctx.createGain()
  o.frequency.setValueAtTime(190 + Math.random() * 40, t)
  o.frequency.exponentialRampToValueAtTime(80, t + 0.05)
  og.gain.setValueAtTime(0.22, t)
  og.gain.exponentialRampToValueAtTime(0.001, t + 0.07)
  o.connect(og).connect(master)
  src.start(t)
  o.start(t)
  o.stop(t + 0.08)
}

/** A short mechanical key click: the Enter press. */
export function click() {
  if (!live() || !ctx || !master) return
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
