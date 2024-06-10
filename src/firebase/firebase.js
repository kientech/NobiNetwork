import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAb-kKo3ybZ4uXzcVuqX6VPETq7d05UpE0",
  authDomain: "nobinetwork-784bb.firebaseapp.com",
  projectId: "nobinetwork-784bb",
  storageBucket: "nobinetwork-784bb.appspot.com",
  messagingSenderId: "287548946120",
  appId: "1:287548946120:web:11668ffbe3cdde9b9317fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
