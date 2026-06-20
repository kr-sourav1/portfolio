import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { skillGroups } from '@/data/content'

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="A full-stack toolkit, weighted to the backend"
      description="The technologies I reach for to design, build, and ship reliable systems."
      className="bg-surface-muted/30"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={i * 0.06}>
            <SkillCard group={group} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function SkillCard({ group }: { group: (typeof skillGroups)[number] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div ref={ref} className="card group h-full p-6 transition-colors hover:border-brand-400/40">
      <div className="flex items-center justify-between">
        <div className="inline-grid size-11 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
          <group.icon className="size-5" />
        </div>
        <span className="font-mono text-xs text-muted-foreground">{group.level}%</span>
      </div>

      <h3 className="mt-4 font-semibold text-foreground">{group.title}</h3>

      {/* Proficiency bar */}
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-muted">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${group.level}%` } : { width: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="h-full rounded-full bg-brand-gradient"
        />
      </div>

      <ul className="mt-4 flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <li
            key={skill}
            className="rounded-lg border border-border bg-surface-muted px-2.5 py-1 text-xs font-medium text-foreground/80 transition-colors group-hover:border-border"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}
