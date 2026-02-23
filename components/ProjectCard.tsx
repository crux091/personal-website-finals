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
        className="glass-card p-4 sm:p-5 h-full cursor-pointer relative overflow-hidden bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-emerald-500/10 border-emerald-400/20 group-hover:border-teal-400/40 transition-all duration-1000 backdrop-blur-sm hover:shadow-lg hover:shadow-emerald-500/10"
      >
        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-gradient-to-br from-emerald-400/5 to-teal-400/5 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="p-3 rounded-full bg-emerald-500/10 border border-emerald-400/20 group-hover:border-teal-400/30 group-hover:scale-110 group-hover:bg-teal-500/20 transition-all duration-1000">
              <svg className="w-5 h-5 text-emerald-300/70 group-hover:text-teal-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>

            <div className="opacity-0 group-hover:opacity-70 transition-all duration-1000">
              <svg className="w-5 h-5 text-teal-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>

          {/* Content */}
          <h3 className="text-base sm:text-lg font-light tracking-wide text-emerald-100 group-hover:text-teal-100 transition-colors mb-2">
            {project.title}
          </h3>

          <p className="text-narrative text-sm text-emerald-200/70 group-hover:text-teal-200/80 leading-relaxed mb-3 flex-grow transition-colors">
            {project.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 text-[10px] uppercase tracking-widest rounded-full bg-emerald-500/10 text-emerald-200/70 border border-emerald-400/20 group-hover:border-teal-400/30 group-hover:text-teal-200 transition-colors"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Link indicator */}
          <div className="flex items-center gap-3 text-ui text-emerald-200/80 group-hover:text-teal-100 transition-colors duration-1000">
            <span className="relative">
              Manifestation Details
              <span className="absolute bottom-[-2px] left-0 w-4 h-[1px] bg-emerald-400/30 group-hover:w-full group-hover:bg-teal-400/50 transition-all duration-1000" />
            </span>
            <svg className="w-3 h-3 opacity-60 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-1000" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </article>
    </motion.div>
  )
}
