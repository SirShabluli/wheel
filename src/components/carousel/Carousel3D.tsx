import type { Model } from '../../data/models'
import RevealSection from '../effects/RevealSection'

interface Props {
  models: Model[]
  selectedModelId: string | null
  onSelectModel: (model: Model) => void
}

export default function Carousel3D({ models, selectedModelId, onSelectModel }: Props) {
  return (
    <section className="relative z-10 py-24 overflow-hidden" id="models">
      <RevealSection>
        <h2 className="section-title">
          <span className="md:hidden">הכירו את הבנות שלנו</span>
          <span className="hidden md:inline">עוד סיבוב ביניהן?</span>
        </h2>
      </RevealSection>
      <RevealSection delay={0.1}><p className="section-sub">גלול בין הבנות, בחר את שלך.</p></RevealSection>

      <div style={{
        display: 'flex',
        gap: 20,
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
        padding: '12px 24px 24px',
        scrollbarWidth: 'none',
        marginLeft: -24,
        marginRight: -24,
      }}>
        {models.map(m => (
          <div
            key={m.id}
            style={{
              scrollSnapAlign: 'start',
              flexShrink: 0,
              width: 280,
              borderRadius: 20,
              overflow: 'hidden',
              background: '#1a1030',
              border: '1px solid rgba(168,85,247,0.3)',
            }}
          >
            <img
              src={m.img}
              alt={m.name}
              style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
            />
            <div style={{ padding: '16px 18px 22px', textAlign: 'center' }}>
              <h4 style={{ fontWeight: 800, marginBottom: 12, fontSize: 18 }}>{m.name}</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <button
                  className={`btn ${selectedModelId === m.id ? 'btn-gold' : 'btn-outline'}`}
                  onClick={() => onSelectModel(m)}
                  style={{ display: 'block', fontSize: 14, width: '100%' }}
                >
                  אני רוצה לזכות בה 🎡
                </button>
                <a href={m.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'block', fontSize: 14 }}>
                  לפרופיל שלה
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
