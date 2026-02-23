/**
 * Section Content UI Component
 * Displays content based on active node
 * Pure UI layer - no constellation logic
 */

'use client'

import { motion } from 'framer-motion'
import { memo } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import section components to optimize bundle
const About = dynamic(() => import('@/components/About'))
const Skills = dynamic(() => import('@/components/Skills'))
const Projects = dynamic(() => import('@/components/Projects'))
const Contact = dynamic(() => import('@/components/Contact'))
const ExperienceTimeline = dynamic(() => import('@/components/ExperienceTimeline'))
const PhotoGallery = dynamic(() => import('@/components/PhotoGallery'))

interface SectionContentProps {
  section: string
  onClose: () => void
}

const SectionContent = memo(function SectionContent({
  section,
  onClose,
}: SectionContentProps) {
  const renderContent = () => {
    switch (section) {
      case 'about':
        return <About />
      case 'skills':
        return <Skills />
      case 'projects':
        return <Projects />
      case 'experience':
        return <ExperienceTimeline />
      case 'gallery':
        return <PhotoGallery />
      case 'contact':
        return <Contact />
      default:
        return (
          <div className="text-center">
            <h2 className="text-2xl font-light tracking-wider mb-4">
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </h2>
            <p className="text-white/60">Content coming soon...</p>
          </div>
        )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-gradient-to-br from-black/80 via-blue-950/30 to-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full max-w-4xl max-h-[88vh] sm:max-h-[92vh] flex flex-col bg-gradient-to-br from-slate-900/95 via-blue-900/80 to-slate-900/95 border border-blue-400/30 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-blue-500/10 hover:bg-blue-500/20 border border-blue-400/30 hover:border-blue-300/50 transition-all duration-300 group backdrop-blur-sm"
        >
          <svg
            className="w-5 h-5 text-blue-200/80 group-hover:text-blue-100 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="overflow-y-auto pt-16 pb-4 px-4 sm:pt-16 sm:px-8 sm:pb-6 md:pt-16 md:px-12 md:pb-8 overscroll-contain">
          {renderContent()}
        </div>
      </motion.div>
    </motion.div>
  )
})

export default SectionContent
