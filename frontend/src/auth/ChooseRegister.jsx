import React from 'react';
import { Link } from 'react-router-dom';

const ChooseRegister = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-red-100">
        {/* Register Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">Register</h2>
          <div className="flex flex-col gap-4">
            <Link 
              to="/user/register" 
              className="w-full bg-gradient-to-r from-red-50 to-orange-50 hover:from-red-100 hover:to-orange-100 text-red-700 font-semibold py-4 px-6 rounded-full border-2 border-red-500 transition-all text-center no-underline hover:shadow-lg"
            >
              Register as User
            </Link>
            <Link 
              to="/food-partner/register" 
              className="w-full bg-gradient-to-r from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100 text-orange-700 font-semibold py-4 px-6 rounded-full border-2 border-orange-500 transition-all text-center no-underline hover:shadow-lg"
            >
              Register as Food Partner
            </Link>
          </div>
        </div>

        {/* Login Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">Login</h2>
          <div className="flex flex-col gap-4">
            <Link 
              to="/user/login" 
              className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-full transition-all text-center no-underline shadow-md hover:shadow-xl transform hover:scale-[1.02]"
            >
              Login as User
            </Link>
            <Link 
              to="/food-partner/login" 
              className="w-full bg-gradient-to-r from-orange-600 to-red-500 hover:from-orange-700 hover:to-red-600 text-white font-semibold py-4 px-6 rounded-full transition-all text-center no-underline shadow-md hover:shadow-xl transform hover:scale-[1.02]"
            >
              Login as Food Partner
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseRegister;
