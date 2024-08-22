import React from "react";
import styles from "./DashBoard.module.scss";
import { LineChart } from "@mui/x-charts/LineChart";

const dataset = [
  { x: 1, y: 2 },
  { x: 2, y: 5.5 },
  { x: 3, y: 2 },
  { x: 5, y: 8.5 },
  { x: 8, y: 1.5 },
  { x: 10, y: 5 },
  { x: 12, y: 7 },
];

function DashBoard() {
  return (
    <LineChart
      dataset={dataset}
      xAxis={[{ dataKey: "x" }, { colors: ["#ededed"] }]}
      series={[{ dataKey: "y" }]}
      height={300}
      margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
      grid={{ horizontal: true }}
      // grid={{ vertical: true, horizontal: true }}
    />
  );
}

export default DashBoard;
