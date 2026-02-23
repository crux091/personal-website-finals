/**
 * Owner Ship (Identity Entity)
 * Represents the user's presence in the constellation
 * Anchored to dominant node with subtle idle motion
 */

'use client'

import { motion } from 'framer-motion'
import { memo } from 'react'
import Image from 'next/image'
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
        left: 'clamp(5%, 20%, 22%)',
        top: 'clamp(5%, 20%, 22%)',
        animation: 'ship-float 8s ease-in-out infinite',
      }}
    >
      <div className="relative">
        {/* Ship Body */}
        <div className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32">
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full bg-blue-400 blur-xl opacity-30 animate-pulse-slower" />

          {/* Pulsing border ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-blue-400/50"
            animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Profile photo */}
          <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-blue-400/60 shadow-[0_0_20px_rgba(96,165,250,0.4)]">
            <Image
              src="/images/profile.jpg"
              alt="Rick Francis Cruz"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 64px, (max-width: 768px) 96px, 128px"
              priority
            />
          </div>
        </div>

      </div>
    </motion.div>
  )
})

export default OwnerShip
