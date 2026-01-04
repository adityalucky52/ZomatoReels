import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const UserRegister = () => {
    const navigate = useNavigate();
    const { registerUser, isLoading, error, clearError } = useAuthStore();
    const [formError, setFormError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        clearError();
        setFormError('');

        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (!firstName || !lastName || !email || !password) {
            setFormError('All fields are required');
            return;
        }

        // New implementation using authStore
        const result = await registerUser({
            fullname: firstName + " " + lastName,
            email,
            password
        });

        if (result.success) {
            navigate("/");
        } else {
            setFormError(result.error);
        }

        // Old implementation - direct axios call
        // const response = await axios.post("http://localhost:3000/api/auth/user/register", {
        //     fullname: firstName + " " + lastName,
        //     email,
        //     password
        // },
        // {
        //     withCredentials: true
        // })
        // console.log(response.data);
        // navigate("/")
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-red-100" role="region" aria-labelledby="user-register-title">
                <header className="mb-4">
                    <h1 id="user-register-title" className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-2">Create your account</h1>
                    <p className="text-gray-700">Join to explore and enjoy delicious meals.</p>
                </header>
                {(error || formError) && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {error || formError}
                    </div>
                )}
                <div className="mb-6">
                    <Link to="/register" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-lg transition-all">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7"/>
                        </svg>
                        Switch Account Type
                    </Link>
                </div>
                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                            <input id="firstName" name="firstName" placeholder="Jane" autoComplete="given-name" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition" />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input id="lastName" name="lastName" placeholder="Doe" autoComplete="family-name" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input id="password" name="password" type="password" placeholder="••••••••" autoComplete="new-password" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition" />
                    </div>
                    <button 
                        className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account? <Link to="/user/login" className="text-red-600 hover:text-red-700 font-medium">Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default UserRegister;
