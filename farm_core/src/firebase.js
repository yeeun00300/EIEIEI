import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  uploadBytes,
  uploadBytesResumable,
  ref,
  deleteObject,
} from "firebase/storage";
import * as XLSX from "xlsx";
import { v4 as uuidv4 } from "uuid";
import kroDate from "./utils/korDate";
import { createPath } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./store/userInfoEditSlice/UserInfoEditSlice";

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
    // console.log("Document written with ID: ", docRef.id);
    return docRef.id; // 문서 ID 반환
  } catch (error) {
    console.error("Error adding document: ", error);
    throw new Error(error.message); // 에러 메시지 반환
  }
}
// docID를 가지는 필드이름에 배열 중 마지막에 추가하는 함수
async function addFieldArray(collectionName, docId, fieldName, userObj) {
  try {
    const Ref = doc(db, collectionName, docId);
    const docSnap = await getDoc(Ref);
    // 기존배열을 가져옴
    const snapshot = docSnap.data()[`${fieldName}`];
    // 기존배열에 새로운 객체 추가
    snapshot.push(userObj);
    const resultData = { [fieldName]: snapshot };
    // 새로운 배열 업데이트
    const docRef = await updateDatas(collectionName, docId, resultData);
    // 새로운 하위 컬렉션(채팅방) 추가
    // const ordersCollectionRef = collection(userDocRef, userObj.name);
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
    q = query(q, orderBy(order.field, order.direction || "desc"));
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

async function getData(collectionName, queryOptions) {
  const q = getQuery(collectionName, queryOptions);
  const snapshot = await getDocs(q);
  const doc = snapshot.docs[0];
  const resultData = { ...doc.data(), docId: doc.id };
  return resultData;
}

async function deleteDatas(collectionName, docId) {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.log("error Delete", error);
  }
}

async function getDataAll(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);

  return snapshot;
}

export const uploadFiles = async (file) => {
  const storageRef = ref(storage, `admin01/profileImgs/${file.name}`);
  console.log(`프로필 이미지확인:${file.name}`);
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
// export const checkUserInFirestore = async (email) => {
//   try {
//     const userDoc = doc(db, "users", email);
//     const docSnap = await getDoc(userDoc);
//     if (docSnap.exists()) {
//       console.log(`303유저 정보확인:${docSnap}`);
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     console.error("Error checking user in Firestore:", error);
//     return false;
//   }
// };

export const checkUserInFirestore = async (email) => {
  try {
    console.log("Checking user in Firestore with email:", email); // 입력된 이메일 확인
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      console.log(`유저 정보 확인: ${email}`);
      return true;
    } else {
      console.log(`유저 정보 없음: ${email}`);
      return false;
    }
  } catch (error) {
    console.error("Error checking user in Firestore:", error);
    return false;
  }
};

// 필드명 매핑
const fieldNameMapping = {
  "가축 종류": "stockType",
  "가축 코드": "stockCode",
  품종: "variety",
  "축사 번호": "farmId",
  "가축 개체번호": "stockId",
  "가축 주소": "farmAddress",
  "입고 날짜": "incomingDate",
  성별: "sex",
  크기: "size",
  무게: "weight",
  "출생 날짜": "birthDate",
  섭취량: "feed",
  활동량: "activity",
  온도: "temp",
  "격리 상태": "isolation",
  "발정기 여부": "mating",
  "임신 날짜": "pregnantDate",
  "백신 접종 데이터": "vaccine",
  "질병 및 치료 데이터": "disease",
  "출산 횟수": "breedCount",
  "출산 날짜": "breedDate",
  "출산 예정 날짜": "breedDueDate",
  "우유 생산량": "milk",
  "폐사 여부": "deceased",
  산란량: "eggProduction",
};

// 필드명을 영어로 변환하는 함수
function convertFieldNamesToEnglish(dataObject) {
  const convertedObject = {};
  for (const [key, value] of Object.entries(dataObject)) {
    // "(양식)"가 포함된 필드들을 필터링
    if (!key.includes("(양식")) {
      const englishKey = fieldNameMapping[key] || key;
      convertedObject[englishKey] = value;
    }
  }
  return convertedObject;
}

