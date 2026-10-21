import type { Metadata } from 'next'
import UniverseShell from '@/components/universe/UniverseShell'
import { UNIVERSES } from '@/lib/universe/sides'

export const metadata: Metadata = {
  title: UNIVERSES.creative.title,
  description: UNIVERSES.creative.description,
}

export default function CreativePage() {
  return <UniverseShell universe="creative" />
}
