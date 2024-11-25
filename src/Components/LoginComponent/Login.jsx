import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required'),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const user = {
                UserEmail: values.email,
                UserPassword: values.password,
            };

            const response = await axios.post('https://localhost:7148/api/Users/login', user);

            if (response.status === 200) {
                const { userId, userName, userEmail, userRole, token } = response.data;

                sessionStorage.setItem('UserId', userId);
                sessionStorage.setItem('UserName', userName);
                sessionStorage.setItem('UserEmail', userEmail);
                sessionStorage.setItem('UserRole', userRole);
                sessionStorage.setItem('Token', token);

                navigate('/');
            }

        } catch (error) {
            if (error.response) {
                setErrors({ email: 'Invalid Username or password' });
            } else {
                setErrors({ email: 'Something went wrong, please try again later' });
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-md shadow-lg">
            <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className="space-y-6">
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
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
                        >
                            Login
                        </button>
                        <p className="text-center text-sm text-gray-600 mt-4">
                            Don't have an account?{' '}
                            <NavLink to="/signup" className="text-indigo-600 hover:text-indigo-700 font-bold">
                                Sign Up
                            </NavLink>
                        </p>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Login;

