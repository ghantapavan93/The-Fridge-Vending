import { prefersReducedMotion } from '../../lib/gsap'

/**
 * Flowing gradient text (21st.dev / Vercel "gradient text" style), clipped into
 * the glyphs. Optional soft glow duplicate pulses behind it. Tuned for a LIGHT
 * background, so the default palette stays saturated enough to read.
 *
 * Props:
 *  - as: tag ('span' | 'h1' | ...)
 *  - gradient: CSS gradient string
 *  - glow: render a blurred pulsing duplicate behind
 *  - animate: flow the gradient (default true)
 *  - duration: seconds per flow cycle
 */
export default function AnimatedGradientText({
  as: Tag = 'span',
  children,
  className = '',
  gradient = 'linear-gradient(100deg,#1e40af,#1e90ff,#4f46e5,#0ea5e9,#7c3aed,#1e40af)',
  glow = false,
  animate = true,
  duration = 7,
  ...rest
}) {
  const reduce = prefersReducedMotion()
  const flowing = animate && !reduce

  const clip = {
    backgroundImage: gradient,
    backgroundSize: '220% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
    animation: flowing ? `gradientFlow ${duration}s ease infinite` : 'none',
  }

  return (
    <Tag className={`relative inline-block ${className}`} {...rest}>
      {glow && !reduce && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 select-none blur-[22px]"
          style={{ ...clip, animation: `${flowing ? `gradientFlow ${duration}s ease infinite, ` : ''}glowPulse 4.5s ease-in-out infinite` }}
        >
          {children}
        </span>
      )}
      <span className="relative" style={clip}>
        {children}
      </span>
    </Tag>
  )
}
