'use client'

import dynamic from 'next/dynamic'

/**
 * Client boundary for the intro. `ssr: false` keeps every byte of the
 * sequence (video element, clock, overlays) out of the server HTML, so the
 * hero below it is what the crawler and the first paint see.
 */
const OpeningSequence = dynamic(() => import('./OpeningSequence'), {
  ssr: false,
})

export default function IntroLoader() {
  return <OpeningSequence />
}
