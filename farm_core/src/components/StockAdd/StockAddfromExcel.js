import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  where,
  query,
} from "firebase/firestore";
import { db } from "../../firebase"; // Firebase 설정 파일
import styles from "./StockAddfromExcel.module.scss";

// 필드명 매핑
const fieldNameMapping = {
  stockType: "가축 종류",
  stockCode: "가축 코드",
  variety: "품종",
  farmId: "축사 번호",
  stockId: "가축 개체번호",
  farmAddress: "가축 주소",
  incomingDate: "입고 날짜",
  sex: "성별",
  size: "크기",
  weight: "무게",
  birthDate: "출생 날짜",
  feed: "섭취량",
  activity: "활동량",
  temp: "온도",
  isolation: "격리 상태",
  "mating(bool)": "발정기 여부",
  pregnantDate: "임신 날짜",
  vaccine: "백신 접종 데이터",
  disease: "질병 및 치료 데이터",
  breedCount: "출산 횟수",
  breedDate: "출산 날짜",
  breedDueDate: "출산 예정 날짜",
  milk: "우유 생산량",
  "deceased(bool)": "폐사 여부",
  eggProduction: "산란량",
};

// 필드명을 한글로 변환하는 함수
function convertFieldNamesToKorean(dataObject) {
  const convertedObject = {};
  for (const [key, value] of Object.entries(dataObject)) {
    const koreanKey = fieldNameMapping[key] || key;
    convertedObject[koreanKey] = value;
  }
  return convertedObject;
}

// 필드명 순서 (삭제 유무와 삭제 이유는 여기에 포함되지 않음)
const fieldsToRender = [
  "가축 종류",
  "축사 번호",
  "가축 개체번호",
  "품종",
  "입고 날짜",
  "성별",
  "크기",
  "무게",
  "출생 날짜",
  "발정기 여부",
  "백신 접종 데이터",
  "질병 및 치료 데이터",
];

function StockAddfromExcel() {
  const [items, setItems] = useState([]);
  const [expandedRows, setExpandedRows] = useState([]);
  const [deletionRows, setDeletionRows] = useState([]); // 삭제 폼을 열기 위한 상태
  const [deleteReasons, setDeleteReasons] = useState({}); // 삭제 이유 저장
  const email = localStorage.getItem("email");

  console.log(items);
  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, "stock"), where("email", "==", email))
        );
        const data = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...convertFieldNamesToKorean(doc.data()),
          }))
          .filter((item) => item.deletionStatus !== "N"); // 삭제 상태가 "N"인 항목은 제외

        setItems(data);
      } catch (error) {
        console.error("Firestore에서 데이터를 가져오는 중 오류 발생:", error);
      }
    }

    fetchData();
  }, [email]);

  const handleToggleExpand = (rowIndex) => {
    if (expandedRows.includes(rowIndex)) {
      setExpandedRows(expandedRows.filter((index) => index !== rowIndex));
    } else {
      setExpandedRows([...expandedRows, rowIndex]);
    }
  };

  const handleToggleDelete = (rowIndex) => {
    if (deletionRows.includes(rowIndex)) {
      setDeletionRows(deletionRows.filter((index) => index !== rowIndex));
    } else {
      setDeletionRows([...deletionRows, rowIndex]);
    }
  };

  const handleDeleteReasonChange = (e, rowIndex) => {
    const reason = e.target.value;
    setDeleteReasons({ ...deleteReasons, [rowIndex]: reason });
  };

  const handleDelete = async (rowIndex) => {
    const reason = deleteReasons[rowIndex];
    const stockItem = items[rowIndex];

    // 디버깅: stockItem과 docRef 출력
    console.log("stockItem:", stockItem);
    console.log("Deleting stockId:", stockItem?.stockId);

    try {
      // Firestore에서 문서 참조 생성
      const docRef = doc(db, "stock", stockItem.id); // stockId를 이용해 참조
      console.log("Document Reference:", docRef);

      // Firestore 업데이트
      await updateDoc(docRef, {
        deletionStatus: "N", // 삭제 상태를 "N"으로 업데이트
        deletionReason: reason, // 삭제 이유 저장
      });

      // 삭제 처리 후 상태 업데이트
      const updatedItems = items.filter((_, index) => index !== rowIndex); // 삭제된 항목 제외
      setItems(updatedItems);

      // 폼 닫기
      setDeletionRows(deletionRows.filter((index) => index !== rowIndex));
    } catch (error) {
      console.error("삭제 처리 중 오류 발생:", error);
    }
  };

  const renderTableHeader = () => (
    <thead>
      <tr>
        {fieldsToRender.map((key) => (
          <th key={key} className={styles.th}>
            {key}
          </th>
        ))}
        <th className={styles.th}>상세보기</th>
        <th className={styles.th}>삭제하기</th>
      </tr>
    </thead>
  );

  const renderTableBody = () => (
    <tbody>
      {items.map((item, rowIndex) => (
        <React.Fragment key={rowIndex}>
          <tr>
            {fieldsToRender.map((key, columnIndex) => (
              <td
                key={`${rowIndex}-${columnIndex}-${key}`}
                className={styles.td}
              >
                {Array.isArray(item[key]) ? (
                  <div>
                    {item[key].map((subItem, subIndex) => {
                      const subItemString = Object.entries(subItem)
                        .map(([subKey, subValue]) => `${subKey}: ${subValue}`)
                        .join(", ");
                      return <p key={subIndex}>{subItemString || "X"}</p>;
                    })}
                  </div>
                ) : (
                  item[key]?.toString() || "X"
                )}
              </td>
            ))}
            <td className={styles.td}>
              <button onClick={() => handleToggleExpand(rowIndex)}>
                {expandedRows.includes(rowIndex) ? "접기" : "상세보기"}
              </button>
            </td>
            <td className={styles.td}>
              <button onClick={() => handleToggleDelete(rowIndex)}>
                삭제하기
              </button>
            </td>
          </tr>

          {/* 삭제 폼 표시 */}
          {deletionRows.includes(rowIndex) && (
            <tr>
              <td colSpan={fieldsToRender.length + 1}>
                <div>
                  <input
                    type="text"
                    value={deleteReasons[rowIndex] || ""}
                    onChange={(e) => handleDeleteReasonChange(e, rowIndex)}
                    placeholder="삭제 이유를 작성하세요"
                  />
                  <button onClick={() => handleDelete(rowIndex)}>
                    삭제 제출
                  </button>
                </div>
              </td>
            </tr>
          )}
        </React.Fragment>
      ))}
    </tbody>
  );

  return (
    <table className={styles.table}>
      {renderTableHeader()}
      {renderTableBody()}
    </table>
  );
}

export default StockAddfromExcel;
