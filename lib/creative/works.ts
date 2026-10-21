import type { CategoryId } from './categories'

/**
 * The creative portfolio. Built from the main-branch audit (approved: keep all).
 * Anything still missing is listed in `placeholder` so it is easy to find and
 * fill: preview/video files, years, release titles and cover art.
 */
export type WorkLink = { label: string; href: string }

export type Work = {
  id: string
  title: string
  category: CategoryId
  client: string
  /** 'TBC' until confirmed */
  year: string
  role: string
  tools: string[]
  description: string
  /** card image, ≤ 120 KB WebP */
  thumb: string
  /** muted looping preview for the front cards (webm/mp4) */
  preview?: string
  /** full video for the detail sheet */
  video?: string
  /** extra stills for the detail sheet */
  gallery?: string[]
  links: WorkLink[]
  /** what is still missing (never rendered) */
  placeholder?: string[]
}

const W = '/creative/works'
const SPOTIFY = 'https://open.spotify.com/artist/2vNpaYQTU7PNUh3BjOx07b'
const APPLE = 'https://music.apple.com/jp/artist/retro/1803961641?l=en-US'
const IG = 'https://www.instagram.com/retro.studios_'
const TIKTOK = 'https://www.tiktok.com/@retro.studios'

export const SOCIAL = { instagram: IG, tiktok: TIKTOK } as const

const TRACKS = [
  ['best-friend', 'Best Friend'],
  ['desire', 'Desire'],
  ['easy-come', 'Easy Come Easy Go'],
  ['suavemente', 'Suavemente'],
] as const

