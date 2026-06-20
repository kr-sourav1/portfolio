import { motion, useInView, type Variants } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  /** Stagger delay in seconds. */
  delay?: number
  y?: number
  className?: string
  once?: boolean
  as?: 'div' | 'span' | 'li' | 'section'
}

/**
 * Scroll-triggered fade-and-rise. Honors prefers-reduced-motion via the
 * global CSS reset (durations collapse to ~0), so no JS branch needed.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  once = true,
  as = 'div',
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: '-80px 0px -80px 0px' })

  const variants: Variants = {
    hidden: { opacity: 0, y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
    },
  }

  // `as` selects the rendered tag at runtime; we pin the TS element type to
  // div (all variants share the same motion props we pass) so the ref lines up.
  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </MotionTag>
  )
}

/** Container that staggers its direct <Reveal>-like children. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}
