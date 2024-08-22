import React from "react";
import styles from "./DashBoard.module.scss";
import { LineChart } from "@mui/x-charts/LineChart";

const dataset = [
  { x: 1, y: 0.8 },
  { x: 2, y: 1.2 },
  { x: 3, y: 2.6 },
  { x: 5, y: 3.6 },
  { x: 8, y: 4.8 },
  { x: 10, y: 5.8 },
  { x: 12, y: 7 },
];

function DashBoard() {
  return (
    <LineChart
      dataset={dataset}
      xAxis={[
        { dataKey: "x", tickInterval: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] },
      ]}
      yAxis={[{ tickInterval: [1, 3, 5, 7, 9, 11] }]}
      series={[{ dataKey: "y", color: "#78909c" }]}
      height={300}
      margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
      grid={{ horizontal: true }}
      // grid={{ vertical: true, horizontal: true }}
    />
  );
}

export default DashBoard;
