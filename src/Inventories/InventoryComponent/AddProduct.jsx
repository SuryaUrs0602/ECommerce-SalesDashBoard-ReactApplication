import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const AddProduct = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('Token');

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    imageUrl: Yup.string().url('Invalid URL').required('Product image URL is required'),
    description: Yup.string().required('Product description is required'),
    category: Yup.string().required('Product category is required'),
    price: Yup.number().positive('Price must be a positive number').required('Product price is required'),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const productData = {
      productName: values.name,
      productImageUrl: values.imageUrl,
      productDescription: values.description,
      productCategory: values.category,
      productPrice: values.price,
    };

    try {
      const response = await axios.post(`https://localhost:7148/api/Products`, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201 || response.status === 200 || response.status === 204) {
        navigate('/inventory');
      }
    } catch (error) {
      setErrors({ general: 'There was an error adding the product. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-5">Add a New Product</h1>
      <Formik
        initialValues={{ name: '', imageUrl: '', description: '', category: '', price: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="name">Product Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="imageUrl">Product Image URL</label>
              <Field
                type="url"
                id="imageUrl"
                name="imageUrl"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage name="imageUrl" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="description">Product Description</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="category">Product Category</label>
              <Field
                type="text"
                id="category"
                name="category"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
            </div>
            <div className="mb-4">
              <label className="block mb-2" htmlFor="price">Product Price</label>
              <Field
                type="number"
                id="price"
                name="price"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Add Product
            </button>
          </Form>
        )}
      </Formik>
      <button
        onClick={() => navigate('/inventory')}
        className="mt-4 w-full bg-gray-300 p-2 rounded hover:bg-gray-400"
      >
        Cancel
      </button>
    </div>
  );
};

export default AddProduct;
