import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDfXCjYCaSV4muFOhpUUMQmoGFv95zRWAw",
  authDomain: "cata-6fd62.firebaseapp.com",
  projectId: "cata-6fd62",
  storageBucket: "cata-6fd62.firebasestorage.app",
  messagingSenderId: "263077809711",
  appId: "1:263077809711:web:38226c0fb35945d255c0da",
};

export function getFirebaseServices() {
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

  return {
    auth: getAuth(app),
    db: getFirestore(app),
  };
}
