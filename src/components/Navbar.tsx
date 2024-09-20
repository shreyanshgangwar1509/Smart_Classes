'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from './ui/button';


function Navbar() {
  
  
  const { data: session } = useSession();

  const isVerified = session?.user.isVerified; 
  const userRole = session?.user.role; // Assuming you have the role in session data
  console.log("one "+isVerified,userRole);
  
  // State to manage notification dropdown visibility
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications,setNotifications] = useState([
    { id: 1, message: 'New class added to your schedule.' },
    { id: 2, message: 'Assignment submission deadline is tomorrow.' },
    { id: 3, message: 'New alert: Campus closed on Friday.' },
  ]);

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

function handleSignOut() {
  signOut({ callbackUrl: '/' }); // Redirects to homepage after sign-out
}
  const addNotification = (message:string) => {
    const newNotification = {
      id: notifications.length + 1, // Simple ID generation
      message,
    };
    setNotifications((prevNotifications:any) => [...prevNotifications, newNotification]);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 md:p-6 shadow-lg w-full">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-extrabold text-white tracking-wide hover:scale-105 transform transition duration-300">
          SmartC
        </a>

        <div className="flex gap-4 items-center">
          <Link href="/">
            <Button className="bg-white text-indigo-600 px-4 py-2 rounded-full shadow-md hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
              Home
            </Button>
          </Link>

          

          <Link href="/teachers">
            <Button className="bg-white text-indigo-600 px-4 py-2 rounded-full shadow-md hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
              Teachers
            </Button>
          </Link>
          
          <Link href="/classes">
            <Button className="bg-white text-pink-600 px-5 py-2 rounded-full shadow-md hover:bg-pink-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
              Classes
            </Button>
          </Link>

          {(userRole === 'teacher' || userRole === 'student') && (
            <>
              <Link href="/resources">
                <Button className="bg-white text-pink-600 px-5 py-2 rounded-full shadow-md hover:bg-pink-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
                  Resources
                </Button>
              </Link>
            </>
          )}

          {isVerified ? (
            <Link href="/">
              <Button onClick={ handleSignOut} className="bg-white text-pink-600 px-5 py-2 rounded-full shadow-md hover:bg-pink-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
                Logout
              </Button>
            </Link>
          ) : (
            <Link href="/sign-in">
              <Button className="bg-white text-pink-600 px-5 py-2 rounded-full shadow-md hover:bg-pink-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
                Login
              </Button>
            </Link>
          )}
          {/* Notification Button */}
          <div className="relative">
            <Button onClick={toggleNotifications} className="bg-white text-indigo-600 px-4 py-2 rounded-full shadow-md hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
              X
            </Button>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div className=" text-black absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div key={notification.id} className="p-2 border-b border-gray-200">
                      {notification.message}
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-center">No notifications</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
    </nav>
  );
}

export default Navbar;
