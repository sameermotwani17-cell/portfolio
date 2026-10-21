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

/** Anything the visitor is doing (or a transition running) that deserves full frame rate. */
export const isBusy = (
  f: { active: boolean, impulses: unknown[], taps: unknown[] } | null | undefined,
  s: StageState | null | undefined,
) =>
  !!f && !!s && (f.active || f.impulses.length > 0 || f.taps.length > 0 || s.lean !== null || Math.abs(s.speedL - 1) > 0.05 || Math.abs(s.speedR - 1) > 0.05 || s.freezeL || s.freezeR)
