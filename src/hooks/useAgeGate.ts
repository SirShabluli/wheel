import { useState } from 'react'
import Cookies from 'js-cookie'

const COOKIE = 'lw_age'

export function useAgeGate() {
  const [confirmed, setConfirmed] = useState(() => Cookies.get(COOKIE) === '1')

  const confirm = () => {
    Cookies.set(COOKIE, '1', { expires: 30, sameSite: 'strict' })
    setConfirmed(true)
  }

  return { confirmed, confirm }
}
