import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const firstName = e.target.firstName.value;
        const lastName = e.target.lastName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;


        const response = await axios.post("http://localhost:3000/api/auth/user/register", {
            fullname: firstName + " " + lastName,
            email,
            password
        },
        {
            withCredentials: true
        })

        console.log(response.data);

        navigate("/")

    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8" role="region" aria-labelledby="user-register-title">
                <header className="mb-4">
                    <h1 id="user-register-title" className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
                    <p className="text-gray-600">Join to explore and enjoy delicious meals.</p>
                </header>
                <nav className="mb-6 text-sm text-gray-600">
                    <strong className="font-semibold">Switch:</strong> 
                    <Link to="/user/register" className="text-red-600 hover:text-red-700 mx-1">User</Link> • <Link to="/food-partner/register" className="text-red-600 hover:text-red-700 mx-1">Food partner</Link>
                </nav>
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
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors" type="submit">Sign Up</button>
                </form>
                <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account? <Link to="/user/login" className="text-red-600 hover:text-red-700 font-medium">Sign in</Link>
                </div>
            </div>
        </div>
    );
};

export default UserRegister;
