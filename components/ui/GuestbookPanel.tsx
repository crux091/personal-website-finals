'use client'

/**
 * Guestbook Panel Component
 * Realtime Supabase guestbook — design matches the portfolio cosmic UI system.
 */

import { useState, useEffect, FormEvent, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUniverseStore } from '@/store/useUniverseStore'
import { createComment } from '@/lib/supabase/comments'
import type { Comment } from '@/types/comment'

const MAX_NAME_LENGTH = 100
const MAX_MESSAGE_LENGTH = 500

export function GuestbookPanel() {
  const { guestbookOpen, closeGuestbook, comments, commentsLoading, addCommentOptimistic } = useUniverseStore()

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!guestbookOpen) {
      setName('')
      setMessage('')
      setError(null)
      setSubmitted(false)
    }
  }, [guestbookOpen])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    const trimmedName = name.trim()
    const trimmedMessage = message.trim()

    if (!trimmedName || trimmedName.length > MAX_NAME_LENGTH) {
      setError(`Name must be between 1 and ${MAX_NAME_LENGTH} characters`)
      return
    }
    if (!trimmedMessage || trimmedMessage.length > MAX_MESSAGE_LENGTH) {
      setError(`Message must be between 1 and ${MAX_MESSAGE_LENGTH} characters`)
      return
    }

    setSubmitting(true)
    try {
      const newComment = await createComment(trimmedName, trimmedMessage)
      addCommentOptimistic(newComment)
      setName('')
      setMessage('')
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit comment')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {guestbookOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-black/80 via-blue-950/30 to-black/80 backdrop-blur-md"
          onClick={closeGuestbook}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="relative w-full max-w-2xl max-h-[85vh] bg-gradient-to-br from-slate-900/95 via-blue-900/80 to-slate-900/95 border border-blue-400/30 rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center justify-between px-8 py-5 border-b border-white/10 bg-gradient-to-b from-black/40 to-transparent backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-sm tracking-widest uppercase text-white/80">
                  Guestbook
                </span>
              </div>
              <button
                onClick={closeGuestbook}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/20 transition-all duration-300 group"
                aria-label="Close guestbook"
              >
                <svg className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-8 py-6 space-y-8">

              {/* Form */}
              <div>
                <p className="text-xs tracking-widest uppercase text-blue-300/60 mb-5">
                  Leave your mark in the cosmos
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="gb-name" className="block text-xs tracking-widest uppercase text-white/40 mb-2">
                      Name
                    </label>
                    <input
                      id="gb-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={MAX_NAME_LENGTH}
                      placeholder="Your name..."
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 transition-all duration-200"
                      required
                    />
                    <p className="text-xs text-white/20 mt-1 text-right">{name.length}/{MAX_NAME_LENGTH}</p>
                  </div>

                  <div>
                    <label htmlFor="gb-message" className="block text-xs tracking-widest uppercase text-white/40 mb-2">
                      Message
                    </label>
                    <textarea
                      id="gb-message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      maxLength={MAX_MESSAGE_LENGTH}
                      placeholder="Share your thoughts..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/20 text-sm focus:outline-none focus:border-blue-400/50 focus:ring-1 focus:ring-blue-400/30 transition-all duration-200 resize-none"
                      required
                    />
                    <p className="text-xs text-white/20 mt-1 text-right">{message.length}/{MAX_MESSAGE_LENGTH}</p>
                  </div>

                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-sm text-red-400/80 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2"
                      >
                        {error}
                      </motion.p>
                    )}
                    {submitted && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-sm text-blue-300/80 bg-blue-500/10 border border-blue-500/20 rounded-lg px-4 py-2"
                      >
                        ✦ Message sent to the cosmos
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-lg text-sm tracking-widest uppercase font-light bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400/30 hover:border-blue-300/50 text-blue-200 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {submitting ? 'Transmitting...' : 'Submit Message'}
                  </button>
                </form>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10" />

              {/* Comments */}
              <div>
                <p className="text-xs tracking-widest uppercase text-blue-300/60 mb-5">
                  Recent Messages
                </p>

                {commentsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:0ms]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:150ms]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                ) : comments.length === 0 ? (
                  <p className="text-center text-white/30 text-sm py-10 tracking-wide">
                    No messages yet. Be the first to sign.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {comments.map((comment) => (
                      <CommentCard key={comment.id} comment={comment} />
                    ))}
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Memoized Comment Card
const CommentCard = memo(({ comment }: { comment: Comment }) => {
  const timeAgo = getTimeAgo(new Date(comment.created_at))

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-blue-400/30 hover:bg-blue-500/5 transition-all duration-300 group"
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-blue-200/90 group-hover:text-blue-100 transition-colors">
          {comment.name}
        </span>
        <span className="text-xs text-white/25 tracking-wide">
          {timeAgo}
        </span>
      </div>
      <p className="text-sm text-white/60 leading-relaxed whitespace-pre-wrap break-words">
        {comment.message}
      </p>
    </motion.div>
  )
})

CommentCard.displayName = 'CommentCard'

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
  const intervals: [number, string][] = [
    [31536000, 'year'],
    [2592000, 'month'],
    [604800, 'week'],
    [86400, 'day'],
    [3600, 'hour'],
    [60, 'minute'],
  ]
  for (const [secs, label] of intervals) {
    const n = Math.floor(seconds / secs)
    if (n >= 1) return `${n} ${label}${n === 1 ? '' : 's'} ago`
  }
  return 'just now'
}
