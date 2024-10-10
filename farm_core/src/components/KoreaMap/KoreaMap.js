import React, { useState } from "react";
import { SimpleSouthKoreaMapChart } from "react-simple-south-korea-map-chart";

function KoreaMap({ data }) {
  const [selectedInfo, setSelectedInfo] = useState(null);
  // const setColorByCount = (count) => {
  //   if (count === 0) return "#F1F1F1";
  //   if (count > 5000) return "#79D3C4";
  //   if (count > 3000) return "#43cdb6";
  //   if (count > 1000) return "#61CDBB";
  //   if (count > 200) return "#91D9CD";
  //   if (count > 100) return "#A9DFD6";
  //   if (count > 50) return "#C1E5DF";
  //   if (count > 5) return "#D9EBF9";
  //   else return "#ebfffd";
  // };
  const setColorByCount = (count) => {
    if (count === 0) return "#F1F1F1";
    if (count > 5000) return "#79D3C4";
    if (count > 3000) return "#43cdb6";
    if (count > 1000) return "#61CDBB";
    if (count > 200) return "#91D9CD";
    if (count > 100) return "#A9DFD6";
    if (count > 50) return "#C1E5DF";
    if (count > 5) return "#D9EBF9";
    else return "#ebfffd";
  };

  const handleMouseEnter = (locale) => {
    // const item = data.find((d) => d.locale === locale);
    // if (item) {
    //   setSelectedInfo(item);
    // } else {
    //   console.warn(`No data found for locale: ${locale}`); // 데이터가 없을 때 경고 로그
    // }
    alert("??");
  };
  // const tooltipContent = (locale, count, diseases) => {
  //   const diseaseList = diseases.length > 0 ? diseases.join(", ") : "없음";

  //   return `
  //     <strong>${locale}</strong><br />
  //     발생한 질병 수: ${count}<br />
  //     발생한 질병: ${diseaseList}
  //   `;
  // };

  // formattedData 배열로 변환
  const formattedData = data.map((item) => ({
    locale: item.locale,
    count: item.count,
    diseases: item.diseases || [],
    animalTypes: item.animalTypes || [],
  }));

  return (
    <div>
      <SimpleSouthKoreaMapChart
        setColorByCount={setColorByCount}
        data={formattedData}
        onClick={handleMouseEnter} // 호버 시 이벤트 핸들러 추가
      />
    </div>
  );
}

export default KoreaMap;