// 특수 필드의 값을 배열로 처리하는 함수
function processSpecialFields(dataObject) {
  const specialFieldsMapping = {
    vaccine: ["vaccineType", "vaccineDate"],
    disease: ["diseaseType", "diseaseDate"],
  };

  Object.keys(specialFieldsMapping).forEach((field) => {
    if (dataObject[field] && typeof dataObject[field] === "string") {
      // 문자열을 객체 배열로 변환
      const entries = dataObject[field]
        .split(";")
        .map((entry) => entry.trim())
        .filter((entry) => entry);

      dataObject[field] = entries.map((entry) => {
        const [type, date] = entry.split("(");
        const datePart = date ? date.replace(")", "").trim() : null;
        return {
          [specialFieldsMapping[field][0]]: type.trim(), // vaccineType or diseaseType
          [specialFieldsMapping[field][1]]: datePart, // vaccineDate or diseaseDate
        };
      });
    } else if (dataObject[field] && Array.isArray(dataObject[field])) {
      // 이미 배열일 경우 변환
      dataObject[field] = dataObject[field].map((item) => {
        const [type, date] = item.split("(");
        const datePart = date ? date.replace(")", "").trim() : null;
        return {
          [specialFieldsMapping[field][0]]: type.trim(), // vaccineType or diseaseType
          [specialFieldsMapping[field][1]]: datePart, // vaccineDate or diseaseDate
        };
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

    // localStorage에서 이메일 값을 가져옴
    const email = localStorage.getItem("email");

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

      // 이메일 필드를 추가
      convertedObject.email = email;

      // Firestore에 전송하기 전에 데이터 확인
      console.log("Firestore에 저장 전 최종 데이터:", convertedObject);

      return convertedObject;
    });

    // Firestore에 저장
    const db = getFirestore(); // Firestore 인스턴스 가져오기
    const collectionRef = collection(db, collectionName);
    for (const dataObject of dataObjects) {
      await addDoc(collectionRef, dataObject);
    }

    console.log("엑셀 파일 업로드 및 Firestore 저장이 완료되었습니다.");
  } catch (error) {
    console.error("엑셀 파일 업로드 및 Firestore 저장 중 오류 발생:", error);
  }
}

async function updateDatas(collectionName, docId, updateObj) {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, updateObj);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      throw new Error("문서가 존재하지 않습니다."); // 문서가 없을 경우 오류 던지기
    }

    const resultData = { ...snapshot.data(), docId: snapshot.id };
    return resultData;
  } catch (error) {
    console.log("Error Update", error);
    throw error; // 에러를 던져서 호출하는 쪽에서 처리하게 하기
  }
}
// 게시판

