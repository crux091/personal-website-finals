/**
 * Starfield Rendering Engine
 * Pure background layer - no business logic
 * Isolated canvas rendering with requestAnimationFrame
 */

'use client'

import { useEffect, useRef, memo } from 'react'
import type { Star } from '@/types'

interface Meteor {
  x: number
  y: number
  vx: number
  vy: number
  length: number
  opacity: number
  life: number
  maxLife: number
}

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
  const meteorsRef = useRef<Meteor[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>()
  const lastMeteorTimeRef = useRef<number>(Date.now())

  // Function to create a meteor shower (3 meteors)
  const createMeteorShower = (canvas: HTMLCanvasElement) => {
    const meteorCount = 3
    
    // Randomly choose corner direction
    const cornerDirection = Math.random()
    let startX, startY, targetX, targetY
    
    if (cornerDirection < 0.5) {
      // Top-left to bottom-right
      startX = -100
      startY = -100
      targetX = canvas.width + 100
      targetY = canvas.height + 100
    } else {
      // Top-right to bottom-left
      startX = canvas.width + 100
      startY = -100
      targetX = -100
      targetY = canvas.height + 100
    }
    
    // Calculate diagonal distance
    const distance = Math.sqrt(Math.pow(targetX - startX, 2) + Math.pow(targetY - startY, 2))
    
    // Speed: pixels per frame - make it fast enough to cross screen smoothly
    const speed = 12
    const travelFrames = distance / speed
    
    // Calculate velocity components based on speed
    const angle = Math.atan2(targetY - startY, targetX - startX)
    const baseVX = Math.cos(angle) * speed
    const baseVY = Math.sin(angle) * speed
    
    for (let i = 0; i < meteorCount; i++) {
      // Meteors spawn close together perpendicular to direction of travel
      const perpendicularOffset = (i - 1) * 80 // Spread them out
      const parallelOffset = i * 40 // Slight stagger along path
      
      // Calculate perpendicular direction
      const perpX = -Math.sin(angle) * perpendicularOffset
      const perpY = Math.cos(angle) * perpendicularOffset
      
      meteorsRef.current.push({
        x: startX + perpX - (baseVX * parallelOffset / speed),
        y: startY + perpY - (baseVY * parallelOffset / speed),
        vx: baseVX,
        vy: baseVY,
        length: 120, // Longer trail for corner-to-corner
        opacity: 1,
        life: 0,
        maxLife: Math.ceil(travelFrames) + 20, // Ensure enough frames to cross screen
      })
    }
  }

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

      // Check if it's time for meteor shower (every 15 seconds)
      const currentTime = Date.now()
      if (currentTime - lastMeteorTimeRef.current > 15000) {
        createMeteorShower(canvas)
        lastMeteorTimeRef.current = currentTime
      }

      // Update and render meteors
      meteorsRef.current = meteorsRef.current.filter((meteor) => {
        meteor.life++
        
        // Only update position and render if meteor has started (life >= 0)
        if (meteor.life >= 0) {
          meteor.x += meteor.vx
          meteor.y += meteor.vy

          // Fade out as life progresses
          meteor.opacity = Math.max(0, 1 - meteor.life / meteor.maxLife)

          // Draw meteor trail
          if (meteor.opacity > 0) {
            const gradient = ctx.createLinearGradient(
              meteor.x,
              meteor.y,
              meteor.x - meteor.vx * 5,
              meteor.y - meteor.vy * 5
            )
            gradient.addColorStop(0, `rgba(147, 197, 253, ${meteor.opacity})`) // Bright blue-white
            gradient.addColorStop(0.5, `rgba(96, 165, 250, ${meteor.opacity * 0.6})`) // Blue
            gradient.addColorStop(1, `rgba(59, 130, 246, 0)`) // Fade to transparent

            ctx.strokeStyle = gradient
            ctx.lineWidth = 2
            ctx.lineCap = 'round'
            
            // Draw glowing core
            ctx.shadowBlur = 10
            ctx.shadowColor = `rgba(147, 197, 253, ${meteor.opacity})`
            
            ctx.beginPath()
            ctx.moveTo(meteor.x, meteor.y)
            ctx.lineTo(
              meteor.x - (meteor.vx / Math.abs(meteor.vx || 1)) * meteor.length,
              meteor.y - (meteor.vy / Math.abs(meteor.vy || 1)) * meteor.length * 0.5
            )
            ctx.stroke()
            
            ctx.shadowBlur = 0
          }
        }

        // Remove if dead or off screen
        return (
          meteor.life < meteor.maxLife &&
          meteor.x > -200 &&
          meteor.x < width + 200 &&
          meteor.y < height + 200
        )
      })

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
