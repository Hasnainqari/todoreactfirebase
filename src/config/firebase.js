import { initializeApp } from "firebase/app";
import { collection, addDoc, getFirestore, deleteDoc, doc, query, onSnapshot, orderBy, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD1KjCtJ7PqXsBIJRlfLMrCIGpqPhh072g",
  authDomain: "dataset-a58e5.firebaseapp.com",
  databaseURL: "https://dataset-a58e5-default-rtdb.firebaseio.com",
  projectId: "dataset-a58e5",
  storageBucket: "dataset-a58e5.appspot.com",
  messagingSenderId: "314191342268",
  appId: "1:314191342268:web:28be2b45eadfc7e3f03eb9",
  measurementId: "G-PKMCXTD7WS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, deleteDoc, query, doc, onSnapshot, orderBy, updateDoc };