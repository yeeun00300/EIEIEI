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
import {
  getDownloadURL,
  getStorage,
  uploadBytes,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import * as XLSX from "xlsx";

const firebaseConfig = {
  apiKey: "AIzaSyBRL6QencG9EqD3fCrDW8zEUOW42s2qtYQ",
  authDomain: "eieiei-ecc0d.firebaseapp.com",
  projectId: "eieiei-ecc0d",
  storageBucket: "eieiei-ecc0d.appspot.com",
  messagingSenderId: "677776091340",
  appId: "1:677776091340:web:7502195734669990197a69",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

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

// async function addDisease(animalType, diseaseId, diseaseData) {
//   try {
//     const diseaseRef = collection(db, "disease", animalType, "disease");
//     await setDoc(doc(diseaseRef, diseaseId), diseaseData);
//     console.log("데이터가 성공적으로 추가되었습니다.");
//   } catch (error) {
//     console.error("데이터 추가 중 오류 발생:", error);
//   }
// }

// async function getDisease(animalType, diseaseId) {
//   try {
//     const diseaseRef = doc(db, "disease", animalType, "disease");
//     const docSnap = await getDoc(diseaseRef);


export const joinUser = async (uid, email) => {
  try {
    const userRef = doc(db, "users", uid);
    await setDoc(userRef, {
      email: email,
      createdAt: new Date(),
    });
    console.log(uid);
  } catch (error) {
    console.error(error);
  }
};
//     if (docSnap.exists()) {
//       return docSnap.data();
//     } else {
//       return;
//     }
//   } catch (error) {
//     console.log("불러 올수 없습니다.", error);
//   }
// }

export const saveUserData = async (userId, userData) => {
  try {
    await setDoc(doc(db, "users", userId), userData);
    console.log("User data saved successfully");
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};
async function uploadFile(file) {
  const storage = getStorage();
  const storageRef = ref(storage, `uploads/${file.name}`);

  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Optionally handle upload progress here
      },
      (error) => {
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
}
async function uploadExcelAndSaveData(file, collectionName) {
  try {
    // 1. 엑셀 파일을 Firebase Storage에 업로드
    const storageRef = ref(storage, `excel_files/${file.name}`);
    await uploadBytes(storageRef, file);

    // 2. 엑셀 파일을 읽어와서 Firestore에 저장
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    // Firestore에 데이터를 저장
    const collectionRef = collection(db, collectionName);

    for (const item of jsonData) {
      await addDoc(collectionRef, item);
    }

    console.log("엑셀 파일 업로드 및 Firestore 저장이 완료되었습니다.");
  } catch (error) {
    console.error("엑셀 파일 업로드 및 Firestore 저장 중 오류 발생:", error);
  }
}
export {
  db,
  addDatas,
  getDatas,
  checkUserIdExists,
  uploadFile,
<<<<<<< HEAD
  getUserAuth,
=======
  uploadExcelAndSaveData,
>>>>>>> f84170dfe6173f37d650d3453355b0f617a89319
};
export default app;
