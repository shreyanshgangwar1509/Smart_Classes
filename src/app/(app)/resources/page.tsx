'use client'
import pic1 from '@/image/science-related-objects-design-J51CJM.jpg';
import { useState } from 'react';

const subjectsData = {
  Math: {
    chapters: ['Algebra', 'Geometry', 'Calculus'],
    blogs: ['Introduction to Algebra', 'Geometry Basics', 'Advanced Calculus'],
    backgroundImage: ''  // No background image
  },
  Science: {
    chapters: ['Physics', 'Chemistry', 'Biology'],
    blogs: ['Physics 101', 'Chemistry Fundamentals', 'Biology Overview'],
    backgroundImage: ''  // Use default background image
  },
  // Add more subjects as needed
};

function Page() {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [newSubject, setNewSubject] = useState('');

  const handleSubjectClick = (subject:any) => {
    setSelectedSubject(subject === selectedSubject ? null : subject);
  };

  const handleAddSubject = () => {
    if (newSubject && !subjectsData[newSubject]) {
      subjectsData[newSubject] = {
        chapters: [],
        blogs: [],
        backgroundImage: ''  // Default background image or leave empty
      };
      setNewSubject(''); // Clear input field
      setSelectedSubject(newSubject); // Select the newly added subject
    }
  };

  return (
    <div 
      className="flex min-h-screen"
      style={{ backgroundImage: `url(${pic1.src})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(70%)' }} // Adjust brightness
    >
      <div className="w-1/4 p-4 bg-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-semibold text-black">Subjects</h2>
        <ul className="space-y-2 ml-4">
          {Object.keys(subjectsData).map(subject => (
            <li
              key={subject}
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() => handleSubjectClick(subject)}
            >
              {subject}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="New Subject"
            className="border rounded p-2 w-full"
          />
          <button
            onClick={handleAddSubject}
            className="mt-2 bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
          >
            Add Subject
          </button>
        </div>
      </div>
      <div className="w-3/4 p-4 bg-white bg-opacity-80" style={{ backgroundImage: selectedSubject ? `url(${subjectsData[selectedSubject].backgroundImage})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {selectedSubject ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">{selectedSubject}</h2>
            <h3 className="text-xl font-semibold mb-2">Chapters</h3>
            <ul className="list-disc list-inside mb-4">
              {subjectsData[selectedSubject].chapters.map(chapter => (
                <li key={chapter}>{chapter}</li>
              ))}
            </ul>
            <h3 className="text-xl font-semibold mb-2">Blogs</h3>
            <ul className="list-disc list-inside">
              {subjectsData[selectedSubject].blogs.map(blog => (
                <li key={blog}>{blog}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center text-gray-600">Select a subject to view details</p>
        )}
      </div>
    </div>
  );
}

export default Page;