// 게시글 가져오기
async function getCommunityDatas(collectionName, queryOptions) {
  // if (!collectionName) {
  //   throw new Error("Collection name cannot be empty");
  // }

  try {
    const colRef = collection(db, "community");
    let q = query(colRef);

    if (queryOptions) {
      const { conditions = [], orderBys = [], limits } = queryOptions;

      // communityType을 조건에 추가
      if (queryOptions.communityType) {
        conditions.push({
          field: "communityType",
          operator: "==",
          value: queryOptions.communityType,
        });
      }

      conditions.forEach((condition) => {
        q = query(
          q,
          where(condition.field, condition.operator, condition.value)
        );
      });

      orderBys.forEach((order) => {
        q = query(q, orderBy(order.field, order.direction || "asc"));
      });

      if (limits) {
        q = query(q, limit(limits));
      }
    }

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  } catch (error) {
    console.error("Error fetching community data:", error);
    throw new Error(error.message);
  }
}
// 이미지 업로드
const uploadImage = (folder, file) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    const fileName = `${folder}${uuidv4()}`; // 파일 이름에 UUID 추가
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // 진행 상태 모니터링
      },
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            resolve(downloadURL);
          })
          .catch((error) => {
            reject(error);
          });
      }
    );
  });
};
// 게시글 추가
async function addCommunityDatas(collectionName, dataObj) {
  try {
    // 이미지가 있을 경우 업로드 후 URL 반환
    // if (dataObj.imgUrl) {
    //   const uuid = uuidv4(); // UUID로 고유 이미지 경로 생성
    //   const url = await uploadImage(`community/${uuid}`, dataObj.imgUrl); // 고유 경로와 이미지 파일을 함께 업로드
    //   dataObj.imgUrl = url; // 업로드한 이미지의 URL 할당
    // }

    // 타임스탬프 추가
    const time = new Date().getTime();
    dataObj.createdAt = time;
    dataObj.updatedAt = time;

    // Firestore에 게시글 추가
    const collect = collection(db, "community");
    const result = await addDoc(collect, dataObj);

    const docSnap = await getDoc(result);

    const postId = docSnap.id;
    dataObj.postId = postId;

    // 생성된 문서의 데이터 반환
    return { ...docSnap.data(), docId: docSnap.id, postId: docSnap.id };
  } catch (error) {
    console.error(error);
    return false;
  }
}
// 게시글 업데이트
export const updateCommunityDatas = async (id, updates, imgUrl) => {
  try {
    const postRef = doc(db, "community", id);
    const time = new Date().getTime();

    // 이미지 파일을 변경했을 때
    if (imgUrl && updates.imgUrl && imgUrl !== updates.imgUrl) {
      const storage = getStorage();
      const deleteRef = ref(storage, imgUrl);
      await deleteObject(deleteRef);

      // 변경한 사진을 스토리지에 저장
      const url = await uploadImage(createPath("community/"), updates.imgUrl);
      updates.imgUrl = url;
    } else if (updates.imgUrl === null) {
      // 사진 파일을 변경하지 않았거나 imgUrl이 null일 때
      delete updates["imgUrl"];
    }

    // updatedAt 필드에 현재 시간 추가
    updates.updatedAt = time;

    // 문서 필드 데이터 수정
    await updateDoc(postRef, updates);
    const docSnap = await getDoc(postRef);
    const resultData = { ...docSnap.data(), id: docSnap.id };

    return resultData;
  } catch (error) {
    throw new Error(error.message);
  }
};

