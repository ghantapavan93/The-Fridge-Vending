import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { scrollToId } from '../hooks/useSmoothScroll'
import SplitHeading from './ui/SplitHeading'
import Icon from './ui/Icon'
import AnimatedLogo from './ui/AnimatedLogo'

const DRIFT = ['⚡', '💧', '🥗', '🍱', '💪', '🧸', '🥤', '🍫', '🧩', '🍎']

export default function FinalCTA() {
  const root = useRef(null)
  const chips = useRef([])
  chips.current = []
  const add = (el) => el && !chips.current.includes(el) && chips.current.push(el)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      chips.current.forEach((c, i) => {
        gsap.to(c, {
          y: `+=${20 + (i % 4) * 10}`,
          x: `+=${(i % 2 ? -1 : 1) * 12}`,
          rotation: (i % 2 ? -1 : 1) * 8,
          duration: 4 + (i % 5),
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative overflow-hidden bg-cloud py-24 md:py-32">
      {/* drifting background chips */}
      <div className="pointer-events-none absolute inset-0 -z-0">
        {DRIFT.map((e, i) => (
          <span
            key={i}
            ref={add}
            className="absolute text-2xl opacity-40 md:text-3xl"
            style={{
              left: `${(i * 9.7 + 6) % 92}%`,
              top: `${(i * 17 + 12) % 80}%`,
            }}
          >
            {e}
          </span>
        ))}
      </div>

      <div className="container-x relative z-10">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] bg-navy-950 px-7 py-16 text-center text-white shadow-[var(--shadow-lift)] md:px-16 md:py-20">
          {/* spotlight */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(30,144,255,0.55),transparent_60%)] blur-2xl" />
          {/* faint brand watermark */}
          <div className="pointer-events-none absolute -bottom-10 -left-6 opacity-[0.06] blur-[1px] md:-left-2">
            <AnimatedLogo variant="mark" size={220} />
          </div>
          <div className="relative z-10">
            <span className="eyebrow mb-5 justify-center !text-sky-300">Ready when you are</span>
            <SplitHeading
              text="Bring The Fridge to your location."
              accentWords={['Fridge']}
              className="mx-auto max-w-2xl text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl"
            />
            <p className="mx-auto mt-5 max-w-xl text-base text-white/75 md:text-lg">
              The cold drink, the quick lunch, the little treat — all waiting right where your people
              already are. Placement is free. The upside isn’t.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToId('#contact') }}
                className="btn btn-primary !bg-white !text-navy-900 hover:!shadow-[0_26px_60px_-16px_rgba(255,255,255,0.5)]"
              >
                Request a Free Placement <Icon name="arrow" size={18} />
              </a>
              <a href="tel:+15129239313" className="btn btn-ghost !border-white/25 !bg-white/10 !text-white hover:!bg-white/20">
                <Icon name="phone" size={17} /> 512-923-9313
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
