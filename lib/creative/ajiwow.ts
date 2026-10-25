/**
 * Ajiwow (味わう株式会社): brand system, website and launch content for a
 * Tokyo food-tech startup. Everything here is public-safe: no fees, no
 * contacts, no contract detail. Assets live in /public/creative/ajiwow.
 */
const A = '/creative/ajiwow'

export const AJIWOW = {
  name: 'Ajiwow',
  jp: '味わう株式会社',
  kicker: 'Brand system · Website · Launch content',
  title: 'Great cooking, replayed.',
  titleJp: '料理の感動は、再現できる。',
  intro:
    'Ajiwow records a chef cooking and replays it on an induction cooktop as step by step navigation. It is a Tokyo startup with a working product and no identity. I built the brand system, the bilingual website and the first wave of launch content.',
  role: 'Brand identity · Web design and build · Poster · Short-form video',
  when: 'September to October 2026',
  links: [
    { label: 'Visit ajiwow.co.jp', href: 'https://ajiwow.co.jp/en/' },
    { label: '日本語サイト', href: 'https://ajiwow.co.jp/' },
    { label: 'ROKU SHOKU 録食', href: 'https://ajiwow.co.jp/en/technology/' },
  ],
  stats: [
    { value: '4 → 1', label: 'Brand directions pitched, one chosen' },
    { value: '18', label: 'Page brand guidelines, in 4K' },
    { value: '10', label: 'Ready to use templates' },
    { value: '2', label: 'Languages on the website, JP and EN' },
  ],
  swatches: [
    { name: 'Navy', hex: '#00357A' },
    { name: 'Studio black', hex: '#0A0D14' },
    { name: 'Paper', hex: '#F5F3EE' },
    { name: 'Ember', hex: '#CC4210' },
  ],
  steps: [
    {
      n: '01',
      title: 'The brief',
      body: 'A startup with a finished product, a subscription for restaurant chains and hotels, and no logo, no colours and a one page site that Google did not trust. The ask was professional, trustworthy and high tech. Not gaming, not fashion, not casual.',
    },
    {
      n: '02',
      title: 'Four directions, one idea',
      body: 'I pitched four directions: Corporate Navy, Heat as Data, Ink and Paper, and The Record. The Record won. Record cooking like music, and the coil of an induction cooktop already looks like a record. Ember stayed as the single accent.',
    },
    {
      n: '03',
      title: 'The mark',
      body: 'The first symbol read the wrong way, so I redrew it. The final one colour mark is a set of bold grooves. The colour version is the same rings run through a heat scale, a thermal picture of a coil.',
    },
    {
      n: '04',
      title: 'Brand system v1.0',
      body: 'An 18 page guide, vector logos in every colourway, colour and type tokens as CSS and JSON, free fonts, graphics and ten templates for slides, posters, social, video end cards and business cards. It also ships as a design system and a skill, so the team can make on brand work without me.',
    },
    {
      n: '05',
      title: 'The website',
      body: 'A full bilingual rebuild on the new tokens: an opening record player, a three step record, analyse and playback story, business and individual paths, FAQ and contact. Built for search and for phones, and live on the company domain.',
    },
    {
      n: '06',
      title: 'Poster and film',
      body: 'A tourist cooking experience poster in a second, Ink and Paper language so it reads Japanese at a glance while keeping the Ajiwow lockup. Then the short form films for TikTok and Instagram, in English and Japanese cuts.',
    },
  ],
  brand: [
    { src: `${A}/brand-cover.webp`, label: 'Brand system v1.0' },
    { src: `${A}/brand-statement.webp`, label: 'Music was recorded. Film was recorded. Now, cooking.' },
    { src: `${A}/brand-logo.webp`, label: 'The logo' },
    { src: `${A}/brand-lockups.webp`, label: 'Lockups' },
    { src: `${A}/brand-colourways.webp`, label: 'Colourways' },
    { src: `${A}/brand-roku-shoku.webp`, label: 'With ROKU SHOKU' },
    { src: `${A}/brand-colour.webp`, label: 'Colour' },
    { src: `${A}/brand-heat.webp`, label: 'Heat scale' },
    { src: `${A}/brand-type.webp`, label: 'Typefaces' },
    { src: `${A}/brand-recplay.webp`, label: 'REC / PLAY' },
    { src: `${A}/brand-graphics.webp`, label: 'Graphics' },
    { src: `${A}/brand-templates.webp`, label: 'Templates' },
  ],
  site: [
    { src: `${A}/site-hero.webp`, label: 'The opening: a record player' },
    { src: `${A}/site-replayed.webp`, label: 'Great cooking, replayed.' },
    { src: `${A}/site-process.webp`, label: 'Record, analyse, playback' },
  ],
  poster: { src: `${A}/poster.webp`, label: 'Tourist cooking experience poster · Ink and Paper', ratio: 1400 / 1978 },
  films: [
    { id: 'japan-2050', title: 'A stove from 2050', tag: 'Short · 1080x1920', ratio: 9 / 16 },
    { id: 'story-a', title: 'I can’t cook, like at all', tag: 'Short · story cut A', ratio: 9 / 16 },
    { id: 'story-b', title: 'The stove tells you when to stop', tag: 'Short · story cut B', ratio: 9 / 16 },
    { id: 'cant-cook', title: 'I can’t cook (v4)', tag: 'Short · tourist cut', ratio: 9 / 16 },
    { id: 'two-hours-tokyo', title: 'Two hours in Tokyo', tag: 'Short · tourist cut', ratio: 9 / 16 },
    { id: 'tiktok-jessica', title: 'Day in my life, Tokyo', tag: 'TikTok · English', ratio: 9 / 16 },
    { id: 'tiktok-jp-en', title: 'Day in my life, Tokyo', tag: 'TikTok · Japanese and English', ratio: 9 / 16 },
    { id: 'studio-tiktok', title: 'The stove complimented me', tag: 'TikTok · studio cut', ratio: 9 / 16 },
  ].map((f) => ({ ...f, src: `${A}/${f.id}.mp4`, poster: `${A}/${f.id}.webp` })),
} as const
