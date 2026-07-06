import { AUDIENCES } from '../lib/content'
import Reveal from './ui/Reveal'
import SplitHeading from './ui/SplitHeading'
import Icon from './ui/Icon'

const IMG = {
  auto: '/assets/machine-tall.png',
  apartments: '/assets/machine-double.png',
}

export default function PerfectFor() {
  const cards = AUDIENCES.filter((a) => a.key !== 'employees')

  return (
    <section id="perfect-for" className="relative bg-cloud py-24 md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4 justify-center">Perfect For</span>
          <SplitHeading
            text="Built for the places people wait, live, and work."
            accentWords={['wait,', 'live,', 'work.']}
            className="text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl md:text-5xl"
          />
        </div>

        <div className="mt-14 space-y-8">
          {cards.map((a, i) => (
            <Reveal
              key={a.key}
              variant="clip"
              className="group relative overflow-hidden rounded-[2rem] border border-line bg-white shadow-[var(--shadow-soft)]"
            >
              <div
                className="absolute inset-0 -z-10 opacity-70 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(90% 120% at ${
                    i % 2 ? '90% 10%' : '10% 10%'
                  }, ${a.tint}18, transparent 60%)`,
                }}
              />
              <div
                className={`grid items-center gap-8 p-7 md:grid-cols-2 md:gap-10 md:p-10 ${
                  i % 2 ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                {/* Image */}
                <div className="relative">
                  <div
                    className="relative overflow-hidden rounded-3xl"
                    style={{ background: `linear-gradient(160deg, ${a.tint}1f, #0b1c5510)` }}
                  >
                    <img
                      src={IMG[a.key]}
                      alt={a.label}
                      className="mx-auto h-72 w-auto object-contain py-6 drop-shadow-2xl transition-transform duration-700 group-hover:scale-[1.03] md:h-80"
                      loading="lazy"
                    />
                    <span
                      className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-white"
                      style={{ background: a.tint }}
                    >
                      {a.label}
                    </span>
                  </div>
                </div>

                {/* Copy */}
                <div>
                  <h3 className="text-2xl font-bold text-navy-900 md:text-3xl">{a.headline}</h3>
                  <p className="mt-4 text-base text-ink/70 md:text-lg">{a.body}</p>
                  <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {a.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-sm font-medium text-navy-900/85">
                        <span
                          className="grid h-6 w-6 shrink-0 place-items-center rounded-full"
                          style={{ background: `${a.tint}1f`, color: a.tint }}
                        >
                          <Icon name="check" size={14} strokeWidth={2.4} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
