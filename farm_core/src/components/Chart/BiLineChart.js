import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import styles from "./BiLineChart.module.scss";

// const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
// const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
// const xLabels = [
//   "Page A",
//   "Page B",
//   "Page C",
//   "Page D",
//   "Page E",
//   "Page F",
//   "Page G",
// ];

export default function BiLineChart({
  dataLabel1 = "data1",
  dataLabel2 = "data2",
  dataValue1 = [2400, 1398, 9800, 3908, 4800, 3800, 4300],
  dataValue2 = [4000, 3000, 2000, 2780, 1890, 2390, 3490],
  xLine = [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
  ],
}) {
  return (
    <div className={styles.BiLineChart}>
      <LineChart
        width={500}
        height={300}
        series={[
          {
            data: dataValue1,
            label: dataLabel1,
            yAxisId: "leftAxisId",
          },
          {
            data: dataValue2,
            label: dataLabel2,
            yAxisId: "rightAxisId",
          },
        ]}
        xAxis={[{ scaleType: "point", data: xLine }]}
        yAxis={[{ id: "leftAxisId" }, { id: "rightAxisId" }]}
        rightAxis="rightAxisId"
      />
    </div>
  );
}
