/**
 * Overlay anchors, as percentages of the 16:9 intro stage (not the viewport).
 *
 * The stage box scales as one unit, so these keep `CREATE` on the home row
 * and the Enter glow on the Enter key at every screen size.
 *
 * After the footage is generated, measure the real home-row centre and the
 * Enter-key centre from `public/intro/endframe.jpg` and set these values.
 */
export type StagePoint = { x: number; y: number }

/** Centre of the `CREATE` wordmark: the home row of the keyboard. */
export const WORDMARK: StagePoint = { x: 50, y: 58 }

/** Centre of the Enter / Return key. */
export const ENTER_KEY: StagePoint = { x: 82, y: 56 }

/** Width of one key, as a percentage of the stage width. Sizes the glow. */
export const KEY_SIZE = 5
