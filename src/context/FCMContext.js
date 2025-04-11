// src/context/FCMContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { generateToken, registerServiceWorker } from "../notification/firebase";

const FCMContext = createContext();

export const useFCM = () => useContext(FCMContext);

export const FCMProvider = ({ children }) => {
  const [fcmToken, setFcmToken] = useState(null);
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        await registerServiceWorker(); // Ensure service worker is registered
        const token = await generateToken();
        if (token) {
          setFcmToken(token);
        }
      } catch (error) {
        console.error("Error fetching FCM token:", error);
      } finally {
        setIsTokenLoaded(true);
      }
    };

    if (typeof window !== "undefined") {
      fetchToken();
    }
  }, []);

  return (
    <FCMContext.Provider value={{ fcmToken, isTokenLoaded }}>
      {children}
    </FCMContext.Provider>
  );
};
