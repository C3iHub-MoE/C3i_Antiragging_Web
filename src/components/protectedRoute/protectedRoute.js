import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = Boolean(localStorage.getItem('authToken')); // Or your auth logic
    console.log("Is Authenticated:", isAuthenticated); // Debugging log
  
    return isAuthenticated ? children : <Navigate to="/login" replace />;
  };
export default ProtectedRoute;