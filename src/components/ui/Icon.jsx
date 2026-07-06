// Lightweight inline icon set (stroke-based, currentColor). No external deps.
const P = {
  bolt: <path d="M13 2 4.5 13.5H11l-1 8.5 9-12H12l1-8z" />,
  bolt2: <path d="M13 2 4.5 13.5H11l-1 8.5 9-12H12l1-8z" />,
  leaf: (
    <>
      <path d="M4 20c0-9 7-14 16-14 0 9-5 16-14 16-2 0-2-2-2-2z" />
      <path d="M9 16c2-3 5-5 8-6" />
    </>
  ),
  box: (
    <>
      <path d="M3 8 12 3l9 5v8l-9 5-9-5V8z" />
      <path d="m3 8 9 5 9-5M12 13v8" />
    </>
  ),
  candy: (
    <>
      <circle cx="12" cy="12" r="5" />
      <path d="m4 4 4 4M20 4l-4 4M4 20l4-4M20 20l-4-4" />
    </>
  ),
  puzzle: (
    <path d="M9 3a2 2 0 0 1 4 0c0 1 1 1.5 2 1.5S17 4 17 4v4s1.5-1 1.5 1 .5 2-1.5 2-1.5 1-1.5 2v4s-1-1.5-2-1.5-2 .5-2 1.5H9c0-1-1-1.5-2-1.5S5 20 5 20v-4s-1.5 1-1.5-1S4 13 5.5 13 7 12 7 11H3V4h4c0-1 1-1 2-1z" />
  ),
  sparkle: (
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
  ),
  gift: (
    <>
      <path d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7S9 7 8 5.5 8.5 2 10 3s2 4 2 4zM12 7s3 0 4-1.5S15.5 2 14 3s-2 4-2 4z" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
      <path d="M1 14h6M9 8h6M17 16h6" />
    </>
  ),
  sofa: (
    <>
      <path d="M4 11V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
      <path d="M2 13a2 2 0 0 1 4 0v3h12v-3a2 2 0 0 1 4 0v6H2v-6zM6 16h12" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M2 21v-1a5 5 0 0 1 10 0v1M16 5.5a3 3 0 0 1 0 5.8M15 21v-1a5 5 0 0 0-2-4" />
    </>
  ),
  home: (
    <path d="M3 11 12 3l9 8M5 10v10h14V10M10 20v-6h4v6" />
  ),
  cpu: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="2" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </>
  ),
  check: <path d="m4 12 5 5L20 6" />,
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  phone: (
    <path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2z" />
  ),
  snowflake: (
    <path d="M12 2v20M4.5 6l15 12M19.5 6l-15 12M2 12h20M6 4l6 3 6-3M6 20l6-3 6 3M4 8l3 4-3 4M20 8l-3 4 3 4" />
  ),
  play: <path d="M8 5v14l11-7z" />,
}

export default function Icon({ name, size = 24, strokeWidth = 1.7, className = '', ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {P[name] || null}
    </svg>
  )
}
