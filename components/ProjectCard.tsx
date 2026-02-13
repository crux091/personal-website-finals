"use client"
import React from 'react'
import { motion } from 'framer-motion'

interface ProjectData {
  id: string
  title: string
  description: string
  tech: string[]
  link: string
}

export default function ProjectCard({ project }: { project: ProjectData }) {
  const handleClick = () => {
    window.open(project.link, '_blank', 'noopener,noreferrer')
  }

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className="group h-full"
    >
      <article
        tabIndex={0}
        role="link"
        aria-label={`Open project ${project.title}`}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick()
          }
        }}
        className="glass-card p-8 h-full cursor-pointer relative overflow-hidden bg-white/[0.01] border-white/5 group-hover:border-white/20 transition-all duration-1000"
      >
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="p-3 rounded-full bg-white/[0.03] border border-white/10 group-hover:scale-110 transition-transform duration-1000">
              <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>

            <div className="opacity-0 group-hover:opacity-40 transition-all duration-1000">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>

          {/* Content */}
          <h3 className="text-xl font-light tracking-wide text-white mb-4">
            {project.title}
          </h3>

          <p className="text-narrative text-sm text-white/40 leading-relaxed mb-8 flex-grow">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-[10px] uppercase tracking-widest rounded-full bg-white/[0.03] text-white/30 border border-white/10 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Link indicator */}
          <div className="flex items-center gap-3 text-ui group-hover:text-white transition-colors duration-1000">
            <span className="relative">
              Manifestation Details
              <span className="absolute bottom-[-2px] left-0 w-4 h-[1px] bg-white/20 group-hover:w-full transition-all duration-1000" />
            </span>
            <svg className="w-3 h-3 opacity-40 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-1000" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </article>
    </motion.div>
  )
}
