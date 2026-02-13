/**
 * Intro Sequence Component
 * Isolated initialization flow
 * Handles birthdate collection, zodiac calculation, and transition
 */

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getZodiacFromBirthdate } from '@/engine/zodiac'
import { useUniverseStore } from '@/store/useUniverseStore'
import type { ZodiacSign } from '@/types'

export default function IntroSequence() {
  const [birthdate, setBirthdate] = useState('')
  const [error, setError] = useState('')
  const completeIntro = useUniverseStore((state) => state.completeIntro)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!birthdate) {
      setError('Please enter your birthdate')
      return
    }

    try {
      const zodiac = getZodiacFromBirthdate(birthdate)
      completeIntro(zodiac)
    } catch (err) {
      setError('Invalid date format')
    }
  }

  return (
    <motion.div
      key="intro"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="text-center space-y-8 px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-light tracking-wider text-white mb-4">
            Welcome
          </h1>
          <p className="text-white/60 text-sm md:text-base tracking-widest uppercase">
            Your journey begins with identity
          </p>
        </motion.div>

        {/* Birthdate Input */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="space-y-6 max-w-md mx-auto"
        >
          <div>
            <label
              htmlFor="birthdate"
              className="block text-white/80 text-sm tracking-widest uppercase mb-3"
            >
              Enter Your Birthdate
            </label>
            <input
              type="date"
              id="birthdate"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full px-6 py-4 bg-white/5 border border-white/20 rounded-lg text-white text-center tracking-wider focus:outline-none focus:border-white/50 transition-all duration-500"
              max={new Date().toISOString().split('T')[0]}
            />
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-400 text-sm mt-2"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            type="submit"
            className="w-full px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg text-white tracking-widest uppercase text-sm transition-all duration-500"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Begin Journey
          </motion.button>
        </motion.form>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 2 }}
          className="text-white/40 text-xs tracking-widest"
        >
          Your constellation awaits
        </motion.p>
      </div>
    </motion.div>
  )
}
