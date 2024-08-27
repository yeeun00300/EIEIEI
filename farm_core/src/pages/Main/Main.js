import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Line } from "react-chartjs-2";
import { Box } from "@mui/material";
import styles from "./Main.module.scss";

import Weather from "./../../api/Weather/Weather";
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
      { i: "1", x: 0, y: 0, w: 2, h: 2, minW: 1, maxH: 3 },
      { i: "2", x: 1, y: 0, w: 2, h: 2, minW: 1, maxH: 3 },
      { i: "3", x: 2, y: 0, w: 2, h: 2, minW: 1, maxH: 3 },
      { i: "4", x: 2, y: 0, w: 2, h: 2, minW: 1, maxH: 3 },
    ],
  };
  return (
    <div className="page">
      <ResponsiveGridLayout
        className="layout"
        layouts={LAYOUTS}
        breakpoints={{ lg: 1000, md: 600 }}
        cols={{ lg: 3, md: 2 }}
        rowHeight={100}
        width={1200}
      >
        {LAYOUTS.lg.map((el) => (
          <div key={el.i} {...el}>
            <LineChart dataset={sampleData} />
          </div>
        ))}
        <div
          key={"5"}
          data-grid={{
            x: 0,
            y: 0,
            w: 0.4,
            h: 3,
            isResizable: false,
          }}
        >
          <Weather />
        </div>
      </ResponsiveGridLayout>
    </div>
  );
}

export default Main;
