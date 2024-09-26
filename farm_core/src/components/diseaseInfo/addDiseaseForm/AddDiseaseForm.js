import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addDisease } from "../../../store/diseaseSlice/diseaseSlice";
import styles from "./AddDiseaseForm.module.scss";
function AddDiseaseForm({ onClose, selectedAnimal, onDiseaseAdded }) {
  const dispatch = useDispatch();
  const [diseaseName, setDiseaseName] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [diagnosisTool, setDiagnosisTool] = useState("");
  const [therapy, setTherapy] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 새로운 질병 추가 객체 생성
    const newDisease = {
      diseaseName,
      symptoms,
      diagnosisTool,
      therapy,
    };

    // handleDiseaseAdded 호출
    onDiseaseAdded(newDisease);

    // 입력 필드 초기화
    setDiseaseName("");
    setSymptoms("");
    setDiagnosisTool("");
    setTherapy("");
  };

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <h3>질병 추가</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="질병 이름"
            value={diseaseName}
            onChange={(e) => setDiseaseName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="증상"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="진단 도구"
            value={diagnosisTool}
            onChange={(e) => setDiagnosisTool(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="치료법"
            value={therapy}
            onChange={(e) => setTherapy(e.target.value)}
            required
          />
          <button type="submit">추가</button>
          <button type="button" onClick={onClose}>
            취소
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDiseaseForm;
