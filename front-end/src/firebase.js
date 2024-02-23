import firebase from "firebase/compat/app";
import "firebase/compat/messaging";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDyfVwslvnl31eHtuE1a_3me4MFamrik4Q",
    authDomain: "careful-voyage-403108.firebaseapp.com",
    projectId: "careful-voyage-403108",
    storageBucket: "careful-voyage-403108.appspot.com",
    messagingSenderId: "949691183765",
    appId: "1:949691183765:web:55127a5d89655fd615a19c",
    measurementId: "G-ZX069KVGKV"
  });
} else {
  firebase.app();
}

let messaging;

if (typeof window !== "undefined") {
  if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
  }
}

export const getMessagingToken = async () => {
  let currentToken = "";
  if (!messaging) return;
  try {
    currentToken = await messaging.getToken({
      vapidKey:
        "BAzlErsS1siHlMcUtk4YSQcF1u2eKTUUEjwmqvOWCwdZYFUw_IIu-Lsko4U5YA1weB01MyAZNCH1yHAcyh935ms",
    });
    console.log("FCM registration token", currentToken);
  } catch (error) {
    console.log("An error occurred while retrieving token. ", error);
  }
  return currentToken;
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
