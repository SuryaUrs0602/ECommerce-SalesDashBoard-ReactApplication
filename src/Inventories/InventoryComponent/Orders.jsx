// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import FormatPrice from '../../Utils/FormatPrice'

// const Orders = () => {

//     const [orders, setOrders] = useState([]);
//     const [error, setError] = useState('');

//     const token = sessionStorage.getItem('Token');

//     useEffect(() => {
//         const fetchOrderDetails = async() => {
//             try {
//                 const response = await axios.get(`https://localhost:7148/api/Orders`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     }
//                 });
//                 setOrders(response.data);
//             } catch (err) {
//                 setError('Error fetching inventory data');
//                 console.error(err)
//             }
//         }
//         fetchOrderDetails();
//     }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Orders</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="py-2 px-4 border-b">Order ID</th>
//               <th className="py-2 px-4 border-b">Order Date</th>
//               <th className="py-2 px-4 border-b">Order Amount</th>
//               <th className="py-2 px-4 border-b">User Email</th>
//               <th className="py-2 px-4 border-b">Product Name</th>
//               <th className="py-2 px-4 border-b">Quantity</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map(order => (
//               order.orderItems.map(item => (
//                 <tr key={order.orderId} className="hover:bg-gray-100">
//                   <td className="py-2 px-4 border-b">{order.orderId}</td>
//                   <td className="py-2 px-4 border-b">{new Date(order.orderDate).toLocaleDateString()}</td>
//                   <td className="py-2 px-4 border-b"><FormatPrice price={order.orderAmount} /></td>
//                   <td className="py-2 px-4 border-b">{order.userEmail}</td>
//                   <td className="py-2 px-4 border-b">{item.productName}</td>
//                   <td className="py-2 px-4 border-b">{item.quantity}</td>
//                 </tr>
//               ))
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default Orders















import React, { useEffect, useReducer } from 'react'
import axios from 'axios'
import { fetchOrdersRequest, fetchOrdersError, fetchOrdersSuccess } from '../../Actions/OrdersAction'
import OrdersReducer from '../../Reducers/OrdersReducer'
import FormatPrice from '../../Utils/FormatPrice'

const Orders = () => {

  const token = sessionStorage.getItem('Token');

  const [state, dispatch] = useReducer(OrdersReducer, { orders: [], loading: false, error: ''});

  useEffect(() => {
    const fetchOrderData = async () => {
      dispatch(fetchOrdersRequest());

      try {
        const response = await axios.get(`https://localhost:7148/api/Orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        dispatch(fetchOrdersSuccess(response.data));
      } catch (error) {
        dispatch(fetchOrdersError(`Some problem occured ${error.message}`))
      }
    };

    fetchOrderData();
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
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Order Date</th>
              <th className="py-2 px-4 border-b">Order Amount</th>
              <th className="py-2 px-4 border-b">User Email</th>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              order.orderItems.map(item => (
                <tr key={order.orderId} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b">{order.orderId}</td>
                  <td className="py-2 px-4 border-b">{new Date(order.orderDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4 border-b"><FormatPrice price={order.orderAmount} /></td>
                  <td className="py-2 px-4 border-b">{order.userEmail}</td>
                  <td className="py-2 px-4 border-b">{item.productName}</td>
                  <td className="py-2 px-4 border-b">{item.quantity}</td>
                </tr>
              ))
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders
