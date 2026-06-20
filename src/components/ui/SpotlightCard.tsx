import { useRef, type ReactNode } from 'react'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
}

/**
 * Card that renders a soft radial spotlight following the cursor — the
 * Linear/Vercel hover treatment. Pure CSS variables driven by motion values,
 * so it stays cheap (no React re-renders on mouse move).
 */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const background = useMotionTemplate`radial-gradient(420px circle at ${mouseX}px ${mouseY}px, hsl(var(--aurora-2) / 0.14), transparent 70%)`

  return (
    <div ref={ref} onMouseMove={handleMouseMove} className="tile-interactive group h-full">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      {/* Layout className is applied here, on the wrapper that actually holds
          the content, so flex-row / h-full reach the card's columns. */}
      <div className={cn('relative h-full', className)}>{children}</div>
    </div>
  )
}
