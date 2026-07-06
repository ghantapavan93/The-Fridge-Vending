import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'
import { scrollToId } from '../hooks/useSmoothScroll'
import { useMagnetic } from '../hooks/useMagnetic'
import SplitHeading from './ui/SplitHeading'
import RotatingCraving from './ui/RotatingCraving'
import FrostParticles from './ui/FrostParticles'
import Icon from './ui/Icon'

const CHIPS = [
  { label: 'Energy Drinks', emoji: '⚡', pos: 'left-[0%] top-[14%]', depth: 1.6 },
  { label: 'Ice-Cold Water', emoji: '💧', pos: 'left-[-5%] top-[50%]', depth: 1.1 },
  { label: 'Healthy Snacks', emoji: '🥗', pos: 'left-[3%] bottom-[14%]', depth: 1.9 },
  { label: 'Fresh Lunch', emoji: '🍱', pos: 'right-[-3%] top-[8%]', depth: 1.4 },
  { label: 'Protein Bars', emoji: '💪', pos: 'right-[-7%] top-[44%]', depth: 2.1 },
  { label: 'Kids’ Toys', emoji: '🧸', pos: 'right-[0%] bottom-[16%]', depth: 1.2 },
]

export default function Hero() {
  const root = useRef(null)
  const machineWrap = useRef(null)
  const chipsRef = useRef([])
  chipsRef.current = []
  const magneticCta = useMagnetic(0.35)

  const addChip = (el) => el && !chipsRef.current.includes(el) && chipsRef.current.push(el)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = prefersReducedMotion()

      if (!reduce) {
        gsap.set('.hero-badge', { autoAlpha: 0, y: 16 })
        gsap.set('.hero-kinetic', { autoAlpha: 0, y: 18 })
        gsap.set('.hero-sub', { autoAlpha: 0, y: 20 })
        gsap.set('.hero-support', { autoAlpha: 0, y: 20 })
        gsap.set('.hero-cta', { autoAlpha: 0, y: 20 })
        gsap.set('.hero-trust', { autoAlpha: 0, y: 16 })
        gsap.set(machineWrap.current, { autoAlpha: 0, y: 70, scale: 0.92, rotate: 1.5 })
        gsap.set('.hero-glow', { autoAlpha: 0, scale: 0.6 })
        gsap.set('.hero-reflect', { autoAlpha: 0, scaleY: 0.4 })
        gsap.set(chipsRef.current, { autoAlpha: 0, scale: 0.6, y: 24 })

        const tl = gsap.timeline({ delay: 0.15 })
        tl.to('.hero-badge', { autoAlpha: 1, y: 0, duration: 0.6 })
          .to('.hero-glow', { autoAlpha: 1, scale: 1, duration: 1.4, ease: 'power2.out' }, '-=0.3')
          .to(machineWrap.current, { autoAlpha: 1, y: 0, scale: 1, rotate: 0, duration: 1.25, ease: 'power4.out' }, '-=1.2')
          .to('.hero-reflect', { autoAlpha: 0.5, scaleY: 1, duration: 1, ease: 'power2.out' }, '-=0.7')
          .to('.hero-kinetic', { autoAlpha: 1, y: 0, duration: 0.7 }, '-=1.0')
          .to('.hero-sub', { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.6')
          .to('.hero-support', { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.5')
          .to('.hero-cta', { autoAlpha: 1, y: 0, duration: 0.7 }, '-=0.5')
          .to('.hero-trust', { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.5')
          .to(chipsRef.current, { autoAlpha: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'back.out(1.6)' }, '-=0.9')

        chipsRef.current.forEach((chip, i) => {
          gsap.to(chip, {
            y: '+=14',
            duration: 2.6 + (i % 3) * 0.6,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 1 + i * 0.15,
          })
        })

        // scroll parallax
        gsap.to('.hero-copy', {
          yPercent: -14,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to(machineWrap.current, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
        })
        chipsRef.current.forEach((chip, i) => {
          gsap.to(chip, {
            yPercent: (i % 2 === 0 ? -1 : 1) * (30 + i * 8),
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
          })
        })

        const mm = gsap.matchMedia()
        mm.add('(min-width: 1024px) and (pointer: fine)', () => {
          const move = (e) => {
            const rx = (e.clientX / window.innerWidth - 0.5) * 2
            const ry = (e.clientY / window.innerHeight - 0.5) * 2
            gsap.to(machineWrap.current, { x: rx * 20, y: ry * 12, rotateY: rx * 5, rotateX: -ry * 3, duration: 0.8, ease: 'power2.out' })
            chipsRef.current.forEach((chip) => {
              const d = parseFloat(chip.dataset.depth || '1')
              gsap.to(chip, { x: rx * 28 * d, duration: 0.9, ease: 'power2.out', overwrite: 'auto' })
            })
          }
          window.addEventListener('mousemove', move)
          return () => window.removeEventListener('mousemove', move)
        })
      }
    }, root)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      ref={root}
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 lg:min-h-screen lg:pt-40"
    >
      {/* Aurora / frost background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_70%_-5%,#dcefff_0%,transparent_55%),radial-gradient(60%_50%_at_10%_15%,#e7fff2_0%,transparent_50%),linear-gradient(180deg,#ffffff_0%,#eef6ff_100%)]" />
        <div className="hero-glow absolute right-[6%] top-[16%] h-[44rem] w-[44rem] rounded-full bg-[radial-gradient(circle,rgba(30,144,255,0.30),transparent_62%)] blur-2xl" />
        <div className="hero-glow absolute left-[-6%] bottom-[-8%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(34,194,107,0.20),transparent_60%)] blur-2xl" />
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(11,28,85,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(11,28,85,0.04) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(72% 60% at 50% 30%, #000 40%, transparent 100%)',
          }}
        />
        <FrostParticles count={40} className="absolute inset-0" />
      </div>

      <div className="container-x grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        {/* Copy */}
        <div className="hero-copy relative z-10 max-w-xl">
          <span className="hero-badge eyebrow mb-5">
            <Icon name="snowflake" size={15} /> AI Smart Vending · Placed at No Charge
          </span>

          <SplitHeading
            as="h1"
            text="Get What You Want."
            trigger="load"
            delay={0.35}
            accentWords={['Want.']}
            className="text-5xl font-extrabold leading-[0.98] text-navy-900 sm:text-6xl md:text-7xl"
          />

          <p className="hero-kinetic mt-4 text-2xl font-bold sm:text-3xl">
            <RotatingCraving />
          </p>

          <p className="hero-sub mt-5 text-lg font-medium text-navy-900/80 md:text-xl">
            AI smart vending machines customized for your business, employees, customers, and
            residents.
          </p>

          <p className="hero-support mt-4 max-w-lg text-base text-ink/70">
            It lives in your waiting room, your clubhouse, your break room — stocked with exactly
            what your people want. Tap, grab, go. And it costs you nothing.
          </p>

          <div className="hero-cta mt-8 flex flex-wrap items-center gap-3">
            <a
              ref={magneticCta}
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToId('#contact') }}
              className="btn btn-primary"
            >
              Request a Free Placement <Icon name="arrow" size={18} />
            </a>
            <a href="#stock" onClick={(e) => { e.preventDefault(); scrollToId('#stock') }} className="btn btn-ghost">
              See What We Can Stock
            </a>
          </div>

          <div className="hero-trust mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink/60">
            <span className="flex items-center gap-2"><Icon name="check" size={16} className="text-fresh-500" /> No cost to host</span>
            <span className="flex items-center gap-2"><Icon name="check" size={16} className="text-fresh-500" /> Fully customized</span>
            <span className="flex items-center gap-2"><Icon name="check" size={16} className="text-fresh-500" /> Stocked &amp; serviced for you</span>
          </div>
        </div>

        {/* Machine + chips */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div ref={machineWrap} className="relative z-10 mx-auto w-[82%] sm:w-[72%] lg:w-[88%]" style={{ perspective: '1400px', transformStyle: 'preserve-3d' }}>
            <div className="absolute inset-x-6 bottom-4 -z-10 h-16 rounded-[50%] bg-navy-900/25 blur-2xl" />
            <img
              src="/assets/machine-angle.png"
              alt="The Fridge — AI smart vending machine: swipe or tap, grab items, auto-checkout in 60 seconds"
              className="w-full drop-shadow-[0_50px_70px_rgba(11,28,85,0.4)]"
              width="614"
              height="1024"
            />
            {/* reflection */}
            <img
              src="/assets/machine-angle.png"
              aria-hidden="true"
              className="hero-reflect absolute left-0 top-[98%] w-full origin-top scale-y-[-1] opacity-0 blur-[2px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.35),transparent_45%)]"
            />
          </div>

          {/* 60-second checkout HUD chip */}
          <div ref={addChip} data-depth="1.3" className="absolute right-[6%] top-[64%] z-20">
            <div className="glass flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold text-navy-900 shadow-[var(--shadow-soft)]">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-fresh-500 text-white"><Icon name="check" size={12} strokeWidth={3} /></span>
              Checkout in 60s
            </div>
          </div>

          {CHIPS.map((c) => (
            <div key={c.label} ref={addChip} data-depth={c.depth} className={`absolute z-20 ${c.pos}`}>
              <div className="glass flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold text-navy-900 shadow-[var(--shadow-soft)]">
                <span className="text-base leading-none">{c.emoji}</span>
                <span className="whitespace-nowrap">{c.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium uppercase tracking-widest text-navy-900/40 lg:flex">
        Scroll
        <span className="h-9 w-[1.5px] animate-pulse bg-gradient-to-b from-navy-900/40 to-transparent" />
      </div>
    </section>
  )
}
