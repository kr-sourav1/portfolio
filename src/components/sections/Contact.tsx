import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Send } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { contactDetails, profile, socials } from '@/data/content'

export function Contact() {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — the mailto link is still there */
    }
  }

  return (
    <Section id="contact" className="pb-28">
      <Reveal>
        <div className="gradient-border relative mx-auto max-w-4xl overflow-hidden rounded-[2rem] bg-surface p-8 sm:p-12">
          {/* Glow */}
          <div className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-radial-fade" />

          <div className="relative text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-muted px-3 py-1 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {profile.available ? 'Open to opportunities' : 'Get in touch'}
            </span>

            <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
              Let's build something <span className="text-gradient-brand">great</span> together.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Whether you're hiring, collaborating, or just want to talk shop about backend systems
              and AI — my inbox is always open.
            </p>

            {/* Primary actions */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button as="a" href={`mailto:${profile.email}`} size="lg">
                <Send className="size-4" />
                Email me
              </Button>
              <button
                onClick={copyEmail}
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-surface px-5 text-sm font-medium text-foreground transition-colors hover:border-brand-400/40 hover:bg-surface-muted"
              >
                {copied ? (
                  <>
                    <Check className="size-4 text-emerald-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="size-4" />
                    {profile.email}
                  </>
                )}
              </button>
            </div>

            {/* Contact details */}
            <div className="mx-auto mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {contactDetails.map((d) => {
                const inner = (
                  <div className="card flex h-full flex-col items-center gap-1 p-4 text-center transition-colors hover:border-brand-400/40">
                    <d.icon className="size-5 text-brand-500" />
                    <span className="mt-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {d.label}
                    </span>
                    <span className="text-sm font-medium text-foreground">{d.value}</span>
                  </div>
                )
                return 'href' in d && d.href ? (
                  <a key={d.label} href={d.href} className="block">
                    {inner}
                  </a>
                ) : (
                  <div key={d.label}>{inner}</div>
                )
              })}
            </div>

            {/* Socials */}
            <div className="mt-8 flex items-center justify-center gap-2">
              {socials.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  whileHover={{ y: -3 }}
                  className="group inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-brand-400/40 hover:text-foreground"
                >
                  <s.icon className="size-4" />
                  <span className="hidden sm:inline">{s.label}</span>
                  <ArrowUpRight className="size-3.5 opacity-0 transition-opacity group-hover:opacity-60" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
