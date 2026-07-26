import { Router, Request, Response } from 'express'
import nodemailer from 'nodemailer'
import { Lead } from '../models/Lead'

const router = Router()

function generateCoupon(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = 'VELVET-'
  for (let i = 0; i < 8; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS, // App Password (not regular password)
  },
})

router.post('/', async (req: Request, res: Response) => {
  const { email, modelId, modelName, discount } = req.body

  if (!email || !modelId || !modelName || !discount) {
    return res.status(400).json({ error: 'חסרים פרטים' })
  }

  if (!email.includes('@')) {
    return res.status(400).json({ error: 'מייל לא תקין' })
  }

  try {
    // Check if this email already got a coupon for this model
    const existing = await Lead.findOne({ email: email.toLowerCase(), modelId })
    if (existing) {
      return res.json({ couponCode: existing.couponCode, alreadyExists: true })
    }

    const couponCode = generateCoupon()

    await Lead.create({ email: email.toLowerCase(), modelId, modelName, discount, couponCode })

    // Send email
    try {
      await transporter.sendMail({
        from: `"VELVET" <${process.env.GMAIL_USER}>`,
        to: email,
        subject: `🎉 הקופון שלך אצל ${modelName} מוכן!`,
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #0a0714; color: #f3eefc; padding: 40px; border-radius: 16px;">
            <h1 style="color: #f5c542; text-align: center; font-size: 28px;">VELVET 🎡</h1>
            <h2 style="text-align: center; margin-bottom: 8px;">זכית ב-${discount} הנחה!</h2>
            <p style="text-align: center; color: #9b8fb8; margin-bottom: 30px;">אצל ${modelName}</p>

            <div style="background: rgba(245,197,66,0.1); border: 2px dashed rgba(245,197,66,0.6); border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 30px;">
              <p style="color: #9b8fb8; font-size: 13px; margin-bottom: 8px;">קוד הקופון שלך:</p>
              <p style="color: #f5c542; font-size: 28px; font-weight: 900; letter-spacing: 4px; direction: ltr;">${couponCode}</p>
            </div>

            <p style="color: #9b8fb8; font-size: 13px; text-align: center; line-height: 1.8;">
              הצג את הקוד הזה בהודעה ל-${modelName} בפרופיל שלה<br>
              ההנחה תקפה ל-48 שעות
            </p>

            <div style="text-align: center; margin-top: 20px; color: #6b6375; font-size: 11px;">
              18+ · תוכן למבוגרים בלבד
            </div>
          </div>
        `,
      })
    } catch (emailErr) {
      console.error('Email send failed:', emailErr)
      // Don't fail the request — coupon was saved, email just failed
    }

    return res.json({ couponCode })
  } catch (err) {
    console.error('Lead creation error:', err)
    return res.status(500).json({ error: 'שגיאת שרת' })
  }
})

// Admin: get all leads
router.get('/', async (_req: Request, res: Response) => {
  const leads = await Lead.find().sort({ createdAt: -1 }).limit(200)
  res.json(leads)
})

export default router
