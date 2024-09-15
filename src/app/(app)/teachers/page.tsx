// 'use client'


// import img from '@/image/shreyansh.jpg';
// import { useState } from 'react';

// // Sample teacher data with images
// const initialTeachers = [
//   { id: 1, name: 'John Doe', subject: 'Math', image: img.src },
//   { id: 2, name: 'Jane Smith', subject: 'Science', image: img.src },
//   // Add more teachers as needed
// ];

// function Page() {
//   const [teachers, setTeachers] = useState(initialTeachers);
//   const [newTeacher, setNewTeacher] = useState({ name: '', subject: '', image: '' });
//   const [editingTeacher, setEditingTeacher] = useState(null);

//   const handleAddTeacher = () => {
//     if (newTeacher.name && newTeacher.subject && newTeacher.image) {
//       setTeachers([...teachers, { id: Date.now(), ...newTeacher }]);
//       setNewTeacher({ name: '', subject: '', image: '' }); // Clear form
//     }
//   };

//   const handleEditTeacher = (id) => {
//     const teacher = teachers.find(t => t.id === id);
//     setEditingTeacher({ ...teacher });
//   };

//   const handleSaveEdit = () => {
//     if (editingTeacher.name && editingTeacher.subject && editingTeacher.image) {
//       setTeachers(teachers.map(t => (t.id === editingTeacher.id ? editingTeacher : t)));
//       setEditingTeacher(null);
//     }
//   };

//   return (
//     <div className="p-8 min-h-screen bg-gray-100">
//       <h1 className="text-2xl font-bold mb-4">Teacher Portfolio</h1>

