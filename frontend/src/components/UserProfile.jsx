import React from 'react'
import useAuthStore from '../store/authStore'

const UserProfile = ({ setShowReels }) => {
  const { user } = useAuthStore()

  return (
    <div className="h-full flex items-center justify-center bg-gradient-to-br from-pink-50 via-red-50 to-orange-50 p-8">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl border-2 border-gray-900 p-12">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white text-5xl font-bold mb-4 border-4 border-gray-900 shadow-lg">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {user?.name || 'User Name'}
          </h2>
          <p className="text-gray-600 text-lg">
            {user?.email || 'user@example.com'}
          </p>
        </div>

        {/* Profile Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-6 border-2 border-gray-900 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
            <div className="text-sm text-gray-600 font-medium">Liked</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border-2 border-gray-900 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
            <div className="text-sm text-gray-600 font-medium">Saved</div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border-2 border-gray-900 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
            <div className="text-sm text-gray-600 font-medium">Watched</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
          <button 
            onClick={() => setShowReels(true)}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-2xl border-2 border-gray-900 shadow-lg hover:shadow-xl transition-all"
          >
            🍽️ Discover Food Reels
          </button>
          <button 
            className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-4 px-6 rounded-2xl border-2 border-gray-900 shadow-md hover:shadow-lg transition-all"
          >
            📝 Edit Profile
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
