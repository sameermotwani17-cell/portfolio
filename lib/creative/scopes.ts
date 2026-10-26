import { AJIWOW } from '@/lib/creative/ajiwow'
import { SHOWROOM } from '@/lib/creative/showroom'

/**
 * Scopes of work: for every album, each discipline I delivered, what it
 * involved, and a live example embedded right under it, so a client can judge
 * the quality of each skill on its own. Facts come from the project records on
 * the main site and the work itself. No fees, no contacts.
 */
export type CaseMedia = { src: string; label: string }
export type CaseFilm = { src: string; poster?: string; title: string; tag: string; ratio: number }

export type Embed =
  | { kind: 'images'; items: CaseMedia[] }
  | { kind: 'films'; items: CaseFilm[] }
  | { kind: 'site'; shot: string; label: string; href: string }
  | { kind: 'swatches'; items: { name: string; hex: string }[] }
  | { kind: 'poster'; src: string; label: string; ratio: number }

export type Scope = { title: string; summary: string; bullets: string[]; embeds: Embed[] }

const pick = (ids: string[]) => ids.map((id) => SHOWROOM.find((s) => s.id === id)).filter((s): s is NonNullable<typeof s> => !!s)

const films = (ids: string[]): Embed => ({
  kind: 'films',
  items: pick(ids)
    .filter((s) => s.kind === 'video')
    .map((s) => ({ src: s.src, poster: s.poster, title: s.title, tag: s.tag, ratio: s.ratio })),
})

const stills = (ids: string[]): Embed => ({
  kind: 'images',
  items: pick(ids)
    .filter((s) => s.kind === 'image')
    .map((s) => ({ src: s.src, label: `${s.title} · ${s.tag}` })),
})

const site = (shot: string, label: string, href: string): Embed => ({
  kind: 'site',
  shot: shot.startsWith('/') ? shot : `/creative/sites/${shot}.webp`,
  label,
  href,
})

