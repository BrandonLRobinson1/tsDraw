import React, { createContext, useState } from 'react';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthProvider, AuthContext };
