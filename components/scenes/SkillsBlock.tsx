'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/* Migrated verbatim from the previous Skills section */
const skillGroups = [
  {
    category: 'AI / ML',
    color: '#f97316',
    skills: ['OpenAI API', 'Claude API', 'GPT-4V', 'Prompt Engineering', 'Computer Vision', 'Credit Risk Modeling'],
  },
  {
    category: 'Programming',
    color: '#3b82f6',
    skills: ['TypeScript', 'JavaScript', 'Python', 'Java', 'React', 'Express.js', 'Node.js', 'SQL'],
  },
  {
    category: 'Infrastructure',
    color: '#f97316',
    skills: ['Git', 'Railway', 'Vercel', 'n8n', 'Airtable', 'Google Slides API', 'PWA', 'REST APIs', 'Linux'],
  },
  {
    category: 'Security',
    color: '#3b82f6',
    skills: ['TryHackMe Certified', 'Penetration Testing', 'Web Security', 'Network Security'],
  },
]

function SkillGroup({ group, index }: { group: (typeof skillGroups)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-xl p-5 md:p-6"
      style={{
        background: 'rgba(8,8,8,0.66)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="w-5 h-px" style={{ backgroundColor: group.color }} />
        <h4 className="font-body text-[11px] tracking-[0.28em] uppercase font-medium" style={{ color: group.color }}>
          {group.category}
        </h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="font-body text-xs px-3 py-1.5 rounded-full select-none transition-colors duration-200 hover:text-white"
            style={{
              border: `1px solid ${group.color}28`,
              backgroundColor: `${group.color}0a`,
              color: 'rgba(245,245,242,0.7)',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function SkillsBlock() {
  return (
    <div id="skills">
      <div className="flex items-center gap-4 mb-7">
        <h3 className="font-display text-2xl md:text-3xl text-white">capabilities</h3>
        <span className="flex-1 h-px" style={{ background: 'linear-gradient(to right, rgba(249,115,22,0.4), transparent)' }} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {skillGroups.map((group, i) => (
          <SkillGroup key={group.category} group={group} index={i} />
        ))}
      </div>
    </div>
  )
}
