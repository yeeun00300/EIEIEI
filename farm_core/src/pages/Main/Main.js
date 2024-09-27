import React, { useEffect, useState } from "react";
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
import { useParams } from "react-router-dom";
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
  const currentFarm = farmList.filter((item) => item.farmId === farmId)[0];

  // ????????????????????????????????????????????????????????????????????????????????
  const { stock = [], isLoading } = useSelector((state) => state.stockSlice);
  useFetchCollectionData("stock", fetchExcelStock);
  // ????????????????????????????????????????????????????????????????????????????????

  // console.log(farmId);
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

  const childrenDict = {
    LineChart: <LineChart dataset={sampleData} />,
  };
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
        children: childrenDict["LineChart"],
        // children: <LineChart dataset={sampleData} />,
      },
      {
        i: "2",
        x: 1,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
        // children: <DiseaseMap />,
        children: <Table data={stock && stock} />,
      },
      {
        i: "3",
        x: 2,
        y: 0,
        w: 1,
        h: 3,
        minw: 1,
        maxh: 3,
        children: <GaugeNeedle />,
      },
      {
        i: "4",
        x: 2,
        y: 0,
        w: 2,
        h: 4,
        minw: 1,
        maxh: 3,
        children: <MonthPractice />,
      },
    ],
  };

  // 3. 상태로 레이아웃 관리 (로컬 스토리지에서 불러옴)
  const [layout, setLayout] = useState();

  // 4. 레이아웃 변경 시 상태와 로컬 스토리지 업데이트
  const onLayoutChange = (newLayout) => {
    setLayout((prevLayout) => ({
      ...prevLayout,
      lg: newLayout, // 'lg' 레이아웃을 업데이트
    }));

    console.log(`json 확ㄷ인용`, JSON.stringify(layout));
  };

  // 5. 로컬 스토리지로부터 불러온 레이아웃 적용
  useEffect(() => {
    const loadLayout = async () => {
      const savedLayout = await fetchFarmLayout(currentFarm.docId);
      if (savedLayout) {
        setLayout((prevLayout) => ({
          ...prevLayout,
          lg: savedLayout.lg || [],
        }));
      } else {
        //저장된 레이아웃 없을때
        setLayout([LAYOUTS]);
      }
      console.log(`테스트`, savedLayout);
    };
    loadLayout();
  }, [currentFarm.docId]);

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

    // docId와 newLayout 값을 적절히 전달하여 호출
    await saveFarmLayout(farmDocId, layout); // farmId와 현재 레이아웃 전달
  };
  return (
    <div className="page">
      <div className={styles.box}>
        <div className={styles.widget}>
          <ResponsiveGridLayout
            className="layout"
            layouts={layout}
            breakpoints={{ lg: 1400, md: 600 }}
            cols={{ lg: 5, md: 2 }}
            rowHeight={100}
            width={1000}
            isResizable={false}
            onLayoutChange={onLayoutChange}
            isDraggable={edit}
          >
            {LAYOUTS.lg.map((el) => (
              <div className={styles.item} key={el.i} {...el}>
                {el.children}
              </div>
            ))}
          </ResponsiveGridLayout>
        </div>
        <div className={styles.sub}>
          <div className={styles.alarm}>날씨, 질병 정보 들어갈 곳</div>
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
          {edit ? (
            <div className={styles.checkList}>
              <WidgetList />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;
