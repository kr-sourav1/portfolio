import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Github, Star } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { projects, type Project, type ProjectCategory } from '@/data/content'
import { cn } from '@/lib/utils'

const FILTERS: ('All' | ProjectCategory)[] = ['All', 'Full-Stack', 'AI / ML', 'Backend', 'Cloud']

export function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )

  const activeFilters = FILTERS.filter(
    (f) => f === 'All' || projects.some((p) => p.category === f),
  )

  // On the default view, lead with a wide hero feature tile; on filtered
  // views keep a clean uniform grid so a minor project isn't blown up.
  const showFeature = filter === 'All' && visible.length > 2

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I've designed & built"
      description="A selection of work spanning full-stack platforms, AI integrations, and cloud deployments."
    >
      {/* Filter tabs */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {activeFilters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'relative rounded-full px-4 py-2 text-sm font-medium transition-colors',
              filter === f ? 'text-white' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {filter === f && (
              <motion.span
                layoutId="filter-pill"
                className="absolute inset-0 -z-10 rounded-full bg-brand-500"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
            {f}
          </button>
        ))}
      </div>

      {/* Bento grid */}
      <motion.div
        layout
        className="grid grid-flow-row-dense grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5"
      >
        <AnimatePresence mode="popLayout">
          {visible.map((project, i) => {
            const feature = showFeature && i === 0
            return (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  feature
                    ? 'sm:col-span-2 lg:col-span-4'
                    : 'sm:col-span-1 lg:col-span-2',
                )}
              >
                {feature ? (
                  <FeatureProjectCard project={project} />
                ) : (
                  <ProjectCard project={project} />
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}

function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="rounded-md border border-brand-500/20 bg-brand-500/10 px-2 py-0.5 font-mono text-2xs font-medium uppercase tracking-wider text-brand-600">
          {project.category}
        </span>
        {project.featured && (
          <span className="inline-flex items-center gap-1 font-mono text-2xs font-medium uppercase tracking-wider text-amber-500">
            <Star className="size-3 fill-current" />
            Featured
          </span>
        )}
      </div>
      <span className="tabular font-mono text-xs text-muted-foreground">{project.year}</span>
    </div>
  )
}

function ProjectLinks({ project, className }: { project: Project; className?: string }) {
  return (
    <div className={cn('flex items-center gap-3 border-t border-border pt-4', className)}>
      {project.repo && (
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <Github className="size-4" />
          Code
        </a>
      )}
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowUpRight className="size-4" />
          Live demo
        </a>
      )}
      <a
        href={project.live ?? project.repo}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open ${project.title}`}
        className="ml-auto grid size-9 place-items-center rounded-lg border border-border bg-surface text-muted-foreground transition-all group-hover:border-brand-400/40 group-hover:text-brand-600"
      >
        <ArrowUpRight className="size-4" />
      </a>
    </div>
  )
}

/** Wide, landscape hero card for the lead project. */
function FeatureProjectCard({ project }: { project: Project }) {
  return (
    <SpotlightCard className="flex h-full flex-col lg:flex-row">
      <div className="flex flex-1 flex-col p-7 sm:p-8">
        <ProjectMeta project={project} />
        <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground">{project.title}</h3>
        <p className="mt-1 text-sm font-medium text-brand-600">{project.tagline}</p>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-auto pt-6">
          <ProjectLinks project={project} />
        </div>
      </div>

      <div className="border-t border-border bg-surface-muted/40 p-7 sm:p-8 lg:w-72 lg:shrink-0 lg:border-l lg:border-t-0">
        <div className="font-mono text-2xs font-medium uppercase tracking-widest text-muted-foreground">
          Highlights
        </div>
        <ul className="mt-3 space-y-2.5">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2 text-sm text-foreground/90">
              <span className="mt-[7px] size-1 shrink-0 rounded-full bg-brand-500" />
              <span className="leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-2xs text-foreground/70"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </SpotlightCard>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <SpotlightCard className="flex h-full flex-col">
      <div className="flex flex-1 flex-col p-6">
        <ProjectMeta project={project} />
        <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
          {project.title}
        </h3>
        <p className="mt-1 text-sm font-medium text-brand-600">{project.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

        <ul className="mt-4 space-y-1.5">
          {project.highlights.slice(0, 3).map((h) => (
            <li key={h} className="flex gap-2 text-sm text-muted-foreground">
              <span className="mt-[7px] size-1 shrink-0 rounded-full bg-brand-500" />
              <span className="leading-relaxed">{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border bg-surface-muted px-2 py-0.5 font-mono text-2xs text-foreground/70"
            >
              {t}
            </span>
          ))}
        </div>

        <ProjectLinks project={project} className="mt-6" />
      </div>
    </SpotlightCard>
  )
}
