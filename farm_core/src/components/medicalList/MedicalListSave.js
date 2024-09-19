import React, { useState, useEffect } from "react";
import styles from "./MedicalListSave.module.scss";
import { useNavigate } from "react-router-dom";
import kroDate from "../../utils/korDate";
import MedicalListEdit from "./MedicalListEdit";
import { fetchFarmDocumentByEmail } from "../../firebase";

function MedicalListSave() {
  const [medicalData, setMedicalData] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (email) {
      const fetchData = async () => {
        try {
          const document = await fetchFarmDocumentByEmail(email);
          console.log("Fetched document:", document);
          if (document) {
            setMedicalData(document); // 데이터 설정
          }
        } catch (error) {
          console.error("문서 검색 실패:", error.message || error);
        }
      };

      fetchData();
    }
  }, []);

  const toggleDetail = () => {
    setShowDetail((prev) => !prev);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  if (!medicalData) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className={styles.save}>
      <div className="info_wrapper" onClick={toggleDetail}>
        <div className={styles.email}>{medicalData.email}</div>
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
            <strong>공통 증상:</strong> {medicalData.symptom}
          </p>
          <p>
            <strong>영향을 받은 가축 수:</strong> {medicalData.symptomCount}
          </p>
          <p>
            <strong>열이 있습니까?</strong>{" "}
            {medicalData.fever ? "예" : "아니요"}
          </p>
          <p>
            <strong>평균 체온:</strong> {medicalData.feverMean}
          </p>
          <p>
            <strong>기침 여부:</strong> {medicalData.cough ? "예" : "아니요"}
          </p>
          <p>
            <strong>기침 빈도:</strong> {medicalData.coughCount}
          </p>
          <p>
            <strong>설사 증상:</strong> {medicalData.diarrhea ? "예" : "아니요"}
          </p>
          <p>
            <strong>설사 횟수:</strong> {medicalData.diarrheaCount}
          </p>
          <p>
            <strong>환기 상태:</strong> {medicalData.ventilation}
          </p>
          <p>
            <strong>조명 상태:</strong> {medicalData.lampCondition}
          </p>
          <p>
            <strong>사료 공급 상태:</strong> {medicalData.feedSupply}
          </p>
        </div>
      )}
      {!editing && <button onClick={handleEdit}>수정하기</button>}
      {editing && (
        <MedicalListEdit medicalData={medicalData} onCancel={handleCancel} />
      )}
    </div>
  );
}

export default MedicalListSave;
