import React, { useState, useEffect } from "react";
import styles from "./MedicalListSave.module.scss";
import kroDate from "../../utils/korDate";
import {
  fetchFarmDocumentByEmail,
  getSubCollection,
  updateSubcollectionDocument,
} from "../../firebase";

function MedicalListSave() {
  const [medicalData, setMedicalData] = useState(null);
  const [subCollectionData, setSubCollectionData] = useState([]);
  const [selectedSubData, setSelectedSubData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (email) {
      const fetchData = async () => {
        try {
          const document = await fetchFarmDocumentByEmail(email);
          if (document && document.length > 0) {
            // Ensure that document is valid and not empty
            setMedicalData(document[0]); // Get the first document (assumed to be a single document)
            const subCollectionData = await getSubCollection(
              "farm",
              document[0].id,
              "farmCureList"
            );
            setSubCollectionData(subCollectionData);
          }
        } catch (error) {
          console.error("문서 검색 실패:", error.message || error);
        }
      };

      fetchData();
    }
  }, []);

  const handleSubDataClick = (data) => {
    setSelectedSubData(data);
    setUpdatedData(data); // 클릭한 데이터를 초기화
    setEditing(false); // 상세보기 시 편집 상태 초기화
  };

  const handleEdit = () => {
    setEditing(true);
    setUpdatedData(selectedSubData); // 수정할 데이터를 저장
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value })); // 수정된 데이터 업데이트
  };

  const handleCancel = () => {
    setEditing(false);
    setSelectedSubData(null);
    setUpdatedData({}); // 수정 취소 시 업데이트 데이터 초기화
  };

  const handleSave = async () => {
    try {
      const currentTime = kroDate(); // 현재 시간
      const updatedSubData = {
        ...updatedData,
        lastModified: currentTime, // lastModified 필드 추가 (필요시)
      };

      console.log("Saving updated data:", updatedSubData);

      // 필드가 기존 문서에 있는지 확인하고, 업데이트 함수 호출
      await updateSubcollectionDocument(
        medicalData.id, // 문서 ID
        "farmCureList", // 서브컬렉션 이름
        selectedSubData.docId, // 문서 ID
        updatedSubData // 업데이트할 데이터 전달
      );

      // 기존 데이터 업데이트
      setSubCollectionData((prevData) => {
        return prevData.map((item) => {
          if (item.docId === selectedSubData.docId) {
            return { ...item, ...updatedSubData }; // 업데이트된 데이터로 교체
          }
          return item; // 그대로 유지
        });
      });

      setSelectedSubData((prev) => ({ ...prev, ...updatedSubData })); // 선택된 데이터 재설정
      alert("수정이 완료되었습니다!");
    } catch (error) {
      console.error("업데이트 실패:", error);
    }
  };

  if (!medicalData) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className={styles.save}>
      <div className={styles.boxContainer}>
        {subCollectionData.length > 0 ? ( // Check if subCollectionData has items
          <div className={styles.cardContainer}>
            {subCollectionData.map((subData) => (
              <div
                key={subData.docId}
                className={styles.card}
                onClick={() => handleSubDataClick(subData)}
              >
                <div className={styles.cardHeader}>
                  <strong>축사 번호:</strong> {medicalData.farmId}
                  <div>
                    <strong>{subData.lastModified || kroDate()}</strong>
                    {/* lastModified 표시 */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>서브 컬렉션 데이터가 없습니다.</p> // 메시지 추가
        )}

        {selectedSubData && !editing && (
          <div className={styles.modalDisease}>
            <div className={styles.modalContent}>
              <span
                className={styles.close}
                onClick={() => setSelectedSubData(null)} // 닫기 버튼
              >
                &times;
              </span>
              <h2>상세 증상: {selectedSubData.symptom}</h2>
              <p>
                <strong>영향을 받은 가축 수:</strong>{" "}
                {selectedSubData.symptomCount}
              </p>
              <p>
                <strong>열이 있습니까?</strong>{" "}
                {selectedSubData.fever ? "예" : "아니요"}
              </p>
              <p>
                <strong>평균 체온:</strong> {selectedSubData.feverMean}
              </p>
              <p>
                <strong>기침 여부:</strong>{" "}
                {selectedSubData.cough ? "예" : "아니요"}
              </p>
              <p>
                <strong>기침 빈도:</strong> {selectedSubData.coughCount}
              </p>
              <p>
                <strong>설사 증상:</strong>{" "}
                {selectedSubData.diarrhea ? "예" : "아니요"}
              </p>
              <p>
                <strong>설사 횟수:</strong> {selectedSubData.diarrheaCount}
              </p>
              <p>
                <strong>환기 상태:</strong> {selectedSubData.ventilation}
              </p>
              <p>
                <strong>조명 상태:</strong> {selectedSubData.lampCondition}
              </p>
              <p>
                <strong>사료 공급 상태:</strong> {selectedSubData.feedSupply}
              </p>
              <button className={styles.btn} onClick={handleEdit}>
                수정하기
              </button>
            </div>
          </div>
        )}

        {editing && selectedSubData && (
          <div className={styles.modalDisease}>
            <div className={styles.modalContent}>
              <span className={styles.close} onClick={handleCancel}>
                &times;
              </span>
              <h2>수정하기</h2>
              {/* 각 입력 필드의 값은 updatedData에서 가져옴 */}
              <div>
                <label>증상:</label>
                <input
                  type="text"
                  name="symptom"
                  value={updatedData.symptom || ""}
                  onChange={handleChange}
                />
              </div>
              {/* 다른 필드들도 동일하게 처리 */}
              <div>
                <label>영향을 받은 가축 수:</label>
                <input
                  type="text"
                  name="symptomCount"
                  value={updatedData.symptomCount || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>열이 있습니까?</label>
                <select
                  name="fever"
                  value={updatedData.fever ? "예" : "아니요"}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "fever", value: e.target.value === "예" },
                    })
                  }
                >
                  <option value="예">예</option>
                  <option value="아니요">아니요</option>
                </select>
              </div>
              <div>
                <label>평균 체온:</label>
                <input
                  type="text"
                  name="feverMean"
                  value={updatedData.feverMean || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>기침 여부:</label>
                <select
                  name="cough"
                  value={updatedData.cough ? "예" : "아니요"}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "cough", value: e.target.value === "예" },
                    })
                  }
                >
                  <option value="예">예</option>
                  <option value="아니요">아니요</option>
                </select>
              </div>
              <div>
                <label>기침 빈도:</label>
                <input
                  type="text"
                  name="coughCount"
                  value={updatedData.coughCount || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>설사 증상:</label>
                <select
                  name="diarrhea"
                  value={updatedData.diarrhea ? "예" : "아니요"}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "diarrhea",
                        value: e.target.value === "예",
                      },
                    })
                  }
                >
                  <option value="예">예</option>
                  <option value="아니요">아니요</option>
                </select>
              </div>
              <div>
                <label>설사 횟수:</label>
                <input
                  type="text"
                  name="diarrheaCount"
                  value={updatedData.diarrheaCount || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>환기 상태:</label>
                <input
                  type="text"
                  name="ventilation"
                  value={updatedData.ventilation || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>조명 상태:</label>
                <input
                  type="text"
                  name="lampCondition"
                  value={updatedData.lampCondition || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>사료 공급 상태:</label>
                <input
                  type="text"
                  name="feedSupply"
                  value={updatedData.feedSupply || ""}
                  onChange={handleChange}
                />
              </div>
              <button className={styles.btn} onClick={handleSave}>
                저장
              </button>
              <button className={styles.btn} onClick={handleCancel}>
                취소
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MedicalListSave;
