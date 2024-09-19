import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MedicalListSave.module.scss";
import kroDate from "../../utils/korDate";
import MedicalListEdit from "./MedicalListEdit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

function MedicalListSave({ email, authorizedEmail }) {
  const [showDetail, setShowDetail] = useState(false);
  const [editing, setEditing] = useState(false);
  const [medicalData, setMedicalData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. farm 컬렉션에서 이메일로 문서 찾기
        const farmQuery = query(
          collection(db, "farm"),
          where("email", "==", email)
        );
        const querySnapshot = await getDocs(farmQuery);

        if (!querySnapshot.empty) {
          const farmDoc = querySnapshot.docs[0]; // 첫 번째 일치하는 문서 선택

          // 2. 하위 컬렉션에서 데이터 불러오기
          const subCollectionRef = collection(
            db,
            "farm",
            farmDoc.id,
            "farmCureList"
          );
          const subCollectionSnapshot = await getDocs(subCollectionRef);

          if (!subCollectionSnapshot.empty) {
            const subCollectionData = subCollectionSnapshot.docs.map((doc) =>
              doc.data()
            );
            setMedicalData(subCollectionData[0]); // 첫 번째 하위 문서 데이터 설정
          } else {
            console.log("하위 컬렉션에 데이터가 없습니다.");
          }
        } else {
          console.log("이메일에 해당하는 문서를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [email]);

  const toggleDetail = () => {
    setShowDetail(!showDetail);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <div className={styles.save}>
      <div className="info_wrapper" onClick={toggleDetail}>
        <div className={styles.email}>{email}</div>
        <div className={styles.date}>{kroDate()}</div>
      </div>
      {showDetail && !editing && (
        <div className={styles.details}>
          <h3>상세 정보</h3>
          <p>
            <strong>성명:</strong> {medicalData.name}
          </p>
          <p>
            <strong>전화번호:</strong> {medicalData.phone}
          </p>
          <p>
            <strong>주소:</strong> {medicalData.address}
          </p>
          <p>
            <strong>축사 유형:</strong> {medicalData.barnType}
          </p>
          <p>
            <strong>가축 수:</strong> {medicalData.numberOfAnimals}
          </p>
          <p>
            <strong>공통 증상:</strong> {medicalData.symptoms}
          </p>
          <p>
            <strong>영향을 받은 가축 수:</strong> {medicalData.affectedAnimals}
          </p>
          <p>
            <strong>열이 있습니까?</strong>{" "}
            {medicalData.fever ? "예" : "아니요"}
          </p>
          <p>
            <strong>평균 체온:</strong> {medicalData.temperature}
          </p>
          <p>
            <strong>기침 여부:</strong> {medicalData.cough ? "예" : "아니요"}
          </p>
          <p>
            <strong>기침 빈도:</strong> {medicalData.coughFrequency}
          </p>
          <p>
            <strong>설사 증상:</strong> {medicalData.diarrhea ? "예" : "아니요"}
          </p>
          <p>
            <strong>설사 횟수:</strong> {medicalData.diarrheaFrequency}
          </p>
          <p>
            <strong>환기 상태:</strong> {medicalData.ventilation}
          </p>
          <p>
            <strong>조명 상태:</strong> {medicalData.lighting}
          </p>
          <p>
            <strong>사료 공급 상태:</strong> {medicalData.feed}
          </p>
        </div>
      )}
      {email === authorizedEmail && !editing && (
        <div className={styles.wrapper}>
          <button onClick={handleEdit}>수정하기</button>
        </div>
      )}
      {editing && (
        <MedicalListEdit medicalData={medicalData} onCancel={handleCancel} />
      )}
    </div>
  );
}

export default MedicalListSave;
