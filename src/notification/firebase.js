// src/notification/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1oXBS3PaUto-BSb28Syr30TWSGAyDnHE",
  authDomain: "antiragging-c6b7c.firebaseapp.com",
  projectId: "antiragging-c6b7c",
  storageBucket: "antiragging-c6b7c.firebasestorage.app",
  messagingSenderId: "738381132277",
  appId: "1:738381132277:web:3a244d3aa42d139a8ab0bc",
  measurementId: "G-JW5RM4GMGM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Ensure messaging is only initialized in the browser
export let messaging = null;

if (
  typeof window !== "undefined" &&
  "Notification" in window &&
  navigator.serviceWorker
) {
  messaging = getMessaging(app);
}

// Function to generate FCM token
export const generateToken = async () => {
  if (!messaging) return null; // Prevent errors if messaging is not available

  const permission = await Notification.requestPermission();
  console.log("Notification permission:", permission);

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey:
        "BP8hxLoytTg4Aj_9BczP5uJiyXID9k6JhmXrZRSzturDTWCsTmH43M75MzihL4W3aWaSk_gSzzLK23CwldprI5w",
    });
    console.log("Generated FCM Token:", token);
    return token;
  }

  return null;
};

// Register the Firebase service worker
export const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "/firebase-messaging-sw.js"
      );
      console.log("Service Worker registered:", registration);
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }
};
