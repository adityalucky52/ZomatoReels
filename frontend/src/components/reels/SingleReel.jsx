import React, { useEffect, useCallback, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Sidebar from '../user/Sidebar'
import useReelFeedStore from '../../store/reelFeedStore'

const SingleReel = () => {
  const { reelId } = useParams()
  const navigate = useNavigate()
  const { videos, loading, error, fetchVideos, likeVideo, saveVideo } = useReelFeedStore()
  const videoRefs = useRef(new Map())

  useEffect(() => {
    if (videos.length === 0) {
      fetchVideos()
    }
  }, [])

  useEffect(() => {
    // Find the index of the current reel
    const reelIndex = videos.findIndex(v => v._id === reelId)
    
    // If reel not found and we have videos, redirect to first reel
    if (reelIndex === -1 && videos.length > 0 && !loading) {
      navigate(`/reels/${videos[0]._id}`, { replace: true })
    }
  }, [reelId, videos.length, loading, navigate])

  const handleReelChange = useCallback((newReelId) => {
    navigate(`/reels/${newReelId}`, { replace: true })
  }, [navigate])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => { /* ignore autoplay errors */ })
            // const reelId = video.dataset.reelId
            // if (reelId) {
            //   handleReelChange(reelId)
            // }
          } else {
            video.pause()
          }
        })
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    )

    videoRefs.current.forEach((vid) => observer.observe(vid))
    return () => observer.disconnect()
  }, [videos])
  // }, [videos, handleReelChange])

  const setVideoRef = (id) => (el) => {
    if (!el) { videoRefs.current.delete(id); return }
    videoRefs.current.set(id, el)
  }

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

  // Reorder videos to start from the current reel
  const currentIndex = videos.findIndex(v => v._id === reelId)
  const reelsToShow = currentIndex >= 0 
    ? [...videos.slice(currentIndex), ...videos.slice(0, currentIndex)]
    : videos

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <div className="h-screen bg-gray-900 overflow-hidden flex items-center justify-center">
          <div className="relative h-full w-full max-w-[480px] overflow-y-auto snap-y snap-mandatory scroll-smooth bg-black" role="list">
            {reelsToShow.length === 0 && (
              <div className="absolute inset-0 grid place-items-center text-white">
                <p>No reels available yet. Check back later! 🍽️</p>
              </div>
            )}

            {reelsToShow.map((item) => (
              <section key={item._id} className="relative h-screen w-full snap-start bg-black" role="listitem">
                <video
                  ref={setVideoRef(item._id)}
                  data-reel-id={item._id}
                  className="absolute inset-0 w-full h-full object-cover object-center bg-black z-[1]"
                  src={item.video}
                  muted
                  playsInline
                  loop
                  preload="metadata"
                />

                <div className="absolute inset-0 flex items-end pointer-events-none z-[2]">
                  <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/5 via-30% to-black/65" aria-hidden="true" />
                  <div className="absolute right-2.5 bottom-24 flex flex-col gap-3.5 pointer-events-auto">
                    <div className="flex flex-col items-center gap-1 text-white">
                      <button onClick={() => likeVideo(item)} className="w-12 h-12 rounded-full grid place-items-center bg-gradient-to-br from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 backdrop-blur-sm text-white border border-white/20 shadow-lg hover:shadow-xl active:translate-y-px transition-all" aria-label="Like">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                        </svg>
                      </button>
                      <div className="text-white text-center text-xs font-semibold">{String(item.likeCount ?? 0)}</div>
                    </div>

                    <div className="flex flex-col items-center gap-1 text-white">
                      <button onClick={() => saveVideo(item)} className="w-12 h-12 rounded-full grid place-items-center bg-gradient-to-br from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 backdrop-blur-sm text-white border border-white/20 shadow-lg hover:shadow-xl active:translate-y-px transition-all" aria-label="Bookmark">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                        </svg>
                      </button>
                      <div className="text-white text-center text-xs font-semibold">{String(item.savesCount ?? 0)}</div>
                    </div>

                    <div className="flex flex-col items-center gap-1 text-white">
                      <button className="w-12 h-12 rounded-full grid place-items-center bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 backdrop-blur-sm text-white border border-white/20 shadow-lg hover:shadow-xl active:translate-y-px transition-all" aria-label="Comments">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                        </svg>
                      </button>
                      <div className="text-white text-center text-xs font-semibold">{String(item.commentsCount ?? 0)}</div>
                    </div>
                  </div>

                  <div className="relative w-full px-6 pb-24 pr-[4.5rem] flex flex-col gap-4 pointer-events-auto">
                    <p className="text-white text-base leading-snug line-clamp-2 max-w-[90ch]" style={{ textShadow: '0 1px 2px rgba(0,0,0,.4)' }} title={item.description}>{item.description}</p>
                    {item.foodPartner && (
                      <Link className="self-start bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-full px-6 py-3 font-bold tracking-wide shadow-lg hover:shadow-xl transition-all active:translate-y-px transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2" to={"/food-partner/" + item.foodPartner} aria-label="Visit store">🍽️ Visit Store</Link>
                    )}
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleReel
