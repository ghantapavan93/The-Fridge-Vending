import { useEffect } from 'react'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import { ScrollTrigger } from './lib/gsap'

import Nav from './components/Nav'
import Hero from './components/Hero'
import StatsBand from './components/StatsBand'
import StorySection from './components/StorySection'
import Manifesto from './components/Manifesto'
import OneLinerTicker from './components/OneLinerTicker'
import PerfectFor from './components/PerfectFor'
import ProductUniverse from './components/ProductUniverse'
import HowItWorks from './components/HowItWorks'
import NoCost from './components/NoCost'
import SmartExperience from './components/SmartExperience'
import FinalCTA from './components/FinalCTA'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  useSmoothScroll()

  // Recalculate triggers once fonts/images settle so pin math stays correct.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    const t = setTimeout(refresh, 600)
    return () => {
      window.removeEventListener('load', refresh)
      clearTimeout(t)
    }
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatsBand />
        <StorySection />
        <Manifesto />
        <PerfectFor />
        <OneLinerTicker />
        <ProductUniverse />
        <HowItWorks />
        <NoCost />
        <SmartExperience />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
