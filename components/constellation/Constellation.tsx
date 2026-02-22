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
              <g key={`${conn.from}-${conn.to}`}>
                {/* Glow layer */}
                <line
                  x1={`${from.position.x}%`}
                  y1={`${from.position.y}%`}
                  x2={`${to.position.x}%`}
                  y2={`${to.position.y}%`}
                  stroke={isActive ? 'rgba(96, 165, 250, 0.5)' : 'rgba(96, 165, 250, 0.2)'}
                  strokeWidth={isActive ? '3' : '2'}
                  className="transition-all duration-500 blur-sm"
                  style={{
                    opacity: 0,
                    animation: `line-appear 2s ease-out ${0.5 + idx * 0.2}s forwards`,
                  }}
                />
                {/* Main line */}
                <line
                  key={`${conn.from}-${conn.to}`}
                  x1={`${from.position.x}%`}
                  y1={`${from.position.y}%`}
                  x2={`${to.position.x}%`}
                  y2={`${to.position.y}%`}
                  stroke={isActive ? 'rgba(147, 197, 253, 0.8)' : 'rgba(191, 219, 254, 0.4)'}
                  strokeWidth={isActive ? '1.5' : '1'}
                  className="transition-all duration-500"
                  style={{
                    opacity: 0,
                    animation: `line-appear 2s ease-out ${0.5 + idx * 0.2}s forwards`,
                  }}
                />
              </g>
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
          {/* Outer Glow */}
          <div
            className={`absolute inset-[-12px] rounded-full transition-all duration-500 blur-lg ${
              isActive ? 'bg-blue-400/40 scale-150' : 
              isHovered ? 'bg-cyan-400/30 scale-125' : 
              'bg-blue-300/10 scale-100'
            }`}
          />

          {/* Middle Glow */}
          <div
            className={`absolute inset-[-6px] rounded-full transition-all duration-300 blur-md ${
              isActive ? 'bg-blue-300/50' : 
              isHovered ? 'bg-cyan-300/40' : 
              'bg-blue-200/15'
            }`}
          />

          {/* Core Node */}
          <div
            className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
              isActive ? 'bg-white shadow-[0_0_40px_rgba(147,197,253,0.9)] scale-125' : 
              isHovered ? 'bg-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.8)] scale-150' : 
              'bg-blue-100 shadow-[0_0_15px_rgba(191,219,254,0.5)] animate-pulse-slower'
            }`}
          />

          {/* Active Ring */}
          {isActive && (
            <div className="absolute inset-[-8px] border-2 border-blue-400/40 rounded-full animate-ping-slow" />
          )}

          {/* Hover Ring */}
          {isHovered && !isActive && (
            <div className="absolute inset-[-6px] border border-cyan-300/60 rounded-full animate-pulse" />
          )}
        </button>

        {/* Node Label */}
        <span
          className={`mt-4 text-xs tracking-[0.2em] uppercase font-light transition-all duration-300 ${
            isActive ? 'opacity-100 text-blue-200 drop-shadow-[0_0_8px_rgba(147,197,253,0.8)]' :
            isHovered ? 'opacity-100 text-cyan-100 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] scale-110' : 
            'opacity-60 text-blue-100/70 drop-shadow-[0_0_4px_rgba(191,219,254,0.3)]'
          }`}
        >
          {node.label}
        </span>
      </div>
    </foreignObject>
  )
})

export default Constellation
