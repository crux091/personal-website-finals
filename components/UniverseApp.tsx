/**
 * Main Application Component
 * Orchestrates all layers with clear separation
 * No business logic - pure composition
 */

'use client'

import { memo, Suspense } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useUniverseStore } from '@/store/useUniverseStore'
import dynamic from 'next/dynamic'
import Starfield from '@/components/background/Starfield'

// Lazy load heavy components
const IntroSequence = dynamic(() => import('@/components/intro/IntroSequence'))
const Constellation = dynamic(() => import('@/components/constellation/Constellation'))
const OwnerShip = dynamic(() => import('@/components/entities/OwnerShip'))
const AIShip = dynamic(() => import('@/components/entities/AIShip'))
const SectionContent = dynamic(() => import('@/components/ui/SectionContent'))
const AIPanel = dynamic(() => import('@/components/ui/AIPanel'))
const GuestbookPanel = dynamic(() => import('@/components/ui/GuestbookPanel').then(mod => ({ default: mod.GuestbookPanel })))

const UniverseApp = memo(function UniverseApp() {
  const { stage, zodiacSign, activeNode, setActiveNode, openGuestbook } = useUniverseStore()

  const handleNodeClick = (nodeId: string) => {
    // Special handling for guestbook node
    if (nodeId === 'guestbook') {
      openGuestbook()
      return
    }
    
    // Standard node activation
    setActiveNode(nodeId)
  }

  const handleCloseContent = () => {
    setActiveNode(null)
  }

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden select-none">
      {/* Layer 0: Background */}
      <Starfield starCount={200} parallaxStrength={0} driftSpeed={0.5} />

      {/* Layer 1: Application Flow */}
      <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
        <AnimatePresence mode="wait">
          {stage === 'intro' ? (
            <IntroSequence key="intro" />
          ) : zodiacSign ? (
            <div key="main" className="relative w-full h-full">
              {/* Layer 2: Constellation Structure */}
              <Constellation zodiac={zodiacSign} onNodeClick={handleNodeClick} />

              {/* Layer 3: Entities */}
              <OwnerShip zodiac={zodiacSign} />
              <AIShip />

              {/* Layer 4: Content UI */}
              <AnimatePresence>
                {activeNode && (
                  <SectionContent section={activeNode} onClose={handleCloseContent} />
                )}
              </AnimatePresence>

              {/* Layer 5: AI Panel (highest z-index) */}
              <AIPanel />
              
              {/* Layer 6: Guestbook Panel (flies above constellation) */}
              <GuestbookPanel />
            </div>
          ) : null}
        </AnimatePresence>
      </Suspense>
    </div>
  )
})

export default UniverseApp
