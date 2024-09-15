'use client'
import pic1 from '@/image/science-related-objects-design-J51CJM.jpg';
import { useState } from 'react';

const subjectsData = {
  "classes": [
    {
      "class": "1",
      "subjects": [
        {
          "title": "Mathematics",
          "topics": [
            "Numbers and Counting",
            "Addition and Subtraction",
            "Shapes and Patterns",
            "Time and Measurement"
          ]
        },
        {
          "title": "English",
          "topics": [
            "Alphabet Recognition",
            "Simple Words and Sentences",
            "Rhymes and Poems",
            "Basic Grammar"
          ]
        },
        {
          "title": "Science",
          "topics": [
            "Living and Non-Living Things",
            "Animals and Plants",
            "The Five Senses",
            "Weather and Seasons"
          ]
        }
      ]
    },
    // Other classes...
  ]
}

function Page() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [newSubjectTitle, setNewSubjectTitle] = useState<string>('');
  const [newSubjectTopics, setNewSubjectTopics] = useState<string>('');

  const handleClassClick = (classId:any) => {
    setSelectedClass(classId === selectedClass ? null : classId);
    setSelectedSubject(null); // Reset selected subject when changing class
  };

  const handleSubjectClick = (subjectTitle:any) => {
    setSelectedSubject(subjectTitle === selectedSubject ? null : subjectTitle);
  };

  const handleAddSubject = () => {
    if (newSubjectTitle && selectedClass) {
      const updatedSubjectsData = { ...subjectsData };
      const classIndex = updatedSubjectsData.classes.findIndex(cls => cls.class === selectedClass);

      if (classIndex !== -1) {
        updatedSubjectsData.classes[classIndex].subjects.push({
          title: newSubjectTitle,
          topics: newSubjectTopics.split(',').map(topic => topic.trim())
        });
        setNewSubjectTitle(''); // Clear input field
        setNewSubjectTopics(''); // Clear input field
        setSelectedSubject(newSubjectTitle); // Select the newly added subject
        // Optionally, save updatedSubjectsData to a backend or local storage
      }
    }
  };

  return (
    <div 
      className="flex min-h-screen"
      style={{ backgroundImage: `url(${pic1.src})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(70%)' }} // Adjust brightness
    >
      <div className="w-1/4 p-4 bg-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-semibold text-black">Classes</h2>
        <ul className="space-y-2 ml-4">
          {subjectsData.classes.map(cls => (
            <li
              key={cls.class}
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() => handleClassClick(cls.class)}
            >
              Class {cls.class}
            </li>
          ))}
        </ul>
        {selectedClass && (
          <>
            <h2 className="text-xl font-semibold mt-4 text-semibold text-black">Subjects</h2>
            <ul className="space-y-2 ml-4">
              {subjectsData.classes.find(cls => cls.class === selectedClass)?.subjects.map(subject => (
                <li
                  key={subject.title}
                  className="cursor-pointer text-blue-600 hover:underline"
                  onClick={() => handleSubjectClick(subject.title)}
                >
                  {subject.title}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <input
                type="text"
                value={newSubjectTitle}
                onChange={(e) => setNewSubjectTitle(e.target.value)}
                placeholder="New Subject Title"
                className="border rounded p-2 w-full mb-2"
              />
              <textarea
                value={newSubjectTopics}
                onChange={(e) => setNewSubjectTopics(e.target.value)}
                placeholder="New Subject Topics (comma-separated)"
                className="border rounded p-2 w-full mb-2"
              />
              <button
                onClick={handleAddSubject}
                className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
              >
                Add Subject
              </button>
            </div>
          </>
        )}
      </div>
      <div className="w-3/4 p-4 bg-white bg-opacity-80">
        {selectedSubject ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">{selectedSubject}</h2>
            <h3 className="text-xl font-semibold mb-2">Topics</h3>
            <ul className="list-disc list-inside">
              {subjectsData.classes.find(cls => cls.class === selectedClass)
                ?.subjects.find(subj => subj.title === selectedSubject)
                ?.topics.map(topic => (
                  <li key={topic}>{topic}</li>
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
