/**
 * Intro sound, synthesised with Web Audio (no audio files), always on:
 *  - typeKey(i): one keystroke as each letter of CREATE prints in
 *  - click():    the heavier key press on Enter
 *  - swoosh():   the whoosh as the frame opens out into the hero
 * Browsers only let an AudioContext run after a user gesture, so the first
 * gesture on the page (a click, a key, a tap) unlocks it; until then these
 * calls are silent no-ops.
 */
// Off by default: the intro is silent unless the visitor turns the sound on.
let enabled = false

export function setSoundEnabled(on: boolean) {
  enabled = on
  if (on) unlockSound() // call from inside the click that turns it on
}

export function isSoundEnabled() {
  return enabled
}

let ctx: AudioContext | null = null
let master: GainNode | null = null

function ensure(): AudioContext | null {
  if (ctx) return ctx
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AC) return null
  ctx = new AC()
  master = ctx.createGain()
  master.gain.value = 1
  master.connect(ctx.destination)
  return ctx
}

let initialised = false

export function initSound() {
  ensure()
  if (initialised) return
  initialised = true
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

/** Call from inside a user gesture (click, key, tap): starts the audio engine. */
export function unlockSound() {
  ensure()
  void ctx?.resume()
}

/** True once the browser lets us make noise (a gesture happened, or it allows autoplay). */
export function audioRunning() {
  return !!ctx && ctx.state === 'running'
}

const live = () => enabled && !!ctx && !!master && ctx.state === 'running'

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

/** A rising air whoosh: filtered noise sweeping up, with a soft low swell under it. */
export function swoosh() {
  if (!live() || !ctx || !master) return
  const t = ctx.currentTime
  const dur = 0.7
  const len = Math.floor(ctx.sampleRate * dur)
  const buf = ctx.createBuffer(1, len, ctx.sampleRate)
  const d = buf.getChannelData(0)
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1
  const src = ctx.createBufferSource()
  src.buffer = buf
  const bp = ctx.createBiquadFilter()
  bp.type = 'bandpass'
  bp.Q.value = 0.9
  bp.frequency.setValueAtTime(350, t)
  bp.frequency.exponentialRampToValueAtTime(5200, t + dur * 0.85)
  const g = ctx.createGain()
  g.gain.setValueAtTime(0.0001, t)
  g.gain.exponentialRampToValueAtTime(0.55, t + dur * 0.35)
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  src.connect(bp).connect(g).connect(master)
  // low swell
  const o = ctx.createOscillator()
  const og = ctx.createGain()
  o.type = 'sine'
  o.frequency.setValueAtTime(90, t)
  o.frequency.exponentialRampToValueAtTime(260, t + dur * 0.8)
  og.gain.setValueAtTime(0.0001, t)
  og.gain.exponentialRampToValueAtTime(0.18, t + dur * 0.3)
  og.gain.exponentialRampToValueAtTime(0.0001, t + dur)
  o.connect(og).connect(master)
  src.start(t)
  o.start(t)
  o.stop(t + dur + 0.05)
}
