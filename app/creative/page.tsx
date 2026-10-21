import type { Metadata } from 'next'
import CreativeUniverse from '@/components/creative/CreativeUniverse'
import { UNIVERSES } from '@/lib/universe/sides'

const DESCRIPTION =
  'Retro Studios: AI campaigns, brand worlds, motion and music by Sameer Motwani. A curved gallery of the creative work.'

export const metadata: Metadata = {
  title: UNIVERSES.creative.title,
  description: DESCRIPTION,
  openGraph: {
    title: UNIVERSES.creative.title,
    description: DESCRIPTION,
    images: [{ url: '/creative/og-arc.jpg', width: 1200, height: 630, alt: 'The Retro Studios work arc over a dusk sky' }],
  },
  twitter: { card: 'summary_large_image', images: ['/creative/og-arc.jpg'] },
}

/** Section 04 · the creative universe. Acts 1–2 play on the split; this is Act 3. */
export default function CreativePage() {
  return <CreativeUniverse />
}
