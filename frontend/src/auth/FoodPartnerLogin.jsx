import React, { useState } from 'react';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const FoodPartnerLogin = () => {
  const navigate = useNavigate();
  const { loginFoodPartner, isLoading, error, clearError } = useAuthStore();
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setFormError('');

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!email || !password) {
      setFormError('All fields are required');
      return;
    }

    // New implementation using authStore
    const result = await loginFoodPartner(email, password);

    if (result.success) {
      navigate("/create-food");
    } else {
      setFormError(result.error);
    }

    // Old implementation - direct axios call
    // const response = await axios.post("http://localhost:3000/api/auth/foodpartner/login", {
    //   email,
    //   password
    // }, { withCredentials: true });
    // console.log(response.data);
    // navigate("/create-food");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-orange-100" role="region" aria-labelledby="partner-login-title">
        <header className="mb-6">
          <h1 id="partner-login-title" className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-2">Partner login</h1>
          <p className="text-gray-700">Access your dashboard and manage orders.</p>
        </header>
        {(error || formError) && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error || formError}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input id="email" name="email" type="email" placeholder="business@example.com" autoComplete="email" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition" />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" name="password" type="password" placeholder="Password" autoComplete="current-password" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition" />
          </div>
          <button 
            className="w-full bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          New partner? <a href="/food-partner/register" className="text-red-600 hover:text-red-700 font-medium">Create an account</a>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
