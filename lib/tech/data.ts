/**
 * The tech side. Every claim here comes from the CV (public/cv.pdf) or from the
 * project records in lib/projects.ts. Nothing is invented. Edit the numbers in
 * one place and the page follows.
 */
import { albums, vault, type Album, type VaultItem } from '@/lib/projects'

export const TECH_PROFILE = {
  name: 'Sameer Motwani',
  role: 'Software engineer · AI systems',
  where: 'Beppu, Japan · remote',
  summary:
    'I build and ship production software and AI systems. A slide-delivery rebuild for a live EdTech platform, a server-authoritative multiplayer game, a credit-risk model that reached a national final, and a civic-tech PWA piloted with a city. I measure first, keep a fallback for every failure, and verify with data instead of trusting a report.',
  email: 'sameermotwani17@gmail.com',
  github: 'https://github.com/sameermotwani17-cell',
  linkedin: 'https://www.linkedin.com/in/sameer-motwani-2625a62b5',
  cv: '/cv.pdf',
}

export type Metric = { value: string; label: string; src: string }

/** the numbers, in one strip */
export const TECH_METRICS: Metric[] = [
  { value: '~15x', label: 'faster slide load on simulated Slow-3G (678 ms vs 10 s+)', src: "Stick'Em" },
  { value: '91', label: 'automated tests gating a one-day multiplayer FPS', src: 'SCRAPYARD' },
  { value: '0.7635', label: 'peak public AUC on 68,546 credit applications', src: 'AI Hack 2026' },
  { value: '520+', label: 'organic users, 95.3% adoption intent (n=400)', src: 'GOMI Snap' },
  { value: '13', label: 'curriculum standards mapped across UK, India and USA', src: "Stick'Em" },
  { value: '30 Hz', label: 'server-authoritative tick with client-side prediction', src: 'SCRAPYARD' },
  { value: '36', label: 'SKUs on a live Next.js, Supabase, PayPal and Stripe store', src: 'DK2R' },
  { value: '732', label: 'seats in live availability behind a QR e-ticket flow', src: 'AFRO WEEK' },
]

export type Role = {
  org: string
  note?: string
  title: string
  when: string
  where: string
  bullets: string[]
}

export const TECH_EXPERIENCE: Role[] = [
  {
    org: "Stick'Em Pte Ltd",
    note: 'Singapore EdTech · Hult Prize Global 2025 winner',
    title: 'Contract Software Engineer',
    when: 'May 2026 to present',
    where: 'Remote from Japan',
    bullets: [
      'Rebuilt production slide delivery for teachers in Brunei and the Philippines. Replaced failing Google Slides iframes with a pre-processed WebP pipeline (Slides API, Sharp, Supabase CDN), about 15x faster on simulated Slow-3G, with the legacy iframe kept as an automatic fallback.',
      'Built a virtualized snap-scroll slide viewer (current slide plus or minus 2) with dual IntersectionObserver media gating, validated against 55+ decks and tested across network throttling profiles.',
      'Found and closed a public-bundle secret exposure (NEXT_PUBLIC_ prefix) before merge. Kept SQL-verified QA over agent self-reports and strict branch isolation, zero commits to main.',
      'Shipped a curriculum-alignment engine mapping STEM lessons to 13 government standards, with index-only selection against hallucination and two-tier validation.',
    ],
  },
  {
    org: 'Retro Studios',
    note: 'under StarLabs',
    title: 'Founder and Creative Director',
    when: 'Apr 2026 to present',
    where: 'Beppu, Japan',
    bullets: [
      'Solo-built the brand e-commerce platform for a paid campaign (Next.js 14, Supabase, live PayPal and Stripe on Vercel): 12 country editions, 36 SKUs, 150+ generated hero images.',
      'Designed an 8-layer, reference-locked prompt architecture reused across every edition, and ran a 55-asset manufacturing QA with zero redos.',
    ],
  },
  {
    org: 'GOMI Snap',
    title: 'Founder and CTO',
    when: 'Nov 2025 to 2026',
    where: 'Beppu, Japan',
    bullets: [
      'AI waste-classification PWA (GPT-4V plus a rule engine reverse-engineered from municipal PDFs) for a city with 20+ waste categories. 520+ organic users, 95.3% adoption intent (n=400), engagement with Beppu City government.',
      'Shipped GOMI Snap 2.0 with per-tenant QR logging and property-manager compliance dashboards, then wound the company down and folded it into StarLabs.',
    ],
  },
]

