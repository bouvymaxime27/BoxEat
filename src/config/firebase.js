
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY || "AIzaSyDemoKey",
  authDomain: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN || "boxeat-demo.firebaseapp.com",
  projectId: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID || "boxeat-demo",
  storageBucket: Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET || "boxeat-demo.appspot.com",
  messagingSenderId: Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: Constants.expoConfig?.extra?.FIREBASE_APP_ID || "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
