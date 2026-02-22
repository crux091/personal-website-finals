/**
 * Constellation Rendering Engine
 * Uses real RA/Dec astronomical coordinates from zodiac-data.ts.
 * Clickable nodes open portfolio sections; remaining stars are decorative.
 */

'use client'

import { motion } from 'framer-motion'
import { memo } from 'react'
import { useUniverseStore } from '@/store/useUniverseStore'
import {
  ZODIAC_CONSTELLATIONS,
  getScreenPositions,
  type ZodiacStar,
} from '@/engine/zodiac-data'

interface ConstellationProps {
  onNodeClick: (sectionId: string) => void
}

const Constellation = memo(function Constellation({ onNodeClick }: ConstellationProps) {
  const { activeZodiac, activeNode, hoveredNode, setHoveredNode } = useUniverseStore()

  const constellation = ZODIAC_CONSTELLATIONS.find(z => z.id === activeZodiac)
  if (!constellation) return null

  const positions = getScreenPositions(constellation)
  const clickableStars  = constellation.stars.filter(s => s.clickable)
  const decorativeStars = constellation.stars.filter(s => !s.clickable)

  return (
    <motion.div
      key={activeZodiac}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
      className="absolute inset-0 pointer-events-none z-20"
      style={{ animation: 'constellation-float 60s ease-in-out infinite' }}
    >
      <svg className="w-full h-full">
        {/* ── Decorative stars ── */}
        {decorativeStars.map((star, idx) => {
          const pos = positions.get(star.id)
          if (!pos) return null
          const r = star.magnitude < 3.5 ? 1.8 : star.magnitude < 4.5 ? 1.4 : 1
          const op = star.magnitude < 3.5 ? 0.55 : star.magnitude < 4.5 ? 0.4 : 0.25
          return (
            <g key={`dstar-${star.id}`}>
              <circle cx={`${pos.x}%`} cy={`${pos.y}%`} r={r * 3}
                fill="rgba(191,219,254,0.07)"
                style={{ opacity: 0, animation: `line-appear 2s ease-out ${1 + idx * 0.12}s forwards` }} />
              <circle cx={`${pos.x}%`} cy={`${pos.y}%`} r={r}
                fill={`rgba(191,219,254,${op})`}
                style={{ opacity: 0, animation: `line-appear 2s ease-out ${1 + idx * 0.12}s forwards` }} />
            </g>
          )
        })}

        {/* ── Connection Lines ── */}
        <g>
          {constellation.edges.map((edge, idx) => {
            const from = positions.get(edge.from)
            const to   = positions.get(edge.to)
            if (!from || !to) return null
            const fStar = constellation.stars.find(s => s.id === edge.from)
            const tStar = constellation.stars.find(s => s.id === edge.to)
            const lit =
              activeNode === fStar?.section || activeNode === tStar?.section ||
              hoveredNode === fStar?.section || hoveredNode === tStar?.section
            return (
              <g key={`${edge.from}-${edge.to}`}>
                <line x1={`${from.x}%`} y1={`${from.y}%`} x2={`${to.x}%`} y2={`${to.y}%`}
                  stroke={lit ? 'rgba(96,165,250,0.5)' : 'rgba(96,165,250,0.2)'}
                  strokeWidth={lit ? '3' : '2'} className="transition-all duration-500 blur-sm"
                  style={{ opacity: 0, animation: `line-appear 2s ease-out ${0.5 + idx * 0.18}s forwards` }} />
                <line x1={`${from.x}%`} y1={`${from.y}%`} x2={`${to.x}%`} y2={`${to.y}%`}
                  stroke={lit ? 'rgba(147,197,253,0.8)' : 'rgba(191,219,254,0.4)'}
                  strokeWidth={lit ? '1.5' : '1'} className="transition-all duration-500"
                  style={{ opacity: 0, animation: `line-appear 2s ease-out ${0.5 + idx * 0.18}s forwards` }} />
              </g>
            )
          })}
        </g>

        {/* ── Clickable nodes ── */}
        {clickableStars.map(star => {
          const pos = positions.get(star.id)
          if (!pos || !star.section) return null
          return (
            <ConstellationNodeItem
              key={star.id}
              star={star}
              x={pos.x}
              y={pos.y}
              isActive={activeNode === star.section}
              isHovered={hoveredNode === star.section}
              onClick={() => onNodeClick(star.section!)}
              onHoverStart={() => setHoveredNode(star.section!)}
              onHoverEnd={() => setHoveredNode(null)}
            />
          )
        })}
      </svg>
    </motion.div>
  )
})

interface NodeItemProps {
  star: ZodiacStar
  x: number
  y: number
  isActive: boolean
  isHovered: boolean
  onClick: () => void
  onHoverStart: () => void
  onHoverEnd: () => void
}

const ConstellationNodeItem = memo(function ConstellationNodeItem({
  star, x, y, isActive, isHovered, onClick, onHoverStart, onHoverEnd,
}: NodeItemProps) {
  const label = star.section
    ? star.section.charAt(0).toUpperCase() + star.section.slice(1)
    : star.name

  return (
    <foreignObject
      x={`${x}%`} y={`${y}%`}
      width="140" height="140"
      className="overflow-visible"
      style={{ transform: 'translate(-70px, -70px)' }}
    >
      <div
        className="w-full h-full relative pointer-events-auto group"
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
      >
        <button onClick={onClick} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className={`absolute inset-[-12px] rounded-full transition-all duration-500 blur-lg ${
            isActive  ? 'bg-blue-400/40 scale-150' :
            isHovered ? 'bg-cyan-400/30 scale-125' : 'bg-blue-300/10 scale-100'
          }`} />
          <div className={`absolute inset-[-6px] rounded-full transition-all duration-300 blur-md ${
            isActive  ? 'bg-blue-300/50' :
            isHovered ? 'bg-cyan-300/40' : 'bg-blue-200/15'
          }`} />
          <div className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
            isActive  ? 'bg-white shadow-[0_0_40px_rgba(147,197,253,0.9)] scale-125' :
            isHovered ? 'bg-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.8)] scale-150' :
                        'bg-blue-100 shadow-[0_0_15px_rgba(191,219,254,0.5)] animate-pulse-slower'
          }`} />
          {isActive && (
            <div className="absolute inset-[-8px] border-2 border-blue-400/40 rounded-full animate-ping-slow" />
          )}
          {isHovered && !isActive && (
            <div className="absolute inset-[-6px] border border-cyan-300/60 rounded-full animate-pulse" />
          )}
        </button>
        <span
          className={`absolute left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] uppercase font-light whitespace-nowrap transition-all duration-300 ${
            isActive  ? 'opacity-100 text-blue-200 drop-shadow-[0_0_8px_rgba(147,197,253,0.8)]' :
            isHovered ? 'opacity-100 text-cyan-100 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] scale-110' :
                        'opacity-60 text-blue-100/70 drop-shadow-[0_0_4px_rgba(191,219,254,0.3)]'
          }`}
          style={{ top: 'calc(50% + 14px)' }}
        >
          {label}
        </span>
      </div>
    </foreignObject>
  )
})

export default Constellation
