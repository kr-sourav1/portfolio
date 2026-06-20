import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight, Github, Star } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SpotlightCard } from '@/components/ui/SpotlightCard'
import { projects, type Project, type ProjectCategory } from '@/data/content'
import { cn } from '@/lib/utils'

const FILTERS: ('All' | ProjectCategory)[] = ['All', 'Full-Stack', 'AI / ML', 'Backend', 'Cloud']

export function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('All')
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const visible = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  )
  const activeFilters = FILTERS.filter(
    (f) => f === 'All' || projects.some((p) => p.category === f),
  )

  function updateArrows() {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 8)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }

  // Reset to the start and recompute arrow state whenever the filter changes.
  useEffect(() => {
    const el = trackRef.current
    if (el) el.scrollTo({ left: 0 })
    const raf = requestAnimationFrame(updateArrows)
    window.addEventListener('resize', updateArrows)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', updateArrows)
    }
  }, [filter])

  function scrollByCard(dir: 1 | -1) {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-card]')
    const amount = card ? card.offsetWidth + 20 : el.clientWidth * 0.85
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
  }

  return (
    <Section
      id="projects"
      eyebrow="Projects"
      title="Things I've designed & built"
      description="A selection of work spanning full-stack platforms, AI integrations, and cloud deployments."
    >
      {/* Controls: filters + carousel arrows */}
      <div className="mb-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex flex-wrap justify-center gap-2">
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

        <div className="hidden items-center gap-2 sm:flex">
          <CarouselButton dir="prev" disabled={!canPrev} onClick={() => scrollByCard(-1)} />
          <CarouselButton dir="next" disabled={!canNext} onClick={() => scrollByCard(1)} />
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Edge fades hint at more content without blocking interaction */}
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-background to-transparent transition-opacity duration-300 sm:w-16',
            canPrev ? 'opacity-100' : 'opacity-0',
          )}
        />
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-background to-transparent transition-opacity duration-300 sm:w-16',
            canNext ? 'opacity-100' : 'opacity-0',
          )}
        />

        <div
          ref={trackRef}
          onScroll={updateArrows}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        >
          {visible.map((project) => (
            <div
              key={project.title}
              data-card
              className="w-[85vw] shrink-0 snap-start sm:w-[360px] lg:w-[384px]"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-muted-foreground sm:hidden">
        Swipe to explore more →
      </p>
    </Section>
  )
}

function CarouselButton({
  dir,
  disabled,
  onClick,
}: {
  dir: 'prev' | 'next'
  disabled: boolean
  onClick: () => void
}) {
  const Icon = dir === 'prev' ? ChevronLeft : ChevronRight
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'prev' ? 'Previous projects' : 'Next projects'}
      className="grid size-10 place-items-center rounded-full border border-border bg-surface text-foreground transition-all hover:border-brand-400/40 hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40"
    >
      <Icon className="size-5" />
    </button>
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

function ProjectCard({ project }: { project: Project }) {
  return (
    <SpotlightCard className="flex h-full flex-col">
      <div className="flex flex-1 flex-col p-6">
        <ProjectMeta project={project} />
        <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
          {project.title}
        </h3>
        <p className="mt-1 text-sm font-medium text-brand-600">{project.tagline}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

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

        <ProjectLinks project={project} className="mt-auto pt-4" />
      </div>
    </SpotlightCard>
  )
}
