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
  "가축 종류": "stockType",
  품종: "variety",
  "축사 번호": "farmId",
  "가축 개체번호": "stockId",
  "가축 주소": "farmAddress",
  "입고 날짜": "incomingDate",
  성별: "sexual",
  크기: "size",
  무게: "weight",
  "출생 날짜": "birthDate",
  섭취량: "feed",
  "수분 섭취량": "drink",
  활동량: "activity",
  온도: "temp",
  "격리 상태": "isolation",
  "발정기 여부": "mating(bool)",
  "임신 일자": "pregnantDate",
  "백신 접종 데이터": "vaccine",
  "질병 및 치료 데이터": "disease",
  "출산 횟수": "breedCount",
  출산일: "birthDate",
  출산일: "breedDate",
  "우유 생산량": "milk",
  "폐사 여부": "ruin(bool)",
  산란량: "EggProduction",
};

// 필드명을 영어로 변환하는 함수
function convertFieldNamesToEnglish(dataObject) {
  const convertedObject = {};
  for (const [key, value] of Object.entries(dataObject)) {
    // "(예시)"가 포함된 필드들을 필터링
    if (!key.includes("(양식")) {
      const englishKey = fieldNameMapping[key] || key;
      convertedObject[englishKey] = value;
    }
  }
  return convertedObject;
}

// 특수 필드의 값을 배열로 처리하는 함수
function processSpecialFields(dataObject) {
  const specialFields = ["vaccine", "disease"];

  specialFields.forEach((field) => {
    if (dataObject[field] && typeof dataObject[field] === "string") {
      // 문자열을 객체 배열로 변환
      const entries = dataObject[field]
        .split(";")
        .map((entry) => entry.trim())
        .filter((entry) => entry);

      dataObject[field] = entries.map((entry) => {
        const [type, details] = entry.split("(");
        const detailsPart = details ? details.replace(")", "") : "";
        return { [type.trim()]: detailsPart };
      });
    } else if (dataObject[field] && Array.isArray(dataObject[field])) {
      // 이미 배열일 경우 변환
      dataObject[field] = dataObject[field].map((item) => {
        const [type, details] = item.split("(");
        const detailsPart = details ? details.replace(")", "") : "";
        return { [type.trim()]: detailsPart };
      });
    } else {
      dataObject[field] = [];
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
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      raw: true,
    });

    const headers = jsonData[0]; // 첫 번째 행이 헤더
    const values = jsonData.slice(1); // 두 번째 행부터 값들

    if (values.length > 30) {
      throw new Error("한 번에 최대 30마리까지만 등록할 수 있습니다.");
    }

    const dataObjects = values.map((row) => {
      const dataObject = headers.reduce((acc, header, index) => {
        let cellValue = row[index] !== undefined ? row[index] : null;

        // 날짜 시리얼 값인지 확인하고 변환
        if (typeof cellValue === "number" && header.includes("날짜")) {
          const jsDate = new Date((cellValue - 25569) * 86400 * 1000); // 엑셀 날짜 시리얼 값을 JavaScript 날짜로 변환
          cellValue = jsDate.toISOString().split("T")[0]; // 'YYYY-MM-DD' 형식으로 변환
        }

        acc[header] = cellValue;
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
  app,
  auth,
};
export default app;
