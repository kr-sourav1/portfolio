import { techMarquee } from '@/data/content'

/** Infinite, CSS-driven marquee of headline technologies. */
export function TechMarquee() {
  const items = [...techMarquee, ...techMarquee]
  return (
    <div className="mask-fade-x relative flex overflow-hidden">
      <div className="flex shrink-0 animate-marquee items-center gap-3 pr-3 [--marquee-duration:38s] hover:[animation-play-state:paused]">
        {items.map((tech, i) => (
          <span
            key={`${tech}-${i}`}
            className="flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-muted-foreground"
          >
            <span className="size-1.5 rounded-full bg-brand-500/70" />
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}
