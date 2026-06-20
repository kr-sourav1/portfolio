import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { BentoTile } from '@/components/ui/Bento'
import { skillGroups } from '@/data/content'

const glows = ['indigo', 'violet', 'cyan', 'pink', 'indigo', 'violet'] as const

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="A full-stack toolkit, weighted to the backend"
      description="The technologies I reach for to design, build, and ship reliable systems."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {skillGroups.map((group, i) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
          >
            <SkillTile group={group} glow={glows[i % glows.length]} />
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function SkillTile({
  group,
  glow,
}: {
  group: (typeof skillGroups)[number]
  glow: 'indigo' | 'violet' | 'pink' | 'cyan'
}) {
  return (
    <BentoTile glow={glow} className="h-full">
      <div className="flex h-full flex-col p-6">
        <div className="inline-grid size-11 place-items-center rounded-2xl bg-brand-500/10 text-brand-600">
          <group.icon className="size-5" />
        </div>

        <h3 className="mt-5 font-semibold tracking-tight text-foreground">{group.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{group.blurb}</p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-6">
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
