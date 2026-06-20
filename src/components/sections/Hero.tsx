import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Mail, MapPin, Sparkles } from 'lucide-react'
import { profile, socials, stats } from '@/data/content'
import { scrollToSection } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Magnetic } from '@/components/ui/Magnetic'
import { TechMarquee } from '@/components/sections/TechMarquee'

const iconFor = { GitHub: Github, LinkedIn: Linkedin, Email: Mail } as const

function RotatingRole() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % profile.roles.length), 2600)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="relative inline-flex h-[1.2em] items-center overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="whitespace-nowrap text-gradient-brand"
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export function Hero() {
  return (
    <section id="hero" className="section-anchor relative flex min-h-svh items-center pt-28 pb-16">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left: copy */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-sm text-muted-foreground backdrop-blur"
            >
              {profile.available ? (
                <>
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                  </span>
                  Available for new opportunities
                </>
              ) : (
                <>
                  <Sparkles className="size-3.5 text-brand-500" />
                  {profile.title}
                </>
              )}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
            >
              <span className="text-gradient">Hi, I'm {profile.firstName}.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-3 text-2xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              <RotatingRole />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0"
            >
              {profile.summary}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start"
            >
              <Magnetic>
                <Button onClick={() => scrollToSection('projects')} size="lg">
                  View my work
                  <ArrowDown className="size-4" />
                </Button>
              </Magnetic>
              <Button as="a" href="#contact" variant="secondary" size="lg">
                Get in touch
              </Button>
            </motion.div>

            {/* Socials + location */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
            >
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="size-4" />
                {profile.location}
              </div>
              <span className="hidden h-4 w-px bg-border sm:block" />
              <div className="flex items-center gap-2">
                {socials
                  .filter((s) => s.label in iconFor)
                  .map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      aria-label={s.label}
                      className="grid size-9 place-items-center rounded-lg border border-border bg-surface text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-brand-400/40 hover:text-foreground"
                    >
                      <s.icon className="size-[17px]" />
                    </a>
                  ))}
              </div>
            </motion.div>
          </div>

          {/* Right: portrait + stat orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="gradient-border relative aspect-square rounded-[2rem]">
              <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  width={448}
                  height={448}
                  loading="eager"
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </div>

              {/* Floating glass stat chips */}
              <FloatingChip className="-left-6 top-10" delay={0.6}>
                <span className="text-lg font-bold text-foreground">1713</span>
                <span className="text-xs text-muted-foreground">LeetCode rating</span>
              </FloatingChip>
              <FloatingChip className="-right-4 bottom-24" delay={0.8}>
                <span className="text-lg font-bold text-foreground">Top 12%</span>
                <span className="text-xs text-muted-foreground">400+ DSA solved</span>
              </FloatingChip>
              <FloatingChip className="bottom-6 left-1/2 -translate-x-1/2" delay={1}>
                <span className="text-lg font-bold text-foreground">~25%</span>
                <span className="text-xs text-muted-foreground">latency reduced</span>
              </FloatingChip>
            </div>
          </motion.div>
        </div>

        {/* Stat strip */}
        <motion.dl
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-surface p-5 text-center sm:p-6">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <div className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-sm font-medium text-foreground/80">{s.label}</div>
                {s.detail && (
                  <div className="mt-0.5 text-xs text-muted-foreground">{s.detail}</div>
                )}
              </dd>
            </div>
          ))}
        </motion.dl>

        <div className="mt-16">
          <TechMarquee />
        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollToSection('about')}
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="grid size-10 place-items-center rounded-full border border-border bg-surface/60 text-muted-foreground backdrop-blur"
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.button>
    </section>
  )
}

function FloatingChip({
  children,
  className,
  delay,
}: {
  children: React.ReactNode
  className?: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
        className="glass flex min-w-[120px] flex-col rounded-2xl border border-border px-4 py-2.5 shadow-soft"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}
