import React, { useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_koreaLow from "@amcharts/amcharts4-geodata/southKoreaLow";
import styles from "./KORMap.module.scss";
function KORMap({ data, selectedMonth }) {
  const setColorByCount = (count) => {
    if (count === 0) return "#F1F1F1";
    if (count > 5000) return "#8B0000";
    if (count > 3000) return "#CD5C5C";
    if (count > 1000) return "#FF7F7F";
    if (count > 200) return "#FFA07A";
    if (count > 100) return "#FFB6C1";
    if (count > 50) return "#FFCCCC";
    if (count > 5) return "#FFE4E1";
  };

  useEffect(() => {
    const map = am4core.create("chartdiv", am4maps.MapChart);
    map.geodata = am4geodata_koreaLow;
    map.projection = new am4maps.projections.Miller();

    const polygonSeries = new am4maps.MapPolygonSeries();
    polygonSeries.useGeodata = true;
    map.series.push(polygonSeries);

    const polygonTemplate = polygonSeries.mapPolygons.template;

    const regionNameMap = {
      Seoul: "서울특별시",
      Incheon: "인천광역시",
      Gyeonggi: "경기도",
      Gangwon: "강원도",
      "South Chungcheong": "충청남도",
      Sejong: "세종특별자치시",
      Daejeon: "대전광역시",
      "North Chungcheong": "충청북도",
      "North Gyeongsang": "경상북도",
      "North Jeolla": "전라북도",
      "South Jeolla": "전라남도",
      Gwangju: "광주광역시",
      "South Gyeongsang": "경상남도",
      Daegu: "대구광역시",
      Ulsan: "울산광역시",
      Busan: "부산광역시",
      Jeju: "제주특별자치도",
    };

    const getRegionData = (regionName) => {
      const mappedRegionName = regionNameMap[regionName] || regionName;
      const regionData = data.find((item) => item.locale === mappedRegionName);

      if (regionData) {
        return {
          animalTypes: regionData.animalTypes.join(", "),
          diseases: regionData.diseases.join(", "),
          count: regionData.count,
        };
      }
      return {
        animalTypes: "해당 월의 가축 데이터 없음",
        diseases: "해당 월의 데이터 없음",
        count: 0,
      };
    };

    // 각 지역의 기본 색상 설정
    polygonSeries.dataItems.each((dataItem) => {
      const regionData = getRegionData(dataItem.dataContext.name);
      dataItem.color = am4core.color(setColorByCount(regionData.count));
    });

    polygonTemplate.tooltipText = "{name}: [bold]{count}[/]";

    polygonTemplate.events.on("over", (ev) => {
      const regionName = ev.target.dataItem.dataContext.name;
      const regionData = getRegionData(regionName);
      const mappedRegionName = regionNameMap[regionName] || regionName; // 한글 지역명으로 매핑

      ev.target.tooltipText = ` 
        [bold]${mappedRegionName}[/]\n
        가축 종류: ${regionData.animalTypes}\n
        질병 종류: ${regionData.diseases}\n
        질병 발생 수: ${regionData.count}`;

      ev.target.fill = am4core.color(setColorByCount(regionData.count));
    });

    polygonTemplate.events.on("out", (ev) => {
      const regionData = getRegionData(ev.target.dataItem.dataContext.name);
      ev.target.fill = am4core.color(setColorByCount(regionData.count));
    });

    // 언마운트 시 인스턴스 해제
    return () => {
      map.dispose();
    };
  }, [data, selectedMonth]);

  return (
    <div className={styles.wrapper}>
      <div id="chartdiv" className={styles.korMap} />
    </div>
  );
}

export default KORMap;
