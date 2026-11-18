import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBw4GK2kCNGn4KK32aW6Rnz5VB8TcZcvnk",
  authDomain: "gitdb-2904b.firebaseapp.com",
  projectId: "gitdb-2904b",
  storageBucket: "gitdb-2904b.firebasestorage.app",
  messagingSenderId: "741627116258",
  appId: "1:741627116258:web:a1961f4979eec3bb217cbb",
  measurementId: "G-LNRZC5NTP3"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
