/**
 * The pitch side of /tech: Stick'Em, recognition, and how to hire me. Facts come
 * from the CV, the project records, the Ajiwow portfolio record and the main
 * site (recognition, "currently open to"). No rates or fees are published.
 */

export const STICKEM = {
  name: "Stick'Em Pte Ltd",
  what: 'Singapore EdTech that puts hands-on STEAM lessons into classrooms.',
  badges: ['2025 Hult Prize Global winner', 'US$1M seed'],
  role: 'Contract Software Engineer · May to Sep 2026 · remote from Japan · contract completed',
  plain:
    'Two jobs for one product: make lessons load on bad school internet, and show teachers which official curriculum goals each lesson meets.',
  stats: [
    { value: '~15x', label: 'faster lessons on Slow-3G, 678 ms vs 10 s+' },
    { value: '55+', label: 'slide decks validated through the pipeline' },
    { value: '13', label: 'curriculum standards across UK, India and USA' },
    { value: '72+', label: 'lessons served from Airtable' },
    { value: '3', label: 'countries deployed' },
    { value: '0', label: 'commits straight to main' },
  ],
  work: [
    { title: 'SlideViewer rebuild', body: 'Pre-rendered WebP slides from a CDN with the old iframe as an automatic fallback, plus daily health logging.' },
    { title: 'Curriculum alignment engine', body: 'The model only picks from a real list of standards, then two checks and one retry. It never writes a standard itself.' },
    { title: 'Secure and verifiable', body: 'Closed a public-bundle secret exposure before merge and verified QA with SQL, not agent self-reports.' },
  ],
}

export const TECH_ACHIEVEMENTS = [
  { title: 'AI Hack 2026, Kyoto finalist', note: 'Aiful Corporation. 4th at prelims, top 8 nationwide, the only all-freshman team in the final.', year: '2026' },
  { title: 'Hult Prize APU Campus Round', note: '1st runner-up and Best Speaker Award. Global STEAM Initiative.', year: '2026' },
  { title: 'Kyutech x Science Tokyo x APU Hackathon', note: 'Bronze prize for MIRU. The only APU team on the podium among 15+ teams.', year: '2026' },
  { title: 'APU Annual Hackathon, 1st place', note: 'GOMI Snap (2025 · sunset), the AI waste-classification platform.', year: '2025' },
  { title: 'Next Einstein Forum, 1st place', note: 'Africa Science Week. Educate the Next Generation.', year: '2023' },
]

export const HIRE = {
  headline: 'Embed me. I ship it, measure it, hand it over.',
  plain:
    'I join your team on contract, build and fix things under real production conditions, measure the result, and leave a handover pack your team can run without me.',
  open: ['Forward Deployed Engineer', 'AI Engineer'],
  terms: 'Contract · part-time · remote worldwide, or on site in Japan',
  services: [
    {
      title: 'Embedded software engineering',
      body: 'I work alongside your team on production web apps, performance work and pipelines: Next.js, Supabase and Postgres, Azure or Vercel, CI/CD, and a fallback for every failure.',
      proof: "Stick'Em SlideViewer · Ajiwow site · DK2R store",
    },
    {
      title: 'AI features and agents in production',
      body: 'LLM features with guardrails, validation and evaluation, plus machine-learning models and agent pipelines in n8n and Claude Code, shipped inside your stack.',
      proof: 'Curriculum engine · AI Hack 2026 · GitHub agent',
    },
  ],
  how: [
    'Scope and milestones agreed in writing before any work starts.',
    'Contract and deposit before an engagement begins.',
    'I join your channels, ship a working draft early and send short written updates.',
    'Every change is measured against a baseline, on the slowest conditions your users really have.',
    'A handover pack at the end: docs, runbook and tokens, so your team carries on without me.',
  ],
  availability: 'Taking new briefs now: open capacity today and more from November. Part-time, up to about 28 hours a week across all paid work. Based in Japan (JST).',
  strengths: [
    { title: 'I ship into real conditions', body: 'Live classrooms on slow networks, a paid store with real checkout, a pilot with a city.' },
    { title: 'I measure and verify', body: 'Benchmarks on the slowest network that matters. QA checked with SQL, not with a status report.' },
    { title: 'I plan for failure', body: 'Every pipeline has a fallback, so a bad day never shows a blank screen.' },
    { title: 'I hand over cleanly', body: 'Docs, a runbook and logging, so the team can read, run and measure it without me.' },
    { title: 'I communicate fast and short', body: 'Quick updates in English, and working Japanese for client work. Clients have said so.' },
  ],
}

export const HIRE_EXTRA = {
  status: 'Taking new briefs',
  packages: [
    {
      name: 'Ship-it sprint',
      for: 'Teams that need a feature built, a slow page fixed or a pipeline put in place, with someone inside the team to do it.',
      get: ['A written scope and a working draft early', 'Tests, a fallback and logging', 'CI/CD with preview links', 'A handover pack so your team can carry on'],
      ref: "Stick'Em SlideViewer, the Ajiwow site and pipelines",
    },
  ],
  need: ['A short brief: the goal, the deadline and who approves', 'Access to the repo, the environments and the people the work needs', 'One person who can say yes, so rounds stay fast'],
  faq: [
    { q: 'What does it cost?', a: 'Quoted per scope after a short call. A contract and a deposit come before any engagement.' },
    { q: 'What if the scope changes?', a: 'It happens. On a recent engagement the website finish moved to in-house engineers mid-project. Milestones make that a clean swap, not a fight.' },
    { q: 'Can you work in Japanese?', a: 'Working Japanese for client work, still developing for long formal documents. I keep a term list and ask for a native review where it matters.' },
    { q: 'Will I be talking to one person?', a: 'Yes. You get one person from brief to handover, and a partner brought in only when a project needs more hands.' },
    { q: 'How fast can you start?', a: 'This week. My Stick’Em contract ended in September and Ajiwow wraps in November, so I have open capacity now. I work up to about 28 hours a week across all paid work.' },
  ],
  brief:
    'Hi Sameer,%0D%0A%0D%0AProject: %0D%0AGoal: %0D%0ADeadline: %0D%0AWho approves: %0D%0AWhat I have (repo, access, current setup): %0D%0AWhat I need from you: ',
}
