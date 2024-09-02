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
// 필드명 매핑
const fieldNameMapping = {
  "가축 종류": "AnimalType",
  "축사 번호": "BarnNumber",
  "가축 개체번호": "AnimalID",
  "가축 주소": "AnimalLocation",
  "입고 날짜": "EntryDate",
  성별: "Gender",
  크기: "Size",
  무게: "Weight",
  "출생 날짜": "BirthDate",
  섭취량: "FeedIntake",
  "수분 섭취량": "WaterIntake",
  활동량: "ActivityLevel",
  온도: "Temperature",
  "격리 상태": "IsolationStatus",
  "발정기 여부": "EstrusStatus",
  "임신 일자": "PregnancyDate",
  "백신 접종": "Vaccination",
  "질병 및 치료": "DiseasesAndTreatments",
  "출산 횟수": "NumberOfBirths",
  출산일: "BirthDate",
  "출사 예정일": "ExpectedBirthDate",
  "우유 생산량": "MilkProduction",
  "성장 속도": "GrowthRate",
  산란량: "EggProduction",
};

// 필드명을 영어로 변환하는 함수
function convertFieldNamesToEnglish(dataObject) {
  const convertedObject = {};
  for (const [key, value] of Object.entries(dataObject)) {
    const englishKey = fieldNameMapping[key] || key;
    convertedObject[englishKey] = value;
  }
  return convertedObject;
}

async function uploadExcelAndSaveData(file, collectionName) {
  try {
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(new Uint8Array(data), { type: "array" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const headers = jsonData[0]; // 첫 번째 행이 헤더
    const values = jsonData.slice(1); // 두 번째 행부터 값들

    const dataObjects = values.map((row) => {
      const dataObject = headers.reduce((acc, header, index) => {
        acc[header] = row[index];
        return acc;
      }, {});

      // 불필요한 설명 텍스트 제거 (백신 접종 및 질병 및 치료 필드)
      if (typeof dataObject["백신 접종"] === "string") {
        dataObject["백신 접종"] = dataObject["백신 접종"]
          .replace(/.*\((.*)\)/, "$1")
          .split(";")
          .map((entry) => {
            const [백신명, 접종일] = entry.split("(");
            return {
              백신명: 백신명.trim(),
              접종일: 접종일 ? 접종일.replace(")", "").trim() : null,
              가축개체번호: dataObject["가축 개체번호"],
            };
          });
      }

      if (typeof dataObject["질병 및 치료"] === "string") {
        dataObject["질병 및 치료"] = dataObject["질병 및 치료"]
          .replace(/.*\((.*)\)/, "$1")
          .split(";")
          .map((entry) => {
            const [질병명, 치료일] = entry.split("(");
            return {
              질병명: 질병명.trim(),
              치료일: 치료일 ? 치료일.replace(")", "").trim() : null,
              가축개체번호: dataObject["가축 개체번호"],
            };
          });
      }

      // 필드명을 영어로 변환
      return convertFieldNamesToEnglish(dataObject);
    });

    // Firestore에 저장
    const collectionRef = collection(db, collectionName);
    for (const dataObject of dataObjects) {
      await addDoc(collectionRef, dataObject);
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
  getUserAuth,
  uploadExcelAndSaveData,
};
export default app;
