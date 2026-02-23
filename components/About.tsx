"use client"
import React from 'react'
import { fadeUp, fadeIn, transition } from './motionConfig'
import RepeatInView from './RepeatInView'
import { motion } from 'framer-motion'

const CodeIcon = () => (
  <svg className="w-8 h-8 text-cyan-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)

const UserIcon = () => (
  <svg className="w-8 h-8 text-cyan-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const SpeedIcon = () => (
  <svg className="w-8 h-8 text-cyan-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const AccessIcon = () => (
  <svg className="w-8 h-8 text-cyan-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

export default function About() {
  const highlights = [
    { icon: <CodeIcon />, title: 'Clean Code', desc: 'Writing maintainable, scalable solutions' },
    { icon: <UserIcon />, title: 'User-Centric', desc: 'Prioritizing exceptional experiences' },
    { icon: <SpeedIcon />, title: 'Performance', desc: 'Optimized for speed and efficiency' },
    { icon: <AccessIcon />, title: 'Accessible', desc: 'Inclusive design for everyone' }
  ]

  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <RepeatInView variants={fadeUp} transition={transition} delay={0.1}>
          <div className="text-center mb-4 sm:mb-8">
            <h2 className="text-ui text-blue-200 mb-1 text-xl sm:text-2xl md:text-3xl font-light tracking-wider">The Architect</h2>
            <p className="text-narrative text-cyan-300/70 italic max-w-xl mx-auto">
              Constructing elegant systems and intuitive digital realms.
            </p>
          </div>
        </RepeatInView>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 items-start">
          {/* Main content */}
          <RepeatInView variants={fadeIn} transition={transition} delay={0.25}>
            <div className="space-y-8">
              <div className="glass-card p-4 sm:p-6 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-blue-500/10 border-blue-400/20 backdrop-blur-sm">
                <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed text-narrative">
                  I am a digital architect specialized in building{' '}
                  <span className="text-cyan-200 font-normal">performant and accessible</span>{' '}
                  realms. My focus lies in the intersection of technical precision and human-centric interaction.
                </p>

                <p className="text-sm sm:text-base text-blue-200/70 text-narrative leading-relaxed mt-3 italic">
                  Observation, iteration, and discovery define my process.
                </p>
              </div>
            </div>
          </RepeatInView>

          {/* Highlights grid */}
          <RepeatInView variants={fadeUp} transition={transition} delay={0.35}>
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              {highlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="glass-card p-3 sm:p-5 text-center bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border-blue-400/20 group hover:border-cyan-400/40 transition-all duration-500 backdrop-blur-sm"
                >
                  <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-700 mb-2 text-cyan-400 group-hover:text-cyan-300">{item.icon}</div>
                  <h3 className="text-ui text-blue-100 mb-2 group-hover:text-cyan-200 transition-colors">{item.title}</h3>
                  <p className="text-narrative text-xs text-blue-200/60 italic group-hover:text-blue-100/80 transition-colors">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </RepeatInView>
        </div>
      </div>
    </div>
  )
}
