import type { Metadata } from 'next'
import TechUniverse from '@/components/tech/TechUniverse'
import { UNIVERSES } from '@/lib/universe/sides'

export const metadata: Metadata = {
  title: UNIVERSES.tech.title,
  description: UNIVERSES.tech.description,
}

export default function TechPage() {
  return <TechUniverse />
}
