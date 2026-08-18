import { useRef, useState } from 'react'
import type { Model } from './data/models'
import type { Prize } from './data/prizes'
import { PRIZES } from './data/prizes'
import { useAgeGate } from './hooks/useAgeGate'
import { useSpins } from './hooks/useSpins'
import { useProfiles } from './hooks/useProfiles'

import ParticleCanvas from './components/effects/ParticleCanvas'
import RevealSection from './components/effects/RevealSection'
import AgeGate from './components/ageGate/AgeGate'
import HeroSection from './components/hero/HeroSection'
import GallerySection from './components/gallery/GallerySection'
import SpinWheel, { type SpinWheelHandle } from './components/wheel/SpinWheel'
import SpinsCounter from './components/wheel/SpinsCounter'
import MatchModal from './components/matchModal/MatchModal'
import Carousel3D from './components/carousel/Carousel3D'

import StickyCta from './components/stickyCta/StickyCta'

export default function App() {
  const { confirmed, confirm } = useAgeGate()
  const { spinsLeft, canSpin, maxSpins, recordSpin } = useSpins()
  const { models: MODELS, loading } = useProfiles()
  const [winner, setWinner] = useState<Prize | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)
  const wheelRef = useRef<HTMLElement>(null)
  const spinWheelRef = useRef<SpinWheelHandle>(null)

  const handleResult = (prize: Prize) => {
    recordSpin()
    setWinner(prize)
    setModalOpen(true)
  }

  const handleSpinAgain = () => {
    setModalOpen(false)
    wheelRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  if (loading) return null

  return (
    <>
      <ParticleCanvas />
      <AgeGate confirmed={confirmed} onConfirm={confirm} />

      <HeroSection models={MODELS} />

      {/* Gallery - desktop only */}
      <div className="hidden md:block">
        <GallerySection models={MODELS} selectedModelId={selectedModel?.id ?? null} onSelectModel={setSelectedModel} />
      </div>

      {/* Carousel - mobile: before wheel, desktop: after wheel */}
      <div className="md:hidden">
        <Carousel3D models={MODELS} selectedModelId={selectedModel?.id ?? null} onSelectModel={setSelectedModel} />
      </div>

      {/* Wheel Section */}
      <section ref={wheelRef as React.RefObject<HTMLElement>} id="wheel">
        <RevealSection><h2 className="section-title">גלגל הזכייה</h2></RevealSection>
        <RevealSection delay={0.1}><p className="section-sub">סובב את הגלגל וזכה בפרסים בלעדיים!</p></RevealSection>

        <RevealSection delay={0.2} className="wheel-wrap">
          <SpinWheel ref={spinWheelRef} prizes={PRIZES} onResult={handleResult} disabled={!canSpin} selectedModel={selectedModel} />
          <SpinsCounter spinsLeft={spinsLeft} maxSpins={maxSpins} />
          <button
            onClick={() => spinWheelRef.current?.spin()}
            disabled={!canSpin}
            className="btn-shine rounded-full font-black text-xl text-white transition-all hover:brightness-110 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:filter-none disabled:translate-y-0"
            style={{
              padding: '14px 48px',
              background: !canSpin ? '#3a2f55' : 'linear-gradient(90deg, #ff2e88, #a855f7)',
              boxShadow: !canSpin ? 'none' : '0 0 30px rgba(255,46,136,0.5)',
            }}
          >
            {!canSpin ? 'סיבובים נגמרו' : 'סובב את הגלגל'}
          </button>
          {!canSpin && (
            <div id="noSpins">
              <p>הסיבובים שלך נגמרו 👇</p>
              <a href="#gallery"><button className="btn btn-gold">לכל הבנות</button></a>
            </div>
          )}
        </RevealSection>
      </section>

      {/* Carousel - desktop: after wheel */}
      <div className="hidden md:block">
        <Carousel3D models={MODELS} selectedModelId={selectedModel?.id ?? null} onSelectModel={setSelectedModel} />
      </div>

      <footer>
        <div style={{ fontSize: 15, letterSpacing: '.5em', fontWeight: 300, color: '#f5c542', marginBottom: 8, textTransform: 'uppercase' }}>
          V E L V E T
        </div>
        תוכן למבוגרים בלבד · 18+<br />
        כל הקישורים מובילים לעמודים רשמיים של היוצרות
      </footer>

      <MatchModal
        prize={modalOpen ? winner : null}
        onClose={() => setModalOpen(false)}
        onSpinAgain={handleSpinAgain}
        canSpinAgain={canSpin}
      />

      <StickyCta winner={winner} />
    </>
  )
}
