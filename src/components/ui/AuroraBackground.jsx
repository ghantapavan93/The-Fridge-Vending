import { motion } from 'motion/react'
import { cn } from '../../lib/cn'
import { prefersReducedMotion } from '../../lib/gsap'

/**
 * Aurora background — the 21st.dev / Aceternity "Aurora Background" effect,
 * ported to JSX + Tailwind v4 and re-tinted to The Fridge's ice-blue / green
 * brand palette. Rendered as an absolutely-positioned background layer (drop it
 * into a relatively/absolutely-positioned parent) rather than a page wrapper.
 *
 * The colour bands live in CSS variables so the palette stays on-brand; the
 * `aurora` keyframe (index.css) drifts the gradient, and Framer Motion fades
 * the whole layer in. Under reduced motion the drift + fade are skipped.
 */
export default function AuroraBackground({ className = '', showRadialGradient = true }) {
  const reduce = prefersReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6, ease: 'easeOut' }}
      aria-hidden="true"
      className={cn('absolute inset-0 overflow-hidden', className)}
      style={{
        // Brand-tinted aurora bands (ice blue → sky → mint → violet).
        '--aurora':
          'repeating-linear-gradient(100deg,var(--brand-blue)_10%,var(--brand-indigo)_15%,var(--brand-sky)_20%,var(--brand-mint)_25%,var(--brand-blue2)_30%)',
        '--white-gradient':
          'repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)',
        '--brand-blue': '#1e90ff',
        '--brand-blue2': '#38a0ff',
        '--brand-sky': '#7fd0ff',
        '--brand-indigo': '#7aa8ff',
        '--brand-mint': '#8ff0c0',
      }}
    >
      <div
        className={cn(
          `pointer-events-none absolute -inset-[10px]
           [background-image:var(--white-gradient),var(--aurora)]
           [background-size:300%,_200%] [background-position:50%_50%,50%_50%]
           opacity-60 blur-[9px] invert filter will-change-transform
           after:absolute after:inset-0 after:content-['']
           after:[background-image:var(--white-gradient),var(--aurora)]
           after:[background-size:200%,_100%] after:[background-attachment:fixed]
           after:mix-blend-difference ${reduce ? '' : 'after:animate-aurora'}`,
          showRadialGradient &&
            '[mask-image:radial-gradient(ellipse_at_70%_-10%,black_18%,transparent_72%)]'
        )}
      />
    </motion.div>
  )
}
