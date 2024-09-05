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
  title = "title",
  nowName = "현재 값",
  nowValue = 0,
  setName = "설정 값",
  setValue = 0,
  value = 50,
  unit = "",
  up,
  down,
  valueMin,
  valueMax,
}) {
  return (
    <div className={styles.GaugeNeedle}>
      <h3>{title}</h3>
      <GaugeContainer
        width={200}
        height={200}
        startAngle={-100}
        endAngle={100}
        value={nowValue}
        valueMin={valueMin}
        valueMax={valueMax}
      >
        <GaugeReferenceArc />
        <GaugeValueArc />
        <GaugePointer />
      </GaugeContainer>
      <div className={styles.GaugeContainer}>
        <div className={styles.setValue}>
          {/* <p>{setName}</p> */}
          <div>
            {setValue}
            {unit}
            <div className={styles.setting}>
              <span onClick={up}>{`▲`}</span>
              <span onClick={down}>{`▼`}</span>
            </div>
          </div>
        </div>
        <div>
          {"-->"}
          <br />
          {"-->"}
        </div>
        <div className={styles.nowValue}>
          <p>{nowName}</p>
          <div>
            {nowValue}
            {unit}
          </div>
        </div>
      </div>
    </div>
  );
}
