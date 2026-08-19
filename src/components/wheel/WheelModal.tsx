import { useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Model } from '../../data/models'
import type { Prize } from '../../data/prizes'
import SpinWheel, { type SpinWheelHandle } from './SpinWheel'
import SpinsCounter from './SpinsCounter'

interface Props {
  open: boolean
  selectedModel: Model | null
  prizes: Prize[]
  spinsLeft: number
  maxSpins: number
  canSpin: boolean
  onResult: (prize: Prize) => void
  onClose: () => void
}

export default function WheelModal({
  open,
  selectedModel,
  prizes,
  spinsLeft,
  maxSpins,
  canSpin,
  onResult,
  onClose,
}: Props) {
  const spinWheelRef = useRef<SpinWheelHandle>(null)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          style={{ background: 'rgba(8,5,16,0.9)', backdropFilter: 'blur(12px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={e => { if (e.target === e.currentTarget) onClose() }}
        >
          <motion.div
            className="flex flex-col items-center gap-6 w-full max-w-lg"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', damping: 18 }}
          >
            {selectedModel && (
              <h3 className="text-xl font-black text-center" style={{ color: '#f3eefc' }}>
                סובב וזכה בפרס עבור <span style={{ color: '#f5c542' }}>{selectedModel.name}</span>
              </h3>
            )}

            <SpinWheel
              ref={spinWheelRef}
              prizes={prizes}
              onResult={onResult}
              disabled={!canSpin}
              selectedModel={selectedModel}
            />

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

            <button
              onClick={onClose}
              className="text-sm underline"
              style={{ color: '#9b8fb8', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              סגור
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
