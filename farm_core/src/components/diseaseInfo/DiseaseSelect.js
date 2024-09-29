import React, { useState } from "react";
import DiseaseInfo from "./DiseaseInfo";
import styles from "./DiseaseSelect.module.scss";
import MonthPractice from "../diseaseMonth/MonthPractice";

function DiseaseSelect(props) {
  const [view, setView] = useState("none"); // 초기 상태는 아무것도 보이지 않음

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="page">
      <div className={styles.headerTitle}></div>
      <div className={styles.boxContainer}>{/* 동물 선택 버튼들 */}</div>

      <div className={styles.rowBox}>{/* 질병 목록 및 검색 입력 */}</div>

      {/* 버튼들 추가 */}
      <div className={styles.buttonContainer}>
        <button
          className="globalBtn"
          onClick={() => handleViewChange("monthPractice")}
        >
          월별 질병 발생 데이터 보기
        </button>
        <button
          className="globalBtn"
          onClick={() => handleViewChange("diseaseDictionary")}
        >
          질병 사전 보기
        </button>
      </div>

      {/* 조건부 렌더링 */}
      {view === "monthPractice" && (
        <div className="container">
          <div className={styles.monthPracticeContainer}>
            <MonthPractice />
          </div>
        </div>
      )}

      {view === "diseaseDictionary" && (
        <div className="container">
          <div className={styles.diseaseDictionaryContainer}>
            <DiseaseInfo />
          </div>
        </div>
      )}
    </div>
  );
}

export default DiseaseSelect;
