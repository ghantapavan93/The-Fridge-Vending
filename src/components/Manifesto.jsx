import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'
import { MANIFESTO } from '../lib/content'
import FrostParticles from './ui/FrostParticles'
import AnimatedLogo from './ui/AnimatedLogo'

export default function Manifesto() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray('.mf-line')
      const tail = root.current.querySelector('.mf-tail')

      if (prefersReducedMotion()) {
        gsap.set([...lines, tail], { autoAlpha: 1, y: 0 })
        return
      }

      gsap.set(lines, { autoAlpha: 0, y: 40, filter: 'blur(10px)' })
      gsap.set(tail, { autoAlpha: 0, y: 20 })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top 68%', once: true },
      })
      tl.to(lines, {
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.28,
      }).to(tail, { autoAlpha: 1, y: 0, duration: 0.8 }, '-=0.3')
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative overflow-hidden bg-navy-950 py-28 text-white md:py-40">
      {/* ambiance */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(30,144,255,0.28),transparent_60%),radial-gradient(45%_45%_at_80%_100%,rgba(34,194,107,0.16),transparent_60%)]" />
        <FrostParticles count={30} color="127,208,255" className="absolute inset-0 opacity-70" />
      </div>
      {/* faint brand watermark */}
      <div className="pointer-events-none absolute right-[4%] top-1/2 -translate-y-1/2 opacity-[0.05] blur-[1px]">
        <AnimatedLogo variant="mark" size={340} />
      </div>

      <div className="container-x relative z-10">
        <span className="eyebrow mb-8 !text-sky-300">{MANIFESTO.eyebrow}</span>
        <div className="max-w-4xl">
          {MANIFESTO.lines.map((l, i) => (
            <p
              key={i}
              className={`mf-line leading-[1.02] tracking-tight ${
                l.accent
                  ? 'mt-3 bg-gradient-to-r from-sky-300 to-fresh-400 bg-clip-text font-serif text-7xl italic text-transparent sm:text-8xl md:text-9xl'
                  : 'font-display text-4xl font-extrabold text-white/95 sm:text-5xl md:text-6xl'
              }`}
            >
              {l.text}
            </p>
          ))}
          <p className="mf-tail mt-10 max-w-2xl text-lg text-white/65 md:text-xl">
            {MANIFESTO.tail}
          </p>
        </div>
      </div>
    </section>
  )
}
