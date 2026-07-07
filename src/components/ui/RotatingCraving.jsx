import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'
import { CRAVINGS } from '../../lib/content'

/**
 * Kinetic line: "Get your …" where the craving flips with a frosty slide+blur.
 * Under reduced motion it simply shows the first craving, static.
 */
export default function RotatingCraving() {
  const [i, setI] = useState(0)
  const wordRef = useRef(null)
  const idx = useRef(0)

  useEffect(() => {
    if (prefersReducedMotion()) return
    let tween
    const tick = () => {
      const el = wordRef.current
      if (!el) return
      tween = gsap.to(el, {
        yPercent: -50,
        opacity: 0,
        filter: 'blur(8px)',
        duration: 0.45,
        ease: 'power2.in',
        onComplete: () => {
          idx.current = (idx.current + 1) % CRAVINGS.length
          setI(idx.current)
          gsap.fromTo(
            el,
            { yPercent: 50, opacity: 0, filter: 'blur(8px)' },
            { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 0.55, ease: 'power3.out' }
          )
        },
      })
    }
    const id = setInterval(tick, 2200)
    return () => {
      clearInterval(id)
      tween && tween.kill()
    }
  }, [])

  const c = CRAVINGS[i]

  return (
    <span className="inline-flex flex-wrap items-baseline gap-x-2 gap-y-0">
      <span className="text-navy-900/85">Get your</span>
      <span className="relative inline-flex items-center overflow-hidden pb-1 align-bottom">
        <span
          ref={wordRef}
          className="inline-flex items-center gap-2 font-extrabold"
          style={{ willChange: 'transform, opacity, filter' }}
        >
          <span aria-hidden className="text-[0.8em]">{c.emoji}</span>
          {/* flowing gradient from the craving's colour into brand blue */}
          <span
            style={{
              backgroundImage: `linear-gradient(100deg, ${c.color}, #1e90ff, ${c.color})`,
              backgroundSize: '220% auto',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              animation: prefersReducedMotion() ? 'none' : 'gradientFlow 6s ease infinite',
            }}
          >
            {c.word}
          </span>
        </span>
      </span>
    </span>
  )
}
