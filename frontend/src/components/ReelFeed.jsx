import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
// import '../../styles/reels.css'


// Reusable feed for vertical reels
// Props:
// - items: Array of video items { _id, video, description, likeCount, savesCount, commentsCount, comments, foodPartner }
// - onLike: (item) => void | Promise<void>
// - onSave: (item) => void | Promise<void>
// - emptyMessage: string
const ReelFeed = ({ items = [],emptyMessage = 'No videos yet.', onLike, onSave }) => {
  const videoRefs = useRef(new Map())

  console.log('ReelFeed items:', items)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => { /* ignore autoplay errors */ })
          } else {
            video.pause()
          }
        })
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    )

    videoRefs.current.forEach((vid) => observer.observe(vid))
    return () => observer.disconnect()
  }, [items])

  const setVideoRef = (id) => (el) => {
    if (!el) { videoRefs.current.delete(id); return }
    videoRefs.current.set(id, el)
  }

  return (
    <div className="h-screen bg-gray-900 overflow-hidden flex items-center justify-center">
      <div className="relative h-full w-full max-w-[480px] overflow-y-auto snap-y snap-mandatory scroll-smooth bg-black" role="list" style={{ scrollBehavior: 'smooth', overscrollBehaviorY: 'contain', WebkitOverflowScrolling: 'touch' }}>
        {items.length === 0 && (
          <div className="absolute inset-0 grid place-items-center text-white">
            <p>{emptyMessage}</p>
          </div>
        )}

        {items.map((item) => (
          <section key={item._id} className="relative h-screen w-full snap-start bg-black" role="listitem">
            <video
              ref={setVideoRef(item._id)}
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
                  <button onClick={() => onLike?.(item)} className="w-12 h-12 rounded-full grid place-items-center bg-black/35 backdrop-blur-sm text-white border border-white/15 shadow-md active:translate-y-px" aria-label="Like">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                    </svg>
                  </button>
                  <div className="text-white text-center text-xs">{String(item.likeCount ?? item.likesCount ?? item.likes ?? 0)}</div>
                </div>

                <div className="flex flex-col items-center gap-1 text-white">
                  <button onClick={() => onSave?.(item)} className="w-12 h-12 rounded-full grid place-items-center bg-black/35 backdrop-blur-sm text-white border border-white/15 shadow-md active:translate-y-px" aria-label="Bookmark">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                    </svg>
                  </button>
                  <div className="text-white text-center text-xs">{String(item.savesCount ?? item.bookmarks ?? item.saves ?? 0)}</div>
                </div>

                <div className="flex flex-col items-center gap-1 text-white">
                  <button className="w-12 h-12 rounded-full grid place-items-center bg-black/35 backdrop-blur-sm text-white border border-white/15 shadow-md active:translate-y-px" aria-label="Comments">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                    </svg>
                  </button>
                  <div className="text-white text-center text-xs">{String(item.commentsCount ?? (Array.isArray(item.comments) ? item.comments.length : 0))}</div>
                </div>
              </div>

              <div className="relative w-full px-6 pb-24 pr-[4.5rem] flex flex-col gap-4 pointer-events-auto">
                <p className="text-white text-base leading-snug line-clamp-2 max-w-[90ch]" style={{ textShadow: '0 1px 2px rgba(0,0,0,.4)' }} title={item.description}>{item.description}</p>
                {item.foodPartner && (
                  <Link className="self-start bg-red-600 hover:bg-red-700 text-white rounded-full px-4 py-2.5 font-bold tracking-wide shadow-md transition-all active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2" to={"/food-partner/" + item.foodPartner} aria-label="Visit store">Visit store</Link>
                )}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}

export default ReelFeed
