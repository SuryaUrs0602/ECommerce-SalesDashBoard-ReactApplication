import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'


const PaymentConfirm = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { orderAmount } = location.state || {};
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = sessionStorage.getItem('Token')


    const handlePaymentSuccess = (result) => {
        console.log('Payment successful:', result);
        navigate('/userorders'); 
    };

    const handlePaymentError = (err) => {
        console.error('Payment error:', err);
        setError('Payment failed. Please try again.');
    };

    const initializeOrder = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`https://localhost:7148/api/PayPals/create-order`, orderAmount, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            return response.data;

        } catch (err) {
            console.error('Failed to initialize PayPal checkout:', err);
            setError('Failed to initialize PayPal checkout');
            handlePaymentError(err);
            return null;
        }
    };


    const capturePayment = async (orderId) => {
        try {
            const response = await axios.post(`https://localhost:7148/api/PayPals/capture-order/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (response.status !== 200) {
                throw new Error('Payment capture failed');
            }

            return response.data;

        } catch (err) {
            console.error('Failed to process payment:', err);
            setError('Failed to process payment');
            handlePaymentError(err);
            return null;
        } finally {
            setLoading(false);
        }
    };


    const handlePayPalClick = async () => {
        const orderId = await initializeOrder();
        if (!orderId) return;

        const script = document.createElement('script');
        script.src = `https://www.paypal.com/sdk/js?client-id=AZb9o4ES7FQLgBfuLj-fWHco362vEgcE45nNUDrQEMqZpj0wIUVYAIjCfj6Z1vH7FTNtILdJX1Bj5Ke8&currency=USD`;
        script.async = true;

        script.onload = () => {
            window.paypal.Buttons({
               
                createOrder: async () => {
                    const order = await initializeOrder();
                    return order.orderId;
                },
                onApprove: async (data, actions) => {
                    const result = await capturePayment(data.orderID);
                    if (result) {
                        handlePaymentSuccess(result);
                    }
                },
                onError: (err) => {
                    setError('PayPal checkout failed');
                    handlePaymentError(err);
                }
            }).render('#paypal-button-container');
        };

        document.body.appendChild(script);
    };


    if (!orderAmount) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
                    <p>No order amount specified. Please try again.</p>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-center mb-4">Complete Your Payment</h2>

                    <div className="text-center mb-6">
                        <p className="text-2xl font-bold">${orderAmount.toFixed(2)}</p>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                            <p>{error}</p>
                        </div>
                    )}

                    <div id="paypal-button-container" className="mb-4"></div>

                    <button
                        onClick={handlePayPalClick}
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Processing...' : 'Pay with PayPal'}
                    </button>
                </div>

                <p className="text-sm text-gray-500 text-center">
                    Secure payment processed by PayPal
                </p>
            </div>
        </div>


    )
}

export default PaymentConfirm
