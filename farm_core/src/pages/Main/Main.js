import React, { useEffect, useRef, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Line } from "react-chartjs-2";
import { Box } from "@mui/material";
import styles from "./Main.module.scss";
import Weather from "./../../api/Weather/Weather";
import DiseaseMap from "./../../components/DiseaseStatus/DiseaseMap";
import GaugeNeedle from "./../../components/Gauge/GaugeNeedle";
import MyCalendar from "./../../components/Calendar/MyCalendar";
import Table from "./../../components/MyLiveStock/table/Table";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useLocation, useParams } from "react-router-dom";
import CurrentMarker from "../../components/DiseaseStatus/CurrentMarker";
import { useSelector } from "react-redux";
import { fetchExcelStock } from "../../store/stockSlice/stockSlice";
import {
  fetchFarmLayout,
  saveFarmLayout,
  useFetchCollectionData,
} from "../../firebase";
import MonthPractice from "./../../components/diseaseMonth/MonthPractice";
import WidgetList from "./subMain/widgetList/WidgetList";
import TempPiNeedleWidget from "../../components/ControlPanels/widget/TempPieChartWithNeedle";
import CO2PiChartWidget from "./../../components/ControlPanels/widget/CO2PiChartWidget";
import HumidPiChartWidget from "../../components/ControlPanels/widget/HumidPiChartWidget";
import LightPiChartWidget from "../../components/ControlPanels/widget/LightPiChartWidget";
import NH3PiChartWidget from "../../components/ControlPanels/widget/NH3PiChartWidget";
import TodayWeatherWidget from "../../components/ControlPanels/WeatherWidget/TodayWeatherWidget";
import WeekWeatherWidget from "../../components/ControlPanels/WeatherWidget/WeekWeatherWidget";
import StockNum from "../../components/MyLiveStock/charts/StockNum";
import Vaccine from "../../components/MyLiveStock/charts/Vaccine";
import FeedAndWater from "../../components/MyLiveStock/charts/FeedAndWater";
import HealthCondition from "../../components/MyLiveStock/charts/HealthCondition";
import StockProduct from "../../components/MyLiveStock/charts/StockProduct";
import MortalityRate from "../../components/MyLiveStock/charts/MortalityRate";
import CCTVAnimal from "../../components/CCTVandAnimalInfo/CCTVAnimal/CCTVAnimal";
import plusIcon from "../../img/plus-solid.svg";
import removeIcon from "../../img/xmark-solid.svg";

// Category 스케일을 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// responsive grid 생성
const ResponsiveGridLayout = WidthProvider(Responsive);

const LineChart = ({ dataset }) => {
  return (
    <Box width="98%" height="98%">
      <Line
        data={dataset}
        options={{
          responsive: true,
          maintainAspectRatio: false, // 부모 요소 크기에 맞추기 위해 필요
        }}
      />
    </Box>
  );
};

