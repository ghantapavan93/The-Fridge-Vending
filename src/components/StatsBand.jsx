import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'
import { STATS } from '../lib/content'

export default function StatsBand() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nums = gsap.utils.toArray('.stat-num')
      nums.forEach((el) => {
        const end = Number(el.dataset.value)
        const prefix = el.dataset.prefix || ''
        const suffix = el.dataset.suffix || ''
        const render = (v) => (el.textContent = `${prefix}${Math.round(v)}${suffix}`)
        if (prefersReducedMotion()) {
          render(end)
          return
        }
        const obj = { v: 0 }
        render(0)
        gsap.to(obj, {
          v: end,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate: () => render(obj.v),
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative z-10 -mt-8 md:-mt-12">
      <div className="container-x">
        <div className="glass grid grid-cols-2 gap-6 rounded-3xl px-6 py-8 md:grid-cols-4 md:px-10">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl font-extrabold text-navy-900 md:text-5xl">
                <span
                  className="stat-num bg-gradient-to-br from-sky-500 to-navy-800 bg-clip-text text-transparent"
                  data-value={s.value}
                  data-prefix={s.prefix || ''}
                  data-suffix={s.suffix || ''}
                >
                  {s.prefix || ''}
                  {s.value}
                  {s.suffix || ''}
                </span>
              </div>
              <p className="mt-1.5 text-sm font-medium text-ink/60">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
