import { BookOpen, GraduationCap, MapPin } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { achievements, education } from '@/data/content'

const learningFocus = ['Spring AI', 'System Design', 'AWS', 'DSA', 'MCP']

export function Education() {
  return (
    <Section
      id="education"
      eyebrow="Education & Achievements"
      title="Foundations & milestones"
      description="Where I trained, and a few moments I'm proud of."
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Education */}
        <div>
          <h3 className="mb-5 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Education
          </h3>
          <div className="space-y-4">
            {education.map((edu, i) => (
              <Reveal key={edu.institution} delay={i * 0.08}>
                <div className="card group p-6 transition-colors hover:border-brand-400/40">
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-500/10 text-brand-600">
                      <GraduationCap className="size-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                        <h4 className="font-semibold text-foreground">{edu.institution}</h4>
                        <span className="font-mono text-xs text-muted-foreground">
                          {edu.period}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-brand-600">
                        {edu.credential} · {edu.field}
                      </p>
                      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="size-3.5" />
                          {edu.location}
                        </span>
                        {edu.score && (
                          <span className="rounded-md border border-border bg-surface-muted px-2 py-0.5 font-mono text-foreground/80">
                            {edu.score}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}

            {/* Continuous learning — balances the column and signals growth */}
            <Reveal delay={education.length * 0.08}>
              <div className="card group p-6 transition-colors hover:border-brand-400/40">
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-500/10 text-brand-600">
                    <BookOpen className="size-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-foreground">Continuous Learning</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      Always sharpening my edges beyond the day-to-day.
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {learningFocus.map((f) => (
                        <li
                          key={f}
                          className="rounded-md border border-border bg-surface-muted px-2 py-0.5 font-mono text-2xs text-foreground/70"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h3 className="mb-5 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Achievements
          </h3>
          <div className="space-y-4">
            {achievements.map((a, i) => (
              <Reveal key={a.title} delay={i * 0.08}>
                <div className="gradient-border group relative overflow-hidden rounded-3xl bg-surface p-6">
                  <div className="flex items-start gap-4">
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-gradient text-white shadow-glow">
                      <a.icon className="size-5" />
                    </span>
                    <div>
                      <div className="text-lg font-bold tracking-tight text-foreground">
                        {a.title}
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {a.detail}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}

            {/* Mini callout */}
            <Reveal delay={achievements.length * 0.08}>
              <div className="card flex items-center gap-4 p-6">
                <div className="flex shrink-0 -space-x-2">
                  {['Java', 'AI', 'SQL'].map((t) => (
                    <span
                      key={t}
                      className="grid size-9 place-items-center rounded-full border-2 border-surface bg-surface-muted font-mono text-2xs font-semibold text-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Consistent problem-solver — always leveling up across DSA, systems, and AI.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  )
}
