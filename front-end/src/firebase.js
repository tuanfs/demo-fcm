import firebase from "firebase/compat/app";
import "firebase/compat/messaging";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBMC52j8b0ufGOQqb-qS06K_SJR--n7jOk",
    authDomain: "notify-test-931fc.firebaseapp.com",
    projectId: "notify-test-931fc",
    storageBucket: "notify-test-931fc.appspot.com",
    messagingSenderId: "69395418565",
    appId: "1:69395418565:web:f3ebf282c9c452753a4fac",
    measurementId: "G-FLXNSDQ5C7",
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
        "BATzzeDKjrXqbL-lBjVbjBl6ne4ayJUP53aZURNeiFDO2lyQm-w2zKEfHbRAmAP8dKvgo9LIGaJKV03r50ELZ0M",
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
