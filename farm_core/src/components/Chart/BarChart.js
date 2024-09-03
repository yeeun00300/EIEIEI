import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import styles from "./BarChart.module.scss";

export default function BarChart01({
  dataIndex = ["group A", "group B"],
  dataSeries = [{ data: [1, 3] }, { data: [2, 2] }],
}) {
  // 예시
  /*
  dataIndex = ["group A", "group B"]
      dataSeries = [
        { data: [1, 3 ] },
        { data: [2, 2 ] },

      ]
  */
  /*
    dataIndex = ["group A", "group B", "group C", "group D"]
    dataSeries = [
        { data: [4, 3, 5, 2] },
        { data: [1, 6, 3, 4] },
        { data: [2, 5, 6, 5] },
        { data: [3, 2, 4, 1] },
      ]
    */

  return (
    <div className={styles.BarChart01}>
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: dataIndex,
          },
        ]}
        series={dataSeries}
        width={500}
        height={300}
      />
    </div>
  );
}
