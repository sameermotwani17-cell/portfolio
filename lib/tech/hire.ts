/**
 * The pitch side of /tech: Stick'Em, recognition, and how to hire me. Facts come
 * from the CV, the project records and the main
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
  { title: 'APU Annual Hackathon, 1st place', note: 'GOMI Snap, the AI waste-classification platform.', year: '2025' },
  { title: 'Next Einstein Forum, 1st place', note: 'Africa Science Week. Educate the Next Generation.', year: '2023' },
  { title: 'Best High School Short Story Writer', note: 'Educate the Next Generation.', year: '2023' },
]

export const HIRE = {
  headline: 'Hire me for the work, not the title.',
  plain:
    'I take on contract and freelance work for companies that need something built, fixed, clipped or launched, and I run it like a small studio: clear scope, steady updates, a handover you can use without me.',
  open: ['AI Engineer', 'Founding or early-stage engineer', 'Full-stack product engineer', 'Multimedia designer'],
  terms: 'Contract · freelance project · part-time · remote worldwide or Japan',
  services: [
    {
      title: 'Software engineering contracts',
      body: 'Production web apps, performance work and pipelines. Next.js, Supabase and Postgres, Azure or Vercel, CI/CD, and a fallback for every failure.',
      proof: "Stick'Em SlideViewer · DK2R store · AFRO WEEK booking",
    },
    {
      title: 'AI-first builds and agents',
      body: 'LLM features with guardrails, validation and evaluation, plus modeling and agent pipelines in n8n and Claude Code.',
      proof: 'Curriculum engine · AI Hack 2026 · GitHub agent',
    },
    {
      title: 'Clipping and short-form',
      body: 'Long streams, podcasts and footage cut into hooks, captions and posts. Pipelines built for daily output, with audio mastered to broadcast level.',
      proof: 'Creator clips · Showroom',
    },
    {
      title: 'Creative technology',
      body: 'A brand system, a bilingual site, a print poster and video direction from one person, so the pieces actually match.',
      proof: 'DK2R · Xs',
    },
  ],
  how: [
    'Scope and milestones agreed in writing before any work starts.',
    'Contract and deposit before an engagement begins.',
    'Short written updates, and a working draft early.',
    'A handover pack at the end: docs, tokens, a design skill or runbook, so your team can carry on.',
  ],
  availability: 'Taking new briefs now, with open capacity. Part-time, up to about 28 hours a week across all paid work. Based in Japan (JST).',
  strengths: [
    { title: 'I ship the whole thing', body: 'Brand, build and launch from one person, so you talk to one person from brief to handover.' },
    { title: 'I measure and verify', body: 'Benchmarks on the slowest network that matters. QA checked with SQL, not with a status report.' },
    { title: 'I plan for failure', body: 'Every pipeline has a fallback, so a bad day never shows a blank screen.' },
    { title: 'I cover the range', body: 'Engineering, brand, print, video and audio in one person, with the client talking to one person.' },
    { title: 'I communicate fast and short', body: 'Quick updates in English, and working Japanese for client work. Clients have said so.' },
  ],
}

export const HIRE_EXTRA = {
  status: 'Taking new briefs',
  packages: [
    {
      name: 'Clipping sprint',
      for: 'Streamers, podcasts, founders and brands with long footage and no time to cut it.',
      get: ['Hooks picked from your footage', 'Animated captions and clean pacing', 'Audio mastered to broadcast level', 'Vertical cuts for TikTok, Reels and Shorts'],
      ref: 'Creator clips and the Showroom',
    },
    {
      name: 'Ship-it sprint',
      for: 'Teams that need a feature built, a slow page fixed or a pipeline put in place.',
      get: ['A written scope and a working draft early', 'Tests, a fallback and logging', 'CI/CD with preview links', 'A handover pack so your team can carry on'],
      ref: "Stick'Em SlideViewer and the DK2R store",
    },
    {
      name: 'Launch pack',
      for: 'Startups that have a product and no identity, site or launch content.',
      get: ['A brand system with tokens and templates', 'A bilingual website on your own cloud', 'Print and video, directed and delivered', 'A design skill so your team stays on brand'],
      ref: 'DK2R: a 12-edition campaign and the store it sold from',
    },
  ],
  need: ['A short brief: the goal, the deadline and who approves', 'Access to the footage, repo or accounts the work needs', 'One person who can say yes, so rounds stay fast'],
  faq: [
    { q: 'What does it cost?', a: 'Quoted per scope after a short call. A contract and a deposit come before any engagement.' },
    { q: 'What if the scope changes?', a: 'It happens. Work is split into milestones, so a change in scope is a clean swap with a new written scope, not a fight.' },
    { q: 'Can you work in Japanese?', a: 'Working Japanese for client work, still developing for long formal documents. I keep a term list and ask for a native review where it matters.' },
    { q: 'Will I be talking to one person?', a: 'Yes. You get one person from brief to handover, and a partner brought in only when a project needs more hands.' },
    { q: 'How fast can you start?', a: 'This week. My Stick’Em contract ended in September, so I have open capacity now. I work up to about 28 hours a week across all paid work.' },
  ],
  brief:
    'Hi Sameer,%0D%0A%0D%0AProject: %0D%0AGoal: %0D%0ADeadline: %0D%0AWho approves: %0D%0AWhat I have (footage, repo, brand): %0D%0AWhat I need from you: ',
}
