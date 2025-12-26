import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import ChooseRegister from '../pages/auth/ChooseRegister'
import CreateFood from '../pages/food-partner/CreateFood'
import Profile from '../pages/food-partner/Profile'
import Home from '../pages/general/Home'
import Saved from '../pages/general/Saved'
import useAuthStore from '../store/authStore'

const AppRoute = () => {
  const { isAuthenticated, userType } = useAuthStore();

  return (
<Router>

    <Routes>
        
        {/* Guest only routes - redirect to home if authenticated */}
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" replace /> : <ChooseRegister />} />
        <Route path="/user/register" element={isAuthenticated ? <Navigate to="/" replace /> : <UserRegister />} />
        <Route path="/user/login" element={isAuthenticated ? <Navigate to="/" replace /> : <UserLogin />} />
        <Route path="/food-partner/register" element={isAuthenticated ? <Navigate to="/" replace /> : <FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={isAuthenticated ? <Navigate to="/" replace /> : <FoodPartnerLogin />} />
        
        {/* User only routes */}
        <Route path="/" element={isAuthenticated && userType === 'user' ? <Home /> : <Navigate to="/register" replace />} />
        <Route path="/saved" element={isAuthenticated && userType === 'user' ? <Saved /> : <Navigate to="/register" replace />} />
        
        {/* Food partner only routes */}
        <Route path="/create-food" element={isAuthenticated && userType === 'foodpartner' ? <CreateFood /> : <Navigate to="/food-partner/login" replace />} />
        <Route path="/food-partner/:id" element={<Profile />} />
    </Routes>
</Router>  )
}

export default AppRoute