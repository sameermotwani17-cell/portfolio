/**
 * The showroom: a wall of the studio's most photoreal and most-watched pieces,
 * under the creative arc, sorted into categories. Files live in
 * /public/creative/showroom (webp up to 1600px, mp4 up to 720p/1280p, muted).
 */
export type ShowroomCategory = 'films' | 'stills' | 'graphics' | 'reels' | 'motion' | 'creators' | 'shorts'

export const SHOWROOM_CATEGORIES: { id: ShowroomCategory; label: string }[] = [
  { id: 'films', label: 'Trailers & ads' },
  { id: 'stills', label: 'Campaign stills' },
  { id: 'graphics', label: 'Brand graphics' },
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

const graphic = (id: string, title: string, tag: string): ShowroomItem => ({
  id,
  kind: 'image',
  cat: 'graphics',
  src: `${S}/${id}.webp`,
  title,
  tag,
  ratio: 4 / 5,
})

const GRAPHICS: ShowroomItem[] = [
  graphic('xs-community', 'Welcome to the Xs community', 'Xs · launch carousel'),
  graphic('xs-clothing-brand', 'More than a clothing brand', 'Xs · launch carousel'),
  graphic('xs-roadmap', 'The roadmap', 'Xs · launch carousel'),
  graphic('xs-group-chats', 'Most group chats are dead', 'Xs · launch carousel'),
]

const FILMS: ShowroomItem[] = [
  clip('here-now-mv', 'films', 'Here Now', 'AG · official music video', 16 / 9),
  clip('watashi-kerie', 'films', 'Watashi... kirei?', 'Pre-trailer · Halloween 2026', 16 / 9),
  clip('opus-vs-astra', 'films', 'Opus vs Astra', 'Fight Night intro · AI heavyweights', 4 / 3),
  clip('horror-teaser', 'films', 'Something big is coming', 'Halloween teaser', 16 / 9),
  clip('gomiyage-ad', 'films', 'Gomiyage', 'Product ad · Beppu', 16 / 9),
  clip('2026-09-fightnight-faceoff-liveposter-4x3', 'films', 'Fight Night face-off', 'Live poster · AI heavyweights', 4 / 3),
  clip('linkedin-prove-a-point-vidoe', 'films', 'Prove a point', 'Retro Studios · LinkedIn', 16 / 9),
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
  still('lucha-ring', 'In the ring', 'DK2R · Lucha'),
  still('lucha-luchador', 'Luchador', 'DK2R · Lucha'),
  still('lucha-low', 'Low angle', 'DK2R · Lucha'),
  still('lucha-tape', 'Wrist tape', 'DK2R · Lucha'),
  still('reinas-rooftop', 'Rooftop skyline', 'DK2R · Las Reinas'),
  still('reinas-portrait', 'Beauty portrait', 'DK2R · Las Reinas'),
  still('reinas-marigold', 'Marigold wind', 'DK2R · Las Reinas'),
  still('reinas-two', 'Back to back', 'DK2R · Las Reinas'),
  still('archivo-stadium', 'Stadium, 1986', 'DK2R · Archivo 86'),
  still('archivo-plaza', 'Plaza, 1986', 'DK2R · Archivo 86'),
  still('archivo-car', 'Car hood', 'DK2R · Archivo 86'),
  still('archivo-tunnel', 'Stadium tunnel', 'DK2R · Archivo 86'),
]

const REELS: ShowroomItem[] = [
  clip('usa-ugc-man', 'reels', 'The jersey, to camera', 'DK2R · USA · UGC'),
  clip('usa-airport', 'reels', 'Through customs', 'DK2R · USA · POV'),
  clip('usa-pov', 'reels', 'Limited edition, 014 of 300', 'DK2R · USA · POV'),
  clip('usa-cooked', 'reels', 'POV: Retro Studios cooked', 'DK2R · USA · POV'),
  clip('usa-reel-4-honorable-c-note-edit', 'reels', 'The C-Note edit', 'DK2R · USA edition'),
  clip('brazil-video-1-documentary', 'reels', 'Brazil, the documentary', 'DK2R · Brazil'),
  clip('brazil-video-2-unexpected-like-a-mixtape', 'reels', 'Unexpected, like a mixtape', 'DK2R · Brazil'),
  clip('brazil-video-6-pov-got-paid-to-make-ads', 'reels', 'POV: got paid to make ads', 'DK2R · Brazil'),
  clip('brazil-video-7-person-on-the-wing', 'reels', 'Walking the wing', 'DK2R · Brazil'),
]

const MOTION: ShowroomItem[] = [
  clip('flash-reel', 'motion', 'Retro Studios flash reel', 'Retro Studios · 2026', 16 / 9),
  clip('usa-museum', 'motion', 'The museum case', 'DK2R · motion graphics'),
  clip('retro-flash', 'motion', 'Retro, in frames', 'Retro Studios · title cards'),
  clip('landscape-glitvh-linkedin', 'motion', 'Glitch title', 'Retro Studios · LinkedIn', 16 / 9),
  clip('retrostudios-motion-graphics', 'motion', 'Motion graphics reel', 'Retro Studios · 2026', 4 / 3),
  clip('2026-07-xs-logoreveal-v1', 'motion', 'Xs logo reveal', 'Xs · brand motion'),
]

const CREATORS: ShowroomItem[] = [
  clip('fitz-dont-hurt', 'creators', "Don't hurt me", 'Fitz · DayZ'),
  clip('bluecollar-do-it', 'creators', 'Do it for $4K?', 'Blue Collar Business Podcast'),
  clip('bazza-clerk', 'creators', 'The clerk did a full 180', 'Bazza · GTA RP'),
  clip('fitz-bar-fight', 'creators', 'Bar fight', 'Fitz · DayZ'),
  clip('bluecollar-ignorance', 'creators', 'Nobody cares about 15 years', 'Blue Collar Business Podcast'),
  clip('bazza-boss', 'creators', 'Boss battle at the docks', 'Bazza · GTA RP'),
  clip('2026-09-ag-herenow-opusclip-test-01-onlyoneme', 'creators', 'Only one me', 'AG · Here Now'),
  clip('2026-09-ag-herenow-opusclip-test-02-backwithheat', 'creators', 'Back with heat', 'AG · Here Now'),
  clip('2026-07-xs-reel-9x16-v1', 'creators', 'No mediocrity, no apology', 'Xs · launch reel'),
  clip('2026-07-xs-video-v1', 'creators', 'Built for the driven', 'Xs · brand film'),
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
  clip('s39-ai-boom', 'shorts', 'The AI boom', 'Short · AI'),
  clip('s13-claude-prompts-itself', 'shorts', 'Claude prompts itself', 'Short · AI'),
  clip('s17-forward-deployed', 'shorts', 'Forward deployed', 'Short · work'),
  clip('s22-ai-with-taste', 'shorts', 'AI with taste', 'Short · AI'),
]

/** "All" interleaves the categories so no single type clumps together. */
function interleave(lists: ShowroomItem[][]): ShowroomItem[] {
  const out: ShowroomItem[] = []
  const max = Math.max(...lists.map((l) => l.length))
  for (let i = 0; i < max; i++) for (const l of lists) if (l[i]) out.push(l[i])
  return out
}

export const SHOWROOM: ShowroomItem[] = interleave([FILMS, STILLS, GRAPHICS, REELS, CREATORS, SHORTS, MOTION])
