import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword as createUser,
  sendEmailVerification as sendEmail,
  deleteUser,
  setPersistence,
  EmailAuthProvider as EmailProvider,
  browserSessionPersistence as browserSession,
  reauthenticateWithCredential as reauthenticate,
  signInWithEmailAndPassword as signInWith,
  sendPasswordResetEmail as resetPassword,
  verifyBeforeUpdateEmail as verifyUpdateEmail,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtmdVL-DDKXcqt8H9NCOA7Vzf0xYT--es",
  authDomain: "useauthnb.firebaseapp.com",
  projectId: "useauthnb",
  storageBucket: "useauthnb.appspot.com",
  messagingSenderId: "164583664854",
  appId: "1:164583664854:web:005dfac121631f6ab76d77",
  measurementId: "G-79FNGVSLF5",
  // databaseURL: "https://useauthnb-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
export const authF8 = getAuth(firebaseApp);
export { createUser, sendEmail, deleteUser, setPersistence, signInWith, signOut, browserSession };
export { reauthenticate, resetPassword, verifyUpdateEmail, onAuthStateChanged, EmailProvider };
