"use client";
import React from 'react'
import RepeatInView from './RepeatInView'
import { fadeUp, transition } from './motionConfig'
import { motion } from 'framer-motion'

type Item = {
  period: string
  role: string
  org?: string
  tech?: string[]
  summary?: string
}

const experience: Item[] = [
  {
    period: '2025 — Present',
    role: 'Student',
    org: 'JISSA, MSC, JPCS',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    summary: 'Learning more about modern web development.'
  },
]

export default function ExperienceTimeline() {
  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-1/4 w-64 h-64 bg-indigo-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-violet-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <RepeatInView variants={fadeUp} transition={transition} delay={0.05}>
          <div className="text-center mb-16">
            <h2 className="text-ui text-indigo-200 mb-2 text-3xl font-light tracking-wider">The Journey</h2>
            <p className="text-narrative text-violet-300/70 italic max-w-xl mx-auto">
              Charting the course of technical evolution and discovery.
            </p>
          </div>
        </RepeatInView>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-400/50 via-violet-500/30 to-transparent" aria-hidden />

          <ul className="space-y-12">
            {experience.map((item, idx) => (
              <li key={idx} className="relative">
                <RepeatInView variants={fadeUp} transition={transition} delay={0.1 + idx * 0.15}>
                  <div className={`grid md:grid-cols-2 gap-8 items-center ${idx % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                    {/* Timeline dot and period */}
                    <div className={`hidden md:flex ${idx % 2 === 0 ? 'justify-end pr-12' : 'md:col-start-2 pl-12'}`}>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-indigo-300">{item.period}</div>
                      </div>
                    </div>

                    {/* Content card */}
                    <div className={`${idx % 2 === 0 ? 'md:pl-12' : 'md:pr-12'} ml-16 md:ml-0`}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="glass-card p-8 relative group border-indigo-400/20 bg-gradient-to-br from-indigo-500/10 via-violet-500/5 to-indigo-500/10 hover:border-violet-400/30 transition-all backdrop-blur-sm"
                      >
                        <div className="relative">
                          {/* Mobile period */}
                          <div className="md:hidden text-ui text-indigo-300 mb-4">{item.period}</div>

                          <h3 className="text-2xl font-light tracking-wide text-indigo-100 group-hover:text-violet-100 transition-colors mb-2">{item.role}</h3>
                          {item.org && (
                            <div className="text-ui text-indigo-300 opacity-80 group-hover:text-violet-300 transition-colors mb-4">{item.org}</div>
                          )}

                          {item.summary && (
                            <p className="text-narrative text-indigo-200/70 group-hover:text-violet-200/80 transition-colors mb-6 leading-relaxed">{item.summary}</p>
                          )}

                          {item.tech && item.tech.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {item.tech.map((t) => (
                                <span
                                  key={t}
                                  className="px-3 py-1 text-[10px] uppercase tracking-widest rounded-full bg-indigo-500/10 text-indigo-200/70 border border-indigo-400/20 group-hover:border-violet-400/30 transition-colors"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-[30px] md:left-1/2 top-0 md:-translate-x-1/2 w-4 h-4 rounded-full bg-indigo-400 border-4 border-black shadow-lg shadow-indigo-400/50 z-10" />
                </RepeatInView>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
