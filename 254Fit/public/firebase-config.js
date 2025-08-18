// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmw4-fpv9Lq0-4IbY2s9JDI9PScp9Esjw",
  authDomain: "fit2-53abb.firebaseapp.com",
  projectId: "fit2-53abb",
  storageBucket: "fit2-53abb.firebasestorage.app",
  messagingSenderId: "291589322413",
  appId: "1:291589322413:web:9130bc71b162e464d53824",
  measurementId: "G-QXPV4DDQ5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);