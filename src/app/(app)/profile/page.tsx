'use client';

import Attendance from '@/components/ui/attendence';
import pic1 from '@/image/picsmart2.webp'; // Import the default profile picture if needed
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css'; // Import the CSS for the calendar

function Page() {
  const { data: session, status } = useSession(); // Get session data
  const router = useRouter();

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    profilePicture: pic1.src, // Default profile picture
    role: '',
    isVerified: false,
  });

  useEffect(() => {
    if (session) {
      // Populate user details from the session
      setProfile({
        name: session.user.name || '',
        email: session.user.email || '',
        profilePicture: session.user.image || pic1.src, // Use session image or fallback to default
        role: session.user.role || '',
        isVerified: session.user.isVerified || false,
      });
    } 
    // else if (status === 'unauthenticated') {
    //   router.push('/sign-in'); // Redirect to sign-in if the user is not authenticated
    // }
  }, [session, status, router]);

  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState({ ...profile });
  const [activeTab, setActiveTab] = useState('profile');

  const handleProfileChange = (e:any) => {
    const { name, value } = e.target;
    setEditProfile({ ...editProfile, [name]: value });
  };

  const handleSave = () => {
    setProfile(editProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditProfile({ ...profile });
    setIsEditing(false);
  };

  const handleTabClick = (tab:any) => {
    setActiveTab(tab);
  };

  if (status === 'loading') {
    return <p>Loading...</p>; // Show a loading message while fetching the session
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/4 p-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
        <h2 className="text-2xl text-black font-bold mb-6">Menu</h2>
        <ul className="space-y-4">
          {['profile', 'attendance', 'syllabus', 'classes'].map((tab) => (
            <li
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`cursor-pointer text-lg font-semibold text-black transition-transform transform hover:scale-105 ${
                activeTab === tab ? 'text-yellow-200' : ''
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-8">
        {activeTab === 'profile' && (
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h1 className="text-3xl text-black font-bold mb-4">Profile</h1>

            <div className="flex items-center mb-8">
              <Image
                src={profile.profilePicture}
                alt="Profile Picture"
                className="w-32 h-32 object-cover rounded-full border-4 border-indigo-600 shadow-md transition-transform transform hover:scale-110"
                width={128}
                height={128}
              />
              <div className="ml-6 text-black">
                <h2 className="text-2xl text-black font-semibold mb-2">{profile.name}</h2>
                <p className="text-gray-700 text-black text-lg">{profile.email}</p>
                <p className="text-gray-700  text-blacktext-lg">{profile.role}</p>
                <p>Verified: {profile.isVerified ? 'Yes' : 'No'}</p>
              </div>
            </div>

            {isEditing ? (
              <div>
                <div className="mb-4 text-black">
                  <label className="block text-gray-700 text-lg">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editProfile.name}
                    onChange={handleProfileChange}
                    placeholder="Name"
                    className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
                  />
                </div>
                <div className="mb-4 text-black">
                  <label className="block text-gray-700 text-lg">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editProfile.email || ''}
                    onChange={handleProfileChange}
                    placeholder="Email"
                    className="border border-gray-300 p-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-black p-2 rounded-lg mr-2 transition-transform transform hover:scale-105"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 text-black p-2 rounded-lg transition-transform transform hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 text-black p-2 rounded-lg hover:bg-yellow-600 transition-transform transform hover:scale-105"
              >
                Edit Profile
              </button>
            )}
          </div>
        )}

        {activeTab === 'attendance' && <Attendance />}

        {activeTab === 'classes' && (
          <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-2xl text-black font-bold mb-4">Classes</h2>
            <p className="text-black mb-4">Details about the classes will go here.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default Page;
