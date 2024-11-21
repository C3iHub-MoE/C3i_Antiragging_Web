// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getMessaging, getToken } from "firebase/messaging";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA1oXBS3PaUto-BSb28Syr30TWSGAyDnHE",
    authDomain: "antiragging-c6b7c.firebaseapp.com",
    projectId: "antiragging-c6b7c",
    storageBucket: "antiragging-c6b7c.firebasestorage.app",
    messagingSenderId: "738381132277",
    appId: "1:738381132277:web:3a244d3aa42d139a8ab0bc",
    measurementId: "G-JW5RM4GMGM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// const analytics = getAnalytics(app);


export const generateToken = async () => {

    const permission = await Notification.requestPermission();
    console.log(permission);

    if (permission === "granted") {
        const token = await getToken(messaging, {
            vapidKey: "BP8hxLoytTg4Aj_9BczP5uJiyXID9k6JhmXrZRSzturDTWCsTmH43M75MzihL4W3aWaSk_gSzzLK23CwldprI5w"
        })
        console.log("new token",token)
        return token;
    }

    return null;
}