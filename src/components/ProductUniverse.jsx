import { PRODUCTS, STOCK_CATEGORIES } from '../lib/content'
import SplitHeading from './ui/SplitHeading'
import Reveal from './ui/Reveal'
import Icon from './ui/Icon'

function Chip({ p }) {
  return (
    <span
      className="group/chip mx-2 inline-flex select-none items-center gap-2.5 rounded-full border border-line bg-white px-5 py-3 text-base font-semibold text-navy-900 shadow-[0_10px_30px_-18px_rgba(11,28,85,0.5)] transition-transform duration-300 hover:-translate-y-1.5"
      style={{ '--dot': p.color }}
    >
      <span className="text-lg leading-none">{p.emoji}</span>
      {p.label}
    </span>
  )
}

function Marquee({ items, reverse = false, duration = 46 }) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-track relative flex overflow-hidden py-1.5">
      <div
        className="animate-marquee flex w-max shrink-0 flex-nowrap"
        style={{ '--marquee-duration': `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {doubled.map((p, i) => (
          <Chip key={`${p.label}-${i}`} p={p} />
        ))}
      </div>
    </div>
  )
}

export default function ProductUniverse() {
  const row1 = PRODUCTS.slice(0, 7)
  const row2 = PRODUCTS.slice(6)
  const row3 = [...PRODUCTS.slice(3, 10)]

  return (
    <section id="stock" className="relative overflow-hidden bg-navy-950 py-24 text-white md:py-32">
      {/* frosty backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-90">
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_-10%,rgba(30,144,255,0.35),transparent_60%),radial-gradient(50%_50%_at_85%_110%,rgba(34,194,107,0.22),transparent_60%)]" />
      </div>

      <div className="relative z-10">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow mb-4 justify-center !text-sky-300">What Can Go Inside?</span>
            <SplitHeading
              text="Stocked around what people actually want."
              accentWords={['actually']}
              className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl"
            />
            <p className="mx-auto mt-5 max-w-xl text-base text-white/70 md:text-lg">
              From energy drinks to lunch boxes to a puzzle for a restless kid — every Fridge is
              built around the people using it. Hover to pause and pick a favorite.
            </p>
          </div>
        </div>

        {/* Marquee belt */}
        <div className="relative mt-14 space-y-4">
          {/* edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24 bg-gradient-to-r from-navy-950 to-transparent md:w-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24 bg-gradient-to-l from-navy-950 to-transparent md:w-40" />
          <Marquee items={row1} duration={44} />
          <Marquee items={row2} duration={52} reverse />
          <Marquee items={row3} duration={38} />
        </div>

        {/* Category cards — the full product menu, spelled out */}
        <div className="container-x mt-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STOCK_CATEGORIES.map((c, i) => (
              <Reveal
                key={c.title}
                variant="up"
                delay={(i % 3) * 0.06}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors duration-500 hover:bg-white/[0.08]"
              >
                <span
                  className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: c.tint }}
                />
                <span
                  className="relative grid h-12 w-12 place-items-center rounded-2xl"
                  style={{ background: `${c.tint}22`, color: c.tint }}
                >
                  <Icon name={c.icon} size={22} />
                </span>
                <h3 className="relative mt-4 text-lg font-bold text-white">{c.title}</h3>
                <p className="relative mt-1.5 text-sm text-white/60">{c.body}</p>
              </Reveal>
            ))}
            {/* "your call" tile */}
            <Reveal
              variant="up"
              delay={0.12}
              className="relative flex flex-col justify-center overflow-hidden rounded-3xl border border-sky-400/30 bg-gradient-to-br from-sky-500/20 to-navy-800/20 p-6"
            >
              <p className="font-display text-lg font-bold text-white">Something else?</p>
              <p className="mt-1.5 text-sm text-white/70">
                If your people want it, we can stock it. Tell us your location and we’ll build the
                menu around them.
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-sky-300">
                Just ask <Icon name="arrow" size={16} />
              </span>
            </Reveal>
          </div>

          <Reveal className="mt-12">
            <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-sm text-white/60">
              <span>Drinks · Snacks · Meals · Kid-friendly · Everyday essentials</span>
              <span className="hidden h-4 w-px bg-white/20 sm:block" />
              <span>Adjusted anytime around real demand.</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
