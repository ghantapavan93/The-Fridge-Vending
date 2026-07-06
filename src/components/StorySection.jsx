import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import SplitHeading from './ui/SplitHeading'
import Icon from './ui/Icon'

const CARDS = [
  {
    label: 'Auto Shops',
    tint: 'var(--color-sky-500)',
    img: '/assets/machine-tall.png',
    line: 'Cold drinks & snacks for the waiting room.',
  },
  {
    label: 'Apartments',
    tint: 'var(--color-fresh-500)',
    img: '/assets/machine-double.png',
    line: 'A modern amenity in the clubhouse.',
  },
  {
    label: 'Employee Spaces',
    tint: 'var(--color-mango-500)',
    img: '/assets/machine-mini.png',
    line: 'Quick meals right where they work.',
  },
]

export default function StorySection() {
  const root = useRef(null)
  const stage = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      const cards = gsap.utils.toArray('.story-card')
      const hint = root.current.querySelector('.story-hint')

      const mm = gsap.matchMedia()

      // Desktop / tablet: pin and fan the cards out
      mm.add('(min-width: 768px)', () => {
        // start: stacked in the centre
        gsap.set(cards, {
          xPercent: 0,
          scale: 0.86,
          rotate: (i) => [-4, 0, 4][i],
          transformOrigin: '50% 90%',
        })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: '+=120%',
            scrub: 0.6,
            pin: stage.current,
            anticipatePin: 1,
          },
        })

        tl.to(cards, {
          xPercent: (i) => [-108, 0, 108][i],
          scale: 1,
          rotate: 0,
          duration: 1,
          ease: 'power2.inOut',
          stagger: 0.04,
        })
          .from(
            '.story-card .card-meta',
            { autoAlpha: 0, y: 20, stagger: 0.1, duration: 0.5 },
            '-=0.4'
          )
          .to(hint, { autoAlpha: 0, duration: 0.3 }, 0)
      })

      // Mobile: simple staggered fade-up, no pin
      mm.add('(max-width: 767px)', () => {
        gsap.from(cards, {
          autoAlpha: 0,
          y: 40,
          duration: 0.7,
          stagger: 0.12,
          scrollTrigger: { trigger: stage.current, start: 'top 78%', once: true },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="what" ref={root} className="relative bg-white py-20 md:py-0">
      <div ref={stage} className="md:flex md:min-h-screen md:flex-col md:justify-center md:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow mb-4 justify-center">What Is The Fridge?</span>
            <SplitHeading
              text="Not a vending machine. A moment of yes."
              accentWords={['yes.']}
              className="text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl md:text-5xl"
            />
            <p className="mx-auto mt-5 max-w-2xl text-base text-ink/70 md:text-lg">
              Every location is different. A repair-shop waiting room, an apartment clubhouse, and an
              employee break area don’t need the same product mix. The Fridge is customized around
              what people actually want — from cold drinks and healthy snacks to lunch items, small
              toys, puzzles, and everyday favorites.
            </p>
          </div>

          {/* Fan-out stage */}
          <div className="relative mt-12 md:mt-16">
            <div className="story-hint pointer-events-none absolute left-1/2 top-full mt-4 hidden -translate-x-1/2 text-xs uppercase tracking-widest text-navy-900/40 md:block">
              Keep scrolling
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 md:relative md:mx-auto md:block md:h-[26rem] md:max-w-xs">
              {CARDS.map((c) => (
                <article
                  key={c.label}
                  className="story-card glass rounded-3xl p-4 md:absolute md:inset-0 md:mx-auto"
                >
                  <div
                    className="relative overflow-hidden rounded-2xl"
                    style={{ background: `linear-gradient(160deg, ${c.tint}14, #0b1c5508)` }}
                  >
                    <img
                      src={c.img}
                      alt={c.label}
                      className="mx-auto h-52 w-auto object-contain py-3 drop-shadow-xl md:h-56"
                      loading="lazy"
                    />
                  </div>
                  <div className="card-meta mt-4 px-1">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.tint }} />
                      <h3 className="text-lg font-bold text-navy-900">{c.label}</h3>
                    </div>
                    <p className="mt-1 flex items-start gap-1.5 text-sm text-ink/65">
                      <Icon name="check" size={15} className="mt-0.5 shrink-0 text-fresh-500" />
                      {c.line}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
