// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyA1oXBS3PaUto-BSb28Syr30TWSGAyDnHE",
    authDomain: "antiragging-c6b7c.firebaseapp.com",
    projectId: "antiragging-c6b7c",
    storageBucket: "antiragging-c6b7c.firebasestorage.app",
    messagingSenderId: "738381132277",
    appId: "1:738381132277:web:3a244d3aa42d139a8ab0bc",
    measurementId: "G-JW5RM4GMGM"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();


messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.icon
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });

