import { albums, retroReleases } from '@/lib/projects'
import { AJIWOW } from '@/lib/creative/ajiwow'
import { SHOWROOM } from '@/lib/creative/showroom'
import type { Work } from '@/lib/creative/works'
import { SCOPES, type CaseMedia, type CaseFilm, type Scope } from '@/lib/creative/scopes'

export type { CaseMedia, CaseFilm, Scope }

/**
 * Every card in the arc opens one of these: a client style case study sheet.
 * Ajiwow is hand written. The rest are built from the project records already
 * on the main site (overview, stats, flow) plus the best matching media from
 * the showroom, so nothing is written twice.
 */

export type CaseStudy = {
  id: string
  kicker: string
  title: string
  titleJp?: string
  jpName?: string
  intro: string
  client: string
  role: string
  when: string
  links: { label: string; href: string }[]
  stats: { value: string; label: string }[]
  steps: { n: string; title: string; body: string }[]
  swatches?: { name: string; hex: string }[]
  site?: CaseMedia[]
  rail?: CaseMedia[]
  railTitle?: string
  poster?: CaseMedia & { ratio: number }
  films?: CaseFilm[]
  accent: string
  /** each discipline delivered, with an embedded example */
  scopes?: Scope[]
  /** which look the sheet wears */
  theme: string
  /** the album cover art */
  cover: string
  /** a client testimonial */
  quote?: { text: string; who: string }
  /** photographer or other credit, shown in the meta row */
  credit?: string
  /** a short artist-profile style bio */
  bio?: { title: string; body: string[]; facts: { value: string; label: string }[]; photo?: string }
}

const byId = (ids: string[]) =>
  ids.map((id) => SHOWROOM.find((s) => s.id === id)).filter((s): s is NonNullable<typeof s> => !!s)

const filmsOf = (ids: string[]): CaseFilm[] =>
  byId(ids)
    .filter((s) => s.kind === 'video')
    .map((s) => ({ src: s.src, poster: s.poster, title: s.title, tag: s.tag, ratio: s.ratio }))

const stillsOf = (ids: string[]): CaseMedia[] =>
  byId(ids)
    .filter((s) => s.kind === 'image')
    .map((s) => ({ src: s.src, label: `${s.title} · ${s.tag}` }))

/** showroom pieces that belong to a card */
const MEDIA: Record<string, { rail?: string[]; films?: string[]; railTitle?: string }> = {
  dk2r: {
    railTitle: 'The campaign',
    rail: [
      'calor-fan', 'cancha-fence', 'medianoche-taco', 'elmercado-vendor', 'lucha-luchador', 'reinas-portrait',
      'archivo-stadium', 'calor-soda', 'cancha-walking', 'medianoche-elote', 'lucha-ring', 'reinas-rooftop',
    ],
    films: [
      'usa-ugc-man', 'usa-airport', 'usa-pov', 'usa-cooked', 'usa-reel-4-honorable-c-note-edit',
      'brazil-video-2-unexpected-like-a-mixtape',
    ],
  },
  'retro-studios': {
    films: ['flash-reel', 'retro-flash', 'usa-museum', 'retrostudios-motion-graphics', 'landscape-glitvh-linkedin', 'here-now-mv'],
  },
}

/** public source for the projects that have one */
const REPOS: Record<string, string> = {
  'too-easy': 'https://github.com/sameermotwani17-cell/too-easy',
  'afro-week': 'https://github.com/sameermotwani17-cell/millennium-hall-booking',
}

/** which record on the main site a card is built from */
const RECORD: Record<string, string> = {}

const AJIWOW_CASE: CaseStudy = {
  id: 'ajiwow',
  kicker: AJIWOW.kicker,
  title: AJIWOW.title,
  titleJp: AJIWOW.titleJp,
  jpName: AJIWOW.jp,
  intro: AJIWOW.intro,
  client: 'Ajiwow Inc. · Tokyo · Techstars Tokyo 2026',
  role: AJIWOW.role,
  when: AJIWOW.when,
  links: [...AJIWOW.links],
  stats: [...AJIWOW.stats],
  steps: AJIWOW.steps.map((s) => ({ ...s })),
  swatches: [...AJIWOW.swatches],
  site: [...AJIWOW.site],
  rail: [...AJIWOW.brand],
  railTitle: 'Brand system v1.0',
  poster: { ...AJIWOW.poster },
  films: AJIWOW.films.map((f) => ({ src: f.src, poster: f.poster, title: f.title, tag: f.tag, ratio: f.ratio })),
  accent: '#cc4210',
  theme: 'ajiwow',
  cover: '/creative/covers/ajiwow.webp',
  quote: { ...AJIWOW.quote },
  scopes: SCOPES.ajiwow,
}

