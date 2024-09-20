'use client'
import pic1 from '@/image/science-related-objects-design-J51CJM.jpg'; // Adjust the path as needed
import { useSession } from 'next-auth/react';
import { useState } from 'react';

function HomePage() {
   const { data: session, status } = useSession();

  console.log('Session:', session);
  console.log('Status:', status);
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(prev => !prev);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${pic1.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(70%)',
      }}
    >
      <div className="bg-white text-black bg-opacity-80 p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Our Site!</h1>
        <p className="text-lg mb-4">Explore our content and get to know more about us.</p>
        <button
          onClick={toggleDetails}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </button>
        {showDetails && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">About Us</h2>
            <p className="text-gray-700">
              We are committed to providing high-quality educational resources and content.
              Explore our various subjects and topics tailored to different learning needs.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
