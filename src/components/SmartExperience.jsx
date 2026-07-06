import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../lib/gsap'
import SplitHeading from './ui/SplitHeading'
import Icon from './ui/Icon'

const STEPS = [
  { k: 'Choose', d: 'Browse and pick from a fully stocked, glass-front fridge.' },
  { k: 'Grab', d: 'Tap to unlock, take what you want — that simple.' },
  { k: 'Enjoy', d: 'Fresh drinks, snacks, and meals, right when you need them.' },
  { k: 'Restocked around demand', d: 'The mix keeps improving based on what people reach for.' },
]

export default function SmartExperience() {
  const root = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return
      gsap.from('.ai-row', {
        autoAlpha: 0,
        x: -20,
        duration: 0.6,
        stagger: 0.12,
        scrollTrigger: { trigger: '.ai-panel', start: 'top 75%', once: true },
      })
      gsap.to('.ai-scan', {
        yPercent: 320,
        opacity: 0,
        repeat: -1,
        duration: 3.4,
        ease: 'power1.inOut',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', toggleActions: 'play pause resume pause' },
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative overflow-hidden bg-navy-950 py-24 text-white md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_20%_10%,rgba(30,144,255,0.28),transparent_55%),radial-gradient(50%_50%_at_90%_90%,rgba(34,194,107,0.18),transparent_55%)]" />
      <div className="container-x relative z-10 grid items-center gap-14 lg:grid-cols-2">
        <div className="max-w-xl">
          <span className="eyebrow mb-4 !text-sky-300">AI Smart Experience</span>
          <SplitHeading
            text="So smart, it feels like magic."
            accentWords={['magic.']}
            className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl"
          />
          <p className="mt-5 text-base text-white/70 md:text-lg">
            The Fridge uses modern smart-vending technology to create a cleaner, faster, more
            flexible grab-and-go experience than traditional vending — for your customers, your
            team, and your residents.
          </p>

          <div className="ai-panel mt-8 space-y-3">
            {STEPS.map((s, i) => (
              <div
                key={s.k}
                className="ai-row flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sky-500/20 font-display text-sm font-bold text-sky-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-semibold">{s.k}</p>
                  <p className="text-sm text-white/60">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Machine with scan + HUD overlay */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-[radial-gradient(60%_60%_at_50%_30%,rgba(30,144,255,0.35),transparent_65%)] blur-2xl" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            {/* scan line */}
            <div className="ai-scan pointer-events-none absolute inset-x-6 top-6 z-20 h-24 rounded-full bg-gradient-to-b from-sky-400/50 to-transparent blur-md" />
            <img
              src="/assets/machine-tall.png"
              alt="AI smart vending machine"
              className="relative z-10 mx-auto h-[26rem] w-auto object-contain drop-shadow-2xl"
              loading="lazy"
            />
            {/* HUD chips */}
            <div className="absolute right-5 top-8 z-20 flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-navy-900 shadow-lg">
              <span className="h-2 w-2 rounded-full bg-fresh-500" /> Tap to open
            </div>
            <div className="absolute bottom-8 left-5 z-20 rounded-2xl bg-white/90 px-4 py-2 text-navy-900 shadow-lg">
              <p className="text-xs text-ink/60">Popular right now</p>
              <p className="flex items-center gap-1.5 text-sm font-bold">
                <Icon name="bolt" size={14} className="text-cherry-500" /> Energy + Cold Water
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
