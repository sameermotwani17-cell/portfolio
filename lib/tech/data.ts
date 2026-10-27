/**
 * The tech side. Every claim here comes from the CV (public/cv.pdf), the
 * project records in lib/projects.ts or the Ajiwow portfolio record. Nothing is
 * invented, and nothing from the "keep private" list is used (no fees, no IDs,
 * no preview URLs). Edit the numbers in one place and the page follows.
 */
import { SHOW_AJIWOW } from '@/lib/config'
import { albums, vault, type FlowStage, type ProjectLink, type ProjectStat } from '@/lib/projects'

export const TECH_PROFILE = {
  name: 'Sameer Motwani',
  role: 'Forward deployed engineer · AI systems',
  where: 'Beppu, Japan · remote',
  summary:
    'I embed with a team, ship into real conditions, measure what happened and hand over something they can run without me. A slide pipeline for classrooms on Slow-3G, a multiplayer game with server-authoritative netcode, a credit-risk model that reached a national final, and a civic-tech app taken to Beppu City.',
  plain:
    'In plain English: I make software that works for real people on bad internet, I test it honestly, and I plan for the day something breaks.',
  email: 'sameermotwani17@gmail.com',
  github: 'https://github.com/sameermotwani17-cell',
  linkedin: 'https://www.linkedin.com/in/sameer-motwani-2625a62b5',
  cv: '/cv.pdf',
}

export type Metric = { value: string; label: string; src: string }

/** the numbers, in one strip */
const ALL_TECH_METRICS: Metric[] = [
  { value: '~15x', label: 'faster slide load on simulated Slow-3G (678 ms vs 10 s+)', src: "Stick'Em" },
  { value: '91', label: 'automated tests gating a one-day multiplayer FPS', src: 'SCRAPYARD' },
  { value: '0.7635', label: 'peak public AUC on 68,546 credit applications', src: 'AI Hack 2026' },
  { value: '520+', label: 'organic users, 95.3% adoption intent (n=400)', src: 'GOMI Snap' },
  { value: '13', label: 'curriculum standards mapped across UK, India and USA', src: "Stick'Em" },
  { value: '30 Hz', label: 'server-authoritative tick with client-side prediction', src: 'SCRAPYARD' },
  { value: '31', label: 'point automated check on every print export', src: 'Ajiwow' },
  { value: '36', label: 'SKUs on a live Next.js, Supabase, PayPal and Stripe store', src: 'DK2R' },
]
export const TECH_METRICS: Metric[] = ALL_TECH_METRICS.filter((m) => SHOW_AJIWOW || m.src !== 'Ajiwow')

export type Role = {
  org: string
  note?: string
  title: string
  when: string
  where: string
  bullets: string[]
}

