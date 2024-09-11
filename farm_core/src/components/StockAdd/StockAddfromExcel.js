import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
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

// 필드명 순서
const order = [
  "가축 종류",
  "가축 코드",
  "품종",
  "축사 번호",
  "가축 개체번호",
  "가축 주소",
  "입고 날짜",
  "성별",
  "크기",
  "무게",
  "출생 날짜",
  "섭취량",
  "활동량",
  "온도",
  "격리 상태",
  "발정기 여부",
  "임신 날짜",
  "백신 접종 데이터",
  "질병 및 치료 데이터",
  "출산 횟수",
  "출산 날짜",
  "출산 예정 날짜",
  "우유 생산량",
  "폐사 여부",
  "산란량",
];

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

  useEffect(() => {
    async function fetchData() {
      try {
        const querySnapshot = await getDocs(collection(db, "stock"));
        const data = querySnapshot.docs.map((doc) =>
          convertFieldNamesToKorean(doc.data())
        );
        setItems(data);
      } catch (error) {
        console.error("Firestore에서 데이터를 가져오는 중 오류 발생:", error);
      }
    }

    fetchData();
  }, []);

  const handleToggleExpand = (rowIndex) => {
    if (expandedRows.includes(rowIndex)) {
      setExpandedRows(expandedRows.filter((index) => index !== rowIndex));
    } else {
      setExpandedRows([...expandedRows, rowIndex]);
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
        <th className={styles.th}>상세보기</th>{" "}
        {/* '상세보기' 버튼을 위한 헤더 */}
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
                className={`${styles.td} ${
                  key === "발정기 여부" || key === "성별" ? styles.narrow : ""
                }`}
              >
                {Array.isArray(item[key]) ? (
                  <div>
                    {item[key].map((subItem, subIndex) => {
                      // 객체의 key-value 쌍을 문자열로 변환
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
          </tr>

          {expandedRows.includes(rowIndex) && (
            <tr>
              <td colSpan={fieldsToRender.length + 1}>
                <table className={styles.expandedTable}>
                  <thead>
                    <tr>
                      {order.map((key) => (
                        <th key={key} className={styles.th}>
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {order.map((key, columnIndex) => (
                        <td
                          key={`${rowIndex}-expanded-${columnIndex}-${key}`}
                          className={`${styles.td} ${
                            key === "백신 접종 데이터" ||
                            key === "질병 및 치료 데이터"
                              ? styles.wide
                              : ""
                          }`}
                        >
                          {Array.isArray(item[key]) ? (
                            <div>
                              {item[key].map((subItem, subIndex) => {
                                // 객체의 key-value 쌍을 문자열로 변환
                                const subItemString = Object.entries(subItem)
                                  .map(
                                    ([subKey, subValue]) =>
                                      `${subKey}: ${subValue}`
                                  )
                                  .join(", ");
                                return (
                                  <p key={subIndex}>{subItemString || "X"}</p>
                                );
                              })}
                            </div>
                          ) : (
                            item[key]?.toString() || "X"
                          )}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
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
