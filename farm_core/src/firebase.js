import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

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
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

async function addDatas(collectionName, userObj) {
  await addDoc(getCollection(collectionName), userObj);
}

export { db, addDatas };
export default app;
