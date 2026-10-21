import type { Metadata } from 'next'
import UniverseShell from '@/components/universe/UniverseShell'
import { UNIVERSES } from '@/lib/universe/sides'

export const metadata: Metadata = {
  title: UNIVERSES.tech.title,
  description: UNIVERSES.tech.description,
}

export default function TechPage() {
  return <UniverseShell universe="tech" />
}
