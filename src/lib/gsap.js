// Central GSAP registration so every component imports the same instance.
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Sensible global defaults for the whole site.
gsap.defaults({ ease: 'power3.out', duration: 0.9 })

// Expose for debugging / QA screenshots (harmless in prod).
if (typeof window !== 'undefined') window.__gsap = gsap

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger }
