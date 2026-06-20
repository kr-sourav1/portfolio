import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { navItems, profile } from '@/data/content'
import { useScrollSpy } from '@/hooks/useScrollSpy'
import { scrollToSection, cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/ThemeToggle'

const ids = navItems.map((n) => n.id)

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(ids)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function handleNav(id: string) {
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container">
        <nav
          className={cn(
            'mx-auto mt-3 flex h-14 items-center justify-between rounded-2xl px-3 transition-all duration-300 sm:px-4',
            scrolled
              ? 'glass border border-border shadow-soft'
              : 'border border-transparent',
          )}
        >
          {/* Brand */}
          <button
            onClick={() => scrollToSection('hero')}
            className="group flex items-center gap-2.5 rounded-lg px-1.5 py-1 text-sm font-semibold tracking-tight"
          >
            <span className="grid size-8 place-items-center rounded-lg bg-brand-gradient font-display text-[15px] text-white shadow-glow">
              S
            </span>
            <span className="hidden sm:inline">{profile.name}</span>
          </button>

          {/* Desktop links */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = active === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={cn(
                    'relative rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                    isActive
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-surface-muted"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.label}
                </button>
              )
            })}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <a
              href={profile.resumeUrl}
              className="hidden items-center gap-1.5 rounded-xl border border-border bg-surface px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-brand-400/40 hover:bg-surface-muted sm:inline-flex"
            >
              Résumé
              <ArrowUpRight className="size-3.5" />
            </a>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid size-10 place-items-center rounded-xl border border-border bg-surface text-foreground transition-colors hover:bg-surface-muted md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 top-[4.75rem] z-40 md:hidden"
          >
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="glass overflow-hidden rounded-2xl border border-border p-2 shadow-soft"
              >
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-base font-medium transition-colors',
                      active === item.id
                        ? 'bg-surface-muted text-foreground'
                        : 'text-muted-foreground hover:bg-surface-muted hover:text-foreground',
                    )}
                  >
                    {item.label}
                    <ArrowUpRight className="size-4 opacity-50" />
                  </button>
                ))}
                <a
                  href={profile.resumeUrl}
                  className="mt-1 flex w-full items-center justify-between rounded-xl bg-brand-500 px-4 py-3 text-left text-base font-medium text-white"
                >
                  Download Résumé
                  <ArrowUpRight className="size-4" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
