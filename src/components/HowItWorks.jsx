import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import { STEPS } from '../lib/content'
import SplitHeading from './ui/SplitHeading'

export default function HowItWorks() {
  const root = useRef(null)
  const stickyImg = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      const steps = gsap.utils.toArray('.how-step')
      const progress = root.current.querySelector('.how-progress')

      // progress line grows with scroll through the list
      if (progress) {
        gsap.fromTo(
          progress,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top',
            scrollTrigger: {
              trigger: '.how-list',
              start: 'top 60%',
              end: 'bottom 70%',
              scrub: true,
            },
          }
        )
      }

      steps.forEach((step) => {
        // each step travels in from the side and sharpens as it scrolls up
        gsap.fromTo(
          step,
          { x: 96, autoAlpha: 0, filter: 'blur(6px)' },
          {
            x: 0,
            autoAlpha: 1,
            filter: 'blur(0px)',
            ease: 'power2.out',
            scrollTrigger: { trigger: step, start: 'top 90%', end: 'top 56%', scrub: 0.6 },
          }
        )
        // "light up" the node as it hits centre
        const node = step.querySelector('.how-node')
        ScrollTriggerLight(step, node)
      })

      // subtle float on the pinned machine
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        gsap.to(stickyImg.current, {
          y: -24,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom bottom', scrub: true },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section id="how" ref={root} className="relative bg-white py-24 md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4 justify-center">How It Works</span>
          <SplitHeading
            text="Simple for your business. Useful for everyone else."
            accentWords={['Simple']}
            className="text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl md:text-5xl"
          />
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Pinned machine */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative mx-auto max-w-sm">
                <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-[radial-gradient(60%_60%_at_50%_20%,rgba(30,144,255,0.22),transparent_65%)] blur-xl" />
                <div className="glass overflow-hidden rounded-[2.5rem] p-6">
                  <img
                    ref={stickyImg}
                    src="/assets/machine-620s.png"
                    alt="The Fridge smart vending machine"
                    className="mx-auto h-[30rem] w-auto object-contain drop-shadow-2xl"
                  />
                  <div className="mt-2 flex items-center justify-between rounded-2xl bg-navy-950 px-4 py-3 text-white">
                    <span className="text-sm font-semibold">Placed & serviced for you</span>
                    <span className="flex items-center gap-1.5 text-xs text-sky-300">
                      <span className="h-2 w-2 animate-pulse rounded-full bg-fresh-400" /> Live &amp; stocked
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <ol className="how-list relative ml-1 space-y-8 pl-8 md:space-y-10 md:pl-10">
            {/* rail */}
            <span className="absolute left-[7px] top-2 h-[calc(100%-2rem)] w-0.5 rounded bg-line md:left-[11px]" />
            <span className="how-progress absolute left-[7px] top-2 h-[calc(100%-2rem)] w-0.5 origin-top rounded bg-gradient-to-b from-sky-500 to-navy-800 md:left-[11px]" />

            {STEPS.map((s) => (
              <li key={s.n} className="how-step relative">
                <span className="how-node absolute -left-8 top-1 grid h-4 w-4 place-items-center rounded-full border-2 border-line bg-white md:-left-10 md:h-6 md:w-6">
                  <span className="h-1.5 w-1.5 rounded-full bg-navy-900/30 md:h-2 md:w-2" />
                </span>
                <div className="glass rounded-3xl p-6 md:p-7">
                  <span className="font-display text-sm font-bold text-sky-500">{s.n}</span>
                  <h3 className="mt-1 text-xl font-bold text-navy-900 md:text-2xl">{s.title}</h3>
                  <p className="mt-2 text-base text-ink/70">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

// Helper: fill a step node when it reaches the viewport centre.
function ScrollTriggerLight(step, node) {
  if (!node) return
  const dot = node.querySelector('span')
  gsap.to([node, dot], {
    scrollTrigger: {
      trigger: step,
      start: 'top 60%',
      end: 'bottom 60%',
      onToggle: (self) => {
        if (self.isActive) {
          gsap.to(node, { borderColor: 'var(--color-sky-500)', backgroundColor: 'var(--color-sky-500)', duration: 0.3 })
          gsap.to(dot, { backgroundColor: '#ffffff', scale: 1.1, duration: 0.3 })
        } else {
          gsap.to(node, { borderColor: 'var(--color-line)', backgroundColor: '#ffffff', duration: 0.3 })
          gsap.to(dot, { backgroundColor: 'rgba(11,28,85,0.3)', scale: 1, duration: 0.3 })
        }
      },
    },
  })
}
