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

      {/* Aurora fields — most intense near the hero (top), calmer below.
          Translate-only animation (no scale) keeps the blurred layers on the
          GPU compositor so they never re-rasterize while scrolling. */}
      <motion.div
        className="absolute -left-[12%] -top-[18%] h-[62vh] w-[60vw] rounded-full blur-[100px] will-change-transform"
        style={{ background: 'radial-gradient(circle, hsl(var(--aurora-1) / var(--aurora-strength)), transparent 68%)' }}
        animate={{ x: [0, 70, -20, 0], y: [0, 40, 20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[-12%] -top-[8%] h-[58vh] w-[50vw] rounded-full blur-[100px] will-change-transform"
        style={{ background: 'radial-gradient(circle, hsl(var(--aurora-2) / var(--aurora-strength)), transparent 68%)' }}
        animate={{ x: [0, -60, 30, 0], y: [0, 50, 10, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-[18%] top-[22%] h-[48vh] w-[42vw] rounded-full blur-[100px] will-change-transform"
        style={{ background: 'radial-gradient(circle, hsl(var(--aurora-3) / calc(var(--aurora-strength) * 0.95)), transparent 68%)' }}
        animate={{ x: [0, 50, -40, 0], y: [0, -30, 30, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute right-[12%] top-[48%] h-[42vh] w-[38vw] rounded-full blur-[110px] will-change-transform"
        style={{ background: 'radial-gradient(circle, hsl(var(--aurora-4) / calc(var(--aurora-strength) * 0.7)), transparent 70%)' }}
        animate={{ x: [0, -40, 20, 0], y: [0, 30, -20, 0] }}
        transition={{ duration: 42, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Fine dotted texture, faded toward the bottom (static — rasterized once) */}
      <div
        className="absolute inset-0 mask-fade-b opacity-[0.5] dark:opacity-35"
        style={{
          backgroundImage: 'radial-gradient(hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Subtle grain — plain overlay (no blend mode) so it never recomputes */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  )
}
