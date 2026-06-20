/**
 * Aurora gradient-mesh background: several large, slowly-drifting blurred
 * color fields (indigo → violet → pink → cyan) blended into a luminous,
 * atmospheric "Northern Lights" wash, plus a faint top vignette and a very
 * subtle grain. Fully decorative (aria-hidden), pinned behind content, and
 * animated with transform/opacity only so it stays cheap. Respects
 * reduced-motion via the global CSS reset.
 */
import { motion } from 'framer-motion'

export function Background() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base wash so the mesh reads on both themes */}
      <div className="absolute inset-0 bg-background" />

      {/* Aurora fields */}
      <motion.div
        className="absolute -left-[10%] -top-[15%] h-[55vh] w-[55vw] rounded-full blur-[110px]"
        style={{ background: 'radial-gradient(circle, hsl(var(--aurora-1) / var(--aurora-strength)), transparent 70%)' }}
        animate={{ x: [0, 80, -20, 0], y: [0, 50, 20, 0], scale: [1, 1.12, 0.98, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-10%] top-[-5%] h-[50vh] w-[45vw] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, hsl(var(--aurora-2) / var(--aurora-strength)), transparent 70%)' }}
        animate={{ x: [0, -70, 30, 0], y: [0, 60, 10, 0], scale: [1, 1.08, 1.04, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-[20%] top-[35%] h-[45vh] w-[40vw] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, hsl(var(--aurora-3) / calc(var(--aurora-strength) * 0.85)), transparent 70%)' }}
        animate={{ x: [0, 60, -40, 0], y: [0, -40, 30, 0], scale: [1, 1.1, 0.96, 1] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[15%] top-[55%] h-[42vh] w-[38vw] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, hsl(var(--aurora-4) / calc(var(--aurora-strength) * 0.8)), transparent 70%)' }}
        animate={{ x: [0, -50, 20, 0], y: [0, 40, -20, 0], scale: [1, 1.06, 1.02, 1] }}
        transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Fine dotted texture, faded toward the bottom */}
      <div
        className="absolute inset-0 mask-fade-b opacity-[0.55] dark:opacity-40"
        style={{
          backgroundImage: 'radial-gradient(hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Subtle grain for a premium, cinematic finish */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-soft-light dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
