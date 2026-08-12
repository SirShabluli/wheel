import { useEffect, useState } from 'react'
import type { Model } from '../data/models'

const API_BASE = import.meta.env.VITE_API_BASE ?? 'http://localhost:3001'

function mapProfile(p: Record<string, unknown>): Model {
  const id = String(p._id ?? p.id ?? '')
  const imgPath = String(p.profileImage ?? '')
  const imgUrl = imgPath
    ? imgPath.startsWith('http') ? imgPath : `${API_BASE}/api/images/${imgPath}`
    : ''

  return {
    id,
    name:         String(p.name ?? ''),
    tagline:      String(p.handle ?? ''),
    initial:      String(p.name ?? '?')[0],
    gradientFrom: '#ff2e88',
    gradientTo:   '#7a1fa2',
    img:          imgUrl,
    imgWin:       imgUrl,
    link:         String(p.telegramLink ?? '#'),
    online:       Boolean(p.isVerified),
  }
}

export function useProfiles() {
  const [models, setModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`${API_BASE}/api/profiles`)
      .then(r => r.json())
      .then((data: Record<string, unknown>[]) => setModels(data.map(mapProfile)))
      .catch(() => setError('שגיאה בטעינת פרופילים'))
      .finally(() => setLoading(false))
  }, [])

  return { models, loading, error }
}