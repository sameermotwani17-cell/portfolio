'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState, useEffect } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

type ProjectStat = { value: string; label: string }
type ProjectSection = { title: string; items: string[] }
type ProjectLink = { label: string; href: string }

type ProjectDetail = {
  overview: string
  stats?: ProjectStat[]
  problem?: string
  sections: ProjectSection[]
  links?: ProjectLink[]
}

type Project = {
  title: string
  subtitle: string
  tag: string
  short: string
  description: string
  tech: string[]
  badge: string | null
  accent: string
  logo: string | null
  bgImage: string
  detail: ProjectDetail
}

// ─── Project Data ─────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    title: 'GOMI Snap',
    subtitle: 'AI Civic-Tech Startup',
    tag: 'Founder & CEO · Nov 2025–Present',
    short: 'AI-powered waste classification platform using computer vision.',
    description:
      'Built in 48 hours at a hackathon. Grew to 500+ users with zero paid marketing. Uses GPT-4V to identify waste type from a photo and instantly returns disposal instructions.',
    tech: ['React', 'TypeScript', 'Express.js', 'OpenAI Vision API', 'PWA'],
    badge: '1st Place — APU Hackathon 2025',
    accent: '#f97316',
    logo: '/apu-logo.jpg',
    bgImage: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80',
    detail: {
      overview:
        'B2B SaaS platform that reduces municipal waste mis-sorting through AI image recognition, a localized rule engine, and behavioral data collection. Built and piloted in Beppu, Japan — a city with 20+ waste categories, significant foreign resident population, and zero real-time sorting guidance.',
      stats: [
        { value: '95.3%', label: 'Survey adoption intent (n=400)' },
        { value: '500+', label: 'Organic users · zero paid acquisition' },
        { value: '¥25K', label: 'Monthly operating cost' },
        { value: 'B2B', label: 'SaaS targeting property operators' },
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
            'Phase 4 · Pilot (now): free QR sticker pilots with local retailers and property managers',
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
    title: "Stick'Em",
    subtitle: 'Curriculum Alignment Engine',
    tag: 'Product & AI Systems Developer · Feb 2026–Present',
    short: 'AI-powered curriculum alignment engine for global STEAM deployment.',
    description:
      'Automates lesson generation and export workflows across national education systems. Reduces teacher prep time significantly.',
    tech: ['React 18', 'Express 5', 'OpenAI API', 'Airtable', 'Zod', 'pdfmake', 'Node.js'],
    badge: 'Hult Prize Global Winner 2025',
    accent: '#3b82f6',
    logo: '/hult-prize.jpg',
    bgImage: '/stickem.png',
    detail: {
      overview:
        'Teacher-facing B2B web application that automatically maps STEM lesson content to official government curriculum standards across the UK, India, and USA — eliminating hours of manual curriculum planning work per teacher per term. Deployed for Stick\'Em, a Hult Prize Global Winner in education.',
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
            'Teachers using Stick\'Em\'s physical STEM lessons manually cross-reference content with national curricula',
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
    title: 'Retro GitHub Agent',
    subtitle: 'Autonomous AI Coding Agent',
    tag: 'Independent Builder · Feb 2026–Present',
    short: 'Fully autonomous AI agent that creates and edits GitHub repos from a single text prompt.',
    description:
      'Zero manual setup required. Handles repo creation, file scaffolding, commits, and pushes entirely autonomously. Chains Claude API with n8n workflows.',
    tech: ['Claude Code CLI', 'n8n', 'Node.js', 'Express', 'ngrok', 'GitHub', 'Vercel'],
    badge: null,
    accent: '#f97316',
    logo: null,
    bgImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&q=80',
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
            'Structured output parsing — Claude\'s response is parsed via regex for <file path=""> and <delete path=""/> tags, enabling deterministic file operations',
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
            'No rollback mechanism if Claude\'s changes introduce errors',
          ],
        },
      ],
      links: [],
    },
  },
  {
    title: 'AI Hack 2026',
    subtitle: 'Credit Default Risk Prediction',
    tag: 'Lead Modeling & Risk Strategy · 2026',
    short: 'Production-grade credit risk scoring system. Top ~8 finish at Kyoto Finals (AIFUL).',
    description:
      'Built a competition-grade credit scoring pipeline predicting 12-month default probability for consumer loans. Engineered 77+ features, designed drift-aware validation, and led ensemble strategy under leaderboard constraints.',
    tech: ['Python', 'CatBoost', 'LightGBM', 'scikit-learn', 'pandas', 'NumPy', 'SciPy'],
    badge: 'Top ~8 — AI Hack 2026 Final Round · Kyoto',
    accent: '#3b82f6',
    logo: null,
    bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
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
    title: 'MIRU',
    subtitle: 'AI Interview Simulation & Evaluation System',
    tag: 'Full-Stack AI Builder · 2026',
    short: 'Stateful AI interview engine with structured scoring and a Japanese HR cultural reasoning layer.',
    description:
      'A closed-loop AI evaluation pipeline — not a chatbot wrapper. Handles real-time voice interaction, session-persistent conversation state, deterministic scoring, and a multi-stage debrief engine.',
    tech: ['Next.js', 'FastAPI', 'Python', 'TypeScript', 'OpenAI', 'ElevenLabs'],
    badge: null,
    accent: '#f97316',
    logo: null,
    bgImage: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    detail: {
      overview:
        'MIRU is a full-stack AI system with real-time interaction and structured evaluation. It maintains conversational state across sessions, enforces deterministic scoring schemas, applies a Japanese HR cultural reasoning layer, and generates multi-stage post-interview debrief outputs — including radar charts, internal evaluator monologue, rewritten responses, and cultural matrix alignment. Built with FastAPI (Python) backend and Next.js frontend.',
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
          title: 'Structured Scoring & Cultural Reasoning Layer',
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

// ─── Project Modal ─────────────────────────────────────────────────────────────

function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.82)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '40px 20px 60px',
        overflowY: 'auto',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: 720,
          background: '#111',
          borderRadius: 16,
          border: `1px solid ${project.accent}30`,
          boxShadow: `0 40px 120px rgba(0,0,0,0.9), 0 0 60px ${project.accent}10`,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Accent top bar */}
        <div style={{ height: 3, background: project.accent, width: '100%' }} />

        {/* Header */}
        <div style={{ padding: '28px 32px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ flex: 1 }}>
              {/* Badge */}
              {project.badge && (
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.65rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: project.accent,
                    border: `1px solid ${project.accent}40`,
                    borderRadius: 4,
                    padding: '3px 8px',
                    display: 'inline-block',
                    marginBottom: 12,
                    background: `${project.accent}10`,
                  }}
                >
                  {project.badge}
                </span>
              )}
              <h2
                style={{
                  fontFamily: 'var(--font-display, serif)',
                  fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
                  fontWeight: 700,
                  color: '#f5f5f5',
                  lineHeight: 1.1,
                  margin: 0,
                }}
              >
                {project.title}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body, sans-serif)',
                  fontSize: '0.8rem',
                  color: 'rgba(245,245,245,0.45)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginTop: 6,
                }}
              >
                {project.tag}
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 8,
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'rgba(245,245,245,0.7)',
                fontSize: '1rem',
                flexShrink: 0,
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.12)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.06)' }}
            >
              X
            </button>
          </div>

          {/* Links */}
          {project.detail.links && project.detail.links.length > 0 && (
            <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
              {project.detail.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.7rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: project.accent,
                    border: `1px solid ${project.accent}50`,
                    borderRadius: 6,
                    padding: '5px 12px',
                    textDecoration: 'none',
                    background: `${project.accent}08`,
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = `${project.accent}20` }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = `${project.accent}08` }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', margin: '0 32px' }} />

        {/* Body */}
        <div style={{ padding: '24px 32px 32px' }}>

          {/* Overview */}
          <p
            style={{
              fontFamily: 'var(--font-body, sans-serif)',
              fontSize: '0.95rem',
              lineHeight: 1.75,
              color: 'rgba(245,245,245,0.82)',
              marginBottom: 28,
            }}
          >
            {project.detail.overview}
          </p>

          {/* Stats row */}
          {project.detail.stats && project.detail.stats.length > 0 && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 12,
                marginBottom: 32,
              }}
            >
              {project.detail.stats.map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: `1px solid ${project.accent}20`,
                    borderRadius: 10,
                    padding: '14px 18px',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '1.55rem',
                      fontWeight: 800,
                      color: project.accent,
                      lineHeight: 1,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body, sans-serif)',
                      fontSize: '0.72rem',
                      color: 'rgba(245,245,245,0.45)',
                      marginTop: 5,
                      lineHeight: 1.4,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Sections */}
          {project.detail.sections.map((section, i) => (
            <div key={section.title} style={{ marginBottom: i < project.detail.sections.length - 1 ? 28 : 0 }}>
              {/* Section label */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <div style={{ width: 18, height: 1.5, background: project.accent, borderRadius: 2, flexShrink: 0 }} />
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.65rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: project.accent,
                    fontWeight: 700,
                  }}
                >
                  {section.title}
                </span>
              </div>
              {/* Items */}
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {section.items.map((item, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      gap: 10,
                      fontFamily: 'var(--font-body, sans-serif)',
                      fontSize: '0.875rem',
                      lineHeight: 1.65,
                      color: 'rgba(245,245,245,0.75)',
                    }}
                  >
                    <span style={{ color: project.accent, flexShrink: 0, fontFamily: 'monospace', fontSize: '0.75rem', paddingTop: 2 }}>—</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Tech stack */}
          <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(245,245,245,0.3)',
                marginBottom: 10,
              }}
            >
              Stack
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.7rem',
                    padding: '4px 10px',
                    borderRadius: 4,
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(245,245,245,0.55)',
                    background: 'rgba(255,255,255,0.03)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Project Card ──────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  index,
  onClick,
}: {
  project: Project
  index: number
  onClick: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className="relative rounded-2xl overflow-hidden transition-all duration-500"
      style={{
        minHeight: '380px',
        cursor: 'pointer',
        border: hovered ? `1px solid ${project.accent}55` : '1px solid rgba(255,255,255,0.08)',
        boxShadow: hovered
          ? `0 0 60px ${project.accent}18, inset 0 0 30px ${project.accent}05`
          : 'none',
      }}
    >
      {/* Cinematic background image */}
      {project.bgImage && (
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={hovered ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{
              backgroundImage: `url(${project.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.75) 40%, rgba(0,0,0,0.45) 100%)',
            }}
          />
        </div>
      )}

      {/* Accent top bar */}
      <motion.div
        className="absolute top-0 left-0 h-0.5 rounded-full z-10"
        style={{ backgroundColor: project.accent }}
        initial={{ width: '25%' }}
        animate={hovered ? { width: '100%' } : { width: '25%' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Card content */}
      <div className="relative p-7 md:p-8 flex flex-col h-full" style={{ minHeight: '380px' }}>

        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-2xl md:text-3xl text-white font-semibold leading-tight">
              {project.title}
            </h3>
            <p className="text-xs text-muted font-body mt-1.5 tracking-[0.15em] uppercase">
              {project.tag}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            {project.logo && (
              <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-white/10">
                <Image src={project.logo} alt={project.subtitle} fill className="object-contain p-1 bg-white/5" />
              </div>
            )}
            {project.badge && (
              <span
                className="text-xs font-body tracking-wide px-3 py-1 rounded-full font-medium whitespace-nowrap"
                style={{
                  border: `1px solid ${project.accent}50`,
                  color: project.accent,
                  backgroundColor: `${project.accent}10`,
                }}
              >
                {project.badge}
              </span>
            )}
          </div>
        </div>

        {/* Short description */}
        <p className="text-white/75 font-body text-sm md:text-base leading-relaxed">
          {project.short}
        </p>

        {/* Hover description */}
        <AnimatePresence>
          {hovered && (
            <motion.p
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="text-white/50 font-body text-sm leading-relaxed overflow-hidden"
            >
              {project.description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mt-5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs font-body px-3 py-1 rounded-full text-white/40 transition-colors duration-300"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                backgroundColor: 'rgba(255,255,255,0.03)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Click hint */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'absolute',
                bottom: 20,
                right: 24,
                fontFamily: 'monospace',
                fontSize: '0.6rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: project.accent,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              View full project
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ─── Projects Section ─────────────────────────────────────────────────────────

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="py-28 md:py-36 px-6 md:px-20 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-14 md:mb-20"
      >
        <p className="text-primary text-xs tracking-[0.35em] uppercase font-body mb-3">
          Selected Work
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-white font-bold">Projects</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={i}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
