import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const isAuthenticated = Boolean(localStorage.getItem("authToken")); // Or your auth logic

  const navigate = useNavigate();
  console.log("sdfghjk", user);

  useEffect(() => {
    if (user) {
      if (!user.is_verified) {
        navigate("/verifyAccount");
      } else if (
        user.role === "squad_member" &&
        user.is_reset_password_required
      ) {
        navigate("/changePassword", { state: { fromForcedReset: true } });
      }
    }
  }, [user]);

  // if (user && !user.is_verified) {
  //   navigate("/verifyAccount");
  //   // window.location.reload();
  //   return null;
  // }

  console.log("Is Authenticated:", isAuthenticated); // Debugging log

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};
export default ProtectedRoute;
