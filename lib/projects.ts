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

export type Album = {
  id: string
  title: string
  subtitle: string
  tag: string
  short: string
  /** hover-state "tracklist" lines on the album cover */
  tracklist: string[]
  tech: string[]
  badge: string | null
  accent: string
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

// ─── The four featured albums ─────────────────────────────────────────────────

export const albums: Album[] = [
  {
    id: 'slideviewer',
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
    title: 'RETRO Studios',
    subtitle: 'AI Cinematic Production · StarLabs',
    tag: 'Founder & Creative Director · Founded April 2026',
    short:
      'One-person AI creative studio producing agency-grade cinematic brand content — running a paid 12-country campaign.',
    tracklist: ["01 — Director's Brief", '02 — Anti-Perfection', '03 — 12 Editions', '04 — One Person'],
    tech: ['GPT Image 2', 'Higgsfield Cinema Studio', 'Kling 3.0', 'Seedance 2.0', 'Suno', 'CapCut', 'Next.js 14', 'Supabase', 'Vercel'],
    badge: 'Live paid client campaign',
    accent: '#f5f5f2',
    cover: '/scenes/retro-raven.webp',
    mono: true,
    world: 'retro',
    detail: {
      overview:
        'One person, an AI-native stack, and the thesis that it can outproduce a full creative agency. Currently running full creative direction and technical production for DK2R Football Wear — a premium 12-country jersey brand tied to the 2026 FIFA World Cup.',
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
          points: ['Founded April 2026 under StarLabs', 'Statics, reels, commercial ads — no crew'],
        },
        {
          label: 'the client',
          headline: 'DK2R — 2026 World Cup capsule',
          points: ['12 editions · 36 SKUs · 300 numbered pieces each', '60-image campaigns: Mexico, Brazil, USA, England, Argentina', 'Solo-built Next.js + Supabase store, live PayPal'],
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
