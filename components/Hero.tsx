"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { fadeIn, fadeUp, transition } from './motionConfig'
import RepeatInView from './RepeatInView'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-28 pb-32 md:py-20">
      {/* Animated background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
        {/* Content */}
        <div className="space-y-8">
          <RepeatInView variants={fadeUp} transition={transition} delay={0.15}>
            <div className="space-y-4">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-primary-500/10 border border-primary-400/20 text-primary-300 text-sm font-medium">
                  👋 Welcome to my portfolio
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight">
                Hi, I&apos;m{' '}
                <span className="block mt-2 bg-gradient-to-r from-primary-400 via-primary-300 to-primary-500 bg-clip-text text-transparent">
                  Rick Francis Cruz
                </span>
              </h1>
            </div>
          </RepeatInView>

          <RepeatInView variants={fadeIn} transition={transition} delay={0.35}>
            <p className="text-lg sm:text-xl md:text-2xl text-white/70 leading-relaxed max-w-2xl">
              I craft modern web applications with{' '}
              <span className="text-primary-300 font-semibold">React</span> and{' '}
              <span className="text-primary-300 font-semibold">Next.js</span>.
              Focused on clean interfaces, exceptional UX, and performant code.
            </p>
          </RepeatInView>

          <RepeatInView variants={fadeUp} transition={transition} delay={0.55}>
            <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <motion.div className="w-full sm:w-auto mb-4 sm:mb-0" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="#projects"
                  className="group relative block w-full sm:w-auto text-center px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-primary-500 text-black font-bold shadow-lg shadow-primary-500/25 overflow-hidden transition-all hover:shadow-primary-500/40"
                >
                  <span className="relative z-10">View Projects</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </motion.div>

              <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <a
                  href="#contact"
                  className="block w-full sm:w-auto text-center px-6 py-3 sm:px-8 sm:py-4 rounded-xl border-2 border-white/20 text-white font-bold hover:bg-white/5 hover:border-primary-400/50 transition-all backdrop-blur-sm"
                >
                  Get in Touch
                </a>
              </motion.div>
            </div>
          </RepeatInView>

          {/* Quick stats */}
          <RepeatInView variants={fadeIn} transition={transition} delay={0.75}>
            <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
              {[
                { label: 'Projects', value: '4+' },
                { label: 'Technologies', value: '15+' },
                { label: 'Experience', value: '2+ years' }
              ].map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl font-bold text-primary-400">{stat.value}</div>
                  <div className="text-sm text-white/60 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </RepeatInView>
        </div>

        {/* Profile Image */}
        <div className="flex justify-center md:justify-end">
          <RepeatInView variants={fadeUp} transition={transition} delay={0.25}>
            <motion.div
              className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.02, rotate: 1 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-400/20 to-primary-600/20 blur-3xl" />

              {/* Border ring - Smoother custom pulse */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary-400/30"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Image container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary-500/30 shadow-2xl shadow-primary-500/20">
                <Image
                  src="/images/profile.jpg"
                  alt="Profile picture of Rick Francis Cruz"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 320px, 384px"
                />

                {/* Overlay gradient - Subtle */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Decorative dots - Softer opacity */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border border-primary-400/10 animate-spin" style={{ animationDuration: '20s' }} />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full border border-primary-400/10 animate-spin" style={{ animationDuration: '15s' }} />
            </motion.div>
          </RepeatInView>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 w-full flex justify-center">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-2 text-white/40">
            <span className="text-sm">Scroll to explore</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
