// src/firebase/authService.js

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
} from "firebase/auth";

import { auth } from "./config";
import { db } from "./config";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";

// REGISTO COM VERIFICAÇÃO DE EMAIL E AUTORIZAÇÃO
export const registerUser = async (email, password) => {
  try {
    const cleanedEmail = email.trim().toLowerCase();

    // Verifica se o email está autorizado antes de continuar
    const docRef = doc(db, "clientesAutorizados", cleanedEmail);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Este email não está autorizado para registo.");
    }

    const userCredential = await createUserWithEmailAndPassword(auth, cleanedEmail, password);
    await sendEmailVerification(userCredential.user);

    await setDoc(doc(db, "users", cleanedEmail), {
      email: cleanedEmail,
      criadoEm: new Date().toISOString(),
    });

    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error("Erro no registo:", error.message);
    return { user: null, error: error.message };
  }
};

// LOGIN
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    console.error("Erro no login:", error.message);
    return { user: null, error: error.message };
  }
};

// LOGOUT
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// APAGAR USUÁRIO do Firestore
export const deleteUserFromFirestore = async (email) => {
  try {
    const cleanedEmail = email.trim().toLowerCase();
    await deleteDoc(doc(db, "users", cleanedEmail));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

  
  
  
  
  
  
  

  
