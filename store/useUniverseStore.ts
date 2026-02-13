/**
 * Global Universe State Management
 * Single source of truth for all application state
 */

import { create } from 'zustand'
import { ZodiacSign, AppStage } from '@/types'

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
  
  // Actions
  setStage: (stage: AppStage) => void
  setZodiacSign: (sign: ZodiacSign) => void
  completeIntro: (sign: ZodiacSign) => void
  setActiveNode: (nodeId: string | null) => void
  setHoveredNode: (nodeId: string | null) => void
  toggleAI: () => void
  openAI: () => void
  closeAI: () => void
  reset: () => void
}

const initialState = {
  stage: 'intro' as AppStage,
  zodiacSign: null,
  introCompleted: false,
  activeNode: null,
  hoveredNode: null,
  aiOpen: false,
}

export const useUniverseStore = create<UniverseState>((set) => ({
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
  
  reset: () => set(initialState),
}))
