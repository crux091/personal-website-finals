'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPaperPlane, FaTrash, FaCopy } from 'react-icons/fa'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import RaidaAvatar from './RaidaAvatar'
import { suggestedQuestions } from '@/lib/localAI'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

const STORAGE_KEY = 'raida_chat_history'

export default function AIAgent() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load conversation from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        setMessages(parsed)
      }
    } catch (error) {
      console.error('Failed to load chat history:', error)
    }
  }, [])

  // Save conversation to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
      } catch (error) {
        console.error('Failed to save chat history:', error)
      }
    }
  }, [messages])

  // Focus input when component mounts
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleClearChat = () => {
    if (confirm('Clear all messages? This cannot be undone.')) {
      setMessages([])
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const handleCopyMessage = (content: string, index: number) => {
    navigator.clipboard.writeText(content).then(() => {
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    })
  }

  const handleSuggestedQuestion = (question: string) => {
    setInput(question)
    inputRef.current?.focus()
  }

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage, timestamp: Date.now() }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map(m => ({ role: m.role, content: m.content })).concat([{ role: 'user', content: userMessage }])
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.message) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message, timestamp: Date.now() }])
      } else {
        throw new Error('No message in response')
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm sorry, I encountered an error. Please try again or check your connection.",
          timestamp: Date.now()
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-transparent to-black/20">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-center text-gray-400 mb-6">
              <div className="mb-4 flex justify-center">
                <RaidaAvatar size="lg" />
              </div>
              <p className="text-sm font-semibold text-cyan-400 mb-1">Hi, I&apos;m RAIDA!</p>
              <p className="text-xs mb-4">Ask me anything about Rick!</p>
            </div>

            {/* Suggested Questions */}
            <div className="w-full max-w-md space-y-2 px-4">
              <p className="text-xs text-gray-500 text-center mb-2">Try asking:</p>
              {suggestedQuestions.map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="w-full text-left text-xs p-3 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-cyan-500/30 transition-all"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'
              }`}
          >
            <div className="relative group max-w-[85%]">
              <div
                className={`p-3 rounded-2xl ${message.role === 'user'
                    ? 'bg-gradient-to-br from-cyan-500 to-emerald-500 text-white shadow-lg shadow-cyan-500/20'
                    : 'bg-white/10 text-gray-100 border border-white/20 backdrop-blur-sm'
                  }`}
              >
                {message.role === 'assistant' ? (
                  <div className="prose prose-invert prose-sm max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code: ({ node, inline, className, children, ...props }: any) => (
                          inline ? (
                            <code className="bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded text-xs" {...props}>
                              {children}
                            </code>
                          ) : (
                            <code className="block bg-black/50 p-2 rounded text-xs overflow-x-auto" {...props}>
                              {children}
                            </code>
                          )
                        ),
                        a: ({ node, ...props }: any) => (
                          <a className="text-cyan-400 hover:text-cyan-300 underline" target="_blank" rel="noopener noreferrer" {...props} />
                        ),
                        p: ({ node, ...props }: any) => (
                          <p className="text-sm leading-relaxed mb-2 last:mb-0" {...props} />
                        ),
                        ul: ({ node, ...props }: any) => (
                          <ul className="text-sm list-disc list-inside space-y-1" {...props} />
                        ),
                        ol: ({ node, ...props }: any) => (
                          <ol className="text-sm list-decimal list-inside space-y-1" {...props} />
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                )}
              </div>
              {message.role === 'assistant' && (
                <button
                  onClick={() => handleCopyMessage(message.content, index)}
                  className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 bg-gray-700 hover:bg-gray-600 text-white p-1.5 rounded-lg transition-all text-xs"
                  title="Copy message"
                  aria-label="Copy message"
                >
                  {copiedIndex === index ? '✓' : <FaCopy className="text-xs" />}
                </button>
              )}
            </div>
            <span className="text-[10px] text-gray-500 mt-1 px-1">
              {formatTime(message.timestamp)}
            </span>
          </motion.div>
        ))}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white/10 border border-white/20 backdrop-blur-sm text-gray-100 p-3 rounded-2xl">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-white/10">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question..."
            className="flex-1 bg-white/5 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/50 border border-white/10 text-sm placeholder:text-gray-500 backdrop-blur-sm"
            disabled={isLoading}
            aria-label="Chat message input"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-gradient-to-br from-cyan-500 to-emerald-500 text-white p-3 rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <FaPaperPlane className="text-base" />
          </button>
        </form>
        {messages.length > 0 && (
          <button
            onClick={handleClearChat}
            className="mt-3 text-xs text-gray-500 hover:text-gray-400 transition-colors flex items-center gap-1"
            title="Clear conversation"
            aria-label="Clear conversation"
          >
            <FaTrash className="text-xs" />
            Clear chat history
          </button>
        )}
      </div>
    </div>
  )
}
