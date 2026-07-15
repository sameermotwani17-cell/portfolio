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
  /** scrapyard uses the stencil face */
  stencil?: boolean
  /** monochrome black/white case-study theme (RETRO raven) */
  mono?: boolean
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
  mono?: boolean
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
    tag: "Contract Software Engineer · Stick'Em Pte Ltd · May 2026",
    short:
      'Rebuilt the slide-delivery infrastructure of a live EdTech platform serving teachers in Brunei and the Philippines.',
    tracklist: ['01 — The Regression', '02 — 678ms', '03 — Two Lanes', '04 — The Fallback'],
    tech: ['Next.js', 'React', 'Node', 'Sharp', 'Supabase / Postgres', 'Google Slides & Drive API', 'Vercel'],
    badge: 'Hult Prize Global Winner client',
    accent: '#a855f7',
    cover: null,
    logo: '/stickem.png',
    detail: {
      overview:
        "Hired by the CEO of Stick'Em — Hult Prize Global 2025 winner — to fix lesson delivery that black-screened on slow connections. Replaced Google Slides iframes with a pre-processed WebP pipeline and a virtualized viewer, legacy iframe kept as automatic fallback.",
      stats: [
        { value: '~15x', label: 'Faster on simulated Slow-3G (678ms vs 10s+)' },
        { value: '55+', label: 'Slides per deck validated in the viewer' },
        { value: '2', label: 'Countries of teachers served' },
        { value: '1', label: 'Public-bundle secret caught before merge' },
      ],
      flow: [
        {
          label: 'the problem',
          headline: 'Google Slides iframes died on slow connections',
          points: ['Teachers in Brunei & the Philippines', 'Revenue-linked production failure', 'Black screens, broken GIFs'],
        },
        {
          label: 'the rebuild',
          headline: 'Slides API → Sharp → WebP on a CDN',
          points: ['Magic-byte GIF detection on raw Drive buffers', 'Revision-ID cache invalidation', 'EMU → CSS coordinate translation for overlays'],
        },
        {
          label: 'the viewer',
          headline: 'Virtualized snap-scroll: current slide ± 2',
          points: ['Dual IntersectionObserver media gating', 'Two-lane fetch: WebP direct, GIFs queued', 'YouTube mounts only when visible'],
        },
        {
          label: 'the receipts',
          headline: '678ms vs 10s+ on Slow-3G',
          points: ['SQL-verified QA, never self-reports', 'NEXT_PUBLIC_ secret exposure stopped pre-merge', 'Zero commits to main, fallback-first'],
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
    tag: 'Founder & CEO · Nov 2025 – 2026 · folded into StarLabs',
    short: 'AI waste-classification PWA for Japanese municipalities. Wound down and folded into StarLabs.',
    tracklist: ['01 — 20 Categories', '02 — 500 Users', '03 — City Hall', '04 — StarLabs'],
    tech: ['React', 'TypeScript', 'Express.js', 'OpenAI Vision API', 'PWA'],
    badge: '1st Place — APU Hackathon 2025',
    accent: '#3f9142',
    cover: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80',
    detail: {
      overview:
        'Snap a photo of your trash, get instant sorting instructions for Beppu’s 20+ waste categories. Built, validated, piloted with the city — then honestly wound down and folded into StarLabs.',
      stats: [
        { value: '95.3%', label: 'Survey adoption intent (n=400)' },
        { value: '500+', label: 'Organic users · zero paid acquisition' },
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
      links: [],
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
      links: [
        { label: 'Live App', href: 'https://coolcompanies.replit.app' },
        { label: 'GitHub', href: 'https://github.com/sameermotwani17-cell/stickem-curriculum-helper' },
      ],
    },
  },
  {
    id: 'github-agent',
    title: 'Retro GitHub Agent',
    subtitle: 'Autonomous AI Coding Agent',
    tag: 'Independent Builder · Feb 2026–Present',
    short: 'Fully autonomous AI agent that creates and edits GitHub repos from a single text prompt.',
    tech: ['Claude Code CLI', 'n8n', 'Node.js', 'Express', 'ngrok', 'GitHub', 'Vercel'],
    badge: null,
    accent: '#f97316',
    detail: {
      overview:
        'A hand-rolled coding agent: natural-language prompt in, autonomous clone-edit-commit-push out. Built from scratch at 3AM as a first systems project — comparable in concept to Devin, with zero frameworks.',
      flow: [
        {
          label: 'the loop',
          headline: 'prompt → clone → edit → commit → push',
          points: ['n8n webhook → local Express via ngrok', 'Claude Code CLI spawned with full repo context', 'Deterministic <file> tag parsing'],
        },
        {
          label: 'why it matters',
          headline: 'Agent architecture, end to end',
          points: ['Trigger → orchestration → tool use → side effects', 'Chains APIs, CLIs, and webhooks into one system'],
        },
        {
          label: 'honest limits',
          headline: 'v1 has sharp edges — documented, not hidden',
          points: ['No auth on the webhook', 'No cost ceiling per run', 'No rollback on bad changes'],
        },
      ],
      links: [],
    },
  },
  {
    id: 'aihack-2026',
    title: 'AI Hack 2026',
    subtitle: 'Credit Default Risk Prediction',
    tag: 'Lead Modeling & Risk Strategy · 2026',
    short: 'Production-grade credit risk scoring system. Top ~8 finish at Kyoto Finals (AIFUL).',
    tech: ['Python', 'CatBoost', 'LightGBM', 'scikit-learn', 'pandas', 'NumPy', 'SciPy'],
    badge: 'Top ~8 — AI Hack 2026 Final Round · Kyoto',
    accent: '#e0242c',
    detail: {
      overview:
        'Predicting 12-month consumer-loan default on real AIFUL data, under class imbalance and temporal drift. Competed as Team StarLabs — Kyoto Final Round, Top ~8.',
      stats: [
        { value: '~0.763', label: 'AUC-ROC — peak public leaderboard' },
        { value: 'Top ~8', label: 'Final Round finish · Kyoto' },
        { value: '77+', label: 'Engineered features' },
        { value: '~200', label: 'Submissions managed' },
      ],
      flow: [
        {
          label: 'the task',
          headline: 'Predict 12-month default on real AIFUL data',
          points: ['Class imbalance + temporal distribution shift', 'Team StarLabs → Kyoto finals'],
        },
        {
          label: 'the signal',
          headline: '77+ engineered features drove ~0.76 AUC',
          points: ['Debt-to-income, utilization, delinquency × exposure', 'Drift-aware feature × time interactions'],
        },
        {
          label: 'the validation',
          headline: 'Built for the private leaderboard, not the public one',
          points: ['Temporal GroupKFold + adversarial validation', 'Time-sliced AUC diagnostics per cohort', 'Rejected leaky high-scoring models'],
        },
        {
          label: 'the finish',
          headline: 'Top ~8 · Kyoto Final Round',
          points: ['Logit-space blending: +0.001–0.002 AUC over naive averaging', 'Public-LB model + time-stable hedge portfolio'],
        },
      ],
      links: [],
    },
  },
  {
    id: 'miru',
    title: 'MIRU',
    subtitle: 'AI Interview Simulation & Evaluation System',
    tag: 'Full-Stack AI Builder · 2026',
    short: 'Stateful AI interview engine with structured scoring and a Japanese HR cultural reasoning layer.',
    tech: ['Next.js', 'FastAPI', 'Python', 'TypeScript', 'OpenAI', 'ElevenLabs'],
    badge: null,
    accent: '#14b8a6',
    detail: {
      overview:
        'An exercise in LLM evaluation design: deterministic rubrics, per-turn scoring with session aggregation, schema-validated outputs — wrapped in a real-time voice interview that reads your answers through a Japanese HR lens.',
      flow: [
        {
          label: 'the engine',
          headline: 'Stateful interviews, not chatbot scripts',
          points: ['Session-persistent transcripts + question progression', 'Adaptive follow-ups from prior answers', 'Strict /turn /results /debrief contracts'],
        },
        {
          label: 'the scoring',
          headline: 'Deterministic rubrics, 0–10 per turn',
          points: ['communication · clarity · cultural_fit · problem_solving', 'Schema-validated, aggregated per session'],
        },
        {
          label: 'the culture layer',
          headline: 'Western answers, read through Japanese HR',
          points: ['"I achieved X" → flagged on Wa + humility', 'Internal evaluator monologue + rewrites'],
        },
        {
          label: 'the debrief',
          headline: 'Radar charts + a full voice pipeline',
          points: ['ElevenLabs TTS, mic input, silence detection', 'Async orchestration across LLM + TTS'],
        },
      ],
      links: [],
    },
  },
]
