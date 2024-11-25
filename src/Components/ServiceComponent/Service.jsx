import React from 'react';
import { FaShippingFast, FaLock, FaMoneyBillAlt, FaCreditCard } from 'react-icons/fa';

const Services = () => {
  return (
    <div className="container mx-auto py-10">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">

        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105">
          <FaShippingFast className="text-6xl text-blue-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">Fast and Safe Delivery</h3>
          <p className="text-gray-500 text-center">
            We ensure your packages arrive on time and in perfect condition.
          </p>
        </div>

        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105">
          <FaLock className="text-6xl text-blue-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">Non-Contact Shipping</h3>
          <p className="text-gray-500 text-center">
            Stay safe with our non-contact delivery options.
          </p>
        </div>

        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105">
          <FaMoneyBillAlt className="text-6xl text-blue-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">Money Back Guarantee</h3>
          <p className="text-gray-500 text-center">
            Your satisfaction is our priority. Get your money back if not satisfied.
          </p>
        </div>

        <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-8 transition-transform transform hover:scale-105">
          <FaCreditCard className="text-6xl text-blue-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">Super Secure Payment</h3>
          <p className="text-gray-500 text-center">
            We use advanced encryption to ensure your payment is safe.
          </p>
        </div>

      </div>
    </div>
  );
};

export default Services;
