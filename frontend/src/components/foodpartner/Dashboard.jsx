import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import useAuthStore from '../../store/authStore'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMeals: 0,
    totalLikes: 0,
    totalViews: 0,
    recentVideos: []
  })
  const { user } = useAuthStore()

  useEffect(() => {
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/food-partner/dashboard', {
          withCredentials: true
        })
        setStats(response.data)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      }
    }

    fetchDashboardData()
  }, [])

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-2">
          Welcome back!
        </h1>
        <p className="text-gray-700 text-lg">Here's what's happening with your food reels</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 font-medium">Total Meals</h3>
            <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p className="text-4xl font-bold text-gray-900">{stats.totalMeals}</p>
          <p className="text-sm text-gray-500 mt-1">Food items created</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-red-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 font-medium">Total Likes</h3>
            <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <p className="text-4xl font-bold text-gray-900">{stats.totalLikes}</p>
          <p className="text-sm text-gray-500 mt-1">Likes received</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-pink-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-gray-600 font-medium">Total Views</h3>
            <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <p className="text-4xl font-bold text-gray-900">{stats.totalViews}</p>
          <p className="text-sm text-gray-500 mt-1">Total views</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex gap-4">
          <Link 
            to="/create-food"
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-xl font-medium hover:from-orange-600 hover:to-red-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Create New Food Reel
          </Link>
          <Link 
            to={`/food-partner/${user?._id}`}
            className="flex-1 bg-white border-2 border-gray-900 text-gray-900 py-4 px-6 rounded-xl font-medium hover:bg-gray-50 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            View Profile
          </Link>
        </div>
      </div>

      {/* Recent Videos */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Food Reels</h2>
        {stats.recentVideos && stats.recentVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.recentVideos.map((video) => (
              <div key={video.id} className="relative aspect-[9/16] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer border border-gray-200">
                <video
                  className="w-full h-full object-cover"
                  src={video.video}
                  muted
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-semibold">{video.name}</h3>
                  <div className="flex items-center gap-4 mt-2 text-white text-sm">
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      {video.likes || 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500 mb-4">No food reels yet</p>
            <Link 
              to="/create-food"
              className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-6 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all"
            >
              Create Your First Reel
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
