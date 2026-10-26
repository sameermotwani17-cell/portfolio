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
const TIKTOK = 'https://www.tiktok.com/@we_love_you_retro'

export const SOCIAL = { instagram: IG, tiktok: TIKTOK } as const


export const WORKS: Work[] = [
  {
    id: 'dk2r',
    title: 'DK2R',
    category: 'brand',
    client: 'DK2R Football Wear · Hassan Kai Turay',
    year: '2026',
    role: 'Creative Director · Prompt Engineer · Technical Producer',
    tools: ['GPT Image 2', 'Higgsfield Cinema Studio', 'Kling 3.0', 'Next.js', 'Supabase', 'PayPal'],
    description:
      'The first paid job the studio took. Twelve country editions for the 2026 World Cup, 300 numbered pieces each, no restocks, run solo. Morocco got Zellige tiles, Japan got kintsugi through the sakura, Brazil got the rhinestone crest. Three silhouettes per edition, 36 SKUs, 150+ hero images on one locked colour science, with a dedicated prompt layer there only to kill the tells of AI imagery. I built the store it sold from too, Next.js and Supabase with PayPal checkout. It closed out with the tournament.',
    thumb: '/creative/works/sleeve-dk2r.webp',
    gallery: [1, 2, 3, 4, 5, 6].map((i) => `${W}/dk2r-${i}.webp`),
    links: [
      { label: 'Visit the store', href: 'https://dkai2ray.company/' },
      { label: '@dk2rwear', href: 'https://www.instagram.com/dk2rwear' },
    ],
    placeholder: ['preview', 'video'],
  },
  {
    id: 'retro-studios',
    title: 'RETRO Studios',
    category: 'motion',
    client: 'Self · StarLabs',
    year: '2026',
    role: 'Founder & Creative Director',
    tools: ['GPT Image 2', 'Higgsfield Cinema Studio', 'Kling 3.0', 'Seedance 2.0', 'Suno', 'CapCut', 'Next.js', 'Supabase', 'Vercel'],
    description:
      'A one-person AI creative studio under StarLabs, founded April 2026, built on the thesis that one operator on an AI-native stack can outproduce a crew. Statics, reels and commercial ads with no crew. First paid brief: the 12-country DK2R World Cup campaign, 150+ hero images and a 55-asset QA report with zero redos. Open for the next brief. The working folder is open too: five episodes and a run of shorts made in public, with the project Drive shared read only.',
    thumb: '/creative/works/sleeve-retro-studios.webp',
    links: [
      { label: '@retro.studios_', href: IG },
      { label: 'Open the Drive folder', href: 'https://drive.google.com/drive/folders/1MjXPVTnsR7WjbrrVjk0Ro7GnN007HCEV' },
    ],
    placeholder: ['preview', 'video'],
  },
  {
    id: 'ajiwow',
    title: 'Ajiwow',
    category: 'brand',
    client: 'Ajiwow Inc. · Tokyo',
    year: '2026',
    role: 'Brand system · Website · Poster · Short-form video',
    tools: ['Brand identity', 'Next.js', 'Design tokens', 'Short-form edit'],
    description:
      'The full identity for a Tokyo food-tech startup: logo, an 18 page brand system, ten templates, a bilingual website live on their domain, a tourist poster and launch films.',
    thumb: '/creative/works/sleeve-ajiwow.webp',
    links: [
      { label: 'Visit ajiwow.co.jp', href: 'https://ajiwow.co.jp/en/' },
    ],
  },
  {
    id: 'too-easy',
    title: 'TOO EASY',
    category: 'brand',
    client: 'Concept brand · a design exercise in restraint',
    year: '2026',
    role: 'Brand · art direction · site',
    tools: [],
    description:
      'A minimal streetwear label built as an exercise, to see what holds once the story is taken away. No manifesto, no lifestyle shoot. Five pieces from $89 to $249, shot on white and priced like a real drop, two colours in the whole stylesheet (#0D0D0D on #FFFFFF), and a grid that has to carry them on its own.',
    thumb: '/creative/works/sleeve-too-easy.webp',
    links: [
      { label: 'Visit the site', href: 'https://too-easy-seven.vercel.app/' },
      { label: 'Brand assets', href: 'https://drive.google.com/drive/folders/1u-UNW_YvpI0KB_-1Q5qtutXyOYDUkjdf' },
    ],
    placeholder: ['tools', 'preview'],
  },
  {
    id: 'plastivore',
    title: 'PLASTIVORE',
    category: 'brand',
    client: 'Concept brand · AD WARS, APU',
    year: '2026',
    role: 'Brand · campaign · site',
    tools: [],
    description:
      'A concept brand for AD WARS, the marketing simulation at APU, not a real product: a shoe that eats microplastics instead of another recycling campaign. BioSole is a four-layer enzyme membrane built on PETase, a real enzyme found in 2016. Three colorways (Origin, Reef, Deep Sea), two scroll-scrubbed film sequences, and a site that reads like an investor deck. The science is made up, and the footer says so.',
    thumb: '/creative/works/sleeve-plastivore.webp',
    links: [{ label: 'Visit the site', href: 'https://plastivore-plum.vercel.app/' }],
    placeholder: ['tools', 'preview'],
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
      'The Lines They Drew, 26 June 2026 at Millennium Hall: a ticketing site, not a poster. 732 seats in live availability, a seat picker, free entry down to a name and an email, and a QR ticket that lands straight away. Red, gold and green run through every band and divider as structure.',
    thumb: '/creative/works/sleeve-afro-week.webp',
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
    year: '2026',
    role: 'Edit · grade · ident · build',
    tools: [],
    description:
      'A birthday gift for Dan, dressed up as a streaming service. A profile gate, a wordmark ident with its own sting, ten titles, a deadpan park-ranger documentary and a finale called The Bench. All footage of one person, cut and graded on Netflix’s own design tokens, lifted from the live DOM.',
    thumb: '/creative/works/sleeve-danflix.webp',
    links: [{ label: 'Open Danflix', href: 'https://danflix-murex.vercel.app/' }],
    placeholder: ['tools', 'preview', 'video'],
  },
  {
    id: 'first-light',
    title: 'First Light',
    category: 'builds',
    client: 'Personal · a Secret Santa gift',
    year: '2026',
    role: 'Concept · build',
    tools: [],
    description:
      'A photo-culling tool built as a gift. Point it at a shoot (1,847 frames from a wedding in the real example), say what you want in plain English, and it hands back a ranked shortlist with a line of reasoning on every pick. Near-duplicates collapse to the sharpest, and nothing full size leaves your computer.',
    thumb: '/creative/works/sleeve-first-light.webp',
    links: [{ label: 'Open First Light', href: 'https://first-light-alpha.vercel.app/' }],
    placeholder: ['tools'],
  },
  {
    id: 'content-tiktok',
    title: 'TikTok',
    category: 'content',
    client: 'Self · @we_love_you_retro',
    year: '2026',
    role: 'Creator · writer · editor',
    tools: ['CapCut', 'Higgsfield', 'Suno'],
    description:
      'My own TikTok, in public since the start of the studio: who I am, what I am building and what life in Japan looks like from a Liberian in Beppu. Talking-head shorts written, shot and cut by me, with the studio work and the music showing up between the stories.',
    thumb: '/creative/works/sleeve-content-tiktok.webp',
    links: [{ label: '@we_love_you_retro', href: TIKTOK }],
  },
  {
    id: 'streams',
    title: 'Streams',
    category: 'content',
    client: 'Self',
    year: '2026',
    role: 'Host · producer',
    tools: ['CapCut'],
    description:
      'Just started streaming: no script, no edit, me and the chat building the studio live. The best moments get cut into the shorts in the showroom.',
    thumb: '/creative/works/sleeve-streams.webp',
    links: [{ label: 'Follow on TikTok', href: TIKTOK }],
  },
  {
    id: 'music',
    title: 'RETRO',
    category: 'music',
    client: 'RETRO · artist',
    year: '2025 to 2026',
    role: 'Writing · production · artwork',
    tools: ['Suno', 'Logic', 'CapCut'],
    description: 'Seven singles written and produced as RETRO. The full discography is inside.',
    thumb: '/creative/works/sleeve-music.webp',
    links: [
      { label: 'Spotify', href: SPOTIFY },
      { label: 'Apple Music', href: APPLE },
    ],
  },
]

/** Every image the loader waits for. */
export const PRELOAD = Array.from(new Set(WORKS.map((w) => w.thumb)))
