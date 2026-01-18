import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import UserRegister from "../auth/UserRegister";
import UserLogin from "../auth/UserLogin";
import FoodPartnerRegister from "../auth/FoodPartnerRegister";
import FoodPartnerLogin from "../auth/FoodPartnerLogin";
import ChooseRegister from "../auth/ChooseRegister";
import CreateFood from "../components/foodpartner/CreateFood";
import Profile from "../components/foodpartner/Profile";
import Dashboard from "../components/foodpartner/Dashboard";
import Home from "../components/user/Home";
import Saved from "../components/Saved";
import SingleReel from "../components/reels/SingleReel";
import FoodPartnerLayout from "../layouts/FoodPartnerLayout";
import UserLayout from "../layouts/UserLayout";
import ProtectedRoute from "./ProtectedRoute";

const AppRoute = () => {
  return (
    <Router>
      <Routes>
        {/* Guest only routes */}
        <Route path="/choose" element={<ProtectedRoute element={<ChooseRegister />} guestOnly />} />
        <Route path="/user/register" element={<ProtectedRoute element={<UserRegister />} guestOnly />} />
        <Route path="/user/login" element={<ProtectedRoute element={<UserLogin />} guestOnly />} />
        <Route path="/food-partner/register" element={<ProtectedRoute element={<FoodPartnerRegister />} guestOnly />} />
        <Route path="/food-partner/login" element={<ProtectedRoute element={<FoodPartnerLogin />} guestOnly />} />

        {/* User only routes with layout */}
        <Route element={<ProtectedRoute element={<UserLayout />} allowedType="user" />}>
          <Route path="/" element={<Home />} />
          <Route path="/reels" element={<SingleReel />} />
          <Route path="/reels/:reelId" element={<SingleReel />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/food-partner/:id" element={<Profile />} />
        </Route>

        {/* Food partner only routes with layout */}
        <Route element={<ProtectedRoute element={<FoodPartnerLayout />} allowedType="foodpartner" redirectTo="/food-partner/login" />}>
          <Route path="/food-partner/dashboard" element={<Dashboard />} />
          <Route path="/create-food" element={<CreateFood />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoute;
