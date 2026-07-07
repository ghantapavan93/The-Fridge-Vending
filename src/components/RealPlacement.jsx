import Reveal from './ui/Reveal'
import SplitHeading from './ui/SplitHeading'
import Icon from './ui/Icon'
import { scrollToId } from '../hooks/useSmoothScroll'

const POINTS = [
  'Fits break rooms, lobbies, clubhouses and waiting areas',
  'Delivered, stocked and serviced for you',
  'Tap, grab, and go in seconds',
]

export default function RealPlacement() {
  return (
    <section className="relative overflow-hidden bg-cloud py-20 md:py-28">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Photo */}
          <Reveal variant="clip" className="order-1">
            <div className="relative overflow-hidden rounded-[2rem] border border-line shadow-[var(--shadow-lift)]">
              <img
                src="/assets/context-breakroom.jpg"
                alt="The Fridge smart vending machine placed in a real employee break room, stocked with cold drinks and snacks next to a counter with stools"
                className="w-full object-cover"
                loading="lazy"
                width="1024"
                height="552"
              />
              <div className="glass absolute left-4 top-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-navy-900">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fresh-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-fresh-500" />
                </span>
                Live placement
              </div>
            </div>
            <p className="mt-3 pl-1 text-sm text-ink/55">An employee break room, stocked and ready.</p>
          </Reveal>

          {/* Copy */}
          <Reveal variant="up" className="order-2">
            <span className="eyebrow mb-4">Seeing Is Believing</span>
            <SplitHeading
              text="This is what it looks like in your space."
              accentWords={['your space.']}
              className="text-3xl font-extrabold leading-tight text-navy-900 sm:text-4xl md:text-5xl"
            />
            <p className="mt-5 max-w-lg text-base text-ink/70 md:text-lg">
              A clean, self-service Fridge sitting right where your people take their breaks. No
              clunky old machine, no attendant, no coins. Just cold drinks, fresh snacks, and a quick
              tap to grab.
            </p>

            <ul className="mt-6 space-y-3">
              {POINTS.map((p) => (
                <li key={p} className="flex items-start gap-3 text-navy-900">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-fresh-500/15 text-fresh-500">
                    <Icon name="check" size={14} strokeWidth={3} />
                  </span>
                  <span className="text-[15px] font-medium">{p}</span>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToId('#contact') }}
              className="btn btn-primary mt-8"
            >
              Request a Free Placement <Icon name="arrow" size={18} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
