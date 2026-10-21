/**
 * Section 02 · "My Story". All copy is Sameer's own: store it, never rewrite
 * the meaning, never add facts, dates, names or quotes. Typos only.
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
    label: 'Two Worlds',
    doodle: 'two-circles',
    place: 'Monrovia, Liberia',
    when: 'childhood',
    text: "Born in Monrovia, Liberia. Liberian roots, Indian roots. I grew up celebrating Liberia's Independence Day and keeping the holy month of Sawan. For a long time I thought I had to pick one. I don't.",
  },
  {
    id: 'stutter',
    era: 'monrovia',
    label: 'The Stutter',
    doodle: 'speech-bubble',
    place: 'Monrovia',
    when: 'kid',
    text: 'As a kid, saying "Hello, my name is Sameer" felt impossible. My thoughts moved faster than my mouth. My dad was providing for three kids and still found time. We ran together at dawn, then he\'d hand me books. I read *Tales of the Navajo Code Talkers* out loud, first with him, then alone, until one day I got through a whole page without tripping once.',
  },
  {
    id: 'thirteen',
    era: 'monrovia',
    label: 'Thirteen',
    doodle: 'pot-flames',
    place: 'Monrovia',
    when: '13',
    text: "When my parents separated, I became the one who kept the mornings running. At thirteen I woke up early to light the coal fire, make breakfast and pack my little brother's lunch before school. That's where I learned what responsibility actually means.",
  },
  {
    id: 'the-no',
    era: 'monrovia',
    label: 'The No',
    doodle: 'envelope-x',
    place: 'Monrovia',
    when: '15–16',
    text: "I was sure I'd win a UWC scholarship to Tanzania. I didn't. For a while I told myself studying abroad was overrated. Then I finished *Things Fall Apart*, watched Okonkwo refuse to change, and decided I wouldn't make the same mistake.",
  },

  // ── Era 2: LEAVING ─────────────────────────────────────────────────────
  {
    id: 'the-yes',
    era: 'leaving',
    label: 'The Yes',
    doodle: 'envelope-check',
    place: 'Monrovia',
    when: '16',
    text: 'I reapplied the next year, more open and more determined. This time I got it: a scholarship to study the IB in Israel.',
  },
  {
    id: 'airport',
    era: 'leaving',
    label: 'The Airport',
    doodle: 'suitcase-tear',
    place: 'Monrovia → Israel',
    when: '2023, 17',
    text: "My dad drove me to the airport. I cried leaving home. I haven't been back since 2023.",
  },

  // ── Era 3: ISRAEL ──────────────────────────────────────────────────────
  {
    id: 'host-dad',
    era: 'israel',
    label: 'Host Dad',
    doodle: 'stick-pair',
    place: 'Israel',
    when: '17',
    text: 'Then I met my host dad. He treated me like his son. Thousands of kilometres from home, I had a family again.',
  },
  {
    id: 'october-7',
    era: 'israel',
    label: 'October 7th',
    doodle: 'candle',
    place: 'Israel',
    when: '2023',
    text: 'Experiencing October 7th was hard. I was seventeen, far from home, and I learned what it means to keep going when the world around you stops making sense.',
  },
  {
    id: 'hapoel',
    era: 'israel',
    label: 'Hapoel Menashe',
    doodle: 'basketball',
    place: 'Menashe, Israel',
    when: '17–18',
    text: 'I made a local basketball team an hour from campus. They spoke almost no English, and I spoke no Hebrew. They taught me *masor* (pass), *yemena* (right), *takli* (shoot). One night after practice, Juno said: "You… family now. Us… together."',
  },
  {
    id: 'the-stage',
    era: 'israel',
    label: 'Oberon',
    doodle: 'masks-crown',
    place: 'Israel',
    when: '18',
    text: "I found theatre. In *A Midsummer Night's Dream* I played the villain, Oberon. I love acting. It's the reason I make content on Instagram today.",
  },
  {
    id: 'heartbreak',
    era: 'israel',
    label: 'Heartbreak',
    doodle: 'cracked-heart',
    place: 'Israel',
    when: '18',
    text: "Then I got my heart broken. That's when the music started. I'm not alone in making songs out of pain, but these ones were mine.",
  },

  // ── Era 4: JAPAN ───────────────────────────────────────────────────────
  {
    id: 'beppu',
    era: 'japan',
    label: 'Beppu',
    doodle: 'trash-bag',
    place: 'Beppu, Japan',
    when: '19',
    text: "A year and a half after Israel: Japan. Living alone taught me to be accountable for everything. I didn't even know how to throw out the trash. My RA sent me back with my garbage, and one of my bags got a warning sticker at the collection point.",
  },
  {
    id: 'closed-doors',
    era: 'japan',
    label: 'Closed Doors',
    doodle: 'door-window',
    place: 'Beppu',
    when: '19–20',
    text: "My lowest point: tech companies wouldn't hire me because I didn't speak enough Japanese. Door after door. Then one opened, and I landed a good-paying role anyway.",
  },

  // ── Era 5: NOW ─────────────────────────────────────────────────────────
  {
    id: 'weekly-calls',
    era: 'now',
    label: 'Weekly Calls',
    doodle: 'phone-signal',
    place: 'Liberia · Germany · Japan',
    when: 'now',
    text: 'My dad is back in Liberia, and we talk every week. My mom is in Germany. Three countries, one family.',
  },
  {
    id: 'retro',
    era: 'now',
    label: 'RETRO',
    doodle: 'vinyl',
    place: 'Beppu',
    when: '20',
    text: "I release music as RETRO. I make it about life: the chapters, the things I've lived through. This map is basically my tracklist.",
  },
]

/** Handwritten at the bottom of the map: the last thing to draw. */
export const OUTRO = "This guy doesn't give up. The doors closed, and he still made a way."

export const eraIndex = (id: EraId) => ERAS.findIndex((e) => e.id === id)
export const chaptersOfEra = (id: EraId) => CHAPTERS.filter((c) => c.era === id)
