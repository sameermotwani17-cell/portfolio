/**
 * The showroom: a wall of the studio's most photoreal and most-watched pieces,
 * under the creative arc, sorted into categories. Files live in
 * /public/creative/showroom (webp up to 1600px, mp4 up to 720p/1280p, muted).
 */
export type ShowroomCategory = 'films' | 'stills' | 'reels' | 'motion' | 'creators' | 'shorts'

export const SHOWROOM_CATEGORIES: { id: ShowroomCategory; label: string }[] = [
  { id: 'films', label: 'Trailers & ads' },
  { id: 'stills', label: 'Campaign stills' },
  { id: 'reels', label: 'Brand reels' },
  { id: 'motion', label: 'Motion' },
  { id: 'creators', label: 'Creator clips' },
  { id: 'shorts', label: 'Shorts' },
]

export type ShowroomItem = {
  id: string
  kind: 'image' | 'video'
  cat: ShowroomCategory
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

const still = (id: string, title: string, tag: string): ShowroomItem => ({
  id,
  kind: 'image',
  cat: 'stills',
  src: `${S}/${id}.webp`,
  title,
  tag,
  ratio: 1,
})

const clip = (id: string, cat: ShowroomCategory, title: string, tag: string, ratio = 9 / 16): ShowroomItem => ({
  id,
  kind: 'video',
  cat,
  src: `${S}/${id}.mp4`,
  poster: `${S}/${id}.webp`,
  title,
  tag,
  ratio,
})

const FILMS: ShowroomItem[] = [
  clip('watashi-kerie', 'films', 'Watashi... kirei?', 'Pre-trailer · Halloween 2026', 16 / 9),
  clip('opus-vs-astra', 'films', 'Opus vs Astra', 'Fight Night intro · AI heavyweights', 4 / 3),
  clip('horror-teaser', 'films', 'Something big is coming', 'Halloween teaser', 16 / 9),
  clip('gomiyage-ad', 'films', 'Gomiyage', 'Product ad · Beppu', 16 / 9),
]

const STILLS: ShowroomItem[] = [
  still('calor-fan', 'Fan alley', 'DK2R · Calor'),
  still('cancha-fence', 'Through the fence', 'DK2R · La Cancha'),
  still('medianoche-taco', 'Taco stand, after dark', 'DK2R · Medianoche'),
  still('elmercado-vendor', 'The vendor', 'DK2R · El Mercado'),
  still('calor-soda', 'Curb soda', 'DK2R · Calor'),
  still('cancha-walking', 'Walking off', 'DK2R · La Cancha'),
  still('medianoche-elote', 'Elote', 'DK2R · Medianoche'),
  still('calor-bikes', 'Corner crew', 'DK2R · Calor'),
  still('elmercado-flowers', 'Flower stall', 'DK2R · El Mercado'),
  still('cancha-argument', 'The argument', 'DK2R · La Cancha'),
  still('medianoche-beetle', 'Neon Beetle', 'DK2R · Medianoche'),
  still('calor-sprinkler', 'Sprinkler day', 'DK2R · Calor'),
]

const REELS: ShowroomItem[] = [
  clip('usa-ugc-man', 'reels', 'The jersey, to camera', 'DK2R · USA · UGC'),
  clip('usa-airport', 'reels', 'Through customs', 'DK2R · USA · POV'),
  clip('usa-pov', 'reels', 'Limited edition, 014 of 300', 'DK2R · USA · POV'),
  clip('usa-cooked', 'reels', 'POV: Retro Studios cooked', 'DK2R · USA · POV'),
]

const MOTION: ShowroomItem[] = [
  clip('flash-reel', 'motion', 'Retro Studios flash reel', 'Retro Studios · 2026', 16 / 9),
  clip('usa-museum', 'motion', 'The museum case', 'DK2R · motion graphics'),
  clip('retro-flash', 'motion', 'Retro, in frames', 'Retro Studios · title cards'),
]

const CREATORS: ShowroomItem[] = [
  clip('fitz-dont-hurt', 'creators', "Don't hurt me", 'Fitz · DayZ'),
  clip('bluecollar-do-it', 'creators', 'Do it for $4K?', 'Blue Collar Business Podcast'),
  clip('bazza-clerk', 'creators', 'The clerk did a full 180', 'Bazza · GTA RP'),
  clip('fitz-bar-fight', 'creators', 'Bar fight', 'Fitz · DayZ'),
  clip('bluecollar-ignorance', 'creators', 'Nobody cares about 15 years', 'Blue Collar Business Podcast'),
  clip('bazza-boss', 'creators', 'Boss battle at the docks', 'Bazza · GTA RP'),
]

const SHORTS: ShowroomItem[] = [
  clip('short-3k', 'shorts', '$3,000 from one simple website', 'Short · build in public'),
  clip('short-japan', 'shorts', 'Liberia, Israel, Japan', 'Short · my story'),
  clip('short-music', 'shorts', 'Quit music? Never.', 'Short · music'),
  clip('short-ai-content', 'shorts', '$1,000 from AI content', 'Short · AI content'),
  clip('short-client-paid', 'shorts', "The client who paid and didn't use it", 'Short · freelance'),
  clip('short-liberia', 'shorts', 'From Liberia to study in Israel', 'Short · my story'),
  clip('short-model', 'shorts', 'Trying to become a model', 'Short · next week'),
  clip('short-attention', 'shorts', 'Attention is the whole game', 'Short · content'),
]

/** "All" interleaves the categories so no single type clumps together. */
function interleave(lists: ShowroomItem[][]): ShowroomItem[] {
  const out: ShowroomItem[] = []
  const max = Math.max(...lists.map((l) => l.length))
  for (let i = 0; i < max; i++) for (const l of lists) if (l[i]) out.push(l[i])
  return out
}

export const SHOWROOM: ShowroomItem[] = interleave([FILMS, STILLS, REELS, CREATORS, SHORTS, MOTION])
