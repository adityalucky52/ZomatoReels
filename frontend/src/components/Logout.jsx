import React from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'

const Logout = () => {
  const navigate = useNavigate()
  const { logout, isLoading } = useAuthStore()

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      navigate('/register')
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="w-full text-left py-3 px-4 rounded-xl border-2 border-gray-900 font-medium transition-all bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  )
}

export default Logout
