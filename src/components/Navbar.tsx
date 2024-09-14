'use client';

import Link from 'next/link';
import { Button } from './ui/button';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 md:p-6 shadow-lg w-full">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-2xl font-extrabold text-white tracking-wide hover:scale-105 transform transition duration-300">
          SmartC
        </a>

        <div className="flex gap-4">
          <Link href="/">
            <Button className="bg-white text-indigo-600 px-4 py-2 rounded-full shadow-md hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
              Home
            </Button>
          </Link>
          <Link href="/resources">
            <Button className="bg-white text-indigo-600 px-4 py-2 rounded-full shadow-md hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
              Resources
            </Button>
          </Link>
          <Link href="/classes">
            <Button className="bg-white text-indigo-600 px-4 py-2 rounded-full shadow-md hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
              Classes
            </Button>
          </Link>
          <Link href="/teachers">
            <Button className="bg-white text-indigo-600 px-4 py-2 rounded-full shadow-md hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
              Teachers
            </Button>
          </Link>
          <Link href="/profile">
            <Button className="bg-white text-indigo-600 px-4 py-2 rounded-full shadow-md hover:bg-indigo-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
              Profile
            </Button>
          </Link>
          <Link href="/sign-in">
            <Button className="bg-white text-pink-600 px-5 py-2 rounded-full shadow-md hover:bg-pink-600 hover:text-white transition duration-300 ease-in-out transform hover:scale-105">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
