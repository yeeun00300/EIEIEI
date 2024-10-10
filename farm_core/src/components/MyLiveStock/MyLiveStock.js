import React, { useEffect, useState } from "react";
import styles from "./MyLiveStock.module.scss";
import CCTVandAnimalInfo from "../CCTVandAnimalInfo/CCTVandAnimalInfo";
import { useDispatch, useSelector } from "react-redux";
import StockNum from "./charts/StockNum";
import Vaccine from "./charts/Vaccine";
import StockProduct from "./charts/StockProduct";
import FeedAndWater from "./charts/FeedAndWater";
import HealthCondition from "./charts/HealthCondition";
import MortalityRate from "./charts/MortalityRate";
import {
  fetchExcelStock,
  fetchSelectedStock,
} from "../../store/stockSlice/stockSlice";
import { useNavigate } from "react-router-dom";
import Table from "./table/Table";
import { useFetchCollectionData } from "../../firebase";
import ExcelUpload from "../ExcelUpload/ExcelUpload";
import ExcelTemplateDownload from "../ExcelTemplateDownload/ExcelTemplateDownload";
import FirstPage from "../../pages/FirstPage/FirstPage";
import TempPiNeedleWidget from "./../ControlPanels/widget/TempPieChartWithNeedle";
import { BeatLoader } from "react-spinners";

function MyLiveStock(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { farmList, farmLoading } = useSelector(
    (state) => state.checkLoginSlice
  );

  const { selectedStock, selectLoading } = useSelector(
    (state) => state.stockSlice
  );

  const { stock = [], isLoading } = useSelector((state) => state.stockSlice);
  useFetchCollectionData("stock", fetchExcelStock);

  const [selectedChart, setSelectedChart] = useState(null); // 현재 선택된 차트를 저장할 상태
  const [selectedValue, setSelectedValue] = useState(
    farmList.length > 0 ? farmList[0].farmId : ""
  );
  const [showExcelUpload, setShowExcelUpload] = useState(false);
  const [showExcelDownload, setShowExcelDownload] = useState(false);
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

    // 선택된 farmId에 해당하는 정보를 찾아서 업데이트
    if (farm) {
      const queryOptions = {
        conditions: [
          {
            field: "farmId",
            operator: "==",
            value: Number(selectedFarmId),
          },
        ],
      };
      dispatch(fetchSelectedStock({ collectionName: "stock", queryOptions }));
    }
  };

  //농장 추가 버튼 클릭 시 축사 추가 페이지로 이동
  const handleAddClick = () => {
    navigate(`/My_Farm_Add`);
  };

  //  가축 추가 (엑셀 업로드)
  const handleStockAddClick = () => {
    setShowExcelUpload((prev) => !prev);
  };
  // 엑셀 다운로드
  const handleDownloadClick = () => {
    setShowExcelDownload((prev) => !prev);
  };

  // 버튼 클릭 시 차트를 변경하는 함수
  const handleChartChange = (chartId) => {
    setSelectedChart(chartId);
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
        return <TempPiNeedleWidget />;
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
      {selectLoading && isLoading ? (
        <div className="loadingPage">
          <BeatLoader color="#38d6b7" />
        </div>
      ) : (
        <>
          {farmList.length === 0 ? (
            <FirstPage />
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
                    <button
                      onClick={handleAddClick}
                      className="squareGlobalBtn"
                    >
                      농장 추가
                    </button>
                    {stockLength === 0 && (
                      <div className={styles.warn}>가축 정보가 없습니다</div>
                    )}
                    <button
                      onClick={handleStockAddClick}
                      className="squareGlobalBtn"
                    >
                      가축 추가
                    </button>
                    {showExcelUpload && <ExcelUpload />}
                    <ExcelTemplateDownload />
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
                  <div className={styles.farmTable}>
                    <Table data={stock} />
                  </div>
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