const ALL_TECH_EXPERIENCE: Role[] = [
  {
    org: "Stick'Em Pte Ltd",
    note: 'Singapore EdTech · Hult Prize Global 2025 winner',
    title: 'Contract Software Engineer',
    when: 'May 2026 to Sep 2026 (contract completed)',
    where: 'Remote from Japan',
    bullets: [
      'Rebuilt production slide delivery for teachers in Brunei and the Philippines. Replaced failing Google Slides iframes with a pre-processed WebP pipeline (Slides API, Sharp, Supabase CDN), about 15x faster on simulated Slow-3G, with the legacy iframe kept as an automatic fallback.',
      'Built a virtualized snap-scroll slide viewer (current slide plus or minus 2) with dual IntersectionObserver media gating, validated against 55+ decks and tested across network throttling profiles.',
      'Found and closed a public-bundle secret exposure (NEXT_PUBLIC_ prefix) before merge. Kept SQL-verified QA over agent self-reports and strict branch isolation, zero commits to main.',
      'Shipped a curriculum-alignment engine mapping STEM lessons to 13 government standards, with index-only selection against hallucination and two-tier validation.',
    ],
  },
  {
    org: 'Ajiwow Inc. (ROKU SHOKU)',
    note: 'Tokyo food-tech startup · Techstars Tokyo 2026',
    title: 'Freelance Creative Technologist',
    when: 'Sep 30 to Nov 2026',
    where: 'Tokyo · remote',
    bullets: [
      'Built a JA/EN Astro site and deployed it on Azure Static Web Apps in the client’s own tenant, with a GitHub Actions push-to-deploy pipeline and per-PR preview URLs. The finish was handed to in-house engineers.',
      'Set up company-grade source control: the repo moved into the client’s GitHub org with history intact, SSH identity separation, Copilot Business, and a rule that AI reviews before engineers do.',
      'Scripted a print pipeline in Python: one master file out to print PDFs and share PDFs under 10 MB, with a 31-point automated check against client feedback.',
      'Audio pipeline: stem separation (demucs), AI voice variants (ElevenLabs) and loudness mastering to -14 LUFS, so a voiceover can be swapped without losing the music.',
      'Shipped Brand System v1.0 in 2 days: an 18-page guide, colour and type tokens as CSS and JSON, a Claude design system and a skill the team can reuse.',
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
export const TECH_EXPERIENCE: Role[] = ALL_TECH_EXPERIENCE.filter((r) => SHOW_AJIWOW || !r.org.startsWith('Ajiwow'))

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
  title: string
  subtitle: string
  tag: string
  accent: string
  tech: string[]
  /** one-line technical hook */
  hook: string
  /** the same thing, for a human */
  plain: string
  overview: string
  stats: ProjectStat[]
  flow: FlowStage[]
  links: BuildLink[]
  /** a labelled left-to-right pipeline, drawn as a diagram */
  diagram?: string[]
  /** dated milestones */
  timeline?: { date: string; what: string }[]
  quote?: { text: string; who: string }
}

const rec = (id: string) => {
  const r = [...albums, ...vault].find((x) => x.id === id)
  if (!r) throw new Error(`tech build record missing: ${id}`)
  return r
}

const fromRecord = (id: string, hook: string, plain: string, links: BuildLink[]): Build => {
  const r = rec(id)
  const extra: ProjectLink[] = (r.detail.links ?? []).filter((l) => !links.some((x) => x.href === l.href))
  return {
    id,
    title: r.title,
    subtitle: r.subtitle,
    tag: r.tag,
    accent: r.accent,
    tech: 'tech' in r ? r.tech : [],
    hook,
    plain,
    overview: r.detail.overview,
    stats: (r.detail.stats ?? []).slice(0, 4),
    flow: r.detail.flow,
    links: [...links, ...extra],
  }
}

/** the flagship engineering case files */
const ALL_TECH_BUILDS: Build[] = [
  fromRecord(
    'slideviewer',
    'Pre-render once, serve WebP from a CDN, keep the iframe as the fallback.',
    'Teachers on slow internet were staring at a black screen. I turned each lesson into small pre-made pictures that load almost instantly, and kept the old way as a safety net so a lesson never goes blank.',
    [],
  ),
  {
    id: 'ajiwow',
    title: 'Ajiwow site and pipelines',
    subtitle: 'Brand, bilingual site and CI/CD on Azure',
    tag: 'Freelance Creative Technologist · Ajiwow Inc. · Sep to Nov 2026',
    accent: '#cc4210',
    tech: ['Astro', 'Tailwind v4', 'Astro i18n', 'Azure Static Web Apps', 'GitHub Actions', 'Python', 'demucs', 'ElevenLabs'],
    hook: 'Push to main, and it is live: Astro on Azure Static Web Apps with preview URLs per pull request.',
    plain:
      'A food-tech startup needed a brand, a Japanese and English website, a poster and videos, fast. I built the website so it publishes itself whenever code is pushed, and scripted the poster and audio work so a change takes minutes, not a redo.',
    overview:
      'Ajiwow records a chef’s cooking to the second, degree and gram and replays it on an induction cooktop. As the only builder on a three-week engagement I shipped the brand system, a bilingual website draft on the client’s own Azure tenant, a print pipeline and the audio tooling for short videos, then handed the website finish to their in-house engineers.',
    stats: [
      { value: '4 days', label: 'From first quote to an approved brand system' },
      { value: '31', label: 'Point automated check on every print export' },
      { value: '2', label: 'Languages, JA and EN, from one Astro codebase' },
      { value: '-14 LUFS', label: 'Loudness target for every mastered video' },
    ],
    flow: [
      {
        label: 'the brief',
        headline: 'A product with no identity and a hard time cap',
        points: [
          'Four deliverables: a bilingual website, a demo video, a tourist poster and a tourist short',
          'About 14 hours a week inside a 28-hour weekly cap alongside a full course load',
          'One approver, the CEO, so every round had to be fast and clear',
        ],
      },
      {
        label: 'the stack',
        headline: 'Static, bilingual, on the client’s own cloud',
        points: [
          'Astro 7 static build on Node 22 with Tailwind v4 and the brand tokens',
          'Astro i18n routing, Japanese at the root and English under /en, with a controlled glossary',
          'Azure Static Web Apps on the free plan, provisioned in the client’s own tenant',
        ],
      },
      {
        label: 'the pipeline',
        headline: 'Push-to-deploy from day one',
        points: [
          'GitHub Actions builds and deploys every push to main',
          'Per-pull-request preview URLs so the CEO could review before anything shipped',
          'DNS cutover planned with the client’s engineer: a CNAME for www and a TXT record to verify the apex',
        ],
      },
      {
        label: 'the hygiene',
        headline: 'Work that is easy to take over',
        points: [
          'Repo moved from a personal account into the client’s GitHub org with history intact',
          'SSH keys per identity, so company and personal work never mix',
          'AI reviews first, then humans: the client adopted that as a rule',
        ],
      },
      {
        label: 'the print and audio kit',
        headline: 'Scripts instead of redos',
        points: [
          'Python render kit: one master file out to print PDFs and share PDFs under 10 MB, then a 31-point check',
          'Stem separation with demucs, AI voice variants with ElevenLabs, loudness mastering to -14 LUFS and -1 dBTP',
          'A voiceover swapped in minutes without losing the music or sound effects',
        ],
      },
      {
        label: 'the handoff',
        headline: 'Draft delivered, finish handed over',
        points: [
          'First draft delivered on day 9, then the finish moved to in-house engineers',
          'Brand pack, tokens and a design skill shipped so the team can work without me',
        ],
      },
    ],
    links: [{ label: 'ajiwow.co.jp', href: 'https://ajiwow.co.jp/en/' }],
    diagram: ['git push to main', 'GitHub Actions build', 'Azure Static Web Apps', 'ajiwow.co.jp'],
    quote: { text: 'Mind blowing!! You really are a pro!!!', who: 'Tomoko Nomoto, CEO, Ajiwow, on the brand system' },
    timeline: [
      { date: 'Sep 30', what: 'Quote, call and scope confirmed: four deliverables' },
      { date: 'Oct 2', what: 'Four brand directions sent' },
      { date: 'Oct 3', what: 'Direction approved, symbol redrawn, Brand System v1.0 shipped, Azure access granted' },
      { date: 'Oct 4 to 5', what: 'Poster drafts 1 to 4 through five feedback rounds' },
      { date: 'Oct 6', what: 'Poster final. Azure Static Web App and GitHub Actions pipeline live on a preview' },
      { date: 'Oct 8', what: 'Product brief written from public sources to fix the site’s story' },
      { date: 'Oct 9 to 10', what: 'Website first draft delivered. Repo moved into the client’s GitHub org' },
      { date: 'Oct 11 to 12', what: 'Demo video brief locked and rough cut delivered' },
      { date: 'Oct 14', what: 'Scope changed: website finish to in-house engineers, nine short videos added' },
      { date: 'Oct 16 to 17', what: 'First short final, then five re-voiced finals delivered the same day' },
    ],
  },
  fromRecord(
    'scrapyard',
    'A ~200-line spec executed milestone by milestone: server-authoritative netcode on Durable Objects.',
    'I wrote a two-page plan and let an AI build a real multiplayer shooter from it in a day. The server decides who got shot, so nobody can cheat, and your own player moves instantly so it never feels laggy.',
    [{ label: 'Play it', href: 'https://scrapyard-lake.vercel.app' }],
  ),
  fromRecord(
    'aihack-2026',
    'Temporal drift found, dual validation designed, a lost pipeline rebuilt from rank arrays.',
    'I trained models to guess who might not repay a loan. The applicants changed over time, so a model that looked great stopped working. I tested on future data to stay honest, and when we lost our code I rebuilt it from the results.',
    [],
  ),
  fromRecord(
    'stickem-curriculum',
    'The model picks indices, never writes standards. Two-tier validation with one automatic retry.',
    'A teacher picks a lesson and the tool shows which official curriculum goals it covers. The AI can only choose from a real list, so it cannot make up fake standards.',
    [],
  ),
  fromRecord(
    'gomi-snap',
    'GPT-4V in front of a rule engine reverse-engineered from municipal PDFs.',
    'Take a photo of your rubbish and get told exactly how to sort it under Beppu’s 20+ categories. The app reads the photo, then checks the city’s own rules.',
    [{ label: 'GOMI Snap 2.0', href: 'https://gomisnap.org/2point0' }],
  ),
  fromRecord(
    'miru',
    'A voice interviewer on Claude, scored on what Japanese hiring weighs. 72 hours.',
    'A practice job interview in voice, run by a Japanese-style interviewer, followed by an honest English debrief on how you came across.',
    [
      { label: 'Frontend', href: 'https://github.com/sameermotwani17-cell/miru-frontend' },
      { label: 'Backend', href: 'https://github.com/sameermotwani17-cell/miru-backend' },
    ],
  ),
]
export const TECH_BUILDS: Build[] = ALL_TECH_BUILDS.filter((b) => SHOW_AJIWOW || b.id !== 'ajiwow')

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

/** column codes for the evidence matrix */
const ALL_COLS = [
  { id: 'sv', label: 'SlideViewer' },
  { id: 'ce', label: 'Curriculum' },
  { id: 'gs', label: 'GOMI' },
  { id: 'ai', label: 'AI Hack' },
  { id: 'mr', label: 'MIRU' },
  { id: 'sy', label: 'SCRAPYARD' },
  { id: 'dk', label: 'DK2R' },
  { id: 'aj', label: 'Ajiwow' },
] as const

export const MATRIX_COLS = ALL_COLS.filter((c) => SHOW_AJIWOW || c.id !== 'aj')

export type Skill = { name: string; plain: string; used: string[] }
export type SkillGroup = { group: string; skills: Skill[] }

/** each skill: the technical name, what it means for a human, and the builds that prove it */
export const TECH_SKILLS: SkillGroup[] = [
  {
    group: 'Programming',
    skills: [
      { name: 'TypeScript', plain: 'JavaScript with a safety net. The editor catches whole classes of mistakes before the code ever runs.', used: ['gs', 'mr'] },
      { name: 'JavaScript', plain: 'The language of the web. I use it on the page and on the server.', used: ['ce', 'sy'] },
      { name: 'Python', plain: 'My tool for data, machine learning and backend services.', used: ['ai', 'mr', 'aj'] },
      { name: 'SQL', plain: 'Asking a database exact questions. I also use it to check what really happened instead of trusting a report.', used: ['sv', 'dk'] },
      { name: 'React', plain: 'Builds screens out of small reusable pieces that update when the data changes.', used: ['ce', 'gs'] },
      { name: 'Next.js', plain: 'Turns React into fast, search-friendly sites and apps with the server and the page in one project.', used: ['sv', 'mr', 'dk'] },
      { name: 'Astro and i18n', plain: 'A site builder that ships almost no JavaScript, with a Japanese and an English version of every page.', used: ['aj'] },
      { name: 'FastAPI', plain: 'A Python framework for the server side: the part that answers when the screen asks for something.', used: ['mr'] },
      { name: 'Node and Express', plain: 'JavaScript on the server, used for small, readable APIs.', used: ['ce', 'gs'] },
      { name: 'Three.js and WebSockets', plain: '3D in the browser, and a live open line between every player and the server.', used: ['sy'] },
    ],
  },
  {
    group: 'AI and ML',
    skills: [
      { name: 'LightGBM, CatBoost, XGBoost', plain: 'Models made of many small decision trees. The standard way to predict from tables of data, like who may default.', used: ['ai'] },
      { name: 'Optuna and scikit-learn', plain: 'Tools that tune models automatically and test them fairly.', used: ['ai'] },
      { name: 'Claude API', plain: 'Building features on top of Claude: voice interviews, agents and AI-written code held to tests.', used: ['mr', 'sy', 'aj'] },
      { name: 'OpenAI APIs and vision', plain: 'Using GPT models to read photos and text inside real products.', used: ['gs', 'ce'] },
      { name: 'Prompt architecture', plain: 'Prompts written as layered, reusable systems, so 150+ images keep one look.', used: ['dk'] },
      { name: 'LLM evaluation design', plain: 'Checking an AI’s answers are valid: index-only picks, two checks, one retry.', used: ['ce', 'mr'] },
    ],
  },
  {
    group: 'Infrastructure',
    skills: [
      { name: 'Supabase and Postgres', plain: 'A hosted database with file storage: where the data and the images live.', used: ['sv', 'dk'] },
      { name: 'Vercel', plain: 'Hosting that publishes every change automatically.', used: ['sy', 'dk'] },
      { name: 'Azure Static Web Apps', plain: 'Microsoft’s hosting for websites, set up inside the client’s own account.', used: ['aj'] },
      { name: 'GitHub Actions CI/CD', plain: 'Every push is built and published by a robot, with a preview link per change.', used: ['aj'] },
      { name: 'Cloudflare Durable Objects', plain: 'A tiny always-on server for each game room, close to the players.', used: ['sy'] },
      { name: 'Google Cloud APIs', plain: 'Reading Google Slides by code, to turn whole decks into images.', used: ['sv'] },
      { name: 'CDN pipelines and virtualization', plain: 'Serve files from servers near the user, and only draw what is on screen.', used: ['sv'] },
      { name: 'Automated testing', plain: '91 tests that must pass before a milestone counts as done.', used: ['sy'] },
    ],
  },
]

TECH_SKILLS.push(
  {
    group: 'Automation and agents',
    skills: [
      { name: 'n8n workflow orchestration', plain: 'Wiring apps together so work happens without anyone clicking, like a repo that updates itself from a sentence.', used: [] },
      { name: 'Agent architecture and Claude Code pipelines', plain: 'Giving an AI a job, the tools to do it and gates it must pass, instead of one giant prompt.', used: ['sy', 'aj'] },
      { name: 'Spec-driven development', plain: 'Write the plan first, let the machine build to it, and check every milestone with proof it ran.', used: ['sy'] },
      { name: 'Webhooks and integrations', plain: 'Making one service tell another when something happens, like a booking triggering an e-ticket.', used: ['ce'] },
    ],
  },
  {
    group: 'Security',
    skills: [
      { name: 'Web security', plain: 'Keeping secrets out of public code and closing holes before they ship.', used: ['sv'] },
      { name: 'Penetration testing and network security', plain: 'Learning how attackers think so defences get built in at the start. TryHackMe certified.', used: [] },
    ],
  },
)

export const TECH_LANGUAGES = 'English (native) · Spanish (intermediate) · Japanese (developing)'

const ALL_TECH_PRINCIPLES: { title: string; body: string; proof: string }[] = [
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
    title: 'Script it, then check it',
    body: 'One master file becomes every print export, and a 31-point check runs against the client’s feedback before anyone sees it.',
    proof: 'Ajiwow',
  },
  {
    title: 'Close security gaps early',
    body: 'Caught a public-bundle secret exposure from a NEXT_PUBLIC_ prefix before it merged.',
    proof: "Stick'Em",
  },
]
export const TECH_PRINCIPLES: { title: string; body: string; proof: string }[] = ALL_TECH_PRINCIPLES.filter((p) => SHOW_AJIWOW || p.proof !== 'Ajiwow')
