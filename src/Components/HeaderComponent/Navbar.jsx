import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const userRole = sessionStorage.getItem('UserRole');
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  }

  return (
    <div className="ml-auto flex space-x-4">
        {userRole ? (
          userRole === '0' ? (
            <>
              <NavLink to='/' className='text-white hover:text-gray-300'>Home</NavLink>
              <NavLink to='/dashboard' className='text-white hover:text-gray-300'>Dashboard</NavLink>
              <NavLink to='/inventory' className='text-white hover:text-gray-300'>Inventory</NavLink>
              <NavLink to='/orderdetails' className='text-white hover:text-gray-300'>Orders</NavLink>
              <button onClick={handleLogout} className='text-white hover:text-gray-300'>Logout</button>
            </>
          ) : (
            <>
              <NavLink to='/' className='text-white hover:text-gray-300'>Home</NavLink>
              <NavLink to='/about' className='text-white hover:text-gray-300'>About</NavLink>
              <NavLink to='/products' className='text-white hover:text-gray-300'>Products</NavLink>
              <NavLink to='/profile' className='text-white hover:text-gray-300'>Profile</NavLink>
              <NavLink to='userorders' className='text-white hover:text-gray-300' >Orders</NavLink>
              <button onClick={handleLogout} className='text-white hover:text-gray-300'>Logout</button>
            </>
          )
        ) : (
          <>
            <NavLink to='/' className='text-white hover:text-gray-300'>Home</NavLink>
            <NavLink to='/about' className='text-white hover:text-gray-300'>About</NavLink>
            <NavLink to='/products' className='text-white hover:text-gray-300'>Products</NavLink>
            <NavLink to='/login' className='text-white hover:text-gray-300' >Login</NavLink>
          </>
        )}
    </div>
  )
}

export default Navbar
