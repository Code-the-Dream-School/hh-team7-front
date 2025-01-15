import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";


const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token } = useContext(AuthContext); 

  // Check if the user is logged in
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Check if the user has the required role
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
