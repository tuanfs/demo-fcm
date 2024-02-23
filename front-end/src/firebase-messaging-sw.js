if ("serviceWorker" in navigator) {
  const firebaseConfigParams = new URLSearchParams({
    apiKey: "AIzaSyDyfVwslvnl31eHtuE1a_3me4MFamrik4Q",
    authDomain: "careful-voyage-403108.firebaseapp.com",
    projectId: "careful-voyage-403108",
    storageBucket: "careful-voyage-403108.appspot.com",
    messagingSenderId: "949691183765",
    appId: "1:949691183765:web:55127a5d89655fd615a19c",
    measurementId: "G-ZX069KVGKV"
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
