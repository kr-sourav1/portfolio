import { ArrowUp } from 'lucide-react'
import { navItems, profile, socials } from '@/data/content'
import { scrollToSection } from '@/lib/utils'

export function Footer() {
  return (
    <footer className="relative border-t border-border py-12">
      <div className="container">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand + blurb */}
          <div className="max-w-sm text-center md:text-left">
            <button
              onClick={() => scrollToSection('hero')}
              className="inline-flex items-center gap-2.5 text-base font-semibold tracking-tight"
            >
              <span className="grid size-8 place-items-center rounded-lg bg-brand-gradient font-display text-[15px] text-white">
                S
              </span>
              {profile.name}
            </button>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {profile.title} based in Bengaluru. Open to opportunities and
              interesting problems.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                aria-label={s.label}
                className="grid size-10 place-items-center rounded-xl border border-border bg-surface text-muted-foreground transition-colors hover:border-brand-400/40 hover:text-foreground"
              >
                <s.icon className="size-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {2026} {profile.name}. Designed & built with React, TypeScript & Tailwind.
          </p>
          <button
            onClick={() => scrollToSection('hero')}
            className="group inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to top
            <span className="grid size-6 place-items-center rounded-md border border-border transition-transform group-hover:-translate-y-0.5">
              <ArrowUp className="size-3" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}
