// ─── Shared project types ─────────────────────────────────────────────────────

export type ProjectStat = { value: string; label: string }
export type ProjectLink = { label: string; href: string }

/** one node in the case-study roadmap */
export type FlowStage = {
  label: string
  headline: string
  points?: string[]
}

export type ProjectDetail = {
  overview: string
  stats?: ProjectStat[]
  flow: FlowStage[]
  links?: ProjectLink[]
}

/** which side of the PROJECTS split a record belongs to */
export type Track = 'tech' | 'creative'

export type Album = {
  id: string
  title: string
  subtitle: string
  tag: string
  short: string
  /** tech vs creative track in the PROJECTS scene */
  track: Track
  /** hover-state "tracklist" lines on the album cover */
  tracklist: string[]
  tech: string[]
  badge: string | null
  accent: string
  /** extra signature colors, drawn as a colorway bar under the badge */
  accents?: string[]
  /** CSS font-family for the record title; defaults to the site display face */
  font?: string
  /** cover image src; null renders the code-drawn cover */
  cover: string | null
  /** render the cover contained (for logo covers) instead of full-bleed */
  coverContain?: boolean
  /** backdrop behind a contained cover */
  coverBg?: string
  /** scrapyard uses the stencil face */
  stencil?: boolean
  /** monochrome black/white case-study theme (RETRO raven) */
  mono?: boolean
  /** bespoke case-study world */
  world?: 'stickem' | 'scrapyard' | 'retro' | 'gomi' | 'aihack' | 'miru'
  /** brand logo chip (e.g. Stick'Em) */
  logo?: string
  detail: ProjectDetail
}

export type VaultItem = {
  id: string
  title: string
  subtitle: string
  tag: string
  short: string
  tech: string[]
  badge: string | null
  accent: string
  /** optional case-study hero art (overlay only) */
  cover?: string | null
  coverContain?: boolean
  coverBg?: string
  mono?: boolean
  /** bespoke case-study world */
  world?: 'stickem' | 'scrapyard' | 'retro' | 'gomi' | 'aihack' | 'miru'
  /** brand logo chip (e.g. Stick'Em) */
  logo?: string
  detail: ProjectDetail
}

/**
 * A mini-album inside the RETRO Studios discography. Same record shell as the
 * featured albums — cover, numbered chapters, "▶ open" — but the click leaves
 * for the live project instead of opening a case-study overlay.
 */
export type Release = {
  id: string
  title: string
  subtitle: string
  tag: string
  short: string
  tracklist: string[]
  badge: string | null
  accent: string
  accents?: string[]
  font?: string
  cover: string | null
  coverContain?: boolean
  coverBg?: string
  /** the live project — the case study links out to it */
  href: string
  /** optional secondary links (socials, asset folders) shown as small chips */
  links?: ProjectLink[]
  /** the story: why it exists, how it was made, what it cost */
  detail: ProjectDetail
}

// ─── The four featured albums ─────────────────────────────────────────────────

