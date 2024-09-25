import React, { useEffect } from "react";
import styles from "../MyLiveStock.module.scss";

function Table({ data }) {
  const { weight } = data;
  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <div className={styles.farmListInfo}>
      <h3>전체 평균 데이터</h3>
      <table className={styles.styledTable}>
        <thead>
          <tr>
            <th>
              <select>
                <option>축종 선택</option>
                <option>한우</option>
                <option>낙농</option>
                <option>양돈</option>
                <option>육계</option>
                <option>산란계</option>
              </select>
            </th>
            <th>총 개체 수</th>
            <th>평균 무게</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>일일 평균 생산량</th>
            <th>일일 사료/물 소비량</th>
            <th>예방접종 완료율</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>격리 개체 수</th>
            <th>발정 개체 수</th>
            <th>평균 무게</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default Table;
