import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../user/Sidebar'
import useReelFeedStore from '../../store/reelFeedStore'

const Reels = () => {
    const navigate = useNavigate()
    const { videos, loading, fetchVideos } = useReelFeedStore()

    useEffect(() => {
        if (videos.length === 0) {
            fetchVideos()
        }
    }, [])

    useEffect(() => {
        // Redirect to first reel when videos are loaded
        if (!loading && videos.length > 0) {
            navigate(`/reels/${videos[0]._id}`, { replace: true })
        }
    }, [videos.length, loading, navigate])

    return (
        <div className="flex h-screen bg-white">
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-orange-500 mb-4"></div>
                    <p className="text-white text-lg">Loading reels...</p>
                </div>
            </div>
        </div>
    )
}

export default Reels
