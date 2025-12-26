import React, { useEffect, useState } from 'react'
import ReelFeed from '../../components/ReelFeed'
import Sidebar from '../../components/Sidebar'
import UserProfile from '../../components/UserProfile'
import useReelFeedStore from '../../store/reelFeedStore'

const Home = () => {
    const [showReels, setShowReels] = useState(false)
    const { videos, fetchVideos, likeVideo, saveVideo } = useReelFeedStore()

    useEffect(() => {
        if (showReels) {
            fetchVideos()
        }
    }, [showReels, fetchVideos])

    // OLD CODE - Using local state
    // const [ videos, setVideos ] = useState([])
    // // Autoplay behavior is handled inside ReelFeed

    // useEffect(() => {
    //     axios.get("http://localhost:3000/api/food", { withCredentials: true })
    //         .then(response => {

    //             console.log(response.data);

    //             setVideos(response.data.foodItems)
    //         })
    //         .catch(() => { /* noop: optionally handle error */ })
    // }, [])

    // // Using local refs within ReelFeed; keeping map here for dependency parity if needed

    // async function likeVideo(item) {

    //     const response = await axios.post("http://localhost:3000/api/food/like", { foodId: item._id }, {withCredentials: true})

    //     if(response.data.like){
    //         console.log("Video liked");
    //         setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
    //     }else{
    //         console.log("Video unliked");
    //         setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v))
    //     }
        
    // }

    // async function saveVideo(item) {
    //     const response = await axios.post("http://localhost:3000/api/food/save", { foodId: item._id }, { withCredentials: true })
        
    //     if(response.data.save){
    //         setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v))
    //     }else{
    //         setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v))
    //     }
    // }

    return (
        <div className="flex h-screen bg-white">
            <Sidebar showReels={showReels} setShowReels={setShowReels} />

            {/* Main Content Area */}
            <div className="flex-1 overflow-hidden">
                {showReels ? (
                    <ReelFeed
                        items={videos}
                        onLike={likeVideo}
                        onSave={saveVideo}
                        emptyMessage="No videos available."
                    />
                ) : (
                    <UserProfile setShowReels={setShowReels} />
                )}
            </div>
        </div>
    )
}

export default Home