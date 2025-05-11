// src/firebase/auth.js
import { getAuth } from "firebase/auth";
import { app, db } from "./config"; // IMPORTA o app E o db do config

export const auth = getAuth(app);
export { db }; // EXPORTA o db para ficar disponível

