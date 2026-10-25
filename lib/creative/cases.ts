import { albums, retroReleases } from '@/lib/projects'
import { AJIWOW } from '@/lib/creative/ajiwow'
import { SHOWROOM } from '@/lib/creative/showroom'
import type { Work } from '@/lib/creative/works'

/**
 * Every card in the arc opens one of these: a client style case study sheet.
 * Ajiwow is hand written. The rest are built from the project records already
 * on the main site (overview, stats, flow) plus the best matching media from
 * the showroom, so nothing is written twice.
 */
export type CaseMedia = { src: string; label: string }
export type CaseFilm = { src: string; poster?: string; title: string; tag: string; ratio: number }

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

/** which record on the main site a card is built from */
const RECORD: Record<string, string> = {
  'dk2r-mexico': 'dk2r',
  'dk2r-morocco': 'dk2r',
}

const AJIWOW_CASE: CaseStudy = {
  id: 'ajiwow',
  kicker: AJIWOW.kicker,
  title: AJIWOW.title,
  titleJp: AJIWOW.titleJp,
  jpName: AJIWOW.jp,
  intro: AJIWOW.intro,
  client: 'Ajiwow Inc. · Tokyo',
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
}

const dedupe = (links: { label: string; href: string }[]) => {
  const seen = new Set<string>()
  return links.filter((l) => (seen.has(l.href) ? false : (seen.add(l.href), true)))
}

export function caseFor(work: Work): CaseStudy {
  if (work.id === 'ajiwow') return AJIWOW_CASE

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
      links: dedupe([...(d.links ?? []), ...work.links]),
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
  }
}
