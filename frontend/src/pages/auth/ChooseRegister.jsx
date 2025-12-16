import React from 'react';
import { Link } from 'react-router-dom';

const ChooseRegister = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8" role="region" aria-labelledby="choose-register-title">
        <header className="mb-6">
          <h1 id="choose-register-title" className="text-3xl font-bold text-gray-900 mb-2">Register</h1>
          <p className="text-gray-600">Pick how you want to join the platform.</p>
        </header>
        <div className="flex flex-col gap-4">
          <Link to="/user/register" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors text-center no-underline">
            Register as normal user
          </Link>
          <Link to="/food-partner/register" className="w-full bg-white hover:bg-gray-50 text-gray-900 font-semibold py-3 rounded-lg border border-gray-300 transition-colors text-center no-underline">
            Register as food partner
          </Link>
        </div>
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account? <Link to="/user/login" className="text-red-600 hover:text-red-700 font-medium">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseRegister;
