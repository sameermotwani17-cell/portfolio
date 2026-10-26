/**
 * The pitch side of /tech: Stick'Em, recognition, and how to hire me. Facts come
 * from the CV, the project records, the Ajiwow portfolio record and the main
 * site (recognition, "currently open to"). No rates or fees are published.
 */

export const STICKEM = {
  name: "Stick'Em Pte Ltd",
  what: 'Singapore EdTech that puts hands-on STEAM lessons into classrooms.',
  badges: ['2025 Hult Prize Global winner', 'US$1M seed'],
  role: 'Contract Software Engineer · May 2026 to present · remote from Japan',
  plain:
    'Two jobs for one product: make lessons load on bad school internet, and show teachers which official curriculum goals each lesson meets.',
  stats: [
    { value: '~15x', label: 'faster lessons on Slow-3G, 678 ms vs 10 s+' },
    { value: '65+', label: 'slide decks through the pipeline' },
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
      proof: "Stick'Em SlideViewer · Ajiwow site · DK2R store",
    },
    {
      title: 'AI-first builds and agents',
      body: 'LLM features with guardrails, validation and evaluation, plus modeling and agent pipelines in n8n and Claude Code.',
      proof: 'Curriculum engine · AI Hack 2026 · GitHub agent',
    },
    {
      title: 'Clipping and short-form',
      body: 'Long streams, podcasts and footage cut into hooks, captions and posts. Pipelines built for daily output, with audio mastered to broadcast level.',
      proof: 'Creator clips · Ajiwow shorts · Showroom',
    },
    {
      title: 'Creative technology',
      body: 'A brand system, a bilingual site, a print poster and video direction from one person, so the pieces actually match.',
      proof: 'Ajiwow · DK2R',
    },
  ],
  how: [
    'Scope and milestones agreed in writing before any work starts.',
    'Contract and deposit before an engagement begins.',
    'Short written updates, and a working draft early.',
    'A handover pack at the end: docs, tokens, a design skill or runbook, so your team can carry on.',
  ],
  availability: 'Part-time, up to about 28 hours a week across all paid work. Based in Japan (JST).',
  strengths: [
    { title: 'I ship the whole thing', body: 'From first quote to an approved brand system in 4 days, and to a deployed website draft in 6 more.' },
    { title: 'I measure and verify', body: 'Benchmarks on the slowest network that matters. QA checked with SQL, not with a status report.' },
    { title: 'I plan for failure', body: 'Every pipeline has a fallback, so a bad day never shows a blank screen.' },
    { title: 'I cover the range', body: 'Engineering, brand, print, video and audio in one person, with the client talking to one person.' },
    { title: 'I communicate fast and short', body: 'Quick updates in English, and working Japanese for client work. Clients have said so.' },
  ],
  weaknesses: [
    {
      title: 'Early in my career',
      body: 'I am a first-year student, so I have fewer years in production than a senior engineer.',
      fix: 'I write specs, gate work with tests and ask for review early.',
    },
    {
      title: 'Limited hours',
      body: 'Up to about 28 hours a week across all paid work.',
      fix: 'I scope tightly and plan weeks ahead, so the hours go to the highest-value work.',
    },
    {
      title: 'One person, not a team',
      body: 'I cannot run several large workstreams in parallel.',
      fix: 'I split the work into milestones and bring in a partner when a project needs more hands.',
    },
    {
      title: 'Japanese is still developing',
      body: 'Fine for client work with support, not yet for long formal documents.',
      fix: 'I keep a controlled term list and ask for a native review of anything formal.',
    },
    {
      title: 'Machine learning is applied, not years deep',
      body: 'My modeling is competition-grade on real data, not a long production history.',
      fix: 'I validate against future data and keep the pipeline auditable.',
    },
  ],
}
