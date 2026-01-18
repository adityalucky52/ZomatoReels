import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Sidebar from '../user/Sidebar'
import useReelFeedStore from '../../store/reelFeedStore'
import { Link } from 'react-router-dom'
import ReelItem from './ReelItem'

/**
 * SingleReel - Complete reels viewer with sidebar
 * Handles URL-based navigation, feed reordering, and all video interactions
 */
const SingleReel = () => {
  const { reelId } = useParams()
  const navigate = useNavigate()
  const { videos, loading, error, fetchVideos, likeVideo, saveVideo } = useReelFeedStore()

  useEffect(() => {
    if (videos.length === 0) {
      fetchVideos()
    }
  }, [])

  useEffect(() => {
    if (!loading && videos.length > 0) {
      if (!reelId) {
        navigate(`/reels/${videos[0]._id}`, { replace: true })
      } else {
        const reelIndex = videos.findIndex(v => v._id === reelId)
        if (reelIndex === -1) {
          navigate(`/reels/${videos[0]._id}`, { replace: true })
        }
      }
    }
  }, [reelId, videos.length, loading, navigate])



  if (loading) {
    return (
      <div className="flex h-screen bg-white">
        <Sidebar />
        <div className="flex-1 bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mb-4"></div>
            <p className="text-white text-lg">Loading reels...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen bg-white">
        <Sidebar />
        <div className="flex-1 bg-gray-900 flex items-center justify-center">
          <div className="text-center text-white">
            <svg className="w-20 h-20 mx-auto mb-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xl mb-2">Oops! Something went wrong</p>
            <p className="text-gray-400 mb-4">{error}</p>
            <button
              onClick={fetchVideos}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  const currentIndex = videos.findIndex(v => v._id === reelId)
  const reelsToShow = currentIndex >= 0
    ? [...videos.slice(currentIndex), ...videos.slice(0, currentIndex)]
    : videos

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <div className="h-screen bg-gray-900 overflow-hidden flex items-center justify-center">
          <div
            className="relative h-full w-full max-w-[480px] overflow-y-auto snap-y snap-mandatory scroll-smooth bg-black no-scrollbar"
            role="list"
          >
            {reelsToShow.length === 0 && (
              <div className="absolute inset-0 grid place-items-center text-white">
                <p>No reels available yet. Check back later! 🍽️</p>
              </div>
            )}

            {reelsToShow.map((item) => (
              <div
                key={item._id}
                className="snap-start h-screen w-full relative"
              >
                {/* Since we can't easily sync state from inside this map without a proper loop in useEffect,
                      let's revert to a cleaner structure using ReelFeed's pattern inside SingleReel
                   */}
                <ObservedReelItem
                  item={item}
                  likeVideo={likeVideo}
                  saveVideo={saveVideo}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper component to handle visibility logic locally per item if we don't want a centralized observer in SingleReel
// Or better yet, let's just copy the ReelFeed behavior of a centralized observer in useEffect
const ObservedReelItem = ({ item, likeVideo, saveVideo }) => {
  const ref = React.useRef(null)
  const [isActive, setIsActive] = React.useState(false)

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsActive(entry.isIntersecting)
    }, { threshold: 0.6 })

    if (ref.current) {
      observer.observe(ref.current)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="h-full w-full">
      <ReelItem
        item={item}
        isActive={isActive}
        onLike={likeVideo}
        onSave={saveVideo}
      />
    </div>
  )
}


export default SingleReel
