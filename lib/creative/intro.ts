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
  /** 350–1250: the bullet in slow motion, camera tracking it in close-up. */
  CLOSE_ZOOM: 2.3,
  CONTACT: 1250,
  RING_EVERY: 170,
  /** The cut: one white frame, then black, then the wide aftermath. */
  CUT_WHITE_MS: 20,
  CUT_BLACK_MS: 90,
  /** Wide shot: the head is knocked back and comes apart into paint. */
  AFTER_ZOOM: 1.06,
  KNOCK_MS: 140,
  SHAKE_PX: 10,
  SHAKE_MS: 160,
  SHAKE_CYCLES: 3,
  BURST_END: 2050,
  /** then the frame dissolves to black into Act 2 */
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
