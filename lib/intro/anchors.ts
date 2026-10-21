/**
 * Overlay anchors, as percentages of the 16:9 intro stage (not the viewport).
 *
 * The stage box scales as one unit, so these keep `CREATE` on the home row
 * and the Enter glow on the Enter key at every screen size.
 *
 * Measured on the generated footage (keyboard spans 20-80% of the frame
 * width; home row at 35.3% of the height; Enter is the wide key at the
 * right end of the home row). Re-measure on `public/intro/endframe.jpg`
 * if the footage changes.
 */
export type StagePoint = { x: number; y: number }

/** Centre of the `CREATE` wordmark: the home row of the keyboard. */
export const WORDMARK: StagePoint = { x: 50, y: 35.5 }

/** Centre of the Enter / Return key. */
export const ENTER_KEY: StagePoint = { x: 74.7, y: 35.3 }

/** Width of one key, as a percentage of the stage width. Sizes the glow. */
export const KEY_SIZE = 4.2
