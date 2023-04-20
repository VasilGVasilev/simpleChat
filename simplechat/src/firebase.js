import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDOPpBPC8glvZ1KhtWG7Kpu_qtIJPlyu_4",
  authDomain: "chat-4829b.firebaseapp.com",
  projectId: "chat-4829b",
  storageBucket: "chat-4829b.appspot.com",
  messagingSenderId: "811847059466",
  appId: "1:811847059466:web:d346fd3bc51cd52513b7f3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
