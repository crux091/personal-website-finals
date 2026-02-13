"use client"
import React from 'react'
import { fadeUp, fadeIn, transition } from './motionConfig'
import RepeatInView from './RepeatInView'
import { motion } from 'framer-motion'

const CodeIcon = () => (
  <svg className="w-8 h-8 text-primary-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)

const UserIcon = () => (
  <svg className="w-8 h-8 text-primary-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const SpeedIcon = () => (
  <svg className="w-8 h-8 text-primary-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const AccessIcon = () => (
  <svg className="w-8 h-8 text-primary-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <RepeatInView variants={fadeUp} transition={transition} delay={0.1}>
          <div className="text-center mb-16">
            <h2 className="text-ui text-white/60 mb-2">The Architect</h2>
            <p className="text-narrative text-white/30 italic max-w-xl mx-auto">
              Constructing elegant systems and intuitive digital realms.
            </p>
          </div>
        </RepeatInView>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* Main content */}
          <RepeatInView variants={fadeIn} transition={transition} delay={0.25}>
            <div className="space-y-8">
              <div className="glass-card p-10 bg-white/[0.01] border-white/5">
                <p className="text-xl text-white/50 leading-relaxed text-narrative">
                  I am a digital architect specialized in building{' '}
                  <span className="text-white/80 font-normal">performant and accessible</span>{' '}
                  realms. My focus lies in the intersection of technical precision and human-centric interaction.
                </p>

                <p className="text-lg text-white/30 text-narrative leading-relaxed mt-6 italic">
                  Observation, iteration, and discovery define my process.
                </p>
              </div>
            </div>
          </RepeatInView>

          {/* Highlights grid */}
          <RepeatInView variants={fadeUp} transition={transition} delay={0.35}>
            <div className="grid grid-cols-2 gap-6">
              {highlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="glass-card p-8 text-center bg-white/[0.01] border-white/5 group"
                >
                  <div className="opacity-40 group-hover:opacity-100 transition-opacity duration-700 mb-6">{item.icon}</div>
                  <h3 className="text-ui text-white/70 mb-2">{item.title}</h3>
                  <p className="text-narrative text-xs text-white/30 italic">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </RepeatInView>
        </div>
      </div>
    </div>
  )
}
