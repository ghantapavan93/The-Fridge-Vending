import { BENEFITS } from '../lib/content'
import Reveal from './ui/Reveal'
import SplitHeading from './ui/SplitHeading'
import Icon from './ui/Icon'

export default function NoCost() {
  return (
    <section id="why" className="relative bg-cloud py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="max-w-xl">
            <span className="eyebrow mb-4">No Cost To Host</span>
            <SplitHeading
              text="All the upgrade. None of the cost."
              accentWords={['None']}
              className="text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl md:text-5xl"
            />
            <p className="mt-5 text-base text-ink/70 md:text-lg">
              The Fridge is placed in your location at no charge, giving your space a more
              convenient, modern experience without adding any extra work for your team.
            </p>
          </div>

          <Reveal className="lg:justify-self-end">
            <div className="inline-flex items-center gap-4 rounded-3xl border border-line bg-white px-6 py-5 shadow-[var(--shadow-soft)]">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-navy-800 text-white">
                <Icon name="gift" size={26} />
              </span>
              <div>
                <p className="text-2xl font-extrabold text-navy-900">$0 to host</p>
                <p className="text-sm text-ink/60">Delivered, installed, stocked &amp; serviced.</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BENEFITS.map((b, i) => (
            <Reveal
              key={b.title}
              variant="up"
              delay={(i % 3) * 0.06}
              className="group relative overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-[0_18px_50px_-30px_rgba(11,28,85,0.5)] transition-transform duration-500 hover:-translate-y-1"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-frost text-sky-500 transition-colors duration-500 group-hover:bg-sky-500 group-hover:text-white">
                <Icon name={b.icon} size={22} />
              </span>
              <h3 className="mt-4 text-lg font-bold text-navy-900">{b.title}</h3>
              <p className="mt-1.5 text-sm text-ink/65">{b.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
