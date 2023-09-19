// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDuJkIk3YZAKAq8W8mOeo-5IkYlvsxusvg",
//   authDomain: "photofolio-364ae.firebaseapp.com",
//   projectId: "photofolio-364ae",
//   storageBucket: "photofolio-364ae.appspot.com",
//   messagingSenderId: "896531044289",
//   appId: "1:896531044289:web:6cb529da65785232aec140"
// };
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrbQs0OrOOk4NyYIqM-tAna4HYv4tYk7E",
  authDomain: "photopholio-eee47.firebaseapp.com",
  projectId: "photopholio-eee47",
  storageBucket: "photopholio-eee47.appspot.com",
  messagingSenderId: "498355253021",
  appId: "1:498355253021:web:95d30cf92db3297410bbf4",
  measurementId: "G-3PR6VKM21Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase

export const db = getFirestore(app);