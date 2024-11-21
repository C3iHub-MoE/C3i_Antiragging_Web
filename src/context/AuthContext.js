import React, { createContext, useState, useContext } from 'react';
import { useClient } from '../hooks/useUser';

// Create an AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const userLoginState = useClient();
  const LogOutUserState = useClient();


  


  return (
    <AuthContext.Provider value={{ ...userLoginState, ...LogOutUserState}}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
