import type { UniverseId } from '@/lib/universe/sides'

/**
 * Slot for each universe's real content (projects, case studies, creative
 * work). Empty on purpose in Section 03; it lands in a later section.
 */
export default function UniverseContent({ universe }: { universe: UniverseId }) {
  return <div data-slot="universe-content" data-universe={universe} hidden />
}
