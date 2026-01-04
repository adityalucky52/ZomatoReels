import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/user/Sidebar'

const UserLayout = () => {
  return (
    <div className="flex bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <Sidebar />
      <div className="flex-1 ml-64 min-h-screen overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default UserLayout
