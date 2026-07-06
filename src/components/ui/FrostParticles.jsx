import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../../lib/gsap'

/**
 * Lightweight canvas of drifting frost specks. Cheap (a few dozen particles),
 * pauses when offscreen, and renders nothing under reduced motion.
 */
export default function FrostParticles({ count = 46, color = '30,144,255', className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let w = 0
    let h = 0
    let running = true
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const rand = (a, b) => a + Math.random() * (b - a)
    const particles = Array.from({ length: count }, () => ({
      x: rand(0, w),
      y: rand(0, h),
      r: rand(0.6, 2.4),
      vy: rand(6, 22) / 60,
      vx: rand(-6, 6) / 60,
      a: rand(0.2, 0.8),
      drift: rand(0, Math.PI * 2),
    }))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.drift += 0.01
        p.y += p.vy
        p.x += p.vx + Math.sin(p.drift) * 0.15
        if (p.y > h + 4) {
          p.y = -4
          p.x = rand(0, w)
        }
        if (p.x < -4) p.x = w + 4
        if (p.x > w + 4) p.x = -4
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${p.a})`
        ctx.fill()
      }
      if (running) raf = requestAnimationFrame(draw)
    }
    draw()

    const io = new IntersectionObserver(
      ([e]) => {
        running = e.isIntersecting
        if (running) draw()
        else cancelAnimationFrame(raf)
      },
      { threshold: 0 }
    )
    io.observe(canvas)
    window.addEventListener('resize', resize)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [count, color])

  return <canvas ref={canvasRef} className={`pointer-events-none h-full w-full ${className}`} aria-hidden="true" />
}
