import { useEffect, useState } from 'react'
import { BRAND, NAV_LINKS } from '../lib/content'
import { scrollToId } from '../hooks/useSmoothScroll'
import Icon from './ui/Icon'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    scrollToId(href)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="container-x">
        <nav
          className={`flex items-center justify-between gap-4 rounded-full px-4 py-2.5 transition-all duration-500 ${
            scrolled ? 'glass shadow-[var(--shadow-soft)]' : 'bg-transparent'
          }`}
        >
          <a
            href="#top"
            onClick={(e) => go(e, '#top')}
            className="flex items-center gap-2.5 pl-1"
            aria-label="The Fridge Vending, home"
          >
            <img
              src="/assets/the-fridge-logo.png"
              alt="The Fridge Vending"
              className="h-9 w-auto md:h-10"
              width="180"
              height="44"
            />
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => go(e, l.href)}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-navy-900/75 transition-colors hover:bg-navy-900/5 hover:text-navy-900"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href={BRAND.phoneHref}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-navy-900 transition-colors hover:text-sky-500 md:inline-flex"
            >
              <Icon name="phone" size={16} />
              {BRAND.phone}
            </a>
            <a
              href="#contact"
              onClick={(e) => go(e, '#contact')}
              className="btn btn-primary whitespace-nowrap !px-4 !py-2.5 text-sm sm:!px-5"
            >
              <span className="hidden sm:inline">Request a Free Placement</span>
              <span className="sm:hidden">Get Started</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white/70 lg:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <span
                  className={`absolute left-0 h-0.5 w-5 rounded bg-navy-900 transition-all ${
                    open ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-navy-900 transition-all ${
                    open ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-5 rounded bg-navy-900 transition-all ${
                    open ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile drawer */}
        <div
          className={`mt-2 overflow-hidden rounded-3xl transition-all duration-500 lg:hidden ${
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="glass flex flex-col gap-1 rounded-3xl p-3">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => go(e, l.href)}
                className="rounded-2xl px-4 py-3 font-medium text-navy-900/80 hover:bg-navy-900/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href={BRAND.phoneHref}
              className="flex items-center gap-2 rounded-2xl px-4 py-3 font-semibold text-sky-500"
            >
              <Icon name="phone" size={18} /> {BRAND.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
