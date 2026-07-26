import { useEffect, useRef, useState } from 'react'
import type { Model } from '../../data/models'
import RevealSection from '../effects/RevealSection'

interface Props {
  models: Model[]
}

export default function Carousel3D({ models }: Props) {
  const [angle, setAngle] = useState(0)
  const dragging = useRef(false)
  const dragX = useRef(0)
  const dragStartAngle = useRef(0)
  const N = models.length
  const step = 360 / N
  const radius = Math.round((280 / 2) / Math.tan(Math.PI / N)) + 60

  useEffect(() => {
    let idle = 0
    const timer = setInterval(() => {
      if (!dragging.current) {
        idle++
        if (idle > 6) { setAngle(a => a - step); idle = 0 }
      }
    }, 1000)
    const reset = () => { idle = 0 }
    window.addEventListener('mousedown', reset)
    window.addEventListener('touchstart', reset)
    window.addEventListener('click', reset)
    return () => {
      clearInterval(timer)
      window.removeEventListener('mousedown', reset)
      window.removeEventListener('touchstart', reset)
      window.removeEventListener('click', reset)
    }
  }, [step])

  const dStart = (x: number) => { dragging.current = true; dragX.current = x; dragStartAngle.current = angle }
  const dMove = (x: number) => { if (!dragging.current) return; setAngle(dragStartAngle.current + (x - dragX.current) * 0.35) }
  const dEnd = () => { if (!dragging.current) return; dragging.current = false; setAngle(a => Math.round(a / step) * step) }

  return (
    <section className="carousel-section relative z-10 py-24 px-6" id="models">
      <RevealSection><h2 className="section-title">עוד סיבוב ביניהן?</h2></RevealSection>
      <RevealSection delay={0.1}><p className="section-sub">גרור, סובב, בחר.</p></RevealSection>

      <RevealSection delay={0.2}>
        <div
          className="scene"
          onMouseDown={e => dStart(e.clientX)}
          onMouseMove={e => dMove(e.clientX)}
          onMouseUp={dEnd}
          onMouseLeave={dEnd}
          onTouchStart={e => dStart(e.touches[0].clientX)}
          onTouchMove={e => dMove(e.touches[0].clientX)}
          onTouchEnd={dEnd}
        >
          <div
            className="ring"
            style={{ transform: `rotateY(${angle}deg)`, transition: dragging.current ? 'none' : undefined }}
          >
            {models.map((m, i) => (
              <div key={m.id} className="card3d" style={{ transform: `rotateY(${i * step}deg) translateZ(${radius}px)` }}>
                {m.online && <div className="online"><i />אונליין עכשיו</div>}
                <div className="ph" style={{ backgroundImage: `url('${m.img}'), linear-gradient(135deg, ${m.gradientFrom}, ${m.gradientTo})` }} />
                <div className="card-info">
                  <h4>{m.name}</h4>
                  <div className="tag">{m.tagline}</div>
                  <a className="btn btn-primary" href={m.link} target="_blank" rel="noopener noreferrer">לצ'אט איתה →</a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="carousel-nav">
          <button className="btn nav-btn" onClick={() => setAngle(a => a - step)}>‹</button>
          <button className="btn nav-btn" onClick={() => setAngle(a => a + step)}>›</button>
        </div>
        <div className="carousel-hint">אפשר גם לגרור את הקלפים עם האצבע או העכבר</div>
      </RevealSection>
    </section>
  )
}
