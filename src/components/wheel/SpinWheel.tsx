import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react'
import type { Prize } from '../../data/prizes'
import type { Model } from '../../data/models'

interface Props {
  prizes: Prize[]
  onResult: (prize: Prize) => void
  disabled: boolean
  selectedModel?: Model | null
}

export interface SpinWheelHandle {
  spin: () => void
}

const SpinWheel = forwardRef<SpinWheelHandle, Props>(function SpinWheel({ prizes, onResult, disabled, selectedModel }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const angleRef = useRef(0)
  const spinningRef = useRef(false)

  const N = prizes.length
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
      const p = prizes[i]
      const g = ctx.createLinearGradient(-R, 0, R, 0)
      g.addColorStop(0, p.gradientFrom)
      g.addColorStop(1, p.gradientTo)

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

      // Prize name (outer, near edge)
      ctx.save()
      ctx.translate(R * 0.78, 0)
      ctx.rotate(Math.PI / 2)
      ctx.fillStyle = '#fff'
      ctx.font = '700 34px Heebo, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.shadowColor = 'rgba(0,0,0,0.7)'
      ctx.shadowBlur = 8

      // Split name into lines if too long
      const words = p.name.split(' ')
      const lines: string[] = []
      let currentLine = ''
      for (const word of words) {
        const test = currentLine ? `${currentLine} ${word}` : word
        if (ctx.measureText(test).width > 130) {
          lines.push(currentLine)
          currentLine = word
        } else {
          currentLine = test
        }
      }
      if (currentLine) lines.push(currentLine)

      const lineHeight = 30
      const startY = -((lines.length - 1) * lineHeight) / 2
      for (let l = 0; l < lines.length; l++) {
        ctx.fillText(lines[l], 0, startY + l * lineHeight)
      }
      ctx.restore()

      // Emoji (inner, near center)
      ctx.save()
      ctx.translate(R * 0.55, 0)
      ctx.rotate(Math.PI / 2)
      ctx.font = '48px serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(p.emoji, 0, 0)

      ctx.restore()
      ctx.restore()
    }

    ctx.restore()
  }, [prizes, N, SEG, R])

  // Initial draw
  useEffect(() => {
    drawWheel(0)
  }, [drawWheel])

  const spin = useCallback(() => {
    if (spinningRef.current || disabled) return
    spinningRef.current = true

    // Weighted random selection
    const totalWeight = prizes.reduce((sum, p) => sum + p.weight, 0)
    let rand = Math.random() * totalWeight
    let winner = 0
    for (let i = 0; i < N; i++) {
      rand -= prizes[i].weight
      if (rand <= 0) { winner = i; break }
    }
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
        onResult(prizes[winner])
      }
    }

    requestAnimationFrame(animate)
  }, [disabled, prizes, N, SEG, drawWheel, onResult])

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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full z-10 flex items-center justify-center font-black text-sm text-center leading-tight overflow-hidden"
          style={{
            width: 110,
            height: 110,
            background: 'radial-gradient(circle at 35% 30%, #3a2364, #160b2c)',
            border: '2px solid #f5c542',
            color: '#f5c542',
          }}
        >
          {selectedModel ? (
            <img
              src={selectedModel.img}
              alt={selectedModel.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <>מה<br />תזכה?</>
          )}
        </div>
      </div>
    </div>
  )
})

export default SpinWheel