export const WORKS: Work[] = [
  {
    id: 'dk2r',
    title: 'DK2R',
    category: 'brand',
    client: 'DK2R Football Wear · Hassan Kai Turay',
    year: '2026',
    role: 'Creative Director · Prompt Engineer · Technical Producer',
    tools: ['GPT Image 2', 'Higgsfield Cinema Studio', 'Kling 3.0', 'Next.js', 'Supabase'],
    description:
      'Twelve country editions for the 2026 World Cup, 300 numbered pieces each, run solo. Every edition its own language, shot across three silhouettes, 150+ hero images on one locked colour science. I built the store it sold from too.',
    thumb: `${W}/dk2r.webp`,
    gallery: [1, 2, 3, 4, 5, 6].map((i) => `${W}/dk2r-${i}.webp`),
    links: [
      { label: 'Visit the store', href: 'https://dkai2ray.company/' },
      { label: '@dk2rwear', href: 'https://www.instagram.com/dk2rwear' },
    ],
    placeholder: ['preview', 'video'],
  },
  {
    id: 'dk2r-mexico',
    title: 'DK2R · México',
    category: 'motion',
    client: 'DK2R Football Wear',
    year: '2026',
    role: 'Art direction · AI image production',
    tools: ['GPT Image 2', 'Higgsfield Cinema Studio'],
    description:
      'The México edition: a mercado still life and a matchday editorial, part of the 60-image campaign per market.',
    thumb: `${W}/dk2r-1.webp`,
    gallery: [`${W}/dk2r-1.webp`, `${W}/dk2r-6.webp`],
    links: [{ label: 'Visit the store', href: 'https://dkai2ray.company/' }],
    placeholder: ['preview'],
  },
  {
    id: 'dk2r-morocco',
    title: 'DK2R · Morocco',
    category: 'motion',
    client: 'DK2R Football Wear',
    year: '2026',
    role: 'Art direction · AI image production',
    tools: ['GPT Image 2', 'Higgsfield Cinema Studio'],
    description: 'The red Morocco edition at sundown, Zellige tiles worked into the jersey.',
    thumb: `${W}/dk2r-4.webp`,
    gallery: [`${W}/dk2r-4.webp`, `${W}/dk2r-5.webp`],
    links: [{ label: 'Visit the store', href: 'https://dkai2ray.company/' }],
    placeholder: ['preview'],
  },
  {
    id: 'retro-studios',
    title: 'RETRO Studios',
    category: 'motion',
    client: 'Self · StarLabs',
    year: '2026',
    role: 'Founder & Creative Director',
    tools: ['GPT Image 2', 'Higgsfield Cinema Studio', 'Kling 3.0', 'Seedance 2.0', 'Suno', 'CapCut'],
    description:
      'A one-person AI creative studio, founded April 2026. Direction, prompts and production on an AI-native stack. First paid brief: a 12-country World Cup campaign, delivered end to end.',
    thumb: `${W}/retro-studios.webp`,
    links: [{ label: '@retro.studios_', href: IG }],
    placeholder: ['preview', 'video'],
  },
  {
    id: 'too-easy',
    title: 'TOO EASY',
    category: 'brand',
    client: 'Concept brand',
    year: 'TBC',
    role: 'Brand · art direction · site',
    tools: [],
    description:
      'A minimal streetwear label built as an exercise. No manifesto, no lifestyle shoot. Five pieces, shot and priced like a real drop, and a grid that has to carry them on its own.',
    thumb: `${W}/too-easy.webp`,
    links: [
      { label: 'Visit the site', href: 'https://too-easy-seven.vercel.app/' },
      { label: 'Brand assets', href: 'https://drive.google.com/drive/folders/1u-UNW_YvpI0KB_-1Q5qtutXyOYDUkjdf' },
    ],
    placeholder: ['year', 'tools', 'preview'],
  },
  {
    id: 'plastivore',
    title: 'PLASTIVORE',
    category: 'brand',
    client: 'Concept brand · AD WARS, APU',
    year: 'TBC',
    role: 'Brand · campaign · site',
    tools: [],
    description:
      'A concept brand for a marketing simulation, not a real product: a shoe that eats microplastics. BioSole, built on PETase, a real enzyme found in 2016. Three colorways, and a site that reads like an investor deck.',
    thumb: `${W}/plastivore.webp`,
    links: [{ label: 'Visit the site', href: 'https://plastivore-plum.vercel.app/' }],
    placeholder: ['year', 'tools', 'preview'],
  },
  {
    id: 'afro-week',
    title: 'AFRO WEEK 2026',
    category: 'builds',
    client: 'Afro Week · APU',
    year: '2026',
    role: 'Event site · identity · booking flow',
    tools: [],
    description:
      'The Lines They Drew at Millennium Hall: a ticketing site, not a poster. 732 seats in live availability, a seat picker and a QR ticket that lands straight away. Red, gold and green run through every band as structure.',
    thumb: `${W}/afro-week.webp`,
    links: [
      { label: 'Reserve a seat', href: 'https://millennium-hall.vercel.app/' },
      { label: '@afroweekapu', href: 'https://www.instagram.com/afroweekapu' },
    ],
    placeholder: ['tools', 'preview'],
  },
  {
    id: 'danflix',
    title: 'DANFLIX',
    category: 'builds',
    client: 'Personal · a birthday gift',
    year: 'TBC',
    role: 'Edit · grade · ident · build',
    tools: [],
    description:
      'A birthday gift dressed up as a streaming service. A wordmark ident with its own sting, ten titles, a deadpan park-ranger documentary and a finale called The Bench. All footage of one person, cut and graded.',
    thumb: `${W}/danflix.webp`,
    links: [{ label: 'Open Danflix', href: 'https://danflix-murex.vercel.app/' }],
    placeholder: ['year', 'tools', 'preview', 'video'],
  },
  {
    id: 'first-light',
    title: 'First Light',
    category: 'builds',
    client: 'Personal · a Secret Santa gift',
    year: 'TBC',
    role: 'Concept · build',
    tools: [],
    description:
      'A photo-culling tool built as a gift. Point it at a shoot, say what you want in plain English, and it hands back a ranked shortlist with a reason on every pick.',
    thumb: `${W}/first-light.webp`,
    links: [{ label: 'Open First Light', href: 'https://first-light-alpha.vercel.app/' }],
    placeholder: ['year', 'tools'],
  },
  {
    id: 'retro-projects',
    title: 'RETRO PROJECTS',
    category: 'content',
    client: 'Retro Studios',
    year: '2026',
    role: 'The studio folder',
    tools: [],
    description:
      'The studio working folder, opened up. Not a case study and not a cut reel: the project Drive, shared read only.',
    thumb: `${W}/retro-raven.webp`,
    links: [
      { label: 'Open the Drive folder', href: 'https://drive.google.com/drive/folders/1MjXPVTnsR7WjbrrVjk0Ro7GnN007HCEV' },
    ],
  },
  {
    id: 'content-instagram',
    title: 'Instagram',
    category: 'content',
    client: 'Self',
    year: 'TBC',
    role: 'Content',
    tools: [],
    description: 'Short-form pieces from @retro.studios_.',
    thumb: `${W}/retro-raven.webp`,
    links: [{ label: '@retro.studios_', href: IG }],
    placeholder: ['the pieces themselves', 'thumb', 'preview', 'year'],
  },
  {
    id: 'content-tiktok',
    title: 'TikTok',
    category: 'content',
    client: 'Self',
    year: 'TBC',
    role: 'Content',
    tools: [],
    description: 'Short-form pieces from @retro.studios.',
    thumb: `${W}/retro-raven.webp`,
    links: [{ label: '@retro.studios', href: TIKTOK }],
    placeholder: ['the pieces themselves', 'thumb', 'preview', 'year'],
  },
  {
    id: 'streams',
    title: 'Streams',
    category: 'content',
    client: 'Self',
    year: 'TBC',
    role: 'Streaming',
    tools: [],
    description: 'Live streams.',
    thumb: `${W}/retro-studios.webp`,
    links: [],
    placeholder: ['platform', 'link', 'thumb', 'description', 'year'],
  },
  ...TRACKS.map(
    ([id, title]): Work => ({
      id: `music-${id}`,
      title,
      category: 'music',
      client: 'RETRO',
      year: 'TBC',
      role: 'Writing · production',
      tools: [],
      description: 'Original production, released as RETRO.',
      thumb: `${W}/music.webp`,
      links: [
        { label: 'Spotify', href: SPOTIFY },
        { label: 'Apple Music', href: APPLE },
      ],
      placeholder: ['cover art', 'year', 'per-track links', 'confirm title'],
    }),
  ),
]

/** Every image the loader waits for. */
export const PRELOAD = Array.from(new Set(WORKS.map((w) => w.thumb)))
