import React from "react";
import styles from "./PieChartNeedle.module.scss";
import { PieChart, Pie, Cell } from "recharts";

function PieChartNeedle({
  data,
  cx,
  cy,
  iR,
  oR,
  value,
  needle,
  setValue,
  intervalValue,
  handleUp,
  handleDown,
  unit,
  nowName,
  fan,
}) {
  return (
    <div>
      <PieChart width={200} height={120}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {needle(value, data, cx, cy, iR, oR, "#4db6ac")}
        {/* {needle(value, data, cx, cy, iR, oR, "#d0d000")} */}
      </PieChart>
      <div className={styles.GaugeContainer}>
        <div className={styles.setValue}>
          {/* <p>{setName}</p> */}
          <div>
            {setValue}
            {unit}
            <div className={styles.setting}>
              {!fan && (
                <>
                  <span onClick={handleUp}>{`▲`}</span>
                  <span onClick={handleDown}>{`▼`}</span>
                </>
              )}
            </div>
          </div>
        </div>
        {/* <div>
          {"-->"}
          <br />
          {"-->"}
        </div> */}
        <div className={styles.nowValue}>
          <p>{nowName}</p>
          <div>
            {intervalValue}
            {unit}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PieChartNeedle;
