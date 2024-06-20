import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtmdVL-DDKXcqt8H9NCOA7Vzf0xYT--es",
  authDomain: "useauthnb.firebaseapp.com",
  projectId: "useauthnb",
  storageBucket: "useauthnb.appspot.com",
  messagingSenderId: "164583664854",
  appId: "1:164583664854:web:005dfac121631f6ab76d77",
  measurementId: "G-79FNGVSLF5",
  databaseURL: "https://useauthnb-default-rtdb.asia-southeast1.firebasedatabase.app/",
};
const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
export const auth = getAuth(firebaseApp); 