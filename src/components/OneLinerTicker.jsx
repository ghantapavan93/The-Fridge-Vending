import { ONE_LINERS } from '../lib/content'

/**
 * Slim brand-voice ticker — the curated one-liners drifting past, separated by
 * snowflakes. Pure CSS marquee (pauses under reduced motion via global rule).
 */
export default function OneLinerTicker() {
  const items = [...ONE_LINERS, ...ONE_LINERS]
  return (
    <section aria-label="Brand one-liners" className="relative overflow-hidden border-y border-line bg-white py-6">
      <div className="marquee-track relative flex">
        <div className="animate-marquee flex w-max shrink-0 flex-nowrap items-center" style={{ '--marquee-duration': '55s' }}>
          {items.map((line, i) => (
            <span key={i} className="flex items-center">
              <span className="whitespace-nowrap font-display text-lg font-bold text-navy-900 md:text-xl">
                {line}
              </span>
              <span className="mx-6 text-sky-500 md:mx-8" aria-hidden>
                ❄
              </span>
            </span>
          ))}
        </div>
      </div>
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent md:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent md:w-40" />
    </section>
  )
}