// 게시글 삭제 함수
export const deleteCommunityDatas = async (id) => {
  try {
    const postRef = doc(db, "community", id);
    await deleteDoc(postRef);
    return id;
  } catch (error) {
    console.error("Error deleting community data:", error);
    throw new Error(error.message);
  }
};
// 댓글 작성 파트
// 댓글 추가
export const addComment = async (postId, comment) => {
  try {
    console.log("댓글 추가 데이터:", comment); // 로그 추가

    const commentsRef = collection(db, "community", postId, "comments");
    await addDoc(commentsRef, {
      subContent: comment.subContent, // 새로운 필드 이름
      subCreatedAt: new Date().getTime(), // 생성 시간
      nickname: comment.nickname, // 사용자 닉네임
      email: comment.email,
      profileImage: comment.profileImage,
      subDeclareCount: comment.subDeclareCount,
      subDeclareReason: comment.subDeclareReason,
      subDeclareState: comment.subDeclareState,
      subDeclareReason: comment.subDeclareReason, // 추가된 필드
      subDeclareCount: comment.subDeclareCount, // 추가된 필드
      subDeclareState: comment.subDeclareState, // 추가된 필드
    });
  } catch (error) {
    console.error("댓글 추가 실패:", error);
  }
};
// 댓글 목록 가져오기
export const getComments = async (postId) => {
  try {
    const commentsRef = collection(db, "community", postId, "comments");
    const q = query(commentsRef, orderBy("subCreatedAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("댓글 목록 가져오기 실패:", error);
    return [];
  }
};
export const updateComment = async (postId, commentId, updatedContent) => {
  try {
    const commentRef = doc(db, "community", postId, "comments", commentId);
    await updateDoc(commentRef, {
      subContent: updatedContent,
      subUpdatedAt: Timestamp.fromDate(new Date()),
    });
    console.log("댓글 수정 성공!");
  } catch (error) {
    console.error("댓글 수정 실패:", error);
  }
};
export const deleteComment = async (postId, commentId) => {
  try {
    const commentRef = doc(db, "community", postId, "comments", commentId);
    await deleteDoc(commentRef);
  } catch (error) {
    console.error("댓글 삭제 실패:", error);
  }
};

const uploadProfileImage = async (file) => {
  const storage = getStorage();
  const storageRef = ref(storage, `profile_images/${file.name}`);

  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
};

async function addMessage(collectionName, docId, subCollectionName, addObj) {
  try {
    // 1. 먼저 부모 컬렉션 'users'의 특정 문서 'userId'에 접근
    const userDocRef = doc(db, collectionName, docId);

    // 2. 그 문서 안에 'orders' 서브컬렉션을 생성하고 데이터를 추가
    const ordersCollectionRef = collection(userDocRef, subCollectionName);

    // 3. 서브컬렉션 'orders'에 새 문서를 생성하고 데이터 추가
    await setDoc(doc(ordersCollectionRef), {
      ...addObj,
      createdAt: new Date(),
    });

    // console.log("서브컬렉션에 데이터 추가 완료!");
  } catch (error) {
    console.error("Error adding subcollection document: ", error);
  }
}
async function getSubCollection(collectionName, docId, subCollectionName) {
  // const email = localStorage.getItem("email");
  try {
    // 1. 부모 컬렉션 'users'의 특정 문서 'userId'에 접근
    const userDocRef = doc(db, collectionName, docId);
    // 2. 그 문서 안의 'orders' 서브컬렉션에 접근
    const ordersCollectionRef = collection(userDocRef, subCollectionName);
    // 3. 서브컬렉션 'orders'에서 모든 문서를 가져옴
    const querySnapshot = await getDocs(ordersCollectionRef);
    const docs = querySnapshot.docs;
    const resultData = docs.map((doc) => {
      // console.log(`${doc.id} => `, { ...doc.data(), docId: doc.id });
      const result = { ...doc.data(), docId: doc.id };
      return result;
      // const filteredData = result.filter((item) => item.docId === email);
      // return filteredData[0];
    });
    return resultData;
  } catch (error) {
    // console.error("Error getting subCollection documents: ", error);
  }
}

const addFarmDataWithSubcollections = async (farmData, subCollections) => {
  try {
    // 새 문서 추가
    const farmDocRef = doc(collection(db, "farm")); // 새로운 문서 생성
    const docId = farmDocRef.id; // 새로 생성된 문서의 ID

    // 문서 데이터 설정
    await setDoc(farmDocRef, farmData, { merge: true });

    // 하위 컬렉션 추가
    const farmCureListRef = collection(farmDocRef, "farmCureList");
    for (const item of subCollections.farmCureList) {
      await addDoc(farmCureListRef, item);
    }

    const ruinInfoRef = collection(farmDocRef, "ruinInfo");
    for (const [docId, data] of Object.entries(subCollections.ruinInfo)) {
      await setDoc(doc(ruinInfoRef, docId), data);
    }

    const vaccineRef = collection(farmDocRef, "vaccine");
    for (const item of subCollections.vaccine) {
      await addDoc(vaccineRef, item);
    }

    const diseaseRef = collection(farmDocRef, "disease");
    for (const item of subCollections.disease) {
      await addDoc(diseaseRef, item);
    }

    alert("Farm data and subcollections added successfully.");
    return docId; // 새로운 문서의 ID 반환
  } catch (error) {
    console.error("Error adding farm data and subcollections:", error);
    throw error; // 오류를 throw 하여 호출 측에서 처리
  }
};

export const fetchFarmDocumentByEmail = async (email) => {
  try {
    const q = query(collection(db, "farm"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    // 쿼리 결과가 비어 있는지 확인
    if (!querySnapshot.empty) {
      // 문서가 있을 경우, id와 데이터를 가져옵니다.
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return documents; // 배열 형태로 반환
    } else {
      // 문서가 없을 경우 빈 배열 반환
      console.warn("No documents found for the given email");
      return []; // 빈 배열 반환
    }
  } catch (error) {
    // 에러가 발생했을 때의 처리
    console.error("Error fetching documents:", error.message || error);
    return []; // 빈 배열 반환
  }
};

function useFetchCollectionData(collectionName, fetchAction) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getUserAuth(), (user) => {
      if (user) {
        const email = user.email;
        const queryOptions = {
          conditions: [
            {
              field: "email",
              operator: "==",
              value: email,
            },
          ],
        };

        dispatch(fetchAction({ collectionName, queryOptions }))
          .then((resultAction) => {
            if (fetchAction.fulfilled.match(resultAction)) {
              const userData = resultAction.payload;
              console.log("Fetched data with IDs from Redux: ", userData);

              // 예: 첫 번째 문서 ID
              if (userData.length > 0) {
                const firstDocumentId = userData[0].docId; // 'docId'로 문서 ID 접근
                console.log("First document ID: ", firstDocumentId);
              }
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    });

    return () => unsubscribe();
  }, [dispatch, collectionName, fetchAction]);
}

// 결제를 이력으로 남기기
async function addPaymentHistory(collectionName, docId, paymentInfo) {
  const docRef = doc(db, collectionName, docId);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    const docData = docSnapshot.data();
    const paymentHistory = docData.paymentHistory || [];

    paymentHistory.push(paymentInfo);

    await updateDoc(docRef, {
      paymentHistory: paymentHistory,
    });
  } else {
    console.error("문서가 존재하지 않습니다");
  }
}

const testUploadImg = async (file) => {
  const storage = getStorage();
  const fileName = `${Date.now()}_${file.name}`; // 고유한 파일 이름 생성
  const storageRef = ref(storage, `profile_images/${fileName}`);

  try {
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("파일 업로드 실패:", error);
    throw error; // 오류 발생 시 호출자에게 전달
  }
};
// 축사 정보 수정
const updateFarmDocument = async (id, data) => {
  const docRef = doc(db, "farm", id); // 'farm' 컬렉션의 문서 참조
  await setDoc(docRef, data, { merge: true }); // merge 옵션 사용
};

const updateSubcollectionDocument = async (
  id,
  subcollectionName,
  docId,
  data
) => {
  try {
    const docRef = doc(db, "farm", id, subcollectionName, docId); // 서브컬렉션 문서 참조
    console.log("문서 참조:", docRef.path); // 문서 로직
    await setDoc(docRef, data, { merge: true }); // 병합 옵션 사용
    console.log("문서가 성공적으로 업데이트되었습니다."); // 성공의 연속
  } catch (error) {
    console.error("하위 컬렉션 문서 업데이트 오류: ", error);
  }
};

const deleteFarmDocument = async (docId) => {
  const docRef = doc(db, "farm", docId); // "farm" 컬렉션에서 해당 문서 참조
  await deleteDoc(docRef); // 문서 삭제
};

// 위젯 업데이트 함수
async function saveFarmLayout(docId, newLayout) {
  const docRef = doc(db, "farm", docId);
  try {
    await updateDoc(docRef, {
      userFarmLayout: JSON.stringify(newLayout), // 실제 저장하고자 하는 필드 이름으로 변경
    });
    console.log("레이아웃이 성공적으로 저장되었습니다.");
  } catch (error) {
    console.error("레이아웃 저장 중 오류 발생:", error);
  }
}
// 위젯 불러오는 함수
export const fetchFarmLayout = async (docId) => {
  const docRef = doc(db, "farm", docId);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const savedLayout = JSON.parse(docSnap.data().userFarmLayout);
      return savedLayout; // 레이아웃 데이터를 복원하여 반환
    } else {
      console.log("해당 문서가 없습니다!");
      return null;
    }
  } catch (error) {
    console.error("레이아웃 불러오기 중 오류 발생:", error);
    return null;
  }
};

export {
  db,
  getCollection,
  addDatas,
  addFieldArray,
  getData,
  getDatas,
  getDataAll,
  checkUserIdExists,
  uploadFile,
  getUserAuth,
  uploadExcelAndSaveData,
  updateDatas,
  addCommunityDatas,
  getCommunityDatas,
  uploadImage,
  getQuery,
  deleteDatas,
  addMessage,
  getSubCollection,
  app,
  auth,
  storage,
  uploadProfileImage,
  addFarmDataWithSubcollections,
  useFetchCollectionData,
  addPaymentHistory,
  testUploadImg,
  updateFarmDocument,
  updateSubcollectionDocument,
  deleteFarmDocument,
  saveFarmLayout,
};
export default app;
