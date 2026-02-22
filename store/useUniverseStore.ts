/**
 * Global Universe State Management
 * Single source of truth for all application state
 */

import { create } from 'zustand'
import { ZodiacSign, AppStage } from '@/types'
import type { Comment } from '@/types/comment'
import type { RealtimeChannel } from '@supabase/supabase-js'
import {
  fetchComments,
  subscribeToRealtimeComments,
  unsubscribeFromRealtimeComments,
} from '@/lib/supabase/comments'

interface UniverseState {
  // Core App State
  stage: AppStage
  zodiacSign: ZodiacSign | null
  introCompleted: boolean
  
  // Navigation State
  activeNode: string | null
  hoveredNode: string | null
  
  // UI State
  aiOpen: boolean
  guestbookOpen: boolean
  
  // Guestbook State
  comments: Comment[]
  commentsLoading: boolean
  realtimeConnected: boolean
  realtimeChannel: RealtimeChannel | null
  
  // Actions
  setStage: (stage: AppStage) => void
  setZodiacSign: (sign: ZodiacSign) => void
  completeIntro: (sign: ZodiacSign) => void
  setActiveNode: (nodeId: string | null) => void
  setHoveredNode: (nodeId: string | null) => void
  toggleAI: () => void
  openAI: () => void
  closeAI: () => void
  
  // Guestbook Actions
  openGuestbook: () => void
  closeGuestbook: () => void
  loadComments: () => Promise<void>
  addCommentOptimistic: (comment: Comment) => void
  addCommentFromRealtime: (comment: Comment) => void
  startRealtimeListener: () => void
  stopRealtimeListener: () => void
  
  reset: () => void
}

const initialState = {
  stage: 'intro' as AppStage,
  zodiacSign: null,
  introCompleted: false,
  activeNode: null,
  hoveredNode: null,
  aiOpen: false,
  guestbookOpen: false,
  comments: [] as Comment[],
  commentsLoading: false,
  realtimeConnected: false,
  realtimeChannel: null as RealtimeChannel | null,
}

export const useUniverseStore = create<UniverseState>((set, get) => ({
  ...initialState,
  
  setStage: (stage) => set({ stage }),
  
  setZodiacSign: (sign) => set({ zodiacSign: sign }),
  
  completeIntro: (sign) => set({
    zodiacSign: sign,
    introCompleted: true,
    stage: 'main',
  }),
  
  setActiveNode: (nodeId) => set({ activeNode: nodeId }),
  
  setHoveredNode: (nodeId) => set({ hoveredNode: nodeId }),
  
  toggleAI: () => set((state) => ({ aiOpen: !state.aiOpen })),
  
  openAI: () => set({ aiOpen: true }),
  
  closeAI: () => set({ aiOpen: false }),
  
  // Guestbook Actions
  openGuestbook: () => {
    set({ guestbookOpen: true })
    get().loadComments()
    get().startRealtimeListener()
  },
  
  closeGuestbook: () => {
    set({ guestbookOpen: false })
    get().stopRealtimeListener()
  },
  
  loadComments: async () => {
    set({ commentsLoading: true })
    try {
      const comments = await fetchComments(20)
      set({ comments, commentsLoading: false })
    } catch (error) {
      console.error('Failed to load comments:', error)
      set({ commentsLoading: false })
    }
  },
  
  addCommentOptimistic: (comment) => {
    set((state) => {
      // Prevent duplicates
      const exists = state.comments.some((c) => c.id === comment.id)
      if (exists) return state
      
      // Prepend newest comment
      return { comments: [comment, ...state.comments] }
    })
  },
  
  addCommentFromRealtime: (comment) => {
    set((state) => {
      // Prevent duplicates (might already be optimistically added)
      const exists = state.comments.some((c) => c.id === comment.id)
      if (exists) return state
      
      // Prepend newest comment
      return { comments: [comment, ...state.comments] }
    })
  },
  
  startRealtimeListener: () => {
    const { realtimeChannel } = get()
    
    // Prevent duplicate subscriptions
    if (realtimeChannel) {
      console.warn('Realtime listener already active')
      return
    }
    
    const channel = subscribeToRealtimeComments((newComment) => {
      get().addCommentFromRealtime(newComment)
    })
    
    set({ realtimeChannel: channel, realtimeConnected: true })
  },
  
  stopRealtimeListener: async () => {
    const { realtimeChannel } = get()
    
    if (realtimeChannel) {
      await unsubscribeFromRealtimeComments(realtimeChannel)
      set({ realtimeChannel: null, realtimeConnected: false })
    }
  },
  
  reset: () => set(initialState),
}))
