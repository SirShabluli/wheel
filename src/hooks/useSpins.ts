import { useState, useCallback } from 'react'

const MAX_SPINS = 3
const KEY = 'lw_spins_v1'

function getUsed(): number {
  try { return parseInt(localStorage.getItem(KEY) || '0') } catch { return 0 }
}
function setUsed(n: number) {
  try { localStorage.setItem(KEY, String(n)) } catch {}
}

export function useSpins() {
  const [spinsUsed, setSpinsUsed] = useState<number>(getUsed)

  const canSpin = spinsUsed < MAX_SPINS
  const spinsLeft = MAX_SPINS - spinsUsed

  const recordSpin = useCallback(() => {
    const next = getUsed() + 1
    setUsed(next)
    setSpinsUsed(next)
  }, [])

  return { spinsUsed, spinsLeft, canSpin, maxSpins: MAX_SPINS, recordSpin }
}
