import React from 'react'
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const name = sessionStorage.getItem('UserName');
  const email = sessionStorage.getItem('UserEmail');
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/editprofile');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome, {name}!</h2>
        <p className="text-gray-700 mb-4">Email: {email}</p>
        
        <button 
          onClick={handleEditProfile}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Edit Profile
        </button>
      </div>
    </div>
  )
}

export default Profile
