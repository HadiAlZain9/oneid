import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCEZaNalZkU6z4OJU1wxBgGgTkMnYtqgHc",
  authDomain: "oneid-9de96.firebaseapp.com",
  projectId: "oneid-9de96",
  storageBucket: "oneid-9de96.firebasestorage.app",
  messagingSenderId: "486310331898",
  appId: "1:486310331898:web:1cad1a6c3d135633345043",
  measurementId: "G-LKZNN9P5R3"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
