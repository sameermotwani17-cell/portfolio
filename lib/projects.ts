// ─── Shared project types ─────────────────────────────────────────────────────

export type ProjectStat = { value: string; label: string }
export type ProjectSection = { title: string; items: string[] }
export type ProjectLink = { label: string; href: string }

export type ProjectDetail = {
  overview: string
  stats?: ProjectStat[]
  sections: ProjectSection[]
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
    accent: '#3b82f6',
    cover: null,
    detail: {
      overview:
        "Contracted by the CEO of Stick'Em Pte Ltd — a Singapore EdTech company and Hult Prize Global 2025 winner — to fix a revenue-impacting performance failure: lesson delivery relied on embedded Google Slides iframes that black-screened on the slow connections common in Brunei and the Philippines. Replaced them with a pre-processed WebP asset pipeline and a virtualized scroll viewer, with the legacy iframe kept as an automatic fallback so production could never regress.",
      stats: [
        { value: '~15x', label: 'Faster load on simulated Slow-3G (678ms vs 10s+)' },
        { value: '55+', label: 'Slides per deck validated in the virtualized viewer' },
        { value: '2', label: 'Countries of teachers served (Brunei, Philippines)' },
        { value: '1', label: 'Public-bundle secret exposure caught before merge' },
      ],
      sections: [
        {
          title: 'The Architecture',
          items: [
            'Replaced live Google Slides iframes with static WebP served from a CDN — eliminating the per-request dependency on Google’s slide-rendering infrastructure',
            'Pipeline: Airtable lesson metadata → Google Slides + Drive API (dedicated GCP service account) → Sharp WebP conversion → Supabase Storage + Postgres',
            'Animated-GIF detection via binary magic-byte inspection (47 49 46) on raw Drive buffers, working around a Slides API limitation that silently flattens GIFs',
            'Cache invalidation from Google Drive revision-ID comparison with a delete-and-reinsert strategy after an upsert approach caused stale-cache bugs',
            'Converted native Slides EMU coordinates (9,144,000 × 5,143,500 units) to CSS percentage positioning for responsive click-through overlays',
          ],
        },
        {
          title: 'The Scroll Viewer',
          items: [
            'Vertically-snapping virtualized viewer rendering only the current slide ± 2 neighbors — DOM and memory bounded regardless of deck length',
            'Dual IntersectionObserver design: one tracks the current slide with hysteresis to avoid flicker, the second gates media loading at a 0.6 visibility threshold',
            'Two-lane asset fetch: WebP slides load via native image src caching while GIFs route through a dedicated blob-fetch queue off the render path',
            'YouTube iframes mount and unmount with visibility, so offscreen players stop consuming bandwidth and CPU',
            'Client-validated by the CEO across Fast-4G and Slow-4G throttling profiles',
          ],
        },
        {
          title: 'Verification Discipline',
          items: [
            'Confirmed every reported completion against live Supabase updated_at timestamps instead of trusting self-reported success — caught multiple false positives',
            'Audited an automated QA sweep and found YouTube-slide health checks overclaimed: only 2 of 13 carried a genuine ok:true',
            'Local bulk-processing script built outside the Vercel request lifecycle to sidestep serverless timeout limits for ~3-minute deck jobs',
            'Stale-processing safeguard: decks stuck over 10 minutes are auto-errored and made retry-eligible',
          ],
        },
        {
          title: 'Security & Standards',
          items: [
            'Flagged a server-only secret named with a NEXT_PUBLIC_ prefix before merge — it would have compiled into the public client bundle; corrected, re-minted, and moved behind a server-only endpoint',
            'Strict branch isolation: all work on feature/slide-viewer, zero commits to main, existing iframe kept as automatic fallback',
            'Ported a TypeScript/App-Router prototype into the production Pages-Router/JSX codebase without disturbing its established conventions',
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
    detail: {
      overview:
        'A Call of Duty-inspired 3D multiplayer browser FPS, built as a one-day experiment: instead of writing code, I authored a ~200-line specification prompt and had Claude Code execute it milestone-by-milestone, with proof-of-run gates and 91 automated tests along the way. Free-for-all deathmatch in an urban salvage yard, live on the open web. No monetization intent — pure build-in-public for Retro Studios. The transferable asset is not the game; it is the spec-writing skill and the reusable pipeline.',
      stats: [
        { value: '1 day', label: 'From blank prompt to deployed multiplayer FPS' },
        { value: '0', label: 'Lines of code written by hand — spec-driven build' },
        { value: '91', label: 'Automated tests gating each milestone' },
        { value: '30Hz', label: 'Deterministic fixed-timestep server simulation' },
      ],
      sections: [
        {
          title: 'The Game',
          items: [
            'Free-for-all deathmatch — first to 30 kills or a 10-minute timer',
            'Urban salvage yard, ~60m × 60m at Shipment/Rust scale: shipping containers, a 2-story concrete skeleton, car wrecks, 3 vertical layers max',
            'Up to 8 humans per room; the server backfills with AI bots so at least 4 combatants are always active',
            'Feel targets hit: 250–400ms time-to-kill, 100 HP with regen after 4s, 3s respawn, 60fps',
            'FSM-based bot tactics with voice callouts — "contact!", "man down!"',
          ],
        },
        {
          title: 'The Engineering',
          items: [
            'Server-authoritative netcode with client-side prediction and lag compensation',
            'Deterministic 30Hz fixed-timestep simulation on Cloudflare Durable Objects',
            'Hand-rolled AABB collision and raycast hitscan — no physics engine',
            'Three.js client in vanilla ES modules: no React, no bundler',
            'AI-generated textures, gun SFX, and music',
          ],
        },
        {
          title: 'The Actual Point',
          items: [
            'Zero hand-written code — the deliverable was a ~200-line spec precise enough for an agent to build against',
            'Milestone-based pipeline with proof-of-run at each stage, not one giant prompt-and-pray',
            'The reusable asset is the spec-writing discipline and the build pipeline — the game is just the receipt',
          ],
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
    accent: '#f97316',
    cover: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80',
    detail: {
      overview:
        'B2B SaaS platform that reduces municipal waste mis-sorting through AI image recognition, a localized rule engine, and behavioral data collection. Built and piloted in Beppu, Japan — a city with 20+ waste categories, significant foreign resident population, and zero real-time sorting guidance. A completed chapter: the project was wound down and folded into StarLabs, carrying its lessons (and its users) forward.',
      stats: [
        { value: '95.3%', label: 'Survey adoption intent (n=400)' },
        { value: '500+', label: 'Organic users · zero paid acquisition' },
        { value: '¥25K', label: 'Monthly operating cost' },
        { value: '2x', label: 'Podium finishes: APU Hackathon 1st · Hult Prize APU runner-up' },
      ],
      sections: [
        {
          title: 'The Problem',
          items: [
            'Beppu city uses 20+ distinct waste categories with weekday and week-of-month rules',
            'Foreign residents, students, and tourists have no reliable real-time sorting guidance',
            'Mis-sorted waste gets incinerated — costing municipalities money and increasing emissions',
            'The barrier is not awareness — it is friction at the exact moment of disposal',
            'Existing guidance: a 40-page PDF in Japanese, updated annually',
          ],
        },
        {
          title: 'System Architecture',
          items: [
            'AI Vision Layer — camera-based item identification tuned for poor lighting and partial items',
            'Waste Rule Engine — machine-readable logic from official Beppu municipal PDFs, covering weekday rules and week-of-month schedules',
            'Behavioral Data Layer — scan volume, category distribution, and misclassification patterns per building',
            'B2B Dashboard — property managers view compliance trends and resident engagement metrics',
            'QR Distribution — physical stickers at waste stations, no app install required',
          ],
        },
        {
          title: 'Go-To-Market Journey',
          items: [
            'Phase 1 · Build: architected backend from scratch, reverse-engineered Beppu waste rules from Japanese PDFs',
            'Phase 2 · Validate: 400-person survey (95.3% adoption), 500 organic users in first month',
            'Phase 3 · Institutional: engaged Beppu City government, presented pilot framework and cost-reduction logic',
            'Phase 4 · Pilot: free QR sticker pilots with local retailers and property managers',
            'Final phase · Sunset: wound down and folded into StarLabs — the team, the systems thinking, and the users moved on with it',
          ],
        },
        {
          title: 'My Role',
          items: [
            'Full system architecture and backend development',
            'AI prompt engineering and waste classification logic',
            'Financial modeling: 3-year projections, NPV, sensitivity analysis',
            'Go-to-market strategy and institutional outreach',
            'City government engagement and pilot design',
          ],
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
    accent: '#fbbf24',
    cover: '/cinematic.png',
    detail: {
      overview:
        'Founder and sole operator of Retro Studios (under StarLabs), a one-person AI-powered creative studio producing agency-grade cinematic brand content — statics, reels, and commercial ads — without a traditional crew, studio, or production budget. Core thesis: one person with the right AI stack and systems thinking can outproduce a full creative agency. Currently running full creative direction and technical production for DK2R Football Wear, a premium 12-country limited-edition jersey brand tied to the 2026 FIFA World Cup.',
      stats: [
        { value: '12', label: 'Country editions art-directed' },
        { value: '36', label: 'SKU variants (3 silhouettes × 12 countries)' },
        { value: '150+', label: 'AI-generated hero images delivered' },
        { value: '1', label: 'Person doing the work of a full agency' },
      ],
      sections: [
        {
          title: 'DK2R — 2026 World Cup Capsule',
          items: [
            'Full creative direction and technical production for a premium jersey brand: 300 numbered pieces per edition, no restocks',
            'Completed 60-image campaigns for Mexico, Brazil, USA, England ("Crown & Country"), and Argentina ("Vamos Argentina") — each with a distinct visual register',
            '12-country content pipeline: 10 videos + 10 statics per market, with commercial-grade ads planned for four flagship markets',
            '55-asset, 14-edition manufacturing QA report with zero redos — translating AI reference renders into factory-ready sublimation sheets',
            'Solo-built the DK2R e-commerce platform: Next.js 14 + Supabase, live PayPal checkout + Stripe, Vercel deploy with full DNS/MX/Workspace setup',
          ],
        },
        {
          title: 'The Prompt System',
          items: [
            '8-layer, reference-locked prompt architecture reused across every new country edition — cutting generation-to-approval time and eliminating jersey-accuracy errors',
            '"Anti-Perfection Layer" designed to defeat AI-image tells: skin, lighting, fabric, backgrounds, pose, catchlights, focus plane',
            'Locked "Visual DNA" blocks for cross-campaign consistency: ARRI Alexa colour science, Kodak 2383 emulation, cold blue-grey palette',
            "Director's Brief methodology before every generation: who / where / what just happened / emotion / next action / camera awareness",
          ],
        },
        {
          title: 'The Business',
          items: [
            'Productized pricing: UGC ads, cinematic reels, music videos, monthly retainers',
            'No paid engagement without a signed contract and upfront deposit',
            'Every campaign delivered as both a client asset and a portfolio case study — the studio reel compounds with every job',
          ],
        },
      ],
      links: [{ label: 'Instagram', href: 'https://www.instagram.com/retro.studios_' }],
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
    accent: '#3b82f6',
    detail: {
      overview:
        "Teacher-facing B2B web application that automatically maps STEM lesson content to official government curriculum standards across the UK, India, and USA — eliminating hours of manual curriculum planning work per teacher per term. Deployed for Stick'Em, a Hult Prize Global Winner in education.",
      stats: [
        { value: '13', label: 'Curriculum standards (UK, India, USA)' },
        { value: '72+', label: 'Lessons served from Airtable' },
        { value: '3', label: 'Countries deployed' },
        { value: 'temp 0.3', label: 'GPT-4o-mini alignment engine' },
      ],
      sections: [
        {
          title: 'The Problem It Solves',
          items: [
            "Teachers using Stick'Em's physical STEM lessons manually cross-reference content with national curricula",
            'This process is slow, error-prone, and a barrier to school adoption',
            'Curriculum alignment is a procurement requirement in most institutional sales cycles',
            'No automated tool existed for multi-country, multi-standard STEM content alignment',
          ],
        },
        {
          title: 'System Architecture',
          items: [
            'Teacher UI — React 18 frontend for lesson selection and alignment output',
            '/api/lessons — Airtable proxy serving 72+ lessons with 60-minute in-memory cache',
            '/api/curricula — 13 curriculum JSON files verbatim from government documents',
            '/api/curriculum/generate — core alignment engine with six-step reasoning framework',
            '/api/translate/batch — multi-language output including Hindi/Devanagari with regex validation',
            'PDF export — server-side pdfmake, landscape A4, full alignment data with fit badges and bridge statements',
          ],
        },
        {
          title: 'Key Engineering Decisions',
          items: [
            'Anti-hallucination via index-only selection — LLM selects integer indices from pre-loaded government JSON, never writes curriculum text, structurally preventing fabricated codes',
            'Six-step reasoning framework — concept extraction, fit scoring, descriptor selection, bridge statement, adaptation suggestions, activity generation. Step 1 is internal-only to prevent reasoning leakage',
            'Two-tier validation with automatic retry — hard errors (wrong IDs, out-of-range indices, missing bridge statements, Zod failures) block output and trigger one automatic LLM retry with error context injected',
            'Fit classification: direct (80–100), indirect (50–79), weak (20–49), no_fit (0–19)',
          ],
        },
        {
          title: 'Scale & Scope',
          items: [
            '13 curriculum standards: UK National Curriculum, India CBSE / AI / IT / CS, USA CSTA / NGSS',
            'Multi-language support including Hindi/Devanagari output with regex-level validation',
            '72+ lessons from Airtable with in-memory caching to reduce API costs',
            'PDF export with full alignment data, fit badges, bridge statements, and suggested activities',
          ],
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
        'A self-built AI coding agent that accepts natural language prompts and autonomously makes code changes to any GitHub repository — cloning, editing, committing, and pushing without human intervention. Built from scratch at 3AM as a first systems project. Comparable in concept to Devin and GitHub Copilot Workspace, but hand-rolled.',
      sections: [
        {
          title: 'How It Works',
          items: [
            '1. User sends a POST request with { repo, prompt } to the n8n webhook',
            '2. n8n forwards the request to the local Express server exposed via ngrok tunnel',
            '3. Server clones the target repo (or pulls latest) and reads existing file context',
            '4. Claude Code CLI is spawned with full codebase context + user prompt',
            '5. Claude generates <file path="..."> blocks — server parses and writes them to disk',
            '6. Server auto-commits and force-pushes changes to GitHub',
          ],
        },
        {
          title: 'Key Engineering Decisions',
          items: [
            'File context injection — before Claude acts, server reads all existing repo files and injects them as XML blocks, giving Claude full codebase awareness',
            "Structured output parsing — Claude's response is parsed via regex for <file path=\"\"> and <delete path=\"\"/> tags, enabling deterministic file operations",
            'ngrok as the bridge — solves the n8n cloud → localhost problem cleanly without deploying infrastructure',
            'Git credential persistence — credential.helper store eliminates per-run auth prompts',
          ],
        },
        {
          title: 'Why It Is Portfolio-Worthy',
          items: [
            'Built from scratch with no frameworks or scaffolding — demonstrates real systems thinking',
            'Shows understanding of agent architecture: trigger → orchestration → tool use → side effects',
            'Chains external APIs, CLIs, and webhooks into a working autonomous system end-to-end',
            'Comparable in architecture to Devin / GitHub Copilot Workspace',
          ],
        },
        {
          title: 'Honest Limitations',
          items: [
            'Not persistent — requires manual server and ngrok restart between sessions',
            'Single-user with no auth layer on the webhook endpoint',
            'Claude Code CLI costs accrue per run — no cost ceiling in current version',
            "No rollback mechanism if Claude's changes introduce errors",
          ],
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
    accent: '#3b82f6',
    detail: {
      overview:
        'Designed and built a production-grade credit risk scoring system to predict 12-month default probability for consumer loans using real-world Japanese financial data (AIFUL). Competed as Team StarLabs, advancing to the Kyoto Final Round and finishing Top ~8. Optimized AUC under class imbalance and temporal distribution shift constraints.',
      stats: [
        { value: '~0.763', label: 'AUC-ROC — peak public leaderboard performance' },
        { value: 'Top ~8', label: 'Final Round finish · Kyoto' },
        { value: '77+', label: 'Engineered features from raw financial data' },
        { value: '~200', label: 'Submissions managed across experiment loop' },
      ],
      sections: [
        {
          title: 'Feature Engineering',
          items: [
            'Engineered ~77 features from raw financial and bureau data — primary signal driver (~0.76 AUC)',
            'Credit-risk-specific ratios: debt-to-income, limit-to-income, utilization, delinquency × exposure interactions',
            'Temporal features: age at application, employment tenure, credit recency, months since last delinquency',
            'Drift-aware interactions: feature × time index to handle distribution shift between train and test',
            'Account-level aggregation features across bureau data',
          ],
        },
        {
          title: 'Model Development & Optimization',
          items: [
            'CatBoost (primary) — leveraged native categorical handling, tuned for temporal generalization',
            'LightGBM (diversity model) — seed averaging and stochastic variants for ensemble diversity',
            'Variance reduction across folds via multi-seed ensembling',
            'Tuned for generalization under temporal shift, not raw public leaderboard score',
          ],
        },
        {
          title: 'Drift-Aware Validation Design',
          items: [
            'Multi-layer validation: Stratified K-Fold (baseline) + Temporal GroupKFold (forward validation)',
            'Adversarial validation to measure train–test distribution drift',
            'Time-sliced AUC diagnostics to ensure robustness across loan cohorts',
            'Reduced overfitting risk and improved private leaderboard stability',
          ],
        },
        {
          title: 'Ensemble & Submission Strategy',
          items: [
            'Logit-space blending framework — preserved probability calibration, +0.001–0.002 AUC gain vs naive averaging',
            'Submission portfolio: public LB optimized model + time-stable hedge model',
            'Rank averaging and logistic regression stacking',
            'Identified and rejected suspicious high-scoring models prone to leakage/overfitting',
          ],
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
    accent: '#f97316',
    detail: {
      overview:
        'MIRU is a full-stack AI system with real-time interaction and structured evaluation — at its core, an exercise in LLM evaluation design: deterministic scoring rubrics, per-turn scoring with session-level aggregation, and schema-validated outputs instead of vibes. It maintains conversational state across sessions, applies a Japanese HR cultural reasoning layer, and generates multi-stage post-interview debrief outputs — radar charts, internal evaluator monologue, rewritten responses, and cultural matrix alignment. Built with FastAPI (Python) backend and Next.js frontend.',
      sections: [
        {
          title: 'Stateful Interview Engine',
          items: [
            'Session-based engine with persistent transcript history, question progression, and session IDs',
            'Adaptive questioning logic based on prior answers — not linear scripted flow',
            'Prevents loop repetition and premature termination through state tracking',
            'API contract: /turn, /results, /debrief endpoints with strict schema validation',
          ],
        },
        {
          title: 'Evaluation Design & Cultural Reasoning Layer',
          items: [
            'Deterministic scoring schema: communication, clarity, cultural_fit, problem_solving (0–10 per turn)',
            'Per-turn scoring with session aggregation for consistent cross-session evaluation',
            'Cultural translation engine: maps Western responses to Japanese HR interpretation using rule-based heuristics + LLM synthesis',
            'Penalty logic per phrase pattern — e.g. "I achieved X" → flagged on Wa + humility dimensions',
            'Generates internal HR monologue, rewritten answers, and cultural reasoning per response',
          ],
        },
        {
          title: 'Debrief & Voice Pipeline',
          items: [
            'Multi-stage debrief engine: radar chart (quantitative scoring), internal monologue (qualitative), rewrite (actionable correction), cultural matrix alignment',
            'ElevenLabs TTS integration with mic input, silence detection logic, and turn timing',
            'Real-time async API orchestration across LLM + TTS layers',
            'Debugged full-stack pipeline: API schema mismatches, state desynchronization, async response failures, memory vs DB fallback',
          ],
        },
      ],
      links: [],
    },
  },
]
