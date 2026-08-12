import type { Model } from '../../data/models'
import RevealSection from '../effects/RevealSection'

interface Props {
  models: Model[]
}

export default function Carousel3D({ models }: Props) {
  return (
    <section className="relative z-10 py-24 overflow-hidden" id="models">
      <RevealSection><h2 className="section-title">עוד סיבוב ביניהן?</h2></RevealSection>
      <RevealSection delay={0.1}><p className="section-sub">גלול בין הבנות, בחר את שלך.</p></RevealSection>

      <div style={{
        display: 'flex',
        gap: 16,
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
              width: 200,
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
            <div style={{ padding: '14px 16px 18px', textAlign: 'center' }}>
              <h4 style={{ fontWeight: 800, marginBottom: 10 }}>{m.name}</h4>
              <a href={m.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ display: 'block', fontSize: 13 }}>
                לצ'אט איתה
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
