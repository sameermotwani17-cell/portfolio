/**
 * The showroom: a hand-picked wall of the most photoreal pieces generated at
 * Retro Studios, under the creative arc. Images are the DK2R World Cup campaign
 * stills; videos are the studio's own edits (no third-party footage).
 * Files live in /public/creative/showroom (webp up to 1600px, mp4 up to 720p, muted).
 */
export type ShowroomItem = {
  id: string
  kind: 'image' | 'video'
  /** image src, or the mp4 for a video */
  src: string
  /** still frame shown before a video plays */
  poster?: string
  title: string
  /** campaign or piece, shown as the small caption */
  tag: string
  /** width / height, reserves space so the wall never jumps */
  ratio: number
}

const S = '/creative/showroom'

const still = (id: string, title: string, tag: string, ratio = 1): ShowroomItem => ({
  id,
  kind: 'image',
  src: `${S}/${id}.webp`,
  title,
  tag,
  ratio,
})

const clip = (id: string, title: string, tag: string, ratio: number): ShowroomItem => ({
  id,
  kind: 'video',
  src: `${S}/${id}.mp4`,
  poster: `${S}/${id}.webp`,
  title,
  tag,
  ratio,
})

export const SHOWROOM: ShowroomItem[] = [
  clip('usa-ugc-man', 'The jersey, to camera', 'DK2R · USA · UGC', 9 / 16),
  still('calor-fan', 'Fan alley', 'DK2R · Calor'),
  still('cancha-fence', 'Through the fence', 'DK2R · La Cancha'),
  clip('flash-reel', 'Retro Studios flash reel', 'Retro Studios · 2026', 16 / 9),
  still('medianoche-taco', 'Taco stand, after dark', 'DK2R · Medianoche'),
  still('elmercado-vendor', 'The vendor', 'DK2R · El Mercado'),
  clip('usa-airport', 'Through customs', 'DK2R · USA · POV', 9 / 16),
  still('calor-soda', 'Curb soda', 'DK2R · Calor'),
  still('cancha-walking', 'Walking off', 'DK2R · La Cancha'),
  still('medianoche-elote', 'Elote', 'DK2R · Medianoche'),
  clip('usa-pov', 'Limited edition, 014 of 300', 'DK2R · USA · POV', 9 / 16),
  still('calor-bikes', 'Corner crew', 'DK2R · Calor'),
  still('elmercado-flowers', 'Flower stall', 'DK2R · El Mercado'),
  still('cancha-argument', 'The argument', 'DK2R · La Cancha'),
  still('medianoche-beetle', 'Neon Beetle', 'DK2R · Medianoche'),
  still('calor-sprinkler', 'Sprinkler day', 'DK2R · Calor'),
]
