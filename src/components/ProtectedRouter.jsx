import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRouter = ({ children }) => {
  const token = useSelector((state) => state.loginReducer.token);

  if (token) {
    return children;
  }
  return <Navigate to="/login" />;
};

export default ProtectedRouter;
