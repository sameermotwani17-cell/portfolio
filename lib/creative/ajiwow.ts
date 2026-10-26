/**
 * Ajiwow (味わう株式会社): brand system, website and launch content for a
 * Tokyo food-tech startup. Everything here is public-safe: no fees, no
 * contacts, no contract detail. Assets live in /public/creative/ajiwow.
 */
const A = '/creative/ajiwow'

export const AJIWOW = {
  name: 'Ajiwow',
  jp: '味わう株式会社',
  kicker: 'Brand system · Bilingual website on Azure · Poster · Video',
  title: 'Great cooking, replayed.',
  titleJp: '料理の感動は、再現できる。',
  intro:
    'Ajiwow, a Tokyo food-tech startup in the Techstars Tokyo 2026 cohort, born inside Sony, records a chef’s cooking to the second, the degree and the gram, and replays it on an induction cooktop. It had a working product and no identity. In about three weeks, working directly with the CEO, I built the brand system, a bilingual website draft deployed on Azure, a tourist poster, the direction of the Demo Day video and a run of short-form videos.',
  role: 'Brand identity · Web design, build and Azure deploy · Poster · Video direction · Short-form',
  when: 'Sep 30 to Oct 2026',
  links: [
    { label: 'Visit ajiwow.co.jp', href: 'https://ajiwow.co.jp/en/' },
    { label: '日本語サイト', href: 'https://ajiwow.co.jp/' },
    { label: 'ROKU SHOKU 録食', href: 'https://ajiwow.co.jp/en/technology/' },
  ],
  stats: [
    { value: '4 days', label: 'From first quote to an approved brand system' },
    { value: '18', label: 'Page brand guidelines, in 4K' },
    { value: '10', label: 'Ready to use templates' },
    { value: '31', label: 'Point automated check on every print export' },
  ],
  quote: { text: 'Mind blowing!! You really are a pro!!!', who: 'Tomoko Nomoto, CEO, Ajiwow, on the brand system' },
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
      body: 'A startup with a finished product, a subscription for restaurant chains and hotels, and no logo, no colours and a one page site. Four deliverables at the start: a bilingual website, a product demo video, a tourist poster and a tourist short. About 14 hours a week, one approver, the CEO.',
    },
    {
      n: '02',
      title: 'Four directions, one idea',
      body: 'Four directions in one day: Corporate Navy, Heat as Data, Ink and Paper, and The Record. The CEO narrowed it to two and approved The Record with the Ember red from Heat as Data. Music was recorded, film was recorded, now cooking: the groove of a record doubles as the coil of an induction cooktop.',
    },
    {
      n: '03',
      title: 'The mark, redrawn',
      body: 'The first symbol read the wrong way, and Ajiwow is firmly anti-war, so I redrew it as closed, bold grooves with no loose ends. Approved the same day. The colour version is the same rings through a heat scale, a thermal picture of a coil.',
    },
    {
      n: '04',
      title: 'Brand system v1.0',
      body: 'An 18 page guide, vector logos in every colourway, colour and type tokens as CSS and JSON, free fonts instead of a yearly licence, graphics and ten templates. 166 files in all, plus a Claude design system and a skill so the team can make on brand work without me. Approved on October 3.',
    },
    {
      n: '05',
      title: 'The website draft',
      body: 'A bilingual Japanese and English site built in Astro on the new tokens, deployed on Azure Static Web Apps in the client’s own account with a push-to-deploy pipeline and preview links. The finish was handed to their in-house engineers on October 14.',
    },
    {
      n: '06',
      title: 'Poster, video and shorts',
      body: 'A tourist poster in a second, Ink and Paper language, designed through five rounds of feedback in about 48 hours. The Demo Day product video, directed from a storyboard and cut by an editor. And short-form videos for TikTok and Reels, with the cooktop’s own voice as a signature sound.',
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
