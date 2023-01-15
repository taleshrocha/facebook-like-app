// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuM5bWOPRJ-cv9K2ibtRW4Y1gKboAIRro",
  authDomain: "facebook-clone-fa759.firebaseapp.com",
  projectId: "facebook-clone-fa759",
  storageBucket: "facebook-clone-fa759.appspot.com",
  messagingSenderId: "840523631419",
  appId: "1:840523631419:web:7d43a46760376e7474451e",
};

// Initialize Firebase with singleton
const app = !getApps().lenght ? initializeApp(firebaseConfig) : getApps();
const db = getFirestore();
const storage = getStorage();

export { app, db, storage };
