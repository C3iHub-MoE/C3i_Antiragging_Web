import React, { createContext, useState, useContext } from 'react';

// Create an AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Assuming 'false' means the user is not logged in

  const login = () => {
    setIsAuthenticated(true); // Simulate a login
  };

  const logout = () => {
    setIsAuthenticated(false); // Simulate a logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
