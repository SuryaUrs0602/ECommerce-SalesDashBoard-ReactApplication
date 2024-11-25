import React, { useEffect, useState } from 'react'
import FormatPrice from '../../Utils/FormatPrice';
import axios from 'axios';

const LowStockProducts = () => {

    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const token = sessionStorage.getItem('Token');

    const fetchLowStockProducts = async() => {
        try {
            const response = await axios.get(`https://localhost:7148/api/Inventories/low-stock`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setProducts(response.data)
        } catch (err) {
            setError('Error fetching inventory data');
            console.error(err);
        }
    };

    useEffect(() => {
        fetchLowStockProducts();
    }, []);


    const handleReorder = async(id) => {
        try {
            const response = await axios.post(`https://localhost:7148/api/Inventories/reorder/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200 || response.status === 201) {
                alert(`Product ${id} reordered successfully.`);
                fetchLowStockProducts();
            }
        }catch (error) {
            console.error(error);
            alert('There was an error reordering the product. Please try again.');
        }               
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Low Stock Products</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="py-2 px-4 border border-gray-200">Product ID</th>
                            <th className="py-2 px-4 border border-gray-200">Product Name</th>
                            <th className="py-2 px-4 border border-gray-200">Category</th>
                            <th className="py-2 px-4 border border-gray-200">Stock Level</th>
                            <th className="py-2 px-4 border border-gray-200">Price</th>
                            <th className="py-2 px-4 border border-gray-200">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map(item => (
                                <tr key={item.inventoryId} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border border-gray-200">{item.productId}</td>
                                    <td className="py-2 px-4 border border-gray-200">{item.productName}</td>
                                    <td className="py-2 px-4 border border-gray-200">{item.productCategory}</td>
                                    <td className="py-2 px-4 border border-gray-200">{item.stockLevel}</td>
                                    <td className="py-2 px-4 border border-gray-200"><FormatPrice price={item.productPrice} /></td>
                                    <td className="py-2 px-4 border border-gray-200">
                                        <button 
                                            onClick={() => handleReorder(item.productId)} 
                                            className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
                                        >
                                            Reorder
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-2 px-4 text-center">No inventory data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LowStockProducts
