import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDgt-3ZDHN0qhFj8sipOKRlRGdRoAdGb8s",
  authDomain: "cscc01-79d1d.firebaseapp.com",
  projectId: "cscc01-79d1d",
  storageBucket: "cscc01-79d1d.firebasestorage.app",
  messagingSenderId: "286865678429",
  appId: "1:286865678429:web:90eb3c49edd0f7a325adb4",
  measurementId: "G-Q0GTQGYSV2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };