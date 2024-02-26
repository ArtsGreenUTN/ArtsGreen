// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFeYIe2wegDa9O-3EuSIOVRPh3EqvaNog",
  authDomain: "artsgreen-80ced.firebaseapp.com",
  databaseURL: "https://artsgreen-80ced-default-rtdb.firebaseio.com",
  projectId: "artsgreen-80ced",
  storageBucket: "artsgreen-80ced.appspot.com",
  messagingSenderId: "263328190278",
  appId: "1:263328190278:web:96a2124a2aee9cabc15f47",
  measurementId: "G-9NBGXFH8L1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
  
      // Referencia a la base de datos en tiempo real
      const dbRef = firebase.database().ref("videos");
  
      // Escuchar cambios en la base de datos
      dbRef.on("value", (snapshot) => {
        const videos = snapshot.val();
        console.log("Nuevos cambios en la base de datos:");
        console.log(videos);
      });