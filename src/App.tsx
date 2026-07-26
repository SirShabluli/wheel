import { useEffect, useRef, useState } from 'react'
import { MODELS } from './data/models'
import type { Model } from './data/models'
import { useAgeGate } from './hooks/useAgeGate'
import { useSpins } from './hooks/useSpins'

import ParticleCanvas from './components/effects/ParticleCanvas'
import AgeGate from './components/ageGate/AgeGate'
import HeroSection from './components/hero/HeroSection'
import GallerySection from './components/gallery/GallerySection'
import SpinWheel from './components/wheel/SpinWheel'
import SpinsCounter from './components/wheel/SpinsCounter'
import MatchModal from './components/matchModal/MatchModal'
import Carousel3D from './components/carousel/Carousel3D'
import BlogSection from './components/blog/BlogSection'
import StickyCta from './components/stickyCta/StickyCta'

export default function App() {
  const { confirmed, confirm } = useAgeGate()
  const { spinsLeft, canSpin, maxSpins, recordSpin } = useSpins()
  const [winner, setWinner] = useState<Model | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const wheelRef = useRef<HTMLElement>(null)

  // Scroll reveal
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const scrollToWheel = () => wheelRef.current?.scrollIntoView({ behavior: 'smooth' })

  const handleResult = (model: Model) => {
    recordSpin()
    setWinner(model)
    setModalOpen(true)
  }

  const handleSpinAgain = () => {
    setModalOpen(false)
    wheelRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <ParticleCanvas />
      <AgeGate confirmed={confirmed} onConfirm={confirm} />

      <HeroSection models={MODELS} onSpin={scrollToWheel} />
      <GallerySection models={MODELS} />

      {/* Wheel Section */}
      <section ref={wheelRef as React.RefObject<HTMLElement>} id="wheel">
        <h2 className="section-title reveal">גלגל הזכייה</h2>
        <p className="section-sub reveal">סיבוב אחד. זכייה אחת. שיחה אחת שתשנה לך את הערב.</p>

        <div className="wheel-wrap reveal">
          <SpinWheel models={MODELS} onResult={handleResult} disabled={!canSpin} />
          <SpinsCounter spinsLeft={spinsLeft} maxSpins={maxSpins} />

          {!canSpin && (
            <div id="noSpins">
              <p>הסיבובים שלך נגמרו — אבל היא עדיין מחכה לך 👇</p>
              <a href="#gallery"><button className="btn btn-gold">לכל הבנות</button></a>
            </div>
          )}
        </div>
      </section>

      <Carousel3D models={MODELS} />
      <BlogSection />

      <footer>
        <div style={{ fontSize: 15, letterSpacing: '.5em', fontWeight: 300, color: '#f5c542', marginBottom: 8, textTransform: 'uppercase' }}>
          V E L V E T
        </div>
        תוכן למבוגרים בלבד · 18+<br />
        כל הקישורים מובילים לעמודים רשמיים של היוצרות
      </footer>

      <MatchModal
        model={modalOpen ? winner : null}
        onClose={() => setModalOpen(false)}
        onSpinAgain={handleSpinAgain}
        canSpinAgain={canSpin}
      />

      <StickyCta winner={winner} />
    </>
  )
}