export const albums: Album[] = [
  {
    id: 'slideviewer',
    track: 'tech',
    title: "Stick'Em SlideViewer",
    subtitle: 'Production Infrastructure Rebuild',
    tag: "Software Engineer · Stick'Em Pte Ltd · May–Aug 2026",
    short:
      'Rebuilt slide delivery for a live EdTech platform serving teachers in Brunei and the Philippines. Slides that took 10s+ now load in roughly 0.7s.',
    tracklist: ['01 — The Black Screen', '02 — 0.7 Seconds', '03 — The Fallback', '04 — The Handover'],
    tech: ['Next.js', 'Supabase (Postgres + Storage)', 'Google Slides API', 'Google Drive API', 'Sharp', 'WebP'],
    badge: '2025 Hult Prize Global Winner · US$1M seed',
    accent: '#a855f7',
    cover: '/stickem.png',
    coverContain: true,
    coverBg: '#f6f0fa',
    logo: '/stickem.png',
    world: 'stickem',
    detail: {
      overview:
        "Stick'Em is a Singapore EdTech company and 2025 Hult Prize Global Winner with US$1M in seed funding. Its lesson slides loaded through a Google Slides iframe that hung or went black on slow connections. I built a pipeline that pre-processes every deck into WebP images served from a CDN, kept the iframe as an automatic fallback, and added the logging the team needs to measure reliability without me.",
      stats: [
        { value: '~15x', label: 'Faster on Slow 3G: roughly 0.7s, down from 10s+' },
        { value: '65+', label: 'Decks processed through the pipeline' },
        { value: '2', label: 'Render paths: a broken pipeline never shows a blank lesson' },
        { value: 'CEO', label: 'Validated it live in a workshop with real teachers' },
      ],
      flow: [
        {
          label: 'the problem',
          headline: 'A black screen in front of a classroom',
          points: [
            'Lesson slides were served through a Google Slides iframe',
            'On slow connections it hung or rendered a black screen',
            'Worst in Brunei and the Philippines, core markets for the product',
          ],
        },
        {
          label: 'the constraints',
          headline: 'What could not change',
          points: [
            'Lessons stay authored in Google Slides. The pipeline adapts to the team, not the reverse',
            'The platform is live. Real teachers, real classrooms, every week',
            "The iframe is Google's. Its load behaviour was never ours to fix",
            'Slow networks are the baseline in core markets, not an edge case',
          ],
        },
        {
          label: 'the approach',
          headline: 'Process once, serve images fast',
          points: [
            'Each deck is exported once into per-slide images',
            'Images are converted to WebP and served from a CDN',
            'The classroom loads pictures, not a live embed',
            'Any failure drops the viewer back to the original iframe',
          ],
        },
        {
          label: 'the decisions',
          headline: 'What I chose, and what it cost',
          points: [
            'Pre-render to images instead of tuning the iframe. Accepted: edits need a rebuild before they show',
            'Keep the iframe as an automatic fallback. Accepted: two render paths to maintain',
            'Log successful loads, not just failures. A failure count without a denominator means nothing. Accepted: a log row per lesson open',
            'Write the full handover before moving on. Accepted: build time spent on documentation',
          ],
        },
        {
          label: 'the results',
          headline: 'Roughly 0.7s, down from 10s+',
          points: [
            'About 15x faster on Slow 3G, where the product was worst',
            '65+ decks processed through the pipeline',
            'The CEO ran it live in a workshop with real teachers',
            'Fallback and load logging feed a daily health view. The team measures reliability without me',
          ],
        },
      ],
      links: [],
    },
  },
  {
    id: 'scrapyard',
    track: 'tech',
    title: 'SCRAPYARD',
    subtitle: '3D Multiplayer Browser FPS',
    tag: 'One-day build · Spec-driven with Claude Fable 5 · 2026',
    short:
      'A CoD-inspired 3D multiplayer browser FPS built in one day from a ~200-line spec — zero code written by hand.',
    tracklist: ['01 — 200-Line Spec', '02 — Container Yard', '03 — 30Hz Tick', '04 — Contact!'],
    tech: ['Three.js', 'Cloudflare Durable Objects', 'WebSockets', 'Client-side Prediction', 'FSM AI Bots', 'Claude Fable 5'],
    badge: 'Live — playable in browser',
    accent: '#eab308',
    cover: '/scenes/scrapyard.webp',
    stencil: true,
    world: 'scrapyard',
    detail: {
      overview:
        'A one-day experiment: author a ~200-line spec, let Claude Code execute it milestone-by-milestone with proof-of-run gates and 91 automated tests. Free-for-all deathmatch in a salvage yard, live on the open web. The transferable asset is the spec — the game is the receipt.',
      stats: [
        { value: '1 day', label: 'Blank prompt to deployed multiplayer FPS' },
        { value: '0', label: 'Lines of code written by hand' },
        { value: '91', label: 'Automated tests gating milestones' },
        { value: '30Hz', label: 'Deterministic fixed-timestep sim' },
      ],
      flow: [
        {
          label: 'the spec',
          headline: '~200 lines. Zero code written by hand.',
          points: ['Authored the spec, Claude Code executed', 'Milestone gates with proof-of-run', '91 automated tests'],
        },
        {
          label: 'the game',
          headline: '8-player FFA deathmatch in a salvage yard',
          points: ['First to 30 kills or 10 minutes', '250–400ms TTK · 3s respawn · 60fps', 'FSM bots yelling "contact!"'],
        },
        {
          label: 'the netcode',
          headline: 'Server-authoritative, deterministic 30Hz',
          points: ['Client-side prediction + lag compensation', 'Hand-rolled AABB + raycast hitscan', 'Cloudflare Durable Objects'],
        },
        {
          label: 'the point',
          headline: 'Build-in-public for Retro Studios',
          points: ['No product, no monetization — on purpose', 'The spec-writing skill is the reusable asset'],
        },
      ],
      links: [{ label: 'Play SCRAPYARD', href: 'https://scrapyard-lake.vercel.app' }],
    },
  },
  {
    id: 'gomi-snap',
    track: 'tech',
    title: 'GOMI Snap',
    subtitle: 'AI Civic-Tech — a Completed Chapter',
    tag: 'Founder & CTO · Nov 2025 – 2026 · folded into StarLabs',
    short: 'AI waste-classification PWA for Japanese municipalities. Wound down and folded into StarLabs.',
    tracklist: ['01 — 20 Categories', '02 — 520 Users', '03 — City Hall', '04 — StarLabs'],
    tech: ['React', 'TypeScript', 'Express.js', 'OpenAI Vision API', 'PWA'],
    badge: '1st Place — APU Hackathon 2025',
    accent: '#3f9142',
    cover: '/gomi-logo.png',
    coverContain: true,
    coverBg: '#f2f5f0',
    logo: '/gomi-logo.png',
    world: 'gomi',
    detail: {
      overview:
        'Snap a photo of your trash, get instant sorting instructions for Beppu’s 20+ waste categories. Built, validated, piloted with the city — then honestly wound down and folded into StarLabs.',
      stats: [
        { value: '95.3%', label: 'Survey adoption intent (n=400)' },
        { value: '520+', label: 'Organic users · zero paid acquisition' },
        { value: '¥25K', label: 'Monthly operating cost' },
        { value: '2x', label: 'Podiums: APU Hackathon 1st · Hult Prize runner-up' },
      ],
      flow: [
        {
          label: 'the problem',
          headline: '20+ waste categories, zero real-time guidance',
          points: ['Weekday + week-of-month rules', 'The official UX: a 40-page Japanese PDF', 'Friction at the exact moment of disposal'],
        },
        {
          label: 'the build',
          headline: 'Photo in → disposal instructions out',
          points: ['GPT-4V vision layer, tuned for bad lighting', 'Rule engine reverse-engineered from municipal PDFs', 'QR stickers at waste stations — no install'],
        },
        {
          label: 'the traction',
          headline: '500+ organic users in month one',
          points: ['95.3% adoption intent across 400 surveyed', 'Beppu City government engagement', 'B2B dashboard for property managers'],
        },
        {
          label: 'the chapter close',
          headline: 'Wound down, folded into StarLabs',
          points: ['1st place APU Hackathon 2025', 'Hult Prize APU runner-up + Best Speaker', 'The systems thinking moved on with the team'],
        },
      ],
      links: [
        { label: 'GOMI Snap 2.0', href: 'https://gomisnap.org/2point0' },
        {
          label: 'Launch Post',
          href: 'https://www.linkedin.com/posts/gomi-snap_we-just-shipped-gomi-snap-20-the-original-activity-7461724404855783424-Me90',
        },
      ],
    },
  },
  {
    id: 'retro-studios',
    track: 'creative',
    title: 'RETRO Studios',
    subtitle: 'AI Cinematic Production · StarLabs',
    tag: 'Founder & Creative Director · Founded April 2026',
    short:
      'One-person AI creative studio producing agency-grade cinematic brand content — delivered a paid 12-country World Cup campaign end to end.',
    tracklist: ["01 — Director's Brief", '02 — Anti-Perfection', '03 — 12 Editions', '04 — One Person'],
    tech: ['GPT Image 2', 'Higgsfield Cinema Studio', 'Kling 3.0', 'Seedance 2.0', 'Suno', 'CapCut', 'Next.js 14', 'Supabase', 'Vercel'],
    badge: 'Paid client campaign — delivered',
    accent: '#f5f5f2',
    cover: '/scenes/retro-raven.webp',
    mono: true,
    world: 'retro',
    detail: {
      overview:
        'One person, an AI-native stack, and the thesis that it can outproduce a full creative agency. Ran full creative direction and technical production for DK2R Football Wear — a premium 12-country jersey brand built for the 2026 FIFA World Cup. The campaign ran its course with the tournament and closed out in 2026; the studio is open for the next brief.',
      stats: [
        { value: '12', label: 'Country editions art-directed' },
        { value: '36', label: 'SKU variants (3 silhouettes × 12)' },
        { value: '150+', label: 'AI-generated hero images delivered' },
        { value: '1', label: 'Person doing the work of an agency' },
      ],
      flow: [
        {
          label: 'the thesis',
          headline: 'One operator outproduces an agency',
          points: ['Founded April 2026 under StarLabs', 'Statics, reels, commercial ads — no crew', 'Open for the next brief'],
        },
        {
          label: 'the client',
          headline: 'DK2R — the 2026 World Cup capsule',
          points: ['12 editions · 36 SKUs · 300 numbered pieces each', '60-image campaigns: Mexico, Brazil, USA, England, Argentina', 'Solo-built Next.js + Supabase store with PayPal checkout'],
        },
        {
          label: 'the system',
          headline: '8-layer, reference-locked prompt architecture',
          points: ['"Anti-Perfection Layer" kills AI-image tells', 'Locked Visual DNA: ARRI colour science, Kodak 2383', "Director's Brief before every generation"],
        },
        {
          label: 'the bridge',
          headline: 'AI renders → factory production sheets',
          points: ['55-asset, 14-edition QA report, zero redos', 'Contract + deposit before any engagement', 'Every job compounds the studio reel'],
        },
      ],
      links: [
        {
          label: 'Instagram',
          href: 'https://www.instagram.com/retro.studios_?igsh=MTRnc2x1NXZ6YmJhNQ%3D%3D&utm_source=qr',
        },
      ],
    },
  },
]

