import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCpAcysBc8WK9qC05sZh7KmcjeXZe3OHOw",
  authDomain: "deneme-9caad.firebaseapp.com",
  projectId: "deneme-9caad",
  storageBucket: "deneme-9caad.appspot.com",
  messagingSenderId: "661189151989",
  appId: "1:661189151989:web:9a7655af0659746763c9bc"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);