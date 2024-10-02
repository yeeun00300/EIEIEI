import React, { useState } from "react";
import KORMap from "./KORMap";
import styles from "./MonthPractice.module.scss";

function MonthPractice(props) {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleMonthChange = async (e) => {
    const month = e.target.value.replace("-", "");
    console.log(`Selected Month: ${month}`);
    setSelectedMonth(month);

    const apiURL = `https://66fcf8eecdb31f86372c0bec--moonlit-puppy-7f7f1f.netlify.app/api6/openapi/ef47786d3eabcb9f87d0c7d3b301f869312d4cf9af878855b06ed3c153a53290/json/Grid_20220621000000000615_1/1/5/?QRANT_COMPT_MT=${month}`;
    console.log(apiURL);

    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      console.log("jsonData", jsonData);
      const rows = jsonData.Grid_20220621000000000615_1.row;
      console.log("rows", rows);

      const regionalData = rows.reduce((acc, row) => {
        const locale = row.CTPRVN_NM;
        const count = row.OCCRRNC_CNT;
        const animalType = row.LVSTCK_KIND_CD_NM;

        if (!acc[locale]) {
          acc[locale] = { count: 0, diseases: [], animalTypes: new Set() };
        }

        acc[locale].count += count;
        acc[locale].diseases.push(row.DISE_CD_NM);
        acc[locale].animalTypes.add(animalType);

        return acc;
      }, {});

      const formattedData = Object.entries(regionalData).map(
        ([locale, info]) => ({
          locale,
          count: info.count,
          diseases: info.diseases,
          animalTypes: Array.from(info.animalTypes),
        })
      );

      console.log("최종 데이터", formattedData);
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log(selectedMonth);
  return (
    <div className="container">
      <div className={styles.mapbox}>
        <div className={styles.wrapper}>
          <h1>월별 질병 데이터</h1>
          <input
            type="month"
            value={selectedMonth.slice(0, 4) + "-" + selectedMonth.slice(4)}
            onChange={handleMonthChange}
          />
        </div>
        <div className={styles.KORMapCard}>
          <KORMap data={data} selectedMonth={selectedMonth} />{" "}
        </div>
        {/* 선택된 월도 전달 */}
      </div>
    </div>
  );
}

export default MonthPractice;
