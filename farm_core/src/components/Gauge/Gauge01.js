import React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts";
import styles from "./Gauge01.module.scss";
function Gauge01({ value = 50, unit = "" }) {
  return (
    <div className={styles.Gauge01}>
      <Gauge
        value={value}
        valueMax={120}
        startAngle={-110}
        endAngle={110}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
            // transform: "translate(0px, 0px)",
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: "#4db6ac",
          },
        }}
        text={({ value, valueMax }) => `${value}${unit} / ${valueMax}${unit}`}
      />
    </div>
  );
}

export default Gauge01;
