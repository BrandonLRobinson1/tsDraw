import React, { createContext, useState } from "react";

const AuthContext = createContext();
const { Provider } = AuthContext;

// TODO:
// eslint-disable-next-line
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  console.log("isAuthenticated: ", isAuthenticated);

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
