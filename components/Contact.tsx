"use client"
import React, { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import RepeatInView from './RepeatInView'
import { fadeUp, fadeIn, transition } from './motionConfig'
import { motion } from 'framer-motion'

const RECIPIENT = 'kikorickcruz@gmail.com'

const LinkedInIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const GitHubIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
)

const EmailIcon = () => (
  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({})
  const [status, setStatus] = useState<string | null>(null)

  const form = useRef<HTMLFormElement>(null)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e: typeof errors = {}
    if (!name.trim()) e.name = 'Please enter your name.'
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim()) e.email = 'Please enter your email.'
    else if (!emailRegex.test(email)) e.email = 'Please enter a valid email.'
    if (!message.trim() || message.trim().length < 10)
      e.message = 'Please enter a message (at least 10 characters).'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)
    if (!validate()) return

    setLoading(true)

    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || ''
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || ''
    const AUTOREPLY_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY_TEMPLATE_ID || ''
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.warn('EmailJS keys are missing in .env.local')
      // Fallback demo for the user if keys aren't set
      setTimeout(() => {
        setLoading(false)
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
        setTimeout(() => setStatus(null), 5000)
      }, 1500)
      return
    }

    if (form.current) {
      const templateParams = {
        user_name: name,
        user_email: email,
        message: message,
        to_name: 'Rick Francis Cruz', // Fallback for Admin template
        reply_to: email,
      }

      // Send Admin Notification
      const sendAdmin = emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)

      const promises = [sendAdmin]

      if (AUTOREPLY_TEMPLATE_ID) {
        const sendAutoReply = emailjs.send(SERVICE_ID, AUTOREPLY_TEMPLATE_ID, templateParams, PUBLIC_KEY)
        promises.push(sendAutoReply)
      }

      Promise.all(promises)
        .then(() => {
          setLoading(false)
          setStatus('success')
          setName('')
          setEmail('')
          setMessage('')
          setTimeout(() => setStatus(null), 5000)
        }, (error) => {
          setLoading(false)
          console.error('EmailJS FAILED:', error)
          setStatus('error')
        })
    }
  }

  const contactMethods = [
    { icon: <EmailIcon />, label: 'Email', value: RECIPIENT, link: `mailto:${RECIPIENT}` },
    { icon: <LinkedInIcon />, label: 'LinkedIn', value: 'Connect with me', link: 'https://www.linkedin.com/in/rick-francis-cruz/' },
    { icon: <GitHubIcon />, label: 'GitHub', value: '@crux091', link: 'https://github.com/crux091' }
  ]

  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary-400 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <RepeatInView variants={fadeUp} transition={transition} delay={0.05}>
          <div className="text-center mb-16">
            <h2 className="text-ui text-primary-400 opacity-100 mb-2">Signal Transmission</h2>
            <p className="text-narrative text-white/40 italic max-w-xl mx-auto">
              Initiate contact across the digital expanse.
            </p>
          </div>
        </RepeatInView>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-6xl mx-auto">
          {/* Contact info */}
          <RepeatInView variants={fadeIn} transition={transition} delay={0.18}>
            <div className="space-y-6">
              <div className="glass-card p-10 bg-white/[0.01] border-white/5">
                <h3 className="text-xl font-light text-white mb-6">Established Channels</h3>
                <p className="text-narrative text-white/40 leading-relaxed mb-10">
                  I remain receptive to creative collaborations, experimental projects, and architecting new visions.
                </p>

                <div className="space-y-6">
                  {contactMethods.map((method, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-6 group"
                    >
                      <div className="text-white/20 group-hover:text-primary-400 transition-colors duration-700">{method.icon}</div>
                      <div className="flex-1">
                        <div className="text-ui opacity-40 mb-1">{method.label}</div>
                        <a
                          href={method.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/60 hover:text-white text-narrative transition-colors duration-700"
                        >
                          {method.value}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </RepeatInView>

          {/* Contact form */}
          <RepeatInView variants={fadeIn} transition={transition} delay={0.28}>
            <form ref={form} onSubmit={handleSubmit} className="glass-card p-10 space-y-8 bg-white/[0.01] border-white/5">
              <div>
                <label htmlFor="user_name" className="text-ui block mb-4">
                  Identification
                </label>
                <input
                  name="user_name"
                  id="user_name"
                  type="text"
                  className="w-full px-6 py-4 rounded-full bg-white/[0.03] border border-white/5 text-white placeholder-white/20 focus:border-white/20 focus:outline-none transition-all text-sm tracking-wide"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={!!errors.name}
                  disabled={loading}
                />
                {errors.name && <div className="text-[10px] text-red-400/60 mt-2 uppercase tracking-widest">{errors.name}</div>}
              </div>

              <div>
                <label htmlFor="user_email" className="text-ui block mb-4">
                  Signal Coordinates
                </label>
                <input
                  name="user_email"
                  id="user_email"
                  type="email"
                  className="w-full px-6 py-4 rounded-full bg-white/[0.03] border border-white/5 text-white placeholder-white/20 focus:border-white/20 focus:outline-none transition-all text-sm tracking-wide"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!errors.email}
                  disabled={loading}
                />
                {errors.email && <div className="text-[10px] text-red-400/60 mt-2 uppercase tracking-widest">{errors.email}</div>}
              </div>

              <div>
                <label htmlFor="message" className="text-ui block mb-4">
                  Transmission
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  className="w-full px-6 py-4 rounded-[2rem] bg-white/[0.03] border border-white/5 text-white placeholder-white/20 focus:border-white/20 focus:outline-none transition-all text-sm tracking-wide resize-none"
                  placeholder="Your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-invalid={!!errors.message}
                  disabled={loading}
                />
                {errors.message && <div className="text-[10px] text-red-400/60 mt-2 uppercase tracking-widest">{errors.message}</div>}
              </div>

              <div className="flex items-center pt-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-8 py-4 rounded-full bg-white text-black text-ui font-bold hover:bg-gray-200 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex justify-center items-center gap-3 shadow-xl shadow-white/5"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Transmitting...
                      </>
                    ) : 'Initiate Transmission'}
                  </button>
                </motion.div>
              </div>

              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-center text-green-300 bg-green-500/10 rounded-lg py-3 px-4 border border-green-500/20 flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Message sent successfully!
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-center text-red-300 bg-red-500/10 rounded-lg py-3 px-4 border border-red-500/20">
                  Failed to send message. Please try again or email directly.
                </motion.div>
              )}
            </form>
          </RepeatInView>
        </div>
      </div>
    </div>
  )
}
