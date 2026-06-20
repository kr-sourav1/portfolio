import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'

interface SectionProps {
  id: string
  eyebrow?: string
  title?: ReactNode
  description?: ReactNode
  children: ReactNode
  className?: string
  containerClassName?: string
}

/** Consistent section shell: anchor, padding, eyebrow + heading + body. */
export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  containerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'section-anchor relative py-12 [content-visibility:auto] [contain-intrinsic-size:auto_800px] sm:py-16',
        className,
      )}
    >
      <div className={cn('container', containerClassName)}>
        {(eyebrow || title || description) && (
          <header className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
            {eyebrow && (
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-muted px-3 py-1 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-brand-500" />
                  {eyebrow}
                </span>
              </Reveal>
            )}
            {title && (
              <Reveal delay={0.05}>
                <h2 className="mt-4 text-pretty text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {title}
                </h2>
              </Reveal>
            )}
            {description && (
              <Reveal delay={0.1}>
                <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {description}
                </p>
              </Reveal>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}
