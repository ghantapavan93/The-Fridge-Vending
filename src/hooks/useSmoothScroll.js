import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../lib/gsap'

/**
 * Wires Lenis smooth-scrolling to GSAP's ScrollTrigger so pinning/parallax stay
 * perfectly in sync. Disabled entirely under prefers-reduced-motion so the page
 * uses plain native scrolling.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })

    lenis.on('scroll', ScrollTrigger.update)

    const onRaf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(onRaf)
    gsap.ticker.lagSmoothing(0)

    // Expose so anchor links can use lenis.scrollTo
    window.__lenis = lenis

    return () => {
      gsap.ticker.remove(onRaf)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])
}

/** Smoothly scroll to a selector, respecting Lenis when present. */
export function scrollToId(id) {
  const el = document.querySelector(id)
  if (!el) return
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -72, duration: 1.2 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
