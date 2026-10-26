import { MODEL_SHOTS, type ModelGroup } from '@/lib/creative/model'
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
  | { kind: 'tiktok'; items: { id: string; title: string }[] }
  | { kind: 'lookbook'; rows: { layout: 'solo' | 'duo' | 'trio' | 'quad' | 'feature' | 'feature-r' | 'wide'; items: CaseMedia[] }[] }

export type Scope = { title: string; summary: string; bullets: string[]; embeds: Embed[] }

type LookLayout = Extract<Embed, { kind: 'lookbook' }>['rows'][number]['layout']
const look = (rows: [LookLayout, string[]][]): Embed => ({
  kind: 'lookbook',
  rows: rows.map(([layout, ids]) => ({
    layout,
    items: ids.map((id) => {
      const m = MODEL_SHOTS.find((x) => x.id === 'm' + id.toLowerCase())
      if (!m) throw new Error('missing model shot ' + id)
      return { src: m.src, label: m.title }
    }),
  })),
})

const shots = (groups: ModelGroup[]): Embed => ({
  kind: 'images',
  items: MODEL_SHOTS.filter((m) => groups.includes(m.group)).map((m) => ({ src: m.src, label: m.title })),
})

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

  modeling: [
    {
      title: 'Studio noir',
      summary: 'Low-key light on black: a face, a chain, a pair of hands. Built to show what the camera finds in one frame with nothing else in it.',
      bullets: ['Black backdrop, shaped light', 'Full length, seated and close', 'Hands, rings and the gaze'],
      embeds: [
        look([
          ['feature', ['08842', '08844', '08847']],
          ['trio', ['08858', '08861', '08865']],
          ['duo', ['08822-Edit', '08814-Edit']],
          ['trio', ['08898', '08906', '08839']],
          ['duo', ['08897-Edit', '08842-Edit']],
        ]),
      ],
    },
    {
      title: 'Profile and line',
      summary: 'Straight on a clean white seamless: jaw, neck and curl in silhouette, for the casting directors who need to see structure.',
      bullets: ['Profile left and up', 'High key, clean edges'],
      embeds: [look([['duo', ['08883', '08891']]])],
    },
    {
      title: 'Paper white',
      summary: 'A second look in all white: loose shirt, wide trousers, a stool and a soft grey wall. Quiet, editorial and easy to cast.',
      bullets: ['White on white styling', 'Seated poses, head up and head down', 'Colour and mono edits'],
      embeds: [
        look([
          ['feature-r', ['09067', '09057', '09060']],
          ['trio', ['09073', '09074', '09075']],
          ['duo', ['09054', '09077']],
        ]),
      ],
    },
    {
      title: 'Details',
      summary: 'The close work: chain, cross and rings. The kind of frame jewellery and menswear brands ask for.',
      bullets: ['Macro and tight crops', 'Hands and accessories'],
      embeds: [look([['trio', ['08829', '08853', '08856']]])],
    },
    {
      title: 'Commercial and lifestyle',
      summary: 'Product in motion: a hair care jar thrown, caught and held, with the expression carrying the ad. Proof that the face can sell something.',
      bullets: ['Hair care, mid throw', 'Expression for the product shot'],
      embeds: [
        look([
          ['wide', ['08924']],
          ['duo', ['09017', '09025']],
        ]),
        films(['short-model']),
      ],
    },
  ],

  'book-me': [
    {
      title: 'The comp card',
      summary: 'The four frames a casting needs: headshot, profile, full length and a white-on-white look.',
      bullets: ['Headshot and profile', 'Full length', 'Colour and mono'],
      embeds: [look([['quad', ['08898', '08883', '08822-Edit', '09060']]])],
    },
    {
      title: 'What I can do',
      summary: 'Editorial and portrait work, commercial and product shots, and lifestyle content. I also shoot, cut and post my own content, so a campaign gets the face and the edit.',
      bullets: ['Editorial and portrait', 'Commercial and product, hair care and accessories', 'Lifestyle and social content', 'Direction, edit and delivery if you want it'],
      embeds: [look([['duo', ['09017', '08861']]])],
    },
    {
      title: 'How to book',
      summary: 'Email the brief, dates and usage and I will send the full set and reply with availability. Based in Beppu, Japan.',
      bullets: ['Email: sameermotwani17@gmail.com', 'Brief, dates, usage'],
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

  'content-tiktok': [
    {
      title: 'Story and identity',
      summary: 'The posts that carry the account: where I come from, how I look at it and the question that keeps people watching to the end.',
      bullets: ['Hook in the first second', 'One idea, written to be said out loud', 'Captions designed for sound off'],
      embeds: [
        {
          kind: 'tiktok',
          items: [
            { id: '7697279686975540501', title: 'Guess my mix' },
            { id: '7693152167812795668', title: 'Being a Liberian is an advantage' },
            { id: '7688944318781852948', title: 'Glow up' },
          ],
        },
      ],
    },
    {
      title: 'Studio and AI, in public',
      summary: 'The studio told as it happens: what an AI clipping tool gets wrong, what a website really costs and the road from Liberia to Japan.',
      bullets: ['Build in public', 'Plain numbers, no pitch', 'The studio shown between the stories'],
      embeds: [
        {
          kind: 'tiktok',
          items: [
            { id: '7699109437423996181', title: 'AI can clip, it cannot pick' },
            { id: '7699109056249711892', title: 'My rate for a website' },
            { id: '7699108892244151573', title: 'Liberia, Israel, Ghana, Japan' },
          ],
        },
      ],
    },
    {
      title: 'Life in Japan',
      summary: 'The small daily things from a Liberian living in Beppu: the coin laundry, the skincare, the routines.',
      bullets: ['Everyday, unstaged', 'Local life seen fresh', 'Short, warm, repeatable'],
      embeds: [
        {
          kind: 'tiktok',
          items: [
            { id: '7699105650118479156', title: 'Coin laundry' },
            { id: '7699109269232258325', title: 'No filter, Japanese skincare' },
            { id: '7700847558700059925', title: 'I love y\u2019all' },
          ],
        },
      ],
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