const dedupe = (links: { label: string; href: string }[]) => {
  const seen = new Set<string>()
  return links.filter((l) => (seen.has(l.href) ? false : (seen.add(l.href), true)))
}

const PHOTO_LINKS = [
  { label: 'Photography · @samiclicks', href: 'https://www.instagram.com/samiclicks' },
  { label: 'samiclicks.com', href: 'http://www.samiclicks.com/' },
]

const BIOS: Record<string, NonNullable<CaseStudy['bio']>> = {
  music: {
    photo: '/creative/model/08906.webp',
    title: 'About',
    body: [
      'RETRO is the music name of Sameer Motwani, a Liberian artist living in Japan. Music, visuals, and doing way too much.',
      'Seven singles since March 2025, all written, produced and released independently, with features from Roblyne Ketter and TLE Fries. The covers are the real release art, and the visuals that go with each song are made in the same studio.',
    ],
    facts: [
      { value: '7', label: 'Singles' },
      { value: '2', label: 'Features' },
      { value: '2025', label: 'First release' },
    ],
  },
  modeling: {
    photo: '/creative/model/08883.webp',
    title: 'About',
    body: [
      'Photographed by Sami (@samiclicks). One studio shoot in Beppu, built as a book: low-key noir, a clean profile set, an all-white look, close details and a commercial frame.',
      'It is the same eye I use on the AI work, pointed at a real face. If you want to book it, the next album is the comp card.',
    ],
    facts: [
      { value: '29', label: 'Frames' },
      { value: '5', label: 'Looks' },
      { value: '2026', label: 'Shoot' },
    ],
  },
  'book-me': {
    photo: '/creative/model/08891.webp',
    title: 'About',
    body: [
      'Born in Monrovia, Liberia, with Liberian and Indian roots. I left home at 17 on a scholarship, studied the IB in Israel and now live in Beppu, Japan.',
      'I am looking for modeling work, in Japan or wherever a shoot needs a face with curls and some attitude. I am still a builder first, so the tech side of this portfolio is coming next.',
    ],
    facts: [
      { value: 'Beppu', label: 'Based in Japan' },
      { value: 'LR · IN', label: 'Roots' },
      { value: 'Open', label: 'To bookings' },
    ],
  },
  streams: {
    photo: '/creative/model/08865.webp',
    title: 'About',
    body: [
      'I started streaming in 2026, from my room in Beppu. It is the loosest thing I make: no script, no edit, just me, the chat and whatever I am building that night.',
      'I am Liberian, living in Japan after Ghana and Israel, studying finance at APU and running a one-person AI studio on the side. The streams are where the studio, the music and the story meet, and the best moments get cut into the shorts you see in the showroom.',
    ],
    facts: [
      { value: '2026', label: 'Started' },
      { value: 'Live', label: 'No edit' },
      { value: 'Beppu', label: 'Base' },
    ],
  },
  'content-tiktok': {
    photo: '/creative/model/08861.webp',
    title: 'About',
    body: [
      'Retro, a Liberian in Japan. Music, visuals, doing way too much, curly head.',
      'Talking-head shorts about the studio, the music and life in Beppu, written and cut by me. Desire is out now.',
    ],
    facts: [
      { value: '198K', label: 'Views, last 365 days' },
      { value: '40K', label: 'Views, top video' },
      { value: '18.4K', label: 'Likes' },
      { value: '914', label: 'Followers' },
    ],
  },
}

export function caseFor(work: Work): CaseStudy {
  return { ...buildCase(work), bio: BIOS[work.id] }
}

