import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind class names with conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format an ISO/year string range for experience & education entries. */
export function formatDateRange(start: string, end?: string | null): string {
  return end ? `${start} — ${end}` : `${start} — Present`
}

/** Compact number formatting, e.g. 1_500 -> "1.5k". */
export function formatCompact(value: number): string {
  return new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(
    value,
  )
}

/** Smooth-scroll to a section id, accounting for the fixed navbar. */
export function scrollToSection(id: string): void {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  // Update the hash without triggering a jump.
  history.replaceState(null, '', `#${id}`)
}
