import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import FormatPrice from '../../Utils/FormatPrice';
import axios from 'axios'

const OrderConfirm = () => {
    const location = useLocation();
    const { product, quantity } = location.state || {};
    const id = sessionStorage.getItem('UserId');
    const token = sessionStorage.getItem('Token');
    const [error, setError] = useState('');
    const navigate  = useNavigate();

    const handleOrder = async(e) => {
        e.preventDefault();
        
        const orderItem = {
            productId: product.productId,
            quantity: quantity,
            unitPrice: product.productPrice,
        };
    
        const amount = quantity * product.productPrice;
        const orderAmount = 0;
    
        const orderData = {
            orderAmount: orderAmount,
            userId: id,
            orderItems: [orderItem],
        };

        console.log(orderData);

        try {
            const response = await axios.post('https://localhost:7148/api/Orders', orderData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200 || response.status === 204 || response.status === 201) {
                navigate('/confirmpayment', {
                    state: {
                        orderAmount: amount
                    }
                });
            }
        } catch (err) {
            console.error('Error placing order:', err);
            setError("Some Error occured while ordering the product")
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <h1 className="text-2xl font-semibold text-center mb-4">Order Confirmation</h1>
                {product ? (
                    <div>
                        <p className="text-lg font-medium mb-2">Product Name: <span className="font-bold">{product.productName}</span></p>
                        <p className="text-lg font-medium mb-2">Quantity: <span className="font-bold">{quantity}</span></p>
                        <p className='text-lg font-medium mb-2'>Product Price: <FormatPrice price={product.productPrice} /></p>
                        <button onClick={handleOrder} className="mt-4 ml-3 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">Order</button>
                        <NavLink to="/products" className="mt-4 ml-3 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                            Cancel
                        </NavLink>
                    </div>
                ) : (
                    <p className="text-red-500 text-center">No product selected.</p>
                )}
            </div>
        </div>
    );
};

export default OrderConfirm;
