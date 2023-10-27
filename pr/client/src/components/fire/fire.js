// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyD9znx2G4EW9Q-7PtsaLJ9Ei-5V18e_4q8",
  authDomain: "blogapp-dce4d.firebaseapp.com",
  projectId: "blogapp-dce4d",
  storageBucket: "blogapp-dce4d.appspot.com",
  messagingSenderId: "675872272703",
  appId: "1:675872272703:web:a7253b38a2ddddd793638a",
  measurementId: "G-MFZB2MK1XL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)