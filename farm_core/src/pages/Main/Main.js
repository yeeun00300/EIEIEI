import React, { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Line } from "react-chartjs-2";
import { Box } from "@mui/material";
import styles from "./Main.module.scss";
import Weather from "./../../api/Weather/Weather";
import DiseaseMap from "./../../components/DiseaseStatus/DiseaseMap";
import GaugeNeedle from "./../../components/Gauge/GaugeNeedle";
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

function Main() {
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
        children: <LineChart dataset={sampleData} />,
      },
      {
        i: "2",
        x: 1,
        y: 0,
        w: 2,
        h: 6,
        minw: 1.5,
        maxh: 3,
        children: <DiseaseMap />,
      },
      {
        i: "3",
        x: 2,
        y: 0,
        w: 1,
        h: 2,
        minw: 1,
        maxh: 3,
        children: <GaugeNeedle />,
      },
      {
        i: "4",
        x: 2,
        y: 0,
        w: 1,
        h: 2,
        minw: 1,
        maxh: 3,
        children: <div>안녕하세요2</div>,
      },
    ],
  };

  // 1. 레이아웃 정보를 로컬스토리지에 저장
  const saveLayout = (layout) => {
    localStorage.setItem("userLayout", JSON.stringify(layout));
  };

  // 2. 로컬스토리지에 저장된 최신 레이아웃정보 불러오기
  const loadLayout = () => {
    const savedLayout = localStorage.getItem("userLayout");
    return savedLayout ? JSON.parse(savedLayout) : LAYOUTS;
  };

  // 3. 상태로 레이아웃 관리 (로컬 스토리지에서 불러옴)
  const [layout, setLayout] = useState(loadLayout());

  // 4. 레이아웃 변경 시 상태와 로컬 스토리지 업데이트
  const onLayoutChange = (newLayout) => {
    setLayout((prevLayout) => ({
      ...prevLayout,
      lg: newLayout, // 'lg' 레이아웃을 업데이트
    }));
    saveLayout({
      lg: newLayout, // 'lg' 레이아웃 저장
    });
    console.log(newLayout);
  };

  // 5. 로컬 스토리지로부터 불러온 레이아웃 적용
  useEffect(() => {
    const savedLayout = loadLayout();
    setLayout(savedLayout);
  }, []);

  return (
    <div className="page">
      <div className={styles.box}>
        <div className={styles.widget}>
          <ResponsiveGridLayout
            className="layout"
            layouts={layout}
            breakpoints={{ lg: 1000, md: 600 }}
            cols={{ lg: 5, md: 2 }}
            rowHeight={100}
            width={1000}
            isResizable={false}
            onLayoutChange={onLayoutChange}
          >
            {LAYOUTS.lg.map((el) => (
              <div key={el.i} {...el}>
                {el.children}
              </div>
            ))}
          </ResponsiveGridLayout>
        </div>
        <div className={styles.sub}>캘린더 들어갈 곳</div>
      </div>
    </div>
  );
}

export default Main;
