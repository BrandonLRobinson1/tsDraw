import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import App from "../App";
import { AuthContext } from "../lib/context/AuthContext";

// TODO: ---- might delete context
// eslint-disable-next-line
const PrivateRoute = ({ children }) => {
  // const { isAuthenticated } = useContext(AuthContext);
  const isAuthenticated = localStorage.getItem("tsToken");
  // const isAuthenticated = localStorage.getItem("tsLoken");
  console.log("isAuthenticated --->", isAuthenticated.length);
  if (!isAuthenticated.length) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
