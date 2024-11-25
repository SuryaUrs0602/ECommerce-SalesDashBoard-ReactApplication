import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignUp = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        role: Yup.number()
            .required('User role is required'),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const userData = {
                UserName: values.name,
                UserEmail: values.email,
                UserPassword: values.password,
                UserRole: values.role
            };

            const response = await axios.post('https://localhost:7148/api/Users/register', userData);
            if (response.status === 200) {
                navigate('/');
            } else {
                setErrors({ email: 'Something went wrong. Please try again later' });
            }
        } catch (error) {
            if (error.response) {
                setErrors({ email: `Error: ${error.response.status} - ${error.response.data.message || 'Something went wrong, try again later'}` });
            } else {
                setErrors({ email: 'Something went wrong, please try again later' });
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-md shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
            <Formik
                initialValues={{ name: '', email: '', password: '', role: null }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <Field
                                type="text"
                                name="name"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <Field
                                type="email"
                                name="email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <Field
                                type="password"
                                name="password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                        </div>

                        <label className="block text-sm font-medium text-gray-700">User Role</label>
                        <div className="mt-2">
                            <label className="inline-flex items-center mr-4">
                                <Field
                                    type="radio"
                                    name="role"
                                    value={0}
                                    onChange={() => setFieldValue('role', 0)}
                                    className="form-radio text-indigo-600"
                                />
                                <span className="ml-2">Admin</span>
                            </label>
                            <label className="inline-flex items-center">
                                <Field
                                    type="radio"
                                    name="role"
                                    value={1}
                                    onChange={() => setFieldValue('role', 1)}
                                    className="form-radio text-indigo-600"
                                />
                                <span className="ml-2">User</span>
                            </label>
                            <ErrorMessage name="role" component="div" className="text-red-500 text-sm" />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                        >
                            Sign Up
                        </button>
                        <p className="text-center text-sm text-gray-600 mt-4">
                            Already have an account?{' '}
                            <NavLink to="/login" className="text-indigo-600 hover:text-indigo-700 font-bold">
                                Login
                            </NavLink>
                        </p>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default SignUp;

