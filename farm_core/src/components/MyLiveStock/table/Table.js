import React, { useEffect, useState } from "react";
import styles from "./Table.module.scss";

function Table({ data }) {
  const [selectedSpecies, setSelectedSpecies] = useState("축종 선택"); // 선택된 축종 상태
  const [totalStock, setTotalStock] = useState("");
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [totalFeed, setTotalFeed] = useState(0);
  const [totalActivity, setTotalActivity] = useState("");
  const [totalVaccine, setTotalVaccine] = useState("");
  const [totalIsolation, setTotalIsolation] = useState("");
  const [totalDead, setTotalDead] = useState(0);

  const getRandomPrice = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    // 데이터 변경 또는 컴포넌트 초기화 시 처리할 내용
    // data 맵함수 돌려서 filter 돌리기
    // filter 돌려서 tableData 만들어주기
    const filteredStock = data.filter(
      (item) => item.stockType == selectedSpecies
    );

    //1.총 개체수
    setTotalStock(filteredStock.length);
    //2.평균 무게
    const totalWeightSum = filteredStock.reduce(
      (sum, item) => sum + item.weight,
      0
    );
    const averageWeight =
      filteredStock.length > 0 ? totalWeightSum / filteredStock.length : 0;
    setTotalWeight(averageWeight);
    //3.사료 물 소비량
    const totalFeedSum = filteredStock.reduce(
      (sum, item) => sum + item.feed,
      0
    );
    const averageFeed =
      filteredStock.length > 0 ? totalFeedSum / filteredStock.length : 0;
    setTotalFeed(averageFeed);
    //4.일일 평균 생산량
    if (selectedSpecies === "한우") {
      filteredStock.length > 0
        ? setTotalProduct(`${getRandomPrice(6000, 7000)}원`)
        : setTotalProduct("0원");
    } else if (selectedSpecies === "양돈") {
      filteredStock.length > 0
        ? setTotalProduct(`${getRandomPrice(7000, 8000)}원`)
        : setTotalProduct("0원");
    } else if (selectedSpecies === "육계") {
      filteredStock.length > 0
        ? setTotalProduct(`${getRandomPrice(3000, 4000)}원`)
        : setTotalProduct("0원");
    } else if (selectedSpecies === "낙농") {
      setTotalProduct("30L");
    } else if (selectedSpecies === "산란계") {
      setTotalProduct(filteredStock.length);
    }

    //5.평균 건강 상태
    filteredStock.length > 0
      ? setTotalActivity("양호")
      : setTotalActivity("정보없음");
    //6.예방접종 완료율
    filteredStock.length > 0
      ? setTotalVaccine("89%")
      : setTotalVaccine("정보없음");
    //7.격리 개체 수
    const isolation = filteredStock.filter((item) => item.isolation == "Y");
    setTotalIsolation(isolation.length);
    //8.폐사율
    const dead = filteredStock.filter((item) => item.deceased == "Y");
    const averageDead =
      filteredStock.length > 0 ? dead.length / filteredStock.length : 0;
    setTotalDead(averageDead);
  }, [selectedSpecies]);

  const handleSelectChange = (event) => {
    setSelectedSpecies(event.target.value); // 선택된 값 업데이트
  };

  return (
    <div className={styles.farmListInfo}>
      <h3>전체 평균 데이터</h3>
      <table className={styles.styledTable}>
        <thead>
          <tr>
            <th>
              <select value={selectedSpecies} onChange={handleSelectChange}>
                <option value="축종 선택" disabled>
                  축종 선택
                </option>
                <option value="한우">한우</option>
                <option value="낙농">낙농</option>
                <option value="양돈">양돈</option>
                <option value="육계">육계</option>
                <option value="산란계">산란계</option>
              </select>
            </th>
            <th>
              총 개체 수<br />
              {totalStock}
            </th>
            <th>
              평균 무게
              <br />
              {totalWeight.toFixed(2)}
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>
              일일 사료 소비량
              <br />
              {totalFeed.toFixed(2)}
            </th>
            <th>
              {selectedSpecies === "한우" ||
              selectedSpecies === "양돈" ||
              selectedSpecies === "육계"
                ? "가축 시세"
                : selectedSpecies === "낙농" || selectedSpecies === "산란계"
                ? "일 생산량 평균"
                : "선택된 축종 없음"}
              <br />
              {totalProduct}
            </th>
            <th>
              건강 상태
              <br />
              {totalActivity}
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>
              예방접종률
              <br />
              {totalVaccine}
            </th>
            <th>
              격리 개체 수<br />
              {totalIsolation}
            </th>
            <th>
              폐사율
              <br />
              {totalDead.toFixed(2)}
            </th>
          </tr>
        </thead>
      </table>
    </div>
  );
}

export default Table;
