/**
 * RETRO's link hub (xsofficialbrand.com/links).
 * One list drives the page and the /go/[slug] redirect, so a destination is changed in one place.
 * To add Retro Clips on TikTok, add an entry to the 'clips' group and redeploy.
 */
export type LinkGroup = 'music' | 'follow' | 'clips' | 'work'

export type LinkItem = {
  slug: string
  group: LinkGroup
  label: string
  /** shown under the label */
  note?: string
  href: string
  /** external links go through /go/[slug] so clicks can be counted per source */
  external: boolean
}

export const SONG = {
  slug: 'song',
  title: 'RETRO did it again',
  href: 'https://open.spotify.com/album/301p9vX5ZwvoMpwhO1zPsG',
} as const

export const LINKS: LinkItem[] = [
  { slug: 'song', group: 'music', label: 'Stream on Spotify', note: SONG.title, href: SONG.href, external: true },
  {
    slug: 'apple',
    group: 'music',
    label: 'Apple Music',
    note: 'All releases',
    href: 'https://music.apple.com/jp/artist/retro/1803961641?l=en-US',
    external: true,
  },
  {
    slug: 'tiktok',
    group: 'follow',
    label: 'TikTok',
    note: '@we_love_you_retro',
    href: 'https://www.tiktok.com/@we_love_you_retro',
    external: true,
  },
  {
    slug: 'instagram',
    group: 'follow',
    label: 'Instagram',
    note: '@we_love_you_retro',
    href: 'https://www.instagram.com/we_love_you_retro/',
    external: true,
  },
  {
    slug: 'youtube',
    group: 'follow',
    label: 'YouTube',
    note: '@we_love_you_retro',
    href: 'https://www.youtube.com/channel/UCTBE0uxv9MNv0qhAId38tuw',
    external: true,
  },
  {
    slug: 'threads',
    group: 'follow',
    label: 'Threads',
    note: '@we_love_you_retro',
    href: 'https://www.threads.com/@we_love_you_retro',
    external: true,
  },
  {
    slug: 'clips-tt',
    group: 'clips',
    label: 'Retro Clips on TikTok',
    note: '@we_love_you_retro_2',
    href: 'https://www.tiktok.com/@we_love_you_retro_2',
    external: true,
  },
  {
    slug: 'clips-tt-2',
    group: 'clips',
    label: 'Retro Clips on TikTok, 2',
    note: '@pumarahh',
    href: 'https://www.tiktok.com/@pumarahh',
    external: true,
  },
  {
    slug: 'clips-ig',
    group: 'clips',
    label: 'Retro Clips on Instagram',
    note: '@retroclips_77',
    href: 'https://www.instagram.com/retroclips_77/',
    external: true,
  },
  {
    slug: 'clips-ig-2',
    group: 'clips',
    label: 'Retro Clips on Instagram, 2',
    note: '@we_love_you_retro_2',
    href: 'https://www.instagram.com/we_love_you_retro_2/',
    external: true,
  },
  { slug: 'portfolio', group: 'work', label: 'Portfolio', note: 'Engineer, creative director, builder', href: '/', external: false },
  { slug: 'creative', group: 'work', label: 'Creative work', note: 'Retro Studios, music, model work', href: '/creative', external: false },
]

export const GROUPS: { id: LinkGroup; title: string }[] = [
  { id: 'follow', title: 'Follow' },
  { id: 'clips', title: 'Retro Clips' },
  { id: 'work', title: 'Work' },
]

/** keeps the per-account tag to a short, safe token */
export function cleanSrc(raw: unknown): string {
  if (typeof raw !== 'string') return ''
  return raw.toLowerCase().replace(/[^a-z0-9_-]/g, '').slice(0, 24)
}
