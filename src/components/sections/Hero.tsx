import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, MapPin } from 'lucide-react'
import { profile, socials, stats } from '@/data/content'
import { scrollToSection } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Magnetic } from '@/components/ui/Magnetic'
import { BentoGrid, BentoTile } from '@/components/ui/Bento'
import { TechMarquee } from '@/components/sections/TechMarquee'

const heroSocials = socials.filter((s) => ['GitHub', 'LinkedIn', 'Email'].includes(s.label))
const socialIcon = { GitHub: Github, LinkedIn: Linkedin, Email: Mail } as const

function RotatingRole() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % profile.roles.length), 2600)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="relative inline-flex h-[1.25em] items-center overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="whitespace-nowrap text-aurora"
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

const tileIn = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

const statGlow = ['indigo', 'violet', 'cyan', 'pink'] as const

export function Hero() {
  return (
    <section id="hero" className="section-anchor relative flex min-h-svh items-center pt-28 pb-16">
      <div className="container">
        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.06, delayChildren: 0.05 }}
        >
          <BentoGrid className="lg:auto-rows-[11rem]">
            {/* Intro */}
            <motion.div
              variants={tileIn}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-2 lg:col-span-4 lg:row-span-2"
            >
              <BentoTile glow="indigo" className="flex h-full flex-col justify-center p-6 sm:p-8">
                <div className="flex items-center gap-2.5">
                  <span className="eyebrow">
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                    </span>
                    Open to opportunities
                  </span>
                  <span className="hidden items-center gap-1.5 text-xs text-muted-foreground sm:inline-flex">
                    <MapPin className="size-3.5" />
                    {profile.location}
                  </span>
                </div>

                <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="text-gradient">Hi, I'm {profile.firstName}.</span>
                </h1>
                <div className="mt-2 text-xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                  <RotatingRole />
                </div>

                <p className="mt-5 max-w-xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {profile.summary}
                </p>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Magnetic>
                    <Button onClick={() => scrollToSection('projects')} size="lg">
                      View my work
                      <ArrowDown className="size-4" />
                    </Button>
                  </Magnetic>
                  <Button as="a" href="#contact" variant="secondary" size="lg">
                    Get in touch
                  </Button>
                </div>
              </BentoTile>
            </motion.div>

            {/* Avatar */}
            <motion.div
              variants={tileIn}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-2 lg:col-span-2 lg:row-span-3"
            >
              <BentoTile spotlight={false} className="h-full min-h-[360px] p-0 lg:min-h-0">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  loading="eager"
                  className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <div className="text-lg font-semibold tracking-tight text-foreground">
                    {profile.name}
                  </div>
                  <div className="text-sm text-muted-foreground">{profile.title}</div>
                  <div className="mt-4 flex gap-2">
                    {heroSocials.map((s) => {
                      const Icon = socialIcon[s.label as keyof typeof socialIcon]
                      return (
                        <a
                          key={s.label}
                          href={s.href}
                          target={s.href.startsWith('http') ? '_blank' : undefined}
                          rel="noreferrer"
                          aria-label={s.label}
                          className="grid size-9 place-items-center rounded-xl border border-border bg-surface/80 text-muted-foreground backdrop-blur transition-all hover:-translate-y-0.5 hover:border-brand-400/40 hover:text-foreground"
                        >
                          <Icon className="size-[17px]" />
                        </a>
                      )
                    })}
                  </div>
                </div>
              </BentoTile>
            </motion.div>

            {/* Stats */}
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                variants={tileIn}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="col-span-1 lg:col-span-2"
              >
                <BentoTile glow={statGlow[i % statGlow.length]} className="flex h-full flex-col justify-center p-6">
                  <div className="tabular text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-sm font-medium text-foreground/85">{s.label}</div>
                  {s.detail && <div className="mt-0.5 text-xs text-muted-foreground">{s.detail}</div>}
                </BentoTile>
              </motion.div>
            ))}

            {/* Mini CTA */}
            <motion.div
              variants={tileIn}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-2 lg:col-span-2"
            >
              <button onClick={() => scrollToSection('contact')} className="block size-full text-left">
                <BentoTile glow="violet" className="flex h-full flex-col justify-center p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">Let's work together</span>
                    <span className="grid size-8 place-items-center rounded-lg border border-border bg-surface text-brand-600 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    Hiring or collaborating? My inbox is open.
                  </p>
                </BentoTile>
              </button>
            </motion.div>
          </BentoGrid>

          {/* Tech marquee — slim full-width strip, kept OUT of the fixed-height
              bento rows so a single row of chips never stretches into a tall,
              mostly-empty tile. */}
          <motion.div
            variants={tileIn}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3.5 sm:mt-4 lg:mt-5"
          >
            <BentoTile spotlight={false} interactive={false} className="flex items-center px-2 py-4">
              <TechMarquee />
            </BentoTile>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollToSection('about')}
        aria-label="Scroll to about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 lg:block"
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
