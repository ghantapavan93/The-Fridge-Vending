import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap'

/**
 * Generic scroll-reveal wrapper. Transform + opacity only (cheap, GPU-friendly).
 *
 * variant: 'up' | 'fade' | 'clip' | 'scale'
 */
export default function Reveal({
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  duration = 0.9,
  y = 42,
  start = 'top 85%',
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      gsap.set(el, { clearProps: 'all', opacity: 1 })
      return
    }

    const from = {
      up: { y, opacity: 0 },
      fade: { opacity: 0 },
      scale: { scale: 0.92, opacity: 0, transformOrigin: '50% 60%' },
      clip: { opacity: 0, clipPath: 'inset(0 0 100% 0)', y: 24 },
    }[variant]

    const to = {
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      clipPath: 'inset(0 0 0% 0)',
      duration,
      delay,
      ease: 'power3.out',
    }

    gsap.set(el, from)
    const st = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () => gsap.to(el, to),
    })
    return () => st.kill()
  }, [variant, delay, duration, y, start])

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
