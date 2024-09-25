import React, { useState } from "react";
import axios from "axios";

function MonthPractice(props) {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  const handleMonthChange = async (e) => {
    const month = e.target.value.replace("-", "");
    console.log(month);
    setSelectedMonth(month);

    const apiURL = `/api6/Grid_20151204000000000316_1/1/5/?QRANT_COMPT_MT=${month}`;
    console.log(apiURL); // 요청 URL 확인

    try {
      const response = await fetch(apiURL).then((response) => {
        console.log(response);
      });
      console.log(response.data); // JSON 데이터 확인
      const apiData = response.data.Grid_20220621000000000615_1.row;

      const processedData = apiData.map((item) => {
        console.log(item);
        return {
          locale: item.CTPRVN_NM,
          count: item.OCCRRNC_CNT,
        };
      });
      setData(processedData);
    } catch (error) {
      console.error("API 요청 실패:", error);
    }
  };

  return (
    <div>
      <h1>월별 질병 발생 데이터</h1>

      <input
        type="month"
        value={selectedMonth.slice(0, 4) + "-" + selectedMonth.slice(4)} // "YYYY-MM" 형식으로 표시
        onChange={handleMonthChange}
      />

      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.locale}: {item.count}건 발생
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MonthPractice;
