import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateProduct = () => {

  const { id } = useParams();
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const token = sessionStorage.getItem('Token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async() => {
      try {
        const response = await axios.get(`https://localhost:7148/api/Products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const product = response.data;
        setName(product.productName);
        setImageUrl(product.productImageUrl);
        setDescription(product.productDescription);
        setCategory(product.productCategory);
        setPrice(product.productPrice);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('Failed to fetch product details. Please try again.');
      }
    };
    fetchProductDetails();
  }, []);

  const handleSubmit = async(e) => {
        e.preventDefault();

        try {
          const response = await axios.patch(`https://localhost:7148/api/Products/${id}`,
            [
              { op: "replace", path: "/productName", value: name },
              { op: "replace", path: "/productImageUrl", value: imageUrl },
              { op: "replace", path: "/productDescription", value: description },
              { op: "replace", path: "/productCategory", value: category },
              { op: "replace", path: "/productPrice", value: price }
            ],
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );

          if (response.status === 200 || response.status === 204) {
            setMessage('product updated successfully');
            navigate('/inventory');
          }
        } catch (error) {
          console.error('Error updating product:', error);
          setError('There was an error updating the product. Please try again.');
        }
      }

  const handleCancel = () => {
    navigate('/inventory');
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-5">Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            className="w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="imageUrl">Product Image URL</label>
          <input
            type="url"
            id="imageUrl"
            className="w-full p-2 border border-gray-300 rounded"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="description">Product Description</label>
          <textarea
            id="description"
            className="w-full p-2 border border-gray-300 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="category">Product Category</label>
          <input
            type="text"
            id="category"
            className="w-full p-2 border border-gray-300 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2" htmlFor="price">Product Price</label>
          <input
            type="number"
            id="price"
            className="w-full p-2 border border-gray-300 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Update Product
        </button>
      </form>
      <button
        onClick={handleCancel}
        className="mt-4 w-full bg-gray-300 p-2 rounded hover:bg-gray-400"
      >
        Cancel
      </button>
      {message && <p className="mt-2 text-green-600">{message}</p>}
      {message && <p className="mt-2 text-red-600">{message}</p>}
    </div>
  )
}

export default UpdateProduct
