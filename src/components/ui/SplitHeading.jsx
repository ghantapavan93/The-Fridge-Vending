import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../../lib/gsap'

/**
 * Word-by-word headline reveal without the paid SplitText plugin.
 * Each word sits in an overflow-hidden line and rises in on scroll (or load).
 *
 * Props:
 *  - as: tag name (default 'h2')
 *  - text: string to split into words
 *  - trigger: 'load' | 'scroll' (default 'scroll')
 *  - delay: extra delay before the timeline starts
 *  - accentWords: array of words to tint with the sky accent
 */
export default function SplitHeading({
  as: Tag = 'h2',
  text,
  className = '',
  trigger = 'scroll',
  delay = 0,
  accentWords = [],
  ...rest
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const words = el.querySelectorAll('.reveal-word')

    if (prefersReducedMotion()) {
      gsap.set(words, { y: 0, opacity: 1 })
      return
    }

    gsap.set(words, { yPercent: 118, opacity: 0 })

    const anim = () =>
      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.06,
        delay,
      })

    let st
    if (trigger === 'load') {
      const t = gsap.delayedCall(0.15, anim)
      return () => t.kill()
    } else {
      st = ScrollTrigger.create({
        trigger: el,
        start: 'top 82%',
        once: true,
        onEnter: anim,
      })
    }
    return () => st && st.kill()
  }, [text, trigger, delay])

  const accent = new Set(accentWords.map((w) => w.toLowerCase()))
  const words = text.split(' ')

  return (
    <Tag ref={ref} className={className} {...rest}>
      {words.map((word, i) => (
        <span key={i} className="reveal-line">
          <span
            className="reveal-word"
            style={
              accent.has(word.toLowerCase().replace(/[.,]/g, ''))
                ? { color: 'var(--color-sky-500)' }
                : undefined
            }
          >
            {word}
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
