import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FoodPartnerRegister = () => {

  const navigate = useNavigate();
  const [error, setError] = React.useState('');
  
  const handleSubmit = async (e) => { 
    e.preventDefault();
    setError('');

    const businessName = e.target.businessName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    try {
      const response = await axios.post("http://localhost:3000/api/auth/foodpartner/register", {
        name:businessName,
        contactName,
        phone,
        email,
        password,
        address
      }, { withCredentials: true });
      
      console.log(response.data);
      // navigate("/create-food"); // Redirect to create food page after successful registration
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'There was an error registering!';
      setError(errorMessage);
      console.error("There was an error registering!", error);
      console.error("Error details:", error.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8" role="region" aria-labelledby="partner-register-title">
        <header className="mb-4">
          <h1 id="partner-register-title" className="text-3xl font-bold text-gray-900 mb-2">Partner sign up</h1>
          <p className="text-gray-600">Grow your business with our platform.</p>
        </header>
        <nav className="mb-6 text-sm text-gray-600">
          <strong className="font-semibold">Switch:</strong> 
          <Link to="/user/register" className="text-red-600 hover:text-red-700 mx-1">User</Link> • <Link to="/food-partner/register" className="text-red-600 hover:text-red-700 mx-1">Food partner</Link>
        </nav>
        {error && (
          <div className="p-3 mb-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">Business Name</label>
            <input id="businessName" name="businessName" placeholder="Tasty Bites" autoComplete="organization" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">Contact Name</label>
              <input id="contactName" name="contactName" placeholder="Jane Doe" autoComplete="name" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition" />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input id="phone" name="phone" placeholder="+1 555 123 4567" autoComplete="tel" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input id="email" name="email" type="email" placeholder="business@example.com" autoComplete="email" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition" />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" name="password" type="password" placeholder="Create password" autoComplete="new-password" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition" />
          </div>
          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input id="address" name="address" placeholder="123 Market Street" autoComplete="street-address" className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition" />
            <p className="text-xs text-gray-500">Full address helps customers find you faster.</p>
          </div>
          <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors" type="submit">Create Partner Account</button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          Already a partner? <Link to="/food-partner/login" className="text-red-600 hover:text-red-700 font-medium">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
