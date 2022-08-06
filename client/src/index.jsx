import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import SignUp from "./credentials/SignUp";
import LogIn from "./credentials/LogIn";
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./lib/context/AuthContext";
import "./index.css";

import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        {/* TODO: need 404 page */}
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/main" element={<div>yerr</div>} />
        </Route>
        <Route path="*" element={<div>404 page</div>} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
