import { useEffect, useState } from 'react'
import type { Prize } from '../../data/prizes'

interface Props {
  winner: Prize | null
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
        {winner ? `זכית: ${winner.name} ${winner.emoji}` : 'עוד לא סובבת את הגלגל 🎡'}
      </span>
      <a className="btn btn-primary" href="#gallery">
        {winner ? 'סיבוב נוסף' : 'בחר דוגמנית'}
      </a>
    </div>
  )
}
