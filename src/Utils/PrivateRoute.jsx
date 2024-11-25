import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const token = sessionStorage.getItem('Token');
  return token ? <Outlet /> : <Navigate to='/login' />;
}

export default PrivateRoute
