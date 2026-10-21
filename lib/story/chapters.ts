/**
 * Section 02 · "My Story". All copy is Sameer's own. Labels are categories (what
 * the chapter is about, readable at a glance by a recruiter); the prose keeps
 * every fact, date, name and quote and only drops filler. Never add facts.
 *
 * Order here is chronological and is the order of the tour, the tabs, the
 * server HTML and the reduced-motion cards.
 */

export type EraId = 'monrovia' | 'leaving' | 'israel' | 'japan' | 'now'

export type DoodleId =
  // eras
  | 'house-star'
  | 'paper-plane'
  | 'sun-hill'
  | 'onsen'
  | 'headphones-note'
  // chapters
  | 'two-circles'
  | 'speech-bubble'
  | 'pot-flames'
  | 'envelope-x'
  | 'envelope-check'
  | 'suitcase-tear'
  | 'stick-pair'
  | 'candle'
  | 'basketball'
  | 'masks-crown'
  | 'cracked-heart'
  | 'trash-bag'
  | 'door-window'
  | 'phone-signal'
  | 'vinyl'

export type Era = { id: EraId; label: string; doodle: DoodleId }

export type Chapter = {
  id: string
  era: EraId
  label: string
  doodle: DoodleId
  place: string
  when: string
  text: string
}

export const CENTRE = 'My Story'

export const ERAS: Era[] = [
  { id: 'monrovia', label: 'Monrovia', doodle: 'house-star' },
  { id: 'leaving', label: 'Leaving', doodle: 'paper-plane' },
  { id: 'israel', label: 'Israel', doodle: 'sun-hill' },
  { id: 'japan', label: 'Japan', doodle: 'onsen' },
  { id: 'now', label: 'Now', doodle: 'headphones-note' },
]

export const CHAPTERS: Chapter[] = [
  // ── Era 1: MONROVIA ────────────────────────────────────────────────────
  {
    id: 'two-worlds',
    era: 'monrovia',
    label: 'Identity',
    doodle: 'two-circles',
    place: 'Monrovia, Liberia',
    when: 'childhood',
    text: "I was born in Monrovia, Liberia, with Liberian and Indian roots. Growing up I celebrated Liberia's Independence Day and kept the holy month of Sawan. For a long time I thought I had to pick one. I don't.",
  },
  {
    id: 'stutter',
    era: 'monrovia',
    label: 'Communication',
    doodle: 'speech-bubble',
    place: 'Monrovia',
    when: 'kid',
    text: 'As a kid I couldn\'t say "Hello, my name is Sameer" without stumbling. My thoughts moved faster than my mouth. My dad was providing for three kids and still found time: we ran together at dawn, then he\'d hand me books. I read *Tales of the Navajo Code Talkers* out loud, first with him, then alone, until one day I got through a whole page without tripping.',
  },
  {
    id: 'thirteen',
    era: 'monrovia',
    label: 'Responsibility',
    doodle: 'pot-flames',
    place: 'Monrovia',
    when: '13',
    text: "When my parents separated, I took over the mornings. At thirteen I got up early to light the coal fire, make breakfast and pack my little brother's lunch before school.",
  },
  {
    id: 'the-no',
    era: 'monrovia',
    label: 'Setback',
    doodle: 'envelope-x',
    place: 'Monrovia',
    when: '15–16',
    text: "I was sure I'd win a UWC scholarship to Tanzania. I didn't. For a while I told myself studying abroad was overrated. Then I finished *Things Fall Apart*, watched Okonkwo refuse to change, and decided I wouldn't make the same mistake.",
  },

  // ── Era 2: LEAVING ─────────────────────────────────────────────────────
  {
    id: 'the-yes',
    era: 'leaving',
    label: 'Scholarship',
    doodle: 'envelope-check',
    place: 'Monrovia',
    when: '16',
    text: 'I reapplied the next year. This time I got it: a scholarship to study the IB in Israel.',
  },
  {
    id: 'airport',
    era: 'leaving',
    label: 'Relocation',
    doodle: 'suitcase-tear',
    place: 'Monrovia → Israel',
    when: '2023, 17',
    text: "My dad drove me to the airport. I cried leaving home. I haven't been back since 2023.",
  },

  // ── Era 3: ISRAEL ──────────────────────────────────────────────────────
  {
    id: 'host-dad',
    era: 'israel',
    label: 'Belonging',
    doodle: 'stick-pair',
    place: 'Israel',
    when: '17',
    text: 'Then I met my host dad. He treated me like his son. Thousands of kilometres from home, I had a family again.',
  },
  {
    id: 'october-7',
    era: 'israel',
    label: 'Resilience',
    doodle: 'candle',
    place: 'Israel',
    when: '2023',
    text: 'I was in Israel on October 7th. I was seventeen and far from home. It was hard, and I kept going.',
  },
  {
    id: 'hapoel',
    era: 'israel',
    label: 'Teamwork',
    doodle: 'basketball',
    place: 'Menashe, Israel',
    when: '17–18',
    text: 'I made a local basketball team an hour from campus. They spoke almost no English, and I spoke no Hebrew. They taught me *masor* (pass), *yemena* (right), *takli* (shoot). One night after practice, Juno said: "You… family now. Us… together."',
  },
  {
    id: 'the-stage',
    era: 'israel',
    label: 'Theatre',
    doodle: 'masks-crown',
    place: 'Israel',
    when: '18',
    text: "I found theatre. In *A Midsummer Night's Dream* I played Oberon, the villain. I love acting, and it's the reason I make content on Instagram today.",
  },
  {
    id: 'heartbreak',
    era: 'israel',
    label: 'Songwriting',
    doodle: 'cracked-heart',
    place: 'Israel',
    when: '18',
    text: "Then I got my heart broken, and I started making music. Plenty of people turn pain into songs. These were mine.",
  },

  // ── Era 4: JAPAN ───────────────────────────────────────────────────────
  {
    id: 'beppu',
    era: 'japan',
    label: 'Independence',
    doodle: 'trash-bag',
    place: 'Beppu, Japan',
    when: '19',
    text: "A year and a half after Israel: Japan. Living alone, I had to be accountable for everything. I didn't even know how to throw out the trash. My RA sent me back with my garbage, and one of my bags got a warning sticker at the collection point.",
  },
  {
    id: 'closed-doors',
    era: 'japan',
    label: 'Career',
    doodle: 'door-window',
    place: 'Beppu',
    when: '19–20',
    text: "My lowest point: tech companies wouldn't hire me because I didn't speak enough Japanese. Then one door opened, and I landed a good-paying role anyway.",
  },

  // ── Era 5: NOW ─────────────────────────────────────────────────────────
  {
    id: 'weekly-calls',
    era: 'now',
    label: 'Family',
    doodle: 'phone-signal',
    place: 'Liberia · Germany · Japan',
    when: 'now',
    text: "My dad is back in Liberia and we talk every week. My mom is in Germany, and I'm in Japan.",
  },
  {
    id: 'retro',
    era: 'now',
    label: 'Music',
    doodle: 'vinyl',
    place: 'Beppu',
    when: '20',
    text: "I release music as RETRO. I make it about my life, the chapters and the things I've lived through. This map is basically my tracklist.",
  },
]

/** Handwritten at the bottom of the map: the last thing to draw. */
export const OUTRO = "The doors closed. I made a way anyway."

export const eraIndex = (id: EraId) => ERAS.findIndex((e) => e.id === id)
export const chaptersOfEra = (id: EraId) => CHAPTERS.filter((c) => c.era === id)
