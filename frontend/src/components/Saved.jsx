import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import ReelItem from './reels/ReelItem'
import Sidebar from './user/Sidebar'

const Saved = () => {
    const [videos, setVideos] = useState([])
    const [activeReelId, setActiveReelId] = useState(null)
    const observerRef = useRef(null)

    useEffect(() => {
        axios.get("http://localhost:3000/api/food/save", { withCredentials: true })
            .then(response => {
                const savedFoods = response.data.savedFoods.map((item) => ({
                    _id: item.food._id,
                    video: item.food.video,
                    description: item.food.description,
                    likeCount: item.food.likeCount,
                    savesCount: item.food.savesCount,
                    commentsCount: item.food.commentsCount,
                    foodPartner: item.food.foodPartner,
                }))
                setVideos(savedFoods)
            })
    }, [])

    useEffect(() => {
        const options = { threshold: 0.6 }
        const handleIntersection = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const reelId = entry.target.dataset.reelId
                    setActiveReelId(reelId)
                }
            })
        }

        observerRef.current = new IntersectionObserver(handleIntersection, options)
        const elements = document.querySelectorAll('[data-reel-id]')
        elements.forEach(el => observerRef.current.observe(el))

        return () => {
            if (observerRef.current) observerRef.current.disconnect()
        }
    }, [videos])

    const removeSaved = async (item) => {
        try {
            await axios.post("http://localhost:3000/api/food/save", { foodId: item._id }, { withCredentials: true })
            setVideos((prev) => prev.filter((v) => v._id !== item._id))
        } catch {
            // noop
        }
    }

    // Override onSave to remove from list instead of just toggling
    // Note: ReelItem might toggle visually, but here we might want to just remove it or update state
    // If we want to keep the same UI behavior (toggle saved state), we pass same handler
    // BUT usually on "Saved" page, clicking save button (bookmark filled) removes it.

    return (
        <div className="flex h-screen bg-white">
            <Sidebar />
            <div className="flex-1 overflow-hidden">
                <div className="h-screen bg-gray-900 overflow-hidden flex items-center justify-center">
                    <div
                        className="relative h-full w-full max-w-[480px] overflow-y-auto snap-y snap-mandatory scroll-smooth bg-black no-scrollbar"
                        role="list"
                    >
                        {videos.length === 0 && (
                            <div className="absolute inset-0 grid place-items-center text-white">
                                <p>No saved videos yet.</p>
                            </div>
                        )}

                        {videos.map((item) => (
                            <div key={item._id} data-reel-id={item._id} className="snap-start h-screen w-full">
                                <ReelItem
                                    item={item}
                                    isActive={activeReelId === item._id}
                                    onSave={() => removeSaved(item)}
                                // Make sure to pass other necessary props if ReelItem expects them for display
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Saved