// ─── The RETRO Studios discography ────────────────────────────────────────────
// RETRO Studios is the artist; each entry below is one of its releases. Every
// palette and typeface here is lifted from that project's own live site — the
// declared theme-color, the CSS custom properties, the fonts it actually loads.
// Nothing on this list is a guess.

export const retroReleases: Release[] = [
  {
    id: 'dk2r',
    title: 'DK2R',
    subtitle: 'Football. Identity. Prestige.',
    tag: 'Creative Director · Prompt Engineer · Technical Producer · for founder Hassan Kai Turay',
    short:
      'Twelve country editions for the 2026 World Cup, 300 numbered pieces each, run solo. Morocco got Zellige tiles, Japan got kintsugi through the sakura, Brazil got the rhinestone crest. Every edition its own language, shot across three silhouettes. Eight prompt layers underneath it, one of them there purely to kill the tells that give AI imagery away. Same colour science on all of it. I built the store it sold from too.',
    tracklist: ['01 — Director’s Brief', '02 — 12 Editions', '03 — Anti-Perfection', '04 — The Drop'],
    badge: '300 numbered pieces · no restocks',
    // the brand's own declared theme-color on dkai2ray.company
    accent: '#c9a84c',
    // closest to the site's own display face: DK2R is the most on-brand-for-Retro release
    font: 'var(--font-display)',
    cover: '/dk2r/dk2r-mercado-jersey.webp',
    coverBg: '#0b0b0b',
    href: 'https://dkai2ray.company/',
    links: [{ label: '@dk2rwear', href: 'https://www.instagram.com/dk2rwear' }],
    detail: {
      overview:
        'First paid job the studio ever took, and the one that had to work. Hassan Kai Turay came to me with a brand and a date he couldn’t move: a limited jersey line for the 2026 World Cup, twelve country editions, 300 numbered pieces each, no restocks. Shooting twelve markets properly costs more than the line would ever make back. So I ran it alone. Direction, prompts, production, and the store it sold from. It closed out when the tournament did.',
      stats: [
        { value: '12', label: 'Country editions, each with its own visual language' },
        { value: '300', label: 'Numbered pieces per edition. No restocks, ever' },
        { value: '8', label: 'Prompt layers, reference-locked across every asset' },
        { value: '150+', label: 'Hero images delivered, zero manufacturing redos' },
      ],
      flow: [
        {
          label: 'the brief',
          headline: 'Twelve countries, one date that can’t move',
          points: [
            'A World Cup capsule only has value while the tournament is on',
            'Agency-rate campaign photography for 12 markets was never in budget',
            'One operator, an AI-native stack, and the whole pipeline to own',
          ],
        },
        {
          label: 'the editions',
          headline: 'Each country gets its own language, not a recolour',
          points: [
            'Morocco: Zellige tilework',
            'Japan: kintsugi-slashed sakura',
            'Brazil: the rhinestone crest',
            'Three silhouettes per edition, 36 SKUs in total',
          ],
        },
        {
          label: 'anti-perfection',
          headline: 'The layer that hides the machine',
          points: [
            'AI imagery tells on itself: sourceless light, fabric that never moves, skin with no pores',
            'A dedicated layer in the stack exists purely to break those tells',
            'ARRI Alexa and Kodak 2383 colour science locked across all 12 markets',
            'A director’s brief written before anything got generated',
          ],
        },
        {
          label: 'the drop',
          headline: 'Renders on one side, a factory and a checkout on the other',
          points: [
            'Renders turned into factory production sheets',
            '55 assets across 14 editions, checked. Zero redos',
            'Solo-built Next.js + Supabase storefront with PayPal checkout',
            'Closed out with the tournament in 2026',
          ],
        },
      ],
      links: [
        { label: 'Visit the store', href: 'https://dkai2ray.company/' },
        { label: '@dk2rwear', href: 'https://www.instagram.com/dk2rwear' },
      ],
    },
  },
  {
    id: 'too-easy',
    title: 'TOO EASY',
    subtitle: 'Minimal Streetwear',
    tag: 'Concept brand · a design exercise in restraint',
    short:
      'A minimal streetwear label I built as an exercise. No manifesto, no lifestyle shoot. Five pieces, shot and priced like a real drop, and a grid that has to carry them on its own.',
    tracklist: ['01 — Five Pieces', '02 — No Manifesto', '03 — Product-First Grid', '04 — Restraint'],
    badge: '5 hero pieces · $89–$249',
    // the brand declares exactly two colors: #0D0D0D ink on #FFFFFF paper
    accent: '#ededed',
    font: 'var(--font-grid)',
    cover: 'https://too-easy-seven.vercel.app/images/jersey.png',
    coverContain: true,
    coverBg: '#ffffff',
    href: 'https://too-easy-seven.vercel.app/',
    links: [{ label: 'Brand assets', href: 'https://drive.google.com/drive/folders/1u-UNW_YvpI0KB_-1Q5qtutXyOYDUkjdf' }],
    detail: {
      overview:
        'Every brand I’d built before this one leaned on a story. A manifesto, a campaign, a whole world to sell you. I wanted to know if I could hold a page together without any of it. So: five pieces, real prices, shot on white, nothing behind them. If the grid doesn’t carry it, nothing does.',
      stats: [
        { value: '5', label: 'Hero pieces. That is the whole catalogue' },
        { value: '2', label: 'Colours declared in the whole stylesheet' },
        { value: '0', label: 'Words of manifesto, lore, or campaign copy' },
        { value: '$89', label: 'Entry price. Priced like a real drop' },
      ],
      flow: [
        {
          label: 'the exercise',
          headline: 'Take the story away and see what holds',
          points: [
            'No manifesto, no lifestyle shoot, no founder letter',
            'The product grid is the only thing selling',
            'A control against my louder brand work',
          ],
        },
        {
          label: 'the five',
          headline: 'Priced and shot like a real drop',
          points: [
            'Oversized Jersey, $89',
            'Parachute Track Pants $129 · Trail Sneakers $139',
            'Shield Sunglasses $159 · Puffer Jacket $249',
          ],
        },
        {
          label: 'the restraint',
          headline: '#0D0D0D on #FFFFFF, and nothing else',
          points: [
            'Two declared colours in the entire stylesheet',
            'One typeface, one weight step, one grid',
            'Every product isolated on white. No set, no model, no mood',
          ],
        },
        {
          label: 'the read',
          headline: 'The quietest record here, on purpose',
          points: [
            'Restraint is a position, not a lack of ideas',
            'The hardest brief is the one with nothing to decorate',
          ],
        },
      ],
      links: [
        { label: 'Visit the site', href: 'https://too-easy-seven.vercel.app/' },
        { label: 'Brand assets', href: 'https://drive.google.com/drive/folders/1u-UNW_YvpI0KB_-1Q5qtutXyOYDUkjdf' },
      ],
    },
  },
  {
    id: 'plastivore',
    title: 'PLASTIVORE',
    subtitle: 'Every step eats plastic.',
    tag: 'Concept brand · AD WARS marketing simulation, APU',
    short:
      'A concept brand for a marketing simulation, not a real product. Microplastics are in your blood and your rain and your floor, so instead of another recycling campaign I built a shoe that eats them. BioSole™ is a four-layer enzyme membrane, built on PETase, which is a real enzyme somebody found in 2016. Three colorways. The whole site reads like an investor deck rather than a product page.',
    tracklist: ['01 — Microplastics', '02 — BioSole™', '03 — Three Colorways', '04 — The Ask'],
    badge: 'Concept brand. The science is made up',
    // straight from the site's own CSS custom properties
    accent: '#9eff00',
    accents: ['#9eff00', '#00e0c6', '#5aa9ff'],
    font: 'var(--font-body)',
    cover: 'https://plastivore-plum.vercel.app/assets/colorway_origin.png',
    coverBg: '#07090a',
    href: 'https://plastivore-plum.vercel.app/',
    detail: {
      overview:
        'Built for AD WARS, the marketing simulation at APU. Everyone else was going to run a recycling campaign, which means asking people to try harder at something they’re already losing. I’d rather sell them a shoe that eats it. The plastic is already in your blood and your rain and the floor you’re standing on, so stop cleaning and start digesting. The science is made up. The footer says so. The rest of it isn’t.',
      stats: [
        { value: '4', label: 'Layers in the BioSole™ membrane' },
        { value: '3', label: 'Named colorways: Origin, Reef, Deep Sea' },
        { value: '2016', label: 'The year PETase, the real enzyme, was discovered' },
        { value: '2', label: 'Scroll-scrubbed film sequences, 179 frames each' },
      ],
      flow: [
        {
          label: 'the problem',
          headline: 'There are microplastics in your blood',
          points: [
            'In the rain, in the salt, in the floor you are standing on',
            'We tried recycling. We tried banning straws',
            'So stop cleaning plastic and build something that eats it',
          ],
        },
        {
          label: 'the sole',
          headline: 'BioSole™. Four layers, one living membrane',
          points: [
            '01 Membrane: a PETase enzyme layer. The hungry part',
            '02 Capillary Mesh: lifts microplastics off the floor',
            '03 Digestion Chamber: breaks them into harmless minerals',
            '04 Comfort Deck: you barely feel the planet healing',
          ],
        },
        {
          label: 'the colorways',
          headline: 'Three appetites',
          points: ['Origin: Enzyme Green', 'Reef: Microplastic Teal', 'Deep Sea: Abyssal Blue'],
        },
        {
          label: 'the ask',
          headline: 'Pitched as an investor deck, not a product page',
          points: [
            '"Be the reason the Earth heals." That is a raise, not a sale',
            'Cinematic scroll-scrub film carries the argument',
            'Fictional science, stated plainly in the footer',
          ],
        },
      ],
      links: [{ label: 'Visit the site', href: 'https://plastivore-plum.vercel.app/' }],
    },
  },
  {
    id: 'afro-week',
    title: 'AFRO WEEK 2026',
    subtitle: 'Seat Reservation · Millennium Hall, APU',
    tag: 'Event site & booking flow · 26 June 2026 · Millennium Hall, APU',
    short:
      'A ticketing site, not a poster. The show is The Lines They Drew, a grandfather and a grandchild walking back through Africa’s past, carried by drama, music, dance, choir and traditional dress. Then the unglamorous half: 732 seats in live availability, a seat picker, free entry down to a name and an email, and a QR ticket that lands straight away. Red, gold and green run through every band and divider as structure rather than decoration.',
    tracklist: ['01 — The Lines They Drew', '02 — 732 Seats', '03 — Pick Your Seat', '04 — QR At The Door'],
    badge: '732 seats · free admission · QR entry',
    // the flag bar the site draws across every section edge
    accent: '#fcd116',
    accents: ['#c8102e', '#fcd116', '#006b3f'],
    font: 'var(--font-bebas)',
    cover: 'https://millennium-hall.vercel.app/afrifest-crew3.jpg',
    coverBg: '#0a0a0a',
    href: 'https://millennium-hall.vercel.app/',
    detail: {
      overview:
        'Afro Week needed a door, not a poster. The show is The Lines They Drew, a grandfather and a grandchild walking back through Africa’s past, and Millennium Hall seats 732. A flyer can’t hold a seat for anybody. So it was two jobs really: build the show something it deserved, then work out how 732 people get into the right chairs for free and have something to scan on the way in.',
      stats: [
        { value: '732', label: 'Seats held in live availability' },
        { value: 'FREE', label: 'Admission. A name and an email is the whole checkout' },
        { value: 'QR', label: 'E-ticket, issued instantly on reservation' },
        { value: '3', label: 'Flag colours, used as structure rather than decoration' },
      ],
      flow: [
        {
          label: 'the show',
          headline: 'The Lines They Drew',
          points: [
            'Africa’s great empires, colonisation, liberation, identity',
            'Drama · Music · Dance · Choir · Traditional fashion',
            'Told between a grandfather and a grandchild',
          ],
        },
        {
          label: 'the hall',
          headline: '732 seats, and every one of them has to be findable',
          points: [
            'Millennium Hall, APU. 26 June 2026, 6th period',
            'Live seat availability rather than a static count',
            'A seat picker, not a form',
          ],
        },
        {
          label: 'the door',
          headline: 'Free still needs a ticket',
          points: [
            'Name and email is the entire checkout',
            'QR e-ticket arrives instantly',
            'Scannable at the door. No list, no queue at a table',
          ],
        },
        {
          label: 'the palette',
          headline: 'Red, gold and green as structure',
          points: [
            'The pan-African bar rules every section edge and divider',
            'Bebas Neue at display scale, black ground, warm crew photography',
            'The colour means something here. It isn’t a skin on top',
          ],
        },
      ],
      links: [
        { label: 'Reserve a seat', href: 'https://millennium-hall.vercel.app/' },
        { label: '@afroweekapu', href: 'https://www.instagram.com/afroweekapu' },
      ],
    },
  },
  {
    id: 'danflix',
    title: 'DANFLIX',
    subtitle: 'A Netflix Built For One Person',
    tag: 'Personal build · a birthday release for Dan',
    short:
      'A birthday gift dressed up as a streaming service. Profile gate, wordmark ident with its own sting, then ten titles you can browse. A limited series, a nature strand, a deadpan park-ranger documentary, a finale called The Bench. Posters, hover previews, detail modals, a player with subtitles. All of it footage of one person, cut and graded on Netflix’s own tokens.',
    tracklist: ['01 — Who’s Watching?', '02 — The Ident', '03 — Ten Titles', '04 — The Bench'],
    badge: 'Made for Dan',
    // lifted from netflix.com's live DOM by the project itself, in css/tokens.css
    accent: '#e50914',
    font: '"Helvetica Neue", "Segoe UI", Roboto, Ubuntu, sans-serif',
    cover: 'https://danflix-murex.vercel.app/assets/poster/igotyou-card.jpg',
    coverBg: '#141414',
    href: 'https://danflix-murex.vercel.app/',
    detail: {
      overview:
        'A birthday present for Dan, built as a streaming service. Stupid idea and I liked it. Take the clips that already exist of one person, give them the full Netflix treatment, posters and match percentages and hover previews and an ident with its own sting. A joke like this only lands if the craft underneath it is real, so I pulled Netflix’s actual design tokens rather than guessing at them.',
      stats: [
        { value: '10', label: 'Titles, each with poster, preview and detail modal' },
        { value: '6', label: 'Subsystems: gate, ident, browse, modal, player, ending' },
        { value: '1', label: 'Person in the entire catalogue' },
        { value: '#E50914', label: 'Netflix red, lifted from the live DOM rather than eyeballed' },
      ],
      flow: [
        {
          label: 'the gate',
          headline: '“Who’s watching?”',
          points: [
            'The real profile gate, rebuilt',
            'Doubles as the click that unlocks audio for everything after it',
          ],
        },
        {
          label: 'the ident',
          headline: 'Wordmark, sting, cold open',
          points: [
            'The wordmark gets its own sweep and its own sting',
            'Skip Intro, because of course there is a Skip Intro',
          ],
        },
        {
          label: 'the catalogue',
          headline: 'Ten titles, one cast member',
          points: [
            'A limited series, a nature strand, a deadpan park-ranger documentary',
            'Hover previews, match percentages, genres, runtimes',
            'Full-screen player with subtitles',
          ],
        },
        {
          label: 'the ending',
          headline: 'The Bench, the only title that matters',
          points: [
            'The finale stops being a joke about Netflix',
            'The build is the gift. Netflix is just the wrapping',
          ],
        },
      ],
      links: [{ label: 'Open Danflix', href: 'https://danflix-murex.vercel.app/' }],
    },
  },
  {
    id: 'first-light',
    title: 'First Light',
    subtitle: 'Photo Culling, As A Gift',
    tag: 'Secret Santa build · made for one person',
    short:
      'A photo-culling tool built as a gift rather than a product. Point it at a shoot, 1,847 frames from a wedding in the real example, and say what you want in plain English. It hands back a ranked shortlist with a line of reasoning on every pick, and collapses fourteen versions of one moment down to the sharpest. Nothing full size ever leaves your computer.',
    tracklist: ['01 — 1,847 Photos', '02 — Plain English', '03 — One Line, One Reason', '04 — Stays Local'],
    badge: '1,847 photos → a shortlist',
    // the site's own declared theme-color
    accent: '#f8f3ea',
    font: 'var(--font-editorial)',
    cover: 'https://first-light-alpha.vercel.app/_next/static/immutable/media/ha-window.3ukoirfs21_b2.jpg',
    coverBg: '#f8f3ea',
    href: 'https://first-light-alpha.vercel.app/',
    detail: {
      overview:
        'Secret Santa for Ha, who shoots. She gets home from a wedding with 1,847 frames and loses an entire evening picking between fourteen versions of the same moment, so I built her something that does the picking. Point it at the shoot, say what you want in plain English, get a shortlist back with a reason on every pick. It only ever had to work for one person.',
      stats: [
        { value: '1,847', label: 'Frames in the real example shoot' },
        { value: '1', label: 'Line of reasoning attached to every pick' },
        { value: '0', label: 'Full-size photos that ever leave your computer' },
        { value: '#F8F3EA', label: 'Warm cream, the theme the site declares itself' },
      ],
      flow: [
        {
          label: 'the shoot',
          headline: '1,847 photos and an evening gone',
          points: [
            'A folder of near-duplicates from one wedding',
            'The work isn’t editing. It’s choosing',
            'Fourteen versions of the same moment, one of them sharp',
          ],
        },
        {
          label: 'the ask',
          headline: 'Describe the edit in plain English',
          points: [
            '“20 lovely candid photos, eyes open, nothing repeated”',
            'No sliders, no filters, nothing to learn',
          ],
        },
        {
          label: 'the shortlist',
          headline: 'A ranked cut, and why each frame made it',
          points: [
            'One line of reasoning per pick',
            'Near-duplicates collapse to the sharpest of the set',
            'Ranked, not just filtered',
          ],
        },
        {
          label: 'the promise',
          headline: 'Nothing full size leaves the machine',
          points: [
            'Photos stay local. Small copies go out for analysis and get thrown away',
            'Sold with warm editorial photography instead of UI screenshots',
            'A keepsake, not a landing page',
          ],
        },
      ],
      links: [{ label: 'Open First Light', href: 'https://first-light-alpha.vercel.app/' }],
    },
  },
  {
    // the closing track: the studio's own folder rather than a shipped project,
    // so it wears RETRO Studios' own raven and monochrome accent
    id: 'retro-projects',
    title: 'RETRO PROJECTS',
    subtitle: 'The Studio Folder',
    tag: 'Retro Studios · working archive · view only',
    short:
      'The studio’s working folder, opened up. Not a case study and not a cut reel. Just the project Drive, shared read only. Click through and have a look.',
    tracklist: ['01 — The Archive', '02 — Open Folder', '03 — Shared Drive', '04 — Have A Look'],
    badge: 'Google Drive, view only',
    accent: '#f5f5f2',
    font: 'var(--font-display)',
    cover: '/scenes/retro-raven.webp',
    coverBg: '#000000',
    href: 'https://drive.google.com/drive/folders/1MjXPVTnsR7WjbrrVjk0Ro7GnN007HCEV',
    detail: {
      overview:
        'Everything above is the cut. This is the folder it got cut from, open to anyone with the link. Nothing in there is sequenced or tidied up.',
      flow: [
        {
          label: 'the archive',
          headline: 'The folder, not the edit',
          points: ['Working files, not finished pieces', 'No sequencing and no curation'],
        },
        {
          label: 'the access',
          headline: 'Shared read only',
          points: ['Open to anyone with the link', 'Nothing to request and nothing to sign'],
        },
      ],
      links: [
        { label: 'Open the Drive folder', href: 'https://drive.google.com/drive/folders/1MjXPVTnsR7WjbrrVjk0Ro7GnN007HCEV' },
      ],
    },
  },
]

