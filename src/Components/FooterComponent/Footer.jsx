import React from 'react';
import { FaInstagram } from "react-icons/fa";
import { CiFacebook, CiYoutube } from "react-icons/ci";

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-400 shadow-lg text-white py-10 mt-10">
                <div className="container mx-auto">

                    
                    <div className="text-center mb-10">
                        <h5 className="text-2xl font-bold">Ready to get started</h5>
                        <h5 className="text-2xl font-bold">Talk to us Today</h5>
                    </div>

                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left items-center justify-center">

                        
                        <div className="flex flex-col items-center md:items-start ml-4">
                            <h6 className="text-lg font-bold">Cart Craze</h6>
                            <p className="text-sm">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            </p>
                        </div>

                        
                        <div className="flex flex-col items-center md:items-mid">
                            <h6 className="text-lg font-bold">Follow Us</h6>
                            <div className="flex justify-center md:justify-start mt-3 space-x-4">
                                <CiFacebook className="h-6 w-6 text-blue-500 cursor-pointer hover:text-white transition duration-300" />
                                <FaInstagram className="h-6 w-6 text-blue-500 cursor-pointer hover:text-white transition duration-300" />
                                <CiYoutube className="h-6 w-6 text-blue-500 cursor-pointer hover:text-white transition duration-300" />
                            </div>
                        </div>

                        
                        <div className="flex flex-col items-center md:items-end mr-4">
                            <h6 className="text-lg font-bold">Call Us</h6>
                            <p className="text-sm">+91 1234567890</p>
                        </div>

                    </div>

                    
                    <div className="mt-10 text-center">
                        <hr className="border-white" />
                        <p className="text-sm mt-4">@{new Date().getFullYear()} CartCraze. All Rights Reserved</p>
                        <div className="flex justify-center mt-3 space-x-4">
                            <span className="cursor-pointer hover:text-gray-300 transition duration-300">PRIVACY POLICY</span>
                            <span className="cursor-pointer hover:text-gray-300 transition duration-300">TERMS AND CONDITIONS</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
