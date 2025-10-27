import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7X5ImP_B9qT9evU8e3rw1V6oDVP74JZo",
  authDomain: "boxeat-ec544.firebaseapp.com",
  projectId: "boxeat-ec544",
  storageBucket: "boxeat-ec544.firebasestorage.app",
  messagingSenderId: "411768873365",
  appId: "1:411768873365:web:ae2f285e8901ad73f3d69c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
