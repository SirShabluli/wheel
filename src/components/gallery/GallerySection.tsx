import type { Model } from '../../data/models'

interface Props {
  models: Model[]
}

export default function GallerySection({ models }: Props) {
  return (
    <section id="gallery" className="relative z-10 py-24 px-6">
      <h2 className="section-title reveal">הכירו את הבנות</h2>
      <p className="section-sub reveal">תסתכל טוב. יש לך רק 3 סיבובים — כדאי לדעת במי אתה רוצה לזכות.</p>

      <div className="gallery reveal" id="galleryGrid">
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
                <a className="btn btn-outline" href="#wheel">אני רוצה לזכות בה 🎡</a>
                <a className="btn btn-primary" href={m.link} target="_blank" rel="noopener">לפרופיל שלה</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