// ─── The vault: every other project, fully preserved ──────────────────────────

export const vault: VaultItem[] = [
  {
    id: 'stickem-curriculum',
    title: "Stick'Em Curriculum Engine",
    subtitle: 'Curriculum Alignment Engine',
    tag: 'Product & AI Systems Developer · Feb 2026–Present',
    short: 'AI-powered curriculum alignment engine for global STEAM deployment.',
    tech: ['React 18', 'Express 5', 'OpenAI API', 'Airtable', 'Zod', 'pdfmake', 'Node.js'],
    badge: 'Hult Prize Global Winner 2025',
    accent: '#a855f7',
    logo: '/stickem.png',
    world: 'stickem',
    detail: {
      overview:
        'Maps STEM lessons to official government curriculum standards across the UK, India, and USA — killing hours of manual planning per teacher per term, and unblocking the procurement requirement in institutional sales.',
      stats: [
        { value: '13', label: 'Curriculum standards (UK, India, USA)' },
        { value: '72+', label: 'Lessons served from Airtable' },
        { value: '3', label: 'Countries deployed' },
        { value: 'temp 0.3', label: 'GPT-4o-mini alignment engine' },
      ],
      flow: [
        {
          label: 'the problem',
          headline: 'Manual curriculum mapping blocks school sales',
          points: ['Slow, error-prone teacher cross-referencing', 'Alignment is a procurement requirement'],
        },
        {
          label: 'the engine',
          headline: 'LLM picks indices — it never writes standards',
          points: ['Index-only selection kills fabricated codes', 'Six-step reasoning, step 1 internal-only', 'Two-tier validation with one auto-retry'],
        },
        {
          label: 'the scale',
          headline: '13 standards · 3 countries · 72+ lessons',
          points: ['UK NC · India CBSE/AI/IT/CS · USA CSTA/NGSS', 'Hindi/Devanagari output with regex validation', 'Server-side PDF export with fit badges'],
        },
      ],
      links: [],
    },
  },
  {
    id: 'aihack-2026',
    title: 'AI Hack 2026',
    subtitle: 'Credit Default Risk Prediction',
    tag: 'Lead Modeler & Technical Documentation · Team StarLabs · March 2026',
    short: 'Credit default prediction on real AIFUL data — Kyoto finalist, the only all-freshman team in the field.',
    tech: ['Python', 'LightGBM', 'CatBoost', 'XGBoost', 'Optuna', 'scikit-learn', 'Google Colab'],
    badge: 'Kyoto Finalist — top 8 nationwide',
    accent: '#e0242c',
    logo: '/aiful-logo.png',
    world: 'aihack',
    detail: {
      overview:
        'AIFUL AI Hackathon 2026: predict 12-month credit default from real anonymized Japanese consumer-finance data. As lead modeler for StarLabs, I took the team from a 4th-place preliminary finish (peak public AUC 0.7635, briefly 2nd) to the live Kyoto final — the only all-freshman team in a top-8 field dominated by Master’s and PhD candidates in math and quantitative finance.',
      stats: [
        { value: '0.7635', label: 'Peak public AUC — briefly 2nd place' },
        { value: '4th', label: 'Preliminary round finish' },
        { value: 'top 8', label: 'Kyoto finalist, nationwide field (finished 8th)' },
        { value: 'only', label: 'All-freshman team to reach the final' },
      ],
      flow: [
        {
          label: 'the arena',
          headline: 'Real consumer-finance default data, scored on AUC',
          points: ['68,546 labeled applications · ~9.7% default rate', '42 features: demographics, income, bureau history', 'Public prelim → private-LB + live judged final'],
        },
        {
          label: 'the diagnosis',
          headline: 'Temporal drift: fold AUC 0.774 → 0.686 across cohorts',
          points: ['Drift is structure, not noise', 'Dual validation: StratifiedKFold + out-of-time split', 'Debt-to-income, delinquency ratios, credit age, log transforms'],
        },
        {
          label: 'the climb',
          headline: 'Briefly 2nd on the public board · 4th at prelims',
          points: ['5 CatBoost + 3 LightGBM variants, LR stacker', 'Logit-space blending, 80/20 rank-sum ensemble', 'HEDGE strategy: performance blend + time-stable blend'],
        },
        {
          label: 'the crisis',
          headline: 'Lost the codebase mid-competition — rebuilt it from math',
          points: ['Reverse-engineered the pipeline from submitted CSVs', 'Solved linear systems over rank arrays to recover blend weights', 'Proof that a good pipeline is auditable from its outputs'],
        },
        {
          label: 'kyoto',
          headline: 'The only freshmen in a room of Master’s and PhDs',
          points: ['Live judged final, March 18–19, Kyoto', 'Bilingual EN/JP decks; Momoka presented, I built the narrative', 'Finished 8th of 8 — in a field we weren’t supposed to reach'],
        },
      ],
      links: [],
    },
  },
  {
    id: 'miru',
    title: 'MIRU',
    subtitle: 'AI Interview Simulation & Evaluation System',
    tag: 'Developer · Team MIRU · 72-Hour Build · March 2026',
    short: 'AI interview coach for foreigners job-hunting in Japan. Bronze — the only APU team on the podium.',
    tech: ['Next.js', 'FastAPI', 'Python', 'TypeScript', 'Claude', 'ElevenLabs'],
    badge: '銅賞 Bronze — Kyutech × Science Tokyo × APU Hackathon 2026',
    accent: '#2ec4b6',
    cover: '/miru-logo.svg',
    coverContain: true,
    coverBg: '#faf5e9',
    logo: '/miru-logo.svg',
    world: 'miru',
    detail: {
      overview:
        'MIRU (見る — to see) is an AI interview coach for foreigners job-hunting in Japan, built in 72 nearly sleepless hours at the Kyutech × Science Tokyo × APU Joint Hackathon 2026. A simulated Japanese HR interviewer runs a formal, low-affect voice interview, quietly scores it on the dimensions Japanese companies actually weigh, then switches to English and tells you what the interviewer was really thinking. Bronze prize — the only APU team on a podium otherwise owned by Japan’s top STEM schools.',
      flow: [
        {
          label: 'the arena',
          headline: 'Business students at an engineering hackathon',
          points: ['Kyutech × Science Tokyo × APU · 15+ teams · 72 hours', 'Theme: Crossing Borders, Creating Connections', '3 business + 1 social science student vs Japan’s top STEM schools'],
        },
        {
          label: 'the gap',
          headline: '“It’s not a language problem. It’s a culture problem.”',
          points: ['“I want to build my career at your company” reads as taking, not giving', 'The invisible air of Japanese interviews, made visible', 'Born from living between cultures at APU'],
        },
        {
          label: 'the engine',
          headline: 'A Japanese HR interviewer, simulated in voice',
          points: ['Built on Claude, grounded in real profiles of major Japanese companies', 'Formal, low-affect Japanese interview style', 'Session-persistent state, adaptive questioning'],
        },
        {
          label: 'the scoring',
          headline: 'Quiet evaluation, honest English debrief',
          points: ['Scored on the dimensions Japanese hiring actually weighs', 'Then the switch: what the interviewer was really thinking', 'Radar debrief + rewritten answers'],
        },
        {
          label: 'the podium',
          headline: '銅賞 — the only APU team up there',
          points: ['I coded near-nonstop: technical design, the working voice product', 'Siddik — research & systems · Jeana — strategy · Takako — the Japanese presentation', 'A business team on an engineering podium'],
        },
      ],
      links: [
        { label: 'GitHub — Frontend', href: 'https://github.com/sameermotwani17-cell/miru-frontend' },
        { label: 'GitHub — Backend', href: 'https://github.com/sameermotwani17-cell/miru-backend' },
        { label: 'APU Feature', href: 'https://www.apu.ac.jp/home/blog/article/?storyid=273' },
      ],
    },
  },
]
