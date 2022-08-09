import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import SignUp from './pages/credentials/SignUp';
import LogIn from './pages/credentials/LogIn';
import Main from './pages/main';
import Create from './pages/create';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './lib/context/AuthContext';
import './index.css';

import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnHover
        pauseOnFocusLoss
        limit={1}
      />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route
          path="/main"
          element={(
            <PrivateRoute>
              <Main />
            </PrivateRoute>
          )}
        />
        <Route
          path="/create"
          element={(
            <PrivateRoute>
              <Create />
            </PrivateRoute>
          )}
        />
        <Route path="*" element={<div>404 page</div>} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>,
);

reportWebVitals();
