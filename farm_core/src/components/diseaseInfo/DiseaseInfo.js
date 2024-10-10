import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DiseaseInfo.module.scss";
import cow from "../../img/한우얼굴.png";
import pork from "../../img/양돈얼굴.png";
import chicken from "../../img/양계얼굴.png";
import {
  deleteDisease,
  fetchDiseases,
  addDisease,
  updateDisease,
} from "../../store/diseaseSlice/diseaseSlice";
import AddDiseaseForm from "./addDiseaseForm/AddDiseaseForm";
import { updateDatas } from "../../firebase";

function DiseaseInfo() {
  const dispatch = useDispatch();
  const { diseases, loading, error } = useSelector(
    (state) => state.diseaseSlice
  );

  const [selectedAnimal, setSelectedAnimal] = useState("cows");
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddDiseaseForm, setShowAddDiseaseForm] = useState(false);
  const itemsPerPage = 6;

  const userEmail = localStorage.getItem("email");
  const isAdmin = userEmail === "vet@naver.com";

  useEffect(() => {
    dispatch(
      fetchDiseases({ collectionName: "DiseaseInfoMock", queryOptions: {} })
    );
  }, [dispatch, selectedAnimal]);

  const handleSelectAnimal = (animal) => {
    setSelectedAnimal(animal);
    setSelectedDisease(null);
    setCurrentPage(1);
  };

  const handleSelectDisease = (disease) => {
    setSelectedDisease(selectedDisease === disease ? null : disease);
  };

  const handleAddDisease = () => {
    setShowAddDiseaseForm(true);
  };

  const handleDeleteDisease = async (docId) => {
    if (window.confirm("삭제 유무 확인중..")) {
      const resultAction = await dispatch(
        deleteDisease({
          collectionName: "DiseaseInfoMock",
          docId: docId,
        })
      );

      if (deleteDisease.fulfilled.match(resultAction)) {
      } else {
        console.error("삭제 실패:", resultAction.error);
      }
    }
  };

  const handleUpdateDisease = async (diseaseId) => {
    const diseaseToUpdate = diseases.find(
      (disease) => disease.id === diseaseId
    );
    setShowAddDiseaseForm(true);
    setSelectedDisease(diseaseToUpdate); // 선택된 질병 정보 저장
    closeModal();
  };

  // handleDiseaseAdded를 수정하여 질병 수정 기능 구현
  const handleDiseaseAdded = async (newDisease) => {
    const animalIdMap = {
      cows: "cow",
      pigs: "pork",
      chickens: "chicken",
    };

    const animalType = animalIdMap[selectedAnimal];
    const existingDiseases = diseases.filter((disease) =>
      disease.id.startsWith(animalType)
    );

    // 선택된 질병 수정인 경우
    if (selectedDisease) {
      const updatedDisease = {
        ...newDisease,
        id: selectedDisease.id, // 기존 ID 유지
      };

      dispatch(
        await updateDisease({
          collectionName: "DiseaseInfoMock",
          diseaseId: selectedDisease.docId,
          updateObj: updatedDisease,
        })
      );
    } else {
      const newId = `${animalType}${existingDiseases.length + 1}`;
      const diseaseToAdd = {
        ...newDisease,
        id: newId,
      };

      dispatch(
        await addDisease({
          collectionName: "DiseaseInfoMock",
          addObj: diseaseToAdd,
        })
      );
    }
    setShowAddDiseaseForm(false);
  };

  const filteredDiseases = diseases.filter((disease) => {
    const animalIdMap = {
      cows: "cow",
      pigs: "pork",
      chickens: "chicken",
    };

    return (
      disease &&
      disease.id &&
      disease.diseaseName &&
      disease.id.includes(animalIdMap[selectedAnimal]) &&
      disease.diseaseName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredDiseases.length / itemsPerPage);
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
        <div className={styles.diseaseTypeBtn}>
          <div className={styles.imgBox}>
            <button
              className={`${styles.btn} btn btn-primary mx-2`}
              onClick={() => handleSelectAnimal("cows")}
            >
              <img src={cow} className={styles.Img} alt="Cow" />
            </button>
            <button
              className={`${styles.btn} btn btn-success mx-2`}
              onClick={() => handleSelectAnimal("pigs")}
            >
              <img src={pork} className={styles.Img} alt="Pork" />
            </button>
            <button
              className={`${styles.btn} btn btn-warning mx-2`}
              onClick={() => handleSelectAnimal("chickens")}
            >
              <img src={chicken} className={styles.Img} alt="Chicken" />
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

        {loading ? (
          <p>로딩 중...</p>
        ) : error ? (
          <p>에러 발생: {error}</p>
        ) : (
          <div className={`${styles.row} row`}>
            {currentDiseases.length > 0 ? (
              currentDiseases.map((disease, index) => (
                <div className={`col-md-4 mb-3`} key={index}>
                  <div
                    className={styles.card}
                    onClick={() => handleSelectDisease(disease)}
                  >
                    <div className={styles.cardHeader}>
                      <h5 className={styles.diseaseTitle}>
                        {disease.diseaseName}
                      </h5>
                    </div>
                    {isAdmin && (
                      <div className={styles.adminActions}>
                        <button
                          className={`${styles.btnAction} btn btn-danger`}
                          onClick={() => handleDeleteDisease(disease.docId)}
                        >
                          삭제
                        </button>
                        <button
                          className={`${styles.btnAction} btn btn-info`}
                          onClick={() => handleUpdateDisease(disease.id)}
                        >
                          수정
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>등록된 질병이 없습니다.</p>
            )}
          </div>
        )}

        {isAdmin && (
          <div className="text-center">
            <button
              className={`${styles.addButton} btn btn-primary`}
              onClick={handleAddDisease}
            >
              질병 추가
            </button>
          </div>
        )}
        {isAdmin && showAddDiseaseForm && (
          <AddDiseaseForm
            onClose={() => setShowAddDiseaseForm(false)}
            onDiseaseAdded={handleDiseaseAdded}
            selectedAnimal={selectedAnimal}
            diseaseToUpdate={selectedDisease} // 수정할 질병 정보 전달
          />
        )}

        {selectedDisease && !showAddDiseaseForm && (
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
    </div>
  );
}

export default DiseaseInfo;
