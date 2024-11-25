import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import FormatPrice from '../../Utils/FormatPrice';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

import { fetchInventoryRequest, fetchInventorySuccess, fetchInventoryError } from '../../Actions/InventoryTableAction';
import InventoryTableReducer, { initialState } from '../../Reducers/InventoryTableReducer';

const InventoryTable = () => {
  // const [inventory, setInventory] = useState([]);
  // const [error, setError] = useState('');
  const token = sessionStorage.getItem('Token');
  const navigate = useNavigate();

  // const fetchInventory = async () => {
  //   try {
  //     const response = await axios.get('https://localhost:7148/api/Inventories', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       }
  //     });
  //     console.log(response.data);
  //     setInventory(response.data);
  //   } catch (err) {
  //     setError('Error fetching inventory data');
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchInventory();
  // }, []);

  const [state, dispatch] = useReducer(InventoryTableReducer, initialState);

  const fetchInventory = async () => {
    dispatch(fetchInventoryRequest());

    try {
      const response = await axios.get(`https://localhost:7148/api/Inventories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      dispatch(fetchInventorySuccess(response.data));
    } catch (error) {
      dispatch(fetchInventoryError(`Some problem Occured ${error.message}`));
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const { inventory, loading, error } = state;

  const handleEdit = (productId) => {
    navigate(`/editproduct/${productId}`)
  }

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(`https://localhost:7148/api/Products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 204 || response.data === 200) {
        alert('Product deleted successfully');
        fetchInventory();
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('There was an error deleting the product. Please try again.');
    }
  }

  const handleAddProduct = () => {
    navigate('/addproduct')
  }

  const handleReorder = async (productId) => {
    try {
      const response = await axios.post(`https://localhost:7148/api/Inventories/reorder/${productId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        alert(`Product ${productId} reordered successfully.`);
        fetchInventory();
      }
    } catch (error) {
      console.error(error);
      alert('There was an error reordering the product. Please try again.');
    }
  };

  const pieChartData = {
    labels: inventory.map(item => item.productName),
    datasets: [
      {
        label: 'Stock Level',
        data: inventory.map(item => item.stockLevel),
        backgroundColor: inventory.map((_, index) => `hsl(${index * 60}, 70%, 50%)`),
      },
    ],
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Inventory</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleAddProduct}
        className="mb-4 bg-blue-300 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Add Product
      </button>
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
            {inventory.length > 0 ? (
              inventory.map(item => (
                <tr key={item.inventoryId} className={`hover:bg-gray-100 ${item.stockLevel < 5 ? 'bg-red-100' : ''}`}>
                  <td className="py-2 px-4 border border-gray-200">{item.productId}</td>
                  <td className="py-2 px-4 border border-gray-200">{item.productName}</td>
                  <td className="py-2 px-4 border border-gray-200">{item.productCategory}</td>
                  <td className="py-2 px-4 border border-gray-200">{item.stockLevel}</td>
                  <td className="py-2 px-4 border border-gray-200"><FormatPrice price={item.productPrice} /></td>
                  <td className="py-2 px-4 border border-gray-200 flex space-x-2">
                    <button onClick={() => handleEdit(item.productId)} color="primary">
                      <MdEdit className="text-blue-500 hover:text-blue-700 ml-6" />
                    </button>
                    <button onClick={() => handleDelete(item.productId)} color="error">
                      <MdDelete className="text-red-500 hover:text-red-700 ml-6" />
                    </button>
                    {item.stockLevel < 5 && (   
                      <button onClick={() => handleReorder(item.productId)} color="primary" className="ml-5 text-blue-500 hover:text-blue-700">
                        Reorder
                      </button>
                    )}
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
      {inventory.length > 0 && (
        <div className="mt-8 flex flex-col items-center justify-center">
          <h2 className="text-xl font-semibold mb-4">Stock Level Distribution</h2>
          <div style={{ width: '300px', height: '300px', display: 'flex', justifyContent: 'center' }}>
            <Pie data={pieChartData} width={300} height={300} />
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryTable;
