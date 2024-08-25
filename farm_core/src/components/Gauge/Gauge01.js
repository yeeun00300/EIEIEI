import React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts";
function Gauge01() {
  return (
    <Gauge
      value={50}
      startAngle={-110}
      endAngle={110}
      sx={{
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
          transform: "translate(0px, 0px)",
        },
      }}
      text={({ value, valueMax }) => `${value} / ${valueMax}`}
    />
  );
}

export default Gauge01;
