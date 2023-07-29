import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyAlUmnnSDkFzqeP6vM8Orj0Yuy4HClKFRg",
  authDomain: "superchat-b387c.firebaseapp.com",
  databaseURL: "https://superchat-b387c-default-rtdb.firebaseio.com",
  projectId: "superchat-b387c",
  storageBucket: "superchat-b387c.appspot.com",
  messagingSenderId: "374332206299",
  appId: "1:374332206299:web:18c6c4f49b26d0c96ef0fe"
};
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
