import React, { useEffect, useState } from "react";
import styles from "./MyLiveStock.module.scss";
import Selected from "./Selected/Selected";
import CCTVandAnimalInfo from "../CCTVandAnimalInfo/CCTVandAnimalInfo";
import krCowIcon from "../../img/한우얼굴.png";
import diaryIcon from "../../img/낙농얼굴.png";
import pigIcon from "../../img/양돈얼굴.png";
import chickenIcon from "../../img/양계얼굴.png";
import henIcon from "../../img/산란계얼굴.png";
import BiLineChart from "../Chart/BiLineChart";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import KoreaMap from "../KoreaMap/KoreaMap";
import KoreaBubble from "../KoreaMap/KoreaBubble";
import KoreaTest from "../KoreaMap/KoreaTest";
import { useDispatch, useSelector } from "react-redux";
import StockNum from "./charts/StockNum";
import Vaccine from "./charts/Vaccine";
import StockProduct from "./charts/StockProduct";
import FeedAndWater from "./charts/FeedAndWater";
import HealthCondition from "./charts/HealthCondition";
import MortalityRate from "./charts/MortalityRate";
import { fetchExcelStock } from "../../store/stockSlice/stockSlice";
import { useParams } from "react-router-dom";

function MyLiveStock(props) {
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  const [farm, setFarm] = useState("");

  const handleChange = (event) => {
    setFarm(event.target.value);
  };
  const { stock, isLoading } = useSelector((state) => state.stockSlice);
  const [selectedChart, setSelectedChart] = useState(null); // 현재 선택된 차트를 저장할 상태

  // 버튼 클릭 시 차트를 변경하는 함수
  const handleChartChange = (chartId) => {
    setSelectedChart(chartId);
    // console.log(selectedChart);
  };
  useEffect(() => {
    if (selectedChart) {
      const queryOptions = {
        conditions: [
          {
            field: "email",
            operator: "==",
            value: email,
          },
        ],
      };
      dispatch(fetchExcelStock({ collectionName: "stock", queryOptions }));
    }
  }, [selectedChart]);

  // 선택된 차트에 따라 다른 차트를 렌더링하는 함수
  const renderChart = () => {
    switch (selectedChart) {
      // 가축 수
      case "chart1":
        return <StockNum stock={stock} />;
      // 사료 물 소비량
      case "chart2":
        return <FeedAndWater />;
      // 온도 습도
      case "chart3":
        return <StockProduct />;
      // 생산량
      case "chart4":
        return <StockProduct />;
      // 건강상태
      case "chart5":
        return <HealthCondition />;
      // 백신 및 접종 기록
      case "chart6":
        return <Vaccine />;
      // 폐사율
      case "chart7":
        return <MortalityRate />;
      default:
        return <div>확인할 차트를 선택해주세요</div>; // 기본적으로 KoreaMap을 보여줌
    }
  };

  return (
    <div className="page">
      <div className={styles.container}>
        <div className={styles.myFarmInfoBox}>
          <div className={styles.selectDiv}>
            <h3>축사 선택</h3>
            <select className={styles.selectBox}>
              <option>예은이네 1농장</option>
              <option>예은이네 2농장</option>
              <option>예은이네 3농장</option>
              <option>예은이네 4농장</option>
            </select>
            <button>확인</button>
          </div>
          <div className={styles.cctv}>
            <CCTVandAnimalInfo onClick={handleChartChange} />
          </div>
        </div>
        <div className={styles.farmInfoBox}>
          <div className={styles.farmListInfo}>
            <h3>전체 평균 데이터</h3>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>농장 이름</th>
                  <th>총 개체 수</th>
                  <th>평균 무게</th>
                  <th>질병 발생 비율(1달)</th>
                  <th>격리 개체 수</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>예은이네 1농장</td>
                  <td>6000</td>
                  <td>6000</td>
                  <td>6000</td>
                  <td>6000</td>
                </tr>
                <tr>
                  <td>예은이네 2농장</td>
                  <td>6000</td>
                  <td>6000</td>
                  <td>6000</td>
                  <td>6000</td>
                </tr>
                <tr>
                  <td>예은이네 3농장</td>
                  <td>6000</td>
                  <td>6000</td>
                  <td>6000</td>
                  <td>6000</td>
                </tr>
                <tr className={styles.active}>
                  <td>총 합계</td>
                  <td>5150</td>
                  <td>5150</td>
                  <td>5150</td>
                  <td>5150</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3>축사 데이터 확인</h3>
            {/* <BiLineChart /> */}
            {/* <KoreaMap /> */}
            {/* <KoreaBubble /> */}
            {/* <KoreaTest /> */}
            <div className={styles.chartContainer}>
              {isLoading ? <div>로딩중</div> : renderChart()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyLiveStock;
