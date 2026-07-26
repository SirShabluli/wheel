import { useEffect, useState } from 'react'
import type { Model } from '../../data/models'

interface Props {
  winner: Model | null
}

export default function StickyCta({ winner }: Props) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handler = () => setShow(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div
      id="stickyCta"
      className={show ? 'show' : ''}
    >
      <span>
        {winner ? `זכית ב${winner.name} 💜` : 'עוד לא סובבת את הגלגל 🎡'}
      </span>
      {winner ? (
        <a className="btn btn-primary" href={winner.link} target="_blank" rel="noopener">
          לפרופיל שלה
        </a>
      ) : (
        <a className="btn btn-primary" href="#wheel">
          לגלגל
        </a>
      )}
    </div>
  )
}
