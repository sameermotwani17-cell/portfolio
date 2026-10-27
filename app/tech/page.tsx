import type { Metadata } from 'next'
import TechUniverse from '@/components/tech/TechUniverse'

const TITLE = 'Tech · Forward Deployed Engineer · Sameer Motwani'
const DESCRIPTION =
  'Forward Deployed Engineer. Embeds with your team, ships into messy real-world production, measures the result and hands over something you can run.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
}

export default function TechPage() {
  return <TechUniverse />
}
