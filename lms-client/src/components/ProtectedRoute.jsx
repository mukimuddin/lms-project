import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles = [], children }) {
  // Get userRole from localStorage
  const userRole = localStorage.getItem("userRole");

  // If no userRole or role NOT in allowedRoles, redirect to home
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  // Role matches, allow access
  return children;
}
