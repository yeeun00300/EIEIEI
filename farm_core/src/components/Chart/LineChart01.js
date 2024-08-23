import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

function LineChart01({ dataset, color, xInterval, yInterval }) {
  // -- dataset 예시--
  // ----> 그래프 그리는 값
  // const dataset = [
  //   { x: 1, y: 0.8 },
  //   { x: 2, y: 1.2 },
  //   { x: 3, y: 2.6 },
  //   { x: 5, y: 3.6 },
  //   { x: 8, y: 4.8 },
  //   { x: 10, y: 5.8 },
  //   { x: 12, y: 7 },
  // ];

  // -- color 예시 --
  // --->라인 색
  // const color = "red"; "문자열"

  // -- xInterval, yInterval 예시 --
  //  ---> x, y 축 간격
  //  xInterval = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];  [배열]
  //  yInterval = [1, 3, 5, 7, 9, 11];[배열]

  return (
    <div>
      <LineChart
        dataset={dataset}
        xAxis={[
          {
            dataKey: "x",
            // tickInterval: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            tickInterval: [...xInterval],
          },
        ]}
        // yAxis={[{ tickInterval: [1, 3, 5, 7, 9, 11] }]}
        yAxis={[{ tickInterval: [...yInterval] }]}
        series={[{ dataKey: "y", color: `${color} ` }]}
        height={200}
        width={800}
        margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
        grid={{ horizontal: true }}
        // loading={true}
        // grid={{ vertical: true, horizontal: true }}
      />
    </div>
  );
}

export default LineChart01;
