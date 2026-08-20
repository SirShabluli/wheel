import { useEffect, useState } from 'react'
import type { Model } from './data/models'
import type { Prize } from './data/prizes'
import { PRIZES } from './data/prizes'
import { useAgeGate } from './hooks/useAgeGate'
import { useSpins } from './hooks/useSpins'
import { useProfiles } from './hooks/useProfiles'

import ParticleCanvas from './components/effects/ParticleCanvas'
import AgeGate from './components/ageGate/AgeGate'
import HeroSection from './components/hero/HeroSection'
import GallerySection from './components/gallery/GallerySection'
import MatchModal from './components/matchModal/MatchModal'
import Carousel3D from './components/carousel/Carousel3D'
import WheelModal from './components/wheel/WheelModal'

import StickyCta from './components/stickyCta/StickyCta'

export default function App() {
  const { confirmed, confirm } = useAgeGate()
  const { spinsLeft, canSpin, maxSpins, recordSpin } = useSpins()
  const { models: MODELS, loading } = useProfiles()
  const [winner, setWinner] = useState<Prize | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [wheelOpen, setWheelOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)

  useEffect(() => {
    document.body.style.overflow = wheelOpen || modalOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [wheelOpen, modalOpen])

  const handleSelectModel = (model: Model) => {
    setSelectedModel(model)
    setWheelOpen(true)
  }

  const handleResult = (prize: Prize) => {
    recordSpin()
    setWinner(prize)
    setWheelOpen(false)
    setModalOpen(true)
  }

  const handleSpinAgain = () => {
    setModalOpen(false)
    setWheelOpen(true)
  }

  if (loading) return null

  return (
    <>
      <ParticleCanvas />
      <AgeGate confirmed={confirmed} onConfirm={confirm} />

      <HeroSection models={MODELS} />

      {/* Gallery - desktop only */}
      <div id="gallery-desktop" className="hidden md:block">
        <GallerySection models={MODELS} selectedModelId={selectedModel?.id ?? null} onSelectModel={handleSelectModel} />
      </div>

      {/* Carousel - mobile only */}
      <div id="gallery-mobile" className="md:hidden">
        <Carousel3D models={MODELS} selectedModelId={selectedModel?.id ?? null} onSelectModel={handleSelectModel} />
      </div>

      <footer>
        <div style={{ fontSize: 15, letterSpacing: '.5em', fontWeight: 300, color: '#f5c542', marginBottom: 8, textTransform: 'uppercase' }}>
          V E L V E T
        </div>
        תוכן למבוגרים בלבד · 18+<br />
        כל הקישורים מובילים לעמודים רשמיים של היוצרות
      </footer>

      <WheelModal
        open={wheelOpen}
        selectedModel={selectedModel}
        prizes={PRIZES}
        spinsLeft={spinsLeft}
        maxSpins={maxSpins}
        canSpin={canSpin}
        onResult={handleResult}
        onClose={() => setWheelOpen(false)}
      />

      <MatchModal
        prize={modalOpen ? winner : null}
        model={selectedModel}
        onClose={() => setModalOpen(false)}
        onSpinAgain={handleSpinAgain}
        canSpinAgain={canSpin}
      />

      <StickyCta winner={winner} />
    </>
  )
}
