import type { Model } from '../../data/models'

interface Props {
  models: Model[]
}

const AVATAR_SIZE = 56
const OVERLAP = 16

function AvatarCollage({ models }: { models: Model[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '10px 0', marginBottom: 36 }}>
      {models.map((m, i) => (
        <a
          key={m.id}
          href="#gallery"
          title={m.name}
          style={{
            display: 'block',
            width: AVATAR_SIZE,
            height: AVATAR_SIZE,
            borderRadius: '50%',
            overflow: 'hidden',
            marginLeft: i === 0 ? 0 : -OVERLAP,
            border: '3px solid #ff2e88',
            boxShadow: '0 0 18px rgba(255,46,136,0.45)',
            background: '#1a1030',
            position: 'relative',
            zIndex: i,
          }}
        >
          <img src={m.img} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="eager" />
        </a>
      ))}
    </div>
  )
}

export default function HeroSection({ models }: Props) {
  return (
    <header className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center" style={{ gap: 0, paddingLeft: 'max(24px, 5vw)', paddingRight: 'max(24px, 5vw)' }}>
      {/* Logo */}
      <div style={{ fontSize: 15, letterSpacing: '0.5em', fontWeight: 300, color: '#f5c542', marginBottom: 28, marginTop: 40 }}>
        V E L V E T
      </div>

      {/* Kicker */}
      <div style={{ fontSize: 'clamp(13px, 1.8vw, 16px)', fontWeight: 800, letterSpacing: '0.06em', color: '#f5c542', marginBottom: 22 }}>
        9 רווקות · אונליין עכשיו · גלגל אחד
      </div>

      {/* H1 */}
      <h1
        style={{
          fontSize: 'clamp(28px, 7vw, 74px)',
          fontWeight: 900,
          lineHeight: 1.15,
          background: 'linear-gradient(92deg, #fff 20%, #ff2e88 60%, #a855f7)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          filter: 'drop-shadow(0 0 30px rgba(255,46,136,0.35))',
          marginBottom: 36,
          maxWidth: 700,
          width: '100%',
        }}
      >
        הרווקה הבאה שתכבוש אותך<br />נמצאת על הגלגל
      </h1>

      {/* Avatar collage */}
      <AvatarCollage models={models} />

      {/* Sub */}
      <p style={{ fontSize: 'clamp(16px, 2.4vw, 21px)', color: '#9b8fb8', maxWidth: 600, marginBottom: 44, lineHeight: 1.7 }}>
        כל אחת מהן שווה סיבוב. אבל יש לך <strong style={{ color: '#f3eefc' }}>3 סיבובים בלבד</strong> — אז תסתכל
        טוב, תבחר במי אתה רוצה לזכות, ותן לגלגל להחליט אם מגיע לך.
      </p>

      {/* CTA */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 72 }}>
        <a
          href="#gallery"
          className="btn-shine no-underline"
          style={{
            display: 'inline-block',
            padding: '20px 52px',
            fontSize: 21,
            borderRadius: 999,
            fontFamily: 'inherit',
            fontWeight: 900,
            background: 'linear-gradient(90deg, #ff2e88, #a855f7)',
            color: '#fff',
            boxShadow: '0 0 24px rgba(255,46,136,0.55)',
            textDecoration: 'none',
          }}
        >
          אני מוכן לבחור ↓
        </a>
      </div>

      {/* Scroll hint */}
      <div className="animate-bob" style={{ color: '#9b8fb8', fontSize: 13 }}>
        גלול למטה
        <div style={{ fontSize: 22, marginTop: 4 }}>⌄</div>
      </div>
    </header>
  )
}
