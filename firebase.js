// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMyeMlRut0pIpfQJ9Vkuj-g3YH5GR5Mfc",
  authDomain: "laura-dbc7e.firebaseapp.com",
  projectId: "laura-dbc7e",
  storageBucket: "laura-dbc7e.firebasestorage.app",
  messagingSenderId: "996903061474",
  appId: "1:996903061474:web:e2ea672588b9ad5ced1bbb",
  measurementId: "G-LS757SJWQJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);