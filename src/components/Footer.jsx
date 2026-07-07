import { BRAND, NAV_LINKS } from '../lib/content'
import { scrollToId } from '../hooks/useSmoothScroll'
import Icon from './ui/Icon'
import AnimatedLogo from './ui/AnimatedLogo'

export default function Footer() {
  const go = (e, href) => {
    e.preventDefault()
    scrollToId(href)
  }
  return (
    <footer className="bg-navy-950 text-white">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <AnimatedLogo variant="full" tone="light" size={38} />
            <p className="mt-5 text-sm text-white/60">
              {BRAND.tagline} AI smart vending machines placed in local businesses at no charge,
              customized around what your customers, employees, and residents actually want.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white/50">Explore</h4>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={(e) => go(e, l.href)} className="text-sm text-white/75 transition-colors hover:text-sky-300">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a href="#contact" onClick={(e) => go(e, '#contact')} className="text-sm text-white/75 transition-colors hover:text-sky-300">
                  Request a Free Placement
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white/50">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="text-white/75">
                {BRAND.contactName}
                <span className="block text-white/45">{BRAND.contactTitle}</span>
              </li>
              <li>
                <a href={BRAND.phoneHref} className="inline-flex items-center gap-2 text-white/85 hover:text-sky-300">
                  <Icon name="phone" size={16} /> {BRAND.phone}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-white/85">
                <Icon name="snowflake" size={16} /> {BRAND.domain}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">
          <p>© {new Date().getFullYear()} {BRAND.full}. All rights reserved.</p>
          <p>{BRAND.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
