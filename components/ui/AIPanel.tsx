/**
 * AI Panel Component
 * Displays AI chat interface when AI ship is activated
 */

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { memo } from 'react'
import { useUniverseStore } from '@/store/useUniverseStore'
import dynamic from 'next/dynamic'

// Dynamically import AIAgent to optimize bundle
const AIAgent = dynamic(() => import('@/components/AIAgent'), {
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-white/60">Loading AI...</div>
    </div>
  ),
})

const AIPanel = memo(function AIPanel() {
  const { aiOpen, closeAI } = useUniverseStore()

  return (
    <AnimatePresence>
      {aiOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={closeAI}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full max-w-3xl h-[600px] bg-gradient-to-br from-cyan-950/40 to-emerald-950/40 border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm border-b border-white/10 flex items-center justify-between px-6 z-10">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm tracking-widest uppercase text-white/80">
                  AI Guide
                </span>
              </div>
              <button
                onClick={closeAI}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/20 transition-all duration-300 group"
              >
                <svg
                  className="w-4 h-4 text-white/60 group-hover:text-white transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* AI Content */}
            <div className="h-full pt-16">
              <AIAgent />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
})

export default AIPanel
