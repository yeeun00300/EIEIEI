import React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts";

function CirculerGauge01() {
  const settings = {
    width: 200,
    height: 200,
    value: 60,
  };
  return (
    <Gauge
      {...settings}
      cornerRadius="50%"
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: "#52b202",
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled,
        },
      })}
    />
  );
}

export default CirculerGauge01;
