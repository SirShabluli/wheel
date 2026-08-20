import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  confirmed: boolean
  onConfirm: () => void
}

export default function AgeGate({ confirmed, onConfirm }: Props) {
  return (
    <AnimatePresence>
      {!confirmed && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'rgba(8,5,16,0.92)', backdropFilter: 'blur(18px)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center p-12 max-w-sm w-[90%] rounded-3xl border"
            style={{
              background: 'linear-gradient(160deg, rgba(40,20,70,.8), rgba(20,10,40,.95))',
              borderColor: 'rgba(168,85,247,0.4)',
              boxShadow: '0 0 40px rgba(168,85,247,0.3)',
            }}
            initial={{ scale: 0.85, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 15 }}
          >
            {/* Badge */}
            <motion.div
              className="w-24 h-24 rounded-full border-4 flex items-center justify-center mx-auto mb-6 text-3xl font-black"
              style={{
                borderColor: '#ff2e88',
                color: '#ff2e88',
                boxShadow: '0 0 24px rgba(255,46,136,0.6)',
              }}
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              18+
            </motion.div>

            <h2 className="text-2xl font-black mb-3">רגע לפני שנכנסים...</h2>
            <p className="mb-8 leading-relaxed" style={{ color: '#9b8fb8' }}>
              האתר מכיל תוכן מיועד למבוגרים בלבד.
              <br />
              האם אתה מעל גיל 18 שנים?
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={onConfirm}
                className="btn btn-primary btn-shine w-full"
              >
                כן, אני מעל 18 — כניסה לאתר
              </button>
              <button
                onClick={() => (window.location.href = 'https://www.google.com')}
                className="btn btn-outline w-full"
              >
                עזוב אותי
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
