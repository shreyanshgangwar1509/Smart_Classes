'use client'

import loginBackground from '@/image/pic1.webp'; // Your login background image
import { useState } from 'react';

function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Simulate form submission
    if (!email || !password) {
      setErrorMessage('Both fields are required.');
    } else {
      setErrorMessage('');
      // Handle login logic here
      console.log('Logging in with', { email, password });
    }
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: `url(${loginBackground.src})` }}
    >
      <div className="w-full max-w-sm p-8 bg-white bg-opacity-80 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>
        
        {errorMessage && (
          <div className="bg-red-200 text-red-700 p-2 rounded mb-4">
            {errorMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-lg mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-lg mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
          >
            Login
          </button>
        </form>
        
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <a href="/sign-up" className="text-blue-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Page;
