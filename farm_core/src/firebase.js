import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSerjiLaZai0AzNmCU-b9WkursHA-1DXo",
  authDomain: "eieiei-7f9be.firebaseapp.com",
  projectId: "eieiei-7f9be",
  storageBucket: "eieiei-7f9be.appspot.com",
  messagingSenderId: "639615873656",
  appId: "1:639615873656:web:bd54d387f7f08c2843738d",
  measurementId: "G-3QBNV65HB9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function getUserAuth() {
  return auth;
}

export default app;

// const docRef = await addDoc(collection(db, "users"), {
//   Name: "name",
//   Id: "Id",
//   Password: "password",
//   Email: "email",
// });
// console.log(docRef.id);
