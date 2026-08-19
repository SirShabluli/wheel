export interface Prize {
  id: string
  name: string
  description: string
  emoji: string
  gradientFrom: string
  gradientTo: string
  link: string
  weight: number // probability weight (higher = more likely)
}

export const PRIZES: Prize[] = [
  {
    id: '1',
    name: 'מנוי חינם לחודש',
    description: 'מנוי חינם לאונלי פאנס לחודש שלם!',
    emoji: '🎁',
    gradientFrom: '#ff2e88',
    gradientTo: '#7a1fa2',
    link: '',
    weight: 25,          // ~25%
  },
  {
    id: '2',
    name: 'מנוי חינם ל-3 חודשים',
    description: 'מנוי חינם לאונלי פאנס ל-3 חודשים!',
    emoji: '🔥',
    gradientFrom: '#a855f7',
    gradientTo: '#312e81',
    link: '',
    weight: 10,          // ~10%
  },
  {
    id: '3',
    name: 'מנוי חינם לחצי שנה',
    description: 'מנוי חינם לאונלי פאנס לחצי שנה!',
    emoji: '👑',
    gradientFrom: '#f43f5e',
    gradientTo: '#831843',
    link: '',
    weight: 3,           // ~3%
  },
  {
    id: '4',
    name: 'תוכן פרימיום ב-50% הנחה',
    description: 'קבל 50% הנחה על תוכן פרימיום בלעדי!',
    emoji: '💎',
    gradientFrom: '#f59e0b',
    gradientTo: '#b91c1c',
    link: '',
    weight: 22,          // ~22%
  },
  {
    id: '5',
    name: '50% הנחה על VIP בטלגרם',
    description: 'הנחה של 50% על ערוץ ה-VIP בטלגרם!',
    emoji: '⭐',
    gradientFrom: '#06b6d4',
    gradientTo: '#4c1d95',
    link: '',
    weight: 20,          // ~20%
  },
  {
    id: '6',
    name: 'כניסה לטלגרם במתנה',
    description: 'כניסה חינם לערוץ הטלגרם הסגור!',
    emoji: '🎟️',
    gradientFrom: '#ec4899',
    gradientTo: '#1e1b4b',
    link: '',
    weight: 15,          // ~15%
  },
  {
    id: '7',
    name: 'הקלטה אישית בחינם',
    description: 'הקלטה אישית מותאמת בחינם!',
    emoji: '🎬',
    gradientFrom: '#8b5cf6',
    gradientTo: '#701a75',
    link: '',
    weight: 5,           // ~5%
  },
]
