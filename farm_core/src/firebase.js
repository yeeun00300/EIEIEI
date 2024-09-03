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
  try {
    const docRef = await addDoc(collection(db, collectionName), userObj);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id; // 문서 ID 반환
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error(error.message); // 에러 메시지 반환
  }
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

// export const joinUser = async (uid, email) => {
//   try {
//     const userRef = doc(db, "users", uid);
//     console.log(`Attempting to create or update user with UID: ${uid}`);
//     await setDoc(
//       userRef,
//       {
//         email: email,
//         createdAt: new Date(),
//       },
//       { merge: true }
//     );
//     console.log(`${uid}`);
//   } catch (error) {
//     console.error(error);
//   }
// };
//     if (docSnap.exists()) {
//       return docSnap.data();
//     } else {
//       return;
//     }
//   } catch (error) {
//     console.log("불러 올수 없습니다.", error);
//   }
// }
export const uploadFiles = async (file) => {
  const storageRef = ref(storage, `admin01/profileImgs/${file.name}`);

  try {
    console.log("Uploading file:", file); // 파일 정보 확인
    const snapshot = await uploadBytes(storageRef, file);
    console.log("Upload snapshot:", snapshot); // 스냅샷 정보 확인
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("Download URL:", downloadURL); // 다운로드 URL 확인
    return downloadURL;
  } catch (error) {
    console.error("Upload failed:", error.message); // 오류 메시지 출력
    throw error;
  }
};

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
  "실제 백신 접종 데이터": "Vaccination", // 실 데이터 필드만 사용
  "실제 질병 및 치료 데이터": "DiseasesAndTreatments", // 실 데이터 필드만 사용
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
    // "(예시)"가 포함된 필드들을 필터링
    if (!key.includes("(예시)")) {
      const englishKey = fieldNameMapping[key] || key;
      convertedObject[englishKey] = value;
    }
  }
  return convertedObject;
}

// 특수 필드의 값을 배열로 처리하는 함수
function processSpecialFields(dataObject) {
  const specialFields = ["Vaccination", "DiseasesAndTreatments"];
  specialFields.forEach((field) => {
    if (dataObject[field] && typeof dataObject[field] === "string") {
      const values = dataObject[field]
        .split(";")
        .map((entry) => {
          const [name, date] = entry.split("(");
          return {
            name: name.trim(),
            date: date ? date.replace(")", "").trim() : null,
          };
        })
        .filter((entry) => entry.name); // name이 있는 항목만 필터링
      dataObject[field] = values;
    } else {
      dataObject[field] = []; // 필드가 없거나 빈 문자열일 경우 빈 배열로 설정
    }
  });
  return dataObject;
}

// 엑셀 데이터 업로드 및 처리
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
        acc[header] = row[index] !== undefined ? row[index] : null; // undefined를 null로 변환
        return acc;
      }, {});

      // 필드명을 영어로 변환
      let convertedObject = convertFieldNamesToEnglish(dataObject);

      // 특수 필드 처리
      convertedObject = processSpecialFields(convertedObject);

      // undefined 값을 null로 변환
      for (const key in convertedObject) {
        if (convertedObject[key] === undefined) {
          convertedObject[key] = null;
        }
      }

      // Firestore에 전송하기 전에 데이터 확인
      console.log("Firestore에 저장 전 최종 데이터:", convertedObject);

      return convertedObject;
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

// 엑셀파일을 스토리지에서 다운로드 받을수있도록 하는것

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
