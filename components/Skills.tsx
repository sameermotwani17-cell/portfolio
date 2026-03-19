'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const skillGroups = [
  {
    category: 'AI / ML',
    color: '#f97316',
    skills: [
      'OpenAI API',
      'Claude API',
      'GPT-4V',
      'Prompt Engineering',
      'Computer Vision',
      'Credit Risk Modeling',
    ],
  },
  {
    category: 'Programming',
    color: '#3b82f6',
    skills: ['TypeScript', 'JavaScript', 'Python', 'Java', 'React', 'Express.js', 'Node.js', 'SQL'],
  },
  {
    category: 'Infrastructure',
    color: '#f97316',
    skills: [
      'Git',
      'Railway',
      'Vercel',
      'n8n',
      'Airtable',
      'Google Slides API',
      'PWA',
      'REST APIs',
      'Linux',
    ],
  },
  {
    category: 'Security',
    color: '#3b82f6',
    skills: [
      'TryHackMe Certified',
      'Penetration Testing',
      'Web Security',
      'Network Security',
    ],
  },
]

function SkillGroup({
  group,
  index,
}: {
  group: (typeof skillGroups)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-5 h-px"
          style={{ backgroundColor: group.color }}
        />
        <h3
          className="font-body text-xs tracking-[0.3em] uppercase font-medium"
          style={{ color: group.color }}
        >
          {group.category}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {group.skills.map((skill, si) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.4,
              delay: index * 0.1 + si * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
            whileHover={{ scale: 1.06, y: -2 }}
            className="text-sm font-body px-4 py-2 rounded-full text-white/70 select-none transition-colors duration-200 hover:text-white"
            style={{
              border: `1px solid ${group.color}25`,
              backgroundColor: `${group.color}07`,
            }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="py-28 md:py-36 px-6 md:px-20 max-w-7xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-14 md:mb-20"
      >
        <p className="text-primary text-xs tracking-[0.35em] uppercase font-body mb-3">
          Capabilities
        </p>
        <h2 className="font-display text-5xl md:text-7xl text-white font-bold">Skills</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {skillGroups.map((group, i) => (
          <SkillGroup key={group.category} group={group} index={i} />
        ))}
      </div>
    </section>
  )
}
