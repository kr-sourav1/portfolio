import { motion } from 'framer-motion'
import { Boxes, Gauge, MapPin, Sparkles, Workflow, BadgeCheck } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { BentoGrid, BentoTile } from '@/components/ui/Bento'
import { profile } from '@/data/content'

const pillars = [
  {
    icon: Boxes,
    glow: 'indigo' as const,
    title: 'Backend architecture',
    body: 'Designing clean APIs, data models, and Spring Boot microservices that hold up under real production traffic.',
  },
  {
    icon: Gauge,
    glow: 'cyan' as const,
    title: 'Performance focus',
    body: 'Profiling queries and response paths to cut latency — ~25% faster on high-traffic modules.',
  },
  {
    icon: Sparkles,
    glow: 'violet' as const,
    title: 'AI-driven features',
    body: 'Integrating OpenAI and the Model Context Protocol to ship grounded, context-aware product intelligence.',
  },
  {
    icon: Workflow,
    glow: 'pink' as const,
    title: 'End-to-end ownership',
    body: 'From the first schema sketch through testing and deployment — I own services all the way to production.',
  },
]

const tileIn = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Engineering that ships and scales"
      description="A quick look at how I think about building software."
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        transition={{ staggerChildren: 0.07 }}
      >
        <BentoGrid>
          {/* Narrative */}
          <motion.div
            variants={tileIn}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-2 lg:col-span-4"
          >
            <BentoTile glow="indigo" className="h-full">
              <div className="flex h-full flex-col justify-center gap-4 p-6 sm:p-8">
                {profile.about.map((para, i) => (
                  <p
                    key={i}
                    className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </BentoTile>
          </motion.div>

          {/* Identity */}
          <motion.div
            variants={tileIn}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-2 lg:col-span-2"
          >
            <BentoTile spotlight={false} className="h-full">
              <div className="flex h-full flex-col p-6">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  loading="lazy"
                  className="size-16 rounded-2xl object-cover ring-1 ring-border"
                />
                <div className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                  {profile.name}
                </div>
                <div className="text-sm text-muted-foreground">{profile.title}</div>

                <ul className="mt-auto space-y-2.5 pt-6 text-sm">
                  <li className="flex items-center gap-2.5 text-muted-foreground">
                    <MapPin className="size-4 text-brand-500" />
                    Bengaluru, Karnataka, India
                  </li>
                  <li className="flex items-center gap-2.5 text-muted-foreground">
                    <BadgeCheck className="size-4 text-brand-500" />
                    SDE @ Prepisely Edutech
                  </li>
                  <li className="flex items-center gap-2.5 text-muted-foreground">
                    <Sparkles className="size-4 text-brand-500" />
                    Open to new opportunities
                  </li>
                </ul>
              </div>
            </BentoTile>
          </motion.div>

          {/* Pillars */}
          {pillars.map((p) => (
            <motion.div
              key={p.title}
              variants={tileIn}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-2 sm:col-span-1 lg:col-span-3"
            >
              <BentoTile glow={p.glow} className="h-full">
                <div className="h-full p-6">
                  <div className="mb-3 inline-grid size-11 place-items-center rounded-2xl bg-brand-500/10 text-brand-600">
                    <p.icon className="size-5" />
                  </div>
                  <h3 className="font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              </BentoTile>
            </motion.div>
          ))}
        </BentoGrid>
      </motion.div>
    </Section>
  )
}
