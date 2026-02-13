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
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <RepeatInView variants={fadeUp} transition={transition} delay={0.15}>
          <div className="text-center mb-16">
            <h2 className="text-ui text-white/60 mb-2">Technical Archetypes</h2>
            <p className="text-narrative text-white/30 italic max-w-xl mx-auto">
              Instruments and conduits utilized in the digital realm.
            </p>
          </div>
        </RepeatInView>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {skills.map(({ name, icon: Icon }, idx) => (
            <RepeatInView key={name} variants={fadeUp} transition={transition} delay={0.1 + idx * 0.05}>
              <motion.div
                whileHover={{ y: -6 }}
                className="glass-card p-8 group cursor-default relative overflow-hidden bg-white/[0.01] border-white/5"
              >
                {/* Subtle depth flare */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

                <div className="relative flex flex-col items-center gap-6 text-center">
                  {/* Icon container - Desaturated by default */}
                  <div className="relative">
                    <div className="relative h-14 w-14 grid place-items-center rounded-full bg-white/[0.03] border border-white/5 group-hover:bg-white/[0.05] group-hover:border-white/10 transition-all duration-1000">
                      <Icon size={24} className="text-white/20 group-hover:text-white transition-colors duration-1000" />
                    </div>
                  </div>

                  {/* Skill name */}
                  <div className="text-ui text-white/40 group-hover:text-white/80 transition-colors duration-1000">
                    {name}
                  </div>

                  {/* Abstract level indicator */}
                  <div className="w-12 h-[1px] bg-white/5 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-white/20"
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
