'use client'

/**
 * Zodiac Picker — floating switcher to change the active constellation
 */

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUniverseStore } from '@/store/useUniverseStore'
import { ZODIAC_CONSTELLATIONS } from '@/engine/zodiac-data'

export function ZodiacPicker() {
  const { activeZodiac, setActiveZodiac } = useUniverseStore()
  const [open, setOpen] = useState(false)

  const handleSelect = (id: string) => {
    setActiveZodiac(id)
    setOpen(false)
  }

  const current = ZODIAC_CONSTELLATIONS.find(z => z.id === activeZodiac)

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3">
      {/* Picker tray */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-wrap justify-center gap-x-3 gap-y-1.5 max-w-sm px-5 py-3 rounded-2xl bg-gradient-to-br from-slate-900/95 via-blue-900/80 to-slate-900/95 border border-blue-400/30 shadow-2xl shadow-blue-500/20 backdrop-blur-md"
          >
            {ZODIAC_CONSTELLATIONS.map(z => {
              const isActive = activeZodiac === z.id
              return (
                <button
                  key={z.id}
                  onClick={() => handleSelect(z.id)}
                  className={`relative px-2 py-1 rounded-full text-xs tracking-widest uppercase transition-all duration-200
                    ${isActive
                      ? 'bg-blue-500/40 border border-blue-300/70 text-white shadow-[0_0_10px_rgba(147,197,253,0.5)]'
                      : 'bg-white/5 border border-white/10 text-white/60 hover:bg-blue-500/20 hover:border-blue-400/40 hover:text-white'
                    }`}
                >
                  {z.name}
                  {isActive && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-blue-300 animate-pulse" />
                  )}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 backdrop-blur-sm text-sm tracking-widest uppercase font-light
          ${open
            ? 'bg-blue-500/30 border-blue-300/50 text-white shadow-[0_0_20px_rgba(147,197,253,0.3)]'
            : 'bg-white/5 border-white/20 text-white/60 hover:bg-blue-500/20 hover:border-blue-400/30 hover:text-white'
          }`}
      >
        <span className="text-base">{current?.symbol ?? '✦'}</span>
        <span>{current?.name ?? 'Constellation'}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </motion.button>
    </div>
  )
}

