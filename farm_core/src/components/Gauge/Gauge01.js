import React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts";
function Gauge01({ humidity }) {
  return (
    <Gauge
      value={humidity}
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
      text={({ value, valueMax }) => `${value}℃ / ${valueMax}℃`}
    />
  );
}

export default Gauge01;
