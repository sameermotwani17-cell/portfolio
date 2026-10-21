/**
 * Where my head is in the Section 03 back-view photo, measured on the actual
 * images (public/universe/backview-*.webp), as % of the IMAGE: x/y of the
 * head's centre, r as % of the image width.
 *
 * The photo is drawn object-fit: cover with object-position 50% 38% (see
 * .uni-photo img), so the head's position on the stage depends on the
 * viewport. `headOnStage()` does the cover maths.
 */
export type Head = { x: number; y: number; r: number }

export const HEAD: { desktop: Head; mobile: Head } = {
  // 2000×1125: curls span x 34–64%, y 20–67%
  desktop: { x: 49, y: 43.5, r: 14.6 },
  // 1200×1500: curls span x 27–73%, y 27–64%
  mobile: { x: 49.7, y: 45.4, r: 23 },
}

export const IMAGE = {
  desktop: { src: '/universe/backview-desktop.webp', w: 2000, h: 1125 },
  mobile: { src: '/universe/backview-mobile.webp', w: 1200, h: 1500 },
} as const

/** Must match .uni-photo img { object-position }. */
export const OBJECT_POSITION = { x: 0.5, y: 0.38 }

export type Cover = { scale: number; offX: number; offY: number }

export function coverFor(stageW: number, stageH: number, imgW: number, imgH: number): Cover {
  const scale = Math.max(stageW / imgW, stageH / imgH)
  return {
    scale,
    offX: (stageW - imgW * scale) * OBJECT_POSITION.x,
    offY: (stageH - imgH * scale) * OBJECT_POSITION.y,
  }
}

/** The head centre and radius in stage pixels. */
export function headOnStage(stageW: number, stageH: number, mobile: boolean) {
  const im = mobile ? IMAGE.mobile : IMAGE.desktop
  const h = mobile ? HEAD.mobile : HEAD.desktop
  const c = coverFor(stageW, stageH, im.w, im.h)
  return {
    x: c.offX + (h.x / 100) * im.w * c.scale,
    y: c.offY + (h.y / 100) * im.h * c.scale,
    r: (h.r / 100) * im.w * c.scale,
    cover: c,
    image: im,
  }
}
