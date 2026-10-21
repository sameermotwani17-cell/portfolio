/**
 * Shown over the intro's first frame when the browser has not yet allowed
 * audio. The first key press or tap is the gesture that unlocks sound, and it
 * also starts the intro, so the typing, click and swoosh are heard from the
 * first letter.
 */
export default function IntroGate() {
  return (
    <div className="intro-gate" role="button" tabIndex={0} aria-label="Start the intro with sound">
      <span className="intro-gate__line">
        PRESS ANY KEY <i>·</i> OR TAP <i>·</i> SOUND ON
        <span className="intro-gate__cursor" aria-hidden="true">▍</span>
      </span>
    </div>
  )
}
