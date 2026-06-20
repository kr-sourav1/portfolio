import { Briefcase, CheckCircle2 } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { experience, certifications } from '@/data/content'
import { formatDateRange } from '@/lib/utils'

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've made an impact"
      description="Building and owning production backend services in a fast-moving product team."
    >
      <div className="mx-auto max-w-3xl">
        <div className="relative">
          {/* Timeline rail */}
          <div className="absolute left-[19px] top-2 h-full w-px bg-gradient-to-b from-brand-500/60 via-border to-transparent sm:left-[23px]" />

          <div className="space-y-10">
            {experience.map((item, i) => (
              <Reveal key={`${item.company}-${item.role}`} delay={i * 0.1}>
                <article className="relative pl-14 sm:pl-16">
                  {/* Node */}
                  <span className="absolute left-0 top-1 grid size-10 place-items-center rounded-xl border border-border bg-surface text-brand-600 shadow-card sm:size-12">
                    <Briefcase className="size-5" />
                  </span>

                  <div className="card p-6">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-lg font-semibold tracking-tight text-foreground">
                        {item.role}
                      </h3>
                      <span className="inline-flex w-fit items-center rounded-full border border-border bg-surface-muted px-2.5 py-0.5 font-mono text-xs text-muted-foreground">
                        {formatDateRange(item.start, item.end)}
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                      <span className="font-medium text-brand-600">{item.company}</span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground">{item.location}</span>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-muted-foreground">{item.type}</span>
                    </div>

                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.summary}
                    </p>

                    <ul className="mt-4 space-y-2">
                      {item.highlights.map((h) => (
                        <li key={h} className="flex gap-2.5 text-sm text-foreground/90">
                          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-brand-500" />
                          <span className="leading-relaxed">{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-border bg-surface-muted px-2 py-0.5 font-mono text-2xs text-foreground/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Certifications & training */}
        <Reveal delay={0.1}>
          <div className="mt-12">
            <h3 className="mb-4 text-center font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Training & Certifications
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {certifications.map((c) => (
                <div key={c.title} className="card flex items-start gap-3 p-4">
                  <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg bg-brand-500/10 font-mono text-sm font-semibold text-brand-600">
                    ✓
                  </span>
                  <div>
                    <div className="font-medium text-foreground">{c.title}</div>
                    <div className="text-xs text-muted-foreground">{c.issuer}</div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {c.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
