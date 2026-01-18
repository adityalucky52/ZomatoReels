import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ReelItem from './ReelItem'

/**
 * ReelFeed - Complete vertical scrollable feed for reels
 * Consolidated component handling video playback, interactions, and UI
 * 
 * Props:
 * - items: Array of video items
 * - onLike: (item) => void | Promise<void>
 * - onSave: (item) => void | Promise<void>
 * - emptyMessage: string - Message shown when no videos
 * - onReelChange: (reelId) => void - Called when a reel comes into view
 * - showComments: boolean - Whether to show comment button (default: true)
 */
const ReelFeed = ({
  items = [],
  emptyMessage = 'No videos yet.',
  onLike,
  onSave,
  onReelChange,
  showComments = true
}) => {
  const [activeReelId, setActiveReelId] = useState(null)

  // Use a ref to track observers to disconnect properly
  const observerRef = useRef(null)

  useEffect(() => {
    const options = { threshold: 0.6 }

    // Callback for IntersectionObserver
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const reelId = entry.target.dataset.reelId
          setActiveReelId(reelId)
          if (onReelChange && reelId) {
            onReelChange(reelId)
          }
        }
      })
    }

    observerRef.current = new IntersectionObserver(handleIntersection, options)

    // Observe all reel sections
    const elements = document.querySelectorAll('[data-reel-id]')
    elements.forEach(el => observerRef.current.observe(el))

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [items, onReelChange])

  return (
    <div className="h-screen bg-gray-900 overflow-hidden flex items-center justify-center">
      <div
        className="relative h-full w-full max-w-[480px] overflow-y-auto snap-y snap-mandatory scroll-smooth bg-black no-scrollbar"
        role="list"
      >
        {items.length === 0 && (
          <div className="absolute inset-0 grid place-items-center text-white">
            <p>{emptyMessage}</p>
          </div>
        )}

        {items.map((item) => (
          <div key={item._id} data-reel-id={item._id} className="snap-start h-screen w-full">
            <ReelItem
              item={item}
              isActive={activeReelId === item._id}
              onLike={onLike}
              onSave={onSave}
              showComments={showComments}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReelFeed
