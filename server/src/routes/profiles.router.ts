import { Router } from 'express'
import { Profile } from '../models/Profile'

const router = Router()

// GET /api/profiles — מחזיר את כל הפרופילים ממוינים לפי order
router.get('/', async (_req, res) => {
  try {
    const profiles = await Profile.find().sort({ order: 1 }).lean()
    res.json(profiles)
  } catch (err) {
    res.status(500).json({ error: 'שגיאה בשליפת פרופילים' })
  }
})

export default router