import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Section } from '@/components/ui/Section'
import { BentoGrid, BentoTile } from '@/components/ui/Bento'
import { skillGroups } from '@/data/content'
import { cn } from '@/lib/utils'

// Asymmetric bento spans: the strongest group becomes a tall feature tile.
const spans = [
  'col-span-2 lg:col-span-3 lg:row-span-2',
  'col-span-1 lg:col-span-3',
  'col-span-1 lg:col-span-3',
  'col-span-1 lg:col-span-2',
  'col-span-1 lg:col-span-2',
  'col-span-2 lg:col-span-2',
]
const glows = ['indigo', 'violet', 'cyan', 'pink', 'indigo', 'violet'] as const

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="A full-stack toolkit, weighted to the backend"
      description="The technologies I reach for to design, build, and ship reliable systems."
    >
      <BentoGrid className="lg:auto-rows-[13.5rem]">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className={spans[i % spans.length]}
          >
            <SkillTile group={group} glow={glows[i % glows.length]} feature={i === 0} />
          </motion.div>
        ))}
      </BentoGrid>
    </Section>
  )
}

function SkillTile({
  group,
  glow,
  feature,
}: {
  group: (typeof skillGroups)[number]
  glow: 'indigo' | 'violet' | 'pink' | 'cyan'
  feature: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <BentoTile glow={glow} className="h-full">
      <div ref={ref} className="flex h-full flex-col p-6">
        <div className="flex items-center justify-between">
          <div className="inline-grid size-11 place-items-center rounded-2xl bg-brand-500/10 text-brand-600">
            <group.icon className="size-5" />
          </div>
          <span className="tabular font-mono text-xs text-muted-foreground">{group.level}%</span>
        </div>

        <h3 className={cn('mt-4 font-semibold tracking-tight text-foreground', feature && 'text-lg')}>
          {group.title}
        </h3>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: `${group.level}%` } : { width: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, hsl(var(--aurora-1)), hsl(var(--aurora-2)))',
            }}
          />
        </div>

        <ul className={cn('mt-4 flex flex-wrap gap-2', feature && 'mt-auto pt-4')}>
          {group.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-lg border border-border bg-surface-muted/70 px-2.5 py-1 text-xs font-medium text-foreground/80"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </BentoTile>
  )
}
