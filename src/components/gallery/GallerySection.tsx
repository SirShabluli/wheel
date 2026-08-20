import type { Model } from '../../data/models'
import RevealSection from '../effects/RevealSection'

interface Props {
  models: Model[]
  selectedModelId: string | null
  onSelectModel: (model: Model) => void
}

export default function GallerySection({ models, selectedModelId, onSelectModel }: Props) {
  return (
    <section className="relative z-10 py-24 px-6">
      <RevealSection><h2 className="section-title">הכירו את הבנות</h2></RevealSection>
      <RevealSection delay={0.1}><p className="section-sub">תסתכל טוב. יש לך רק 3 סיבובים — כדאי לדעת במי אתה רוצה לזכות.</p></RevealSection>

      <RevealSection delay={0.2} className="gallery">
        {models.map(m => (
          <div key={m.id} className="gcard">
            {m.online && (
              <div className="online">
                <i />
                אונליין עכשיו
              </div>
            )}
            <div
              className="gph"
              style={{ backgroundImage: `linear-gradient(135deg, ${m.gradientFrom}, ${m.gradientTo})` }}
            >
              <img
                src={m.img}
                alt={m.name}
                loading="lazy"
                onError={e => (e.currentTarget.style.display = 'none')}
              />
            </div>
            <div className="gbody">
              <h4>{m.name}</h4>
              <div className="tag">{m.tagline}</div>
              <div className="gbtns">
                <button
                  className={`btn ${selectedModelId === m.id ? 'btn-gold' : 'btn-outline'}`}
                  onClick={() => onSelectModel(m)}
                >
                  אני רוצה לזכות בה 🎡
                </button>
                <a className="btn btn-primary" href={m.link} target="_blank" rel="noopener">לפרופיל שלה</a>
              </div>
            </div>
          </div>
        ))}
      </RevealSection>
    </section>
  )
}
