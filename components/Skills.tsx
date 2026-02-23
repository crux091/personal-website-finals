"use client"
import React from 'react'
import { motion } from 'framer-motion'
import RepeatInView from './RepeatInView'
import { fadeUp, transition } from './motionConfig'
import { SiJavascript, SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiPython, SiNodedotjs, SiGit } from 'react-icons/si'

const skills = [
  { name: 'JavaScript', icon: SiJavascript, color: '#f7df1e', level: 90 },
  { name: 'React', icon: SiReact, color: '#61dafb', level: 85 },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff', level: 80 },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178c6', level: 85 },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38bdf8', level: 90 },
  { name: 'Python', icon: SiPython, color: '#3776ab', level: 75 },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933', level: 80 },
  { name: 'Git', icon: SiGit, color: '#f05032', level: 85 },
]

export default function Skills() {
  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <RepeatInView variants={fadeUp} transition={transition} delay={0.15}>
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-ui text-purple-200 mb-1 text-xl sm:text-2xl md:text-3xl font-light tracking-wider">Technical Archetypes</h2>
            <p className="text-narrative text-pink-300/70 italic max-w-xl mx-auto">
              Instruments and conduits utilized in the digital realm.
            </p>
          </div>
        </RepeatInView>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
          {skills.map(({ name, icon: Icon }, idx) => (
            <RepeatInView key={name} variants={fadeUp} transition={transition} delay={0.1 + idx * 0.05}>
              <motion.div
                whileHover={{ y: -6 }}
                className="glass-card p-3 sm:p-5 group cursor-default relative overflow-hidden bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-purple-500/10 border-purple-400/20 hover:border-pink-400/40 transition-all duration-500 backdrop-blur-sm"
              >
                {/* Subtle depth flare */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-br from-purple-400/10 to-pink-400/10 pointer-events-none" />

                <div className="relative flex flex-col items-center gap-2 sm:gap-3 text-center">
                  {/* Icon container */}
                  <div className="relative">
                    <div className="relative h-10 w-10 sm:h-12 sm:w-12 grid place-items-center rounded-full bg-purple-500/10 border border-purple-400/20 group-hover:bg-pink-500/20 group-hover:border-pink-400/30 transition-all duration-1000 group-hover:shadow-lg group-hover:shadow-pink-500/20">
                      <Icon size={20} className="text-purple-300/70 group-hover:text-pink-200 transition-colors duration-1000" />
                    </div>
                  </div>

                  {/* Skill name */}
                  <div className="text-ui text-purple-100/80 group-hover:text-pink-100 transition-colors duration-1000">
                    {name}
                  </div>

                  {/* Abstract level indicator */}
                  <div className="w-12 h-[1px] bg-purple-400/20 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400"
                      initial={{ x: '-100%' }}
                      whileInView={{ x: '0%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.3 + idx * 0.05 }}
                    />
                  </div>
                </div>
              </motion.div>
            </RepeatInView>
          ))}
        </div>
      </div>
    </div>
  )
}
