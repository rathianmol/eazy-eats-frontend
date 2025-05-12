import React from 'react';
import { Navigate } from 'react-router-dom';
import Login from "./Login";

const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem('token');
  
    // If not logged in, redirect to login
    if (!token) {
      return <Navigate to="/login" element={<Login />} />;
    }
  
    return element; // If logged in, return the component (element)
  };

export default PrivateRoute;
