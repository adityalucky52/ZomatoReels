import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import ChooseRegister from '../pages/auth/ChooseRegister'
import CreateFood from '../pages/food-partner/CreateFood'

const AppRoute = () => {
  return (
<Router>

    <Routes>
        
        <Route path="/register" element={<ChooseRegister />} />

        <Route path="/user/register" element={<UserRegister/>} />
        <Route path="/user/login" element={<UserLogin/>} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister/>} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin/>} />
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/create-food" element={<CreateFood/>} />
    </Routes>
</Router>  )
}

export default AppRoute