export const TECH_EDUCATION = [
  {
    org: 'Ritsumeikan Asia Pacific University (APU)',
    title: 'B.B.A., Finance',
    when: 'Expected 2029',
    note: '1st place, APU Annual Hackathon 2025. 1st runner-up and Best Speaker, Hult Prize APU Campus Round 2026.',
  },
  {
    org: 'YOUNITED International School, Israel',
    title: 'International Baccalaureate Diploma',
    when: '2025',
    note: 'Higher Level: Computer Science, English, Business.',
  },
]

export type BuildLink = { label: string; href: string }

export type Build = {
  id: string
  /** the record in lib/projects.ts */
  record: Album | VaultItem
  /** one-line technical hook */
  hook: string
  links: BuildLink[]
}

const rec = (id: string) => {
  const r = [...albums, ...vault].find((x) => x.id === id)
  if (!r) throw new Error(`tech build record missing: ${id}`)
  return r as Album | VaultItem
}

/** the flagship engineering case files */
export const TECH_BUILDS: Build[] = [
  {
    id: 'slideviewer',
    record: rec('slideviewer'),
    hook: 'Pre-render once, serve WebP from a CDN, keep the iframe as the fallback.',
    links: [],
  },
  {
    id: 'scrapyard',
    record: rec('scrapyard'),
    hook: 'A ~200-line spec executed milestone by milestone: server-authoritative netcode on Durable Objects.',
    links: [{ label: 'Play it', href: 'https://scrapyard-lake.vercel.app' }],
  },
  {
    id: 'aihack-2026',
    record: rec('aihack-2026'),
    hook: 'Temporal drift found, dual validation designed, a lost pipeline rebuilt from rank arrays.',
    links: [],
  },
  {
    id: 'stickem-curriculum',
    record: rec('stickem-curriculum'),
    hook: 'The model picks indices, never writes standards. Two-tier validation with one automatic retry.',
    links: [],
  },
  {
    id: 'gomi-snap',
    record: rec('gomi-snap'),
    hook: 'GPT-4V in front of a rule engine reverse-engineered from municipal PDFs.',
    links: [{ label: 'GOMI Snap 2.0', href: 'https://gomisnap.org/2point0' }],
  },
  {
    id: 'miru',
    record: rec('miru'),
    hook: 'A voice interviewer on Claude, scored on what Japanese hiring weighs. 72 hours.',
    links: [
      { label: 'Frontend', href: 'https://github.com/sameermotwani17-cell/miru-frontend' },
      { label: 'Backend', href: 'https://github.com/sameermotwani17-cell/miru-backend' },
    ],
  },
]

export type WebBuild = { id: string; name: string; what: string; stack: string[]; live: string; repo?: string }

/** shipped web products, shown as a compact grid */
export const TECH_WEB: WebBuild[] = [
  {
    id: 'dk2r',
    name: 'DK2R store',
    what: '12 country editions, 36 SKUs, live checkout. Built solo for a paying client.',
    stack: ['Next.js 14', 'Supabase', 'PayPal', 'Stripe', 'Vercel'],
    live: 'https://dkai2ray.company/',
  },
  {
    id: 'afro-week',
    name: 'AFRO WEEK booking',
    what: '732 seats in live availability, a seat picker, free admission by name and email, instant QR e-ticket.',
    stack: ['Next.js 14', 'Supabase (Postgres)', 'TypeScript', 'Tailwind'],
    live: 'https://millennium-hall.vercel.app',
    repo: 'https://github.com/sameermotwani17-cell/millennium-hall-booking',
  },
  {
    id: 'first-light',
    name: 'First Light',
    what: 'Photo culling by plain-English brief: 1,847 frames in, a ranked shortlist out. Nothing full size leaves the machine.',
    stack: ['Vision model', 'Local-first processing'],
    live: 'https://first-light-alpha.vercel.app/',
  },
  {
    id: 'too-easy',
    name: 'TOO EASY',
    what: 'A product-first commerce site built around restraint: five pieces, one grid. Plain HTML and CSS, no framework.',
    stack: ['HTML', 'CSS'],
    live: 'https://too-easy-seven.vercel.app',
    repo: 'https://github.com/sameermotwani17-cell/too-easy',
  },
  {
    id: 'danflix',
    name: 'DANFLIX',
    what: 'A streaming interface built from Netflix design tokens: profile gate, hover previews, modals, a subtitled player.',
    stack: ['Design tokens', 'Custom player'],
    live: 'https://danflix-murex.vercel.app',
  },
  {
    id: 'plastivore',
    name: 'PLASTIVORE',
    what: 'A scroll-scrubbed product film and an exploded sole diagram for a concept brand.',
    stack: ['Scroll-scrubbed video', 'Exploded diagram'],
    live: 'https://plastivore-plum.vercel.app',
  },
  {
    id: 'github-agent',
    name: 'GitHub agent',
    what: 'Manage any GitHub repo by typing a prompt: update READMEs, reorganize files, make changes.',
    stack: ['n8n', 'Claude Code', 'Express', 'Docker'],
    live: 'https://retro-github-agent.vercel.app',
    repo: 'https://github.com/sameermotwani17-cell/retro_github_agent',
  },
]

