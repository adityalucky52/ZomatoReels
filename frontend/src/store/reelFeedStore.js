import { create } from 'zustand'
import axios from 'axios'

const useReelFeedStore = create((set, get) => ({
  videos: [],
  loading: false,
  error: null,

  // Fetch videos from the API
  fetchVideos: async () => {
    set({ loading: true, error: null })
    try {
      const response = await axios.get("http://localhost:3000/api/food", { 
        withCredentials: true 
      })
      console.log(response.data)
      set({ videos: response.data.foodItems, loading: false })
    } catch (error) {
      console.error('Error fetching videos:', error)
      set({ error: error.message, loading: false })
    }
  },

  // Like or unlike a video
  likeVideo: async (item) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/like", 
        { foodId: item._id }, 
        { withCredentials: true }
      )

      if (response.data.like) {
        console.log("Video liked")
        set((state) => ({
          videos: state.videos.map((v) =>
            v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v
          )
        }))
      } else {
        console.log("Video unliked")
        set((state) => ({
          videos: state.videos.map((v) =>
            v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v
          )
        }))
      }
    } catch (error) {
      console.error('Error liking video:', error)
    }
  },

  // Save or unsave a video
  saveVideo: async (item) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/food/save", 
        { foodId: item._id }, 
        { withCredentials: true }
      )

      if (response.data.save) {
        set((state) => ({
          videos: state.videos.map((v) =>
            v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v
          )
        }))
      } else {
        set((state) => ({
          videos: state.videos.map((v) =>
            v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v
          )
        }))
      }
    } catch (error) {
      console.error('Error saving video:', error)
    }
  },

  // Clear videos
  clearVideos: () => set({ videos: [], error: null }),

  // Reset store
  reset: () => set({ videos: [], loading: false, error: null })
}))

export default useReelFeedStore
