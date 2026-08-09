import { Router } from 'express'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import type { Readable } from 'stream'

const router = Router()

const s3 = new S3Client({ region: process.env.AWS_REGION || 'us-east-1' })
const BUCKET = process.env.S3_BUCKET_NAME || 'telescope-media-us'

// GET /api/images/* — proxy תמונות מ-S3
router.get('/*path', async (req, res) => {
  const key = (req.params as unknown as { path: string[] }).path.join('/')

  try {
    const command = new GetObjectCommand({ Bucket: BUCKET, Key: key })
    const response = await s3.send(command)

    if (response.ContentType) res.setHeader('Content-Type', response.ContentType)
    res.setHeader('Cache-Control', 'public, max-age=86400')

    ;(response.Body as Readable).pipe(res)
  } catch {
    res.status(404).json({ error: 'not found' })
  }
})

export default router
