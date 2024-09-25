import React, { useState } from "react";
import { diseaseData } from "../../utils/Disease";
import styles from "./DiseaseInfo.module.scss";
import cow from "../../img/한우얼굴.png";
import pork from "../../img/양돈얼굴.png";
import chicken from "../../img/양계얼굴.png";
import MyStockPage from "../MyStockPage/MyStockPage";
import MyStockAddPage from "../../pages/MyStockAddPage/MyStockAddPage";
import MonthPractice from "../diseaseMonth/MonthPractice";

function DiseaseInfo() {
  const [selectedAnimal, setSelectedAnimal] = useState("cows");
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleSelectAnimal = (animal) => {
    setSelectedAnimal(animal);
    setSelectedDisease(null);
    setCurrentPage(1); // Reset to first page when animal changes
  };

  const handleSelectDisease = (disease) => {
    setSelectedDisease(selectedDisease === disease ? null : disease);
  };

  const filteredDiseases = diseaseData[selectedAnimal].filter((disease) =>
    disease.diseaseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the number of pages
  const totalPages = Math.ceil(filteredDiseases.length / itemsPerPage);

  // Get current diseases to display
  const indexOfLastDisease = currentPage * itemsPerPage;
  const indexOfFirstDisease = indexOfLastDisease - itemsPerPage;
  const currentDiseases = filteredDiseases.slice(
    indexOfFirstDisease,
    indexOfLastDisease
  );

  const closeModal = () => {
    setSelectedDisease(null);
  };

  return (
    <div className="container">
      <div className={styles.headerTitle}>
        <h1>질병 사전</h1>
        <h2>가축 종류 선택</h2>
      </div>
      <div className={styles.boxContainer}>
        <div className="text-center mb-4">
          <div className={styles.imgBox}>
            <button
              className={`${styles.btn} btn btn-primary mx-2`}
              onClick={() => handleSelectAnimal("cows")}
            >
              <img src={cow} className={styles.Img} />
            </button>
            <button
              className={`${styles.btn} btn btn-success mx-2`}
              onClick={() => handleSelectAnimal("pigs")}
            >
              <img src={pork} className={styles.Img} />
            </button>
            <button
              className={`${styles.btn} btn btn-warning mx-2`}
              onClick={() => handleSelectAnimal("chickens")}
            >
              <img src={chicken} className={styles.Img} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.rowBox}>
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
          {currentDiseases.map((disease, index) => (
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

        {/* Pagination controls */}
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={styles.prevBtn}
          >
            이전
          </button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={styles.nextBtn}
          >
            다음
          </button>
        </div>
      </div>
      {/* <MyStockAddPage /> */}
    </div>
  );
}

export default DiseaseInfo;
