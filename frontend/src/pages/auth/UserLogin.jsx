import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const UserLogin = () => {

  const navigate = useNavigate();
  const { loginUser, isLoading, error, clearError } = useAuthStore();
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setLocalError('');

    const email = e.target.email.value;
    const password = e.target.password.value;

    // Basic validation
    if (!email || !password) {
      setLocalError('Please fill in all fields');
      return;
    }

    const result = await loginUser(email, password);

    if (result.success) {
      navigate("/"); // Redirect to home after login
    } else {
      setLocalError(result.error || 'Login failed. Please try again.');
    }

    // OLD IMPLEMENTATION (without auth store)
    // const response = await axios.post("http://localhost:3000/api/auth/user/login", {
    //   email,
    //   password
    // }, { withCredentials: true });
    // console.log(response.data);
    // navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-red-100" role="region" aria-labelledby="user-login-title">
        <header className="mb-6">
          <h1 id="user-login-title" className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-2">Welcome back</h1>
          <p className="text-gray-700">Sign in to continue your food journey.</p>
        </header>
        
        {(localError || error) && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{localError || error}</p>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition" />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" name="password" type="password" placeholder="••••••••" autoComplete="current-password" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition" />
          </div>
          <button 
            className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          New here? <a href="/user/register" className="text-red-600 hover:text-red-700 font-medium">Create account</a>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