//       <div className="mb-8 p-4 bg-white shadow-md rounded">
//         <h2 className="text-xl font-semibold mb-4">Add New Teacher</h2>
//         <input
//           type="text"
//           value={newTeacher.name}
//           onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
//           placeholder="Name"
//           className="border p-2 rounded mb-2 w-full"
//         />
//         <input
//           type="text"
//           value={newTeacher.subject}
//           onChange={(e) => setNewTeacher({ ...newTeacher, subject: e.target.value })}
//           placeholder="Subject"
//           className="border p-2 rounded mb-2 w-full"
//         />
//         <input
//           type="text"
//           value={newTeacher.image}
//           onChange={(e) => setNewTeacher({ ...newTeacher, image: e.target.value })}
//           placeholder="Image URL"
//           className="border p-2 rounded mb-4 w-full"
//         />
//         <button
//           onClick={handleAddTeacher}
//           className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
//         >
//           Add Teacher
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {teachers.map((teacher) => (
//           <div key={teacher.id} className="border p-4 rounded shadow-md bg-white flex items-center">
//             <img
//               src={teacher.image}
//               alt={teacher.name}
//               className="w-24 h-24 object-cover rounded-full mr-4"  // Smaller size with margin
//             />
//             <div>
//               <h3 className="text-xl font-semibold">{teacher.name}</h3>
//               <p className="text-gray-700">Subject: {teacher.subject}</p>
//               <button
//                 onClick={() => handleEditTeacher(teacher.id)}
//                 className="mt-2 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
//               >
//                 Edit
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {editingTeacher && (
//         <div className="fixed top-1/4 left-1/4 w-1/2 bg-white p-4 border rounded shadow-md">
//           <h2 className="text-xl font-semibold mb-4">Edit Teacher</h2>
//           <input
//             type="text"
//             value={editingTeacher.name}
//             onChange={(e) => setEditingTeacher({ ...editingTeacher, name: e.target.value })}
//             placeholder="Name"
//             className="border p-2 rounded mb-2 w-full"
//           />
//           <input
//             type="text"
//             value={editingTeacher.subject}
//             onChange={(e) => setEditingTeacher({ ...editingTeacher, subject: e.target.value })}
//             placeholder="Subject"
//             className="border p-2 rounded mb-2 w-full"
//           />
//           <input
//             type="text"
//             value={editingTeacher.image}
//             onChange={(e) => setEditingTeacher({ ...editingTeacher, image: e.target.value })}
//             placeholder="Image URL"
//             className="border p-2 rounded mb-4 w-full"
//           />
//           <button
//             onClick={handleSaveEdit}
//             className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600"
//           >
//             Save
//           </button>
//           <button
//             onClick={() => setEditingTeacher(null)}
//             className="bg-red-500 text-white p-2 rounded w-full mt-2 hover:bg-red-600"
//           >
//             Cancel
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Page;

'use client'
import img from '@/./image/shreyansh.jpg';
import { useParams } from "next/navigation";
import { useState } from "react";
interface Teacher {
  id: number;
  name: string;
  subject: string;
  image: string;
}
const initialTeachers: Teacher[] = [
  { id: 1, name: 'Shreyansh Gangwar', subject: 'Math', image: img.src },
  { id: 2, name: 'Suresh Kumar', subject: 'Science', image: img.src },
  // Add more teachers as needed
];
function Page() {
  const { role } = useParams();
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [newTeacher, setNewTeacher] = useState<Partial<Teacher>>({});
  const [editingTeacher, setEditingTeacher] = useState<Partial<Teacher> | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleAddTeacher = () => {
    if (newTeacher.name && newTeacher.subject && newTeacher.image) {
      setTeachers([...teachers, { id: Date.now(), ...newTeacher } as Teacher]);
      setNewTeacher({});
      setImagePreview(null);
    }
  };

  const handleEditTeacher = (id: number) => {
    const teacher = teachers.find(t => t.id === id);
    setEditingTeacher(teacher ? { ...teacher } : null);
    setImagePreview(teacher?.image || null);
  };

  const handleSaveEdit = () => {
    if (editingTeacher?.name && editingTeacher?.subject && editingTeacher?.image) {
      setTeachers(teachers.map(t => (t.id === editingTeacher.id ? editingTeacher as Teacher : t)));
      setEditingTeacher(null);
      setImagePreview(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setNewTeacher(prev => ({ ...prev, image: result }));
        if (editingTeacher) {
          setEditingTeacher(prev => ({ ...prev, image: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-2xl text-black font-bold mb-4">Teacher Portfolio</h1>

      {(role === 'teacher') ? (
        <div className="mb-8 p-4 bg-white shadow-md rounded">
          <h2 className="text-xl font-semibold mb-4">Add New Teacher</h2>
          <input
            type="text"
            value={newTeacher.name || ''}
            onChange={(e) => setNewTeacher(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Name"
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="text"
            value={newTeacher.subject || ''}
            onChange={(e) => setNewTeacher(prev => ({ ...prev, subject: e.target.value }))}
            placeholder="Subject"
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded mb-4 w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded mb-4"
            />
          )}
          <button
            onClick={handleAddTeacher}
            className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
          >
            Add Teacher
          </button>
        </div>
      ) : (
        <h1 className='text-black text-bold text-center text-2xl mb-4'>Teachers List</h1>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teachers.map((teacher:Teacher) => (
          <div key={teacher.id} className="border p-4 rounded shadow-md bg-white flex items-center">
            {teacher.image && (
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-24 h-24 object-cover rounded-full mr-4"
              />
            )}
            <div>
              <h3 className="text-xl font-semibold">{teacher.name}</h3>
              <p className="text-gray-700">Subject: {teacher.subject}</p>
              <button
                onClick={() => handleEditTeacher(teacher.id)}
                className="mt-2 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingTeacher && (
        <div className="fixed top-1/4 left-1/4 w-1/2 bg-white p-4 border rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Edit Teacher</h2>
          <input
            type="text"
            value={editingTeacher.name || ''}
            onChange={(e) => setEditingTeacher(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Name"
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="text"
            value={editingTeacher.subject || ''}
            onChange={(e) => setEditingTeacher(prev => ({ ...prev, subject: e.target.value }))}
            placeholder="Subject"
            className="border p-2 rounded mb-2 w-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded mb-4 w-full"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded mb-4"
            />
          )}
          <button
            onClick={handleSaveEdit}
            className="bg-green-500 text-white p-2 rounded w-full hover:bg-green-600"
          >
            Save
          </button>
          <button
            onClick={() => setEditingTeacher(null)}
            className="bg-red-500 text-white p-2 rounded w-full mt-2 hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default Page;
