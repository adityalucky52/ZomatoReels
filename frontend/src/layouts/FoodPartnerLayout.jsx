import React from 'react'
import { Outlet } from 'react-router-dom'
import FoodPartnerSidebar from '../components/foodpartner/FoodPartnerSidebar'

const FoodPartnerLayout = () => {
  return (
    <div className="flex bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      <FoodPartnerSidebar />
      <div className="flex-1 ml-64 min-h-screen overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default FoodPartnerLayout
