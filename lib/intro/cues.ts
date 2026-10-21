/**
 * Master clock cues for the opening sequence, in seconds of `video.currentTime`.
 *
 * Every overlay is driven from these values inside a rAF loop that reads the
 * video clock, so retiming the sequence to new footage means editing only this
 * file. After the footage is generated, scrub `public/intro/intro.mp4` frame by
 * frame and set ENTER_PRESS to the exact frame the Enter key goes down.
 */
export const CUES = {
  /** Beat A -> B: hands lift, keyboard backlight starts switching off. */
  TYPING_END: 1.5,
  /** Beat C: `CREATE` starts typing in on the home row. */
  WORD_START: 2.6,
  /** Beat D: the frame the Enter key is fully depressed. Glow pulse fires here. */
  ENTER_PRESS: 3.4,
  /** Beat E: video pushes in, wordmark spreads, bloom expands from the key. */
  TRANSITION_START: 4.6,
  /** The bloom has settled into paper; the hero takes over and the video unmounts. */
  HERO_IN: 5.4,
} as const

/** If the video has not reached `canplay` by this point, go straight to the hero. */
export const CANPLAY_TIMEOUT_MS = 1500

/** Crossfade used when the intro is skipped or hands over to the hero. */
export const CROSSFADE_MS = 300

export type Beat = 'typing' | 'blackout' | 'word' | 'enter' | 'transition' | 'hero'

/** Map a video time to the beat that owns it. */
export function beatAt(t: number): Beat {
  if (t >= CUES.HERO_IN) return 'hero'
  if (t >= CUES.TRANSITION_START) return 'transition'
  if (t >= CUES.ENTER_PRESS) return 'enter'
  if (t >= CUES.WORD_START) return 'word'
  if (t >= CUES.TYPING_END) return 'blackout'
  return 'typing'
}
