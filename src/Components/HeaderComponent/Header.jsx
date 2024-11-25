import React from 'react'
import { NavLink } from 'react-router-dom'
import ApplicationLogo from '../../Images/ApplicationLogo.jpg'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div>
        <header className="bg-gray-400 shadow-lg">
            <div className="container mx-auto flex justify-between items-center py-3 px-5">

                <NavLink to="/" className="flex items-center">
                    <img 
                        src={ApplicationLogo}
                        alt='App Logo'
                        className='h-12 mr-3'               
                    />
                </NavLink>

                <Navbar />

            </div>
        </header>
    </div>
  )
}

export default Header
