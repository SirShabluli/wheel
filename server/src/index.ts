import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import leadsRouter from './routes/leads.router'
import profilesRouter from './routes/profiles.router'
import imagesRouter from './routes/images.router'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(helmet())
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:5173', credentials: true }))
app.use(express.json())

// Rate limit leads endpoint — max 5 submissions per IP per hour
app.use('/api/leads', rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'יותר מדי בקשות, נסה שוב מאוחר יותר' },
  standardHeaders: true,
  legacyHeaders: false,
}))

// Routes
app.use('/api/leads', leadsRouter)
app.use('/api/profiles', profilesRouter)
app.use('/api/images', imagesRouter)

app.get('/api/health', (_req, res) => res.json({ ok: true }))

// Connect to MongoDB and start
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/luckywheel')
  .then(() => {
    console.log('✅ MongoDB connected')
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message)
    process.exit(1)
  })
