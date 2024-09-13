import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MedicalListSave.module.scss";
import kroDate from "../../utils/korDate";
import MedicalListEdit from "./MedicalListEdit";

function MedicalListSave({ email, authorizedEmail }) {
  const [showDetail, setShowDetail] = useState(false);
  const [editing, setEditing] = useState(false);
  const [medicalData, setMedicalData] = useState({});

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
