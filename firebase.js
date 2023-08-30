// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8EsHGeuOmKXUbzG3iwu36ox1edE4WZl4",
  authDomain: "yip-product.firebaseapp.com",
  projectId: "yip-product",
  storageBucket: "yip-product.appspot.com",
  messagingSenderId: "253256950949",
  appId: "1:253256950949:web:f930cb89696861d06f994c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = isSupported().then((yes) => (yes ? getAnalytics(app) : null));
const db = getFirestore(app);

export { app, db, getFirestore, collection, addDoc, getDocs, query };
