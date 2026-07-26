import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Model } from '../../data/models'
import confetti from 'canvas-confetti'

interface Props {
  model: Model | null
  onClose: () => void
}

type Step = 'reveal' | 'form' | 'coupon'

export default function LeadModal({ model, onClose }: Props) {
  const [step, setStep] = useState<Step>('reveal')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [couponCode, setCouponCode] = useState('')

  if (!model) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) { setError('כתובת מייל לא תקינה'); return }
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, modelId: model.id, modelName: model.name }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'שגיאה')
      setCouponCode(data.couponCode)
      setStep('coupon')
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 }, colors: ['#ff2e88', '#a855f7', '#f5c542'] })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'שגיאה, נסה שוב')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {model && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          style={{ background: 'rgba(8,5,16,0.88)', backdropFilter: 'blur(12px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          <motion.div
            className="w-full max-w-sm rounded-3xl overflow-hidden text-center"
            style={{
              background: 'linear-gradient(170deg, #241245, #150a2b)',
              border: '1px solid rgba(255,46,136,0.45)',
              boxShadow: '0 0 60px rgba(255,46,136,0.25)',
            }}
            initial={{ scale: 0.8, rotate: -3 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            {/* Model avatar */}
            <div
              className="h-56 flex items-center justify-center text-7xl font-black relative"
              style={{
                backgroundImage: `url('${model.imgWin}'), linear-gradient(135deg, ${model.gradientFrom}, ${model.gradientTo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
              }}
            >
              <div className="absolute inset-0" style={{ background: 'linear-gradient(transparent 50%, #1c0e38)' }} />
            </div>

            <div className="px-7 pb-8 pt-2">
              {/* Winner badge */}
              <div
                className="inline-block font-black text-xs px-5 py-2 rounded-full -translate-y-1/2"
                style={{ background: '#f5c542', color: '#1a1030', boxShadow: '0 0 20px rgba(245,197,66,0.5)' }}
              >
                זכית אצל {model.name}! 🎉
              </div>

              <AnimatePresence mode="wait">
                {/* STEP 1: Reveal */}
                {step === 'reveal' && (
                  <motion.div key="reveal" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <h3 className="text-3xl font-black mb-2">{model.name}</h3>
                    <p className="mb-6 leading-relaxed" style={{ color: '#9b8fb8' }}>{model.tagline}</p>
                    <button
                      onClick={() => setStep('form')}
                      className="btn-shine w-full py-4 rounded-full font-black text-lg text-white"
                      style={{ background: 'linear-gradient(90deg, #ff2e88, #a855f7)', boxShadow: '0 0 24px rgba(255,46,136,0.5)' }}
                    >
                      קבל את הקופון שלך →
                    </button>
                    <button onClick={onClose} className="mt-3 text-sm underline" style={{ color: '#9b8fb8', background: 'none', border: 'none', cursor: 'pointer' }}>
                      סגור
                    </button>
                  </motion.div>
                )}

                {/* STEP 2: Lead form */}
                {step === 'form' && (
                  <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                    <h3 className="text-xl font-black mb-2">שלח לי את הקופון! 🎁</h3>
                    <p className="text-sm mb-5" style={{ color: '#9b8fb8' }}>
                      הכנס את המייל שלך ואשלח לך את הקוד ישירות
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                      <input
                        type="email"
                        placeholder="המייל שלך"
                        value={email}
                        onChange={e => { setEmail(e.target.value); setError('') }}
                        className="w-full py-3 px-4 rounded-xl text-right font-medium outline-none"
                        style={{
                          background: 'rgba(255,255,255,0.08)',
                          border: '1px solid rgba(168,85,247,0.4)',
                          color: '#f3eefc',
                        }}
                        dir="ltr"
                      />
                      {error && <p className="text-sm" style={{ color: '#ff2e88' }}>{error}</p>}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-full font-black text-lg text-white disabled:opacity-60"
                        style={{ background: 'linear-gradient(90deg, #ff2e88, #a855f7)', boxShadow: '0 0 24px rgba(255,46,136,0.4)' }}
                      >
                        {loading ? 'שולח...' : 'שלח לי את הקופון →'}
                      </button>
                    </form>
                    <button onClick={() => setStep('reveal')} className="mt-3 text-xs underline" style={{ color: '#9b8fb8', background: 'none', border: 'none', cursor: 'pointer' }}>
                      חזור
                    </button>
                  </motion.div>
                )}

                {/* STEP 3: Coupon */}
                {step === 'coupon' && (
                  <motion.div key="coupon" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                    <h3 className="text-xl font-black mb-2">הקופון שלך מוכן! 🎉</h3>
                    <p className="text-sm mb-4" style={{ color: '#9b8fb8' }}>
                      שלחנו לך מייל עם הפרטים. הקוד שלך:
                    </p>
                    <div
                      className="py-3 px-6 rounded-xl font-black text-2xl tracking-widest mb-5 select-all"
                      style={{
                        background: 'rgba(245,197,66,0.12)',
                        border: '2px dashed rgba(245,197,66,0.6)',
                        color: '#f5c542',
                      }}
                      dir="ltr"
                    >
                      {couponCode}
                    </div>
                    <a
                      href={model.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-shine block w-full py-4 rounded-full font-black text-lg text-white no-underline"
                      style={{ background: 'linear-gradient(90deg, #ff2e88, #a855f7)', boxShadow: '0 0 24px rgba(255,46,136,0.5)' }}
                    >
                      לפרופיל של {model.name} →
                    </a>
                    <button onClick={onClose} className="mt-3 text-sm underline" style={{ color: '#9b8fb8', background: 'none', border: 'none', cursor: 'pointer' }}>
                      סגור
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
