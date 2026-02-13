/**
 * Constellation Rendering Engine
 * Pure visual rendering - consumes configuration
 * Handles visual presentation and interactions only
 */

'use client'

import { motion } from 'framer-motion'
import { memo } from 'react'
import { getConstellationConfig } from '@/engine/constellation-config'
import { useUniverseStore } from '@/store/useUniverseStore'
import type { ZodiacSign, ConstellationNode } from '@/types'

interface ConstellationProps {
  zodiac: ZodiacSign
  onNodeClick: (nodeId: string) => void
}

const Constellation = memo(function Constellation({
  zodiac,
  onNodeClick,
}: ConstellationProps) {
  const { activeNode, hoveredNode, setHoveredNode } = useUniverseStore()
  const config = getConstellationConfig(zodiac)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
      className="absolute inset-0 pointer-events-none z-20"
      style={{
        animation: 'constellation-float 60s ease-in-out infinite',
      }}
    >
      <svg className="w-full h-full">
        {/* Connection Lines */}
        <g>
          {config.connections.map((conn, idx) => {
            const from = config.nodes.find((n) => n.id === conn.from)
            const to = config.nodes.find((n) => n.id === conn.to)
            if (!from || !to) return null

            const isActive =
              activeNode === conn.from ||
              activeNode === conn.to ||
              hoveredNode === conn.from ||
              hoveredNode === conn.to

            return (
              <line
                key={`${conn.from}-${conn.to}`}
                x1={`${from.position.x}%`}
                y1={`${from.position.y}%`}
                x2={`${to.position.x}%`}
                y2={`${to.position.y}%`}
                stroke={isActive ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.15)'}
                strokeWidth={isActive ? '1' : '0.5'}
                className="transition-opacity duration-500"
                style={{
                  opacity: 0,
                  animation: `line-appear 2s ease-out ${0.5 + idx * 0.2}s forwards`,
                }}
              />
            )
          })}
        </g>

        {/* Nodes */}
        {config.nodes.map((node) => (
          <ConstellationNode
            key={node.id}
            node={node}
            isActive={activeNode === node.id}
            isHovered={hoveredNode === node.id}
            onClick={() => onNodeClick(node.id)}
            onHoverStart={() => setHoveredNode(node.id)}
            onHoverEnd={() => setHoveredNode(null)}
          />
        ))}
      </svg>
    </motion.div>
  )
})

interface ConstellationNodeProps {
  node: ConstellationNode
  isActive: boolean
  isHovered: boolean
  onClick: () => void
  onHoverStart: () => void
  onHoverEnd: () => void
}

const ConstellationNode = memo(function ConstellationNode({
  node,
  isActive,
  isHovered,
  onClick,
  onHoverStart,
  onHoverEnd,
}: ConstellationNodeProps) {
  return (
    <foreignObject
      x={`${node.position.x}%`}
      y={`${node.position.y}%`}
      width="140"
      height="140"
      className="overflow-visible"
      style={{ transform: 'translate(-70px, -70px)' }}
    >
      <div
        className="w-full h-full flex flex-col items-center justify-center pointer-events-auto group"
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
      >
        <button onClick={onClick} className="relative">
          {/* Core Node */}
          <div
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              isActive ? 'bg-white shadow-[0_0_25px_rgba(255,255,255,0.7)] animate-pulse-slow' : 
              isHovered ? 'bg-white/60 shadow-[0_0_20px_rgba(255,255,255,0.5)] scale-110' : 
              'bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.2)] animate-pulse-slower'
            }`}
          />

          {/* Active Ring */}
          {isActive && (
            <div className="absolute inset-[-6px] border border-white/30 rounded-full animate-ping-slow" />
          )}
        </button>

        {/* Node Label */}
        <span
          className={`mt-4 text-xs tracking-[0.2em] uppercase font-light transition-opacity duration-300 ${
            isHovered || isActive ? 'opacity-100 text-white/80' : 'opacity-40 text-white/60'
          }`}
        >
          {node.label}
        </span>
      </div>
    </foreignObject>
  )
})

export default Constellation
