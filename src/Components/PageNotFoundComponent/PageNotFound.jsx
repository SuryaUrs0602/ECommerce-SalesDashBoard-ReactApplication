import React from 'react'
import { NavLink } from 'react-router-dom'

const PageNotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
                <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
                <p className="text-xl text-gray-700 mb-4">Oops! The page you are looking for does not exist.</p>
                <p className="text-lg text-gray-500">Please check the URL or go back to the homepage.</p>
                <div className="mt-6">

                    <NavLink
                        to="/"
                        className="text-blue-500 hover:underline"
                    >
                        Go back to homepage
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound
