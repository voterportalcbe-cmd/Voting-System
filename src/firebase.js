// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsfKsRI-5p2Wyk1Ep4EUTgLG27UdCwPTA",
  authDomain: "voting-system-f6dfd.firebaseapp.com",
  projectId: "voting-system-f6dfd",
  storageBucket: "voting-system-f6dfd.firebasestorage.app",
  messagingSenderId: "958554242879",
  appId: "1:958554242879:web:126f9248a5e0b00c7c5d8a",
  measurementId: "G-3D33E5W0LE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);