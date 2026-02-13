"use client"
import React, { useEffect, useState } from 'react'
import { galleryImages } from '../lib/gallery'
import RepeatInView from './RepeatInView'
import { fadeUp, fadeIn, transition } from './motionConfig'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function PhotoGallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (openIndex !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
    }
  }, [openIndex])

  const navigateImage = (direction: number) => {
    if (openIndex === null) return
    const nextIdx = (openIndex + direction + galleryImages.length) % galleryImages.length
    setOpenIndex(nextIdx)
  }

  const closeImage = () => setOpenIndex(null)

  const hasImages = galleryImages.length > 0

  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <RepeatInView variants={fadeUp} transition={transition} delay={0.05}>
          <div className="text-center mb-20">
            <h2 className="text-ui text-primary-400 opacity-100 mb-2">Visual Echoes</h2>
            <p className="text-narrative text-white/40 italic max-w-xl mx-auto">
              Captured moments within the digital continuum.
            </p>
          </div>
        </RepeatInView>

        {hasImages ? (
          <RepeatInView variants={fadeIn} transition={transition} delay={0.15}>
            <div className="overflow-hidden cursor-grab active:cursor-grabbing">
              <motion.div
                className="flex gap-6 w-max px-4"
                drag="x"
                dragConstraints={{ right: 0, left: -((galleryImages.length * 320)) }} // Approximate width
                whileTap={{ cursor: "grabbing" }}
              >
                {galleryImages.map((img, idx) => (
                  <motion.div
                    key={idx}
                    className="relative flex-shrink-0 w-72 sm:w-80 h-96 glass-card rounded-2xl overflow-hidden group"
                    onClick={() => setOpenIndex(idx)}
                    role="button"
                    tabIndex={0}
                  >
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />

                    {/* Zoom icon */}
                    <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>

                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.src}
                      alt={img.alt || ''}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      draggable={false}
                    />

                    {img.alt && (
                      <div className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-sm font-medium text-white drop-shadow-lg">{img.alt}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>
              <div className="text-center mt-6 text-white/40 text-sm">
                ← Drag to explore →
              </div>
            </div>
          </RepeatInView>
        ) : (
          <RepeatInView variants={fadeIn} transition={transition} delay={0.15}>
            <div className="glass-card p-8 text-center max-w-3xl mx-auto">
              {/* Empty state content remains the same */}
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-xl font-bold text-white mb-4">Add Your Photos</h3>
              <p className="text-white/70 mb-6">
                Drop your photos into <code className="px-2 py-1 rounded bg-primary-500/10 text-primary-300 font-mono text-sm">public/gallery</code> and list them in <code className="px-2 py-1 rounded bg-primary-500/10 text-primary-300 font-mono text-sm">lib/gallery.ts</code>.
              </p>
            </div>
          </RepeatInView>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {openIndex !== null && (
            <motion.div
              className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl grid place-items-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenIndex(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
                className="relative w-full max-w-6xl aspect-[4/3] sm:aspect-video flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
              >
                {galleryImages[openIndex] && (
                  <div className="relative w-full h-full glass-card border-none bg-black/40 overflow-hidden flex items-center justify-center">
                    <Image
                      src={galleryImages[openIndex].src}
                      alt={galleryImages[openIndex].alt || ''}
                      fill
                      className="object-contain"
                      style={{ filter: 'brightness(0.9) contrast(1.1)' }}
                    />
                  </div>
                )}

                {/* Navigation buttons - Atmospheric */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage(-1)
                  }}
                  className="absolute left-8 p-4 text-white/20 hover:text-white transition-colors bg-white/[0.01] hover:bg-white/[0.05] rounded-full border border-white/5"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigateImage(1)
                  }}
                  className="absolute right-8 p-4 text-white/20 hover:text-white transition-colors bg-white/[0.01] hover:bg-white/[0.05] rounded-full border border-white/5"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                <button
                  onClick={closeImage}
                  className="absolute top-8 right-8 p-4 text-white/20 hover:text-white transition-colors bg-white/[0.01] hover:bg-white/[0.05] rounded-full border border-white/5"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-ui text-white/40 tracking-[0.4em]">
                  {openIndex + 1} / {galleryImages.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
