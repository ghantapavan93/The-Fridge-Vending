import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../../lib/gsap'

/**
 * Premium typewriter: types `text` once, character by character, with a soft
 * blinking caret. Under reduced motion it shows the full text immediately.
 *
 * Props:
 *  - text, speed (ms/char), startDelay (ms)
 *  - caretClassName: styling for the caret bar
 */
export default function Typewriter({
  text,
  speed = 26,
  startDelay = 1200,
  className = '',
  caretClassName = 'bg-sky-500',
}) {
  const reduce = prefersReducedMotion()
  const [shown, setShown] = useState(reduce ? text : '')
  const done = shown.length >= text.length
  const timers = useRef([])

  useEffect(() => {
    if (reduce) {
      setShown(text)
      return
    }
    setShown('')
    let i = 0
    const step = () => {
      i += 1
      setShown(text.slice(0, i))
      if (i < text.length) {
        // slight natural jitter; brief pause after punctuation
        const pause = /[.,—]/.test(text[i - 1]) ? speed * 6 : speed + (i % 3) * 8
        timers.current.push(setTimeout(step, pause))
      }
    }
    timers.current.push(setTimeout(step, startDelay))
    return () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [text, speed, startDelay, reduce])

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">{shown}</span>
      {!reduce && !done && (
        <span
          aria-hidden="true"
          className={`ml-1 inline-block h-[1.05em] w-[3px] translate-y-[0.16em] rounded-full align-baseline ${caretClassName}`}
          style={{ animation: 'caretBlink 1.05s steps(1) infinite' }}
        />
      )}
    </span>
  )
}
