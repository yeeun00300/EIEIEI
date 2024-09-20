import React, { useState } from "react";
import { diseaseData } from "../../utils/Disease";
import styles from "./DiseaseInfo.module.scss";
import cow from "../../img/한우얼굴.png";

function DiseaseInfo() {
  const [selectedAnimal, setSelectedAnimal] = useState("cows");
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelectAnimal = (animal) => {
    setSelectedAnimal(animal);
    setSelectedDisease(null);
  };

  const handleSelectDisease = (disease) => {
    setSelectedDisease(selectedDisease === disease ? null : disease);
  };

  const filteredDiseases = diseaseData[selectedAnimal].filter((disease) =>
    disease.diseaseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const closeModal = () => {
    setSelectedDisease(null);
  };

  return (
    <div className="container">
      <h1>질병 사전</h1>

      <div className="text-center mb-4">
        <h2>가축 종류 선택</h2>
        <button
          className={`${styles.btn} btn btn-primary mx-2`}
          onClick={() => handleSelectAnimal("cows")}
        >
          <img src={cow} className={styles.cowImg} />
        </button>
        <button
          className={`${styles.btn} btn btn-success mx-2`}
          onClick={() => handleSelectAnimal("pigs")}
        ></button>
        <button
          className={`${styles.btn} btn btn-warning mx-2`}
          onClick={() => handleSelectAnimal("chickens")}
        >
          닭
        </button>
      </div>

      <div>
        <h2>
          {selectedAnimal === "cows"
            ? "소"
            : selectedAnimal === "pigs"
            ? "돼지"
            : "닭"}{" "}
          질병 목록
        </h2>

        <input
          type="text"
          className={`${styles.formControl} form-control`}
          placeholder="질병 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className={`${styles.row} row`}>
          {filteredDiseases.map((disease, index) => (
            <div className={`col-md-4 mb-3`} key={index}>
              <div
                className={styles.card}
                onClick={() => handleSelectDisease(disease)}
              >
                <div className={styles.cardHeader}>
                  <h5 className="mb-0">{disease.diseaseName}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedDisease && (
          <div className={styles.modalDisease}>
            <div className={styles.modalContent}>
              <span className={styles.close} onClick={closeModal}>
                &times;
              </span>
              <h2>{selectedDisease.diseaseName}</h2>
              <p>
                <strong>증상:</strong> {selectedDisease.symptoms}
              </p>
              <p>
                <strong>진단 도구:</strong> {selectedDisease.diagnosisTool}
              </p>
              <p>
                <strong>치료법:</strong> {selectedDisease.therapy}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiseaseInfo;
