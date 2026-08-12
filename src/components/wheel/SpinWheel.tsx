import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react'
import type { Model } from '../../data/models'

interface Props {
  models: Model[]
  onResult: (model: Model) => void
  disabled: boolean
}

export interface SpinWheelHandle {
  spin: () => void
}

const SpinWheel = forwardRef<SpinWheelHandle, Props>(function SpinWheel({ models, onResult, disabled }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const angleRef = useRef(0)
  const spinningRef = useRef(false)
  const imgsRef = useRef<(HTMLImageElement | null)[]>([])

  const N = models.length
  const SEG = (2 * Math.PI) / N
  const CX = 480
  const R = 460

  const drawWheel = useCallback((angle: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    ctx.clearRect(0, 0, 960, 960)
    ctx.save()
    ctx.translate(CX, CX)
    ctx.rotate(angle)

    for (let i = 0; i < N; i++) {
      const m = models[i]
      const g = ctx.createLinearGradient(-R, 0, R, 0)
      g.addColorStop(0, m.gradientFrom)
      g.addColorStop(1, m.gradientTo)

      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, R, i * SEG - Math.PI / 2, (i + 1) * SEG - Math.PI / 2)
      ctx.closePath()
      ctx.fillStyle = g
      ctx.fill()
      ctx.strokeStyle = 'rgba(10,7,20,0.9)'
      ctx.lineWidth = 5
      ctx.stroke()

      ctx.save()
      ctx.rotate(i * SEG + SEG / 2 - Math.PI / 2)

      // Avatar circle
      const ar = Math.min(58, (R * Math.sin(SEG / 2)) * 0.75), ax = R * 0.82
      ctx.save()
      ctx.translate(ax, 0)
      ctx.rotate(Math.PI / 2)
      ctx.beginPath()
      ctx.arc(0, 0, ar, 0, Math.PI * 2)
      ctx.fillStyle = 'rgba(255,255,255,0.18)'
      ctx.fill()
      ctx.save()
      ctx.clip()
      const img = imgsRef.current[i]
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, -ar, -ar, ar * 2, ar * 2)
      } else {
        ctx.fillStyle = 'rgba(255,255,255,0.85)'
        ctx.font = '900 50px Heebo, sans-serif'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(m.initial, 0, 4)
      }
      ctx.restore()
      ctx.beginPath()
      ctx.arc(0, 0, ar, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255,255,255,0.85)'
      ctx.lineWidth = 3
      ctx.stroke()
      ctx.restore()

      // Name label
      ctx.save()
      ctx.translate(R * 0.50, 0)
      ctx.fillStyle = '#fff'
      ctx.font = `400 36px Heebo, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.shadowColor = 'rgba(0,0,0,0.7)'
      ctx.shadowBlur = 8
      const PREFIXES = ['Spicy', 'Crazy', 'Barbie']
      const parts = m.name.split(' ')
      const firstName = PREFIXES.includes(parts[0]) ? parts[1] : parts[0]
      ctx.fillText(firstName, 0, 0)
      ctx.restore()

      ctx.restore()
    }

    ctx.restore()
  }, [models, N, SEG, R])

  // Load images
  useEffect(() => {
    imgsRef.current = models.map((m, i) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.src = m.img
      img.onload = () => drawWheel(angleRef.current)
      imgsRef.current[i] = img
      return img
    })
    drawWheel(0)
  }, [models, drawWheel])

  const spin = useCallback(() => {
    if (spinningRef.current || disabled) return
    spinningRef.current = true

    const winner = Math.floor(Math.random() * N)
    const TWO_PI = Math.PI * 2
    const desired = (-(winner * SEG + SEG / 2) % TWO_PI + TWO_PI) % TWO_PI
    const startAngle = angleRef.current
    const startMod = ((startAngle % TWO_PI) + TWO_PI) % TWO_PI
    const finalAngle = startAngle + TWO_PI * 7 + ((desired - startMod) + TWO_PI) % TWO_PI

    const dur = 5500
    const t0 = performance.now()

    // Tick sound
    let audioCtx: AudioContext | null = null
    try { audioCtx = new AudioContext() } catch {}
    let lastSeg = -1

    const tick = () => {
      if (!audioCtx) return
      try {
        const o = audioCtx.createOscillator()
        const gn = audioCtx.createGain()
        o.frequency.value = 900
        gn.gain.setValueAtTime(0.07, audioCtx.currentTime)
        gn.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05)
        o.connect(gn); gn.connect(audioCtx.destination)
        o.start(); o.stop(audioCtx.currentTime + 0.05)
      } catch {}
    }

    const animate = (t: number) => {
      const k = Math.min((t - t0) / dur, 1)
      const ease = 1 - Math.pow(1 - k, 4)
      angleRef.current = startAngle + (finalAngle - startAngle) * ease
      drawWheel(angleRef.current)

      const segNow = Math.floor(((angleRef.current % TWO_PI) + TWO_PI) / SEG)
      if (segNow !== lastSeg) { lastSeg = segNow; tick() }

      if (k < 1) {
        requestAnimationFrame(animate)
      } else {
        spinningRef.current = false
        onResult(models[winner])
      }
    }

    requestAnimationFrame(animate)
  }, [disabled, models, N, SEG, drawWheel, onResult])

  useImperativeHandle(ref, () => ({ spin }), [spin])

  return (
    <div className="flex flex-col items-center">
      {/* Wheel */}
      <div className="relative" style={{ width: 'min(86vw, 440px)', height: 'min(86vw, 440px)' }}>
        {/* Pointer */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
          style={{
            width: 0, height: 0,
            borderLeft: '14px solid transparent',
            borderRight: '14px solid transparent',
            borderTop: '28px solid #f5c542',
            filter: 'drop-shadow(0 0 10px rgba(245,197,66,0.8))',
            marginTop: '-4px',
          }}
        />

        <canvas
          ref={canvasRef}
          width={960}
          height={960}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            boxShadow: '0 0 0 8px #1e1136, 0 0 0 10px rgba(245,197,66,0.6), 0 0 60px rgba(168,85,247,0.4)',
          }}
        />

        {/* Hub */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-10 flex items-center justify-center font-black text-sm text-center leading-tight"
          style={{
            width: 72,
            height: 72,
            background: 'radial-gradient(circle at 35% 30%, #3a2364, #160b2c)',
            border: '2px solid #f5c542',
            color: '#f5c542',
          }}
        >
          מי<br />תזכה?
        </div>
      </div>
    </div>
  )
})

export default SpinWheel
