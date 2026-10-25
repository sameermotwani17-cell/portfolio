/** RETRO's releases. Cover art and dates come from Apple Music; links go to the artist pages. */
export type Release = { slug: string; title: string; feat: string; date: string; year: string; seconds: number; apple: string; cover: string }

export const SPOTIFY_ARTIST = 'https://open.spotify.com/artist/2vNpaYQTU7PNUh3BjOx07b'
export const APPLE_ARTIST = 'https://music.apple.com/jp/artist/retro/1803961641?l=en-US'

export const RELEASES: Release[] = [
  { slug: 'deux-mille-vingt-six', title: 'deux-mille-vingt-six', feat: '', date: '2026-01-26', year: '2026', seconds: 141, apple: 'https://music.apple.com/jp/album/deux-mille-vingt-six-single/1872822386', cover: '/creative/music/deux-mille-vingt-six.webp' },
  { slug: 'drop-top', title: 'drop top', feat: '', date: '2025-12-31', year: '2025', seconds: 176, apple: 'https://music.apple.com/jp/album/drop-top-single/1865812457', cover: '/creative/music/drop-top.webp' },
  { slug: 'fairy-tales', title: 'Fairy Tales', feat: 'TLE Fries', date: '2025-08-31', year: '2025', seconds: 204, apple: 'https://music.apple.com/jp/album/fairy-tales-feat-tle-fries-single/1836935974', cover: '/creative/music/fairy-tales.webp' },
  { slug: 'suavemente', title: 'suavemente', feat: '', date: '2025-05-22', year: '2025', seconds: 135, apple: 'https://music.apple.com/jp/album/suavemente-single/1816400084', cover: '/creative/music/suavemente.webp' },
  { slug: 'best-friend', title: 'Best Friend', feat: 'Roblyne Ketter', date: '2025-03-24', year: '2025', seconds: 197, apple: 'https://music.apple.com/jp/album/best-friend-feat-roblyne-ketter-single/1804109811', cover: '/creative/music/best-friend.webp' },
  { slug: 'easy-come-easy-go', title: 'Easy Come Easy Go', feat: 'TLE Fries', date: '2025-03-24', year: '2025', seconds: 129, apple: 'https://music.apple.com/jp/album/easy-come-easy-go-feat-tle-fries-single/1804308539', cover: '/creative/music/easy-come-easy-go.webp' },
  { slug: 'desire', title: 'Desire', feat: '', date: '2025-03-23', year: '2025', seconds: 187, apple: 'https://music.apple.com/jp/album/desire-single/1803985649', cover: '/creative/music/desire.webp' },
]
