import * as React from "react";
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
  gaugeClasses,
} from "@mui/x-charts/Gauge";
import styles from "./GaugeNeedle.module.scss";

function GaugePointer() {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };
  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="red" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="red"
        strokeWidth={3}
      />
    </g>
  );
}

export default function GaugeNeedle({
  nowName = "현재 값",
  nowValue = 0,
  setName = "설정 값",
  setValue = 0,
  value = 50,
}) {
  return (
    <div className={styles.GaugeNeedle}>
      <GaugeContainer
        width={200}
        height={200}
        startAngle={-110}
        endAngle={110}
        value={value}
        sx={(theme) => ({
          //   [`& .${gaugeClasses.valueText}`]: {
          //     fontSize: 40,
          //   },
          //   [`& .${gaugeClasses.valueArc}`]: {
          //     fill: "#4db6ac",
          //   },
          //   [`& .${gaugeClasses.referenceArc}`]: {
          //     fill: "#4db6ac",
          //   },
        })}
      >
        <GaugeReferenceArc />
        <GaugeValueArc />
        <GaugePointer />
      </GaugeContainer>
      <div className={styles.GaugeContainer}>
        <div className={styles.setValue}>
          <p>{setName}</p>
          <div>{setValue}</div>
        </div>
        <div>
          {"-->"}
          <br />
          {"-->"}
        </div>
        <div className={styles.nowValue}>
          <p>{nowName}</p>
          <div>{nowValue}</div>
        </div>
      </div>
    </div>
  );
}
