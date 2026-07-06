/**
 * Animated brand mark — a frosted smart-fridge with a sweeping light sheen,
 * a slowly spinning snowflake, and twinkling products.
 *
 * variant: 'mark' (icon only) | 'full' (icon + wordmark)
 * tone:    'dark' (navy wordmark, for light bg) | 'light' (white wordmark)
 * All motion is paused under prefers-reduced-motion (see index.css global rule).
 */
export default function AnimatedLogo({
  variant = 'full',
  tone = 'dark',
  size = 40,
  className = '',
  animate = true,
}) {
  const wordColor = tone === 'light' ? '#ffffff' : 'var(--color-navy-900)'
  const subColor = tone === 'light' ? 'rgba(255,255,255,0.7)' : 'var(--color-sky-500)'
  const a = animate ? 'fl-on' : ''

  return (
    <span className={`fl-root inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 52 64"
        width={size}
        height={(size * 64) / 52}
        role="img"
        aria-label="The Fridge Vending"
        className="shrink-0 overflow-visible"
      >
        <defs>
          <linearGradient id="fl-cab" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#12256b" />
            <stop offset="1" stopColor="#0b1c55" />
          </linearGradient>
          <linearGradient id="fl-glass" x1="0" y1="0" x2="0.7" y2="1">
            <stop offset="0" stopColor="#dff1ff" />
            <stop offset="0.55" stopColor="#bfe2ff" />
            <stop offset="1" stopColor="#9fd0ff" />
          </linearGradient>
          <linearGradient id="fl-sheen" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <clipPath id="fl-doorclip">
            <rect x="9" y="8" width="34" height="42" rx="4.5" />
          </clipPath>
        </defs>

        {/* cabinet */}
        <rect x="4" y="2" width="44" height="56" rx="8" fill="url(#fl-cab)" />
        {/* feet */}
        <rect x="9" y="58" width="5" height="5" rx="1.5" fill="#0b1c55" />
        <rect x="38" y="58" width="5" height="5" rx="1.5" fill="#0b1c55" />

        {/* glass door */}
        <rect x="9" y="8" width="34" height="42" rx="4.5" fill="url(#fl-glass)" />

        {/* products on shelves */}
        <g className={`fl-twinkle ${a}`}>
          <rect x="13" y="12" width="6" height="9" rx="1.5" fill="#ffc531" />
          <rect x="21" y="12" width="6" height="9" rx="1.5" fill="#37d67f" />
          <rect x="29" y="12" width="6" height="9" rx="1.5" fill="#38a0ff" />
          <circle cx="16" cy="28" r="2.6" fill="#ff7a18" />
          <circle cx="23" cy="28" r="2.6" fill="#ef3b4d" />
          <circle cx="30" cy="28" r="2.6" fill="#1e90ff" />
          <circle cx="37" cy="28" r="2.6" fill="#37d67f" />
          <rect x="13" y="36" width="8" height="9" rx="1.5" fill="#7c3aed" />
          <rect x="23" y="36" width="8" height="9" rx="1.5" fill="#ef3b4d" />
          <rect x="33" y="36" width="4" height="9" rx="1.5" fill="#ffc531" />
        </g>

        {/* shelves */}
        <g stroke="#0b1c55" strokeOpacity="0.18" strokeWidth="1.2">
          <line x1="10" y1="24" x2="42" y2="24" />
          <line x1="10" y1="33" x2="42" y2="33" />
          <line x1="10" y1="46" x2="42" y2="46" />
        </g>

        {/* door frame + handle */}
        <rect
          x="9" y="8" width="34" height="42" rx="4.5"
          fill="none" stroke="#0b1c55" strokeWidth="2.5"
        />
        <rect x="11.5" y="14" width="2.2" height="13" rx="1.1" fill="#0b1c55" opacity="0.5" />

        {/* sweeping sheen (clipped to glass) */}
        <g clipPath="url(#fl-doorclip)">
          <rect
            className={`fl-sheen ${a}`}
            x="-30" y="6" width="18" height="46"
            fill="url(#fl-sheen)" transform="skewX(-18)"
          />
        </g>

        {/* snowflake */}
        <g className={`fl-snow ${a}`} transform="translate(41 8)" stroke="#7fd0ff" strokeWidth="1.6" strokeLinecap="round">
          <line x1="0" y1="-5" x2="0" y2="5" />
          <line x1="-4.3" y1="-2.5" x2="4.3" y2="2.5" />
          <line x1="-4.3" y1="2.5" x2="4.3" y2="-2.5" />
        </g>
      </svg>

      {variant === 'full' && (
        <span className="font-display leading-none" style={{ color: wordColor }}>
          <span className="block text-[0.62em] font-semibold tracking-wide" style={{ color: subColor }}>
            The
          </span>
          <span className="block text-[1.05em] font-extrabold tracking-tight">Fridge</span>
          <span className="block text-[0.42em] font-semibold tracking-[0.32em]" style={{ color: subColor }}>
            VENDING
          </span>
        </span>
      )}
    </span>
  )
}
