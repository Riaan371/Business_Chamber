import { useEffect, useRef } from 'react'

/* Deterministic RNG so the wall renders identically every time */
function makeRng(seed: number) {
  return () => {
    seed += 0x6d2b79f5
    let t = Math.imul(seed ^ (seed >>> 15), seed | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

type Props = {
  /** Height of the lagoon water band at the bottom, as a fraction of total height */
  water?: number
  seed?: number
}

/**
 * Paternoster Kalkmuur — a hand-finished lime-washed wall, with the
 * Langebaan lagoon shallows washing along the bottom instead of a
 * flat painted skirting.
 */
export default function KalkmuurBg({ water = 0.22, seed = 1001 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return

    function draw() {
      const canvas = ref.current
      if (!canvas) return
      const parent = canvas.parentElement
      if (!parent) return

      const w = parent.clientWidth
      const h = parent.clientHeight
      if (w === 0 || h === 0) return

      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      const x = canvas.getContext('2d')
      if (!x) return
      x.setTransform(dpr, 0, 0, dpr, 0, 0)

      const r = makeRng(seed)
      const waterTop = h * (1 - water)

      /* ── Lime-washed wall ── */
      const base = x.createLinearGradient(0, 0, w * 0.45, h)
      base.addColorStop(0, '#FDFAF4')
      base.addColorStop(0.55, '#F5EEE1')
      base.addColorStop(1, '#EBE3D3')
      x.fillStyle = base
      x.fillRect(0, 0, w, waterTop)

      /* Brush strokes — the hand-finished lime wash */
      const strokes = Math.round((w * h) / 900)
      for (let i = 0; i < strokes; i++) {
        const a = (r() - 0.5) * 0.5
        const len = 40 + r() * 260
        const px = r() * w
        const py = r() * waterTop
        x.beginPath()
        x.moveTo(px, py)
        x.lineTo(px + Math.cos(a) * len, py + Math.sin(a) * len)
        x.strokeStyle =
          r() > 0.5
            ? `rgba(255,255,255,${0.05 + r() * 0.18})`
            : `rgba(188,176,156,${0.015 + r() * 0.05})`
        x.lineWidth = 4 + r() * 18
        x.stroke()
      }

      /* Soft patchiness where the wash pooled */
      for (let i = 0; i < 220; i++) {
        const px = r() * w
        const py = r() * waterTop
        const rad = 20 + r() * 130
        const g = x.createRadialGradient(px, py, 0, px, py, rad)
        const light = r() > 0.5
        g.addColorStop(0, light ? 'rgba(255,255,255,0.16)' : 'rgba(178,166,146,0.05)')
        g.addColorStop(1, 'rgba(255,255,255,0)')
        x.fillStyle = g
        x.beginPath()
        x.arc(px, py, rad, 0, Math.PI * 2)
        x.fill()
      }

      /* Grime settling toward the waterline */
      for (let i = 0; i < 160; i++) {
        const px = r() * w
        const py = waterTop * 0.72 + r() * waterTop * 0.34
        x.beginPath()
        x.arc(px, py, 8 + r() * 60, 0, Math.PI * 2)
        x.fillStyle = `rgba(166,150,126,${0.006 + r() * 0.018})`
        x.fill()
      }

      /* Raking sunlight across the wall */
      const sun = x.createLinearGradient(0, 0, w, waterTop)
      sun.addColorStop(0, 'rgba(255,252,240,0.34)')
      sun.addColorStop(0.6, 'rgba(255,252,240,0)')
      sun.addColorStop(1, 'rgba(120,96,56,0.07)')
      x.fillStyle = sun
      x.fillRect(0, 0, w, waterTop)

      /* ── Langebaan lagoon shallows ── */
      const bands = [
        { y: 0.0, c: '#E4DCC8' },
        { y: 0.1, c: '#BFDCCF' },
        { y: 0.24, c: '#8FD3D0' },
        { y: 0.42, c: '#54BFCB' },
        { y: 0.6, c: '#2A9EB8' },
        { y: 0.78, c: '#177E9E' },
        { y: 0.92, c: '#0E6685' },
      ]
      const wh = h - waterTop
      bands.forEach((b, bi) => {
        const by = waterTop + b.y * wh
        x.beginPath()
        x.moveTo(-10, by)
        for (let px = -10; px <= w + 10; px += 5) {
          const yy =
            by +
            Math.sin(px * 0.0075 + bi * 1.7) * (wh * 0.07) +
            Math.sin(px * 0.021 + bi * 0.6) * (wh * 0.035) +
            Math.sin(px * 0.048 + bi) * (wh * 0.015)
          x.lineTo(px, yy)
        }
        x.lineTo(w + 10, h + 10)
        x.lineTo(-10, h + 10)
        x.closePath()
        x.fillStyle = b.c
        x.fill()
      })

      /* Foam line where the water meets the wall */
      x.beginPath()
      x.moveTo(-10, waterTop)
      for (let px = -10; px <= w + 10; px += 5) {
        x.lineTo(px, waterTop + Math.sin(px * 0.0075) * (wh * 0.07) + Math.sin(px * 0.021) * (wh * 0.035))
      }
      x.strokeStyle = 'rgba(255,255,255,0.6)'
      x.lineWidth = 2
      x.stroke()

      /* Ripples on the shallows */
      const ripples = Math.round(w / 2.2)
      for (let i = 0; i < ripples; i++) {
        const px = r() * w
        const py = waterTop + r() * wh
        const len = 12 + r() * 60
        x.beginPath()
        x.moveTo(px, py)
        x.quadraticCurveTo(px + len * 0.5, py - 2 - r() * 5, px + len, py)
        x.strokeStyle = `rgba(255,255,255,${0.05 + r() * 0.16})`
        x.lineWidth = 0.7 + r() * 1.8
        x.stroke()
      }

      /* Sun glint on the water */
      const glint = x.createLinearGradient(w * 0.1, waterTop, w * 0.75, h)
      glint.addColorStop(0, 'rgba(255,255,255,0.16)')
      glint.addColorStop(1, 'rgba(255,255,255,0)')
      x.fillStyle = glint
      x.fillRect(0, waterTop, w, wh)
    }

    draw()

    const ro = new ResizeObserver(draw)
    if (canvas.parentElement) ro.observe(canvas.parentElement)
    return () => ro.disconnect()
  }, [water, seed])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
