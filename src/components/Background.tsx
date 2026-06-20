/**
 * Ambient page background: a fixed grid with a radial brand glow at the top
 * and two slow-drifting blurred orbs. Sits behind all content (-z-10) and is
 * fully decorative (aria-hidden).
 */
import { motion } from 'framer-motion'

export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Grid */}
      <div className="absolute inset-0 bg-grid bg-[size:64px_64px] mask-fade-b opacity-[0.4]" />

      {/* Top radial brand fade */}
      <div className="absolute inset-x-0 top-0 h-[600px] bg-radial-fade" />

      {/* Drifting orbs */}
      <motion.div
        className="absolute -left-32 top-24 size-[420px] rounded-full bg-brand-500/20 blur-[120px]"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-32 top-[40%] size-[380px] rounded-full bg-brand-400/15 blur-[120px]"
        animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
