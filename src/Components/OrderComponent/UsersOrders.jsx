

import React, { useEffect, useReducer } from 'react'
import axios from 'axios'
import FormatPrice from '../../Utils/FormatPrice'
import { fetchOrdersError, fetchOrdersRequest, fetchOrdersSuccess } from '../../Actions/UsersOrdersAction'
import OrderReducer from '../../Reducers/UsersOrdersReducer'

const UsersOrders = () => {

  const token = sessionStorage.getItem('Token');
  const id = sessionStorage.getItem('UserId');

  const [state, dispatch] = useReducer(OrderReducer, { orders: [], loading: false, error: '' });

  useEffect(() => {
    const fetchOrders = async () => {
      dispatch(fetchOrdersRequest());

      try {
        const response = await axios.get(`https://localhost:7148/api/Orders/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        dispatch(fetchOrdersSuccess(response.data));
      } catch (error) {
        dispatch(fetchOrdersError(`Some problem occured: ${error.message}`));
      }
    };
    fetchOrders();
  }, []);

  const { orders, loading, error } = state;

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Orders</h1>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b">Order Date</th>
              <th className="py-2 px-4 border-b">Order Amount</th>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map(order => (
                Array.isArray(order.orderItems) && order.orderItems.map(item => (
                  <tr key={`${order.orderId}-${item.productName}`} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <FormatPrice price={order.orderAmount} />
                    </td>
                    <td className="py-2 px-4 border-b">{item.productName}</td>
                    <td className="py-2 px-4 border-b">{item.quantity}</td>
                  </tr>
                ))
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 px-4 text-center">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UsersOrders

