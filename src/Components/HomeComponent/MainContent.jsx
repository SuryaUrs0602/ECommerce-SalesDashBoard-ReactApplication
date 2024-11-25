import React from 'react'
import { NavLink } from 'react-router-dom'
import ShoppingImage from '../../Images/MainImage.jpg'

const MainContent = ({ myData }) => {

    const { name } = myData;
    const userRole = sessionStorage.getItem('UserRole');

    return (
        <section className="py-10 px-5">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

                <div className="flex flex-col justify-center">
                    <h6 className="text-blue-600 mb-3 text-lg">Welcome to</h6>
                    <h2 className="text-4xl font-bold text-blue-600 mb-5">{name}</h2>
                    <p className="text-gray-700 mb-6">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        Ducimus rem praesentium itaque animi iusto suscipit. Eaque,
                        cumque consectetur natus iste deserunt cum rerum ut, dolores
                        eius debitis, porro nam nihil.
                    </p>
                    {userRole === '0' ? null : <NavLink to='/products'>
                        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                            Shop Now
                        </button>
                    </NavLink>}
                </div>

                <div className="flex justify-center items-center">
                    <figure>
                        <img
                            src={ShoppingImage}
                            alt="Main Image"
                            className="max-w-4/5 h-auto"
                        />
                    </figure>
                </div>

            </div>
        </section>
    )
}

export default MainContent
