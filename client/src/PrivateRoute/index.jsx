import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import App from "../App";
import { AuthContext } from "../lib/context/AuthContext";

// TODO:
// eslint-disable-next-line
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