function Main({ farmList }) {
  const { farmId } = useParams();
  const layoutIArr = useRef([]); // layoutIArr를 useRef로 선언하여 변화 추적
  const currentFarm = farmList?.filter((item) => item.farmId === farmId)[0];
  // 선택 위젯 리스트
  const [fetchLayoutCount, setFetchLayoutCount] = useState(0);
  const [widgetList, setWidgetList] = useState(["10"]);
  const { stock = [], isLoading } = useSelector((state) => state.stockSlice);
  useFetchCollectionData("stock", fetchExcelStock);
  const filteredStock = stock.filter((item) => item.farmId === Number(farmId));
  const realStock = filteredStock.filter((item) => item.deceased === "N");
  // const [filteredStock, setFilteredStock] = useState([]);

  const sampleData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  // const layoutDict = {
  //   LineChart: <LineChart dataset={sampleData} />,
  //   Table: <Table data={stock && stock} />,
  //   GaugeNeedle: <GaugeNeedle />,
  //   MonthPractice: <MonthPractice />,
  // };
  const LAYOUTS = {
    lg: [
      {
        i: "1",
        x: 0,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "2",
        x: 1,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "3",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "4",
        x: 2,
        y: 0,
        w: 2,
        h: 6,
        minw: 2,
        maxh: 6,
      },
      {
        i: "5",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "6",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "7",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "8",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "9",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "10",
        x: 2,
        y: 0,
        w: 3,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "11",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "12",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "13",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "14",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "15",
        x: 2,
        y: 0,
        w: 2,
        h: 3,
        minw: 1,
        maxh: 3,
      },
    ],
    md: [
      {
        i: "1",
        x: 0,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "2",
        x: 1,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "3",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "4",
        x: 2,
        y: 0,
        w: 2,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "5",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "6",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "7",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "8",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "9",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "10",
        x: 2,
        y: 0,
        w: 3,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "11",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "12",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "13",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "14",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "15",
        x: 2,
        y: 0,
        w: 2,
        h: 3,
        minw: 1,
        maxh: 3,
      },
    ],
    sm: [
      {
        i: "1",
        x: 0,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "2",
        x: 1,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "3",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "4",
        x: 2,
        y: 0,
        w: 2,
        h: 4,
        minw: 1,
        maxh: 3,
      },
      {
        i: "5",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "6",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "7",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "8",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "9",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "10",
        x: 2,
        y: 0,
        w: 3,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "11",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "12",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "13",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "14",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
      },
      {
        i: "15",
        x: 2,
        y: 0,
        w: 2,
        h: 3,
        minw: 1,
        maxh: 3,
      },
    ],
  };

  const getSelectedLayouts = (selectedIds) => {
    const filteredLayouts = {
      lg: LAYOUTS.lg.filter((item) => selectedIds.includes(item.i)),
      md: LAYOUTS.md.filter((item) => selectedIds.includes(item.i)),
      sm: LAYOUTS.sm.filter((item) => selectedIds.includes(item.i)),
    };
    return filteredLayouts;
  };

  // 선택된 LAYOUTS
  const newLayouts = getSelectedLayouts(widgetList);

  // 컴포넌트 복원
  const renderComponent = (id) => {
    switch (id) {
      case "1":
        return <Vaccine stock={filteredStock} />; //백신정보
      case "2":
        return <Table data={stock && stock} />; //가축별 총 데이터
      case "3":
        return <FeedAndWater />; //물 사료 소비량
      case "4":
        return <MonthPractice />; // 질병 지도 데이터
      case "5":
        return <TempPiNeedleWidget />; // 온도 조절
      case "6":
        return <HumidPiChartWidget />; // 습도 조절
      case "7":
        return <LightPiChartWidget />; // 조도 조절
      case "8":
        return <CO2PiChartWidget />; //co2 조절
      case "9":
        return <NH3PiChartWidget />; //암모니아 조절
      case "10":
        return <WeekWeatherWidget />; // 5일 날씨
      case "11":
        return <StockNum stock={realStock} />; //현재 농장 가축 수
      case "12":
        return <StockProduct stock={realStock} farmData={currentFarm} />; //발정상태&생산량
      case "13":
        return <HealthCondition stock={realStock} />; //건강 상태
      case "14":
        return <MortalityRate stock={filteredStock} />; //폐사율
      case "15":
        return <CCTVAnimal stockType={currentFarm.farm_stockType} />; //cctv

      default:
        return null;
    }
  };

  // 3. 상태로 레이아웃 관리 (로컬 스토리지에서 불러옴)
  const [layout, setLayout] = useState({ lg: [], dm: [], sm: [] });
  const [currentBreakpoint, setCurrentBreakpoint] = useState("lg");

  // 4. 레이아웃 변경 시 상태와 로컬 스토리지 업데이트
  const initialLayouts = useRef({ lg: [], dm: [], sm: [] }); // 레이아웃 초기 상태 저장

  const onLayoutChange = (newLayout, allLayouts) => {
    const updatedLayouts = { ...allLayouts };

    // 'md'와 'sm' 브레이크포인트의 w: 1, h: 3 설정
    ["md", "sm"].forEach((breakpoint) => {
      updatedLayouts[breakpoint] = updatedLayouts[breakpoint]?.map((item) => {
        // 초기 x, y 값이 있다면 유지
        const initialItem = initialLayouts?.current[breakpoint]?.find(
          (i) => i.i === item.i
        );
        const x = initialItem ? initialItem.x : item.x;
        const y = initialItem ? initialItem.y : item.y;
        console.log(updatedLayouts[breakpoint]);

        if (item.i == "4") {
          return { ...item, w: 1, h: 6, x, y };
        } else if (item.i == "10") {
          return { ...item, w: 2, h: 3, x, y };
        } else if (item.i == "15") {
          return { ...item, w: 2, h: 3, x, y };
        } else {
          return { ...item, w: 1, h: 3, x, y };
        }
      });
    });

    setLayout((prevLayout) => ({
      ...prevLayout,
      ...updatedLayouts,
    }));
  };

  const handleBreakpointChange = (newBreakpoint) => {
    setCurrentBreakpoint(newBreakpoint);
    // console.log("Current breakpoint:", newBreakpoint);
  };

  const [edit, setEdit] = useState(false);
  //대시보드 편집중일때
  const editMode = () => {
    setEdit(true);
  };
  //대시보드 편집 완료(파이어베이스에 등록하는거 추가예정)
  const fixedMode = async () => {
    // 수정 모드를 비활성화
    setEdit(false);
    const farmDocId = currentFarm.docId;
    //레이아웃 비어있을때 초기값 추가
    let basic = [];
    if (
      layout.lg.length === 0 &&
      layout.md.length === 0 &&
      layout.sm.length === 0
    ) {
      basic = {
        lg: [
          {
            i: "10",
            x: 2,
            y: 0,
            w: 3,
            h: 3,
            minw: 1,
            maxh: 3,
          },
        ],
        md: [
          {
            i: "10",
            x: 2,
            y: 0,
            w: 3,
            h: 3,
            minw: 1,
            maxh: 3,
          },
        ],
        sm: [
          {
            i: "10",
            x: 2,
            y: 0,
            w: 3,
            h: 3,
            minw: 1,
            maxh: 3,
          },
        ],
      };
      await saveFarmLayout(farmDocId, basic);
      setLayout(basic);
      setFetchLayoutCount(1); // farmId와 현재 레이아웃 전달
    } else {
      // docId와 newLayout 값을 적절히 전달하여 호출
      await saveFarmLayout(farmDocId, layout);
      setLayout(layout);
      setFetchLayoutCount(widgetList.length);
    }
  };

  useEffect(() => {
    setEdit(false);
    if (!edit) {
      layoutIArr.current = [];
    }
  }, [currentFarm.farmId]);
  // 5. 로컬 스토리지로부터 불러온 레이아웃 적용
  useEffect(() => {
    if (!currentFarm || !currentFarm.docId) {
      console.log("Farm data not loaded yet.");
      return;
    }

    const loadLayout = async () => {
      setLayout(newLayouts);
      const savedLayout = await fetchFarmLayout(currentFarm.docId);
      // 초기값 설정 여부를 위한 상태 추가

      // 처음 로드된 경우에만 layoutIArr에 값을 넣고 업데이트
      if (layoutIArr.current.length === 0 && savedLayout) {
        savedLayout["lg"]?.forEach((item) => layoutIArr.current.push(item.i));

        if (savedLayout) {
          setLayout((prevLayout) => ({
            ...prevLayout,
            lg: savedLayout.lg || [],
            md: savedLayout.md || [],
            sm: savedLayout.sm || [],
            xs: savedLayout.xs || [],
            xxs: savedLayout.xxs || [],
          }));
        } else {
          console.log("저장된 정보 없음");
        }

        // 처음 로드 시 widgetList 업데이트
        setWidgetList([...layoutIArr.current]);
      }
    };

    loadLayout();
  }, [currentFarm?.docId, fetchLayoutCount]);

  const [plus, setPlus] = useState(true);
  const handlePlusClick = () => {
    setPlus((prev) => !prev);
  };

  return (
    <div className="page">
      <div className={styles.box}>
        <div className={`${styles.widget} ${plus ? styles.fullWidth : ""}`}>
          <ResponsiveGridLayout
            className="layout"
            layouts={layout}
            breakpoints={{ lg: 1400, md: 700, sm: 400 }}
            cols={{ lg: 5, md: 3, sm: 1 }}
            rowHeight={83}
            // width={1000}
            isResizable={false}
            onLayoutChange={onLayoutChange}
            onBreakpointChange={handleBreakpointChange}
            isDraggable={edit}
          >
            {layout[currentBreakpoint]?.map((el) => (
              <div className={styles.item} key={el.i} {...el}>
                {renderComponent(el.i)}
              </div>
            ))}
          </ResponsiveGridLayout>
          <div className={styles.plusBtn} onClick={handlePlusClick}>
            <img src={plus ? plusIcon : removeIcon} alt="" />
          </div>
        </div>
        {!plus && (
          <div className={styles.sub}>
            <MyCalendar />
            {edit ? (
              <button className={styles.button} onClick={fixedMode}>
                대시보드 저장하기
              </button>
            ) : (
              <button className={styles.button} onClick={editMode}>
                대시보드 편집하기
              </button>
            )}
            {edit && (
              <div className={styles.checkList}>
                <WidgetList
                  setWidgetList={setWidgetList}
                  widgetList={widgetList}
                  setFetchLayoutCount={setFetchLayoutCount}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
