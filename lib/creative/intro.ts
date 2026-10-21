/**
 * Timing for the creative entry. Act 1 (the shot) and Act 2 (RETRO) play on
 * the split page after a CREATIVE click; Act 3 (the arc) is the /creative page.
 * All times in ms from the start of the act.
 */

/** How the head goes. Only 'paint' exists: no blood, no gore, ever. */
export const IMPACT_STYLE = 'paint' as const

export const SHOT = {
  /** 0–150: everything freezes, the tech half and labels fade to 15%. */
  FREEZE_END: 150,
  /** 150–350: snap zoom toward the head. */
  ZOOM_END: 350,
  ZOOM_TO: 1.6,
  /** Two 60ms X-ray inversions inside the zoom. */
  XRAY: [
    [170, 230],
    [270, 330],
  ] as const,
  /** 350–1350: the bullet in slow motion. */
  BULLET_END: 1350,
  RING_EVERY: 120,
  /** 1350–1450: white flash (80ms) and an 8px, 3-cycle shake. */
  IMPACT_END: 1450,
  FLASH_MS: 80,
  SHAKE_PX: 8,
  SHAKE_CYCLES: 3,
  /** 1450–2000: the head bursts into paint. */
  BURST_END: 2000,
  /** 2000–2250: particles stream to centre while the frame goes black. */
  DISSOLVE_MS: 250,
} as const

export const PARTICLE_CAP = { desktop: 6000, mobile: 2500 } as const

export const STORM = {
  /** fade from black to the lit page */
  OPEN_MS: 280,
  /** per-word duration, eased from START to END across the sequence */
  START_MS: 420,
  END_MS: 130,
  /** RETRO hits hold this much longer */
  RETRO_HOLD: 1.45,
  /** the final RETRO STUDIOS */
  FINAL_HOLD_MS: 600,
  /** page flip to white */
  FLIP_MS: 420,
} as const

export const LOADER = {
  MIN_MS: 2500,
  MAX_MS: 4000,
  /** arc → panoramic wall */
  REVEAL_MS: 1400,
} as const

/** sessionStorage keys (always read/written in try/catch). */
export const KEYS = {
  /** Acts 1–2 have played this session. */
  ACTS_PLAYED: 'retro:creative:acts',
  /** The visitor skipped: the loader jumps to its end once assets are in. */
  SKIP: 'retro:creative:skip',
} as const

export function readFlag(key: string) {
  try {
    return window.sessionStorage.getItem(key) === '1'
  } catch {
    return false
  }
}
export function setFlag(key: string, on = true) {
  try {
    if (on) window.sessionStorage.setItem(key, '1')
    else window.sessionStorage.removeItem(key)
  } catch {
    /* storage unavailable: acts simply play again */
  }
}