function buildCase(work: Work): CaseStudy {
  if (work.id === 'ajiwow') return AJIWOW_CASE
  if (work.id === 'music') {
    return {
      id: 'music',
      kicker: 'Artist',
      title: 'RETRO',
      intro:
        'Seven singles written, produced and released as RETRO, with features from Roblyne Ketter and TLE Fries. Every cover below is the real release art, straight from the stores.',
      client: 'RETRO · artist',
      role: work.role,
      when: work.year,
      links: work.links,
      stats: [],
      steps: [],
      accent: '#8a7dff',
      theme: 'music',
      cover: '/creative/music/best-friend.webp',
    }
  }

  if (work.id === 'book-me') {
    return {
      id: 'book-me',
      kicker: 'Casting',
      title: 'Looking for Model Work',
      intro:
        'Open for modeling work: editorial, commercial and product. Born in Monrovia, raised between Liberia, Israel and Japan, based in Beppu. Curls, a camera-ready stare and a habit of building things between shoots.',
      client: work.client,
      role: work.role,
      when: work.year,
      links: [...work.links, ...PHOTO_LINKS, { label: 'Tech portfolio, next', href: '/tech' }],
      credit: 'Sami · @samiclicks',
      stats: [],
      steps: [],
      accent: '#c1272d',
      theme: 'booking',
      cover: '/creative/covers/book-me.webp',
      scopes: SCOPES['book-me'],
    }
  }

  if (work.id === 'modeling') {
    return {
      id: 'modeling',
      kicker: 'Model',
      title: 'Modeling',
      intro:
        'The modeling book. A studio shoot in Beppu: low-key black, a clean white profile set, an all-white look, close details and one commercial frame. Twenty-nine frames, picked to show range.',
      client: work.client,
      role: work.role,
      when: work.year,
      links: PHOTO_LINKS,
      credit: 'Sami · @samiclicks',
      stats: [
        { value: '29', label: 'Frames' },
        { value: '5', label: 'Looks' },
        { value: '2026', label: 'Shoot' },
      ],
      steps: [],
      accent: '#e8dccb',
      theme: 'modeling',
      cover: '/creative/covers/modeling.webp',
      scopes: SCOPES.modeling,
    }
  }

  const key = RECORD[work.id] ?? work.id
  const rec = retroReleases.find((r) => r.id === key) ?? albums.find((a) => a.id === key)
  const media = MEDIA[key]
  const own = [work.thumb, ...(work.gallery ?? [])].filter((v, i, a) => a.indexOf(v) === i)

  if (rec) {
    const d = rec.detail
    return {
      id: work.id,
      kicker: rec.subtitle,
      title: rec.title,
      intro: d.overview,
      client: work.client,
      role: work.role,
      when: work.year,
      links: dedupe([
        ...(d.links ?? []),
        ...work.links,
        ...(REPOS[work.id] ? [{ label: 'Source on GitHub', href: REPOS[work.id] }] : []),
      ]),
      stats: (d.stats ?? []).slice(0, 4),
      steps: d.flow.map((f, i) => ({
        n: String(i + 1).padStart(2, '0'),
        title: f.headline,
        body: (f.points ?? []).map((p) => p.replace(/[.\s]+$/, '')).join('. ') + '.',
      })),
      rail: media?.rail ? stillsOf(media.rail) : own.map((src) => ({ src, label: rec.title })),
      railTitle: media?.railTitle ?? 'The work',
      films: media?.films ? filmsOf(media.films) : undefined,
      accent: rec.accent && rec.accent.length === 7 ? rec.accent : '#cc4210',
      theme: work.id,
      cover: `/creative/covers/${work.id}.webp`,
      scopes: SCOPES[work.id],
    }
  }

  return {
    id: work.id,
    kicker: work.role,
    title: work.title,
    intro: work.description,
    client: work.client,
    role: work.role,
    when: work.year,
    links: work.links,
    stats: [],
    steps: [],
    rail: own.map((src) => ({ src, label: work.title })),
    railTitle: 'The work',
    films: media?.films ? filmsOf(media.films) : undefined,
    accent: '#cc4210',
    theme: work.id,
    cover: `/creative/covers/${work.id}.webp`,
    scopes: SCOPES[work.id],
  }
}
