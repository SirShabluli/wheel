import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Prize } from '../../data/prizes'
import type { Model } from '../../data/models'

interface Props {
  prize: Prize | null
  model: Model | null
  onClose: () => void
  onSpinAgain: () => void
  canSpinAgain: boolean
}

function confetti() {
  const colors = ['#ff2e88', '#a855f7', '#f5c542', '#4ade80', '#06b6d4']
  for (let i = 0; i < 70; i++) {
    const c = document.createElement('div')
    c.style.cssText = `position:fixed;width:10px;height:16px;top:-20px;z-index:999;pointer-events:none;border-radius:2px;background:${colors[i % colors.length]};left:${Math.random() * 100}vw`
    const dur = 2200 + Math.random() * 1800
    const rot = Math.random() * 720 - 360
    c.animate(
      [
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(105vh) rotate(${rot}deg)`, opacity: 0.7 },
      ],
      { duration: dur, easing: 'cubic-bezier(.2,.6,.6,1)' }
    )
    document.body.appendChild(c)
    setTimeout(() => c.remove(), dur)
  }
}

export default function MatchModal({ prize, model, onClose, onSpinAgain, canSpinAgain }: Props) {
  useEffect(() => {
    if (prize) confetti()
  }, [prize])

  return (
    <AnimatePresence>
      {prize && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center"
          style={{ background: 'rgba(8,5,16,0.85)', backdropFilter: 'blur(10px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={e => { if (e.target === e.currentTarget) onClose() }}
        >
          <motion.div
            className="w-[92%] max-w-sm rounded-3xl overflow-hidden text-center"
            style={{
              background: 'linear-gradient(170deg, #241245, #150a2b)',
              border: '1px solid rgba(255,46,136,0.45)',
              boxShadow: '0 0 24px rgba(255,46,136,0.55), 0 0 60px rgba(255,46,136,0.25)',
            }}
            initial={{ scale: 0.8, rotate: -3 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            {/* Prize hero — model image bg + emoji overlay */}
            <div
              className="relative w-full flex items-center justify-center"
              style={{
                aspectRatio: '4/3',
                background: `linear-gradient(135deg, ${prize.gradientFrom}, ${prize.gradientTo})`,
              }}
            >
              {model?.img && (
                <img
                  src={model.img}
                  alt={model.name}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{ opacity: 0.45 }}
                />
              )}
              <motion.span
                className="text-8xl relative z-10 drop-shadow-lg"
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', damping: 10, delay: 0.2 }}
              >
                {prize.emoji}
              </motion.span>
              <div className="absolute inset-0 z-5" style={{ background: 'linear-gradient(transparent 50%, #1c0e38)' }} />
            </div>

            <div className="px-7 pb-14 pt-2">
              <span
                className="inline-block font-black text-xs px-5 py-2 rounded-full -translate-y-1/2"
                style={{ background: '#f5c542', color: '#1a1030', boxShadow: '0 0 18px rgba(245,197,66,0.6)' }}
              >
                ✦ זכית! ✦
              </span>
              <h3 className="text-3xl font-black mb-2">{prize.name}</h3>
              <p className="mb-6 leading-relaxed" style={{ color: '#9b8fb8' }}>{prize.description}</p>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
                {prize.link && (
                  <a
                    href={prize.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-shine rounded-full font-black text-lg text-white no-underline"
                    style={{
                      background: 'linear-gradient(90deg, #ff2e88, #a855f7)',
                      boxShadow: '0 0 24px rgba(255,46,136,0.5)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      padding: '14px 32px',
                    }}
                  >
                    מימוש הפרס
                  </a>
                )}

                <button
                  onClick={onClose}
                  className="btn-shine rounded-full font-black text-lg text-white"
                  style={{
                    background: 'linear-gradient(90deg, #ff2e88, #a855f7)',
                    boxShadow: '0 0 24px rgba(255,46,136,0.5)',
                    padding: '14px 32px',
                    border: 'none',
                    cursor: 'pointer',
                    marginBottom: !canSpinAgain ? 24 : 0,
                  }}
                >
                  קבל את הקופון שלך
                </button>

                {canSpinAgain && (
                  <button
                    onClick={onSpinAgain}
                    className="rounded-full font-black text-sm"
                    style={{
                      background: 'none',
                      border: '1.5px solid #f5c542',
                      color: '#f5c542',
                      cursor: 'pointer',
                      padding: '8px 20px',
                      marginBottom: 8,
                    }}
                  >
                    סיבוב נוסף
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
