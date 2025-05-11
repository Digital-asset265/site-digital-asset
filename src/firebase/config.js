// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // <== Faltava isto!
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDoNaApImtxI6ryTLvMH6bWKTfzRsS1JyA",
  authDomain: "digital-asset-site-a295e.firebaseapp.com",
  projectId: "digital-asset-site-a295e",
  storageBucket: "digital-asset-site-a295e.appspot.com",
  messagingSenderId: "391818526109",
  appId: "1:391818526109:web:xxxxx" // podes deixar assim
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // <== Esta linha é OBRIGATÓRIA
export const auth = getAuth(app);
