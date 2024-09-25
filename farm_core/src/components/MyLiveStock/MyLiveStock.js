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
import { fetchSelectedStock } from "../../store/stockSlice/stockSlice";
import { useNavigate, useParams } from "react-router-dom";
import { fetchFarmList } from "../../store/checkLoginSlice/checkLoginSlice";
import TempControl from "../ControlPanels/TempControl";
import Table from "./table/Table";

function MyLiveStock(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { farmList, farmLoading } = useSelector(
    (state) => state.checkLoginSlice
  );

  const { selectedStock, selectLoading } = useSelector(
    (state) => state.stockSlice
  );
  const [selectedChart, setSelectedChart] = useState(null); // 현재 선택된 차트를 저장할 상태
  const [selectedValue, setSelectedValue] = useState(
    farmList.length > 0 ? farmList[0].farmId : ""
  );
  const [selectedFarm, setSelectedFarm] = useState(farmList[0]);
  const stockLength = selectedStock ? selectedStock.length : 0;
  const stockList = Array.isArray(selectedStock)
    ? selectedStock.filter((item) => item.deceased == "N")
    : [];

  useEffect(() => {
    if (farmList.length > 0) {
      const defaultFarmId = farmList[0].farmId;
      const queryOptions = {
        conditions: [
          {
            field: "farmId",
            operator: "==",
            value: Number(defaultFarmId),
          },
        ],
      };
      dispatch(fetchSelectedStock({ collectionName: "stock", queryOptions }));
      setSelectedValue(defaultFarmId); // 기본적으로 첫 번째 farmId 설정
    }
  }, [farmList, dispatch]);

  const handleChange = (event) => {
    const selectedFarmId = event.target.value; // 선택된 farmId 가져오기
    setSelectedValue(selectedFarmId); // 선택된 값으로 상태 업데이트

    // farmList에서 선택된 farmId에 해당하는 farm 객체 찾기
    const farm = farmList.find((f) => f.farmId == selectedFarmId);
    setSelectedFarm(farm); // 선택된 farm 객체 상태 업데이트
  };
  const handleButtonClick = () => {
    // farmList에서 선택된 farmId에 해당하는 정보를 찾아서 업데이트
    if (selectedFarm) {
      const queryOptions = {
        conditions: [
          {
            field: "farmId",
            operator: "==",
            value: Number(selectedValue),
          },
        ],
      };
      dispatch(fetchSelectedStock({ collectionName: "stock", queryOptions }));
      console.log(`선택된 농장 정보`, selectedFarm);
    }
  };

  // 추가 버튼 클릭 시 축사 추가 페이지로 이동
  const handleAddClick = () => {
    navigate(`/My_Farm_Add`);
  };

  // 가축 정보 없을 시 가축 추가 페이지로 이동
  const handleStockAddClick = () => {
    navigate(`/My_Farm_Add_stock`);
  };

  // 버튼 클릭 시 차트를 변경하는 함수
  const handleChartChange = (chartId) => {
    setSelectedChart(chartId);
    // console.log(selectedChart);
  };

  // 폐사 여부

  useEffect(() => {}, [selectedChart]);

  // 선택된 차트에 따라 다른 차트를 렌더링하는 함수
  const renderChart = () => {
    switch (selectedChart) {
      // 가축 수
      case "chart1":
        return <StockNum stock={stockList} />;
      // 사료 물 소비량
      case "chart2":
        return <FeedAndWater stock={stockList} />;
      // 온도 습도
      case "chart3":
        return <TempControl />;
      // 생산량
      case "chart4":
        return <StockProduct stock={stockList} farmData={selectedFarm} />;
      // 건강상태
      case "chart5":
        return <HealthCondition stock={stockList} />;
      // 백신 및 접종 기록
      case "chart6":
        return <Vaccine stock={stockList} />;
      // 폐사율
      case "chart7":
        return <MortalityRate stock={selectedStock} />;
      default:
        return <div>확인할 차트를 선택해주세요</div>; // 기본
    }
  };

  return (
    <>
      {selectLoading ? (
        <div className="page">
          <div>로딩중</div>
        </div>
      ) : (
        <>
          {farmList.length === 0 ? (
            <div className="page">
              <button onClick={handleAddClick}>축사를 추가해주세요</button>
            </div>
          ) : (
            <div className="page">
              <div className={styles.container}>
                <div className={styles.myFarmInfoBox}>
                  <div className={styles.selectDiv}>
                    <h3>축사 선택</h3>
                    <select
                      className={styles.selectBox}
                      value={selectedValue}
                      onChange={handleChange}
                    >
                      {farmList.map((farm, idx) => (
                        <option key={idx} value={farm.farmId}>
                          {farm.farmName}
                        </option>
                      ))}
                    </select>
                    <button onClick={handleButtonClick}>확인</button>
                    <button onClick={handleAddClick}>추가</button>
                    {stockLength === 0 && (
                      <div className={styles.warn}>가축 정보가 없습니다</div>
                    )}
                    <button onClick={handleStockAddClick}>가축 추가</button>
                  </div>
                  <div className={styles.cctv}>
                    <CCTVandAnimalInfo
                      onClick={handleChartChange}
                      farmData={selectedFarm}
                      length={stockList.length}
                    />
                  </div>
                </div>
                <div className={styles.farmInfoBox}>
                  {/* <div className={styles.farmListInfo}>
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
                          <th>농장 이름</th>
                          <th>총 개체 수</th>
                          <th>평균 무게</th>
                        </tr>
                      </thead>
                      <thead>
                        <tr>
                          <th>농장 이름</th>
                          <th>총 개체 수</th>
                          <th>평균 무게</th>
                        </tr>
                      </thead>
                    </table>
                  </div> */}
                  <Table />
                  <div>
                    <h3>축사 데이터 확인</h3>
                    <div className={styles.chartContainer}>{renderChart()}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default MyLiveStock;
