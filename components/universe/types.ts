import type { SideId } from '@/lib/universe/sides'

/** Mutable stage state shared by the layers. Written by UniverseSplit, read in the ticker. */
export type StageState = {
  /** Live seam position, 0..1 of the stage width. */
  seam: number
  /** Motion speed multipliers per side (hover 1.5 / 0.6, entering 3). */
  speedL: number
  speedR: number
  /** Grids freeze on a side while the other one is entered. */
  freezeL: boolean
  freezeR: boolean
  lean: SideId | null
}

export const initialStage = (): StageState => ({
  seam: 0.5, speedL: 1, speedR: 1, freezeL: false, freezeR: false, lean: null,
})
