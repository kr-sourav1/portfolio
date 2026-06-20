import { useRef, type ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

/** The bento layout grid: a dense, asymmetric 6-column grid on desktop. */
export function BentoGrid({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 gap-3.5 sm:gap-4 lg:grid-cols-6 lg:gap-5',
        className,
      )}
    >
      {children}
    </div>
  )
}

interface BentoTileProps {
  children: ReactNode
  className?: string
  /** Cursor-follow aurora spotlight (default on). */
  spotlight?: boolean
  /** Soft aurora glow bleeding from one corner. */
  glow?: 'none' | 'indigo' | 'violet' | 'pink' | 'cyan'
  interactive?: boolean
}

const glowColor: Record<NonNullable<BentoTileProps['glow']>, string> = {
  none: '',
  indigo: 'var(--aurora-1)',
  violet: 'var(--aurora-2)',
  pink: 'var(--aurora-3)',
  cyan: 'var(--aurora-4)',
}

/**
 * A single bento tile. Renders an aurora spotlight that tracks the cursor
 * (driven by motion values, so no React re-render on mouse move) and an
 * optional static corner glow. Pass col-/row-span via className.
 */
export function BentoTile({
  children,
  className,
  spotlight = true,
  glow = 'none',
  interactive = true,
}: BentoTileProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(-300)
  const mouseY = useMotionValue(-300)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const background = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, hsl(var(--aurora-2) / 0.14), transparent 70%)`

  return (
    <div
      ref={ref}
      onMouseMove={spotlight ? handleMouseMove : undefined}
      className={cn('group', interactive ? 'tile-interactive' : 'tile', className)}
    >
      {glow !== 'none' && (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full blur-3xl opacity-50 transition-opacity duration-500 group-hover:opacity-80"
          style={{ background: `radial-gradient(circle, hsl(${glowColor[glow]} / 0.35), transparent 70%)` }}
        />
      )}
      {spotlight && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background }}
        />
      )}
      <div className="relative h-full">{children}</div>
    </div>
  )
}
