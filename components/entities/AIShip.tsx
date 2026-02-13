/**
 * AI Ship (Guide Entity)
 * Separate spatial region for AI interaction
 * Opens AI panel when clicked - no routing logic
 */

'use client'

import { motion } from 'framer-motion'
import { memo } from 'react'
import { useUniverseStore } from '@/store/useUniverseStore'

const AIShip = memo(function AIShip() {
  const { aiOpen, openAI } = useUniverseStore()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
      className="absolute z-30"
      style={{
        right: '15%',
        bottom: '20%',
        animation: 'ship-float-reverse 7s ease-in-out infinite',
      }}
    >
      <button
        onClick={openAI}
        className="relative pointer-events-auto group hover:scale-110 active:scale-95 transition-transform duration-200"
      >
        {/* Ship Body */}
        <div className="relative w-14 h-14">
          {/* Core */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${
              aiOpen
                ? 'from-emerald-400 to-cyan-600 shadow-[0_0_40px_rgba(52,211,153,0.7)]'
                : 'from-cyan-400 to-emerald-600 shadow-[0_0_25px_rgba(6,182,212,0.5)]'
            } transition-all duration-500`}
          />

          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-cyan-400 blur-xl opacity-30 animate-pulse-slower" />

          {/* Inner Core */}
          <div
            className={`absolute inset-2 rounded-full bg-white/30 backdrop-blur-sm transition-all duration-300 ${
              aiOpen ? 'animate-pulse-slow' : ''
            }`}
          />

          {/* AI Symbol */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
        </div>

        {/* AI Label */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-60">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/60">
            AI Guide
          </span>
        </div>

        {/* Hover Ring */}
        <div className="absolute inset-[-4px] border border-white/0 group-hover:border-white/30 rounded-full transition-all duration-300" />
      </button>
    </motion.div>
  )
})

export default AIShip
