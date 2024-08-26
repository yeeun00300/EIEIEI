import React from "react";
import { Gauge, gaugeClasses } from "@mui/x-charts";

function CirculerGauge01({ humidity }) {
  const settings = {
    width: 400,
    height: 400,
    value: humidity,
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
          fill: "#4db6ac",
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled,
        },
      })}
    />
  );
}

export default CirculerGauge01;
