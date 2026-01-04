import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logout from '../Logout'
import useAuthStore from '../../store/authStore'

const FoodPartnerSidebar = () => {
  const location = useLocation()
  const { user } = useAuthStore()
  
  return (
    <div className="w-64 h-screen fixed left-0 top-0 border-r-2 border-gray-900 p-6 flex flex-col gap-4 bg-white">
      {/* Logo */}
      <div className="bg-gradient-to-br from-orange-100 to-red-100 rounded-xl p-4 border-2 border-gray-900 mb-4">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          zomato reels
        </h1>
        <p className="text-xs text-gray-700 mt-1">Partner Dashboard</p>
      </div>

      {/* Navigation Buttons */}
      <Link 
        to="/food-partner/dashboard"
        className={`w-full text-left py-3 px-4 rounded-xl border-2 border-gray-900 font-medium transition-all flex items-center gap-3 ${
          location.pathname === '/food-partner/dashboard' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 hover:bg-gray-50'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Home
      </Link>

      <Link 
        to="/create-food"
        className={`w-full text-left py-3 px-4 rounded-xl border-2 border-gray-900 font-medium transition-all flex items-center gap-3 ${
          location.pathname === '/create-food' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 hover:bg-gray-50'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
        Create Food
      </Link>

      <Link 
        to={`/food-partner/${user?._id}`}
        className={`w-full text-left py-3 px-4 rounded-xl border-2 border-gray-900 font-medium transition-all flex items-center gap-3 ${
          location.pathname === `/food-partner/${user?._id}` ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 hover:bg-gray-50'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        Profile
      </Link>

      {/* Logout Button */}
      <div className="mt-auto">
        <Logout />
      </div>
    </div>
  )
}

export default FoodPartnerSidebar
