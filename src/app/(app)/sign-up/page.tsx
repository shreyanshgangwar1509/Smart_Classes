'use client';

import signupBackground from '@/image/picsmart.webp'; // Your signup background image
import { useState } from 'react';

function Page() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (!name || !email || !password || password !== confirmPassword) {
      setErrorMessage('Please fill out all fields correctly.');
    } else {
      setErrorMessage('');
      // Handle signup logic here
      console.log('Signing up with', { name, email, password });
    }
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen bg-cover bg-center" 
      style={{ backgroundImage: `url(${signupBackground.src})` }}
    >
      <div className="w-full max-w-lg p-8 bg-white bg-opacity-80 rounded-lg shadow-lg transition-transform transform hover:scale-105">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Sign Up</h1>
        
        {errorMessage && (
          <div className="bg-red-200 text-red-700 p-2 rounded mb-4">
            {errorMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-lg mb-1" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
            />
          </div>
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
              placeholder="Create a password"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-lg mb-1" htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-transform transform hover:scale-105"
          >
            Sign Up
          </button>
        </form>
        
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Page;
