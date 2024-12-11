import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    const navigate = useNavigate();

    // if (user && !user.isVerified) {
    //     navigate("/verifyAccount");
    //     window.location.reload();
    //     return null;
    // }

    const isAuthenticated = Boolean(localStorage.getItem("authToken")); // Or your auth logic
    console.log("Is Authenticated:", isAuthenticated); // Debugging log

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};
export default ProtectedRoute;
