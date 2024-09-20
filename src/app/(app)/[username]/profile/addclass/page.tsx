'use client'
import pic1 from '@/image/picsmart.webp';
import { useState } from 'react';
type ClassItem = {
  date: string;
  time: string;
  meetLink: string;
};
function Page() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [meetLink, setMeetLink] = useState('');
  const [classes, setClasses] = useState<ClassItem[]>([]);

  // Handle form submission
  const handleAddClass = () => {
    if (!date || !time || !meetLink) {
      alert('Please fill out all fields!');
      return;
    }

    // Append new class details to the classes array
    setClasses([...classes, { date, time, meetLink }]);
    
    // Reset form fields
    setDate('');
    setTime('');
    setMeetLink('');
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      style={{ backgroundImage: `url(${pic1.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
     

      {/* Add Class Form (Right Side) */}
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-full max-w-md text-black">
        <h1 className="text-2xl font-bold mb-4">Add Class Details</h1>
        
        {/* Date Picker */}
        <div className="mb-4">
          <label htmlFor="date" className="block text-lg font-medium mb-2">Select Date:</label>
          <input 
            type="date" 
            id="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Time Picker */}
        <div className="mb-4">
          <label htmlFor="time" className="block text-lg font-medium mb-2">Select Time:</label>
          <input 
            type="time" 
            id="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Google Meet Link */}
        <div className="mb-4">
          <label htmlFor="meet-link" className="block text-lg font-medium mb-2">Google Meet Link:</label>
          <input 
            type="url" 
            id="meet-link" 
            placeholder="https://meet.google.com/..." 
            value={meetLink} 
            onChange={(e) => setMeetLink(e.target.value)} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleAddClass}
        >
          Add Class
        </button>
      </div>
    </div>
  );
}

export default Page;
