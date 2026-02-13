/**
 * Owner Ship (Identity Entity)
 * Represents the user's presence in the constellation
 * Anchored to dominant node with subtle idle motion
 */

'use client'

import { motion } from 'framer-motion'
import { memo } from 'react'
import { getDominantNode } from '@/engine/constellation-config'
import type { ZodiacSign } from '@/types'

interface OwnerShipProps {
  zodiac: ZodiacSign
}

const OwnerShip = memo(function OwnerShip({ zodiac }: OwnerShipProps) {
  const dominantNode = getDominantNode(zodiac)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.5, duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
      className="absolute z-30 pointer-events-none"
      style={{
        left: '20%',
        top: '20%',
        animation: 'ship-float 8s ease-in-out infinite',
      }}
    >
      <div className="relative">
        {/* Ship Body */}
        <div className="relative w-12 h-12">
          {/* Core */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 shadow-[0_0_30px_rgba(96,165,250,0.5)]" />

          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-blue-400 blur-xl opacity-30 animate-pulse-slower" />

          {/* Inner Core */}
          <div className="absolute inset-2 rounded-full bg-white/20 backdrop-blur-sm" />
        </div>

        {/* Identity Label */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-60">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/60">You</span>
        </div>
      </div>
    </motion.div>
  )
})

export default OwnerShip
