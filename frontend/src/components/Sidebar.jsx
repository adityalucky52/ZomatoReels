import React from 'react'

const Sidebar = ({ showReels, setShowReels }) => {
  return (
    <div className="w-64 border-r-2 border-gray-900 p-6 flex flex-col gap-4">
      {/* Logo */}
      <div className="bg-white rounded-xl p-4 border-2 border-gray-900 mb-4">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight">
          zomato reels
        </h1>
      </div>

      {/* Navigation Buttons */}
      <button 
        onClick={() => setShowReels(false)}
        className={`w-full text-left py-3 px-4 rounded-xl border-2 border-gray-900 font-medium transition-all ${
          !showReels ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 hover:bg-gray-50'
        }`}
      >
        Home
      </button>

      <button 
        onClick={() => setShowReels(true)}
        className={`w-full text-left py-3 px-4 rounded-xl border-2 border-gray-900 font-medium transition-all ${
          showReels ? 'bg-gray-900 text-white' : 'bg-white text-gray-900 hover:bg-gray-50'
        }`}
      >
        reels
      </button>
    </div>
  )
}

export default Sidebar
