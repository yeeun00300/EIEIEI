import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";

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

function getUserAuth() {
  return auth;
}
// console.log(auth);

function getCollection(collectionName) {
  return collection(db, collectionName);
}

async function addDatas(collectionName, userObj) {
  await addDoc(getCollection(collectionName), userObj);
}
const checkUserIdExists = async (userid) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("id", "==", userid));

  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};

async function getLastNum(collectionName, field) {
  const q = query(
    collection(db, collectionName),
    orderBy(field, "desc"),
    limit(1)
  );
  const lastDoc = await getDocs(q);
  if (lastDoc.docs.length === 0) return 0;
  const lastNum = lastDoc.docs[0].data()[field];
  return lastNum;
}
function getQuery(collectionName, queryOptions) {
  const { conditions = [], orderBys = [], limits } = queryOptions;
  const collect = getCollection(collectionName);
  let q = query(collect);

  conditions.forEach((condition) => {
    q = query(q, where(condition.field, condition.operator, condition.value));
  });

  orderBys.forEach((order) => {
    q = query(q, orderBy(order.field, order.direction || "asc"));
  });

  q = query(q, limit(limits));

  return q;
}

async function getDatas(collectionName, queryOptions) {
  const q = getQuery(collectionName, queryOptions);
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const resultData = docs.map((doc) => ({
    ...doc.data(),
    docId: doc.id,
  }));
  return resultData;
}

async function addDisease(animalType, diseaseId, diseaseData) {
  try {
    const diseaseRef = collection(db, "disease", animalType, "disease");
    await setDoc(doc(diseaseRef, diseaseId), diseaseData);
    console.log("데이터가 성공적으로 추가되었습니다.");
  } catch (error) {
    console.error("데이터 추가 중 오류 발생:", error);
  }
}

async function getDisease(animalType, diseaseId) {
  try {
    const diseaseRef = doc(db, "disease", animalType, "disease");
    const docSnap = await getDoc(diseaseRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return;
    }
  } catch (error) {
    console.log("불러 올수 없습니다.", error);
  }
}

export const joinUser = async (uid, userData) => {
  const db = getDatabase();
  try {
    await set(ref(db, `users/${uid}`), userData);
    console.log("User data saved successfully");
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
};

export { db, addDatas, getDatas, addDisease, getDisease, checkUserIdExists };
export default app;
