import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'brand' | 'outline'
  className?: string
}

const variants: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-surface-muted text-muted-foreground border-border',
  brand: 'bg-brand-500/10 text-brand-600 border-brand-500/20',
  outline: 'bg-transparent text-foreground/80 border-border',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs font-medium leading-none transition-colors',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
