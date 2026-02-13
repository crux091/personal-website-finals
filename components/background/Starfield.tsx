/**
 * Starfield Rendering Engine
 * Pure background layer - no business logic
 * Isolated canvas rendering with requestAnimationFrame
 */

'use client'

import { useEffect, useRef, memo } from 'react'
import type { Star } from '@/types'

interface StarfieldProps {
  starCount?: number
  parallaxStrength?: number
  driftSpeed?: number
}

const Starfield = memo(function Starfield({
  starCount = 300,
  parallaxStrength = 0.005,
  driftSpeed = 1,
}: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    // Setup canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize stars
    const colors = [
      '#f8fafc', '#f8fafc', '#f8fafc', // Cool white (dominant)
      '#dcfce7', // Soft cyan
      '#ede9fe', // Pale violet
      '#fde047', // Gold (rare)
    ]

    if (starsRef.current.length === 0) {
      for (let i = 0; i < starCount; i++) {
        const layer = Math.random() < 0.6 ? 1 : Math.random() < 0.9 ? 2 : 3
        const size = layer === 1 ? 0.5 : layer === 2 ? 1 : 1.5
        const speed = (layer === 1 ? 0.02 : layer === 2 ? 0.05 : 0.08) * driftSpeed
        const isRareGold = layer === 3 && Math.random() > 0.9
        const color = isRareGold
          ? colors[5]!
          : colors[Math.floor(Math.random() * (colors.length - 1))]!

        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          color,
          speed,
          layer,
        })
      }
    }

    // Animation loop
    const animate = () => {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      // Background gradient
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        width
      )
      grad.addColorStop(0, '#0a0a1a')
      grad.addColorStop(1, '#000000')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, width, height)

      // Render stars (fixed positions)
      starsRef.current.forEach((star) => {
        // Constant drift
        star.y += star.speed
        if (star.y > height) {
          star.y = 0
          star.x = Math.random() * width
        }

        // Draw star (no parallax) - simplified
        ctx.fillStyle = star.color
        ctx.globalAlpha = 0.5 + star.layer * 0.15
        ctx.fillRect(star.x, star.y, star.size, star.size)
      })

      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [starCount, parallaxStrength, driftSpeed])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  )
})

export default Starfield
