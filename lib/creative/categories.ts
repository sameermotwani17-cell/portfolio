export type CategoryId = 'brand' | 'motion' | 'content' | 'builds' | 'music' | 'model'

/** Filter row order. `all` is the default and not a category of its own. */
export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'brand', label: 'Brand films & ads' },
  { id: 'motion', label: 'Motion & AI visuals' },
  { id: 'content', label: 'Content' },
  { id: 'builds', label: 'Creative builds' },
  { id: 'music', label: 'Music' },
  { id: 'model', label: 'Modeling' },
]
