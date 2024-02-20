if ("serviceWorker" in navigator) {
  const firebaseConfigParams = new URLSearchParams({
    apiKey: "AIzaSyBMC52j8b0ufGOQqb-qS06K_SJR--n7jOk",
    authDomain: "notify-test-931fc.firebaseapp.com",
    projectId: "notify-test-931fc",
    storageBucket: "notify-test-931fc.appspot.com",
    messagingSenderId: "69395418565",
    appId: "1:69395418565:web:f3ebf282c9c452753a4fac",
    measurementId: "G-FLXNSDQ5C7",
  }).toString();
  navigator.serviceWorker
    .register(`../firebase-messaging-sw.js?${firebaseConfigParams}`)
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}
