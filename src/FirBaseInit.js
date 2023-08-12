// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuJkIk3YZAKAq8W8mOeo-5IkYlvsxusvg",
  authDomain: "photofolio-364ae.firebaseapp.com",
  projectId: "photofolio-364ae",
  storageBucket: "photofolio-364ae.appspot.com",
  messagingSenderId: "896531044289",
  appId: "1:896531044289:web:6cb529da65785232aec140"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);