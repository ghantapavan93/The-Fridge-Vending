import { Fragment, useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap'

/**
 * "Text Generate" effect (21st.dev / Aceternity): each word fades up and
 * un-blurs in sequence when the line scrolls into view. Optional gradient clip
 * keeps the premium colour. Static + fully visible under reduced motion.
 *
 * Props:
 *  - text, as (tag), className
 *  - gradient: CSS gradient clipped into the words
 *  - stagger, start (ScrollTrigger start), delay
 */
export default function TextGenerate({
  text,
  as: Tag = 'p',
  className = '',
  gradient,
  stagger = 0.035,
  start = 'top 90%',
  delay = 0,
}) {
  const ref = useRef(null)
  const words = text.split(' ')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const spans = el.querySelectorAll('.tg-word')

    if (prefersReducedMotion()) {
      gsap.set(spans, { opacity: 1, filter: 'blur(0px)', y: 0 })
      return
    }

    gsap.set(spans, { opacity: 0, filter: 'blur(8px)', y: 8 })
    const st = ScrollTrigger.create({
      trigger: el,
      start,
      once: true,
      onEnter: () =>
        gsap.to(spans, {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger,
          delay,
        }),
    })
    return () => st.kill()
  }, [text, stagger, start, delay])

  const clip = gradient
    ? {
        backgroundImage: gradient,
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
      }
    : undefined

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span
            className="tg-word inline-block will-change-[opacity,transform,filter]"
            style={clip}
          >
            {w}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </Fragment>
      ))}
    </Tag>
  )
}
