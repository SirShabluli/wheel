import type { Model } from '../../data/models'

interface Props {
  models: Model[]
  onSpin: () => void
}

export default function HeroSection({ models, onSpin }: Props) {
  return (
    <header className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 py-10">
      <div className="text-sm tracking-[0.5em] font-light mb-6" style={{ color: '#f5c542' }}>
        V E L V E T
      </div>

      <div className="mb-4 text-sm font-bold tracking-wider" style={{ color: '#f5c542' }}>
        9 מודלים · עכשיו אונליין · חינם לחלוטין
      </div>

      <h1
        className="font-black leading-tight mb-5"
        style={{
          fontSize: 'clamp(36px, 7vw, 70px)',
          background: 'linear-gradient(92deg, #fff 20%, #ff2e88 60%, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 30px rgba(255,46,136,0.35))',
        }}
      >
        סובב את הגלגל<br />וזכה בהנחה אצל המודל שלך
      </h1>

      {/* Collage */}
      <div className="flex justify-center mb-8 py-2">
        {models.map((m, i) => (
          <a
            key={m.id}
            href="#wheel"
            title={m.name}
            className="block rounded-full overflow-hidden border-2 transition-all duration-300 hover:-translate-y-3 hover:scale-110 relative"
            style={{
              width: 'clamp(52px, 8vw, 80px)',
              height: 'clamp(52px, 8vw, 80px)',
              marginLeft: i === 0 ? 0 : 'clamp(-20px, -2vw, -12px)',
              borderColor: '#ff2e88',
              boxShadow: '0 0 14px rgba(255,46,136,0.4)',
              zIndex: i,
            }}
          >
            <img src={m.img} alt={m.name} className="w-full h-full object-cover" loading="eager" />
          </a>
        ))}
      </div>

      <p className="mb-10 leading-relaxed" style={{ fontSize: 'clamp(15px, 2.2vw, 19px)', color: '#9b8fb8', maxWidth: 560 }}>
        3 סיבובים חינם · ללא רישום · זכה בהנחה בלעדית
        <br />
        <span style={{ color: '#f3eefc' }}>המודלים מחכות לך עכשיו</span>
      </p>

      <button
        onClick={onSpin}
        className="btn-shine py-5 px-14 rounded-full font-black text-xl text-white transition-all hover:brightness-110 hover:-translate-y-0.5"
        style={{
          background: 'linear-gradient(90deg, #f5c542, #e8963a)',
          color: '#1a1030',
          boxShadow: '0 0 30px rgba(245,197,66,0.5)',
          fontSize: 'clamp(17px, 2.5vw, 22px)',
        }}
      >
        סובב בחינם →
      </button>

      <div className="mt-16 animate-bob" style={{ color: '#9b8fb8', fontSize: 13 }}>
        גלול למטה
        <div style={{ fontSize: 22, marginTop: 4 }}>↓</div>
      </div>
    </header>
  )
}
