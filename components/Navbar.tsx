"use client"
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact' }
]

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { root: null, rootMargin: '-10% 0px -60% 0px', threshold: 0.2 }
    )

    sections.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })

    return () => obs.disconnect()
  }, [])

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/5">
      <div className="container flex items-center justify-between h-16">
        <div className="text-lg sm:text-xl font-bold text-primary-400">Rick Francis Cruz</div>
        
        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6 items-center">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`cursor-pointer px-2 py-1 rounded-md transition-colors duration-200 ${
                  active === s.id
                    ? 'text-primary-400 bg-white/5 '
                    : 'text-white/70 hover:text-primary-300'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(s.id)
                }}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden p-2 text-white/70 hover:text-primary-400 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-white/5 bg-black/95 backdrop-blur-md overflow-hidden"
          >
            <ul className="py-4 space-y-1">
              {sections.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => handleNavClick(s.id)}
                    className={`w-full text-left px-6 py-3 transition-colors ${
                      active === s.id
                        ? 'text-primary-400 bg-white/5'
                        : 'text-white/70 hover:text-primary-300 hover:bg-white/5'
                    }`}
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
