import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart, FaRegComment, FaRegBookmark, FaVolumeMute, FaVolumeUp } from 'react-icons/fa'

/**
 * ReelItem - Reusable component for a single reel video
 * Handles video playback, gestures, and enhanced UI overlays
 */
const ReelItem = ({
    item,
    isActive,
    onLike,
    onSave,
    showComments = true
}) => {
    const videoRef = useRef(null)
    const [isMuted, setIsMuted] = useState(true)
    const [progress, setProgress] = useState(0)
    const [isLiked, setIsLiked] = useState(false) // Optimistic update state
    const [showHeartAnimation, setShowHeartAnimation] = useState(false)

    // Sync ref with parent if needed, or handle locally (parent usually handles IntersectionObserver)
    // For this refactor, we pass the ref callback from parent usually, but since we are extracting logic,
    // we might need to expose the video ref relative to the section. 
    // However, ReelFeed uses IntersectionObserver on the video element itself.
    // We will attach specific class/id for the observer.

    useEffect(() => {
        if (isActive) {
            videoRef.current?.play().catch(() => { })
        } else {
            videoRef.current?.pause()
        }
    }, [isActive])

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100
            setProgress(percentage)
        }
    }

    const toggleMute = (e) => {
        e.stopPropagation()
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted
            setIsMuted(videoRef.current.muted)
        }
    }

    const handleDoubleTap = (e) => {
        e.stopPropagation()
        // Simple double tap logic could be here, but usually needs touch event handling.
        // For now we assume this is triggered by a wrapper or standard onClick logic if needed.
        // We'll implement a click handler that detects double clicks manually if needed, 
        // or just rely on a separate gesture handler.
        // Let's stick to a simple heart animation trigger for now on 'Like' action, 
        // and maybe double click on container.
        handleLike()
        triggerHeartAnimation()
    }

    const triggerHeartAnimation = () => {
        setShowHeartAnimation(true)
        setTimeout(() => setShowHeartAnimation(false), 1000)
    }

    const handleLike = () => {
        onLike?.(item)
        // Optimistic toggle (actual logic depends on parent state, but visual feedback is nice)
        setIsLiked(!isLiked)
        triggerHeartAnimation()
    }

    const handleVideoClick = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play()
            } else {
                videoRef.current.pause()
            }
        }
    }

    return (
        <section className="relative h-screen w-full snap-start bg-black flex items-center justify-center overflow-hidden" role="listitem">
            {/* Video Player */}
            <video
                ref={videoRef}
                data-reel-id={item._id}
                className="w-full h-full object-cover"
                src={item.video}
                muted={isMuted}
                playsInline
                loop
                onTimeUpdate={handleTimeUpdate}
                onClick={handleVideoClick}
                onDoubleClick={handleDoubleTap}
            />

            {/* Big Heart Animation Overlay */}
            {showHeartAnimation && (
                <div className="absolute inset-0 grid place-items-center pointer-events-none z-50 animate-bounce-in">
                    <FaHeart className="text-white drop-shadow-2xl text-9xl fill-red-500 opacity-80" />
                </div>
            )}

            {/* Controls Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none z-10 bg-gradient-to-b from-black/20 via-transparent to-black/80">

                {/* Top Bar (Mute Toggle) */}
                <div className="flex justify-end p-4 pointer-events-auto">
                    <button
                        onClick={toggleMute}
                        className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white hover:bg-black/60 transition-all"
                    >
                        {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
                    </button>
                </div>

                {/* Bottom Area */}
                <div className="flex flex-col gap-4 p-4 pb-8 mb-12 sm:mb-0">

                    <div className="flex items-end justify-between">
                        {/* Left Side: Info */}
                        <div className="flex-1 pr-12 flex flex-col gap-3 pointer-events-auto">

                            {/* Partner Badge */}
                            {item.foodPartner && (
                                <Link
                                    to={"/food-partner/" + item.foodPartner}
                                    className="flex items-center gap-2 self-start bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full hover:bg-black/60 transition-colors border border-white/10"
                                >
                                    <span className="text-xl">🍽️</span>
                                    <span className="text-sm font-semibold text-white">Visit Store</span>
                                </Link>
                            )}

                            {/* Description */}
                            <p className="text-white text-base leading-relaxed line-clamp-2 font-medium drop-shadow-md">
                                {item.description}
                            </p>
                        </div>

                        {/* Right Side: Actions */}
                        <div className="flex flex-col items-center gap-6 pointer-events-auto min-w-[50px]">

                            {/* Like */}
                            <div className="flex flex-col items-center gap-1">
                                <button
                                    onClick={handleLike}
                                    className="group relative"
                                >
                                    <div className={`p-3 rounded-full transition-all ${isLiked ? 'text-red-500' : 'text-white'}`}>
                                        {isLiked ? <FaHeart size={32} /> : <FaRegHeart size={32} />}
                                    </div>
                                </button>
                                <span className="text-white text-xs font-bold drop-shadow-md">
                                    {String(item.likeCount ?? item.likesCount ?? item.likes ?? 0)}
                                </span>
                            </div>

                            {/* Comments */}
                            {showComments && (
                                <div className="flex flex-col items-center gap-1">
                                    <button className="p-3 text-white rounded-full hover:bg-white/10 transition-colors">
                                        <FaRegComment size={30} />
                                    </button>
                                    <span className="text-white text-xs font-bold drop-shadow-md">
                                        {String(item.commentsCount ?? 0)}
                                    </span>
                                </div>
                            )}

                            {/* Save */}
                            <div className="flex flex-col items-center gap-1">
                                <button
                                    onClick={() => onSave?.(item)}
                                    className="p-3 text-white rounded-full hover:bg-white/10 transition-colors"
                                >
                                    <FaRegBookmark size={28} />
                                </button>
                                <span className="text-white text-xs font-bold drop-shadow-md">
                                    {String(item.savesCount ?? 0)}
                                </span>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-600/50">
                    <div
                        className="h-full bg-white transition-all duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </section>
    )
}

export default ReelItem