export const SCOPES: Record<string, Scope[]> = {
  dk2r: [
    {
      title: 'Creative direction and AI imagery',
      summary:
        'Twelve World Cup markets could not be shot properly on the budget, so I built a photoreal image system instead. Every edition got its own visual language, not a recolour: Morocco in Zellige tile, Japan in kintsugi through sakura, Brazil in the rhinestone crest.',
      bullets: [
        '12 country editions, 3 silhouettes each, 36 SKUs',
        '150+ hero images, zero redos at manufacturing',
        '8 reference-locked prompt layers, one of them only to remove AI tells',
        'One locked colour science across all 12 markets',
      ],
      embeds: [
        stills([
          'calor-fan', 'cancha-fence', 'medianoche-taco', 'elmercado-vendor', 'lucha-luchador', 'reinas-portrait',
          'archivo-stadium', 'calor-soda', 'cancha-walking', 'medianoche-elote', 'lucha-ring', 'reinas-rooftop',
        ]),
      ],
    },
    {
      title: 'Short-form video',
      summary:
        'Reels written for the way people actually watch: a POV hook in the first second, UGC-style delivery, and the product in frame the whole time. One reel per market angle, from customs-line POVs to a documentary-style cut.',
      bullets: ['USA and Brazil edition reels', 'UGC, POV and documentary formats', 'Captions, sound and pacing built per platform'],
      embeds: [
        films([
          'usa-ugc-man', 'usa-airport', 'usa-pov', 'usa-cooked', 'usa-reel-4-honorable-c-note-edit',
          'brazil-video-1-documentary', 'brazil-video-2-unexpected-like-a-mixtape', 'brazil-video-6-pov-got-paid-to-make-ads',
        ]),
      ],
    },
    {
      title: 'Identity and storefront',
      summary:
        'The mark, the type and the store itself. A solo-built Next.js and Supabase storefront with PayPal checkout, a launch countdown, and the one rule that sells it: 300 numbered pieces per edition, then nothing.',
      bullets: ['Logo and monogram', 'Launch countdown page and numbered editions', 'Checkout, built and run solo'],
      embeds: [
        { kind: 'images', items: [{ src: '/creative/works/dk2r-logo.webp', label: 'DK2R, football wear' }, { src: '/dk2r/dk2r-mercado-jersey.webp', label: 'The México jersey, in the market' }] },
        site('dk2r', 'dkai2ray.company, the live store', 'https://dkai2ray.company/'),
      ],
    },
    {
      title: 'Factory handoff',
      summary:
        'AI renders are only useful if a factory can make them. I turned the renders into production sheets and ran a QA pass over the whole run before anything was cut.',
      bullets: ['55 assets checked across 14 editions', 'Zero redos', 'Contract and deposit agreed before any engagement'],
      embeds: [],
    },
  ],

  'retro-studios': [
    {
      title: 'Trailers and ads',
      summary:
        'Cinematic spots written, designed and cut as one piece: a Halloween pre-trailer in Japanese and English, a Fight Night intro for two AI heavyweights, and a product ad for a Beppu startup.',
      bullets: ['Concept, script and edit', 'Title design and sound', 'Delivered in 16:9 and vertical'],
      embeds: [films(['watashi-kerie', 'opus-vs-astra', 'horror-teaser', 'gomiyage-ad', '2026-09-fightnight-faceoff-liveposter-4x3'])],
    },
    {
      title: 'Motion and title design',
      summary:
        'The studio’s own identity in motion: slate and leader title cards, a flash reel, a logo sting and kinetic type. Built so every future piece opens on something recognisable.',
      bullets: ['Flash reel and title cards', 'Logo reveal and sting', 'Kinetic type and motion graphics'],
      embeds: [films(['flash-reel', 'retro-flash', 'usa-museum', 'retrostudios-motion-graphics', 'landscape-glitvh-linkedin'])],
    },
    {
      title: 'Music video',
      summary:
        'A full music video for an artist, plus the vertical cut-downs that carry it on social, with captions and beat-matched edits.',
      bullets: ['Official video, 16:9', 'Vertical clips for launch week', 'Caption design'],
      embeds: [films(['here-now-mv', '2026-09-ag-herenow-opusclip-test-01-onlyoneme', '2026-09-ag-herenow-opusclip-test-02-backwithheat'])],
    },
    {
      title: 'Creator and podcast clips',
      summary:
        'Long streams and podcasts turned into short, watchable clips: the hook found, the captions designed, the pacing tightened.',
      bullets: ['Hook selection and cut', 'Animated captions', 'Branded lower thirds'],
      embeds: [films(['fitz-dont-hurt', 'bluecollar-do-it', 'bazza-clerk', 'bluecollar-ignorance', 'bazza-boss', 'fitz-bar-fight'])],
    },
    {
      title: 'Episodes',
      summary: 'A running series made in the open: five episodes so far, each trying a different format.',
      bullets: ['Shot and edited in house', 'A new format tried each episode'],
      embeds: [films(['rp-episode-1', 'rp-episode-2', 'rp-episode-3', 'rp-episode-4', 'rp-episode-5'])],
    },
    {
      title: 'Short-form series',
      summary: 'Talking-head shorts built on the same system: hook first, big captions, one idea.',
      bullets: ['Hook first, captions designed', 'One idea per clip'],
      embeds: [films(['s39-ai-boom', 's13-claude-prompts-itself', 's17-forward-deployed', 's22-ai-with-taste'])],
    },
    {
      title: 'The open folder',
      summary: 'The working Drive for the studio, shared read only. Click through and have a look.',
      bullets: ['Not a case study, not a cut reel', 'Shared read only'],
      embeds: [],
    },
  ],

  ajiwow: [
    {
      title: 'Brand identity',
      summary:
        'Four directions pitched, one chosen. The Record: record cooking like music, because the coil of an induction cooktop already looks like a record. A one colour mark and a thermal colour mark, with Ember as the single accent.',
      bullets: ['Logo, lockups and a heat-scale colour system', '18 page guidelines, 4K', 'Tokens as CSS and JSON, free fonts', 'Shipped as a design system and skill'],
      embeds: [{ kind: 'swatches', items: [...AJIWOW.swatches] }, { kind: 'images', items: [...AJIWOW.brand] }],
    },
    {
      title: 'Website',
      summary:
        'A full bilingual rebuild on the new tokens: an opening record player, a three step record, analyse and playback story, business and individual paths, FAQ and contact. Search ready and live on the company domain.',
      bullets: ['Japanese and English', 'Mobile first', 'Contact page and FAQ'],
      embeds: [
        site('/creative/ajiwow/site-hero.webp', 'ajiwow.co.jp/en, the opening record player', 'https://ajiwow.co.jp/en/'),
        { kind: 'images', items: AJIWOW.site.slice(1).map((x) => ({ ...x })) },
      ],
    },
    {
      title: 'Print poster',
      summary:
        'A tourist cooking experience poster in a second visual language, Ink and Paper, so it reads Japanese at a glance while keeping the Ajiwow lockup and the approved copy word for word.',
      bullets: ['Second system derived from the first', 'B2 and A4 handout versions', 'Print-ready PDF and 300 dpi PNG'],
      embeds: [{ kind: 'poster', ...AJIWOW.poster }],
    },
    {
      title: 'Short-form film',
      summary:
        'Launch films for TikTok and Instagram: a stove from 2050, a first-time cook who “can’t cook, like at all”, in English and Japanese cuts.',
      bullets: ['Script and edit', 'English and Japanese captions', 'Vertical 1080 x 1920'],
      embeds: [{ kind: 'films', items: AJIWOW.films.map((f) => ({ src: f.src, poster: f.poster, title: f.title, tag: f.tag, ratio: f.ratio })) }],
    },
  ],

  'too-easy': [
    {
      title: 'Brand strategy',
      summary:
        'The brief was a control experiment: take every story away and see what holds. No manifesto, no lifestyle shoot, no founder letter. Two colours in the entire stylesheet, one typeface, one grid.',
      bullets: ['5 hero pieces, $89 to $249', '#0D0D0D on #FFFFFF, nothing else', '0 words of campaign copy'],
      embeds: [{ kind: 'swatches', items: [{ name: 'Ink', hex: '#0D0D0D' }, { name: 'Paper', hex: '#FFFFFF' }] }],
    },
    {
      title: 'Product imagery',
      summary:
        'Every piece isolated on white and priced like a real drop: oversized jersey, parachute track pants, trail sneakers, shield sunglasses, puffer jacket. No set, no model, no mood.',
      bullets: ['Consistent angle, light and crop', 'Isolated cutouts built for a grid', 'Pricing set like a real release'],
      embeds: [{ kind: 'images', items: [{ src: '/creative/sites/too-easy.webp', label: 'The first two pieces' }, { src: '/creative/sites/too-easy-2.webp', label: 'Track pants and shield sunglasses' }] }],
    },
    {
      title: 'Web build',
      summary: 'A single product grid that has to sell on its own. Built, deployed and live.',
      bullets: ['Product grid and detail', 'Responsive down to phone', 'Deployed on Vercel'],
      embeds: [site('too-easy', 'too-easy-seven.vercel.app', 'https://too-easy-seven.vercel.app/')],
    },
  ],

  plastivore: [
    {
      title: 'Concept and narrative',
      summary:
        'For AD WARS, the marketing simulation at APU, everyone else would run a recycling campaign. I sold the shoe instead: a sole that eats microplastics. BioSole is a four layer enzyme membrane built on PETase, a real enzyme discovered in 2016. The science is made up and the footer says so.',
      bullets: ['Positioned as an investor deck, not a product page', 'Four layer BioSole story', '“Be the reason the Earth heals.”'],
      embeds: [],
    },
    {
      title: 'Web experience',
      summary:
        'Two scroll-scrubbed film sequences of 179 frames each carry the argument. Type, glow and motion all react to the scroll.',
      bullets: ['Scroll-driven frame sequences', 'Investor-style sections', 'Built and deployed solo'],
      embeds: [site('plastivore', 'plastivore-plum.vercel.app', 'https://plastivore-plum.vercel.app/')],
    },
    {
      title: 'Product design language',
      summary: 'Three colourways named for where the plastic is: Origin, Reef and Deep Sea.',
      bullets: ['Enzyme Green, Microplastic Teal, Abyssal Blue', 'Colour tokens lifted straight from the site CSS'],
      embeds: [{ kind: 'swatches', items: [{ name: 'Origin', hex: '#9EFF00' }, { name: 'Reef', hex: '#00E0C6' }, { name: 'Deep Sea', hex: '#5AA9FF' }] }],
    },
  ],

  'afro-week': [
    {
      title: 'Event identity',
      summary:
        'Red, gold and green used as structure, not decoration: the pan-African bar rules every section edge, set against black and Bebas Neue at display scale.',
      bullets: ['Colour as architecture', 'Display type and crew photography', 'One flag bar across every divider'],
      embeds: [{ kind: 'swatches', items: [{ name: 'Red', hex: '#C8102E' }, { name: 'Gold', hex: '#FCD116' }, { name: 'Green', hex: '#006B3F' }] }],
    },
    {
      title: 'Booking product',
      summary:
        'A ticketing site, not a poster. 732 seats in live availability, a seat picker, free entry down to a name and an email, and a QR ticket that lands instantly. Built so 732 people can get into the right chairs without a table and a list.',
      bullets: ['Live seat availability for Millennium Hall', 'Seat picker, not a form', 'Instant QR e-ticket for the door'],
      embeds: [site('afro-week', 'millennium-hall.vercel.app', 'https://millennium-hall.vercel.app/')],
    },
    {
      title: 'Show narrative',
      summary:
        'The Lines They Drew, a grandfather and a grandchild walking back through Africa’s past, told in drama, music, dance, choir and traditional dress. The site had to deserve the show.',
      bullets: ['Empires, colonisation, liberation, identity', 'Copy and sequencing for the page'],
      embeds: [{ kind: 'images', items: [{ src: '/creative/covers/afro-week.webp', label: 'The Lines They Drew' }] }],
    },
  ],

  danflix: [
    {
      title: 'Interface craft',
      summary:
        'A joke only lands if the craft is real, so I pulled Netflix’s actual design tokens instead of eyeballing them: the profile gate, ident, browse rows, modals and a player with subtitles, all rebuilt.',
      bullets: ['6 subsystems: gate, ident, browse, modal, player, ending', 'Design tokens lifted from the live DOM', 'Hover previews, match percentages, runtimes'],
      embeds: [site('danflix', 'danflix-murex.vercel.app', 'https://danflix-murex.vercel.app/'), { kind: 'swatches', items: [{ name: 'Red', hex: '#E50914' }, { name: 'Black', hex: '#141414' }] }],
    },
    {
      title: 'Edit and grade',
      summary:
        'Ten titles, one cast member. Existing clips of a single person, cut into a limited series, a nature strand and a deadpan park-ranger documentary, then graded to sit together.',
      bullets: ['10 titles with posters and previews', 'Wordmark ident with its own sting', 'Colour and pacing per genre strand'],
      embeds: [],
    },
    {
      title: 'Story',
      summary: 'The finale, The Bench, is the only title that stops being a joke about Netflix. The build is the gift. Netflix is just the wrapping.',
      bullets: ['Built as a birthday gift', 'Cold open, Skip Intro and all'],
      embeds: [],
    },
  ],

  'first-light': [
    {
      title: 'Product concept',
      summary:
        'A photo-culling tool built as a gift. Point it at a shoot (1,847 frames from a wedding in the real example), say what you want in plain English, and get a ranked shortlist with one line of reasoning per pick. Near-duplicates collapse to the sharpest.',
      bullets: ['Plain English instructions, no sliders', 'A reason on every pick', 'Ranked, not just filtered'],
      embeds: [],
    },
    {
      title: 'Editorial design',
      summary:
        'Warm cream, a refined serif and real photography instead of UI screenshots, so the page feels like a keepsake and not a landing page.',
      bullets: ['Cream #F8F3EA theme', 'Editorial type and photo-led hero'],
      embeds: [site('first-light', 'first-light-alpha.vercel.app', 'https://first-light-alpha.vercel.app/')],
    },
    {
      title: 'Privacy by design',
      summary: 'Nothing full size ever leaves your computer. Small copies go out for analysis and are thrown away.',
      bullets: ['Local first processing', 'Small analysis copies only'],
      embeds: [],
    },
  ],

  'content-instagram': [
    {
      title: 'Carousel design system',
      summary:
        'A six part launch carousel for the Xs community brand: navy and cream, one script mark, one rule per slide. A different carousel each day, from The Roadmap to The Rules to The Standard.',
      bullets: ['Daily carousels, July 23 to 28', 'Type-led, one idea per slide', 'Brush, pixel and crown motifs as a visual library'],
      embeds: [
        stills([
          'xs/xs-c24-2', 'xs/xs-c25-1', 'xs/xs-c25-3', 'xs/xs-c26-1', 'xs/xs-c26-2', 'xs/xs-c27-1', 'xs/xs-c27-3', 'xs/xs-c28-1', 'xs/xs-c28-3', 'xs/xs-cin-1',
        ]),
      ],
    },
    {
      title: 'Product drop',
      summary: 'The Gas Me Up drop: tee, hoodie, shorts, sweats and socks in a brushstroke print, laid out as product pages.',
      bullets: ['Five piece capsule', 'Brush print across the range'],
      embeds: [stills(['xs/xs-gmu-tee', 'xs/xs-gmu-hoodie', 'xs/xs-gmu-shorts', 'xs/xs-gmu-sweats', 'xs/xs-gmu-socks'])],
    },
  ],

  'content-tiktok': [
    {
      title: 'Short-form video',
      summary: 'POV and UGC formats built for the first second: a hook line, a face or a product, and captions that carry the sound-off viewer.',
      bullets: ['POV hooks', 'UGC delivery', 'Captions and pacing for the feed'],
      embeds: [films(['usa-ugc-man', 'usa-pov', 'usa-airport', 'brazil-video-6-pov-got-paid-to-make-ads'])],
    },
    {
      title: 'Editing craft',
      summary: 'Talking-head edits with animated captions, emphasis words and jump cuts timed to the sentence.',
      bullets: ['Animated captions', 'Jump cut rhythm'],
      embeds: [films(['s39-ai-boom', 's17-forward-deployed', 's22-ai-with-taste'])],
    },
  ],

  streams: [
    {
      title: 'Stream highlights',
      summary: 'Live streams cut down to the moments worth keeping: one idea, captions on, ready to post.',
      bullets: ['Highlight selection', 'Captions and framing'],
      embeds: [films(['short-3k', 'short-japan', 'short-music', 'short-ai-content'])],
    },
  ],
}
