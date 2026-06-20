import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { profile } from '@/data/content'
import { Boxes, Gauge, Sparkles, Workflow } from 'lucide-react'

const pillars = [
  {
    icon: Boxes,
    title: 'Backend architecture',
    body: 'Designing clean APIs, data models, and Spring Boot microservices that hold up under real production traffic.',
  },
  {
    icon: Gauge,
    title: 'Performance focus',
    body: 'Profiling queries and response paths to cut latency — ~25% faster on high-traffic modules.',
  },
  {
    icon: Sparkles,
    title: 'AI-driven features',
    body: 'Integrating OpenAI and the Model Context Protocol to ship grounded, context-aware product intelligence.',
  },
  {
    icon: Workflow,
    title: 'End-to-end ownership',
    body: 'From the first schema sketch through testing and deployment — I own services all the way to production.',
  },
]

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Engineering that ships and scales"
      description="A quick look at how I think about building software."
    >
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        {/* Narrative */}
        <div className="space-y-5">
          {profile.about.map((para, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                {para}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <div className="card mt-2 flex items-center gap-4 p-5">
              <img
                src={profile.avatar}
                alt={profile.name}
                width={56}
                height={56}
                loading="lazy"
                className="size-14 rounded-full object-cover ring-2 ring-brand-500/20"
              />
              <div>
                <div className="font-semibold text-foreground">{profile.name}</div>
                <div className="text-sm text-muted-foreground">
                  {profile.title} · {profile.location}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Pillars */}
        <div className="grid gap-4 sm:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="card group h-full p-5 transition-colors hover:border-brand-400/40">
                <div className="mb-3 inline-grid size-11 place-items-center rounded-xl bg-brand-500/10 text-brand-600 transition-colors group-hover:bg-brand-500/15">
                  <p.icon className="size-5" />
                </div>
                <h3 className="font-semibold text-foreground">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  )
}
