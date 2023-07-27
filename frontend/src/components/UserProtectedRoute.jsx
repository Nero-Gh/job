import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserProtectedRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.signIn);
  return userInfo ? children : <Navigate to="/" />;
};

export default UserProtectedRoute;
