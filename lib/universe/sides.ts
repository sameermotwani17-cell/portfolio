/**
 * Section 03 · Choose your universe. Which side is which, and the copy on each.
 * Edit the strings here; nothing else in the section holds copy.
 */
export type SideId = 'left' | 'right'
export type UniverseId = 'tech' | 'creative'

export const SIDES: Record<SideId, UniverseId> = { left: 'tech', right: 'creative' }

export type UniverseCopy = {
  id: UniverseId
  side: SideId
  /** Big label on the split. */
  label: string
  /** Mono sub-line under the label. */
  sub: string
  href: string
  aria: string
  /** Page metadata for the universe route. */
  title: string
  description: string
}

export const UNIVERSES: Record<UniverseId, UniverseCopy> = {
  tech: {
    id: 'tech',
    side: 'left',
    label: 'TECH',
    sub: 'AI products · engineering · client builds',
    href: '/tech',
    aria: 'Enter the tech universe: engineering, AI products, client work',
    title: 'Tech · Sameer Motwani',
    description: 'AI products, engineering and client builds by Sameer Motwani.',
  },
  creative: {
    id: 'creative',
    side: 'right',
    label: 'CREATIVE',
    sub: 'Retro Studios · motion · content · streams',
    href: '/creative',
    aria: 'Enter the creative universe: Retro Studios, motion, content and streams',
    title: 'Creative · Sameer Motwani',
    description: 'Retro Studios, motion, content and streams by Sameer Motwani.',
  },
}

export const universeOnSide = (side: SideId) => UNIVERSES[SIDES[side]]
export const otherUniverse = (id: UniverseId): UniverseId => (id === 'tech' ? 'creative' : 'tech')