export type SkillGroup = { group: string; skills: { name: string; used: string[] }[] }

/** column codes for the evidence matrix */
export const MATRIX_COLS = [
  { id: 'sv', label: 'SlideViewer' },
  { id: 'ce', label: 'Curriculum' },
  { id: 'gs', label: 'GOMI' },
  { id: 'ai', label: 'AI Hack' },
  { id: 'mr', label: 'MIRU' },
  { id: 'sy', label: 'SCRAPYARD' },
  { id: 'dk', label: 'DK2R' },
] as const

/** each skill, and the builds that prove it */
export const TECH_SKILLS: SkillGroup[] = [
  {
    group: 'Programming',
    skills: [
      { name: 'TypeScript', used: ['gs', 'mr'] },
      { name: 'JavaScript', used: ['ce', 'sy'] },
      { name: 'Python', used: ['ai', 'mr'] },
      { name: 'SQL', used: ['sv', 'dk'] },
      { name: 'React', used: ['ce', 'gs'] },
      { name: 'Next.js', used: ['sv', 'mr', 'dk'] },
      { name: 'FastAPI', used: ['mr'] },
      { name: 'Node and Express', used: ['ce', 'gs'] },
      { name: 'Three.js and WebSockets', used: ['sy'] },
    ],
  },
  {
    group: 'AI and ML',
    skills: [
      { name: 'LightGBM, CatBoost, XGBoost', used: ['ai'] },
      { name: 'Optuna and scikit-learn', used: ['ai'] },
      { name: 'Claude API', used: ['mr', 'sy'] },
      { name: 'OpenAI APIs and vision', used: ['gs', 'ce'] },
      { name: 'Prompt architecture', used: ['dk'] },
      { name: 'LLM evaluation design', used: ['ce', 'mr'] },
    ],
  },
  {
    group: 'Infrastructure',
    skills: [
      { name: 'Supabase and Postgres', used: ['sv', 'dk'] },
      { name: 'Vercel', used: ['sy', 'dk'] },
      { name: 'Cloudflare Durable Objects', used: ['sy'] },
      { name: 'Google Cloud APIs', used: ['sv'] },
      { name: 'CDN pipelines and virtualization', used: ['sv'] },
      { name: 'Automated testing', used: ['sy'] },
    ],
  },
]

export const TECH_LANGUAGES = 'English (native) · Spanish (intermediate) · Japanese (developing)'

export const TECH_PRINCIPLES: { title: string; body: string; proof: string }[] = [
  {
    title: 'Measure before you claim',
    body: 'Slow-3G was the baseline, so it was the benchmark. Successful loads are logged too, because a failure count without a denominator means nothing.',
    proof: 'SlideViewer',
  },
  {
    title: 'Every failure has a fallback',
    body: 'A broken pipeline never shows a blank lesson. The original iframe takes over automatically.',
    proof: 'SlideViewer',
  },
  {
    title: 'Verify with data, not reports',
    body: 'SQL-verified QA over agent self-reports, strict branch isolation, zero commits to main.',
    proof: "Stick'Em",
  },
  {
    title: 'Constrain the model',
    body: 'The model selects indices and never writes standards. Two-tier validation with one retry kills fabricated codes.',
    proof: 'Curriculum engine',
  },
  {
    title: 'Validate for the future',
    body: 'Fold AUC fell from 0.774 to 0.686 across cohorts, so validation is StratifiedKFold plus an out-of-time split.',
    proof: 'AI Hack 2026',
  },
  {
    title: 'Spec first, tests as gates',
    body: 'A ~200-line spec, executed in milestones, each gated by proof of run and 91 automated tests.',
    proof: 'SCRAPYARD',
  },
  {
    title: 'Close security gaps early',
    body: 'Caught a public-bundle secret exposure from a NEXT_PUBLIC_ prefix before it merged.',
    proof: "Stick'Em",
  },
]
