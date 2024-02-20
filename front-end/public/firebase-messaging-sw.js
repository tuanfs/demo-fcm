//public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

self.addEventListener("fetch", () => {
  const urlParams = new URLSearchParams({
    apiKey: "AIzaSyBMC52j8b0ufGOQqb-qS06K_SJR--n7jOk",
    authDomain: "notify-test-931fc.firebaseapp.com",
    projectId: "notify-test-931fc",
    storageBucket: "notify-test-931fc.appspot.com",
    messagingSenderId: "69395418565",
    appId: "1:69395418565:web:f3ebf282c9c452753a4fac",
    measurementId: "G-FLXNSDQ5C7",
  });
  self.firebaseConfig = Object.fromEntries(urlParams);
});

const defaultConfig = {
  apiKey: true,
  projectId: true,
  messagingSenderId: true,
  appId: true,
};

firebase.initializeApp(self.firebaseConfig || defaultConfig);
if (firebase.messaging.isSupported()) {
  const messaging = firebase.messaging();
  const channel = new BroadcastChannel("notifications");
  messaging.onBackgroundMessage(function (payload) {
    //can not console.log here
    channel.postMessage(payload);
  });
}
