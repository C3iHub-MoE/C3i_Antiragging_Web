// src/context/FCMContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import {generateToken} from '../notification/firebase'
const FCMContext = createContext();

export const useFCM = () => useContext(FCMContext);

export const FCMProvider = ({ children }) => {
  const [fcmToken, setFcmToken] = useState(null);
    const [ isTokenLoaded, setIsTokenLoaded] = useState(false)

  useEffect(() => {
    const fetchToken = async () => {
      const token = await generateToken();
      if (token) {
        setFcmToken(token); // Save the token in context
      }

      setIsTokenLoaded(true);
    };

    fetchToken();
  }, []); // This runs once when the component mounts

  return (
    <FCMContext.Provider value={{ fcmToken, isTokenLoaded }}>
      {children}
    </FCMContext.Provider>
  );
};
