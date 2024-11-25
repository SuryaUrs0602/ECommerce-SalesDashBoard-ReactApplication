import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const EditProfile = () => {

    const id = sessionStorage.getItem('UserId');
    const token = sessionStorage.getItem('Token');
    const [name, setName] = useState(sessionStorage.getItem('UserName'));
    const [email, setEmail] = useState(sessionStorage.getItem('UserEmail'));
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/profile');
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.patch(`https://localhost:7148/api/Users/${id}`, 
            [
                { op: "replace", path: "/UserName", value: name },
                { op: "replace", path: "/UserEmail", value: email }
            ],
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
          
          if (response.status === 200 || response.status === 204) {
            sessionStorage.setItem('UserName', name);
            sessionStorage.setItem('UserEmail', email);

            setSuccess('Profile updated successfully!');
            navigate('/profile');
          }
        } catch (error) {
          if (error.response) {
            console.error('Error updating profile:', error.response.data);
            setError(`Error: ${error.response.status} - ${error.response.data.message || 'Something went wrong'}`);
          } else {
            console.error('Error updating profile:', error);
            setError('Something went wrong. Please try again later.');
          }
        }
      };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          onClick={handleUpdate}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Update
        </button>

        <button
          onClick={handleBack}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300 mt-3"
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default EditProfile
