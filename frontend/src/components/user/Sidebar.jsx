import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logout from '../Logout'

const Sidebar = () => {
  const location = useLocation()

  return (
    <div className="w-64 h-screen fixed left-0 top-0 border-r-2 border-gray-900 p-6 flex flex-col gap-4 bg-white">
      {/* Logo */}
      <div className="bg-white rounded-xl p-4 border-2 border-gray-900 mb-4">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          zomato reels
        </h1>
      </div>

      {/* Navigation Buttons */}
      <Link
        to="/"
        className={`w-full text-left py-3 px-4 rounded-xl border-2 border-gray-900 font-medium transition-all ${location.pathname === '/' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 hover:bg-gray-50'
          }`}
      >
        Home
      </Link>

      <Link
        to="/reels"
        className={`w-full text-left py-3 px-4 rounded-xl border-2 border-gray-900 font-medium transition-all ${location.pathname === '/reels' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 hover:bg-gray-50'
          }`}
      >
        reels
      </Link>

      {/* Logout Button */}
      <div className="mt-auto">
        <Logout />
      </div>
    </div>
  )
}

export default Sidebar
